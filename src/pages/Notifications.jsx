import axios from "axios";
import React, { useEffect, useState } from "react";
import { url } from "../Api";
import { useNavigate } from "react-router";
import more from "../img/more.svg";

const Notifications = () => {
  const navigate = useNavigate();
  const [notify, setNotify] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url + "/notifications/")
      .then((response) => {
        setLoading(false);
        setNotify(response.data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div id="modal">
      <div className="nav ">
        <div className="container d-flex justify-content-between align-items-center">
          <img
            className="more_img"
            onClick={() => navigate(-1)}
            src={more}
            alt=""
          />
          <p className="alma_title_header">Уведомление</p>
          <div />
        </div>
      </div>
      <div className="shop_details_madal">
        <div className="notificatios_block">
          <div className="container">
            {notify.map((el) => (
              <div className="notifications_box" key={el.id}>
                <div className="noti_title_block">
                  <h2>{el.title} </h2>
                </div>
                <p dangerouslySetInnerHTML={{ __html: el.description }}></p>
                <span>{el.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
