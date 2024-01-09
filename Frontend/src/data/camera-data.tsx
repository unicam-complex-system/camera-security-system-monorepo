"use client";
import { Camera } from "@/types";

export const cameras: Camera[] = [
  {
    key: "backyard",
    name: "Backyard",
    isActive: true,
    url: "http://localhost:8080/hls/1",
  },
  {
    key: "main-road",
    name: "Main road",
    isActive: true,
    url: "https://www.youtube.com/embed/yNQmth5kUZ0?modestbranding=1&showinfo=0&controls=0&autoplay=1&mute=1",
  },
  {
    key: "door",
    name: "Door",
    isActive: true,
    url: "https://www.youtube.com/embed/dV9ngLCKE7k?modestbranding=1&showinfo=0&controls=0&autoplay=1&mute=1",
  },
  {
    key: "pet-room",
    name: "Pet room",
    isActive: true,
    url: "https://www.youtube.com/embed/ewEW_xAKRMg?modestbranding=1&showinfo=0&controls=0&autoplay=1&mute=1",
  },
  {
    key: "basement",
    name: "Basement",
    isActive: false,
    url: "https://www.youtube.com/embed/ewEW_xAKRMg?modestbranding=1&showinfo=0&controls=0&autoplay=1&mute=1",
  },
  {
    key: "baby-room",
    name: "Baby room",
    isActive: false,
    url: "https://www.youtube.com/embed/ewEW_xAKRMg?modestbranding=1&showinfo=0&controls=0&autoplay=1&mute=1",
  },
];
