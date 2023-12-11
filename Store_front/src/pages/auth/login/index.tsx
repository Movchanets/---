import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { APP_ENV } from "../../../env";
import { ILoginAuthProps } from "../types";
import LoginAuthPage from "./LoginAuthPage";

const LoginAuthPageRC: React.FC<ILoginAuthProps> = ({ onNextStep, email }) => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={APP_ENV.GOOGLE_RECAPTCHA}>
      <LoginAuthPage onNextStep={onNextStep} email={email} />
    </GoogleReCaptchaProvider>
  );
};

export default LoginAuthPageRC;
