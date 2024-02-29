import React from "react";
import { useNavigate } from "react-router-dom";
import logoalma from "../img/logo-alma.svg";
import more from "../img/more.svg";

const SuccessProduct = () => {
  const navigate = useNavigate();
  return (
    <div id="modal">
      <div className="nav">
        <div className="container nav_content">
          <img
            className="more_img"
            onClick={() => navigate("/")}
            src={more}
            alt=""
          />
          <img src={logoalma} alt="" />
          <div />
        </div>
      </div>
      <div className="container">
        <div className="success_block">
          <div className="success_box">
            <h3>Заказ успешно оформлен</h3>
            <p>Наш оператор свяжется с Вами для подтверждения заказа</p>
          </div>
          <button className="button btn_success" onClick={() => navigate("/")}>
            Хорошо
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessProduct;
