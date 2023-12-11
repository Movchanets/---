import React, { ButtonHTMLAttributes, useState } from "react";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { ImageSlider } from "./ImageSlider/ImageSlider";
import { ImageGrid } from "./ImageGrid/ImageGrid";
import styles from "./index.module.scss";
import classNames from "classnames";

const ImageViews = {
  grid: ImageGrid,
  slider: ImageSlider,
};

interface ImageListStep {
  type: "grid" | "slider";
}

export const ImageListModal: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  const { product } = useTypedSelector((store) => store.product.item);

  const [imageView, setImageView] = useState<ImageListStep>({ type: "grid" });
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const CurrentView = ImageViews[imageView.type];

  const onClickImageHandler = async (imageIndex: number) => {
    setSelectedImageIndex(imageIndex);
    setImageView({ type: "slider" });
  };

  const onClickCloseHandler = async () => {
    const timer = setTimeout(() => {
      setImageView({ type: "grid" });
    }, 150);
    return () => clearTimeout(timer);
  };

  return (
    <>
      <button
        {...props}
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#imageListModal"
        className={props.className}
      >
        {children}
      </button>

      <div
        className="modal fade"
        id="imageListModal"
        aria-labelledby="imageListModalLabel"
        aria-hidden="true"
        tabIndex={-1}
      >
        <div
          className={`${styles.modal_dialog} modal-dialog modal-dialog-centered modal-fullscreen`}
        >
          <div className={`${styles.modal_content} modal-content`}>
            <div className="modal-header">
              <button
                type="button"
                className={classNames("btn", {
                  "opacity-0": imageView.type === "grid",
                })}
                onClick={() => setImageView({ type: "grid" })}
              >
                Back
              </button>
              <h1 className="modal-title fs-5 w-100 text-center" id="exampleModalLabel">
                {product.name}
              </h1>
              <button
                type="button"
                className="btn d-flex align-items-center gap-1"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => onClickCloseHandler()}
              >
                Close
                <span className="btn-close m-0" />
              </button>
            </div>
            <div className={`${styles.modal_body} modal-body`}>
              <CurrentView
                onClickImage={onClickImageHandler}
                selectedImageId={selectedImageIndex}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
