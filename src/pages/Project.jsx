import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Shop from "./Shop";
import ShopDetail from "./ShopDetail";
import Search from "./Search";
import Product from "./Product";

const Project = () => {
  const [modals, setModals] = useState(false);
  const [data, setData] = useState([]);
  return (
    <div>
      <Routes>
        <Route path="shop" element={<Shop />} />
        <Route
          path="shop/:cat"
          element={<ShopDetail data={data} setData={setData} />}
        />
        <Route
          path="search"
          element={<Search modal={modals} setModal={setModals} />}
        />
        <Route path="product/:id" element={<Product datass={data} />} />
      </Routes>
    </div>
  );
};

export default Project;
