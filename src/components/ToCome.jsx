import React from "react";
import Slider from "react-slick";
import board_img1 from "../img/board-img1.svg";
import board_img2 from "../img/board-img2.svg";
import board_img3 from "../img/board-img3.svg";

const ToCome = () => {
  const settings = {
    focusOnSelect: true,
    infinite: true,
    dots: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
  };
  return (
    <>
      <Slider className="to_comeeee" {...settings}>
        <div className="on_all_block">
          <div className="on_board_block">
            <h1>
              Новое приложение <br /> «Алма»
            </h1>
            <p>
              Совершайте покупки, получайте <br /> приятные бонусы и скидки
            </p>
          </div>
          <img className="slider_tom_home" src={board_img1} alt="slider" />
        </div>
        <div className="on_all_block">
          <div className="on_board_block">
            <h1>
              Широкий <br /> ассортимент товаров
            </h1>
            <p>
              12:30 Широкий ассортимент товаров от продуктов питания и бытовой
              <br />
              химии до товаров для дома и красоты
            </p>
          </div>
          <img className="slider_tom_home" src={board_img2} alt="slider" />
        </div>
        <div className="on_all_block">
          <div className="on_board_block">
            <h1>
              Отслеживание <br /> истории покупок
            </h1>
            <p>
              Исследуйте вашу историю покупок прямо <br /> сейчас и оставайтесь
              на шаг впереди!"
            </p>
          </div>
          <img className="slider_tom_home" src={board_img3} alt="slider" />
          <button className="start_btn container">Начать</button>
        </div>
      </Slider>
    </>
  );
};

export default ToCome;
