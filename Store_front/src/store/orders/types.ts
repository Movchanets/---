import exp from "constants";
import { IProductItem } from "../products/types";



export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
}

export interface IOrderUrl {
  productId: number;
}
export interface IDetail 
{
  ProductId: number;
  product : IProductItem;
  quantity: number;
}
export interface IOrderItem {
  id: number;
  
  user: IUser | undefined;
  details: Array<IDetail>;
 

}
export interface ICartItem {

  
  email:string| undefined;
  details: Array<IDetail>;
 

}


//
export interface IOrderState {
  order: IOrderItem;
}

export interface ICartState {
  cart: ICartItem;
}
export interface IOrdersListState {
  currentPage: number;
  pages: number;
  totalElements: number;
  orders: Array<IOrderItem | undefined>;
}
export interface IUserOrdersState {
  orders: Array<IOrderItem | undefined>;
  products: Array<IProductItem | undefined>;
}

export interface IOrderSearch {
  page?: number | string;
  countOnPage?: number | string;
  sort?: string;
  search?: string;
}

export interface IOrderSearchResponse {
  currentPage: number;
  pages: number;
  totalElements: number;
  payload: Array<IOrderItem>;
}

export enum OrderActionTypes {
  ORDER_GET = "ORDER_GET",
  ORDER_CREATE = "ORDER_CREATE",
  CART_ADD = "CART_ADD",
  CART_REMOVE = "CART_REMOVE",
  CART_INCREASE = "CART_INCREASE",
  CART_DECREASE = "CART_DECREASE",
  CART_CLEAR = "CART_CLEAR",
  ORDER_USER_GET = "ORDER_USER_GET",
  ORDER_GET_PRODUCTS = "ORDER_GET_PRODUCTS",

  ORDER_REMOVE = "ORDER_REMOVE",
  ORDERS_LIST_GET = "ORDERS_LIST_GET",
}
export interface IOrderUserGet {
  type: OrderActionTypes.ORDER_USER_GET;
  payload: Array<IOrderItem | undefined>;
}
export interface IOrderGetProducts {
  type: OrderActionTypes.ORDER_GET_PRODUCTS;
  payload: Array<IProductItem>;
}
export interface OrderGetAction {
  type: OrderActionTypes.ORDER_GET;
  payload: IOrderState;
}
export interface CartAddAction {
  type: OrderActionTypes.CART_ADD;
  detail: IDetail;
}
export interface CartRemoveAction {
  type: OrderActionTypes.CART_REMOVE;
  id: Number;
}
export interface CartIncreaseAction {
  type: OrderActionTypes.CART_INCREASE;
  id: Number;
}
export interface CartDecreaseAction {
  type: OrderActionTypes.CART_DECREASE;
  id: Number;
}
export interface CartClearAction {
  type: OrderActionTypes.CART_CLEAR;
}
export interface OrderCreateAction {
  type: OrderActionTypes.ORDER_CREATE;
 
}

export interface OrderListGetAction {
  type: OrderActionTypes.ORDERS_LIST_GET;
  payload: IOrdersListState;
}

export interface OrderRemoveAction {
  type: OrderActionTypes.ORDER_REMOVE;
}

export type OrderActions =
  | CartAddAction
  | CartRemoveAction
  | CartIncreaseAction
  | CartDecreaseAction
  | CartClearAction
  | OrderGetAction
  | OrderCreateAction
  | OrderListGetAction
  | IOrderUserGet
  | IOrderGetProducts
  | OrderRemoveAction;
