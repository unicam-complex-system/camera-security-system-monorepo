import cv2


# the function passes a frame_count to outFormat, also remember to define all path
def obtainFramesFromFile(filePath, outFormat, debug: bool):
    video_capture = cv2.VideoCapture(filePath)

    previousFrameCount = -1

    while True:
        # Read a frame from video, right is a boolean that say if the frame was received correctly
        right, frame = video_capture.read()

        # The order of calls here is important
        # We obtain frame_count here because the counter is incremented by vide_capture.read
        frame_count = int(video_capture.get(cv2.CAP_PROP_POS_FRAMES))

        # controls if the frame is the same as previous, this means that the last frame was reached
        if previousFrameCount == frame_count:
            break

        previousFrameCount = frame_count

        if not right:
            raise Exception(f"Some unknown error happened at frame {frame_count}")

        # Saves the frame as jpeg
        cv2.imwrite(
            outFormat.format(frame_count),
            frame
        )

        # Shows the frame
        if debug:
            cv2.imshow('Frame', frame)

        # Esci dal ciclo se premi il tasto 'q'
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Release video capturer and closes the windows
    video_capture.release()
    cv2.destroyAllWindows()
