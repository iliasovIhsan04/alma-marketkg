import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { url } from "../Api";
import Loading from "../UI/Loading/Loading";
import more from "../img/more.svg";
const NewAddress = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    address: "",
  });
  const [local, setLocal] = useState(localStorage.getItem("tokens"));
  const [isLoading, setIsLoading] = useState(false);

  const headers = {
    Authorization: `Token ${local}`,
  };
  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(url + "/order/address/add", address, { headers })
      .then((response) => {
        if (response.data.response === true) {
          setIsLoading(true);
          navigate("/delivery-address");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
      });
  };
  return (
    <div id="modal">
      <div className="new_address">
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
          <form className="input_block new_block" onSubmit={handleSubmit}>
            <div className="input_box">
              <label>
                Улица <span>*</span>
              </label>
              <input
                placeholder="Введите название улицы"
                className="input_form new_add_input"
                type="text"
                name="address"
                value={address.address}
                onChange={handleChange}
              />
            </div>
            <div className="input_box">
              <label>
                Дом <span>*</span>
              </label>
              <input
                placeholder="Введите номер дома"
                className="input_form new_add_input"
                type="text"
                name="address"
                value={address.address}
                onChange={handleChange}
              />
            </div>
            <div className="input_box">
              <label>Корпус</label>
              <input
                placeholder="Введите номер корпуса"
                className="input_form new_add_input"
                type="text"
                name="address"
                value={address.address}
                onChange={handleChange}
              />
            </div>
            <div className="input_box">
              <label>Подъезд</label>
              <input
                placeholder="Введите номер подъезда"
                className="input_form new_add_input"
                type="text"
                name="address"
                value={address.address}
                onChange={handleChange}
              />
            </div>
            <div className="input_box">
              <label>Этаж</label>
              <input
                placeholder="Введите номер этажа"
                className="input_form new_add_input"
                type="text"
                name="address"
                value={address.address}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn_butto">
              {isLoading ? <Loading /> : "Сохранить"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewAddress;
