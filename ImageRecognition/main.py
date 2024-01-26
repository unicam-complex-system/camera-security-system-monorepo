import concurrent.futures
from src.ObjectDetectionYOLO import detection, initBufferSize


MAX = 8
if __name__ == "__main__":
    initBufferSize(MAX)

    with concurrent.futures.ThreadPoolExecutor() as executor:
        # args: (int, int) = [(i, i) for i in range(0, 8)]
        args: (int, int) = [(i, i) for i in range(2, 4)]

        results = [executor.submit(detection, *arg) for arg in args]
        concurrent.futures.wait(results)


# cam1 = "rtsp://192.168.1.41:80/ch0_0.264"
# cam2 = "rtsp://192.168.1.41:80/ch1_0.264"
# cam3 = "rtsp://192.168.1.41:80/ch2_0.264"
# cam4 = "rtsp://192.168.1.41:80/ch3_0.264"
# cam5 = "rtsp://192.168.1.41:80/ch4_0.264"
# cam6 = "rtsp://192.168.1.41:80/ch5_0.264"
# cam7 = "rtsp://192.168.1.41:80/ch6_0.264"
# cam8 = "rtsp://192.168.1.41:80/ch7_0.264"
