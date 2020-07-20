# USAGE

# RUN:
# python3 people_counter_direction.py --input videos/pedestrians.mp4  --output output/pedestrians_output_KCF.avi --display 1

# https://www.pyimagesearch.com/2018/08/13/opencv-people-counter/
# https://www.pyimagesearch.com/2020/06/01/opencv-social-distancing-detector/

# import the necessary packages
from pyimagesearch.richardTracker import richardTrackableObject
from imutils.video import VideoStream
from imutils.video import FPS

import numpy as np
import argparse
import imutils
import time
import cv2
from pyimagesearch import configuration as config
from pyimagesearch.detection import detect_people
import argparse
import imutils
import cv2
import os


def get_closest_side(centroid, W, H):
	x = centroid[0]
	y = centroid[1]

	actualY = H - y
	# top = 1
	# right = 2
	# bottom = 3
	# left = 4
	topLeftBottomRightSlope = -1 * H / W
	bottomLeftTopRightSlope = H / W

	# calculating which quarter the point is based on the equations of the lines
	if actualY >= bottomLeftTopRightSlope * x and actualY >= topLeftBottomRightSlope * x + H:
		return 1

	if bottomLeftTopRightSlope * x >= actualY >= topLeftBottomRightSlope * x + H:
		return 2

	if actualY <= bottomLeftTopRightSlope * x and actualY <= topLeftBottomRightSlope * x + H:
		return 3

	return 4

def get_centroid(bbox):
	return ((bbox[0] + bbox[2]) / 2, (bbox[1] + bbox[3]) / 2)


def is_close_to_edge(centroid, W, H):
	x = centroid[0]
	y = centroid[1]
	return x <= W / 6 or x >= 5 / 6 * W or y <= H / 6 or y >= 5 / 6 * H

def get_tracker(use_dlib, bbox, input_frame, tracker_type):
	# compute the (x, y)-coordinates of the bounding box
	# for the object
	(startX, startY, endX, endY) = bbox

	tracker = None
	if use_dlib:
		# construct a dlib rectangle object from the bounding
		# box coordinates and then start the dlib correlation
		# tracker
		tracker = dlib.correlation_tracker()
		rect = dlib.rectangle(startX, startY, endX, endY)
		tracker.start_track(input_frame, rect)
	else:

		OPENCV_OBJECT_TRACKERS = {
			"csrt": cv2.TrackerCSRT_create,
			"kcf": cv2.TrackerKCF_create,
			"boosting": cv2.TrackerBoosting_create,
			"mil": cv2.TrackerMIL_create,
			"tld": cv2.TrackerTLD_create,
			"medianflow": cv2.TrackerMedianFlow_create,
			"mosse": cv2.TrackerMOSSE_create
		}
		tracker = OPENCV_OBJECT_TRACKERS[tracker_type]()
		opencvbox = (startX, startY, endX - startX, endY - startY)
		tracker.init(input_frame, opencvbox)

	return tracker


# construct the argument parse and parse the arguments
ap = argparse.ArgumentParser()
ap.add_argument("-i", "--input", type=str, default="",
	help="path to (optional) input video file")
ap.add_argument("-o", "--output", type=str, default="",
	help="path to (optional) output video file")
ap.add_argument("-d", "--display", type=int, default=1,
	help="whether or not output frame should be displayed")
ap.add_argument("-s", "--skip-frames", type=int, default=45,
	help="# of skip frames between detections")
args = vars(ap.parse_args())


# load the COCO class labels our YOLO model was trained on
labelsPath = os.path.sep.join([config.MODEL_PATH, "coco.names"])
LABELS = open(labelsPath).read().strip().split("\n")

# derive the paths to the YOLO weights and model configuration
weightsPath = os.path.sep.join([config.MODEL_PATH, "yolov3.weights"])
configPath = os.path.sep.join([config.MODEL_PATH, "yolov3.cfg"])

# load our YOLO object detector trained on COCO dataset (80 classes)
print("[INFO] loading YOLO from disk...")
net = cv2.dnn.readNetFromDarknet(configPath, weightsPath)

# check if we are going to use GPU
if config.USE_GPU:
	# set CUDA as the preferable backend and target
	print("[INFO] setting preferable backend and target to CUDA...")
	net.setPreferableBackend(cv2.dnn.DNN_BACKEND_CUDA)
	net.setPreferableTarget(cv2.dnn.DNN_TARGET_CUDA)

# determine only the *output* layer names that we need from YOLO
ln = net.getLayerNames()
ln = [ln[i[0] - 1] for i in net.getUnconnectedOutLayers()]

# if a video path was not supplied, grab a reference to the webcam
if not args.get("input", False):
	print("[INFO] starting video stream...")
	vs = VideoStream(src=0).start()
	time.sleep(2.0)

# otherwise, grab a reference to the video file
else:
	print("[INFO] opening video file...")
	vs = cv2.VideoCapture(args["input"])

# initialize the video writer (we'll instantiate later if need be)
writer = None

# initialize the frame dimensions (we'll set them as soon as we read
# the first frame from the video)
W = None
H = None

richardTrackers = {}

# initialize the total number of frames processed thus far, along
# with the total number of objects that have moved either up or down
totalFrames = 0

top = 0
left = 0
right = 0
bottom = 0

# start the frames per second throughput estimator
fps = FPS().start()

# loop over frames from the video stream
while True:
	# grab the next frame and handle if we are reading from either
	# VideoCapture or VideoStream
	frame = vs.read()
	frame = frame[1] if args.get("input", False) else frame

	# if we are viewing a video and we did not grab a frame then we
	# have reached the end of the video
	if args["input"] is not None and frame is None:
		break

	# resize the frame to have a maximum width of 500 pixels (the
	# less data we have, the faster we can process it), then convert
	# the frame from BGR to RGB for dlib
	frame = imutils.resize(frame, width=500)
	rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

	# if the frame dimensions are empty, set them
	if W is None or H is None:
		(H, W) = frame.shape[:2]
	# if we are supposed to be writing a video to disk, initialize
	# the writer
	if args["output"] is not None and writer is None:
		fourcc = cv2.VideoWriter_fourcc(*"MJPG")
		writer = cv2.VideoWriter(args["output"], fourcc, 30,
			(W, H), True)

	# check to see if we should run a more computationally expensive
	# object detection method to aid our tracker
	if totalFrames % args["skip_frames"] == 0:
		# set the status and initialize our new set of object trackers
		status = "Detecting"
		for i in richardTrackers:
			richardTracker = richardTrackers[i]
			richardTracker.close()
		richardTrackers = {}

		# convert the frame to a blob and pass the blob through the
		# network and obtain the detections
		results = detect_people(frame, net, ln,
								personIdx=LABELS.index("person"))

		# loop over the detections
		id = 1
		for (i, (prob, bbox, centroid)) in enumerate(results):

				centroid = get_centroid(bbox)
				#if not is_close_to_edge(centroid, W, H):
				#	continue

				tracker = get_tracker(use_dlib=False, bbox=bbox, input_frame=frame, tracker_type="kcf")
				#tracker = get_tracker(use_dlib=True, bbox=bbox, input_frame=rgb, tracker_type="")
				# add the tracker to our list of trackers so we can
				# utilize it during skip frames
				richardTrackers[id] = richardTrackableObject(bbox, tracker, id)

				id += 1

	# otherwise, we should utilize our object *trackers* rather than
	# object *detectors* to obtain a higher frame processing throughput
	for i in richardTrackers:
		richardTracker = richardTrackers[i]
		if richardTracker.get_need_to_delete is True:
			del richardTracker

	else:

		# loop over the trackers
		for i in richardTrackers:
			richardTracker = richardTrackers[i]
			if richardTracker.get_need_to_delete():
				continue

			# update the tracker and grab the updated position
			richardTracker.update(frame)

			currentCentroid = richardTracker.get_centroid()
			#if not is_close_to_edge(currentCentroid, W, H):
			#	richardTracker.update_to_delete()
			#	continue

			id = richardTracker.get_id()
			bbox = richardTracker.get_bbox()
			cv2.rectangle(frame, (bbox[0], bbox[1]), (bbox[2], bbox[3]), (0, 255, 0), 2)
			# if the bounding box is outside of the frame
			if bbox[0] < 0 or bbox[2] > W or bbox[1] < 0 or bbox[3] > H:

				# if the person is close to an edge?
				# richardTracker.close()
				# if tracker is lost, delete it
				#print(str(id) + " is lost")
				richardTracker.update_to_delete()
				# update variables if that person was walking in a certain direction
				# if that person wasn't moving, maybe someone walked in front of them, delete
				# the tracker but if they are still there, they will get picked up again later
				if bbox[1] < 0 and richardTracker.get_directions()[0]:
					top += 1
					print(str(id) + " disappeared to the top")
				elif bbox[2] > W and richardTracker.get_directions()[1]:
					right += 1
					print(str(id) + " disappeared to the right")
				elif bbox[3] > H and richardTracker.get_directions()[2]:
					bottom += 1
					print(str(id) + " disappeared to the bottom")
				elif bbox[0] < 0 and richardTracker.get_directions()[3]:
					left += 1
					print(str(id) + " disappeared to the left")
				continue

			# draw the circle on the centroid of the person
			cv2.circle(frame, (int(currentCentroid[0]), int(currentCentroid[1])), 4, (0, 255, 0), -1)
			text = "ID {}".format(richardTracker.get_id())
			textX = max(0, int(currentCentroid[0]) - 10)
			textY = max(0, int(currentCentroid[1]) - 10)
			cv2.putText(frame, text, (textX, textY),
						cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

	# construct a tuple of information we will be displaying on the
	# frame
	info = [
				("Top", top),
				("Left", left),
				("Right", right),
				("Bottom", bottom)
			]

	# loop over the info tuples and draw them on our frame
	for (i, (k, v)) in enumerate(info):
				text = "{}: {}".format(k, v)
				cv2.putText(frame, text, (10, H - ((i * 20) + 20)),
							cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 255), 2)
	cv2.line(frame, (0, 0), (W, H), (0, 255, 255), 2)
	cv2.line(frame, (0, H), (W, 0), (0, 255, 255), 2)

	# check to see if we should write the frame to disk
	if writer is not None:
		writer.write(frame)

	# show the output frame
	cv2.imshow("Frame", frame)
	key = cv2.waitKey(1) & 0xFF

	# if the `q` key was pressed, break from the loop
	if key == ord("q"):
		break

	# increment the total number of frames processed thus far and
	# then update the FPS counter
	totalFrames += 1
	fps.update()

# stop the timer and display FPS information
fps.stop()
print("[INFO] elapsed time: {:.2f}".format(fps.elapsed()))
print("[INFO] approx. FPS: {:.2f}".format(fps.fps()))

# check to see if we need to release the video writer pointer
if writer is not None:
	writer.release()

# if we are not using a video file, stop the camera video stream
if not args.get("input", False):
	vs.stop()

# otherwise, release the video file pointer
else:
	vs.release()

# close any open windows
cv2.destroyAllWindows()
