import React, { useEffect, useState } from "react";
import more from "../img/more.svg";
import { useNavigate } from "react-router";
import featured_img from "../img/empty_favorites.svg";
import shape_heart from "../img/Shape-heart.svg";
import heart from "../img/heard.svg";
const FeaturedProducts = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    setCart(cart);
  }, [cart]);

  const deleteItem = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    let localDate = [...cart];
    let newCart = cart.find((elem) => elem.id === id);
    if (newCart) {
      let newCartFilter = localDate.filter((el) => el.id !== id);
      localStorage.setItem("cart", JSON.stringify(newCartFilter));
      localStorage.removeItem(`activeItem_${id}`);
    }
  };

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart || cart.length === 0) {
      localStorage.removeItem("cart");
    }
  }, []);

  return (
    <div id={localStorage.getItem("cart") ? "fon_modal" : "modal"}>
      <div className="featured_products">
        <div className={localStorage.getItem("cart") ? "fon_nav" : "nav"}>
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
        {localStorage.getItem("cart") ? (
          <div className="container">
            <div
              className="shops_block_all pb-5"
              style={{ margin: "75px 0 0 0" }}
            >
              {cart.map((el) => (
                <div className="shops_box" key={el.id}>
                  <div className="blocks_block">
                    <div className="shape_heart">
                      {localStorage.getItem(`activeItem_${el.id}`) ===
                      `${el.id}` ? (
                        <img
                          className="shape_heart"
                          src={heart}
                          alt="shape_heart"
                          onClick={() => deleteItem(el.id)}
                        />
                      ) : (
                        <img
                          className="shape_heart"
                          src={shape_heart}
                          alt="shape_heart"
                          onClick={() => deleteItem(el.id)}
                        />
                      )}
                    </div>
                    <div
                      className="blocks"
                      onClick={() => navigate(`/shop-all/product/${el.id}`)}
                    >
                      <img src={el.preview_img} alt="" />
                    </div>
                  </div>
                  <div className="all">
                    <h3 className="title_one ">{el.title}</h3>
                    <div className="product-info">
                      <div className="product-column column-top">
                        <span>1 {el.price_for}</span>
                        <h2 className="price old">
                          {el.old_price ? el.old_price : el.price} сом
                        </h2>
                      </div>
                      {el.old_price && (
                        <div className="product-column">
                          <span className="card-text">По карте</span>
                          <h2 className="price">{el.price} сом</h2>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default FeaturedProducts;
