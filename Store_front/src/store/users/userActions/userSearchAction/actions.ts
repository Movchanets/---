import { Dispatch } from "react";
import {
  IResponseSearch,
  ISearch,
  UserActionType,
  UserActions,
  UserItem,
} from "../../types";
import http from "../../../../http_common";
import ServiceResponse from "../../../../ServiceResponse";

export const GetUserSearchParams =
  (searchParams: ISearch) => async (dispatch: Dispatch<UserActions>) => {
    try {
      const resp = await http.get<ServiceResponse<IResponseSearch>>(
        "/api/User/listByPage",
        { params: searchParams }
      );

      const { data } = resp;
      // console.log("data users ", data);
      dispatch({
        type: UserActionType.LOADING_USER_SEARCH_PARAMS,
        payload: data.payload,
      });
      // toast.success(data.message , {position: toast.POSITION.TOP_RIGHT})
    } catch (error: any) {
      // if (!error.response) {
      //   // console.log("this", error);
      //   // toast.error("Не вдалося з'єднатися з сервером");

      //   return Promise.reject("Не вдалося з'єднатися з сервером");
      // } else {
      const { data } = error.response;
      return Promise.reject(data.message);
      // }
    }
  };

export const BlockUser =
  (email: string) => async (dispatch: Dispatch<UserActions>) => {
    try {
      const resp = await http.put<ServiceResponse<null>>(
        "/api/User/blockUnblock?email=" + email
      );

      const { data } = resp;
      // console.log("data blocck users ", data);

      dispatch({
        type: UserActionType.BLOCKED_USER,
      });
    } catch (error: any) {
      // if (!error.response) {
      //   console.log("this", error);
      //   // network error => як вернути і отримати там результат промісу ?
      //   toast.error("Не вдалося з'єднатися з сервером");
      //   return Promise.reject("Не вдалося з'єднатися з сервером");
      // } else {
      const { data } = error.response;
      return Promise.reject(data.message);
      // }
    }
  };

export const GetUserById =
  (id: string) => async (dispatch: Dispatch<UserActions>) => {
    try {
      const resp = await http.get<UserItem>("/api/User/getById?id=" + id);

      const { data } = resp;
      // console.log("data users", data);
      // return new Promise<UserItem>((res , rej)=>{res(data)});
      return Promise.resolve(data);
    } catch (error: any) {
      // if (!error.response) {
      //   console.log("this", error);
      //   // network error => як вернути і отримати там результат промісу ?
      //   toast.error("Не вдалося з'єднатися з сервером");
      //   return Promise.reject("Не вдалося з'єднатися з сервером");
      // } else {
      const { data } = error.response;
      return Promise.reject(data.message);
      // }
    }
  };
