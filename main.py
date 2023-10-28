from src.handleSystemStream import obtainFramesFromFile

obtainFramesFromFile(
    'testCamera/SuccessfulFiles/test.h264',
    'imgOut/test.h264_frame_{:04d}.jpeg',
    True
)
