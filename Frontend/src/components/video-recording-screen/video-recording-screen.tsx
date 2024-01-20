import { type FC } from "react";
import { Camera } from "@/types";
import React from "react";
import VideoPlayer from "./video-player";

type PropsType = {
  camera?: Camera;
  videoRef: any;
};

/**  This component renders a single video recording screen */
export const VideoRecordingScreen: FC<PropsType> = ({ camera, videoRef }) => {
  return (
    <>
      {camera && (
        <>
          {camera.isActive && (
            <VideoPlayer camera={camera} videoRef={videoRef} />
          )}
          {!camera.isActive && (
            <div className="bg-black min-h-[250px] relative">
              <span className="absolute animate-pulse top-1/2 left-1/2 bg-red-500 -translate-x-1/2 -translate-y-1/2 rounded-full w-8 h-8"></span>
              <p className="text-white pl-2">NO SIGNAL</p>
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
