import React, { useState, useEffect } from "react";
import "../style/css/main.css";
import "../style/css/App.css";
import Header from "./Header";
import { useNavigate } from "react-router";
import Storis from "../Storis/Storis";
import GetShot from "./GetShot";
import NewPromotions from "../pages/NewPromotions";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../Redux/reduser/auth";
import ReactPullToRefresh from "react-simple-pull-to-refresh";
import application from "../img/all-application.svg";
import scanner from "../img/scanning.svg";
const Main = () => {
  const [user, setUser] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : false;
  const data = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(auth());
  }, [dispatch]);

  const handleRefresh = async () => {
    try {
      await dispatch(auth());
    } catch (error) {
      console.error("Ошибка инициализации Pull to refresh:", error);
    }
  };
  const users = data?.user;
  return (
    <div className="main_block">
      <Header users={users} />
      <ReactPullToRefresh
        onRefresh={handleRefresh}
        resistance={3}
        pullDownThreshold={95}
        maxPullDownDistance={110}
        backgroundColor="#fff"
        className="pull-on-refresh"
        pullingContent="Потяните вниз, чтобы обновить..."
      >
        <div className="swiper">
          <div className="container">
            <Storis token={token} />
          </div>
          <div className="container">
            {token ? (
              <div className="bonus_top">
                <div
                  className="bonus_block_all"
                  onClick={() => navigate("/qr-code")}
                >
                  <div className="bonus-wrap">
                    <h1 className="title_ha">
                      {data.user.bonus}
                      <br />
                      <span>бонусов</span>
                    </h1>
                  </div>
                  <div className="bonus_img">
                    <img src={data.user.qrimg} alt="" />
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="scanner_block container">
            <div
              className="scanner_box"
              onClick={() => navigate("/shop-all/shop")}
            >
              <img src={application} alt="" />
              <p>Посмотреть товары</p>
            </div>
            <div className="scanner_box">
              <img src={scanner} alt="" />
              <p>Проверить цену</p>
            </div>
          </div>
          <GetShot token={token} user={user} />
          <NewPromotions />
        </div>
      </ReactPullToRefresh>
    </div>
  );
};

export default Main;
