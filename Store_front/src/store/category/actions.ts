import { Dispatch } from "react";
import {
  CategoryActionType,
  CategoryActions,
  ICategoryList,
  ICategoryItem,
  ICategoryEditItem,
  ICategoryCreateItem,
} from "./types";
import http from "../../http_common";
import ServiceResponse from "../../ServiceResponse";

export const GetCategoryList =
  () => async (dispatch: Dispatch<CategoryActions>) => {
    try {
      dispatch({
        type: CategoryActionType.START_REQUEST,
      });

      const resp = await http.get<ServiceResponse<Array<ICategoryList>>>(
        "/api/Category/list"
      );

      const { data } = resp;
      // console.log("data list : ",data);
      dispatch({
        type: CategoryActionType.CATEGORY_LIST,
        payload: {
          list: data.payload,
          childList: [],
        },
      });
      return Promise.resolve(data.message);
    } catch (error: any) {
      dispatch({
        type: CategoryActionType.SERVER_ERROR,
      });

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

export const GetCategoryById =
  (id: number | string) => async (dispatch: Dispatch<CategoryActions>) => {
    try {
      dispatch({ type: CategoryActionType.START_REQUEST });

      const resp = await http.get<ServiceResponse<ICategoryItem>>(
        `/api/Category/getById/${id}`
      );
      const { data } = resp;
      // console.log("load by id: ", data);
      dispatch({
        type: CategoryActionType.GET_CATEGORY_BY_ID,
        payload: data.payload,
      });
      return Promise.resolve(data.payload);
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

export const GetCategoryChildrenByName =
  (name: string) => async (dispatch: Dispatch<CategoryActions>) => {
    try {
      dispatch({ type: CategoryActionType.START_REQUEST });

      const resp = await http.get<ServiceResponse<Array<ICategoryItem>>>(
        `/api/Category/getChildrenByName/${name}`
      );
      console.log("load by name: ", resp);
      const { data } = resp;
      dispatch({
        type: CategoryActionType.LOAD_CURRENT_CATEGORY_CHILDREN,
        payload: data.payload,
      });
      return Promise.resolve(data.payload);
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

export const EditCategory =
  (model: ICategoryEditItem) => async (dispatch: Dispatch<CategoryActions>) => {
    try {
      dispatch({ type: CategoryActionType.START_REQUEST });

      const resp = await http.put<ServiceResponse<ICategoryItem>>(
        `/api/Category/update`,
        model
      );

      console.log("resp from server update", resp);

      const { data } = resp;
      dispatch({
        type: CategoryActionType.CATEGORY_UPDATE,
        payload: data.payload,
      });
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

export const CreateCategory =
  (model: ICategoryCreateItem) =>
  async (dispatch: Dispatch<CategoryActions>) => {
    try {
      dispatch({ type: CategoryActionType.START_REQUEST });

      // console.log("Action Category create", model);
      const resp = await http.post<ServiceResponse<ICategoryItem>>(
        `/api/Category/create`,
        model
      );

      // console.log("resp from server Create", resp);

      const { data } = resp;
      dispatch({
        type: CategoryActionType.CATEGORY_CREATE,
      });
      return Promise.resolve(data);
    } catch (error: any) {
      // if (!error.response) {
      //   console.log("this", error);
      //   // network error => як вернути і отримати там результат промісу ?
      //   toast.error(`Не вдалося з'єднатися з сервером`);
      //   return Promise.reject("Не вдалося з'єднатися з сервером");
      // } else {
      const { data } = error.response;
      return Promise.reject(data.message);
      // }
    }
  };

export const RemoveCategory =
  (id: number) => async (dispatch: Dispatch<CategoryActions>) => {
    try {
      dispatch({
        type: CategoryActionType.START_REQUEST,
      });

      const resp = await http.delete(`/api/Category/delete/${id}`);

      const { data } = resp;
      console.log("after delete category: ", data);
      dispatch({ type: CategoryActionType.CATEGORY_REMOVE });
      return Promise.resolve(data.message);
    } catch (error: any) {
      dispatch({
        type: CategoryActionType.SERVER_ERROR,
      });

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
