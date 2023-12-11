import { Link } from "react-router-dom";
import logo from "../../../../assets/logo_dark.png";
import { ReactComponent as Language_Icon } from "../../../../assets/icons/language.svg";
import { ReactComponent as Help_Icon } from "../../../../assets/icons/help.svg";
import styles from "./header.module.css";

export const AuthHeader = () => {
  return (
    <>
      <nav className={`${styles.navbar} navbar navbar-expand-lg bg-light py-3`}>
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

          
        </div>
      </nav>
    </>
  );
};
