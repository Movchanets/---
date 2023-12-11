import classNames from "classnames";
import { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Link, useNavigate } from "react-router-dom";
import { SavedProductCard } from "../../../components/cards/savedProductCard/SavedProductCard";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import http from "../../../http_common";
import ServiceResponse from "../../../ServiceResponse";
import { IProductItem } from "../../../store/products/types";
import styles from "./index.module.scss";

const SavedProducts = () => {
  const navigate = useNavigate();
  const { isAuth } = useTypedSelector((store) => store.login);

  const [isOpenMore, setIsOpenMore] = useState<boolean>(false);
  const [products, setProducts] = useState<Array<IProductItem>>([]);

  const fetchSavedProducts = async () => {
    try {
      const response = await http.get<ServiceResponse<Array<IProductItem>>>(
        "api/Product/getFavorites"
      );

      const { data } = response;
      if (data.payload) setProducts(data.payload);
    } catch (error) {
      console.error("Щось пішло не так, ", error);
    }
  };

  const cancelSavedProducts = async (productId: number) => {
    try {
      const response = await http.put<ServiceResponse<null>>("api/Product/SetFavorite", null,
        { params: { productId } }
      );

      if (response.data.isSuccess)
        setProducts((prev) => {
          return prev.filter((el) => el.id !== productId);
        });
    } catch (error) {
      console.error("Щось пішло не так, ", error);
    }
  };

  useEffect(() => {
    if (!isAuth) return navigate("/sign-in");

    console.log("SAVED PRODUCTS FETCH");
    fetchSavedProducts();
  }, [isAuth]);

  return (
    <>
      <div className="container-lg mx-auto mt-5">
        <div className={styles.title}>
          <h2>My wish list</h2>
          <p className={classNames({ "d-none": products.length === 0 })}>
            {products.length} properties saved
          </p>
        </div>

        {products.length === 0 && (
          <div className={styles.no_products}>
            <h3>Here are 3 simple steps to help you begin:</h3>
            <ul>
              <li>1. Search for a product</li>
              <li>2. Tap the heart icon when you find a property you like</li>
              <li>3. You'll find all you've saved here</li>
            </ul>
            <Link to="/">Start searching</Link>
          </div>
        )}

        <ResponsiveMasonry columnsCountBreakPoints={{ 576: 1, 768: 2, 1200: 3 }}>
          <Masonry gutter="1rem" className={styles.products}>
            {products.slice(0, !isOpenMore ? 3 : undefined).map((product) => (
              <span key={product.id} className="d-grid">
                <SavedProductCard
                  key={product?.id}
                  product={product}
                  linkTo={`/${product.category}/${product.id}/details/`}
                  clickCloseCallback={cancelSavedProducts}
                />
              </span>
            ))}
          </Masonry>
        </ResponsiveMasonry>

        <div
          className={classNames([styles.show_more], { "d-none": products.length < 4 })}
        >
          <button
            className={styles.show_more_btn}
            type="button"
            onClick={() => setIsOpenMore((prev) => !prev)}
          >
            {isOpenMore ? "Hide" : "Show more"}
          </button>
        </div>
      </div>
    </>
  );
};

export default SavedProducts;
