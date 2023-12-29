"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { loggedInNavBarItems, guestNavBarItems } from "@/data";
import { useSessionSlice } from "@/hooks";

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

  /* useEffect */
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
        router.push("/video-stream");
      } else if (isAllowedPath) {
        setRenderChildren(true);
      }
    }
  }, [isAllowedPath, pathname, session]);

  return <>{renderChildren && <>{children}</>}</>;
};
