import React, { useState } from "react";
import { useNavigate } from "react-router";
import Loading from "../UI/Loading/Loading";
import more from "../img/more.svg";
import {
  registerFailure,
  registerSuccess,
} from "../Redux/slice/activationReduser";
import { useDispatch } from "react-redux";
import axios from "axios";
import { url } from "../Api";

const ActivationCode = ({ Alert }) => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState([]);

  const handleCodeSubmit = async (event) => {
    event.preventDefault();
    const storedPhone = JSON.parse(localStorage.getItem("phone"));
    setIsLoading(true);
    let activationCodeCredential = {
      phone: storedPhone,
      code,
    };
    try {
      const response = await axios.post(
        url + "/auth/reset-password-verify",
        activationCodeCredential
      );
      dispatch(registerSuccess(response.data));
      if (response.data.response === true) {
        navigate("/personal/reset-password");
      }
      setIsLoading(false);
      if (response.data.response === false) {
        Alert(response.data.message, "error");
      }
      if (response.data.code) {
        setError(response.data);
      }
      if (response.data.token) {
        localStorage.setItem("token_block", response.data.token);
      }
    } catch (error) {
      dispatch(registerFailure(error.message));
      setIsLoading(false);
    }
  };

  return (
    <div id="modal">
      <div className="nav">
        <div className="container d-flex justify-content-between align-items-center ">
          <img
            className="more_img"
            onClick={() => navigate(-1)}
            src={more}
            alt=""
          />
          <h1 className="regis_titl">Код подверждения</h1>
          <p></p>
        </div>
      </div>
      <div className="container">
        <div className="activation">
          <p>Введите код, который мы вам отправили на сообщение</p>
          <form onSubmit={handleCodeSubmit}>
            <label className="confirmation_label">Код подверждения</label>
            <input
              style={{ textAlign: "center" }}
              className="input_form"
              value={code}
              type="text"
              placeholder="Введите код"
              onChange={(e) => setCode(e.target.value)}
            />
            {error.code && <p className="red">{error.code}</p>}
            <button
              disabled={isloading}
              style={{ marginTop: 20 }}
              className="registr_btn"
              type="submit"
            >
              {isloading ? <Loading /> : "Подтвердить"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ActivationCode;
