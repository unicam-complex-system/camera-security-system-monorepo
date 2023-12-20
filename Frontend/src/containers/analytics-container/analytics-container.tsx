"use client";
import type { FC } from "react";
import React from "react";
import { AuthorizedCounterContainer } from "./authorized-counter/authorized-counter";
import { UnauthorizedCounterContainer } from "./unauthorized-counter/unauthorized-counter";
import { AuthorizedUnauthorizedPieContainer } from "./authorized-unauthorized-pie/authorized-unauthorized-pie";
import { AuthorizedUnauthorizedLineContainer } from "./authorized-unauthorized-line/authorized-unauthorized-line";
import { UserAreaBarContainer } from "./user-area-bar/user-area-bar";
import { RecentAuthorizedContainer } from "./recent-authorized/recent-authorized";
import { RecentUnauthorizedContainer } from "./recent-unauthorized/recent-unauthorized";

/* This container renders analytics sections */
export const AnalyticsContainer: FC = () => {
  return (
    <div>
      <div className="grid gap-4 grid-cols-3">
        <UnauthorizedCounterContainer />

        <AuthorizedCounterContainer />

        <AuthorizedUnauthorizedPieContainer />
      </div>

      <div className="grid pt-4 grid-cols-1">
        <AuthorizedUnauthorizedLineContainer />
      </div>
      <div className="grid pt-4 grid-cols-1">
        <UserAreaBarContainer />
      </div>

      <div className="grid py-4 gap-4 grid-cols-2">
        <RecentAuthorizedContainer />

        <RecentUnauthorizedContainer />
      </div>
    </div>
  );
};
