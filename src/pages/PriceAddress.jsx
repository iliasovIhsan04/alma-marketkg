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

  useEffect(() => {
    axios
      .get(url + "/map")
      .then((response) => {
        setLocations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return (
    <div className="price_address">
      <div className="container d-flex justify-content-between align-items-center ner">
        <img className="fi" src={more} alt="" onClick={() => navigate(-1)} />
        <h4 className="title_h5 all_title_one">Выберите адрес магазина</h4>
        <p></p>
      </div>
      <div className="container">
        <div className="list_block">
          {locations.map((el) => (
            <div className="list_box">
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
      </div>
    </div>
  );
};

export default PriceAddress;
