import numpy as np
import cv2 as cv

capture = cv.VideoCapture(0)

ret, frame1 = capture.read()
ret, frame2 = capture.read()

while(capture.isOpened()):
    diff = cv.absdiff(frame1, frame2)
    grayscale = cv.cvtColor(diff, cv.COLOR_BGR2GRAY)
    blurred = cv.GaussianBlur(grayscale, (5, 5), 0)
    _, threshold = cv.threshold(blurred, 10, 255, cv.THRESH_BINARY)
    dilated = cv.dilate(threshold, None, None, iterations=7)
    contours, _ = cv.findContours(dilated, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE)

    moving = 0
    for contour in contours:
        (x, y, width, height) = cv.boundingRect(contour)
        if cv.contourArea(contour) < np.size(frame1, 0) * np.size(frame1, 1) / 33:
            continue
        r = r + 50
        moving = moving + 1
        cv.rectangle(frame1, (x, y), (x + width, y + height), (50, 250, 50), 2)

    cv.putText(frame1, "Number: " + str(moving), (10, 10), cv.FONT_HERSHEY_PLAIN, 1, (10, 255, 10), 2)

    #cv.drawContours(frame1, contours, -1, (10, 255, 10), 2)

    cv.imshow("Webcam", frame1)
    frame1 = frame2
    ret, frame2 = capture.read()
    if cv.waitKey(40) == 27:
        break

cv.destroyWindow()
capture.release()