import React from "react";
import "../style/css/main.css";
import { useNavigate } from "react-router";
import ihsan from "../../src/img/logo-alma.svg";
import more from "../img/more.svg";
import phone from "../img/phone_alma.svg";
import whatsap from "../img/whatsap_alma.svg";
import telegram from "../img/telegram_alma.svg";
import instagram from "../img/instagram_alma.svg";
import tikTok from "../img/Tik Tok_alma.svg";
import youtube from "../img/youtube_alma.svg";
const ToHelpPage = () => {
  const navigate = useNavigate();

  return (
    <div id="modal">
      <div className="to_help_page">
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
          <div className="guestions_block_all">
            <div className="worker_box">
              <img src={ihsan} alt="" />
            </div>
            <div className="support_text">
              <h3>Возникли вопросы?</h3>
              <p className="title_h6">
                Наша поддержка проконсультирует Вас по любым возникшим вопросам
              </p>
              <div className="to_contact">
                <a href="tel:+996705000003">
                  <div className="contact_box">
                    <img src={phone} alt="" />
                  </div>
                  <div></div>
                </a>
                <a href="https://t.me/+996705000003" target="_blank">
                  <div className="contact_box">
                    <img src={whatsap} alt="" />
                  </div>
                  <div></div>
                </a>
                <a href="https://wa.me/+996705000003" target="_blank">
                  <div className="contact_box">
                    <img src={telegram} alt="" />
                  </div>
                  <div></div>
                </a>
              </div>
            </div>
            <div className="support_text sup-top">
              <h3>Мы в социальных сетях</h3>
              <p className="title_h6">
                Подписывайтесь на наши социальные сети и будьте в курсе всех
                новостей
              </p>
              <div className="to_contact">
                <a href="tel:+996705000003">
                  <div className="contact_box">
                    <img src={instagram} alt="" />
                  </div>
                  <div></div>
                </a>
                <a href="https://t.me/+996705000003" target="_blank">
                  <div className="contact_box">
                    <img src={tikTok} alt="" />
                  </div>
                  <div></div>
                </a>
                <a href="https://wa.me/+996705000003" target="_blank">
                  <div className="contact_box">
                    <img src={youtube} alt="" />
                  </div>
                  <div></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToHelpPage;
