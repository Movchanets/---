import { useNavigate, useParams } from "react-router-dom";
import styles from "./index.module.css";

const VerificationLinkPage = () => {
  const { email } = useParams();

  const navigator = useNavigate();

  return (
    <>
      <div className={styles.form}>
        {/* title  */}
        <h3 className={styles.title}>Check your inbox</h3>
        <p className={styles.subtitle}>
          We just emailed a verification link to <strong>{email}</strong>. Once it
          arrives, it will be valid for 10 minutes
        </p>

        {/* continue button  */}
        <button
          className={styles.continue}
          type="button"
          onClick={() => navigator("/sign-in")}
        >
          Back to sign in
        </button>
      </div>
    </>
  );
};

export default VerificationLinkPage;
