import { AuthUserActionType, IAuthUser } from "./types";

const initState: IAuthUser = {
  isAuth: false,
  user: {
    userName: "",
    email: "",
    phone: "",
    image: "",
    roles: [],
  },
};

export const AuthReducer = (state = initState, action: any): IAuthUser => {
  switch (action.type) {
    case AuthUserActionType.LOGIN_USER: {
      return {
        ...state,
        isAuth: true,
        user: action.payload.user,
      };
    }

    case AuthUserActionType.EDIT_USER: {
      return {
        ...state,
      };
    }

    case AuthUserActionType.REGISTER_USER: {
      return {
        ...state,
      };
    }

    case AuthUserActionType.VERIFY_EMAIL: {
      return {
        ...state,
      };
    }

    case AuthUserActionType.SEND_EMAIL_VERIFICATION: {
      return {
        ...state,
      };
    }

    case AuthUserActionType.LOGOUT_USER: {
      return {
        ...state,
        isAuth: false,
        user: null,
      };
    }

    case AuthUserActionType.RESET_PASSWORD_USER: {
      return {
        ...state,
      };
    }
  }
  return state;
};
