import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { Camera } from "@/types";
import { useSessionSlice } from "@/hooks";
import { Tooltip } from "antd";
import { FullscreenOutlined, FullscreenExitOutlined } from "@ant-design/icons";

const HlsPlayer = ({ camera }: { camera: Camera }) => {
  const [fullScreen, setFullScreen] = useState(false);
  const videoRef: any = useRef(null);
  const { session } = useSessionSlice();

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

  useEffect(() => {
    const video: any = videoRef.current;

    if (Hls.isSupported()) {
      const hls = new Hls({
        xhrSetup: (xhr) => {
          xhr.setRequestHeader(
            "Authorization",
            `Bearer ${session.accessToken}`
          );
        },
      });
      hls.loadSource(camera.url); // Replace with your HLS stream URL
      hls.attachMedia(video);

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = camera.url; // Replace with your HLS stream URL
    }
  }, []);

  return (
    <div className="w-full min-h-[250px] video-container relative">
      <video
        ref={videoRef}
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

export default HlsPlayer;
