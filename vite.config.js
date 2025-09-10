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
            keyframes: {
              fadeInLeft: {
                "0%": { opacity: "0", transform: "translateX(-50px)" },
                "100%": { opacity: "1", transform: "translateX(0)" },
              },
              moveStars: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-1000px)" },
        },
       
              fadeInRight: {
                "0%": { opacity: "0", transform: "translateX(50px)" },
                "100%": { opacity: "1", transform: "translateX(0)" },
              },
            },
             animation: {
        moveStars: "moveStars 200s linear infinite",
      },
          },
        },
      },
    }),
  ],
});
