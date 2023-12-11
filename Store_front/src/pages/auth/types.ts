export enum DefaultAuthStep {
  DEFAULT_STEP,
  LOGIN_STEP,
  REGISTER_STEP,
}

export interface IDefaultAuthResult {
  email: string;
  userExists: boolean;
}

export interface IDefaultAuthProps {
  onNextStep: (model: IDefaultAuthResult) => void;
}

export interface ILoginAuthResult {
  password: string;
}
export interface IVerifyEmailResult {
  email: string;
  token: string;
}
export interface ILoginAuthProps {
  onNextStep: (model: ILoginAuthResult) => void;
  email: string;
}

export interface IRegisterAuthResult {
  password: string;
  confirmPassword: string;
}

export interface IRegisterAuthProps {
  onNextStep: (model: IRegisterAuthResult) => void;
}

export interface IForgetPasswordCredentials {
  email: string;
}
