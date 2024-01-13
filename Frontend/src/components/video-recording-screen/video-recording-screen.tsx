import { useEffect, type FC, useRef } from "react";
import { useNotificationSlice } from "@/hooks";
import { Camera } from "@/types";
import HLSPlayer from "./hls-player";
import { Socket } from "socket.io-client";
import React from "react";
const Peer = require("simple-peer");

type PropsType = {
  camera?: Camera;
  videoRef: any;
};


/**  This component renders a single video recording screen */
export const VideoRecordingScreen: FC<PropsType> = ({ camera, videoRef }) => {
  const { openNotification } = useNotificationSlice();
  console.log(videoRef);

  return (
    <>
      {camera && (
        <>
          {camera.isActive && (
            // <iframe className="w-full min-h-[250px]" src={camera.url}></iframe>
            <HLSPlayer camera={camera} />
            // <video
            //   className="w-full min-h-[250px]"
            //   ref={(el) => {
            //     console.log(el);
            //     videoRef.current = { ...videoRef.current, [camera.key]: el };
            //     console.log(videoRef);
            //   }}
            // />
          )}
          {!camera.isActive && (
            <div className="bg-black min-h-[250px] relative">
              <span className="absolute animate-pulse top-1/2 left-1/2 bg-red-500 -translate-x-1/2 -translate-y-1/2 rounded-full w-8 h-8"></span>
              <p className="text-white">NO SIGNAL</p>
              <p className="absolute text-white text-xl top-2/3 left-1/2 -translate-x-1/2 font-bold">
                {camera.name}
              </p>
            </div>
          )}
        </>
      )}

      {!camera && <div className="bg-black min-h-[250px]" />}
    </>
  );
};
