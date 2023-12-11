import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { APP_ENV } from "../../../env";
import { IRegisterAuthProps } from "../types";
import RegisterAuthPage from "./RegisterAuthPage";

const RegisterAuthPageRC: React.FC<IRegisterAuthProps> = ({ onNextStep }) => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={APP_ENV.GOOGLE_RECAPTCHA}>
      <RegisterAuthPage onNextStep={onNextStep} />
    </GoogleReCaptchaProvider>
  );
};

export default RegisterAuthPageRC;
