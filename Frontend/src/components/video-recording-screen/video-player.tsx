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

  /* event handlers */
  const onScreenSizeClick = () => {
    const elem = document.documentElement;
    // Enter fullscreen mode
    if (elem.requestFullscreen && !fullScreen) {
      elem.requestFullscreen();
    } else if (document.exitFullscreen && fullScreen) {
      document.exitFullscreen();
    }

    setFullScreen(!fullScreen);
  };

  return (
    <div className="w-full min-h-[250px] video-container relative">
      <video
        ref={(el) => {
          videoRef.current = { ...videoRef.current, [camera.key]: el };
        }}
        className={`${
          fullScreen
            ? "w-screen h-screen fixed top-0 -bottom-10 left-0 right-0"
            : "w-full h-full "
        }`}
        autoPlay={true}
        muted={true}
      ></video>
      <div
        className={`video-control bg-primary text-white flex justify-end ${
          fullScreen
            ? "fixed bottom-0 left-0 right-0"
            : "absolute bottom-0 w-full"
        } `}
      >
        <Tooltip title={fullScreen ? "Exit full screen" : "Full screen"}>
          {fullScreen ? (
            <FullscreenOutlined
              className="cursor-pointer text-lg "
              onClick={onScreenSizeClick}
            />
          ) : (
            <FullscreenExitOutlined
              className="cursor-pointer text-lg "
              onClick={onScreenSizeClick}
            />
          )}
        </Tooltip>
      </div>
    </div>
  );
};

export default VideoPlayer;
