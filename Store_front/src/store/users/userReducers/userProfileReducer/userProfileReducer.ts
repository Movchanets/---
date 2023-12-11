import { UserItem } from "../../types";

export enum UserProfileActionType {
  LOADING_USER_PROFILE_DATA = "LOADING_USER_PROFILE_DATA",
  UPDATE_USER_PROFILE_DATA = "UPDATE_USER_PROFILE_DATA",
  ERROR_LOAD_USER_PROFILE_DATA = "ERROR_LOAD_USER_PROFILE_DATA",
}

interface LoadingUserProfileDataAction {
  type: UserProfileActionType.LOADING_USER_PROFILE_DATA;
  payload: UserProfileState;
}
interface UpdateUserProfileDataAction {
  type: UserProfileActionType.UPDATE_USER_PROFILE_DATA;
}
interface ErrorLoadingUserProfileDataAction {
  type: UserProfileActionType.ERROR_LOAD_USER_PROFILE_DATA;
}

export type UserProfileActions =
  | LoadingUserProfileDataAction
  | UpdateUserProfileDataAction
  | ErrorLoadingUserProfileDataAction;

interface UserProfileState {
  user: UserItem;
}
const initialState: UserProfileState = {
  user: {
    id: 0,
    firstName: "",
    lastName: "",
    image: "",
    phoneNumber: "",
    email: "",
    isBlocked: false,
    userRoles: [],
  },
};

export const UserProfileReducer = (
  state = initialState,
  action: UserProfileActions
): UserProfileState => {
  switch (action.type) {
    case UserProfileActionType.LOADING_USER_PROFILE_DATA: {
      return {
        ...state,
        user: action.payload.user,
      };
    }
    case UserProfileActionType.UPDATE_USER_PROFILE_DATA: {
      return state;
    }
    default:
      return state;
  }
};
