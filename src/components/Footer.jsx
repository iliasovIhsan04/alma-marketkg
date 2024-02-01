import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import home from "../img/home.svg";
import home_red from "../img/home-red.svg";
import catalog from "../img/Property1.svg";
import catalog_red from "../img/catalog-red.svg";
import card from "../img/card.svg";
import profil_img from "../img/profile.svg";
import profile_red from "../img/profile-red.svg";
import map_alma_img from "../img/map-alma.svg";
import map_red_img from "../img/map-red.svg";
import "../style/css/main.css";

const Footer = () => {
  const [homes, setHomes] = useState(true);
  const [catalogs, setCatalogs] = useState(false);
  const [profile, setProfile] = useState(false);
  const [mapAlma, setMapAlma] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname == "/") {
      setHomes(true);
      setCatalogs(false);
      setProfile(false);
      setMapAlma(false);
    } else if (location.pathname == "/shop-all/shop") {
      setCatalogs(true);
      setMapAlma(false);
      setProfile(false);
      setHomes(false);
    } else if (location.pathname == "/dashboard") {
      setProfile(true);
      setMapAlma(false);
      setHomes(false);
      setCatalogs(false);
    } else if (location.pathname == "/promotion") {
      setMapAlma(true);
      setHomes(false);
      setCatalogs(false);
      setProfile(false);
    } else {
    }
  }, [location.pathname]);

  return (
    <div id="footer">
      <div className="container">
        <div className="nav_footer">
          <div className="flex_block">
            <NavLink
              to="/"
              exact="true"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {homes === true ? (
                <img className="fi ai" src={home_red} alt="" />
              ) : (
                <img className="fi ai" src={home} alt="" />
              )}
              <span>Главная</span>
            </NavLink>
          </div>
          <div className="flex_block">
            <NavLink
              to="/shop-all/shop"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {catalogs === true ? (
                <img className="fi ai" src={catalog_red} alt="" />
              ) : (
                <img className="fi ai" src={catalog} alt="" />
              )}
              <span>Магазин</span>
            </NavLink>
          </div>
          <div className="flex_block">
            <NavLink
              to="/qr-code"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <div className="cart_position">
                <img src={card} alt="" />
              </div>
              <span className="spamn">Моя карта</span>
            </NavLink>
          </div>
          <div className="flex_block">
            <NavLink
              to="/promotion"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {mapAlma === true ? (
                <img className="fi ai" src={map_red_img} alt="" />
              ) : (
                <img className="fi ai" src={map_alma_img} alt="" />
              )}
              <span>Акции</span>
            </NavLink>
          </div>
          <div className="flex_block">
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {profile === true ? (
                <img className="fi ai" src={profile_red} alt="" />
              ) : (
                <img className="fi ai" src={profil_img} alt="" />
              )}
              <span>Профиль</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
