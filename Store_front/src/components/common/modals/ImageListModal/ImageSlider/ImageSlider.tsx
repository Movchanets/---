import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { APP_ENV } from "../../../../../env";
import { useTypedSelector } from "../../../../../hooks/useTypedSelector";
import { ReactComponent as Arrow_Icon } from "../../../../../assets/icons/fix_arrow.svg";
import main_styles from "../index.module.scss";
import styles from "./index.module.scss";

interface ImageSliderProps {
  selectedImageId: number;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({ selectedImageId }) => {
  const { product } = useTypedSelector((store) => store.product.item);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(
    product.images.findIndex((img) => img.id === selectedImageId)
  );

  useEffect(() => {
    scrollSmallImage();
  }, [currentImageIndex]);

  const gotoPrevious = () => {
    currentImageIndex > 0 && setCurrentImageIndex(currentImageIndex - 1);
  };

  const gotoNext = () => {
    currentImageIndex + 1 < product.images.length &&
      setCurrentImageIndex(currentImageIndex + 1);
  };

  const scrollSmallImage = async () => {
    var imgElement = document.getElementById(`img-${currentImageIndex}`);
    await imgElement?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  return (
    <>
      {product.images.length > 0 ? (
        <>
          <div className={styles.images_slider}>
            <button
              type="button"
              className={styles.slider_arrow}
              onClick={() => gotoPrevious()}
            >
              <Arrow_Icon style={{ transform: "scale(-1, 1)" }} />
            </button>
            <div className={styles.image_wrapper}>
              <img
                src={
                  APP_ENV.REMOTE_HOST_IMAGE_URL + product.images[currentImageIndex].name
                }
                alt="slider image"
              />
            </div>
            <button
              type="button"
              className={styles.slider_arrow}
              onClick={() => gotoNext()}
            >
              <Arrow_Icon />
            </button>
          </div>

          {/* Small images */}
          <div className={styles.small_images}>
            <span className={styles.image_caption}>
              {currentImageIndex + 1} / {product.images.length}
            </span>

            <div className={styles.images_viewport}>
              {product.images.map((item, index) => (
                <div
                  key={item.id}
                  className={classNames(styles.image_wrapper, {
                    [styles.current_image]: currentImageIndex === index,
                  })}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img
                    id={`img-${index}`}
                    src={APP_ENV.REMOTE_HOST_IMAGE_URL + item.name}
                    alt="product image"
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p className={`${main_styles.no_image_text} text-uppercase`}>
          No image available
        </p>
      )}
    </>
  );
};
