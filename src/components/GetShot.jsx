import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "../style/css/main.css";
import { fetchData } from "../Redux/reduser/fetchData";
import more_left from "../img/more-left.svg";

const GetShot = ({ token }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.myData);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  return (
    <>
      {token ? (
        <div className="get_shot">
          <div className="container">
            <div className="title">
              <p className="text t-custom">Успей купить</p>
              <h4
                className="title_add t-custom"
                onClick={() => navigate("/promotion")}
              >
                Все
                <img src={more_left} alt="" />
              </h4>
            </div>
            <div className="get_block_all_block">
              {data.map((el, id) => (
                <div
                  key={id}
                  onClick={() => navigate(`/get-shot-details-id/${el.id}`)}
                  className="special_box_blok"
                >
                  <div className="sp_box special_details_box">
                    <img
                      className="special_image_block"
                      src={el.img}
                      alt=""
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default GetShot;
