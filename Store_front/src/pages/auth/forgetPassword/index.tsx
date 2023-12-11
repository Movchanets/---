import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { APP_ENV } from "../../../env";
import ForgetPasswordPage from "./ForgetPasswordPage";

const ForgetPasswordPageRC = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={APP_ENV.GOOGLE_RECAPTCHA}>
      <ForgetPasswordPage />
    </GoogleReCaptchaProvider>
  );
};

export default ForgetPasswordPageRC;
