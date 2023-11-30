import os
import subprocess

from ping3 import ping

# Define the command to fetch the video stream using curl and extract frames using ffmpeg
command = "curl http://admin:@{}/livestream/11 --no-buffer -o - | ffmpeg -loglevel quiet -y -hide_banner -i - -vf 'fps=1' {}" # TODO convert to array


# The function uses outFormat where the char "%d" is the frame count, also remember to define all path
def handle_status(ip: str, down: bool):
    if down:
        print(f"Failed connection with ip: {ip}")
    else:
        print(f"Connected with ip: {ip}")

    # TODO save log


def handle_connection(ip: str, out_format: str):
    # Run the command using subprocess
    try:
        subprocess.run(
            command.format(ip, out_format),
            shell=True,
            check=True
        )
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
