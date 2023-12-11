import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { APP_ENV } from "../../../../../env";
import { useTypedSelector } from "../../../../../hooks/useTypedSelector";
import styles from "../index.module.scss";

interface ImageGridProps {
  onClickImage: (imageId: number) => void;
}

export const ImageGrid: React.FC<ImageGridProps> = ({ onClickImage }) => {
  const { product } = useTypedSelector((store) => store.product.item);

  return (
    <>
      {product.images.length > 0 ? (
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 576: 1, 768: 2, 992: 4, 1400: 5 }}
        >
          <Masonry gutter="0.5rem" className={styles.images_grid}>
            {product.images.map((item) => (
              <div
                key={item.id}
                className={styles.image_wrapper}
                onClick={() => onClickImage(item.id)}
              >
                <img
                  src={APP_ENV.REMOTE_HOST_IMAGE_URL + item.name}
                  alt="product image"
                />
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      ) : (
        <p className={`${styles.no_image_text} text-uppercase`}>
          No image available
        </p>
      )}
    </>
  );
};
