import React from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useFormik } from "formik";
import { DefaultAuthValidatorSchema } from "../../../store/auth/Validator";
import { IDefaultAuthProps, IDefaultAuthResult } from "../types";
import { ReactComponent as GoogleLogo_Icon } from "../../../assets/icons/google_logo.svg";
import { ReactComponent as PhoneAndroid_Icon } from "../../../assets/icons/phone_android.svg";
import http from "../../../http_common";
import ServiceResponse from "../../../ServiceResponse";
import styles from "./index.module.css";
import { useGoogleLogin } from "@react-oauth/google";
import { useActions } from "../../../hooks/useActions";
import classNames from "classnames";

const DefaultAuthPage: React.FC<IDefaultAuthProps> = ({
  onNextStep: onStepNext,
}) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { GoogleLogin } = useActions();

  const onGoogleLoginHandle = useGoogleLogin({
    onSuccess: async (response) => {
      await GoogleLogin(response.access_token, true);
    },
    onError: (error) => {
      console.error("Щось пішло не так, ", error);
    },
  });

  const initialValues: IDefaultAuthResult = {
    email: "",
    userExists: false,
  };

  const loginSubmitHandle = async (model: IDefaultAuthResult) => {
    if (!executeRecaptcha) return;
    try {
      const userExists = await UserExists(model);
      //Next page
      onStepNext({ email: model.email, userExists: userExists });
    } catch (error: any) {
      console.log("Щось пішло не так", error);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: loginSubmitHandle,
    validationSchema: DefaultAuthValidatorSchema,
  });

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    formik;

  const UserExists = async (model: IDefaultAuthResult): Promise<boolean> => {
    try {
      const resp = await http.get<ServiceResponse<boolean>>(
        "api/Account/userExists",
        {
          params: { email: model.email },
        }
      );
      return Promise.resolve(resp.data.payload);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* title  */}
        <h3 className={styles.title}>Sign in or create an account</h3>

        {/* email field  */}
        <div className={styles.field}>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={classNames({
              [styles.error]: errors.email && touched.email,
            })}
          />
          <span className={styles.error_section}>
            {touched.email && errors.email}
          </span>
        </div>

        {/* continue button  */}
        <button
          className={styles.continue}
          type="submit"
          disabled={!(formik.isValid && formik.dirty)}
        >
          Continue
        </button>

        <div className={styles.social_divider}>
          <hr />
          <span>Google auth</span>
          <hr />
        </div>

        <div className={styles.social_buttons}>
          <div
            className={styles.social_button}
            onClick={() => onGoogleLoginHandle()}
          >
            <GoogleLogo_Icon />
          </div>

          
        </div>

        
      </form>
    </>
  );
};

export default DefaultAuthPage;
