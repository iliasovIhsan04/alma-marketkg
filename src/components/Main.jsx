import React, { useState, useEffect } from "react";
import "../style/css/main.css";
import "../style/css/App.css";
import Header from "./Header";
import { useNavigate } from "react-router";
import Storis from "../Storis/Storis";
import NewPromotions from "../pages/NewPromotions";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../Redux/reduser/auth";
import ReactPullToRefresh from "react-simple-pull-to-refresh";
import scanner from "../img/scanning.svg";
import Modal1 from "../UI/Modal2/Modal2";
import Modal from "../UI/Modal/Modal";
import modal_img from "../img/modal-image.svg";
import HarryBuy from "./HarryBuy";
import alma_go from "../img/служба-logo.svg";
import soon_alma_goo from "../img/soon_Alma_go.svg";

const Main = ({ modal, setModal, modal2, setModal2 }) => {
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
      {modal && (
        <Modal setModal={setModal}>
          <div className="modal_success">
            <div className="check">
              <img src={modal_img} alt="" />
            </div>
            <p className="modal_title">Ваша карта успешно создана!</p>
            <p className="modal_text">
              Теперь вы можете экономить на покупках, получать скидки, подарки и
              многое другое
            </p>
            <button onClick={() => setModal(false)}>Понятно</button>
          </div>
        </Modal>
      )}
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
            <div className="scanner_box1" onClick={() => setModal2(true)}>
              <img src={alma_go} alt="" />
            </div>
            <div
              className="scanner_box"
              onClick={() => navigate("/price-address")}
            >
              <img src={scanner} alt="" />
              <p>Проверить цену</p>
            </div>
          </div>
          {modal2 && (
            <Modal1 setModal={setModal2}>
              <div className="modalgo_img_block">
                <img src={soon_alma_goo} alt="" />
              </div>
            </Modal1>
          )}
          <HarryBuy token={token} user={token} />
          <NewPromotions />
        </div>
      </ReactPullToRefresh>
    </div>
  );
};

export default Main;
