import React from "react";
import { LuScrollText } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import more from "../img/more.svg";
import alma_logot from "../../src/img/logo-alma.svg";

const AboutApplication = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.users);
  return (
    <>
      <div id="modal">
        <div className="nav">
          <div className="container nav_content">
            <img
              className="more_img"
              onClick={() => navigate(-1)}
              src={more}
              alt=""
            />
            <p className="header_name">О приложении</p>
            <div />
          </div>
        </div>
        <div className="container">
          <div className="nav_img">
            <img src={alma_logot} alt="" />
          </div>
          <div className="a_class">
            <a
              href="https://docs.google.com/document/d/1_Gwdg1PZr3U_ws6ZNPNiufvj3QaRZJg5WQ5QN0E_uV8"
              target="_blank"
            >
              <div className="area_all_application">
                <div className="bell">
                  <div className="bi">
                    <LuScrollText className="be" />{" "}
                  </div>
                  <h3 className="mt-2">Правила программы лояльности </h3>
                </div>
              </div>
            </a>
            <a
              href="https://docs.google.com/document/d/1mogXES8M3fNwr81zgFvzDH_NPcIGQuwrAvcz-llmV7w"
              target="_blank"
            >
              <div className="area_all_application">
                <div className="bell">
                  <div className="bi">
                    <LuScrollText className="be" />
                  </div>
                  <h3 className="mt-2">Пользовательскоe соглашениe</h3>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutApplication;
