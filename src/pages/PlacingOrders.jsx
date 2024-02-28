import React, { useState } from "react";
import more from "../img/more.svg";
import { useNavigate } from "react-router";
import location_img from "../img/address-2.svg";
import more_left from "../img/green_icons.svg";
import wallet from "../img/wallet.svg";
import { url } from "../Api";
import axios from "axios";
import Loading from "../UI/Loading/Loading";

const PlacingOrders = ({ Alert }) => {
  const navigate = useNavigate();
  const [error, setError] = useState([]);
  const getData = JSON.parse(localStorage.getItem(`address`));
  const [address, setAddress] = useState({
    address: "",
    product: "",
    count: "",
  });
  const [local, setLocal] = useState(localStorage.getItem("tokens"));
  const [isLoading, setIsLoading] = useState(false);
  const headers = {
    Authorization: `Token ${local}`,
  };
  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };
  const plusData = JSON.parse(localStorage.getItem("plus"));
  const shopCart = JSON.parse(localStorage.getItem("shopCart"));

  if (shopCart) {
    const cartIds = shopCart.map((el) => el.id);

    const idCount = cartIds.reduce((acc, id) => {
      if (acc[id]) {
        acc[id] += 1;
      } else {
        acc[id] = 1;
      }
      return acc;
    }, {});
    const result = Object.keys(idCount).map((id) => ({
      productId: parseInt(id),
      count: idCount[id],
    }));
  } else {
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const shopCart = JSON.parse(localStorage.getItem("shopCart"));
      const cartIds = shopCart.map((el) => el.id);
      const idCount = cartIds.reduce((acc, id) => {
        if (acc[id]) {
          acc[id] += 1;
        } else {
          acc[id] = 1;
        }
        return acc;
      }, {});
      const productsForOrder = Object.keys(idCount).map((id) => ({
        product: parseInt(id),
        count: idCount[id],
      }));

      const dataToSend = {
        address: getData?.id ? getData?.id : null,
        product_for_order: productsForOrder,
      };
      const response = await axios.post(url + "/order/order", dataToSend, {
        headers,
        address,
      });

      if (response.data.response === true) {
        setIsLoading(false);
        shopCart.map((el) => localStorage.removeItem(`activePlus_${el.id}`));
        localStorage.removeItem("myData");
        localStorage.removeItem("cart");
        localStorage.removeItem("updatedOldPrice");
        localStorage.removeItem("address");
        localStorage.removeItem("plus");
        localStorage.removeItem("shopCart");
        navigate("/success");
      }
    } catch (error) {
      if (!localStorage.getItem("address")) {
        Alert("Добавьте адрес прежде чем заказать!", "error");
      }
      setIsLoading(false);
    }
  };
  let count;

  const Cout = () => {
    const shopCart = JSON.parse(localStorage.getItem("shopCart"));
    if (shopCart && Array.isArray(shopCart)) {
      count = shopCart.reduce(
        (acc, item) => (acc += parseFloat(item.price || 0)),
        0
      );
    } else {
      count = 0;
    }
  };

  Cout();
  return (
    <div id="modal">
      <div className="placing_orders">
        <div className="nav">
          <div className="container d-flex justify-content-between align-items-center ">
            <img
              className="more_img"
              onClick={() => navigate("/dashboard")}
              src={more}
              alt=""
            />
            <p className="alma_title_header">Оформление заказа</p>
            <span></span>
          </div>
        </div>
        <div className="container placing_bottom">
          <div
            className="select_address"
            onClick={() => navigate("/delivery-address")}
          >
            <div className="d-flex align-items-center">
              <img src={location_img} alt="" />
              <span style={{ margin: "0 10px" }} className="project">
                {getData?.status === true ? (
                  <span>{getData?.street}</span>
                ) : (
                  <span>Выберите адрес доставки</span>
                )}
              </span>
            </div>
            <img style={{ color: "red" }} src={more_left} alt="" />
          </div>
          <form action="">
            <div className="input_box">
              <label>Время получения</label>
              <input
                style={{ padding: "0 0 0 50px " }}
                placeholder="Как можно быстрее"
                className="input_form new_add_input"
                type="date"
              />
            </div>
            <div className="input_box">
              <label>Комментарий к заказу( 0-2000)</label>
              <textarea
                placeholder="Напишите комментарий"
                className="placing_textarea"
                name=""
                id=""
                cols="30"
                rows="10"
              ></textarea>
            </div>
          </form>

          <div className="input_box ">
            <label>Способ оплаты</label>
            <div className="placing_box">
              <img src={wallet} alt="" />
              <span>Наличными</span>
            </div>
          </div>
        </div>
        <div className="placing_price_block">
          <div className="placing_price_box">
            <span>Сумма:</span>
            <h1>{count}</h1>
          </div>
          <div className="placing_price_box placing_address_brr">
            <span>Доставка:</span>
            <h1>150 сом</h1>
          </div>
          <div className="placing_price_box">
            <span>Итого:</span>
            <h1 className="placing_color">{count + 150} сом</h1>
          </div>
          <button onClick={handleSubmit}>
            {isLoading ? <Loading /> : "Оформить заказ"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlacingOrders;
