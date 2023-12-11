import { IResponseSearch, UserActionType, UserActions } from "../../types";

const initialState: IResponseSearch = {
  pages: 0,
  currentPage: 0,
  totalElements: 0,
  payload: [],
};

export const UserSearchReducer = (
  state = initialState,
  action: UserActions
): IResponseSearch => {
  switch (action.type) {
    case UserActionType.LOADING_USER_SEARCH_PARAMS: {
      return {
        ...state,
        pages: action.payload.pages,
        currentPage: action.payload.currentPage,
        totalElements: action.payload.totalElements,
        payload: action.payload.payload,
      };
    }
    case UserActionType.BLOCKED_USER: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};
