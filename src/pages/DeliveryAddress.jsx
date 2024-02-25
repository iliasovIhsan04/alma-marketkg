import React from "react";
import more from "../img/more.svg";
import { useNavigate } from "react-router";
import address_img from "../img/empty_address.svg";
import { HiOutlinePlusSm } from "react-icons/hi";

const DeliveryAddress = () => {
  const navigate = useNavigate();
  return (
    <div id="modal">
      <div className="delivery_address">
        <div className="nav">
          <div className="container d-flex justify-content-between align-items-center ">
            <img
              className="more_img"
              onClick={() => navigate("/dashboard")}
              src={more}
              alt=""
            />
            <p className="alma_title_header">Адрес доставки</p>
            <span></span>
          </div>
        </div>
        <div className="container">
          <div className="address_block">
            <button onClick={() => navigate("/new-address")}>
              <HiOutlinePlusSm size={24} style={{ color: "#DC0200" }} />{" "}
              Добавить адрес
            </button>
            <img src={address_img} alt="" />
            <h1>Пока тут пусто</h1>
            <p>Здесь будут храниться ваши адреса</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAddress;
