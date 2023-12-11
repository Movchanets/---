import { MouseEvent } from "react";
import { APP_ENV } from "../../../../env";
import { IProductItem } from "../../../../store/products/types";
import defaultImage from "../../../../assets/placeholder_image.jpg";
import { ReactComponent as Heart_Icon } from "../../../../assets/icons/heart.svg";
import { ReactComponent as Heart_Fill_Icon } from "../../../../assets/icons/heart_fill.svg";
import { ReactComponent as StarFilled_Icon } from "../../../../assets/icons/star_filled.svg";

import styles from "../index.module.scss";
import { Button } from "react-bootstrap";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useActions } from "../../../../hooks/useActions";
import { useNavigate } from "react-router-dom";

interface IProductCardProps {
  product: IProductItem;
  clickCallback(id: number, categoryName: string): void;
  clickSaveCallback(id: number): void;
}



const ProductCard: React.FC<IProductCardProps> = ({
  product,
  clickCallback,
  clickSaveCallback,
}) => {
  const {cart} = useTypedSelector((store) => store.order.cart);
const inCart = cart.details.find((x) => x.ProductId === product.id);
const navigate = useNavigate();
  const clickHandler = () => {
    clickCallback(product.id, product.category);
  };
  const {AddToCart} = useActions();
  const onClickSaveHandle = async (e: MouseEvent<HTMLDivElement>) => {
    clickSaveCallback(product.id);
  };

  return (
    <>
      <div className={`container card ${styles.card}`}>
        <div className="row g-3 align-items-center">
          <div className="col-md-3">
            {/* Image */}
            <div className={`${styles.imageWrapper}`}>
              <div className={`${styles.image}`}>
                <img
                  src={
                    product.images[0]
                      ? APP_ENV.REMOTE_HOST_IMAGE_URL + product.images[0].name
                      : defaultImage
                  }
                  alt={"tye"}
                  className={`${styles.prodCartImage}`}
                />
                <div onClick={onClickSaveHandle}>
                  {product.isSaved ? (
                    <Heart_Fill_Icon className={`${styles.favorite_icon}`} />
                  ) : (
                    <Heart_Icon className={`${styles.favorite_icon}`} />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            {/* Description */}
            <div>
              <div className={`${styles.title}`} onClick={clickHandler}>
                {product.name}
              </div>
            
              {/* short description */}

              <div className={`${styles.short_description}`}>
                {product.shortDescription}
              </div>
              <div className={`${styles.selectable}`}>
                {product.price } UAH
              </div>
              <div className={`${styles.selectable}`}>
                {product.quantity > 0 ? "In stock : " + product.quantity : "Out of stock"}
              </div> 
                  
            </div>
          </div>
          <div className={`col-md-2 ${styles.rewiews_details_box}`}>
            {/* Rating Show price btn */}
          <Button variant="outline-primary" onClick={()=>{

if(!inCart) {AddToCart(product)}
else {navigate('/cart')}
           }}>
  {inCart ? "Go to cart" : "Add to cart"}
          </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductCard;
