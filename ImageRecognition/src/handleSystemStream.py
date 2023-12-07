import cv2
import ffmpeg
import numpy as np
from ping3 import ping


def handle_status(ip: str, is_available: bool):
    if is_available:
        print(f"Failed connection with ip: {ip}")
    else:
        print(f"Connected with ip: {ip}")

    # TODO save log


opts = {
    "loglevel": "quiet",  # "r": "30", "f": "avfoundation"
    "headers": 'Authorization: Basic YWRtaW46'
}


def handle_connection(ip: str, debug: bool):
    # Run the command using subprocess
    cmd = (ffmpeg
           .input(f"http://{ip}/livestream/11", **opts)
           .output("pipe:", format="rawvideo", pix_fmt="bgr24")
           .run_async(pipe_stdout=True)
           )
    while True:
        raw_frame = cmd.stdout.read(1920 * 1080 * 3)
        if not raw_frame:
            break
        frame = np.frombuffer(raw_frame, np.uint8).reshape((1080, 1920, 3))

        if debug:
            cv2.imshow(f"VideoFrame{ip}", frame)
            if cv2.waitKey(1) & 0xFF == ord("q"):
                break


def obtain_frames(ip: str, debug: bool):
    while True:
        available = ping(ip) is not None
        handle_status(ip, available)

        if available:
            handle_connection(ip, debug)
