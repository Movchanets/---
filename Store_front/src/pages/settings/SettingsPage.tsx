import styles from "./settings.module.scss";
import { ReactComponent as Person_Icon } from "../../assets/icons/person.svg";
import { ReactComponent as CreditCard_Icon } from "../../assets/icons/credit_card.svg";
import { ReactComponent as Work_Icon } from "../../assets/icons/work.svg";
import { ReactComponent as Preferences_Icon } from "../../assets/icons/accessibility_new.svg";
import { Link } from "react-router-dom";

const SettingsPage = () => {
  return (
    <div className="container-lg mx-auto mt-5">
      <div className={styles.title}>
        <h1>Account settings</h1>
        <p>Manage your user experience</p>
      </div>

      {/* list  */}
      <div className={styles.settings}>
        <Link to="personal" className={styles.setting}>
          <span>
            <div className={styles.icon_wrapper}>
              <Person_Icon className={`${styles.icon}`} />
            </div>
          </span>
          <div className={styles.setting_body}>
            <h2>Personal details</h2>
            <p>Update your information</p>
            <span className={styles.link}>Manage personal details</span>
          </div>
        </Link>

        <Link to="orders" className={styles.setting}>
          <span>
            <div className={styles.icon_wrapper}>
              <Work_Icon className={styles.icon} />
            </div>
          </span>
          <div className={styles.setting_body}>
            <h2>Orders</h2>
            <p>Check all of your orders</p>
            <span className={styles.link}>Manage orders</span>
          </div>
        </Link>

        
      </div>
    </div>
  );
};

export default SettingsPage;
