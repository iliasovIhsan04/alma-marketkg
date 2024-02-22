import React, { useEffect, useState } from "react";
import "../style/css/main.css";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { url } from "../Api";
import more from "../img/more.svg";

const GetShotDetailsId = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState([]);
  useEffect(() => {
    axios
      .get(url + `/card/${id}`)
      .then((response) => setCard(response.data))
      .catch();
  }, []);
  return (
    <div id="modal">
      <div className="get_shot_details_id">
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
        <div className="alma_detail_id_block">
          <div className="container">
            <div className="alma_detail_date">
              <span className="date_cll1">Акция</span>
              <span className="date_cll2">{card.dateto}</span>
            </div>
            <div className="alma_detail_img_block">
              <img src={card.img} alt="" />
            </div>
            <h1 className="get_price_title_alma">{card.title}</h1>
            <p
              dangerouslySetInnerHTML={{ __html: card.text }}
              className="price_text_alma"
            ></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetShotDetailsId;
