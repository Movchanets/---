import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useFormik } from "formik";
import { LoginAuthValidatorSchema } from "../../../store/auth/Validator";
import { ILoginAuthProps, ILoginAuthResult } from "../types";
import { ReactComponent as Visibility_Icon } from "../../../assets/icons/visibility.svg";
import { ReactComponent as VisibilityOff_Icon } from "../../../assets/icons/visibility_off.svg";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import classNames from "classnames";
import styles from "./index.module.css";

const LoginAuthPage: React.FC<ILoginAuthProps> = ({ onNextStep, email }) => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const navigator = useNavigate();

  const [passwordShown, setPasswordShown] = useState<boolean>(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const initialValues: ILoginAuthResult = {
    password: "",
  };

  const loginSubmitHandle = async (model: ILoginAuthResult) => {
    if (!executeRecaptcha) return;
    onNextStep(model);
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: loginSubmitHandle,
    validationSchema: LoginAuthValidatorSchema,
  });

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    formik;

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* title  */}
        <h3 className={styles.title}>Enter your password</h3>
        <p className={styles.subtitle}>
          Enter your com password for <strong>{email}</strong>
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

        {/* continue button  */}
        <button
          className={styles.continue}
          type="submit"
          disabled={!(formik.isValid && formik.dirty)}
        >
          Sign in
        </button>
        <div className={styles.forgot_password}>
          <button type="button" onClick={() => navigator("forgetPassword")}>
            Forgot your password?
          </button>
        </div>

      </form>
    </>
  );
};

export default LoginAuthPage;
