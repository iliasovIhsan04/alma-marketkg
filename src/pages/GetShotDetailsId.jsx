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
            <span className="date-cll1">Акция</span>
            <span className="date-cll2">{card.dateto}</span>
          </div>
          <div className="alma_detail_img_block">
            <img src={card.img} alt="" />
          </div>
          <h1 className="price_title_alma">{card.title}</h1>
          <p className="price_text_alma">
            В честь праздника Святого Валентино 14-февраля, наш гипермаркет
            “Алма” дествуют приятные скидки для шоколадов компаний “Рафаелло” и
            “Мерси”. Радуйте своих любимых!
          </p>
        </div>
      </div>
    </div>
  );
};

export default GetShotDetailsId;
