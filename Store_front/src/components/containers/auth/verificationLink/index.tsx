import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

import VerificationLinkPage from "./VerificationLinkPage";
import { APP_ENV } from "../../../../env";

const VerificationLinkPageRC = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={APP_ENV.GOOGLE_RECAPTCHA}>
      <VerificationLinkPage />
    </GoogleReCaptchaProvider>
  );
};

export default VerificationLinkPageRC;
