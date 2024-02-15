import React from "react";
import { LuScrollText } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import more from "../img/more.svg";
import alma_logot from "../../src/img/logo-alma.svg";
import more_left from "../img/more-gray.svg";
import profile from "../img/profile-color.svg";
import setting from "../img/setting-two.svg";
import help from "../img/help-color.svg";
import info from "../img/info-color.svg";
import logout from "../img/logout.svg";
import line from "../img/Line 8.svg";

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
          <div className="area_all_block area_all_list">
            <a
              href="https://docs.google.com/document/d/1_Gwdg1PZr3U_ws6ZNPNiufvj3QaRZJg5WQ5QN0E_uV8"
              target="_blank"
            >
              <div
                className="area_all"
                onClick={() => navigate("/my-information")}
              >
                <h3 className="appl_text">Правила программы лояльности</h3>
                <img src={more_left} alt="" />
              </div>
            </a>

            <img
              style={{ width: "330px", marginLeft: "auto" }}
              src={line}
              alt=""
            />
            <a
              href="https://docs.google.com/document/d/1mogXES8M3fNwr81zgFvzDH_NPcIGQuwrAvcz-llmV7w"
              target="_blank"
            >
              <div className="area_all" onClick={() => navigate(`/settings`)}>
                <h3 className="appl_text">Пользовательское соглашение</h3>
                <img src={more_left} alt="" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutApplication;
