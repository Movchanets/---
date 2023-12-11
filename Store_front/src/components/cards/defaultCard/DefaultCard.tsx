import { APP_ENV } from "../../../env";
import React from "react";
import photo from "../../../assets/placeholder_image.jpg";
import styles from "./index.module.css";


interface defaultCardProps {
  title: string;
  text: string;
  image?: string;
  
}

export const DefaultCard: React.FC<defaultCardProps> = ({

  ...props
}) => {
  return (
    <>
      <div className={`${styles.card} card`}>
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
