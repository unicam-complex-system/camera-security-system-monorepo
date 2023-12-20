"use client";
import type { FC } from "react";
import React from "react";
import { aboutUsData } from "@/data";

/* This container renders contact us sections */
export const AboutUsMissionContainer: FC = () => {
  return (
    <div className="grid md:grid-cols-2 gap-x-8 px-4 py-12">
      <div>
        <h2 className="text-center text-secondary">
          {aboutUsData.missionHeading}
        </h2>
        <p className="leading-relaxed text-justify">{aboutUsData.missionParagraph}</p>
      </div>
      <div className="flex items-center">
        <img
          className="max-w-full rounded-lg"
          src={aboutUsData.missionImage}
          alt="Overview image"
        />
      </div>
    </div>
  );
};
