import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosMegaphone } from "react-icons/io";
import { url } from "../Api";
import { useNavigate } from "react-router";
import korzina from "../img/korzina.jpeg";
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
    <div className="notification_modal">
      <div className="nav nav_notification">
        <div className="container d-flex justify-content-between align-items-center">
          <img
            className="more_img"
            onClick={() => navigate(-1)}
            src={more}
            alt=""
          />
          <p className="header_name">Уведомление</p>
          <div />
        </div>
      </div>
      <div className="shop_details_madal">
        {loading ? (
          ""
        ) : (
          <>
            {notify.length > 0 ? (
              <div className="notificatios_block">
                <div className="container">
                  {notify.map((el) => (
                    <div
                      className="notifications_box"
                      key={el.id}
                      onClick={() =>
                        navigate(`/notifications-details/${el.id}`)
                      }
                    ></div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="container">
                <div className="ionic ionic_block">
                  <div></div>
                  <div className="ionic_box1">
                    <img src={korzina} alt="" />
                    <h3>Бул жер азырынча бош</h3>
                    <p>Бул жерде сизге жаны жаңылыктар көрсөтүлөт</p>
                  </div>
                  <button className="ionic_button">
                    <h5 className="ionic_button_text">Тарыхты көрсөтүү</h5>
                    <p className="ionic_button_date">
                      01.10.2023 дан 31.10.2023 чейин
                    </p>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Notifications;
