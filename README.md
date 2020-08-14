# Occupansee

This project is a program that can count the number of people "entering" and "exiting" on a video feed. The backend uses OpenCV and Python, while the front end is built with React and Chart.js.

https://www.youtube.com/watch?v=x7GwwBdKOxU

Both the number of people in the frame and the number of people who exit from each side of the frame are updated in real-time. 

Because people are identified using a YOLO-based Convolutional Neural Network which is computationally expensive, the counter for the number of people is updated every 150 frames, while the number of people exiting each side is updated immediately. 

![](demo/people_tracker_demo.gif)

The Python and OpenCV backend is connected to the React frontend via Websockets. 
When generating data, the backend also posts the data to a Firebase Realtime Database, where the data will be queried later and used to display graphs of statistics of the last 7 days on the frontend.

You will probably need [Yarn](https://yarnpkg.com/) to run the new frontend.

