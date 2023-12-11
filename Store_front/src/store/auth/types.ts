export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IRegisterCredentials {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IUserEdit {
  name: string;
  surname: string;
  email: string;
  image?: File;
}

export interface IResetPasswordCredentials {
  email: string;
  token: string;
  password: string;
  confirmPassword: string;
}

export interface IVerifyEmailModel {
  email: string;
  token: string;
}

export interface IUser {
  userName: string;
  email: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  roles: string[];
}

export interface IAuthUser {
  isAuth: boolean;
  user: IUser | null;
}

export enum AuthUserActionType {
  LOGIN_USER = "AUTH_LOGIN_USER",
  REGISTER_USER = "AUTH_REGISTER_USER",
  EDIT_USER = "EDIT_USER",
  GOOGLE_LOGIN_USER = "AUTH_GOOGLE_LOGIN_USER",
  VERIFY_EMAIL = "VERIFY_EMAIL",
  SEND_EMAIL_VERIFICATION = "SEND_EMAIL_VERIFICATION",
  RESET_PASSWORD_USER = "AUTH_RESET_PASSWORD_USER",
  LOGOUT_USER = "AUTH_LOGOUT_USER",
}

export interface LoginUserAction {
  type: AuthUserActionType.LOGIN_USER;
  payload: IAuthUser;
}

export interface VerifyEmailAction {
  type: AuthUserActionType.VERIFY_EMAIL;
}

export interface UserEditAction {
  type: AuthUserActionType.EDIT_USER;
}

export interface SendEmailVerificationAction {
  type: AuthUserActionType.SEND_EMAIL_VERIFICATION;
}

export interface RegisterUserAction {
  type: AuthUserActionType.REGISTER_USER;
}

export interface LogoutUserAction {
  type: AuthUserActionType.LOGOUT_USER;
  payload: IAuthUser;
}

export interface ResetPasswordUserAction {
  type: AuthUserActionType.RESET_PASSWORD_USER;
}

export interface GoogleLoginUserAction {
  type: AuthUserActionType.GOOGLE_LOGIN_USER;
}

export type AccountAuth =
  | LoginUserAction
  | RegisterUserAction
  | LogoutUserAction
  | VerifyEmailAction
  | SendEmailVerificationAction
  | UserEditAction
  | ResetPasswordUserAction
  | GoogleLoginUserAction;
