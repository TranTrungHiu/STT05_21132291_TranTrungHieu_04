import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { preloadSvgIcons } from "./utils/svgHelper.js";

// Preload critical SVG icons
const criticalIcons = [
  "/src/assets/images/icons/video.svg",
  "/src/assets/images/icons/heart.svg",
  "/src/assets/images/icons/heart-filled.svg",
  "/src/assets/images/icons/eye.svg",
  "/src/assets/images/icons/thumbs-up.svg",
  "/src/assets/images/icons/user-plus.svg",
];

// Preload icons before rendering the app
preloadSvgIcons(criticalIcons).then(() => {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
