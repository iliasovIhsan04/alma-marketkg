import React, { useEffect, useState } from "react";
import more from "../img/more.svg";
import { useNavigate } from "react-router";
import { url } from "../Api";
import axios from "axios";

const MapPage = ({ locationLocal }) => {
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
  }, []);
  const navigate = useNavigate();
  return (
    <div id="modal">
      <div className="container">
        <div className="address_position_map">
          <img
            style={{ width: "28px", height: "28px" }}
            onClick={() => navigate("/")}
            src={more}
            alt=""
          />
          <h2>{localStorage.getItem("address_map")}</h2>
        </div>
      </div>
      {JSON.parse(localStorage.getItem("loation")) === locationLocal ? (
        <div className="iframe_block">
          <iframe
            src="https://yandex.ru/map-widget/v1/-/CDFNM2J7"
            width="100%"
            height="100%"
          ></iframe>
        </div>
      ) : (
        <div className="iframe_block">
          <iframe
            src="https://yandex.ru/map-widget/v1/-/CDFmYIpL"
            width="100%"
            height="100%"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default MapPage;
