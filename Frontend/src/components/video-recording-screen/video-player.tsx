import React, { useEffect, useRef, useState } from "react";
import { Camera } from "@/types";
import { Tooltip } from "antd";
import { FullscreenOutlined, FullscreenExitOutlined } from "@ant-design/icons";

const VideoPlayer = ({
  camera,
  videoRef,
}: {
  camera: Camera;
  videoRef: any;
}) => {
  const [fullScreen, setFullScreen] = useState(false);
  const [videoControlHidden, setvideoControlHidden] = useState(false);
  const intervalRef: any = useRef(null);

  /* event handlers */
  const onScreenSizeToggle = () => {
    const elem = document.documentElement;
    // Enter fullscreen mode
    if (elem.requestFullscreen && !fullScreen) {
      elem.requestFullscreen();
      document.body.style.overflow = "hidden";
    } else if (document.exitFullscreen && fullScreen) {
      document.exitFullscreen();
      document.body.style.overflow = "auto";
    }

    setFullScreen(!fullScreen);
  };

  const onMouseMove = () => {
    clearInterval(intervalRef.current);
    let timer = 4; //number of seconds to wait in order to hide video controls
    setvideoControlHidden(false);
    intervalRef.current = setInterval(() => {
      timer = timer - 1;
      if (timer === 0) {
        setvideoControlHidden(true);
        clearInterval(intervalRef.current);
      }
    }, 1000);
  };

  const onExitFullScreenEscape = () => {
    if (!document.fullscreen) {
      setFullScreen(false);
      document.body.style.overflow = "auto";
    }
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", onExitFullScreenEscape);

    return () => {
      document.removeEventListener("fullscreenchange", onExitFullScreenEscape);
    };
  }, []);

  return (
    <div
      className="w-full min-h-[250px] video-container relative"
      onKeyDown={onScreenSizeToggle}
    >
      <video
        ref={(el) => {
          videoRef.current = { ...videoRef.current, [camera.key]: el };
        }}
        className={`${
          fullScreen
            ? "w-screen h-screen fixed top-0 -bottom-10 left-0 right-0 z-50"
            : "w-full h-full "
        }`}
        autoPlay={true}
        muted={true}
        onMouseMove={onMouseMove}
      ></video>
      {!videoControlHidden && (
        <div
          className={`video-control z-50 bg-primary text-white flex justify-end ${
            fullScreen
              ? "fixed bottom-0 left-0 right-0"
              : "absolute bottom-0 w-full"
          } `}
        >
          <Tooltip title={fullScreen ? "Exit full screen" : "Full screen"}>
            {fullScreen ? (
              <FullscreenOutlined
                className="cursor-pointer text-lg "
                onClick={onScreenSizeToggle}
              />
            ) : (
              <FullscreenExitOutlined
                className="cursor-pointer text-lg "
                onClick={onScreenSizeToggle}
              />
            )}
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
