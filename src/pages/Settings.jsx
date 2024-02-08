import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { url } from "../Api";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../Redux/reduser/auth";
import { FaCheck } from "react-icons/fa6";
import more from "../img/more.svg";

const Settings = ({ Alert }) => {
  const [openModalSetting, setOpenModalSetting] = useState(false);
  const isOpenModal1 = () => {
    setOpenModalSetting(true);
  };

  const closeOpenModal = () => {
    setOpenModalSetting(false);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const [inputChanged, setInputChanged] = useState(false);
  useEffect(() => {
    dispatch(auth());
  }, [dispatch]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputInfo, setInputInfo] = useState({
    email: "",
    notification: true,
    auto_brightness: true,
  });
  const [local, setLocal] = useState(localStorage.getItem("tokens"));
  const headers = {
    Authorization: `Token ${local}`,
  };
  useEffect(() => {
    if (user) {
      setInputInfo({
        ...inputInfo,
        email: user.email,
        notification: user.notification,
        auto_brightness: user.auto_brightness,
      });
    }
  }, [user]);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [isWishSelected, setIsWishSelected] = useState("");
  const handleCheckboxChange = (value) => {
    if (selectedOption === value) {
      setSelectedOption("");
    } else {
      setSelectedOption(value);
    }
  };
  const [selectedOption, setSelectedOption] = useState("");
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const data = {
    email: inputInfo.email,
    notification: inputInfo.notification,
    auto_brightness: inputInfo.auto_brightness,
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(url + "/auth/notification", data, {
        headers,
      });
      if (response.data.response === true) {
        Alert("Успешно изменен", "success");
      }
      setInputChanged(false);
    } catch (error) {
      console.error("Error:", error);
    }
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
            <div>
              {inputChanged ? (
                <FaCheck
                  size={20}
                  onClick={handleSubmit}
                  style={{ color: "#DC0200" }}
                />
              ) : (
                <FaCheck size={20} style={{ color: "#aaaaaa" }} />
              )}
            </div>
          </div>
          <div className={`hover_btn ${inputChanged ? "active" : ""}`}></div>
        </div>
        <div className="container">
          <div className="settings_block">
            <div className="toggle_block_alma">
              <div className="block_yr">
                <p className="settings_title">Уведомления</p>
                <label className="switch">
                  <input
                    onClick={() =>
                      setInputInfo({
                        ...inputInfo,
                        notification: !inputInfo.notification,
                      }) || setInputChanged(true)
                    }
                    type="checkbox"
                    checked={inputInfo.notification}
                  />
                  <span className="slider_toggle round"></span>
                </label>
              </div>
              <p className="settings_kart">
                Получайте уведомления об акциях и социальных предложениях
              </p>
            </div>
            <div className="toggle_block_alma">
              <div className="block_yr">
                <p className="settings_title">Автояркость</p>
                <label className="switch">
                  <input
                    onClick={() =>
                      setInputInfo({
                        ...inputInfo,
                        auto_brightness: !inputInfo.auto_brightness,
                      }) || setInputChanged(true)
                    }
                    type="checkbox"
                    checked={inputInfo.auto_brightness}
                  />
                  <span className="slider_toggle round"></span>
                </label>
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
