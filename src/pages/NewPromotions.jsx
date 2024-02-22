import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import more_left from "../img/more-left.svg";
import { url } from "../Api";

const NewPromotions = () => {
  const navigate = useNavigate();
  const [newPromotions, setNewPromotions] = useState([]);

  useEffect(() => {
    axios
      .get(url + "/card/type/two")
      .then((response) => {
        setNewPromotions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="new_promotions">
      <div className="get_shot">
        <div className="container">
          <div className="title">
            <p className="text t-custom">Акции</p>
            <h4
              className="title_add t-custom"
              onClick={() => navigate("/promotion")}
            >
              Все
              <img src={more_left} alt="" />
            </h4>
          </div>
          <div className="new_block_all">
            {newPromotions.map((el, id) => (
              <div
                key={id}
                onClick={() => navigate(`/get-shot-details-id/${el.id}`)}
                className="new_promotion_block"
              >
                <div className="new_promotion_box">
                  <div className="new_promotion_img_block">
                    <img
                      className="new_promotion_img"
                      src={el.img}
                      alt=""
                      loading="lazy"
                    />
                  </div>
                  <h1>{el.title}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPromotions;
