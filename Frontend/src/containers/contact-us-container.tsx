"use client";
import type { FC } from "react";
import {
  WhatsAppOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import React from "react";

/* This container renders contact us sections */
export const ContactUsContainer: FC = () => {
  return (
    <div className="text-white flex flex-col md:flex-row rounded-md">
      <div className="bg-secondary grow px-6 py-3">
        <h2>We're here</h2>
        <p>Our door is always open for a good cup of coffee.</p>

        <div>
          <h3>Our Office</h3>
          <p>Le Mosse Colle Pardiso</p>
          <p>Macerata, Camerino 62032</p>
          <p>Italy, IT</p>
        </div>
      </div>
      <div className="bg-primary grow px-6 py-3">
        <h2>Let's talk</h2>
        <p>Share your excitment with us.</p>

        <div>
          <h3>Lets talk through</h3>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <MailOutlined className="text-lg" />
              <p>info@css.com</p>
            </div>

            <div className="flex gap-2">
              <PhoneOutlined className="text-lg" />
              <p>+39 312 456 7890</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
