import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "../style/css/main.css";
import axios from "axios";
import { url } from "../Api";
import more from "../img/more.svg";

const HarryBuyDetailsId = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [harryBuy, setHarryBuy] = useState([]);

  useEffect(() => {
    axios
      .get(url + `/card/one/${id}`)
      .then((response) => {
        console.log("Данные ответа:", response.data);
        setHarryBuy(response.data);
      })
      .catch((error) => {
        console.error("Ошибка Axios:", error);
      });
  }, []);

  return (
    <>
      <div id="modal">
        <div className="harry_buy_shot">
          <div className="nav">
            <div className="container d-flex justify-content-between align-items-center ">
              <img
                className="more_img"
                onClick={() => navigate("/")}
                src={more}
                alt=""
              />
              <p className="alma_title_header">Условия скидки</p>
              <span></span>
            </div>
          </div>
          <div className="container">
            <div className="harry_buy_id_block">
              <div className="alma_detail_date">
                <span className="date_cll1">Акция</span>
                <span className="date_cll2">{harryBuy.date}</span>
              </div>
              <div className="harry_sp_box">
                <div className="price_title_text_block">
                  <div className="alma_price_block">
                    <div className="harry_price_box">
                      <h1>{harryBuy.prom_price}</h1>{" "}
                      <span>{harryBuy.price}</span>
                    </div>
                    <div className="harry_list_prom">
                      <p className="harry_percentage">{harryBuy.percentage}</p>
                    </div>
                    <div className="prom_line_harry"></div>
                  </div>
                  <div className="harry_buy_title_block">
                    <h1 className="harry_title">{harryBuy.title}</h1>
                    <p>{harryBuy.net}</p>
                    <h2>{harryBuy.where}</h2>
                  </div>
                </div>
                <div className="harry_buy_img_block">
                  <img src={harryBuy.img} alt="" />
                </div>
                <div className="harry_buy_date_block">{harryBuy.date}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HarryBuyDetailsId;
