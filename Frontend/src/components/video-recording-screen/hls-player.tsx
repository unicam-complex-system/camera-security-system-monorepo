import React, { useEffect, useRef } from "react";
import Hls from "hls.js";
import { Camera } from "@/types";
import { useSessionSlice } from "@/hooks";

const HlsPlayer = ({ camera }: { camera: Camera }) => {
  const videoRef: any = useRef(null);
  const { session } = useSessionSlice();

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
    <video
      ref={videoRef}
      controls
      className="w-full min-h-[250px]"
      autoPlay={true}
      muted={true}
    ></video>
  );
};

export default HlsPlayer;
