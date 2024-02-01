import React, { useState, useEffect } from "react";
import "../style/css/App.css";
import { useNavigate } from "react-router-dom";
import logoalma from "../img/logo-alma.svg";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { ProducRedux } from "../Redux/reduser/ProducRedux";

const Shop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(ProducRedux());
  }, [dispatch]);

  return (
    <>
      <div className="nav">
        <div className="container nav_content">
          <HiArrowLongLeft className="fi" onClick={() => navigate("/")} />
          <img src={logoalma} alt="" />
          <div />
        </div>
      </div>
      <div className="container">
        <div className="all_shop">
          {products.map((el) => (
            <div
              className="shops"
              key={el.id}
              onClick={() => navigate(`/shop-all/shop/${el.id}`)}
            >
              <h5 className="shop_name">{el.name}</h5>
              <div className="img_container">
                <img src={el.img} alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Shop;
