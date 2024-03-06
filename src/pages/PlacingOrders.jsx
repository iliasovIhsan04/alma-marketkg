import React, { useEffect, useState } from "react";
import more from "../img/more.svg";
import { useNavigate } from "react-router";
import location_img from "../img/address-2.svg";
import more_left from "../img/green_icons.svg";
import wallet from "../img/wallet.svg";
import { url } from "../Api";
import axios from "axios";
import Loading from "../UI/Loading/Loading";
import { IoIosArrowDown } from "react-icons/io";

const PlacingOrders = ({ Alert }) => {
  const navigate = useNavigate();
  const [receiveInput, setReceiveInput] = useState(false);
  const getData = JSON.parse(localStorage.getItem(`address`));
  const [address, setAddress] = useState({
    address_to: "",
    get_date: "Как можно быстрее",
    comment: "",
  });
  const [local, setLocal] = useState(localStorage.getItem("tokens"));
  const [isLoading, setIsLoading] = useState(false);
  const headers = {
    Authorization: `Token ${local}`,
  };
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

  const [checkmark, setCheckmark] = useState({
    one: false,
    two: false,
  });

  const handleASFast = async () => {
    let updatedDate = address.get_date;
    if (updatedDate === "Как можно быстрее") {
      updatedDate = null;
    }
    setAddress({
      ...address,
      get_date: updatedDate,
    });
    setCheckmark({
      ...checkmark,
      one: true,
      two: false,
    });
  };

  const handleDataType = async () => {
    setCheckmark({
      ...checkmark,
      one: false,
      two: true,
    });
  };

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
        address_to: getData?.id ? getData?.id : null,
        get_date: address.get_date,
        comment: address.comment,
        product: productsForOrder,
      };
      const response = await axios.post(url + "/order/create", dataToSend, {
        headers,
      });

      if (response.data.response === true) {
        setIsLoading(false);
        shopCart.map((el) => localStorage.removeItem(`activePlus_${el.id}`));
        shopCart.map((el) => localStorage.removeItem(`activeItems_${el.id}`));
        shopCart.map((el) => localStorage.removeItem(`activeItem_${el.id}`));
        localStorage.removeItem("myData");
        localStorage.removeItem("cart");
        localStorage.removeItem("carts");
        localStorage.removeItem("updatedOldPrice");
        localStorage.removeItem("address");
        localStorage.removeItem("addres");
        localStorage.removeItem("plus");
        localStorage.removeItem("shopCart");
        localStorage.removeItem("plusOne");
        localStorage.removeItem("false");
        navigate("/success-product");
      }
    } catch (error) {
      if (!localStorage.getItem("address")) {
        Alert("Добавьте адрес прежде чем заказать!", "error");
      } else if (address.get_date) {
        Alert("Заполните поле времени", "error");
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

  const opendate = () => {
    setReceiveInput(true);
  };

  const closeDate = () => {
    setReceiveInput(false);
  };

  Cout();
  return (
    <div id="modal">
      <div className="placing_orders">
        <div className="nav">
          <div className="container d-flex justify-content-between align-items-center ">
            <img
              className="more_img"
              onClick={() => navigate(-1)}
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
                {getData?.active === false ? (
                  <span>
                    {getData?.street} {getData?.street} {getData.number}{" "}
                    {getData.building} {getData.apartment}
                    {getData.floor}
                  </span>
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
              <div
                className="sort_wrap_date"
                onClick={() => {
                  handleASFast();
                  closeDate();
                }}
              >
                <label className="custom_radio_btn_date">
                  {checkmark.one && <span className="checmark"></span>}
                </label>
                <label className="m-lg-3">Как можно быстрее</label>
              </div>
              <div
                className="sort_wrap_date"
                onClick={() => {
                  handleDataType();
                  opendate();
                }}
              >
                <div className="custom_radio_btn_date_block">
                  <label className="custom_radio_btn_date">
                    {checkmark.two && <span className="checmark"></span>}
                  </label>
                </div>
                <label htmlFor="dateInput" className="m-lg-3">
                  Выбрать дату и время
                </label>
                <IoIosArrowDown
                  size={20}
                  style={{
                    marginLeft: "auto",
                    color: "#6B6B6B",
                  }}
                />
              </div>
            </div>
            {receiveInput && (
              <input
                style={{ padding: "0 0 0 50px" }}
                id="dateInput"
                className="time_add_input"
                type="date"
                value={address.get_date}
                placeholder="Как можно быстрее"
                onChange={(e) =>
                  setAddress({ ...address, get_date: e.target.value })
                }
              />
            )}
            <div className="input_box">
              <label>Комментарий к заказу( 0-2000)</label>
              <textarea
                placeholder="Напишите комментарий"
                className="placing_textarea"
                name=""
                id=""
                cols="30"
                rows="10"
                value={address.comment}
                onChange={(e) =>
                  setAddress({ ...address, comment: e.target.value })
                }
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
          <button onClick={handleSubmit} className="sumbit_button">
            {isLoading ? <Loading /> : "Оформить заказ"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlacingOrders;
