"use client";
import type { FC } from "react";
import React from "react";
import { aboutUsData } from "@/data";

/* This container renders contact us sections */
export const AboutUsTeamContainer: FC = () => {
  return (
    <div className="flex flex-col items-center bg-primary text-white px-4 py-12">
      <h2 className="text-center">{aboutUsData.teamHeading}</h2>
      <p className="leading-relaxed pb-3 sm:w-1/2 text-center">
        {aboutUsData.teamParagraph}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-8">
        {aboutUsData.teamMembers.map((item, index) => (
          <div className="flex flex-col gap-y-4 items-center" key={index}>
            <img
              className="block rounded-lg w-full max-h-72 object-cover"
              src={item.image}
              alt="Overview image"
            />
            <span className="font-bold text-lg">{item.name}</span>
            <span className="">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
