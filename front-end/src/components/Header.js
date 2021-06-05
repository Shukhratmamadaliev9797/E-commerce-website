import React from "react";
import TopProducts from "./TopProducts";

export default function Header() {
  return (
    <div className="header">
      <div className="header__top">
        <div className="header__top__text">
          <div className="header__top__text-box">
            <h1>Each purchase will be made with pleasure!</h1>
            <p>
              We work with global brands and have created an application for you
              to do your shopping
            </p>
          </div>
        </div>
        <div className="header__top__picture">
          <img src="./images/shopping.png" alt="logo" />
        </div>
      </div>
      <div className="header__bottom">
        <TopProducts />
      </div>
    </div>
  );
}
