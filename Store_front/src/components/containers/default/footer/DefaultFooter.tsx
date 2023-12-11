import { Link } from "react-router-dom";
import styles from "./footer.module.css";

export const DefaultFooter = () => {
  return (
    <>
      <footer>
        <div className={`${styles.footer} py-3`}>
          <div className="container-lg">
            <ul className={`${styles.nav_component} row nav gap-3 gap-md-0`}>
             
              <li className="col-md nav-item py-0 py-md-4">
                <Link to="/">Manage your orders</Link>
              </li>
              <li className="col-md nav-item py-0 py-md-4">
                <Link to="/">Customer Service help</Link>
              </li>
             
            </ul>
          </div>
        </div>
        <p className={`${styles.copyright} text-center my-4`}>
          Copyright © 2023 Мовчанець курсова ООП. All rights reserved.
        </p>
      </footer>
    </>
  );
};
