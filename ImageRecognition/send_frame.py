import cv2
import socketio
import threading

#cameras data
cameras = {
    '1': 'rtsp://192.168.1.41:80/ch0_0.264',
    '2': 'rtsp://192.168.1.41:80/ch1_0.264',
    '3': 'rtsp://192.168.1.41:80/ch2_0.264',
    '4': 'rtsp://192.168.1.41:80/ch3_0.264',
    '5': 'rtsp://192.168.1.41:80/ch4_0.264',
    '6': 'rtsp://192.168.1.41:80/ch5_0.264',
    '7': 'rtsp://192.168.1.41:80/ch6_0.264',
    '8': 'rtsp://192.168.1.41:80/ch7_0.264',
}

# Server settings
server_url = 'http://localhost:8080'

sio = socketio.Client()

def convert_frame(frame):
    jpeg_frame = cv2.imencode('.jpg', frame)[1].tobytes()
    return jpeg_frame


def send_frames(camera_id, capture, interval=0.1):
    while True:
        ret, frame = capture.read()
        if ret:
            
            frame_conv = convert_frame(frame)
        
            sio.emit('message', {'id': camera_id, 'data': frame_conv})
            sio.sleep(interval)



for camera_id, camera_url in cameras.items():
    capture = cv2.VideoCapture(camera_url)
    if not capture.isOpened():
        print(f"Error stream with camera {camera_id}")
        continue
    
    threading.Thread(target=send_frames, args=(camera_id, capture)).start()


@sio.event
def connect():
    print("Server connected")

@sio.event
def disconnect():
    print("Server disconnected")

sio.connect(server_url, transports=['websocket'])

sio.wait()

