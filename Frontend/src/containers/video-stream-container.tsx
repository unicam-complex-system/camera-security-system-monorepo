"use client";
import type { FC } from "react";
import { Tooltip } from "antd";
import { VideoRecordingScreen } from "@/components";
import { useCameraSlice } from "@/hooks";
import { FullscreenOutlined, FullscreenExitOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { OpenVidu } from "openvidu-browser";

type PropsType = {
  sizePerScreen?: number;
};

const webSocketURL = process.env.NEXT_PUBLIC_BACKEND_URL
  ? process.env.NEXT_PUBLIC_BACKEND_URL
  : "";

/* This container renders different video recording screens */
export const VideoStreamContainer: FC<PropsType> = ({ sizePerScreen = 9 }) => {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  /* hooks */
  const {
    cameras,
    isFullScreenGrid,
    toggleIsFullScreenGrid,
    updateCameraStatus,
  } = useCameraSlice();
  const videoRef: any = useRef(null);

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
    const socket = io(webSocketURL, {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          },
        },
      },
    });

    const openVidu = new OpenVidu();
    const session = openVidu.initSession();

    const disconnectSession = () => {
      if (session) {
        session.disconnect();
      }
    };
    window.addEventListener("beforeunload", disconnectSession);

    // client-side
    socket.on("connect", async () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx

      try {
        session.on("streamCreated", (event) => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          let subscriber = session.subscribe(event.stream, undefined);

          // Update the state with the new subscribers
          setSubscribers([...subscribers, subscriber]);
        });

        // On every Stream destroyed...
        session.on("streamDestroyed", (event) => {
          // Remove the stream from 'subscribers' array
          console.log(event);
          const streamManager = event.stream.streamManager;
          setSubscribers(
            subscribers.filter((subscriber) => subscriber != streamManager)
          );
        });

        // On every asynchronous exception...
        session.on("exception", (exception) => {
          console.error(exception);
        });
      } catch (error: any) {
        console.log(error);
      }
    });

    socket.on("disconnect", (reason) => {
      console.log(reason); // undefined
    });

    socket.on("error", (data) => {
      const error = JSON.parse(data);
      console.log(error);
    });

    socket.on("session_delivery", (data) => {
      console.log("session received");
      const message = JSON.parse(data) as { sessionId: string };
      socket.emit(
        "token_request",
        JSON.stringify({
          sessionId: message.sessionId,
        })
      );
    });

    socket.on("token_delivery", (data) => {
      console.log("token received");
      const message = JSON.parse(data) as { token: any };
      session
        .connect(message.token, { clientData: "random" })
        .then(async () => {
          // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
          // element: we will manage it on our own) and with the desired properties.
          // publishAudio and publishVideo are set to false since we only
          // want to observe the stream of IPCAM only.
          let publisher = await openVidu.initPublisherAsync(undefined, {
            audioSource: false, // The source of audio. If undefined default microphone
            videoSource: false, // The source of video. If undefined default webcam
          });

          // -Publish your stream ---

          session.publish(publisher);
        })
        .catch((error) => {
          console.log(
            "There was an error connecting to the session:",
            error.code,
            error.message
          );
        });
    });

    socket.on("participantLeft", (data) => {
      const message = JSON.parse(data);
      console.log(data);
    });

    document.addEventListener("fullscreenchange", onExitFullScreenEscape);

    return () => {
      document.removeEventListener("fullscreenchange", onExitFullScreenEscape);
      window.addEventListener("beforeunload", disconnectSession);
    };
  }, []);

  useEffect(() => {
    if (cameras.length === 8) {
      let toBeInActive = [...cameras];
      subscribers.forEach((subscriber, index) => {
        try {
          subscriber.addVideoElement(
            videoRef.current?.[subscriber?.stream?.connection?.data]
          );
          console.log(toBeInActive);

          toBeInActive = toBeInActive.filter(
            (item) => item.id != subscriber?.stream?.connection?.data
          );
        } catch (err) {
          console.log(err);
        }
        console.log(toBeInActive);
        if (index === subscribers.length - 1) {
          toBeInActive.forEach((item) =>
            updateCameraStatus({
              id: item.id,
              status: false,
            })
          );
        }
      });
    }
  }, [subscribers, cameras.length > 0]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-auto gap-1 items-stretch min-h-[80vh]">
        {cameras.map((camera, index) => (
          <React.Fragment key={index}>
            <VideoRecordingScreen camera={camera} videoRef={videoRef} />
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
