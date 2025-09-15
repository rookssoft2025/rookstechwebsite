import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      config: {
        theme: {
          extend: {
            fontFamily: {
              goodtimes: ["Good Times", "sans-serif"], // ✅ custom font
            },
            // ✅ transforms + perspective
            transform: {
              "preserve-3d": "preserve-3d",
              "rotate-y-180": "rotateY(180deg)",
            },
            perspective: {
              none: "none",
              1000: "1000px",
            },
            // ✅ keyframes
            keyframes: {
              fadeInLeft: {
                "0%": { opacity: "0", transform: "translateX(-50px)" },
                "100%": { opacity: "1", transform: "translateX(0)" },
              },
              fadeInRight: {
                "0%": { opacity: "0", transform: "translateX(50px)" },
                "100%": { opacity: "1", transform: "translateX(0)" },
              },
              moveStars: {
                "0%": { "background-position": "0 0" },
                "100%": { "background-position": "500px 500px" },
              },
              pulseStar: {
                "0%": { opacity: "0.2", transform: "scale(0.8)" },
                "50%": { opacity: "1", transform: "scale(1.2)" },
                "100%": { opacity: "0.2", transform: "scale(0.8)" },
              },
              float: {
                "0%, 100%": { transform: "translateY(0px)" },
                "50%": { transform: "translateY(-10px)" },
              },
            },
            // ✅ animations
            animation: {
              fadeInLeft: "fadeInLeft 0.5s ease-out forwards",
              fadeInRight: "fadeInRight 0.5s ease-out forwards",
              moveStars: "moveStars 100s linear infinite",
              pulseStar: "pulseStar 3s ease-in-out infinite",
              float: "float 3s ease-in-out infinite",
            },
          },
        },
      },
    }),
  ],
});
