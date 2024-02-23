import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import more from "../img/more.svg";
import axios from "axios";
import "../style/css/App.css";
import "../style/css/main.css";
import "../style/css/modal.css";
import { url } from "../Api";

const Product = () => {
  const { id } = useParams();
  const [datas, setDatas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(url + `/product/detail/${id}`)
      .then((response) => setDatas(response.data))
      .catch();
  }, [id]);
  const mun = JSON.parse(localStorage.getItem("plus"));
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
          <div className="blocks_product">
            <img className="date_img" src={datas.img} alt={datas.title} />
          </div>
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
          <p className="description_text">
            Всего один ломтик этого нежного продукта с лёгкими пикантными
            нотками поднимет ваше настроение и зарядит бодростью на весь
            день. Всё потому, что колбасный сыр "БЕЛАЯ РЕКА" натуральный и богат
            витаминами и микроэлементами, необходимыми для вашего здоровья.
          </p>
          <button className="description_btn">Добавить в корзину</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
