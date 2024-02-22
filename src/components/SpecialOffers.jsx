import React, { useEffect } from "react";
import "../style/css/main.css";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { allPromotionList } from "../Redux/reduser/AllPromotions";
import more_prom from "../img/more_prom.svg";

const SpecialOffers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.myData);

  useEffect(() => {
    dispatch(allPromotionList());
  }, [dispatch]);

  return (
    <div className="special_offers">
      <div className="container">
        <div className="special_block">
          {data.map((el, id) => (
            <div
              key={id}
              onClick={() => navigate(`/get-shot-details-id/${el.id}`)}
              className="special_box"
            >
              <div className="special_promotion_wh">
                <div className="div_box">
                  <img
                    className="special_image"
                    src={el.img}
                    alt=""
                    loading="lazy"
                  />
                </div>
                <h1>{el.title}</h1>
                <button>
                  Подробнее <img src={more_prom} alt="" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialOffers;
