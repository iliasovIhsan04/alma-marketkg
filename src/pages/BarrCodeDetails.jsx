import React, { useEffect, useState } from "react";
import more from "../img/more.svg";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { url } from "../Api";
import Slider from "react-slick";

const BarrCodeDetails = () => {
  const navigate = useNavigate();
  const [datas, setDatas] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(url + `/product/barrcode/${id}`)
        .then((response) => setDatas(response.data))
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="barr_code_details">
      <div className="nav">
        <div className="container d-flex justify-content-between align-items-center ">
          <img
            className="more_img"
            onClick={() => navigate(-1)}
            src={more}
            alt=""
          />
          <p className="alma_title_header">Товар</p>
          <span></span>
        </div>
      </div>
      <div className="container">
        {datas?.status === true ? (
          <div className="block_shop">
            <Slider {...settings}>
              {datas?.img?.map((el) => (
                <div className="blocks_product">
                  <img className="date_img" src={el.img} alt="net" />
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
          </div>
        ) : (
          <div className="status_false">
            <h1>Товар не найден!</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default BarrCodeDetails;
