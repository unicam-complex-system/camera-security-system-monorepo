"use client";
import type { FC } from "react";
import { Tooltip } from "antd";
import { VideoRecordingScreen } from "@/components";
import { useCameraSlice, useSessionSlice } from "@/hooks";
import { cameras as camerasData } from "@/data";
import { FullscreenOutlined, FullscreenExitOutlined } from "@ant-design/icons";
import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import Hls from "hls.js";

type PropsType = {
  sizePerScreen?: number;
};

const webSocketURL = process.env.NEXT_PUBLIC_BACKEND_URL
  ? process.env.NEXT_PUBLIC_BACKEND_URL
  : "";

const socket = io(webSocketURL, {
  transportOptions: {
    polling: {
      extraHeaders: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    },
  },
});
/* This container renders different video recording screens */
export const VideoStreamContainer: FC<PropsType> = ({ sizePerScreen = 9 }) => {
  /* hooks */
  const { cameras, isFullScreenGrid, toggleIsFullScreenGrid, setCameras } =
    useCameraSlice();
  const { session } = useSessionSlice();
  const videoRef: any = useRef(null);
  const hlsRef: any = useRef(null);
  const mediaSourceRef: any = useRef(null);

  /* event handlers */
  const onScreenSizeClick = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen && !isFullScreenGrid) {
      elem.requestFullscreen();
    }

    if (document.exitFullscreen && isFullScreenGrid) {
      document.exitFullscreen();
    }

    toggleIsFullScreenGrid();
  };

  /* useEffect hooks */
  useEffect(() => {
    setCameras(camerasData);

    // client-side
    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });

    socket.on("disconnect", (reason) => {
      console.log(reason); // undefined
    });

    socket.on("stream", (message) => {
      console.log(message);

      const videoElement = videoRef.current?.[message.id];

      if (videoElement) {
        if (Hls.isSupported()) {
          hlsRef.current = { ...hlsRef.current, [message.id]: new Hls() };
          // hlsRef.current.attachMedia(videoElement);
          console.log(hlsRef);
          const uint8Array = new Uint8Array(message.data);
          hlsRef.current[message.id]?.appendData(uint8Array, "video");
        } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
          // Handle non-HLS.js fallback for browsers that support HLS natively
          console.error("HLS.js is not supported");
        }
      }
    });
    console.log(socket);
  }, []);

  return (
    <>
      <div className="grid grid-cols-3 auto-rows-auto gap-1 items-stretch min-h-[80vh]">
        {Array.from({ length: sizePerScreen }).map((item, index) => (
          <React.Fragment key={index}>
            <VideoRecordingScreen
              camera={index < cameras.length ? cameras[index] : undefined}
              videoRef={videoRef}
            />
          </React.Fragment>
        ))}
      </div>
      <div className="flex justify-end py-3">
        {!isFullScreenGrid && (
          <Tooltip title="Full screen">
            <FullscreenOutlined
              className="cursor-pointer text-2xl text-primary"
              onClick={onScreenSizeClick}
            />
          </Tooltip>
        )}
        {isFullScreenGrid && (
          <div className="bg-black py-3 px-2 fixed bottom-0 left-0 right-0 opacity-25">
            <div className="flex justify-center">
              <Tooltip title="Exit full screen">
                <FullscreenExitOutlined
                  className="cursor-pointer text-2xl text-white"
                  onClick={onScreenSizeClick}
                />
              </Tooltip>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
