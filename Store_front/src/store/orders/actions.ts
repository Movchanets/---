import { Dispatch } from "redux";
import http from "../../http_common";
import ServiceResponse from "../../ServiceResponse";
import {

  ICartItem,
  IDetail,
  IOrderItem,
  IOrderSearch,
  IOrderSearchResponse,
  OrderActionTypes,
  OrderActions,
} from "./types";
import { IProductItem } from "../products/types";
import { GetProduct } from "../products/actions";

export const GetUserOrdersList = () => async (dispatch: Dispatch<OrderActions>) => {
  try {
    const resp = await http.get<ServiceResponse<IOrderItem[]>>(`/api/Order/list/user`);

    const { data } = resp;
    const payload: IOrderItem[] = data.payload;

    console.log("payload", payload);

    dispatch({
      type: OrderActionTypes.ORDER_USER_GET,
      payload: payload,
    });

    let set = new Set<number>();
    payload.forEach((item: any) => {
      set.add(item?.accommodationType?.productId ?? -1);
    });

    let arr: IProductItem[] = [];
    let indexes = Array.from(set);

    for (let i: number = 0; i < set.size; i++) {
      const resp = await http.get<ServiceResponse<IProductItem>>(
        `/api/Product/byId/${indexes[i]}`
      );

      const { data } = resp;
      const payload: IProductItem = data.payload;

      console.log("IProductItem", payload);
      arr.push(payload);
      console.log("arr", arr);
    }

    dispatch({
      type: OrderActionTypes.ORDER_GET_PRODUCTS,
      payload: arr,
    });
    return Promise.resolve(payload);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetOrder = (id: number) => async (dispatch: Dispatch<OrderActions>) => {
  try {
    const resp = await http.get<ServiceResponse<IOrderItem>>(
      `/api/Order/get_by_id/${id}`
    );

    const { data } = resp;
    dispatch({
      type: OrderActionTypes.ORDER_GET,
      payload: { order: data.payload },
    });

    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetOrdersList =
  (model: IOrderSearch) => async (dispatch: Dispatch<OrderActions>) => {
    try {
      const resp = await http.get<ServiceResponse<IOrderSearchResponse>>(
        `/api/Order/list/pagination`,
        {
          params: model,
        }
      );

      console.log("resp", resp);

      const { data } = resp;
      const { payload } = data;

      dispatch({
        type: OrderActionTypes.ORDERS_LIST_GET,
        payload: {
          currentPage: payload.currentPage,
          pages: payload.pages,
          totalElements: payload.totalElements,
          orders: payload.payload,
        },
      });

      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  export const GetUserOrders =
  (model: IOrderSearch) => async (dispatch: Dispatch<OrderActions>) => {
    try {
      const resp = await http.get<ServiceResponse<IOrderSearchResponse>>(
        `/api/Order/list/paginationUser`,
        {
          params: model,
        }
      );

      console.log("resp", resp);

      const { data } = resp;
      const { payload } = data;

      dispatch({
        type: OrderActionTypes.ORDERS_LIST_GET,
        payload: {
          currentPage: payload.currentPage,
          pages: payload.pages,
          totalElements: payload.totalElements,
          orders: payload.payload,
        },
      });

      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  };
export const AddToCart = (product: IProductItem) => async (dispatch: Dispatch<OrderActions>) => {
  try {
    
   
    const Detail : IDetail= {
      product: product,
      quantity: 0,
      ProductId: product.id
    };
    dispatch({
      type: OrderActionTypes.CART_ADD,
      detail: Detail,
    });

    return Promise.resolve(Detail);
  } catch (error) {
    return Promise.reject(error);
  }
}
export const RemoveFromCart = (id: number) => async (dispatch: Dispatch<OrderActions>) => {
  try {
   
    dispatch({
      type: OrderActionTypes.CART_REMOVE,
      id: id,
    });

    return Promise.resolve(id);
  } catch (error) {
    return Promise.reject(error);
  }
}
export const IncreaseQuantity = (id: number) => async (dispatch: Dispatch<OrderActions>) => {
  try {
   
    dispatch({
      type: OrderActionTypes.CART_INCREASE,
      id: id,
    });

    return Promise.resolve(id);
  } catch (error) {
    return Promise.reject(error);
  }
}
export const DecreaseQuantity = (id: number) => async (dispatch: Dispatch<OrderActions>) => {
  try {
   
    dispatch({
      type: OrderActionTypes.CART_DECREASE,
      id: id,
    });

    return Promise.resolve(id);
  } catch (error) {
    return Promise.reject(error);
  }
}
export const ClearCart = () => async (dispatch: Dispatch<OrderActions>) => {
  try {
   
    dispatch({
      type: OrderActionTypes.CART_CLEAR,
    });

    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
}
export const CreateOrder =
  (model: ICartItem) => async (dispatch: Dispatch<OrderActions>) => {
    try {
      const resp = await http.post(`/api/Order/create`, model);

      console.log("resp from server create", resp);

      const { data } = resp;
      dispatch({
        type: OrderActionTypes.ORDER_CREATE,
      });

      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

export const RemoveOrder = (id: number) => async (dispatch: Dispatch<OrderActions>) => {
  try {
    const resp = await http.delete(`/api/Order/delete/${id}`);

    console.log("resp from server remove", resp);

    const { data } = resp;
    dispatch({
      type: OrderActionTypes.ORDER_REMOVE,
    });

    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};
