import React from "react";
import more from "../img/more.svg";
import { useNavigate } from "react-router";
import cart_img from "../img/empty_cart.svg";

const BasketProduct = () => {
  const navigate = useNavigate();
  return (
    <div id="modal">
      <div className="basket_product">
        <div className="nav">
          <div className="container d-flex justify-content-between align-items-center ">
            <img
              className="more_img"
              onClick={() => navigate("/")}
              src={more}
              alt=""
            />
            <p className="alma_title_header">Корзина</p>
            <span></span>
          </div>
        </div>
        <div className="container">
          <div className="featured_products_block basket_top">
            <img src={cart_img} alt="" />
            <h1>Пока тут пусто</h1>
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

export default BasketProduct;
