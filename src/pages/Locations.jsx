import React, { useEffect, useState } from "react";
import time from "../img/time.svg";
import axios from "axios";
import { url } from "../Api";
import location from "../img/locations.svg";
import { Map, Placemark, YMaps } from "react-yandex-map";

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
  }, []);
  console.log(location);
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
            <YMaps>
              <div style={{ width: "100%", height: "100vh" }} className="y_map">
                <div className="map_head container">
                  <p>{locations[0]?.address}</p>
                </div>
                <Map
                  defaultState={{
                    center: [locations[0]?.lat, locations[0]?.lon],
                    zoom: 6,
                  }}
                  width="100%"
                  height="100vh"
                  onBoundsChange={(event) => {
                    console.log("Bounds changed:", event);
                  }}
                >
                  <Placemark
                    geometry={[locations[0]?.lat, locations[0]?.lon]}
                  />
                </Map>
              </div>
            </YMaps>
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
