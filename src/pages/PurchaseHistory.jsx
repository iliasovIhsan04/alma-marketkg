import React, { useEffect, useState } from "react";
import more from "../img/more.svg";
import { useNavigate } from "react-router";
import history_img from "../img/empty_history.svg";
import axios from "axios";
import { url } from "../Api";

const PurchaseHistory = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState([]);
  const [dateTo, setDateTo] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [local, setLocal] = useState(localStorage.getItem("tokens"));
  const headers = {
    Authorization: `Token ${local}`,
  };
  const ordering = async () => {
    try {
      const response = await axios.get(
        url + `/order/list/?date_to=${dateTo}&date_from=${dateFrom}`,
        { headers }
      );
      setOrder(response.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    ordering(dateFrom, dateTo);
  }, [dateFrom, dateTo]);

  const key = order[0]?.key;

  return (
    <div id="modal">
      <div className="purchase_history">
        <div className="nav">
          <div className="container d-flex justify-content-between align-items-center ">
            <img
              className="more_img"
              onClick={() => navigate("/dashboard")}
              src={more}
              alt=""
            />
            <p className="alma_title_header">История покупок </p>
            <span></span>
          </div>
        </div>
        <div className="container">
          <div>
            {key === true ? (
              <div className="featured_list_block">
                <div className="date_monday">
                  <input
                    style={{ padding: "0 0 0 45px " }}
                    className="input_form date_add_input"
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                  />
                  <input
                    style={{ padding: "0 0 0 45px " }}
                    className="input_form date_add_input2"
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                  />
                </div>
                {order &&
                  order?.map((elem) => (
                    <>
                      <p className="date_time">{elem.date}</p>
                      {elem.data
                        ?.filter((obj) => {
                          return obj.date.includes(dateFrom, dateTo);
                        })
                        .map((el, id) => (
                          <div
                            className="featured_list_box"
                            key={id}
                            onClick={() => navigate(`/purchase-id/${el.id}`)}
                          >
                            <div className="feat_sum_block">
                              <h1>Покупка на сумму</h1>
                              <h2>{el.sum}</h2>
                            </div>
                            <p>{el.address} s;dkajflb;vkbdasvo feab eoia;fb </p>
                            <div className="time_bonus_block">
                              <span>{el.date}</span>
                              <h3>+13 баллов</h3>
                            </div>
                          </div>
                        ))}
                    </>
                  ))}
              </div>
            ) : (
              <div className="featured_products_block">
                <img src={history_img} alt="" />
                <h1 className="history_featured_text">
                  Вы не сделали ни одной покупки, но это поправимо...
                </h1>
                <p>
                  Добавьте в корзину всё, что душе угодно, а мы доставим заказ
                  от 150 сом
                </p>
                <button onClick={() => navigate("/shop-all/shop")}>
                  Перейти в каталог
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistory;
