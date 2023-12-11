import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import { IProductImageItem } from "../../../store/products/types";

import { PhotoGrid } from "./photoGrid";

import { useTypedSelector } from "../../../hooks/useTypedSelector";
import styles from "./index.module.scss";
import HTMLReactParser from "html-react-parser";
import classNames from "classnames";

import { ReactComponent as Sell } from "../../../assets/icons/sell.svg";
import { ReactComponent as Heart_Icon } from "../../../assets/icons/favorite.svg";
import Ios_share from "../../../assets/icons/ios_share.png";
import { ReactComponent as Heart_Fill_Icon } from "../../../assets/icons/heart_fill.svg";


import { toast } from "react-toastify";
import { Tooltip } from "@mui/material";

import { Link as LinkScroll } from "react-scroll";

const ProductDetailPage: React.FC = () => {
  const { ID } = useParams();
  const { product } = useTypedSelector((store) => store.product.item);
  const {cart} = useTypedSelector((store) => store.order.cart);
const inCart = cart.details.find((x) => x.ProductId === product.id);
  const navigate = useNavigate();
  const {AddToCart} = useActions();
  const { GetProduct, SetFavoriteProduct} =
    useActions();
  const [productImages, setProductImages] = useState<Array<IProductImageItem>>([]);

  const LoadProduct = async (id: number) => {
    try {
      const response: any = await GetProduct(id);
   
      const { payload } = response;

      setProductImages(payload.images);
    } catch (error) {
      console.error("Щось пішло не так, ", error);
      navigate("/products/details/404");
    }
  };

  useEffect(() => {
    LoadProduct(Number(ID));
  }, []);

  const onClickSaveHandle = async () => {
    try {
      await SetFavoriteProduct(product.id);
    } catch (error) {
      console.error("Щось пішло не так, ", error);
    }
  };




  return (
    <>
     
      <div className="container-lg mt-3" style={{ maxWidth: "884px" }}>

        <div className="row">
          <div className={`${styles.navigate}`}>
            <Link to={`/`} className="text-decoration-none">
              <span>{`Home`}</span>
            </Link>
      
            <p>{`>`}</p>
            <span>{product.name}</span>
          </div>
        </div>

        

        {/* Search right panel and map */}
        <div className="row">
         

          <div className="col-lg-9" style={{ padding: 0, paddingLeft: "15px" }}>
            <div className="row">
              <div className={`${styles.buttons_wrapper}`}>
                <div>
                  <span className={`${styles.Price}`}>{product.quantity > 0 ? product.quantity + " left" : "Out of stock"} </span>
                  <span className={`${styles.Price}`}>{product.price} UAH</span>
                </div>
                {/* buttons favorite , share , Reserve */}
                <div className={`${styles.buttons_fsr}`}>
                  <div onClick={onClickSaveHandle}>
                    {/*  favorite*/}
                    {product.isSaved ? (
                      <Heart_Fill_Icon className={`${styles.favorite_icon}`} />
                    ) : (
                      <Heart_Icon className={`${styles.favorite_icon}`} />
                    )}
                  </div>
                  <div
                    className={`${styles.share_btn}`}
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      toast.success("Copied to clipboard");
                    }}
                  >
                    <Tooltip disableFocusListener title="Copy to clipboard">
                      <img src={Ios_share} alt="" />
                    </Tooltip>
                    {/*  share*/}
                    {/* <Ios_share className={`${styles.favorite_icon}`}/> */}
                  </div>

                  <LinkScroll
                    to="availability"
                    offset={-90}
                    className={styles.reserve_btn}
                  >
                    <span className={classNames(`${styles.btn} ${styles.btn_text}`) } onClick={
                      ()=>{

                        if(!inCart) {AddToCart(product)}
                        else {navigate('/cart')}
                                   }}>
                 {inCart ? "Go to cart" : "Add to cart"}
                    </span>
                 
                  </LinkScroll>
                </div>
              </div>
            </div>

            <div>
              {/* Product name */}
              <h2 className={`${styles.title_name}`}>{product.name}</h2>
             
              
            </div>
            {/* Photos */}
            <PhotoGrid potos={productImages} />
          </div>
        </div>
      

        <div className="row gap-2 justify-content-center" style={{ marginTop: "40px" }}>
          {/* Product full description */}
          <div className={classNames(` ${styles.description_text}`)}>
            {HTMLReactParser(product?.description ??   "<h2>Product description not found</h2>")}

          
          </div>

          {/* Property Highlights */}
          <div style={{ maxWidth: "245px", padding: "0px" }}>
           

           
          </div>
        </div>

       
      
      </div>
    </>
  );
};
export default ProductDetailPage;