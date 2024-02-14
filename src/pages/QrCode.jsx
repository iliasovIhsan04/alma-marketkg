import React, { useEffect } from "react";
import "../style/css/main.css";
import "../style/css/App.css";
import "../style/css/modal.css";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../Redux/reduser/auth";

const QrCode = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : false;
  const { user } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(auth());
  }, [dispatch]);
  return (
    <div>
      {token ? (
        <>
          <div className="nav">
            <div className="container d-flex justify-content-between align-items-center">
              <p></p>
              <p className="qr_cod_header">
                Ваша карта "Алма"
                <br /> <span className="sapn">{user.bonus_id}</span>
              </p>
              <p></p>
            </div>
          </div>
          <div className="block container ">
            <img className="qar" src={user.qrimg} alt="" />
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default QrCode;
