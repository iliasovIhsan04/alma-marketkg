import React from "react";
import SpecialOffers from "../components/SpecialOffers";
import { useNavigate } from "react-router";
import more from "../img/more.svg";

const Promotion = () => {
  const navigate = useNavigate();
  return (
    <div className="promotion">
      <div className="nav">
        <div className="container d-flex justify-content-between align-items-center ">
          <img
            className="more_img"
            onClick={() => navigate("/")}
            src={more}
            alt=""
          />
          <p className="alma_title_header">Акции</p>
          <span></span>
        </div>
      </div>
      <SpecialOffers />
    </div>
  );
};

export default Promotion;
