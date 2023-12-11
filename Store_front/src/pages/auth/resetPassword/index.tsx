import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { APP_ENV } from "../../../env";
import ResetPasswordPage from "./ResetPasswordPage";

const ResetPasswordPageRC = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={APP_ENV.GOOGLE_RECAPTCHA}>
      <ResetPasswordPage />
    </GoogleReCaptchaProvider>
  );
};

export default ResetPasswordPageRC;
