import React from "react";
import { BiBell } from "react-icons/bi";
import logoalma from "../img/logo-alma.svg";
import "../style/css/App.css";
import "../style/css/media.css";
import "../style/css/main.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="nav relative">
      <div className="container nav_content">
        <span></span>
        <img className="alma_header_img" src={logoalma} alt="" />
        <BiBell
          className="fi"
          color="#191919"
          onClick={() => navigate("/notifications")}
        />
      </div>
    </div>
  );
};

export default Header;
