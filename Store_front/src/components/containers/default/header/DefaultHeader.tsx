import { Link } from "react-router-dom";
import { ReactComponent as Language_Icon } from "../../../../assets/icons/language.svg";
import { ReactComponent as Help_Icon } from "../../../../assets/icons/help.svg";
import { ReactComponent as Person_Icon } from "../../../../assets/icons/person.svg";
import { ReactComponent as Work_Icon } from "../../../../assets/icons/work.svg";
import { ReactComponent as S_Icon } from "../../../../assets/icons/s.svg";
import { ReactComponent as Logout_Icon } from "../../../../assets/icons/logout.svg";
import { ReactComponent as CreditCard_Icon } from "../../../../assets/icons/credit_card.svg";
import { ReactComponent as Favorite_Icon } from "../../../../assets/icons/favorite.svg";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useEffect, useState } from "react";
import { useActions } from "../../../../hooks/useActions";
import { APP_ENV } from "../../../../env";
import logo from "../../../../assets/logo_dark.png";
import default_image from "../../../../assets/default-profile-icon-32.jpg";
import styles from "./header.module.css";
import { CartCounter } from "../../../common/OrderCart/CartCounter";

export const DefaultHeader = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const { isAuth, user } = useTypedSelector((store) => store.login);
  const { Logout } = useActions();
  const [cartOpen, setCartOpen] = useState(false);
  useEffect(() => {
    if (user?.roles.includes("administrator")) setIsAdmin(true);
    else setIsAdmin(false);
  }, [isAuth]);

  const handleLogout = async () => {
    await Logout();
  };

  return (
    <>
      <nav className={`navbar navbar-expand-lg py-3 ${styles.navbar} `}>
        <div className="container-fluid">
          <Link to="/">
          <img src={logo} alt="logo" height={"50vh"}  loading="lazy" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navDropdown"
            aria-controls="navDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navDropdown">
            <ul className="navbar-nav ms-auto">
             
              <li className="nav-item d-flex align-items-center me-4">
                <div className={styles.icon_box}>
                  <Help_Icon className={styles.icon} />
                </div>
                <CartCounter />
                  </li>
           
              {!isAuth ? (
                <>
                  <div className="d-flex">
                    <li className="nav-item me-3">
                      <Link
                        className={`${styles.auth_button} ${styles.register_btn}`}
                        to="/sign-in"
                      >
                        Register
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className={`${styles.auth_button} ${styles.login_btn}`}
                        to="/sign-in"
                      >
                        Sign in
                      </Link>
                    </li>
                  </div>
                </>
              ) : (
                <li className="nav-item d-flex align-items-center">
                  <div className="dropdown">
                    <button
                      className={styles.dropdown_btn}
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <div className={styles.dropdown_btn_container}>
                        <picture>
                          <img
                            src={
                              user?.image
                                ? APP_ENV.REMOTE_HOST_IMAGE_URL + user?.image
                                : default_image
                            }
                            alt="user"
                          />
                        </picture>
                        <div className={styles.user_info}>
                          <div className={`${styles.username} m-auto`}>
                            {user?.firstName || "Guest"}
                          </div>
                         
                        </div>
                      </div>
                    </button>
                    <ul
                      className={`${styles.dropdown_menu} dropdown-menu dropdown-menu-end`}
                    >
                      <li className="d-flex">
                        <Link to="/settings">
                          <Person_Icon className={styles.icon} />
                          <p>Manage accounts</p>
                        </Link>
                      </li>
                      <li className="d-flex">
                        <Link to="/settings/orders">
                          <Work_Icon className={styles.icon} />
                          <p>Orders</p>
                        </Link>
                      </li>
                    
                      <li className="d-flex">
                        <Link to="/saved">
                          <Favorite_Icon className={styles.icon} />
                          <p>Saved</p>
                        </Link>
                      </li>
                      {isAdmin && (
                        <li className="d-flex">
                          <Link to="/admin">
                            <Work_Icon className={styles.icon} />
                            <p>Admin panel</p>
                          </Link>
                        </li>
                      )}
                      <li onClick={() => handleLogout()} className="d-flex">
                        <Link to="/">
                          <Logout_Icon className={styles.icon} />
                          <p>Logout</p>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
        
      </nav>
    </>
  );
};
