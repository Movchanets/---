import jwtDecode from "jwt-decode";
import { Dispatch } from "react";
import http from "../../http_common";
import setAuthToken from "../../helpers/setAuthToken";
import {
  AccountAuth,
  AuthUserActionType,
  ILoginCredentials,
  IRegisterCredentials,
  IResetPasswordCredentials,
  IUser,
  IUserEdit,
  IVerifyEmailModel,
} from "./types";
import ServiceResponse from "../../ServiceResponse";

export const Login =
  (user: ILoginCredentials) => async (dispatch: Dispatch<AccountAuth>) => {
    try {
      const resp = await http.post<ServiceResponse<string>>("api/Account/login", user);

      const { data } = resp;

      setAuthUserByToken(data.payload, dispatch);
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  };

export const Register =
  (user: IRegisterCredentials) => async (dispatch: Dispatch<AccountAuth>) => {
    try {
      const resp = await http.post<ServiceResponse<string>>(
        "api/Account/registration",
        user
      );

      const { data } = resp;

      dispatch({
        type: AuthUserActionType.REGISTER_USER,
      });

      setAuthUserByToken(data.payload, dispatch);
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  };

export const EditMyDetails =
  (model: IUserEdit) => async (dispatch: Dispatch<AccountAuth>) => {
    try {
      const resp = await http.put<ServiceResponse<string>>("api/Account/update", model, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { data } = resp;
      console.log("RESP EDIT", resp);

      dispatch({
        type: AuthUserActionType.EDIT_USER,
      });

      if (data.payload.length) setAuthUserByToken(data.payload, dispatch);
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  };

export const Logout = () => async (dispatch: Dispatch<AccountAuth>) => {
  try {
    dispatch({
      type: AuthUserActionType.LOGOUT_USER,
      payload: {
        isAuth: false,
        user: null,
      },
    });

    localStorage.removeItem("token");
  } catch (error: any) {
    return Promise.reject(error.response);
  }
};

export const GoogleLogin = (token: string, isImplicit: boolean) => {
  return async (dispatch: Dispatch<AccountAuth>) => {
    try {
      const resp = await http.post<ServiceResponse<string>>(
        isImplicit
          ? "api/Account/externalLogin/google/implicit"
          : "api/Account/externalLogin/google",
        {
          provider: "Google",
          token: token,
        }
      );

      const { data } = resp;

      dispatch({ type: AuthUserActionType.GOOGLE_LOGIN_USER });

      setAuthUserByToken(data.payload, dispatch);
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  };
};

export const ResetPassword = (model: IResetPasswordCredentials) => {
  return async (dispatch: Dispatch<AccountAuth>) => {
    try {
      const resp = await http.post<ServiceResponse<null>>(
        "api/Account/resetPassword",
        model
      );

      const { data } = resp;

      if (data.isSuccess) dispatch({ type: AuthUserActionType.RESET_PASSWORD_USER });
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  };
};

export const SendEmailConfirmation = (email: string) => {
  return async (dispatch: Dispatch<AccountAuth>) => {
    try {
      const resp = await http.post<ServiceResponse<null>>(
        "api/Account/send_email_confirmation",
        email
      );
      const { data } = resp;

      if (data.isSuccess) dispatch({ type: AuthUserActionType.SEND_EMAIL_VERIFICATION });
    } catch (err) {
      console.log("Yap... Error", err);
    }
  };
};

export const VerifyEmail = (model: IVerifyEmailModel) => {
  return async (dispatch: Dispatch<AccountAuth>) => {
    try {
      const resp = await http.post<ServiceResponse<null>>(
        "api/Account/confirm_email",
        model
      );
      const { data } = resp;

      if (data.isSuccess) dispatch({ type: AuthUserActionType.VERIFY_EMAIL });
    } catch (err) {
      console.log("Yap... Error", err);
    }
  };
};

export const setAuthUserByToken = (token: string, dispatch: Dispatch<AccountAuth>) => {
  setAuthToken(token);

  const userInfo: IUser = jwtDecode(token);

  dispatch({
    type: AuthUserActionType.LOGIN_USER,
    payload: {
      isAuth: true,
      user: userInfo,
    },
  });
};
