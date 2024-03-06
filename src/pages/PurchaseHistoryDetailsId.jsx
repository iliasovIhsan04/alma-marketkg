import React, { useEffect, useState } from "react";
import more from "../img/more.svg";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { url } from "../Api";
import line_list from "../img/list-line.svg";
import bonus_plus from "../img/bonus-plus-img1.svg";
import bonus_minus from "../img/bonus-plus-mg.svg";

const PurchaseHistoryDetailsId = () => {
  const { id } = useParams();
  const [local, setLocal] = useState(localStorage.getItem("tokens"));
  const headers = {
    Authorization: `Token ${local}`,
  };
  const navigate = useNavigate();
  const [order, setOrder] = useState([]);

  useEffect(() => {
    axios
      .get(url + `/order/${id}`, { headers })
      .then((response) => {
        setOrder(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <div id="modal">
      <div className="purchase_history_details">
        <div className="nav">
          <div className="container d-flex justify-content-between align-items-center ">
            <img
              className="more_img"
              onClick={() => navigate("/purchase-history")}
              src={more}
              alt=""
            />
            <p className="alma_title_header">Информация по чеку</p>
            <span></span>
          </div>
        </div>
        <div className="container">
          <div className="check_information_block">
            <div className="featured_list_box purchase_id_list">
              <div className="feat_sum_block">
                <h1>Покупка на сумму</h1>
                <h2>{order.sum}</h2>
              </div>
              <p>{order.address_from}</p>
              <div className="time_bonus_block">
                <span>{order.date}</span>
                <h3>+13 баллов</h3>
              </div>
            </div>
            <div className="line_list_box">
              <img src={line_list} alt="" />
            </div>
            {order &&
              order?.product?.map((el) => (
                <div className="cost_order">
                  <div className="count_order_box">
                    <p>{el.title}</p>
                    <div className="cost_count">
                      <p> {el.cost}</p>
                      <span>{el.count}</span>
                    </div>
                  </div>
                </div>
              ))}
            <div className="line_list_box">
              <img src={line_list} alt="" />
            </div>
            <div className="bonus_block_minus">
              <div className="minus_box">
                <img src={bonus_minus} alt="" />
                <p>Баллов использовано:</p>
              </div>
              <span>0</span>
            </div>
            <div className="bonus_block_plus">
              <div className="minus_box">
                <img src={bonus_plus} alt="" />
                <p>Баллов начислено:</p>
              </div>
              <span>+13</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistoryDetailsId;
