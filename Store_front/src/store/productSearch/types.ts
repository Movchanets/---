export interface IProductSearchParams {
   name: string;
description: string;
shortDescription: string;
quantity: number;
price: number;

  }
  

  
  export interface IProductAutoComplete{
    id:number;
    name:string;
    image:string;
  }
  
  export interface IProductSearchState {
    productSearchItem: IProductSearchParams;
  }
  
  export interface IProductSearch {
    page?: number | string;
    countOnPage?: number | string;
    sort?: string;
    categoryName?: string;
    search?: string;
  }
  
  export interface IFilterSearch extends IProductSearch {
    values: Array<number>;
  }
  
  export enum ProductSearchActionTypes {
    SET_PRODUCT_SEARCH_PARAMS = "SET_PRODUCT_SEARCH_PARAMS",
    SET_DEFAULT_PRODUCT_SEARCH_PARAMS = "SET_DEFAULT_PRODUCT_SEARCH_PARAMS",
  }
  
  export interface SetProductSearchAction {
    type: ProductSearchActionTypes.SET_PRODUCT_SEARCH_PARAMS;
    payload: IProductSearchParams;
  }
  
  export interface SetDefaultProductSearchAction {
    type: ProductSearchActionTypes.SET_DEFAULT_PRODUCT_SEARCH_PARAMS;
    payload: IProductSearchParams;
  }
  
  export type ProductSearchActions =
    | SetProductSearchAction
    | SetDefaultProductSearchAction;