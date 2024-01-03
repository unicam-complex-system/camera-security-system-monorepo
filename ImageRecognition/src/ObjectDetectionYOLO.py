from ultralytics import YOLO
import cv2
import math 
import threading
import requests
import numpy as np
from skimage.metrics import structural_similarity as ssim
from sklearn.metrics import mean_squared_error

#model
model = YOLO("yolo-Wheights/yolov8n.pt")
#class of YOLO
classNames = ["person", "bicycle", "car", "motorbike", "aeroplane", "bus", "train", "truck", "boat",
              "traffic light", "fire hydrant", "stop sign", "parking meter", "bench", "bird", "cat",
              "dog", "horse", "sheep", "cow", "elephant", "bear", "zebra", "giraffe", "backpack", "umbrella",
              "handbag", "tie", "suitcase", "frisbee", "skis", "snowboard", "sports ball", "kite", "baseball bat",
              "baseball glove", "skateboard", "surfboard", "tennis racket", "bottle", "wine glass", "cup",
              "fork", "knife", "spoon", "bowl", "banana", "apple", "sandwich", "orange", "broccoli",
              "carrot", "hot dog", "pizza", "donut", "cake", "chair", "sofa", "pottedplant", "bed",
              "diningtable", "toilet", "tvmonitor", "laptop", "mouse", "remote", "keyboard", "cell phone",
              "microwave", "oven", "toaster", "sink", "refrigerator", "book", "clock", "vase", "scissors",
              "teddy bear", "hair drier", "toothbrush"
              ]

cam1 = 'rtsp://192.168.1.41:80/ch0_0.264'
cam2 = 'rtsp://192.168.1.41:80/ch1_0.264'
cam3 = 'rtsp://192.168.1.41:80/ch2_0.264'
cam4 = 'rtsp://192.168.1.41:80/ch3_0.264'
cam5 = 'rtsp://192.168.1.41:80/ch4_0.264'
cam6 = 'rtsp://192.168.1.41:80/ch5_0.264'
cam7 = 'rtsp://192.168.1.41:80/ch6_0.264'
cam8 = 'rtsp://192.168.1.41:80/ch7_0.264'


last_sent_image = None

def post_request(image):
    global last_sent_image
    apiURL = f"https://api.telegram.org/bot{TOKEN}/sendPhoto?chat_id={channel_id}"
    
    if last_sent_image is None:
        last_sent_image = image
        try:
            response = requests.post(apiURL, files={'photo':  image})
            print("Status code is: ", response.status_code)      
        except requests.exceptions.RequestException as e:
            print("There was an exception that occurred while handling your request.", e)
    else:  

        # Resizing
        flat_last_sent_image = last_sent_image.flatten()
        flat_image = image.flatten()
        min_len = min(len(flat_last_sent_image), len(flat_image))
        r_last_sent_image = cv2.resize(flat_last_sent_image.reshape(1, -1), (min_len, 1))
        r_image = cv2.resize(flat_image.reshape(1, -1), (min_len, 1))

        #mean squared error
        mse = mean_squared_error(r_last_sent_image, r_image)
        print("MEAN SQUARED ERROR is: ", mse)
        if mse > 105.85:
            try:
                response = requests.post(apiURL, files={'photo':  image})
                print("Status code is: ", response.status_code)
        
                if response.status_code == 200:
                    last_sent_image = image      
            except requests.exceptions.RequestException as e:
                print("There was an exception that occurred while handling your request.", e)
        
    
   

#filename = url of cam
#file_index = index of the file that can be assigned to each thread. cam1 has file_index as 1, cam2 has file_index as 2...
def detection(filename, file_index):
    cap = cv2.VideoCapture(filename)  # Read the video file
    global last_sent_image

    while cap.isOpened():
       
       success, img = cap.read()
       # Exit the loop if no more frames in either video
       if not success:
           break
       
       results = model(img, stream = True, classes = 0, conf=0.5) 
       foundPerson = False
       #coordinates
       for r in results:
          boxes = r.boxes
          for box in boxes:
            #bounding box
            x1, y1, x2, y2 = box.xyxy[0]
            x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2) # convert to int values
            # put box in cam
            cv2.rectangle(img, (x1, y1), (x2, y2), (255, 0, 255), 3)
            # confidence
            confidence = math.ceil((box.conf[0]*100))/100
            print("Confidence --->",confidence)
            # class name
            cls = int(box.cls[0])
            print("Class name -->", classNames[cls])

            foundPerson = True
       
       if(foundPerson):
           _, img_encoded = cv2.imencode('.jpg', img)
           post_request(img_encoded)

      
    cap.release()



#initialize thread
detect_thread1 = threading.Thread(target=detection,
                                   args=(cam1, 1),
                                   daemon=True)

detect_thread2 = threading.Thread(target=detection,
                                   args=(cam2, 2),
                                   daemon=True)

detect_thread3 = threading.Thread(target=detection,
                                   args=(cam3, 3),
                                   daemon=True)

detect_thread4 = threading.Thread(target=detection,
                                   args=(cam4, 4),
                                   daemon=True)

detect_thread5 = threading.Thread(target=detection,
                                   args=(cam5, 5),
                                   daemon=True)

detect_thread6 = threading.Thread(target=detection,
                                   args=(cam6, 6),
                                   daemon=True)

detect_thread7 = threading.Thread(target=detection,
                                   args=(cam7, 7),
                                   daemon=True)

detect_thread8 = threading.Thread(target=detection,
                                   args=(cam8, 8),
                                   daemon=True)

#start thread
detect_thread1.start()
detect_thread2.start()
detect_thread3.start()
detect_thread4.start()
detect_thread5.start()
detect_thread6.start()
detect_thread7.start()
detect_thread8.start()

detect_thread1.join()
detect_thread2.join()
detect_thread3.join()
detect_thread4.join()
detect_thread5.join()
detect_thread6.join()
detect_thread7.join()
detect_thread8.join()