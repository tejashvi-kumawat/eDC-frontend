import React from "react";
import "./FireStrip.css";

export default function FireStrip() {
  return (
    <div className="fire-strip">
      <video
        className="fire-video"
        src="/assets/fire.webm"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/assets/fire.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
