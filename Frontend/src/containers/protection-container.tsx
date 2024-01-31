"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { loggedInNavBarItems, guestNavBarItems } from "@/data";
import { useCameraSlice, useSessionSlice } from "@/hooks";
import { useQuery } from "react-query";
import { getCameras } from "@/api";

export const ProtectionContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  /* state to check if ant design styled loaded */
  const { session } = useSessionSlice();
  const router = useRouter();
  const pathname = usePathname();
  const [isAllowedPath, setIsAllowedPath] = useState<boolean | undefined>();
  const [renderChildren, setRenderChildren] = useState<boolean>(false);
  const { setCameras } = useCameraSlice();

  // Initialize camera
  const { data: camerasFetchedData } = useQuery("cameras", getCameras(), {
    enabled: session !== null,
  });

  /* useEffect */
  useEffect(() => {
    if (camerasFetchedData && session) {
      setCameras(
        camerasFetchedData.map((item) => ({ ...item, isActive: true }))
      );
    }
  }, [camerasFetchedData, session]);

  useEffect(() => {
    if (
      (loggedInNavBarItems.find((navItem) => pathname === navItem.route) &&
        session) ||
      guestNavBarItems.find((navItem) => pathname === navItem.route)
    ) {
      setIsAllowedPath(true);
    } else {
      setIsAllowedPath(false);
    }
  }, [session, pathname]);

  useEffect(() => {
    if (isAllowedPath !== undefined) {
      if (!isAllowedPath) {
        router.push("/login");
      } else if (
        isAllowedPath &&
        session &&
        (pathname === "/login" || pathname === "/")
      ) {
        setRenderChildren(false);
        window.location.href =
          "http://" + window.location.host + "/video-stream";
      } else if (isAllowedPath) {
        setRenderChildren(true);
      }
    }
  }, [isAllowedPath, pathname, session]);

  return <>{renderChildren && <>{children}</>}</>;
};
