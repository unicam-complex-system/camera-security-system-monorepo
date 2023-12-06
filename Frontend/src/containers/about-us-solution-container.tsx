"use client";
import type { FC } from "react";
import React from "react";
import { aboutUsData } from "@/data";

/* This container renders contact us sections */
export const AboutUsSolutionContainer: FC = () => {
  return (
    <div className="grid md:grid-cols-2 gap-x-8 bg-primary text-white px-4 py-12">
      <div className="md:order-last">
        <h2 className="text-center">
          {aboutUsData.solutionHeading}
        </h2>
        <p className="leading-relaxed text-justify">{aboutUsData.solutionParagraph}</p>
      </div>
      <div className="flex items-center">
        <img
          className="max-w-full rounded-lg"
          src={aboutUsData.solutionImage}
          alt="Overview image"
        />
      </div>
    </div>
  );
};
