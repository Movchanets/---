import { useState } from "react";
import { toast } from "react-toastify";
import { useActions } from "../../hooks/useActions";
import DefaultAuthPage from "./default";
import LoginAuthPage from "./login";
import RegisterAuthPage from "./register";
import {
  DefaultAuthStep,
  IDefaultAuthResult,
  ILoginAuthResult,
  IRegisterAuthResult,
} from "./types";

const AuthPage = () => {
  const { Login, Register } = useActions();

  const [step, setStep] = useState<DefaultAuthStep>(
    DefaultAuthStep.DEFAULT_STEP
  );

  const [userEmail, setUserEmail] = useState<string>("");

  const handleDefaultAuthResult = (result: IDefaultAuthResult) => {
    setUserEmail(result.email);
    if (result.userExists) setStep(DefaultAuthStep.LOGIN_STEP);
    else setStep(DefaultAuthStep.REGISTER_STEP);
  };

  const handleLoginAuthResult = async (result: ILoginAuthResult) => {
    try {
      await Login({ email: userEmail, password: result.password });
    } catch (error: any) {
      toast.error(error.data.message);
      console.error("Щось пішло не так", error);
    }
  };

  const handleRegisterAuthResult = async (result: IRegisterAuthResult) => {
    try {
      await Register({
        email: userEmail,
        password: result.password,
        confirmPassword: result.confirmPassword,
      });
    } catch (error: any) {
      toast.error(error.data.message);
      console.error("Щось пішло не так", error);
    }
  };

  const data = () => {
    switch (step) {
      case DefaultAuthStep.LOGIN_STEP: {
        return (
          <>
            <LoginAuthPage
              onNextStep={handleLoginAuthResult}
              email={userEmail}
            />
          </>
        );
      }
      case DefaultAuthStep.REGISTER_STEP: {
        return (
          <>
            <RegisterAuthPage onNextStep={handleRegisterAuthResult} />
          </>
        );
      }
      default:
        return (
          <>
            <DefaultAuthPage onNextStep={handleDefaultAuthResult} />
          </>
        );
    }
  };

  return <>{data()}</>;
};

export default AuthPage;
