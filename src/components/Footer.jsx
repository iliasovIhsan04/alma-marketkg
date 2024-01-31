import React, { useState } from "react";
import { LuBadgePercent } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import home from "../img/home.svg";
import home_red from "../img/home-red.svg";
import catalog from "../img/catalog.svg";
import catalog_red from "../img/catalog-red.svg";
import card from "../img/card.svg";
import profil from "../img/profile.svg";
import profile_red from "../img/profile-red.svg";
import "../style/css/main.css";

const Footer = () => {
  const data = useSelector((state) => state.users);
  const [homes, setHomes] = useState(true);
  const [catalogs, setCatalogs] = useState(false);
  const [profile, setProfile] = useState(false);
  const destination =
    data?.user?.user_roll === "2" ? "/who-router/who-shop" : "/shop-all/shop";
  return (
    <div id="footer">
      <div className="container">
        <div className="nav_footer">
          <div
            className="flex_block"
            onClick={() => {
              setCatalogs(false) || setProfile(false) || setHomes(true);
            }}
          >
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
          <div
            className="flex_block"
            onClick={() => {
              setCatalogs(true) || setHomes(false) || setProfile(false);
            }}
          >
            <NavLink
              to={destination}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {home === false || profil === false || catalogs === true ? (
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
              <LuBadgePercent className="fi ai" />
              <span>Акции</span>
            </NavLink>
          </div>
          <div
            className="flex_block"
            onClick={() => {
              setProfile(true) || setHomes(false) || setCatalogs(false);
            }}
          >
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {home === false || catalogs === false || profil === true ? (
                <img className="fi ai" src={profile_red} alt="" />
              ) : (
                <img className="fi ai" src={profil} alt="" />
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
