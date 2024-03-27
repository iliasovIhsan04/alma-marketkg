import React from "react";
import Slider from "react-slick";
import board_img1 from "../img/board-img1.svg";
import board_img2 from "../img/board-img2.svg";
import board_img3 from "../img/board-img3.svg";
import { useNavigate } from "react-router";

const board = [
  {
    id: 1,
    img: board_img1,
    text: "ihsan",
  },
  {
    id: 2,
    img: board_img2,
    text: "ihsanbek",
  },
  {
    id: 3,
    img: board_img3,
    text: "ihsanbey",
  },
];

const ToComeIn = () => {
  const settings = {
    focusOnSelect: true,
    infinite: true,
    dots: false,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
  };
  const navigate = useNavigate();
  return (
    <>
      <div className="baord_block_all">
        <Slider className="slider_board" {...settings}>
          <div>
            <div className="on_board_block">
              <div className="on_board_active"></div>
            </div>
            <img className="slider_tom_home" src={board_img1} alt="slider" />
          </div>
          <div>
            <div className="on_board_block">
              <div className="on_board_active"></div>
            </div>
            <img src={board_img2} alt="slider" />
          </div>
          <div>
            <div className="on_board_block">
              <div className="on_board_active"></div>
            </div>
            <img src={board_img3} alt="slider" />
          </div>
        </Slider>
      </div>
    </>
  );
};

export default ToComeIn;
