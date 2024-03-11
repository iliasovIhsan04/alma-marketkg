import React, { useEffect, useState } from "react";
import more from "../img/more.svg";
import { useNavigate } from "react-router";
import cart_img from "../img/empty_cart.svg";
import { GoPlus } from "react-icons/go";
import { HiOutlineMinusSmall } from "react-icons/hi2";

const BasketProduct = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [plus, setPlus] = useState({});
  const [shopCart, setShopCart] = useState([]);
  const [plusFrom, setPlusFrom] = useState([]);
  const [count, setCount] = useState(0);
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    const basket = JSON.parse(localStorage.getItem("carts"));
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const storedShopCart = JSON.parse(localStorage.getItem("shopCart")) || [];
    const storedPlus = JSON.parse(localStorage.getItem("plus")) || {};
    setCart(storedCart);
    setBasket(basket);
    setShopCart(storedShopCart);
    setPlus(storedPlus);
  }, []);

  const handlePlus = (id) => {
    const itemTo = basket.find((el) => el.id === id);
    const itemToLocal = shopCart.find((el) => el.id === id);
    if (itemTo) {
      setShopCart((prevShopCart) => {
        const updatedCart = [...prevShopCart, itemTo];
        localStorage.setItem("shopCart", JSON.stringify(updatedCart));
        return updatedCart;
      });

      setPlus((prevPlus) => {
        const newPlus = { ...prevPlus, [id]: (prevPlus[id] || 0) + 1 };
        localStorage.setItem("plus", JSON.stringify(newPlus));
        return newPlus;
      });
      PriceCalculation();
    } else if (itemToLocal) {
      setShopCart((prevShopCart) => {
        const updatedCart = [...prevShopCart, itemToLocal];
        localStorage.setItem("shopCart", JSON.stringify(updatedCart));
        localStorage.setItem(
          `activePlus_${itemToLocal.id}`,
          `${itemToLocal.id}`
        );
        return updatedCart;
      });
      PriceCalculation();
      setPlus((prevPlus) => {
        const newPlus = { ...prevPlus, [id]: (prevPlus[id] || 0) + 1 };
        localStorage.setItem("plus", JSON.stringify(newPlus));
        return newPlus;
      });
    }
  };

  const handleMinus = (id) => {
    const itemIndex = shopCart.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
      setShopCart((prevShopCart) => {
        const updatedCart = [...prevShopCart];
        updatedCart.splice(itemIndex, 1);
        localStorage.setItem("shopCart", JSON.stringify(updatedCart));
        PriceCalculation();
        const isItemStillInCart = updatedCart.some((item) => item.id === id);
        if (!isItemStillInCart) {
          localStorage.removeItem(`activePlus_${id}`);
        }
        return updatedCart;
      });

      setPlus((prevPlus) => {
        const newPlus = { ...prevPlus, [id]: (prevPlus[id] || 0) - 1 };
        localStorage.setItem("plus", JSON.stringify(newPlus));
        return newPlus;
      });
    }
  };

  const handleRemoveItem = (id) => {
    const currentCart = JSON.parse(localStorage.getItem("carts"));
    const updatedCart = currentCart.filter((item) => item.id !== id);
    localStorage.setItem("carts", JSON.stringify(updatedCart));

    const rowElement = document.getElementById("row-" + id);
    if (rowElement) {
      rowElement.remove();
    }
  };

  useEffect(() => {
    const plusCartFromLocalStorage = JSON.parse(
      localStorage.getItem("shopCart")
    );
    if (plusCartFromLocalStorage && plusCartFromLocalStorage.length) {
      setPlusFrom(plusCartFromLocalStorage);
    } else {
      setPlusFrom([]);
    }
  }, []);

  const PriceCalculation = () => {
    const shopCart = JSON.parse(localStorage.getItem("shopCart"));
    if (shopCart && Array.isArray(shopCart)) {
      let counts = shopCart.reduce(
        (acc, item) => (acc += parseFloat(item.price)),
        0
      );
      setCount(counts);
    } else {
      setCount(0);
    }
  };

  useEffect(() => {
    PriceCalculation();
  }, [count, shopCart]);

  useEffect(() => {
    const carts = JSON.parse(localStorage.getItem("carts"));
    if (!carts || carts.length === 0) {
      localStorage.removeItem("carts");
    }
  }, []);

  return (
    <div id="modal">
      <div className="basket_product">
        <div className="nav">
          <div className="container d-flex justify-content-between align-items-center ">
            <img
              className="more_img"
              onClick={() =>
                navigate("/") ||
                localStorage.removeItem("false") ||
                localStorage.removeItem("plusOne")
              }
              src={more}
              alt=""
            />
            <p className="alma_title_header">Корзина</p>
            <span></span>
          </div>
        </div>
        {localStorage.getItem("carts") ? (
          <div className="container">
            {basket.map((el) => {
              const rowId = "row-" + el.id;
              return (
                <div key={el.id}>
                  <div className="carts_block" id={rowId}>
                    <div className="carts_block_img">
                      <img src={el.preview_img} alt="" />
                    </div>
                    <div className="carts_title_bl">
                      <div className="close_carts">
                        <h2>{el.title}</h2>
                      </div>
                      <div className="price_add">
                        <h3>{el.price} сом</h3>
                        <div className="plus_carts_block">
                          <div
                            className="plus_carts_rr"
                            onClick={() => {
                              handleMinus(el.id);
                            }}
                          >
                            <HiOutlineMinusSmall color="#000" size={20} />
                          </div>
                          <span key={el.id}>{plus[el.id] || 0}</span>
                          {plus[el.id] === 0 && (
                            <>
                              {localStorage.removeItem(`activeItems_${el.id}`)}
                              {handleRemoveItem(el.id)}
                            </>
                          )}
                          <div className="plus_carts_rr">
                            <GoPlus
                              color="#000"
                              size={20}
                              onClick={() => {
                                handlePlus(el.id);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="placing_price_block">
                    <div className="placing_price_box">
                      <span>Сумма:</span>
                      <h1>{count}</h1>
                    </div>
                    <div className="placing_price_box placing_address_brr">
                      <span>Доставка:</span>
                      <h1>150 сом</h1>
                    </div>
                    <div className="placing_price_box">
                      <span>Итого:</span>
                      <h1 className="placing_color">{count + 150}</h1>
                    </div>
                    <button
                      onClick={() => navigate("/placing-orders")}
                      className="basket_btn"
                    >
                      К оформлению
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="container">
            <div className="featured_products_block basket_top">
              <img src={cart_img} alt="" />
              <h1>Пока тут пусто</h1>
              <p>
                Добавьте в корзину всё, что душе угодно, а мы доставим заказ
                от 150 сом
              </p>
              <button onClick={() => navigate("/shop-all/shop")}>
                Перейти в каталог
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BasketProduct;
