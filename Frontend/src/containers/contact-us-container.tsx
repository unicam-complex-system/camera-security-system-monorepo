"use client";
import type { FC } from "react";
import React from "react";
import { contactUsData } from "@/data";

/* This container renders contact us sections */
export const ContactUsContainer: FC = () => {
  return (
    <div className="text-white flex flex-col md:flex-row rounded-md">
      <div className="bg-secondary grow px-6 py-3">
        <h2>We&apos;re here</h2>
        <p>Our door is always open for a good cup of coffee.</p>

        <div>
          <h3>Our Office</h3>
          <p>Le Mosse Colle Pardiso</p>
          <p>Macerata, Camerino 62032</p>
          <p>Italy, IT</p>
        </div>
      </div>
      <div className="bg-primary grow px-6 py-3">
        <h2>Let&apos;s talk</h2>
        <p>Share your excitment with us.</p>

        <div>
          <h3>Lets talk through</h3>
          <div className="flex flex-col">
            {contactUsData.map((item, index) => (
              <a href={item.url} key={index} className="text-white">
                <div className="flex items-center gap-2">
                  {item.icon}
                  <p>{item.label}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
