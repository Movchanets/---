import React, { PropsWithChildren } from "react";
import Slider from "react-slick";
import { carouselSettings } from "./settings";

interface myCustomProps extends PropsWithChildren {
  offset?: string;
}
export const DefaultCarousel: React.FC<myCustomProps> = ({ offset, ...props }) => {
  return (
    <>
      <Slider {...carouselSettings(offset)}>{props.children}</Slider>
    </>
  );
};
