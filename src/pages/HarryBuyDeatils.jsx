import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "../style/css/main.css";
import more from "../img/more.svg";
import { allHarryBuyList } from "../Redux/reduser/AllHarryBuy";

const HarryBuyDeatils = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.myData);

  useEffect(() => {
    dispatch(allHarryBuyList());
  }, [dispatch]);
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
              <p className="alma_title_header">Успей купить</p>
              <span></span>
            </div>
          </div>
          <div className="container">
            <div className="harry_buy_block">
              {data.map((el, id) => (
                <div
                  key={id}
                  onClick={() => navigate(`/harry-buy-details-id/${el.id}`)}
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

export default HarryBuyDeatils;
