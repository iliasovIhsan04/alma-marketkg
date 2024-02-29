import React from "react";
import more from "../img/more.svg";
import { useNavigate } from "react-router";

const PurchaseHistoryDetailsId = () => {
  const navigate = useNavigate();
  return (
    <div id="modal">
      <div className="purchase_history_details">
        <div className="nav">
          <div className="container d-flex justify-content-between align-items-center ">
            <img
              className="more_img"
              onClick={() => navigate("/dashboard")}
              src={more}
              alt=""
            />
            <p className="alma_title_header">Информация по чеку</p>
            <span></span>
          </div>
        </div>
        <div className="container">
          <div className="check_information_block"></div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistoryDetailsId;
