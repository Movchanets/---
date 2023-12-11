import { APP_ENV } from "../../../env";
import React from "react";
import photo from "../../../assets/placeholder_image.jpg";
import styles from "./index.module.scss";
import { ReactComponent as Location_Icon } from "../../../assets/icons/location_on.svg";
import { ReactComponent as Close_Icon } from "../../../assets/icons/close.svg";
import { IProductItem } from "../../../store/products/types";
import { Link } from "react-router-dom";


interface SavedProductCardProps {
  product: IProductItem;
  linkTo: string;
  clickCloseCallback(productId: number): void;
}

export const SavedProductCard: React.FC<SavedProductCardProps> = ({
  product,
  linkTo,
  clickCloseCallback,
}) => {
  const onClickHandler = () => {
    clickCloseCallback(product.id);
  };

  return (
    <>
      <div className={`${styles.card} card`}>
        <div className={styles.card_image_holder}>
          <button
            type="button"
            className={styles.close_btn}
            onClick={() => onClickHandler()}
          >
            <Close_Icon className={styles.icon} />
          </button>
          <Link to={linkTo}>
            <img
              className={`${styles.image} card-img-top`}
              src={
                product.images[0]
                  ? APP_ENV.REMOTE_HOST_IMAGE_URL + product?.images[0].name
                  : photo
              }
              alt="Card"
            />
          </Link>
        </div>
        <div className={styles.card_body}>
          {/* TITLE  */}
          <Link to={linkTo} className={`${styles.title} text-truncate`}>
            {product?.name}
          </Link>

          {/* SUBTITLE  */}
          <div className={styles.subtitle_wrapper}>
            <span>
              <Location_Icon className={styles.icon} />
            </span>
           
          </div>

          <div className={styles.subtitle_wrapper}>
            <div className={styles.rate}>{product.price}  UAH</div>
            <div className={styles.rate}>{product.quantity > 0 ?  product.quantity + " left" : "Out of Stock" }</div>
       
             
            </div>
          </div>

          {/* LINK  */}
          <Link to={linkTo} className={styles.view_propery}>
            View product
          </Link>
        </div>
                </>
  );
};
