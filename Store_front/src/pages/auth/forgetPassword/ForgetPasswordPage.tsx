import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useFormik } from "formik";
import { IForgetPasswordCredentials } from "../types";
import { ForgetPasswordValidatorSchema } from "../../../store/auth/Validator";
import { useNavigate } from "react-router-dom";
import ServiceResponse from "../../../ServiceResponse";
import http from "../../../http_common";
import classNames from "classnames";
import styles from "./index.module.css";

const ForgetPasswordPage = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const navigator = useNavigate();

  const initialValues: IForgetPasswordCredentials = {
    email: "",
  };

  const loginSubmitHandle = async (model: IForgetPasswordCredentials) => {
    if (!executeRecaptcha) return;
    try {
      await ForgetPassword(model);

      navigator(`/sign-in/verificationLink/${model.email}`);
    } catch (error: any) {
      console.error("Щось пішло не так", error);
      setFieldError("email", error);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: loginSubmitHandle,
    validationSchema: ForgetPasswordValidatorSchema,
  });

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldError,
  } = formik;

  const ForgetPassword = async (model: IForgetPasswordCredentials) => {
    try {
      const resp = await http.post<ServiceResponse<string>>(
        `api/Account/forgetPassword`,
        null,
        { params: { email: model.email } }
      );

      return Promise.resolve(resp.data);
    } catch (error: any) {
      return Promise.reject(error.response.data.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* title  */}
        <h3 className={styles.title}>Forgot your password?</h3>
        <p className={styles.subtitle}>
          No problem! We’ll send you a link to reset it. Enter the email address
          you use to sign in to Reserva.com
        </p>
        {/* email field  */}
        <div className={styles.field}>
          <label htmlFor="email">Your email address</label>
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
          Send reset link
        </button>
      </form>
    </>
  );
};

export default ForgetPasswordPage;
