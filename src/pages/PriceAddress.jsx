import React, { useEffect, useState } from "react";
import more from "../img/more.svg";
import { useNavigate } from "react-router";
import time from "../img/time.svg";
import axios from "axios";
import { url } from "../Api";
import location from "../img/locations.svg";

const PriceAddress = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [barCodeInput, setBarCodeInput] = useState(false);
  const [barrcode, setBarrCode] = useState("");

  useEffect(() => {
    axios
      .get(url + "/map")
      .then((response) => {
        setLocations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const opendate = () => {
    setBarCodeInput(true);
  };

  return (
    <>
      <div className="price_address_block">
        <div className="nav">
          <div className="container d-flex justify-content-between align-items-center ">
            <img
              className="more_img"
              onClick={() => navigate(-1)}
              src={more}
              alt=""
            />
            <p className="alma_title_header">Выберите адрес магазина</p>
            <span></span>
          </div>
        </div>
        <div className="container">
          <div className="list_block">
            {locations.map((el) => (
              <div className="list_box" onClick={() => opendate()} key={el.id}>
                <div className="list_address">
                  <img src={location} alt="" />
                  <h2>{el.address}</h2>
                </div>
                <div className="list_time">
                  <img src={time} alt="" />
                  <p>
                    График работы: <span>{el.time}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          {barCodeInput && (
            <>
              <input
                className="input_form new_add_input"
                type="number"
                placeholder="напишите номер товара"
                value={barrcode}
                onChange={(e) => setBarrCode(e.target.value)}
              />
              <button
                className="barrcode_btn_red"
                onClick={() => navigate(`/barr-code-details/${barrcode}`)}
              >
                Поиск...
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PriceAddress;
