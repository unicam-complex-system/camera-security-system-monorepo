import io
from ultralytics import YOLO
import cv2
import math
import threading
import requests
from sklearn.metrics import mean_squared_error
import numpy as np

# model
model = YOLO("yolo-Wheights/yolov8n.pt")

last_sent_image = None
url = "https://localhost:8080"


def post_request(image, camera_id, status):
    global last_sent_image

    if last_sent_image is not None:
        # Resizing
        flat_last_sent_image = last_sent_image.flatten()
        flat_image = image.flatten()

        min_len = min(len(flat_last_sent_image), len(flat_image))
        r_last_sent_image = cv2.resize(
            flat_last_sent_image.reshape(1, -1), (min_len, 1)
        )
        r_image = cv2.resize(flat_image.reshape(1, -1), (min_len, 1))

        # mean squared error
        mse = mean_squared_error(r_last_sent_image, r_image)
        print("MEAN SQUARED ERROR is: ", mse)
        if mse < 105.70:
            return

    # image = cv2.resize(image, (0.5, 0.5))
    image_stream = np.array(image).tobytes()

    try:
        response = requests.post(
            f"{url}/{camera_id}",
            files={"file": ("image.jpg", image_stream, "image/jpeg")},
            verify=False,  # "Backend/src/ssl_certificate/server.pem",
        )

        if response.status_code == 201:
            last_sent_image = image
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


# filename = url of cam
# file_index = index of the file that can be assigned to each thread. cam1 has file_index as 1, cam2 has file_index as 2...
def detection(camera_id: int, _: int):
    print(f"capturing {camera_id}")
    print(f"rtsp://192.168.1.41:80/ch{camera_id}_0.264")

    # FIXME camera capture takes to much time to load the camera connection (first time)
    cap = cv2.VideoCapture(f"rtsp://192.168.1.41:80/ch{camera_id}_0.264")
    status = "offline"

    print(f"started {camera_id}")

    while cap.isOpened():
        success, img = cap.read()
        if not success:
            continue

        print(f"captured image from {camera_id}")

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
                print("Confidence --->", confidence)

                foundPerson = True

        if foundPerson:
            _, img_encoded = cv2.imencode(".jpg", img)
            post_request(img_encoded, camera_id, status)

    cap.release()
