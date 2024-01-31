import concurrent.futures
from src.ObjectDetectionYOLO import detection, initBufferSize


MAX = 8
if __name__ == "__main__":
    initBufferSize(MAX)

    with concurrent.futures.ThreadPoolExecutor() as executor:
        args: (int, int) = [(i, i) for i in range(0, 8)]
        # args: (int, int) = [(i, i) for i in range(6, 7)]

        results = [executor.submit(detection, *arg) for arg in args]
        concurrent.futures.wait(results)

# example
# cam1 = "rtsp://192.168.1.41:80/ch0_0.264"
