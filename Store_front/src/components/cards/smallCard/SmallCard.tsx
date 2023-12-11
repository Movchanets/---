import classNames from "classnames";
import React from "react";
import photo from "../../../assets/small_icon_test_img.jpg";
import { APP_ENV } from "../../../env";
import styles from "./index.module.css";

interface smallCardProps {
  title: string;
  text: string;
  image?: string;
  isCarouselChild?: boolean;
}

export const SmallCard: React.FC<smallCardProps> = ({
  isCarouselChild = true,
  ...props
}) => {
  return (
    <>
      <div
        className={classNames(styles.card, "card", {
          ["m-auto"]: isCarouselChild,
        })}
      >
        <div className={styles.image_holder}>
          <img
            className={`${styles.image} card-img-top`}
            src={
              props.image ? APP_ENV.REMOTE_HOST_IMAGE_URL + props.image : photo
            }
            alt="Card"
          />
        </div>
        <div className={`${styles.container_text} card-body`}>
          <h5 className="card-title text-truncate">{props.title}</h5>
          <p className="card-text text-truncate">{props.text}</p>
        </div>
      </div>
    </>
  );
};
