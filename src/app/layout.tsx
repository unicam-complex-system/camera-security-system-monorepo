import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { StoreProvider } from "@/store";
import React from "react";
import { LayoutContainer } from "@/containers";

/* font */
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Camera Security System",
  description: "Camera Security System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <StoreProvider>
          <LayoutContainer>{children}</LayoutContainer>
        </StoreProvider>
      </body>
    </html>
  );
}
