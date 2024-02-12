import React from "react";
import { useNavigate } from "react-router";
import { useState } from "react";
import Loading from "../UI/Loading/Loading";
import more from "../img/more.svg";
import {
  registerFailure,
  registerSuccess,
} from "../Redux/slice/activationReduser";
import { useDispatch } from "react-redux";
import axios from "axios";
import { url } from "../Api";

const Activation = ({ Alert }) => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const phone = localStorage.getItem("phone");
  let repeatActivationCredential = {
    phone,
  };
  const handleCode = () => {
    axios.post(url + "/auth/send-code", repeatActivationCredential);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (code == "") {
      Alert("Введите код подтверждения", "error");
      setLoading(false);
    } else {
      const phone = localStorage.getItem("phone");

      let activationCredential = {
        phone,
        code,
      };
      try {
        const response = await axios.post(
          url + "/auth/verify-phone",
          activationCredential
        );
        dispatch(registerSuccess(response.data));
        if (response.data.response === false) {
          Alert(response.data.message, "error");
        }
        if (response.data.token) {
          localStorage.setItem("token", JSON.stringify(response.data.token));
          localStorage.setItem("tokens", response.data.token);
        }
        if (response.data.response === true) {
          Alert(response.data.message, "success");
          navigate("/");
        }
        if (response.data.code) {
          setError(response.data);
        }
        setLoading(false);
      } catch (error) {
        dispatch(registerFailure(error.message));
      }
      setLoading(false);
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
          <p>Введитe код подтверждения из CMC</p>
          <form onSubmit={handleSubmit}>
            <label className="confirmation_label">Код подверждения</label>
            <input
              style={{ textAlign: "center" }}
              className="input_form confirm_input"
              value={code}
              type="text"
              placeholder="Введите код"
              onChange={(e) => setCode(e.target.value)}
            />
            {error.code && <p className="red">{error.code}</p>}
            <button
              disabled={loading}
              style={{ marginTop: 20 }}
              className="registr_btn"
              type="submit"
            >
              {loading ? <Loading /> : "Подтвердить"}
            </button>
            <button onClick={handleCode} className="repeat_the_code_btn">
              Отправить снова
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Activation;
