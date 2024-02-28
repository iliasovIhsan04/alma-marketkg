import React from "react";
import more from "../img/more.svg";
import { useNavigate } from "react-router";
import history_img from "../img/empty_history.svg";

const PurchaseHistory = () => {
  const navigate = useNavigate();
  return (
    <div id="modal">
      <div className="purchase_history">
        <div className="nav">
          <div className="container d-flex justify-content-between align-items-center ">
            <img
              className="more_img"
              onClick={() => navigate("/dashboard")}
              src={more}
              alt=""
            />
            <p className="alma_title_header">История покупок</p>
            <span></span>
          </div>
        </div>
        <div className="container">
          <div className="featured_products_block">
            <img src={history_img} alt="" />
            <h1 className="history_featured_text">
              Вы не сделали ни одной покупки, но это поправимо...
            </h1>
            <p>
              Добавьте в корзину всё, что душе угодно, а мы доставим заказ
              от 150 сом
            </p>
            <button onClick={() => navigate("/shop-all/shop")}>
              Перейти в каталог
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistory;
