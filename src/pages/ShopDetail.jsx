import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import more from "../img/more.svg";
import filter_img from "../img/filter.svg";
import transfer from "../img/transfer-data.svg";
import "../style/css/modal.css";
import { url } from "../Api";
import Loading from "../UI/Loading/Loading";
import Slider from "react-slider";
import lineModal from "../img/line-4.svg";
import { RiCloseLine } from "react-icons/ri";
import search1 from "../img/search-icon-rel.svg";

const MIN = 40;
const MAX = 500;
const ShopDetail = ({ data, setData }) => {
  const [tabs, setTabs] = useState([]);
  const { cat, name } = useParams();
  const [query, setQuery] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lastClicked, setLastClicked] = useState("dataClicks");
  const navigate = useNavigate();
  const [sub_cat, setSubCat] = useState(0);
  const [filter, setFilter] = useState(false);
  const [filters, setFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [all, setAll] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const [requests, setRequests] = useState({
    budget: [MIN, MAX],
  });
  const [local, setLocal] = useState(localStorage.getItem("tokens"));
  const headers = {
    Authorization: `Token ${local}`,
  };
  const [checkmark, setCheckmark] = useState({
    one: true,
    two: false,
    three: false,
    four: false,
    five: false,
    six: false,
  });
  const api = "product/list";
  useEffect(() => {
    axios
      .get(`${url}/${api}?cat=${cat}`, { headers })
      .then((response) => setData(response.data));
  }, []);
  const dataClick = async (dataID) => {
    try {
      const response = await axios.get(`${url}/${api}?cat=${dataID}`);
      const categoryProducts = response.data;
      setData(categoryProducts);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    } finally {
      setFilters(false);
    }
  };
  const fetchData = async (subCatId) => {
    try {
      const response = await axios.get(`${url}/${api}?sub_cat=${subCatId}`);
      const categoryProducts = response.data;
      setData(categoryProducts);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    } finally {
      setFilters(false);
      setRequests({
        budget: [MIN, MAX],
      });
    }
  };
  const filtersData = async () => {
    try {
      const response = await axios.get(
        `${url}/${api}?pricefrom=${requests.budget[0]}&priceto=${requests.budget[1]}`
      );
      const categoryProducts = response.data;
      setData(categoryProducts);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    } finally {
      setFilters(false);
    }
  };
  const dataClicks = () => {
    setAll(cat);
    setSelectedIndex(tabs.findIndex((el) => el.id === cat));
    dataClick(cat);
    setLastClicked("dataClicks");
  };

  const handleTabClick = (selectedId) => {
    setSubCat(selectedId);
    setSelectedIndex(tabs.findIndex((el) => el.id === selectedId));
    fetchData(selectedId);
    setLastClicked("handleTabClick");
  };

  function OneFunc() {
    setCheckmark({
      ...checkmark,
      one: true,
      two: false,
      three: false,
      four: false,
      five: false,
      six: false,
    });
    setFilter(false);
    setLoading(true);
    axios
      .get(url + `/product/sub-categories/${cat}`)
      .then((response) => {
        const categoryProducts = response.data;
        setTabs(categoryProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
        setLoading(false);
      });
  }

  useEffect(() => {
    OneFunc();
  }, [cat]);

  const handleTitleMinus = async () => {
    setCheckmark({
      ...checkmark,
      one: false,
      two: false,
      three: false,
      four: false,
      five: false,
      six: true,
    });
    setFilter(false);
    try {
      const response = await axios.get(`${url}/${api}?ordering=-title`);
      const categoryProducts = response.data;
      setData(categoryProducts);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  };

  const handleTitle = async () => {
    setCheckmark({
      ...checkmark,
      one: false,
      two: false,
      three: false,
      four: false,
      five: true,
      six: false,
    });
    setFilter(false);
    setLoading(true);
    setData([]);
    try {
      const response = await axios.get(`${url}/${api}?ordering=title`);
      const categoryProducts = response.data;
      setData(categoryProducts);
      setLoading(false);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
      setLoading(false);
    }
  };
  const handlePrice = async () => {
    setCheckmark({
      ...checkmark,
      one: false,
      two: false,
      three: true,
      four: false,
      five: false,
      six: false,
    });
    setFilter(false);
    setLoading(true);
    setData([]);
    try {
      const response = await axios.get(`${url}/${api}?ordering=price`);
      const categoryProducts = response.data;
      setData(categoryProducts);
      setLoading(false);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
      setLoading(false);
    }
  };

  const handlePriceMinus = async () => {
    setCheckmark({
      ...checkmark,
      one: false,
      two: false,
      three: false,
      four: true,
      five: false,
      six: false,
    });
    setFilter(false);
    setLoading(true);
    setData([]);
    try {
      const response = await axios.get(`${url}/${api}?ordering=-price`);
      const categoryProducts = response.data;
      setData(categoryProducts);
      setLoading(false);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
      setLoading(false);
    }
  };
  const handleSales = async () => {
    setCheckmark({
      ...checkmark,
      one: false,
      two: true,
      three: false,
      four: false,
      five: false,
      six: false,
    });
    setFilter(false);
    setLoading(true);
    setData([]);
    try {
      const response = await axios.get(`${url}/${api}?ordering=-sales`);
      const categoryProducts = response.data;
      setData(categoryProducts);
      setLoading(false);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <div id="modal">
        <div className="nav_line">
          <div className="container d-flex justify-content-between align-items-center ner">
            <img
              className="fi"
              src={more}
              alt=""
              onClick={() => navigate("/shop-all/shop")}
            />
            <h4 className="title_h5 all_title_one">Каталог, товары</h4>
            <p></p>
          </div>
          <div className="input_box_search container">
            <img className="search_img" src={search1} alt="" />
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Поиск товаров"
              type="text"
            />
          </div>
          <div className="container d-flex align-items-center scroll type_mt">
            <div className="from_btn">
              <div
                className={
                  lastClicked === "handleTabClick"
                    ? "btn_tabs"
                    : "btn_tabs_active"
                }
                onClick={dataClicks}
              >
                Все
              </div>
            </div>
            {tabs.map((el, index) => (
              <div className="from_btn" key={el.id}>
                <div
                  key={el.id}
                  className={
                    lastClicked === "dataClicks"
                      ? "btn_tabs"
                      : index === selectedIndex
                      ? "btn_tabs_active"
                      : "btn_tabs"
                  }
                  onClick={() => handleTabClick(el.id)}
                >
                  {el.name}
                </div>
              </div>
            ))}
          </div>
          <div className="container">
            <div className="filter">
              <div
                className="dnow d-flex align-items-center justify-content-center"
                onClick={() => setFilters(true)}
              >
                <img className="icons" src={filter_img} alt="" />
                <h6 className="title_one mt_one">Фильтр</h6>
              </div>

              <div
                className="dnow d-flex align-items-center justify-content-center"
                onClick={() => setFilter(true)}
              >
                <img src={transfer} alt="" />
                <h6 className="title_one mt_one">Сортировка</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="shop_details_modal">
          <div>
            <div>
              {filters === true && (
                <div className="filters_oll" onClick={() => setFilters(false)}>
                  <div className="order" onClick={(e) => e.stopPropagation()}>
                    <img className="line_modal" src={lineModal} alt="" />
                    <RiCloseLine
                      size={25}
                      className="line_x"
                      onClick={() => setFilters(false)}
                    />
                    <div className="container iner">
                      <h3 className="title_h4 filtr_title">Фильтр</h3>
                      <div className="filtr_from d-flex align-items-center justify-content-between">
                        <div className="filtr_from_box">
                          <h6 className="title_h6 nava">От</h6>
                          <div className="value">
                            <span className="values">{requests.budget[0]}</span>
                          </div>
                        </div>
                        <div className="filtr_from_box">
                          <h6 className="title_h6 nava">До</h6>
                          <div className="value">
                            <span className="values">{requests.budget[1]}</span>
                          </div>
                        </div>
                      </div>
                      <Slider
                        className="slider"
                        onChange={(newBudget) =>
                          setRequests({ ...requests, budget: newBudget })
                        }
                        value={requests.budget}
                        min={MIN}
                        max={MAX}
                      />
                    </div>
                    <div className="container">
                      <button
                        className="btn_button all_btn"
                        onClick={filtersData}
                      >
                        {isLoading ? <Loading /> : "Применить"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="container">
            <div className="shops_block_all  row_one pb-5">
              {loading ? (
                <div className="loading_div">
                  <Loading />
                </div>
              ) : (
                data
                  .filter((obj) => {
                    return obj.title
                      .toLowerCase()
                      .includes(value.toLowerCase());
                  })
                  .map((el) => (
                    <div className="shops_box" key={el.id}>
                      <div
                        className="blocks"
                        onClick={() => navigate(`/shop-all/product/${el.id}`)}
                      >
                        <img src={el.img} alt="" />
                      </div>
                      <div className="all">
                        <h3 className="title_one ">{el.title}</h3>
                        <div className="product-info">
                          <div className="product-column column-top">
                            <span>1 {el.price_for}</span>
                            <h2 className="price old">
                              {el.old_price ? el.old_price : el.price} сом
                            </h2>
                          </div>
                          {el.old_price && (
                            <div className="product-column">
                              <span className="card-text">По карте</span>
                              <h2 className="price">{el.price} сом</h2>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
      {data.map((el) => (
        <div className="">
          {filter === true && (
            <div className="filter_oll_1" onClick={() => setFilter(false)}>
              <div className="order" onClick={(e) => e.stopPropagation()}>
                <img className="line_modal" src={lineModal} alt="" />
                <RiCloseLine
                  size={25}
                  className="line_x"
                  onClick={() => setFilter(false)}
                />
                <div className="container">
                  <div className="d-flex justify-content-between">
                    <h6 className="title_h3 orders">Сортировка</h6>
                  </div>
                  <div className="sort-wrap" onClick={OneFunc}>
                    <label className="custom_radio_btn">
                      {checkmark.one && <span className="checmark"></span>}
                    </label>
                    <h6 className="title_one m-lg-2">По умолчанию</h6>
                  </div>
                  <div className="sort-wrap" onClick={handleSales}>
                    <label className="custom_radio_btn">
                      {checkmark.two && <span className="checmark"></span>}
                    </label>
                    <label
                      htmlFor="popular-checkbox"
                      className="title_one m-lg-2"
                    >
                      Сначала популярные
                    </label>
                  </div>
                  <div className="sort-wrap" onClick={handlePrice}>
                    <label className="custom_radio_btn">
                      {checkmark.three && <span className="checmark"></span>}
                    </label>
                    <label
                      htmlFor="popular-checkbox"
                      className="title_one m-lg-2"
                    >
                      Сначала дешевые
                    </label>
                  </div>
                  <div className="sort-wrap" onClick={handlePriceMinus}>
                    <label className="custom_radio_btn">
                      {checkmark.four && <span className="checmark"></span>}
                    </label>
                    <label
                      htmlFor="popular-checkbox"
                      className="title_one m-lg-2"
                    >
                      Сначала дорогие
                    </label>
                  </div>
                  <div className="sort-wrap" onClick={handleTitle}>
                    <label className="custom_radio_btn">
                      {checkmark.five && <span className="checmark"></span>}
                    </label>
                    <label
                      htmlFor="popular-checkbox"
                      className="title_one m-lg-2"
                    >
                      По алфавиту от А до Я
                    </label>
                  </div>
                  <div className="sort-wrap" onClick={handleTitleMinus}>
                    <label className="custom_radio_btn">
                      {checkmark.six && <span className="checmark"></span>}
                    </label>
                    <label
                      htmlFor="popular-checkbox"
                      className="title_one m-lg-2"
                    >
                      По алфавиту от Я до А
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default ShopDetail;
