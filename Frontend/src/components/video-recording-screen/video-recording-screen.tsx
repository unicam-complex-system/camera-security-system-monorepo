import type { FC } from "react";
import { Camera } from "@/types";

type PropsType = {
  camera?: Camera;
  socket?: any;
};

/**  This component renders a single video recording screen */
export const VideoRecordingScreen: FC<PropsType> = ({ camera, socket }) => {
  socket?.on("connect", () => {
    if (camera && camera.isActive) {
      socket.emit("message", { id: camera.key });
    }
  });

  if (camera && camera.isActive) {
    socket?.on(camera.key, (...args: any[]) => {
      console.log(args);
    });
  }

  socket?.on("disconnect", (reason) => {
    // ...
    console.log(reason);
  });

  return (
    <>
      {camera && (
        <>
          {camera.isActive && (
            <iframe className="w-full min-h-[250px]" src={camera.url}></iframe>
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
