import React, { useEffect, useState } from "react";
import time from "../img/time.svg";
import axios from "axios";
import { url } from "../Api";
import location from "../img/locations.svg";

const Locations = () => {
  const [tab, setTab] = useState(true);
  const [tabs, setTabs] = useState(false);
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
    <div className="locations">
      <div>
        <div className="container">
          <div className="nav_active_tab">
            <h1
              onClick={() => setTab(true) || setTabs(false)}
              className={tab === true ? "tabs_active" : "a_active"}
            >
              Карта
            </h1>
            <h1
              onClick={() => setTab(false) || setTabs(true)}
              className={tabs === true ? "tabs_active" : "a_active"}
            >
              Список
            </h1>
          </div>
        </div>
        <div>
          {tab === true ? (
            <div>
              <div>
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=74.587393%2C42.880250&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgoxNTE3NzQxMjc1EkfQmtGL0YDQs9GL0LfRgdGC0LDQvSwg0JHQuNGI0LrQtdC6LCDQnNCw0L3QsNGBINC_0YDQvtGB0L_QtdC60YLQuCwgNjQvMSIKDS8tlUIVTIUrQg%2C%2C&z=16.84"
                  width="100%"
                  height="682"
                  frameborder="1"
                  allowfullscreen="true"
                ></iframe>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="container">
          {tabs === true ? (
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
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Locations;
