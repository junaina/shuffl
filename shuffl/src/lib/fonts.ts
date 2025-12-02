// src/app/fonts.ts
import localFont from "next/font/local";

export const shufflScript = localFont({
  src: [
    {
      path: "../app/fonts/shuffl-font.ttf", // relative to THIS file
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-shuffl-font", // optional but useful for Tailwind
  display: "swap",
});
