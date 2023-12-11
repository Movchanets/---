import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useFormik } from "formik";
import { ResetPasswordValidatorSchema } from "../../../store/auth/Validator";
import { ReactComponent as Visibility_Icon } from "../../../assets/icons/visibility.svg";
import { ReactComponent as VisibilityOff_Icon } from "../../../assets/icons/visibility_off.svg";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IResetPasswordCredentials } from "../../../store/auth/types";
import { useActions } from "../../../hooks/useActions";
import classNames from "classnames";
import styles from "./index.module.css";
import qs from "qs";

const ResetPasswordPage = () => {
  const { ResetPassword } = useActions();

  const { executeRecaptcha } = useGoogleReCaptcha();

  const location = useLocation();
  const navigator = useNavigate();

  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const [confirmPasswordShown, setConfirmPasswordShown] =
    useState<boolean>(false);

  useEffect(() => {
    const reset_info = qs.parse(location.search, { ignoreQueryPrefix: true });
    setFieldValue("email", reset_info.email);
    setFieldValue("token", reset_info.token);
  }, [location.search]);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleConfirmPassword = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  const initialValues: IResetPasswordCredentials = {
    email: "",
    token: "",
    password: "",
    confirmPassword: "",
  };

  const registerSubmitHandle = async (model: IResetPasswordCredentials) => {
    if (!executeRecaptcha) return;
    try {
      await ResetPassword(model);
      navigator("/sign-in");
    } catch (error) {
      console.error("Щось пішло не так, ", error);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: registerSubmitHandle,
    validationSchema: ResetPasswordValidatorSchema,
  });

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
  } = formik;

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* title  */}
        <h3 className={styles.title}>Create password</h3>
        <p className={styles.subtitle}>
          Use a minimum of 10 characters, including uppercase letters, lowercase
          letters, and numbers.
        </p>

        {/* password field  */}
        <div className={styles.field}>
          <label htmlFor="password">Password</label>
          {/* password */}
          <div className={styles.password_box}>
            <input
              id="password"
              type={passwordShown ? "text" : "password"}
              placeholder="Enter a password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={classNames({
                [styles.error]: errors.password && touched.password,
              })}
            />
            <div className={styles.border_password} />
            <div id={styles.icon_box}>
              <button type="button" onClick={() => togglePassword()}>
                {passwordShown ? (
                  <VisibilityOff_Icon id={styles.icon} />
                ) : (
                  <Visibility_Icon id={styles.icon} />
                )}
              </button>
            </div>
          </div>
          <span className={styles.error_section}>
            {touched.password && errors.password}
          </span>
        </div>

        {/* confirm password field  */}
        <div className={styles.field}>
          <label htmlFor="password">Confirm password</label>
          {/* password */}
          <div className={styles.password_box}>
            <input
              id="confirmPassword"
              type={confirmPasswordShown ? "text" : "password"}
              placeholder="Enter a password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={classNames({
                [styles.error]:
                  errors.confirmPassword && touched.confirmPassword,
              })}
            />
            <div className={styles.border_password} />
            <div id={styles.icon_box}>
              <button type="button" onClick={() => toggleConfirmPassword()}>
                {confirmPasswordShown ? (
                  <VisibilityOff_Icon id={styles.icon} />
                ) : (
                  <Visibility_Icon id={styles.icon} />
                )}
              </button>
            </div>
          </div>
          <span className={styles.error_section}>
            {touched.confirmPassword && errors.confirmPassword}
          </span>
        </div>

        {/* continue button  */}
        <button
          className={styles.continue}
          type="submit"
          disabled={!(formik.isValid && formik.dirty)}
        >
          Set new password
        </button>
      </form>
    </>
  );
};

export default ResetPasswordPage;
