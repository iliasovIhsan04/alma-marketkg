import React, { useState } from "react";
import { BiBell } from "react-icons/bi";
import logoalma from "../img/logo-alma.svg";
import cart from "../img/cart-icons.svg";
import "../style/css/App.css";
import "../style/css/media.css";
import "../style/css/main.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [cartFalse, setCartFalse] = useState(false);
  const plusItems = JSON.parse(localStorage.getItem("plusOne"));
  let totalQuantity = 0;

  if (plusItems) {
    totalQuantity = Object.values(plusItems).reduce(
      (acc, curr) => acc + parseInt(curr),
      0
    );
  }

  return (
    <div className="nav relative">
      <div className="container nav_content">
        <BiBell
          className="fi"
          color="#191919"
          onClick={() => navigate("/notifications")}
        />
        <img className="alma_header_img" src={logoalma} alt="" />
        <img
          onClick={() => navigate("/basket-product")}
          className="more_img"
          src={cart}
          alt=""
        />
      </div>
      {JSON.parse(localStorage.getItem("false")) === cartFalse ? (
        <div className="border_red" onClick={() => navigate("/basket-product")}>
          <p> {totalQuantity}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Header;
