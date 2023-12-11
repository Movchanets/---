export interface UserItem {
  id: number;
  firstName?: string;
  lastName?: string;
  email: string;
  image?: string;
  phoneNumber?: string | number;
  isBlocked: boolean;
  userRoles: Array<string>;
}

export interface IResponseSearch {
  currentPage?: number;
  pages?: number;
  totalElements?: number;
  payload: Array<UserItem>;
}

export interface ISearch {
  page?: number | string;
  countOnPage?: number | string;
  sort?: string;
  search?: string;
}

export enum UserActionType {
  LOADING_USER_SEARCH_PARAMS = "LOADING_USER_SEARCH_PARAMS",
  BLOCKED_USER = "BLOCKED_USER",
}

export interface LoadingUserSearchParamsAction {
  type: UserActionType.LOADING_USER_SEARCH_PARAMS;
  payload: IResponseSearch;
}

export interface BlockedUserAction {
  type: UserActionType.BLOCKED_USER;
}

export type UserActions = LoadingUserSearchParamsAction | BlockedUserAction;
