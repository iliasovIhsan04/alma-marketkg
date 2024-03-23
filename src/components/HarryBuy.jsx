import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "../style/css/main.css";
import { fetchData } from "../Redux/reduser/fetchData";
import more_left from "../img/more-left.svg";

const HarryBuy = ({ token }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.myData);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  return (
    <>
      {token ? (
        <div className="get_shot">
          <div className="container">
            <div className="title">
              <p className="text t-custom">Успей купить</p>
              <h4
                className="title_add t-custom"
                onClick={() => navigate("/harry")}
              >
                Все
                <img src={more_left} alt="" />
              </h4>
            </div>
            <div className="get_block_all_block">
              {data.map((el, id) => (
                <div
                  key={id}
                  onClick={() => navigate(`/harry-buy-details-id/${el.id}`)}
                  className="special_box_blok"
                >
                  <div className="sp_box">
                    <div className="price_title_text_block">
                      <div className="alma_price_block">
                        <div className="alma_price_box">
                          <h1>{el.prom_price}</h1> <span>{el.price}</span>
                        </div>
                        <div className="list_prom">
                          <p>{el.percentage}</p>
                        </div>
                        <div className="prom_line"></div>
                      </div>
                      <div className="sp_title_text_block">
                        <h1>{el.title}</h1>
                        <p>{el.net}</p>
                        <h2>{el.where}</h2>
                      </div>
                    </div>
                    <div className="price_img_block">
                      <img src={el.img} alt="" />
                    </div>
                    <div className="price_date_block">
                      <div className="data_white1"></div>
                      {el.date}
                      <div className="data_white"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default HarryBuy;
