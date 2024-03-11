import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { url } from "../Api";
import more from "../img/more.svg";
import { Switch } from "antd";

const Settings = ({ Alert }) => {
  const [openModalSetting, setOpenModalSetting] = useState(false);
  const isOpenModal1 = () => {
    setOpenModalSetting(true);
  };
  const closeOpenModal = () => {
    setOpenModalSetting(false);
  };
  const navigate = useNavigate();
  const [local, setLocal] = useState(localStorage.getItem("tokens"));
  const [toogle, setToogle] = useState(false);
  const [toogle2, setToogle2] = useState(false);
  const headers = {
    Authorization: `Token ${local}`,
  };
  const deleteAccount = async () => {
    try {
      const response = await axios.get(url + "/auth/delete-account", {
        headers,
      });
      if (response.data.response === true) {
        Alert(response.data.message, "success");
        localStorage.removeItem("token");
        localStorage.removeItem("tokens");
        localStorage.removeItem("token_block");
        navigate("/personal/to-come-in");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const toogleNotifications = () => {
    toogle ? setToogle(false) : setToogle(true);
  };
  const toogleBrightness = () => {
    toogle2 ? setToogle2(false) : setToogle2(true);
  };

  return (
    <div id="modal">
      <div className="settings">
        <div className="nav">
          <div className="container d-flex justify-content-between align-items-center ">
            <img
              className="more_img"
              onClick={() => navigate(-1)}
              src={more}
              alt=""
            />
            <p className="header_name">Настройки</p>
            <div></div>
          </div>
        </div>
        <div className="container">
          <div className="settings_block">
            <div className="toggle_block_alma">
              <div className="block_yr">
                <p className="settings_title">Уведомления</p>
                <Switch onClick={toogleNotifications} />
                {toogle
                  ? localStorage.setItem("notifications", "toogleValue")
                  : localStorage.removeItem("notifications")}
              </div>
              <p className="settings_kart">
                Получайте уведомления об акциях и социальных предложениях
              </p>
            </div>
            <div className="toggle_block_alma">
              <div className="block_yr">
                <p className="settings_title">Автояркость</p>
                <Switch onClick={toogleBrightness} />
                {toogle2
                  ? localStorage.setItem("brightness", "toogleValue2")
                  : localStorage.removeItem("brightness")}
              </div>
              <p className="settings_kart">
                Получайте уведомления об акциях и социальных предложениях
              </p>
            </div>
            <h5
              className="settings_title akaunt_remove"
              onClick={() => isOpenModal1()}
            >
              Удалить акаунт
            </h5>
            {openModalSetting === true && (
              <div className="filters_oll" onClick={closeOpenModal}>
                <div className="order">
                  <div className="acaunt_block_modal">
                    <h3>Удалить аккаунт?</h3>
                    <p>
                      Ваш аккаунт удалится насвегда, и вам придется заново
                      зарегистрироваться
                    </p>
                    <div className="btn_block_alma">
                      <button
                        onClick={closeOpenModal}
                        className="btn_cancellation"
                      >
                        Отмена
                      </button>
                      <button className="btn_come_in" onClick={deleteAccount}>
                        Удалить
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
