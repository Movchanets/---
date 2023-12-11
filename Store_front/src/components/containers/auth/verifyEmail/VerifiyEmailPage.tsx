import { useLocation, useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { useEffect, useState } from "react";
import qs from "qs";
import { IVerifyEmailResult } from "../../../../pages/auth/types";
import { useActions } from "../../../../hooks/useActions";


const VerifyEmailPage = () => {
  const { VerifyEmail } = useActions();

  const navigator = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const reset_info = qs.parse(location.search, { ignoreQueryPrefix: true });
    const model: IVerifyEmailResult = {
      email: reset_info.email as string,
      token: reset_info.token as string,
    };

    setEmail(model.email);
    VerifyEmail(model);
  });

  return (
    <>
      <div className={styles.form}>
        {/* title  */}
        <h3 className={styles.title}>Email Verified</h3>
        <p className={styles.subtitle}>
          You have just verified your email as <strong>{email}</strong>.
        </p>

        {/* continue button  */}
        <button
          className={styles.continue}
          type="button"
          onClick={() => navigator("/")}
        >
          Back to sign in
        </button>
      </div>
    </>
  );
};

export default VerifyEmailPage;
