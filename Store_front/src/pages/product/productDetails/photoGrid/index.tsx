import classNames from "classnames";
import { ImageListModal } from "../../../../components/common/modals/ImageListModal/ImageListModal";
import { APP_ENV } from "../../../../env";
import { IProductImageItem } from "../../../../store/products/types";
import photo from "../../../../assets/placeholder_image.jpg";
import styles from "./index.module.scss";

interface IPhotoParams {
  potos: Array<IProductImageItem>;
}
export const PhotoGrid: React.FC<IPhotoParams> = ({ ...props }) => {
  return (
    <>
      {/* Foto grid */}
      <div className={`${styles.grid}`}>
        <div className={`${classNames(`${styles.item} ${styles.medium}`)}`}>
          <ImageListModal className={`${styles.custom_btn}`}>
            <img
              className={`${styles.image}`}
              src={
                props.potos[1]
                  ? APP_ENV.REMOTE_HOST_IMAGE_URL + props.potos[1]?.name
                  : photo
              }
              alt="Foto.jpg"
            />
          </ImageListModal>
        </div>
        <div className={`${classNames(`${styles.item} ${styles.large}`)}`}>
          <ImageListModal className={`${styles.custom_btn}`}>
            <img
              className={`${styles.image}`}
              src={
                props.potos[0]
                  ? APP_ENV.REMOTE_HOST_IMAGE_URL + props.potos[0]?.name
                  : photo
              }
              alt=""
            />
          </ImageListModal>
        </div>
        <div className={`${classNames(`${styles.item} ${styles.medium}`)}`}>
          <ImageListModal className={`${styles.custom_btn}`}>
            <img
              className={`${styles.image}`}
              src={
                props.potos[2]
                  ? APP_ENV.REMOTE_HOST_IMAGE_URL + props.potos[2]?.name
                  : photo
              }
              alt=""
            />
          </ImageListModal>
        </div>
      </div>

      <div className={classNames(` ${styles.bottom_images_row}`)}>
        <div className={`${styles.item}`}>
          <ImageListModal className={`${styles.custom_btn}`}>
            <img
              className={`${styles.image}`}
              src={
                props.potos[3]
                  ? APP_ENV.REMOTE_HOST_IMAGE_URL + props.potos[3]?.name
                  : photo
              }
              alt=""
            />
          </ImageListModal>
        </div>
        <div className={`${styles.item}`}>
          <ImageListModal className={`${styles.custom_btn}`}>
            <img
              className={`${styles.image}`}
              src={
                props.potos[4]
                  ? APP_ENV.REMOTE_HOST_IMAGE_URL + props.potos[4]?.name
                  : photo
              }
              alt=""
            />
          </ImageListModal>
        </div>
        <div className={`${styles.item}`}>
          <ImageListModal className={`${styles.custom_btn}`}>
            <img
              className={`${styles.image}`}
              src={
                props.potos[5]
                  ? APP_ENV.REMOTE_HOST_IMAGE_URL + props.potos[5]?.name
                  : photo
              }
              alt=""
            />
          </ImageListModal>
        </div>
        <div className={`${styles.item}`}>
          <div className={`${styles.image}`}>
            <ImageListModal className={`${styles.custom_btn}`}>
              <img
                className={`${styles.image}`}
                src={
                  props.potos[6]
                    ? APP_ENV.REMOTE_HOST_IMAGE_URL + props.potos[6]?.name
                    : photo
                }
                alt=""
              />
              <div className={`${styles.front}`}>
                <p>{`+${props.potos?.length} photos`}</p>
              </div>
            </ImageListModal>
          </div>
        </div>
      </div>
    </>
  );
};