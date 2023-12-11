import { Settings } from "react-slick";
import { NextArrow } from "./arrows/NextArrow";
import { PrevArrow } from "./arrows/PrevArrow";

export const carouselSettings = (offset?: string) => {
  const pbj: Settings = {
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 300,
    nextArrow: <NextArrow slidesToShow={4} offsetYPositonArrows={offset} />,
    prevArrow: <PrevArrow offsetYPositonArrows={offset} />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          nextArrow: <NextArrow slidesToShow={3} offsetYPositonArrows={offset} />,
          prevArrow: <PrevArrow offsetYPositonArrows={offset} />,
        },
      },
      {
        breakpoint: 1014,
        settings: {
          slidesToShow: 2,
          variableWidth: true,
          arrows: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          variableWidth: true,
          arrows: false,
        },
      },
    ],
  };

  return pbj;
};
