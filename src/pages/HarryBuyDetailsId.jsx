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
        if (Array.isArray(response.data)) {
          setHarryBuy(response.data);
        } else {
          // Handle the case where response.data is not an array
          console.error("Response data is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.error("Axios Error:", error);
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
              <p className="alma_title_header">Условия акции</p>
              <span></span>
            </div>
          </div>
          <div className="container">
            <div className="harry_buy_block">
              {harryBuy.map((el, id) => (
                <div
                  key={id}
                  onClick={() => navigate(`/get-shot-details-id/${el.id}`)}
                  className="special_box"
                >
                  <div className="harry_sp_box">
                    <div className="price_title_text_block">
                      <div className="alma_price_block">
                        <div className="harry_price_box">
                          <h1>{el.prom_price}</h1> <span>{el.price}</span>
                        </div>
                        <div className="harry_list_prom">
                          <p className="harry_percentage">{el.percentage}</p>
                        </div>
                        <div className="prom_line_harry"></div>
                      </div>
                      <div className="harry_buy_title_block">
                        <h1 className="harry_title">{el.title}</h1>
                        <p>{el.net}</p>
                        <h2>{el.where}</h2>
                      </div>
                    </div>
                    <div className="harry_buy_img_block">
                      <img src={el.img} alt="" />
                    </div>
                    <div className="harry_buy_date_block">{el.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HarryBuyDetailsId;
