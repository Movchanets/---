import { Dispatch } from "redux";
import {
  IProductCreate,
  IProductEdit,
  IProductItem,
  IProductSearch,
  IFilterSearch,
  IProductSearchResponse,
  ProductActionTypes,
  ProductActions,
  IProductByUserCreate,
} from "./types";
import http from "../../http_common";
import ServiceResponse from "../../ServiceResponse";
import { toast } from "react-toastify";

export const GetProduct =
  (id: number) => async (dispatch: Dispatch<ProductActions>) => {
    try {
      const resp = await http.get<ServiceResponse<IProductItem>>(
        `/api/Product/byId/${id}`
      );

      const { data } = resp;
      dispatch({
        type: ProductActionTypes.PRODUCT_GET,
        payload: { product: data.payload },
      });

      return Promise.resolve(data);
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  };

export const GetProductList =
  (model: IProductSearch) => async (dispatch: Dispatch<ProductActions>) => {
    try {
      const resp = await http.get<ServiceResponse<IProductSearchResponse>>(
        `/api/Product/list/pagination`,
        {
          params: model,
        }
      );

      console.log("resp pag", resp);

      const { data } = resp;
      const { payload } = data;

      dispatch({
        type: ProductActionTypes.PRODUCT_LIST_GET,
        payload: {
          currentPage: payload.currentPage,
          pages: payload.pages,
          totalElements: payload.totalElements,
          products: payload.payload,
        },
      });

      return Promise.resolve(data);
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  };

export const GetProductListByFilter =
  (model: IFilterSearch) => async (dispatch: Dispatch<ProductActions>) => {
    try {
      const resp = await http.post<ServiceResponse<IProductSearchResponse>>(
        `/api/Filters/search`,
        model
      );

      console.log("resp", resp);

      const { data } = resp;
      const { payload } = data;

      dispatch({
        type: ProductActionTypes.PRODUCT_LIST_BY_FILTER_GET,
        payload: {
          currentPage: payload.currentPage,
          pages: payload.pages,
          totalElements: payload.totalElements,
          products: payload.payload,
        },
      });

      return Promise.resolve(data);
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  };

export const GetAllProduct = () => async () => {
  try {
    const resp = await http.get<ServiceResponse<IProductSearchResponse>>(
      `/api/Product/list/`
    );

    console.log("resp", resp);

    const { data } = resp;

    return Promise.resolve(data);
  } catch (error: any) {
    return Promise.reject(error.response);
  }
};

export const CreateProduct =
  (model: IProductCreate) => async (dispatch: Dispatch<ProductActions>) => {
    try {
      

      const resp = await http.post(`/api/Product/create`, model, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("resp from server create", resp);

      const { data } = resp;
      dispatch({
        type: ProductActionTypes.PRODUCT_CREATE,
      });

      return Promise.resolve(data);
    } catch (error: any) {
      if (error.response) {
        const { data } = error.response;
        toast.error(data.message);
      }

      return Promise.reject(error.response);
    }
  };

export const CreateFullProduct =
  (model: IProductByUserCreate) =>
  async (dispatch: Dispatch<ProductActions>) => {
    try {
   

      const respProd = await http.post(`/api/Product/create`, model.product, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("resp from server create", respProd);

      const { data } = respProd;

     


      return Promise.resolve(data);
    } catch (error: any) {
      if (error.response) {
        const { data } = error.response;
        toast.error(data.message);
      }

      return Promise.reject(error.response);
    }
  };

export const EditProduct =
  (model: IProductEdit) => async (dispatch: Dispatch<ProductActions>) => {
    try {
    

      const resp = await http.put(`/api/Product/update`, model, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("resp from server update", resp);

      const { data } = resp;
      dispatch({
        type: ProductActionTypes.PRODUCT_EDIT,
      });

      return Promise.resolve(data);
    } catch (error: any) {
      if (error.response) {
        const { data } = error.response;
        toast.error(data.message);
      }

      return Promise.reject(error.response);
    }
  };

export const RemoveProduct =
  (id: number) => async (dispatch: Dispatch<ProductActions>) => {
    try {
      const resp = await http.delete(`/api/Product/delete/${id}`);

      console.log("resp from server remove", resp);

      const { data } = resp;
      dispatch({
        type: ProductActionTypes.PRODUCT_REMOVE,
      });

      return Promise.resolve(data);
    } catch (error: any) {
      if (error.response) {
        const { data } = error.response;
        toast.error(data.message);
      }

      return Promise.reject(error.response);
    }
  };

export const SetFavoriteProduct =
  (id: number) => async (dispatch: Dispatch<ProductActions>) => {
    try {
      const resp = await http.put(`/api/Product/SetFavorite`, null, {
        params: { productId: id },
      });

      console.log("resp from server save", resp);

      const { data } = resp;
      dispatch({
        type: ProductActionTypes.PRODUCT_SET_SAVED,
        productId: id,
      });

      return Promise.resolve(data);
    } catch (error: any) {
      if (error.response) {
        const { data } = error.response;
        toast.error(data.message);
      }

      return Promise.reject(error.response);
    }
  };
