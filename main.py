from src.handleSystemStream import obtainFrames

if __name__ == "__main__":
    print("Press q for exit")
    obtainFrames(
        'img/SuccessfulConversions/test.h264',
        'img/out/test.h264_frame_{:04d}.jpeg',
        True
    )
