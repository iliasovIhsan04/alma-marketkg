import React from "react";
import { BiBell } from "react-icons/bi";
import logoalma from "../img/logo-alma.svg";
import cart from "../img/cart-icons.svg";
import "../style/css/App.css";
import "../style/css/media.css";
import "../style/css/main.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

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
    </div>
  );
};

export default Header;
