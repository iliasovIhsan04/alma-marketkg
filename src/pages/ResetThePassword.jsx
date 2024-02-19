import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../UI/Loading/Loading";
import InputMask from "react-input-mask";
import axios from "axios";
import { url } from "../Api";
import more from "../img/more.svg";

import {
  registerFailure,
  registerSuccess,
} from "../Redux/slice/activationReduser";

const ResetThePassword = ({ Alert }) => {
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorCode, setErrorCode] = useState([]);
  const { error } = useSelector((state) => state.user);

  const handleForgotEvent = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let forgotCredential = {
      phone,
    };
    try {
      const response = await axios.post(
        url + "/auth/reset-password",
        forgotCredential
      );
      if (response.data.response === true) {
        localStorage.setItem("phone", JSON.stringify(phone));
        dispatch(registerSuccess(response.data));
        navigate("/personal/activation-code");
        Alert(response.data.message, "success");
      } else {
        Alert(response.data.message, "error");
      }
      if (response.data.phone) {
        setErrorCode(response.data);
      }
    } catch (error) {
      console.error(error);
      dispatch(registerFailure(error.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="reset_the_password">
      <div className="nav">
        <div className="container d-flex justify-content-between align-items-center ">
          <img
            className="more_img"
            onClick={() => navigate(-1)}
            src={more}
            alt=""
          />
          <h1 className="regis_titl">Забыл(-а) пароль</h1>
          <p></p>
        </div>
      </div>
      <div className="container">
        <form className="reset_password_block" onSubmit={handleForgotEvent}>
          <p className="py-2">
            Мы отправим 6х значный код на этот номер телефона
          </p>
          <div className="input_box">
            <label>Номер телефона</label>
            <InputMask
              className="input_form new_add_input"
              mask="+996 (999) 99-99-99"
              maskChar={null}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            >
              {(inputProps) => (
                <input
                  {...inputProps}
                  type="tel"
                  placeholder="+996 (700) 10-20-30"
                />
              )}
            </InputMask>
            {errorCode.phone && <p className="red">{errorCode.phone} </p>}
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="forgot_btn reset_btn"
          >
            {isLoading ? <Loading /> : "Отправить"}
          </button>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetThePassword;
