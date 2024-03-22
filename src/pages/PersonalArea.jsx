import React, { useEffect, useState } from "react";
import "../style/css/main.css";
import "../style/css/App.css";
import "../style/css/modal.css";
import { useNavigate } from "react-router-dom";
import vector5 from "../img/Vector5.svg";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../Redux/reduser/auth";
import more_left from "../img/more-gray.svg";
import profile from "../img/profile-color.svg";
import setting from "../img/setting-two.svg";
import help from "../img/help-color.svg";
import info from "../img/info-color.svg";
import logout from "../img/logout.svg";
import line from "../img/Line 8.svg";
import heart from "../img/live.svg";
import order_history from "../img/order-history.svg";

const PersonalArea = () => {
  const [openModal, setOpenModal] = useState(false);
  const isOpenModal = () => {
    setOpenModal(true);
  };

  const closeOpenModal = () => {
    setOpenModal(false);
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : false;

  const data = useSelector((state) => state.users);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(auth());
      } catch (error) {
        console.error("Ошибка инициализации user-info:", error);
      }
    };
    fetchData();
  }, [dispatch]);
  return (
    <>
      <div className="header_personals_alma">
        <div className="container">
          <img src={vector5} alt="" />
          {token ? (
            <h2 className="first_last_name_header" style={{ color: "#fff" }}>
              {data && data.user.first_name} {data && data.user.last_name}!
            </h2>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="container">
        <div className="top_one one">
          <div className="area_all_block">
            <div
              className="area_all"
              onClick={() => navigate("/my-information")}
            >
              <div className="bell">
                <div className="bi">
                  <img src={profile} alt="" />
                </div>
                <h3 className="personal_title">Мои данные </h3>
              </div>
              <div className="lo">
                <img src={more_left} alt="" />
              </div>
            </div>
            <img
              style={{ width: "294px", marginLeft: "auto" }}
              src={line}
              alt=""
            />
            <div className="area_all" onClick={() => navigate(`/settings`)}>
              <div className="bell">
                <div className="bi">
                  <img src={setting} alt="" />
                </div>
                <h3 className="personal_title">Настройка</h3>
              </div>
              <div className="lo">
                <img src={more_left} alt="" />
              </div>
            </div>
          </div>
          <div className="area_all_block">
            <div
              className="area_all"
              onClick={() => navigate("/shop-all/featured-products")}
            >
              <div className="bell">
                <div className="bi">
                  <img src={heart} alt="" />
                </div>
                <h3 className="personal_title">Избранные товары </h3>
              </div>
              <div className="lo">
                <img src={more_left} alt="" />
              </div>
            </div>
            <img
              style={{ width: "294px", marginLeft: "auto" }}
              src={line}
              alt=""
            />
            <div
              className="area_all"
              onClick={() => navigate(`/purchase-history`)}
            >
              <div className="bell">
                <div className="bi">
                  <img src={order_history} alt="" />
                </div>
                <h3 className="personal_title">История покупок</h3>
              </div>
              <div className="lo">
                <img src={more_left} alt="" />
              </div>
            </div>
          </div>
          <div className="area_all_block">
            <div onClick={() => navigate(`/to-help-page`)} className="area_all">
              <div className="bell">
                <div className="bi">
                  <img src={help} alt="" />
                </div>
                <h3 className="personal_title">Помощь</h3>
              </div>
              <div className="lo">
                <img src={more_left} alt="" />
              </div>
            </div>
            <img
              style={{ width: "294px", marginLeft: "auto" }}
              src={line}
              alt=""
            />
            <div onClick={() => navigate(`/application`)} className="area_all">
              <div className="bell">
                <div className="bi">
                  <img src={info} alt="" />
                </div>
                <h3 className="personal_title">О приложении</h3>
              </div>
              <div className="lo">
                <img src={more_left} alt="" />
              </div>
            </div>
          </div>
          <div onClick={() => isOpenModal()} className="area_all_block_logauto">
            <div className="area_all">
              <div className="bell">
                <div className="bi">
                  <img src={logout} alt="" />
                </div>
                <h3 className="personal_title">Выйти</h3>
              </div>
              <div className="lo">
                <img src={more_left} alt="" />
              </div>
            </div>
          </div>
          {openModal === true && (
            <div className="filters_oll" onClick={closeOpenModal}>
              <div className="order">
                <div className="acaunt_block_modal">
                  <h3>Выйти из аккаунта?</h3>
                  <p>Вам придется повторно выполнить авторизацию</p>
                  <div className="btn_block_alma">
                    <button
                      onClick={closeOpenModal}
                      className="btn_cancellation"
                    >
                      Отмена
                    </button>
                    <button
                      className="btn_come_in"
                      onClick={() =>
                        localStorage.removeItem("token") ||
                        localStorage.removeItem("tokens") ||
                        navigate("/to-come-in")
                      }
                    >
                      Выйти
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PersonalArea;
