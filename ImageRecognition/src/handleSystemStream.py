import os
import subprocess

import cv2
import ffmpeg
import numpy as np
from ping3 import ping

# The function uses outFormat where the char "%d" is the frame count, also remember to define all path
def handle_status(ip: str, down: bool):
    if down:
        print(f"Failed connection with ip: {ip}")
    else:
        print(f"Connected with ip: {ip}")

    # TODO save log


opts = {"loglevel": "quiet", "r": "30", "f": "avfoundation"}


def handle_connection(ip: str, out_format: str):
    # Run the command using subprocess
    cmd = (ffmpeg
           .input("0:", **opts)
           .output("pipe:", format="rawvideo", pix_fmt="bgr24")
           .run_async(pipe_stdout=True)
           )
    while True:
        raw_frame = cmd.stdout.read(1920 * 1080 * 3)
        if not raw_frame:
            break
        frame = np.frombuffer(raw_frame, np.uint8).reshape((1080, 1920, 3))

        cv2.imshow("VideoFrame", frame)
        if cv2.waitKey(1) & 0xFF == ord("q"):
            break
    try:
        print("Frames extracted successfully.")
    except subprocess.CalledProcessError as e:
        print(e.returncode)
        print(f"Error: {e}")


def obtain_frames(ip: str, out_format: str, debug: bool):
    if not dir_check(out_format, not debug):
        raise Exception("Path not usable")

    while True:
        if ping(ip) is None:
            handle_status(ip, True)
        else:
            handle_status(ip, False)
            handle_connection(ip, out_format)


def dir_check(directory: str, force: bool):
    out_path = os.path.dirname(directory)

    if not os.path.exists(out_path):
        if force:
            os.makedirs(out_path)
            return True

        choice = input(f"Directory '{out_path}' not exists. You want to create it? (Yes/No): ")
        if choice.lower() == 'no':
            print("Operazione annullata.")
            return False

        os.makedirs(out_path)
    return True
