import React from "react";
import presentation from "../video/presentation.mp4";
import TopProducts from "./TopProducts";

export default function Header() {
  return (
    <>
      <div className="header__container">
        <div className="header__contentBox">
          <h1 className="header__contentBox-title">Welcome to Shopify</h1>
          <p className="header__contentBox-subtitle">
            Shop online and join our trusted costumers
          </p>
        </div>
        <div className="header__videoBox">
          <video
            src={presentation}
            autoPlay
            muted
            loop
            type="video/mp4"
            className="header__videoBox-video"
          />
        </div>
      </div>
    </>
  );
}
