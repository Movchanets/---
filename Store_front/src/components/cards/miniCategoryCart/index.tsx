import { APP_ENV } from "../../../env";
import defaultImage from "../../../assets/placeholder_image.jpg";
import styles from "./index.module.scss";

interface IMiniTestCart {
  image: string;
  label: string;
}
const MiniCategoryCart: React.FC<IMiniTestCart> = ({ label, image }) => {

  return (
    <>
      <div  className={`${styles.card_box}`}>
        <div className={`${styles.card}`}>
          <div className={`${styles.image_box}`}>
            <img
              src={
                image
                  ? APP_ENV.REMOTE_HOST_IMAGE_URL + image
                  : defaultImage
              }
              alt={"tye"}
            />
          </div>
          <span >{label}</span>
        </div>
      </div>
    </>
  )
}

export default MiniCategoryCart;