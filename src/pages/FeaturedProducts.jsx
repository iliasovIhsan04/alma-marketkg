import React from "react";
import more from "../img/more.svg";
import { useNavigate } from "react-router";
import featured_img from "../img/empty_favorites.svg";

const FeaturedProducts = () => {
  const navigate = useNavigate();
  return (
    <div id="modal">
      <div className="featured_products">
        <div className="nav">
          <div className="container d-flex justify-content-between align-items-center ">
            <img
              className="more_img"
              onClick={() => navigate("/dashboard")}
              src={more}
              alt=""
            />
            <p className="alma_title_header">Избранные товары</p>
            <span></span>
          </div>
        </div>
        <div className="container">
          <div className="featured_products_block">
            <img src={featured_img} alt="" />
            <h1>Пока тут пусто</h1>
            <p>
              Добавьте в избранное всё, что душе угодно, а мы доставим заказ
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

export default FeaturedProducts;
