

export interface IProductItem {
  id: number;
  name: string;
  description: string;
  shortDescription: string; 
  quantity: number;
  price: number;
isSaved: boolean;
  category: string;
  categoryId: number;
  images: Array<IProductImageItem>;
}

//create
export interface IProductCreate {
  name: string;
  description: string;
  shortDescription: string;
  quantity: number;
  price: number;
  categoryId: number;
  images: Array<File>;
}

export interface IProductByUserCreate {
  product: IProductCreate;
}

//edit
export interface IProductEdit {
  id: number;
  name: string;
  description: string;
  shortDescription: string;
  quantity: number;
  price: number;
  categoryId: number;
  images: Array<File>;
  removeImages: Array<string>;

}

//
export interface IProductImageItem {
  id: number;
  name: string;
}



export interface IProductState {
  product: IProductItem;
}

export interface IProductListState {
  currentPage: number;
  pages: number;
  totalElements: number;
  products: Array<IProductItem>;
}

export interface IProductSearch {
  page?: number | string;
  countOnPage?: number | string;
  sort?: string;

  search?: string;
}

export interface IFilterSearch extends IProductSearch {
  categoryName: string;

  values: Array<number>;
}

export interface IProductSearchResponse {
  currentPage: number;
  pages: number;
  totalElements: number;
  payload: Array<IProductItem>;
}

export enum ProductActionTypes {
  PRODUCT_GET = "PRODUCT_GET",
  PRODUCT_CREATE = "PRODUCT_CREATE",
  PRODUCT_EDIT = "PRODUCT_EDIT",
  PRODUCT_REMOVE = "PRODUCT_REMOVE",
  PRODUCT_SET_SAVED = "PRODUCT_SET_SAVED",

  PRODUCT_LIST_GET = "PRODUCT_LIST_GET",
  PRODUCT_LIST_BY_FILTER_GET = "PRODUCT_LIST_BY_FILTER_GET",
}

export interface ProductGetAction {
  type: ProductActionTypes.PRODUCT_GET;
  payload: IProductState;
}

export interface ProductCreateAction {
  type: ProductActionTypes.PRODUCT_CREATE;
}

export interface ProductEditAction {
  type: ProductActionTypes.PRODUCT_EDIT;
}

export interface ProductRemoveAction {
  type: ProductActionTypes.PRODUCT_REMOVE;
}

export interface ProductSetSavedAction {
  type: ProductActionTypes.PRODUCT_SET_SAVED;
  productId: number;
}

export interface ProductListGetAction {
  type: ProductActionTypes.PRODUCT_LIST_GET;
  payload: IProductListState;
}

export interface ProductListByFilterGetAction {
  type: ProductActionTypes.PRODUCT_LIST_BY_FILTER_GET;
  payload: IProductListState;
}

export type ProductActions =
  | ProductGetAction
  | ProductListGetAction
  | ProductListByFilterGetAction
  | ProductCreateAction
  | ProductEditAction
  | ProductRemoveAction
  | ProductSetSavedAction;
