import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";


import VerifyEmailPage from './VerifiyEmailPage';
import { APP_ENV } from "../../../../env";

const VerifyEmailPageRC = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={APP_ENV.GOOGLE_RECAPTCHA}>
      <VerifyEmailPage />
    </GoogleReCaptchaProvider>
  );
};

export default VerifyEmailPageRC;
