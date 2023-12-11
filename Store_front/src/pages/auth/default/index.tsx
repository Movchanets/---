import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { APP_ENV } from "../../../env";
import { IDefaultAuthProps } from "../types";
import DefaultAuthPage from "./DefaultAuthPage";

const DefaultAuthPageRC: React.FC<IDefaultAuthProps> = ({
  onNextStep: onStepNext,
}) => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={APP_ENV.GOOGLE_RECAPTCHA}>
      <DefaultAuthPage onNextStep={onStepNext} />
    </GoogleReCaptchaProvider>
  );
};

export default DefaultAuthPageRC;
