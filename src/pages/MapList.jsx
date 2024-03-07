import React, { useEffect, useState } from "react";
import time from "../img/time.svg";
import axios from "axios";
import { url } from "../Api";
import location from "../img/locations.svg";
import { useNavigate } from "react-router";
const MapList = () => {
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();

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

  return (
    <div className="map_list">
      <div className="nav">
        <div className="container d-flex justify-content-between align-items-center ">
          <span></span>
          <p className="alma_title_header">Локации</p>
          <span></span>
        </div>
      </div>
      <div className="container">
        <div className="list_block">
          {locations.map((el) => (
            <div
              className="list_box"
              key={el.id}
              onClick={() =>
                navigate(`/map-page/${el.id}`) ||
                localStorage.setItem("loation", el.id, el.address) ||
                localStorage.setItem("address_map", el.address)
              }
            >
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

export default MapList;
