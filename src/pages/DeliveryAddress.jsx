import React, { useState, useEffect } from "react";
import more from "../img/more.svg";
import address_img from "../img/empty_address.svg";
import { HiOutlinePlusSm } from "react-icons/hi";
import { useNavigate } from "react-router";
import { url } from "../Api";
import axios from "axios";
import close_address from "../img/close-address.svg";

const DeliveryAddress = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const getData = JSON.parse(localStorage.getItem(`address`));
  const [orderDelete, setOrderDelete] = useState([]);
  const [local, setLocal] = useState(localStorage.getItem("tokens"));

  const headers = {
    Authorization: `Token ${local}`,
  };

  const ordering = async () => {
    try {
      const response = await axios.get(url + "/order/address/list/", {
        headers,
      });
      setData(response.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    ordering();
  }, []);

  const delite = async (id) => {
    try {
      const response = await axios.get(url + `/order/address/delete/${id}`, {
        headers,
      });
      setOrderDelete(response.data);
      localStorage.removeItem("address");
    } catch (error) {
      console.log("Error", error);
    }
  };
  const datas = data[0]?.active;

  return (
    <div id="modal">
      <div className="delivery_address">
        <div className="nav">
          <div className="container d-flex justify-content-between align-items-center ">
            <img
              className="more_img"
              onClick={() => navigate("/dashboard")}
              src={more}
              alt=""
            />
            <p className="alma_title_header">Адрес доставки</p>
            <span></span>
          </div>
        </div>
        <div className="container">
          <button
            className="address_block_btn"
            onClick={() => navigate("/new-address")}
          >
            <HiOutlinePlusSm size={24} style={{ color: "#DC0200" }} /> Добавить
            адрес
          </button>
          {datas === false ? (
            <div
              className="position_address_relt"
              style={{ width: "100%", margin: "30px 0 0 0" }}
            >
              {data.map((el) => (
                <div className="addres_all" key={el.id}>
                  <div
                    className="radius_block"
                    onClick={() => {
                      localStorage.setItem(`address`, JSON.stringify(el));
                      localStorage.setItem(`addres`, JSON.stringify(true));
                      <div className="block_lean"></div>;
                      navigate("/placing-orders");
                    }}
                  >
                    <div className="border_leans ">
                      <div
                        className={
                          el.active
                            ? "block_lean"
                            : getData?.id == el.id
                            ? "block_lean"
                            : "leans"
                        }
                      ></div>
                    </div>
                    <p className="project" style={{ margin: "0 10px" }}>
                      {el.street} {el.number} {el.building} {el.apartment}
                            {el.floor}
                    </p>
                  </div>
                  <div className="icons_block">
                    <img
                      src={close_address}
                      alt=""
                      className="icon_delt"
                      onClick={async () => {
                        await delite(el.id);
                        ordering();
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="address_block">
              <img src={address_img} alt="" />
              <h1>Пока тут пусто</h1>
              <p>Здесь будут храниться ваши адреса</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryAddress;
