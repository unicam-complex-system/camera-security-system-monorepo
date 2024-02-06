"use client";
import type { FC } from "react";
import { Tooltip } from "antd";
import { VideoRecordingScreen } from "@/components";
import { useCameraSlice } from "@/hooks";
import { FullscreenOutlined, FullscreenExitOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { io } from "socket.io-client";

type PropsType = {};

/* This container renders different video recording screens */
export const VideoStreamContainer: FC<PropsType> = () => {
  /* hooks */
  const {
    cameras,
    isFullScreenGrid,
    toggleIsFullScreenGrid,
    updateCameraStatus,
  } = useCameraSlice();

  /* event handlers */
  const onScreenSizeClick = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen && !isFullScreenGrid) {
      elem.requestFullscreen();
      toggleIsFullScreenGrid(true);
    }

    if (document.exitFullscreen && isFullScreenGrid) {
      document.exitFullscreen();
      toggleIsFullScreenGrid(false);
    }
  };

  const onExitFullScreenEscape = () => {
    if (!document.fullscreen) {
      document.body.style.overflow = "auto";
      toggleIsFullScreenGrid(false);
    }
  };

  /* useEffect hooks */
  useEffect(() => {
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

    socket.on("active", (data) => {
      const message = JSON.parse(data);
      const currentCamera = cameras.find((camera) => camera.id === message.id);
      if (!currentCamera?.isActive) {
        updateCameraStatus({ id: message.id, status: true });
      }
    });

    socket.on("inactive", (data) => {
      const message = JSON.parse(data);
      const currentCamera = cameras.find((camera) => camera.id === message.id);
      // if (currentCamera?.isActive) {
        updateCameraStatus({ id: message.id, status: false });
      // }
    });

    document.addEventListener("fullscreenchange", onExitFullScreenEscape);

    return () => {
      document.removeEventListener("fullscreenchange", onExitFullScreenEscape);
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-auto gap-1 items-stretch min-h-[80vh]">
        {cameras.map((camera, index) => (
          <React.Fragment key={index}>
            <VideoRecordingScreen camera={camera} />
          </React.Fragment>
        ))}
      </div>
      <div className="hidden md:flex justify-end py-3">
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
