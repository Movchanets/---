import { Dispatch } from "redux";
import {
  IProductSearchParams,
  ProductSearchActions,
  ProductSearchActionTypes,
} from "./types";

export const SetProductSearchParams =
  (model: IProductSearchParams) =>
  async (dispatch: Dispatch<ProductSearchActions>) => {
    try {
      dispatch({
        type: ProductSearchActionTypes.SET_PRODUCT_SEARCH_PARAMS,
        payload: model,
      });
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  };

export const SetDefaultProductSearchParams =
  () => async (dispatch: Dispatch<ProductSearchActions>) => {
    try {
      dispatch({
        type: ProductSearchActionTypes.SET_PRODUCT_SEARCH_PARAMS,
        payload: {
            name: "",
            description: "",
            shortDescription: "",
            quantity: 0,
            price: 0
        },
      });
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  };