import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { HiArrowLongLeft } from "react-icons/hi2";
import { BsSearch } from "react-icons/bs";
import more from "../img/more.svg";
import filter_img from "../img/filter.svg";
import transfer from "../img/transfer-data.svg";
import "../style/css/modal.css";
import { url } from "../Api";
import Loading from "../UI/Loading/Loading";
import Slider from "react-slider";

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
  const [search, setSearch] = useState(false);
  const [all, setAll] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState({
    budget: [MIN, MAX],
  });
  const [local, setLocal] = useState(localStorage.getItem("tokens"));
  const headers = {
    Authorization: `Token ${local}`,
  };
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
      setSearch(false);
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
      setSearch(false);
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
      setSearch(false);
    }
  };

  const handleSearchButtonClick = async () => {
    try {
      const response = await axios.get(`${url}/${api}?search=${query}`);
      const categoryProducts = response.data;
      setData(categoryProducts);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    } finally {
      setFilters(false);
      setSearch(false);
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

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  useEffect(() => {
    axios
      .get(url + `/product/sub-categories/${cat}`)
      .then((response) => {
        const categoryProducts = response.data;
        setTabs(categoryProducts);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
      });
  }, [cat]);

  const handleTitleMinus = async () => {
    try {
      const response = await axios.get(`${url}/${api}?ordering=-title`);
      const categoryProducts = response.data;
      setData(categoryProducts);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    } finally {
      setFilters(false);
    }
  };
  const handleTitle = async () => {
    try {
      const response = await axios.get(`${url}/${api}?ordering=title`);
      const categoryProducts = response.data;
      setData(categoryProducts);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    } finally {
      setFilters(false);
    }
  };
  const handlePrice = async () => {
    try {
      const response = await axios.get(`${url}/${api}?ordering=price`);
      const categoryProducts = response.data;
      setData(categoryProducts);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    } finally {
      setFilters(false);
    }
  };
  const handlePriceMinus = async () => {
    try {
      const response = await axios.get(`${url}/${api}?ordering=-price`);
      const categoryProducts = response.data;
      setData(categoryProducts);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    } finally {
      setFilters(false);
    }
  };
  const handleSales = async () => {
    try {
      const response = await axios.get(`${url}/${api}?ordering=-sales`);
      const categoryProducts = response.data;
      setData(categoryProducts);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    } finally {
      setFilters(false);
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
            <BsSearch
              size={22}
              style={{ color: "#191919" }}
              onClick={() => setSearch(true)}
            />
          </div>
          <div className="container d-flex align-items-center scroll">
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
          {search === true && (
            <div id="modal_one">
              <div className="nav">
                <div className="container d-flex justify-content-between align-items-center">
                  <HiArrowLongLeft
                    className="fi"
                    onClick={() => navigate(-1)}
                  />
                  <h4 className="title_h5 all_title">Поиск</h4>
                  <div />
                </div>
              </div>
              <div className="container search_in">
                <input
                  className="input_form_all mt-4"
                  type="text"
                  placeholder="Поиск..."
                  value={query}
                  onChange={handleInputChange}
                />
                <button
                  className="search-button"
                  onClick={handleSearchButtonClick}
                >
                  {isLoading ? <Loading /> : "Поиск"}
                </button>
              </div>
            </div>
          )}
          <div>
            {filters === true && (
              <div className="filters_oll">
                <div className="order">
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
          <div className="container">
            <div className="shops_block_all  row_one pb-5">
              {data.map((el) => (
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
              ))}
            </div>
          </div>
        </div>
      </div>
      {data.map((el) => (
        <div>
          {filter === true && (
            <div className="filters_oll" onClick={() => setFilter(false)}>
              <div className="order" onClick={(e) => e.stopPropagation()}>
                <div className="container">
                  <div className="d-flex justify-content-between">
                    <h6 className="title_h3 orders">Сортировка</h6>
                  </div>
                  <div className="sort-wrap">
                    <input
                      id="wp-comment-cookies-consent"
                      name="wp-comment-cookies-consent"
                      type="radio"
                      value="yes"
                      onClick={() => setFilter(false)}
                      style={{ color: "red" }}
                    />
                    <h6 className="title_one m-lg-2">По умолчанию</h6>
                  </div>
                  <div className="sort-wrap" onClick={() => handleSales()}>
                    <input
                      id="popular-checkbox"
                      name="popular-sort"
                      type="radio"
                      value="yes"
                      onClick={() => setFilter(false)}
                    />
                    <label
                      htmlFor="popular-checkbox"
                      className="title_one m-lg-2"
                    >
                      Сначала популярные
                    </label>
                  </div>
                  <div
                    className="sort-wrap"
                    onClick={handlePrice || setFilter(false)}
                  >
                    <input
                      id="wp-comment-cookies-consent"
                      name="wp-comment-cookies-consent"
                      type="radio"
                      value="yes"
                    />
                    <label
                      htmlFor="popular-checkbox"
                      className="title_one m-lg-2"
                    >
                      Сначала дешевые
                    </label>
                  </div>
                  <div
                    className="sort-wrap"
                    onClick={handlePriceMinus || setFilter(false)}
                  >
                    <input
                      id="wp-comment-cookies-consent "
                      name="wp-comment-cookies-consent"
                      type="radio"
                      value="yes"
                    />
                    <label
                      htmlFor="popular-checkbox"
                      className="title_one m-lg-2"
                    >
                      Сначала дорогие
                    </label>
                  </div>
                  <div
                    className="sort-wrap"
                    onClick={handleTitle || setFilter(false)}
                  >
                    <input
                      id="wp-comment-cookies-consent "
                      name="wp-comment-cookies-consent"
                      type="radio"
                      value="yes"
                    />
                    <label
                      htmlFor="popular-checkbox"
                      className="title_one m-lg-2"
                    >
                      По алфавиту от А до Я
                    </label>
                  </div>
                  <div
                    className="sort-wrap"
                    onClick={handleTitleMinus || setFilter(false)}
                  >
                    <input
                      id="wp-comment-cookies-consent "
                      name="wp-comment-cookies-consent"
                      type="radio"
                      value={el.title}
                    />
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
