from ultralytics import YOLO
import cv2
import math
import requests
from sklearn.metrics import mean_squared_error
import numpy as np
import time

# model
model = YOLO("yolo-Wheights/yolov8n.pt")

url = "https://localhost:8080"
MSE_VALUE = 105.80

last_sent_image = []
frame_rate = 3


def post_request(camera_id: int, image):
    global last_sent_image

    if last_sent_image[camera_id] is not None:
        # Resizing
        flat_last_sent_image = last_sent_image[camera_id].flatten()
        flat_image = image.flatten()

        min_len = min(len(flat_last_sent_image), len(flat_image))
        r_last_sent_image = cv2.resize(
            flat_last_sent_image.reshape(1, -1), (min_len, 1)
        )
        r_image = cv2.resize(flat_image.reshape(1, -1), (min_len, 1))

        # mean squared error
        mse = mean_squared_error(r_last_sent_image, r_image)
        print(f"MEAN SQUARED ERROR is: {mse} discard: {mse < MSE_VALUE}")
        if mse < MSE_VALUE:
            return
    image_stream = np.array(image).tobytes()

    try:
        response = requests.post(
            f"{url}/{camera_id}",
            files={"file": ("image.jpg", image_stream, "image/jpeg")},
            verify=False,  # "Backend/src/ssl_certificate/server.pem",
        )

        if response.status_code == 201:
            last_sent_image[camera_id] = image
        elif response.status_code == 422:
            print(response.content)
            print(response.request.headers)
        # else:
        #     print("Status code is: ", response.status_code)
    except requests.exceptions.RequestException as e:
        print(
            "There was an exception that occurred while handling your request.",
            e,
        )


# def check_image(camera_id: int, image):


# filename = url of cam
# file_index = index of the file that can be assigned to each thread. cam1 has file_index as 1, cam2 has file_index as 2...
def detection(camera_id: int, _: int):
    # print(last_sent_image[camera_id])

    print(f"capturing {camera_id}")

    # cap = cv2.VideoCapture(f"rtsp://172.20.14.1:80/ch{camera_id}_0.264")

    while True:
        cap = cv2.VideoCapture(f"rtsp://192.168.1.41:80/ch{camera_id}_0.264")

        prev_time = 0

        # TODO handle status
        status = "offline"

        print(f"started {camera_id}")

        while cap.isOpened():
            success, img = cap.read()

            time_elapsed = time.time() - prev_time

            if time_elapsed <= 1.0 / frame_rate:
                continue

            prev_time = time.time()

            if not success:
                cap.release()
                continue
            print(f"Captured frame from {camera_id}")

            status = "online"
            results = model(img, stream=True, classes=0, conf=0.5, verbose=False)
            foundPerson = False
            # coordinates
            for r in results:
                boxes = r.boxes
                for box in boxes:
                    # bounding box
                    x1, y1, x2, y2 = box.xyxy[0]
                    x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
                    cv2.rectangle(img, (x1, y1), (x2, y2), (255, 0, 255), 3)
                    # confidence
                    confidence = math.ceil((box.conf[0] * 100)) / 100
                    print(
                        f"    Person detected in {camera_id} with Confidence ---> {confidence}"
                    )

                    foundPerson = True

            if foundPerson:
                _, image = cv2.imencode(".jpg", img)

                post_request(camera_id, image)

        cap.release()


def initBufferSize(size: int):
    global last_sent_image
    if len(last_sent_image) < size:
        last_sent_image = [None for _ in range(size + 1)]
