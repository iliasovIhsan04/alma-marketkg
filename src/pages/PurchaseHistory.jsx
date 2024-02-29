import React, { useEffect, useState } from "react";
import more from "../img/more.svg";
import { useNavigate } from "react-router";
import history_img from "../img/empty_history.svg";
import axios from "axios";
import { url } from "../Api";

const PurchaseHistory = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState([]);
  const [local, setLocal] = useState(localStorage.getItem("tokens"));
  const headers = {
    Authorization: `Token ${local}`,
  };
  const ordering = async () => {
    try {
      const response = await axios.get(url + "/order/list/", { headers });
      setOrder(response.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    ordering();
  }, []);

  console.log(order);

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
            <p className="alma_title_header">История покупок {order.date}</p>
            <span></span>
          </div>
        </div>

        <div className="container">
          {true ? (
            <>
              {order &&
                order.map((el) => <div className="featured_list_block"></div>)}
            </>
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
  );
};

export default PurchaseHistory;
