import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import more from "../img/more.svg";
import axios from "axios";
import "../style/css/App.css";
import "../style/css/main.css";
import "../style/css/modal.css";
import { url } from "../Api";
import Slider from "react-slick";

const Product = ({ Alert }) => {
  const { id } = useParams();
  const [datas, setDatas] = useState([]);
  const [modal, setModal] = useState(false);
  const [basket, setIsBasket] = useState([]);
  const navigate = useNavigate();
  const [shopCart, setShopCart] = useState([]);

  useEffect(() => {
    const basket = JSON.parse(localStorage.getItem("carts")) || [];
    const storedShopCart = JSON.parse(localStorage.getItem("shopCart")) || [];
    setShopCart(storedShopCart);
    setIsBasket(basket);
  }, []);

  useEffect(() => {
    axios
      .get(url + `/product/detail/${id}`)
      .then((response) => setDatas(response.data))
      .catch();
  }, [id]);
  const Basket = (id) => {
    let prevID =
      localStorage.getItem("plus") !== null
        ? JSON.parse(localStorage.getItem("plus"))
        : {};
    let updatedPrevID = { ...prevID, [id]: 1 };
    localStorage.setItem("plus", JSON.stringify(updatedPrevID));
    localStorage.setItem("plusOne", JSON.stringify(updatedPrevID));
    setShopCart((prevShopCart) => {
      const updatedCart = [...prevShopCart, datas];
      localStorage.setItem("shopCart", JSON.stringify(updatedCart));
      localStorage.setItem("false", modal);
      return updatedCart;
    });
    localStorage.setItem(`activeItems_${id}`, id);
    const existingCart = JSON.parse(localStorage.getItem("carts")) || [];
    const updatedCart = [...existingCart, datas];
    localStorage.setItem("carts", JSON.stringify(updatedCart));
    if (localStorage.getItem(`activeItems_${id}`)) {
      Alert("товар уже в корзине", "success");
    } else {
      setIsBasket(false);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div id="modal" className="modal-wrap">
      <div className="nav">
        <div className="container d-flex justify-content-between align-items-center">
          <img
            className="more_img"
            onClick={() => navigate("/shop-all/shop")}
            src={more}
            alt=""
          />
          <h4 className="title_h5 all_title_one">Товар</h4>
          <div />
          <div />
        </div>
      </div>
      <div className="container">
        <div className="block_shop">
          <Slider {...settings}>
            {datas?.img?.map((el) => (
              <div className="blocks_product">
                <img className="date_img" src={el.img} alt={datas.title} />
              </div>
            ))}
          </Slider>
          <h3 className=" my-4 title_alma_product">{datas.title}</h3>
          <div className="all_alls mb-0 overflow-hidden">
            <p className="project_product price_alma_product">Артикул:</p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span className="nmb">{datas.code}</span>
            </div>
          </div>
          <div className="all_alls mb-0 overflow-hidden">
            <p className="project_product price_alma_product">Цена:</p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span className="price_old_alma">
                {datas.old_price ? datas.old_price : datas.price} сом
              </span>
            </div>
          </div>
          {datas.old_price && (
            <div className="all_alls mb-0 overflow-hidden">
              <p className="project_product price_alma_product">По карте:</p>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span className="price_old_alma alma_price_color">
                  {datas.price} сом
                </span>
              </div>
            </div>
          )}
          <h1 className="description">Описание:</h1>
          <p className="description_text">{datas.description}</p>
          {localStorage.getItem(`activeItems_${datas.id}`) ? (
            <NavLink to="/basket-product">
              <button className="description_btn">В корзине</button>
            </NavLink>
          ) : (
            <button
              className="description_btn"
              onClick={() => Basket(datas.id)}
            >
              Добавить в корзину
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
