import { IFilterValueItem } from "../filterValue/types";

export interface IFilterNameCreate {
  name: string;
  categoryId?: number | null | undefined;
  
}

interface IFilterValue {
  filterNameId: number;
  filterValueId: number;
}

export interface IFilterProps {
  productId: number;
  connectionFilters: Array<IFilterValue>;
  removeConnectionFilters: Array<IFilterValue>;
}

export interface IFilterNameVM {
  id: number;
  name: string;
  categoryId?: number | null | undefined;
  filterValues: Array<IFilterValueItem>;
  IsDelete?: boolean;
}

export interface IFilterNameUpdate {
  id: number;
  name: string;
  categoryId?: number;
  IsDelete?: boolean;
}

export interface IFilterNameState{
    list:Array<IFilterNameVM>;
    filterNameItem:IFilterNameVM;
}

  export enum FilterNameActionType {
    GET_ALL_FILTER_NAMES = "GET_ALL_FILTER_NAMES",
    GET_FILTER_NAME_BY_ID = "GET_FILTER_NAME_BY_ID",
    CREATE_FILTER_NAME = "CREATE_FILTER_NAME",
    UPDATE_FILTER_NAME = "UPDATE_FILTER_NAME",
    CONNECTING_FILTER_FOR_PRODUCT = "CONNECTING_FILTER_FOR_PRODUCT",
    UPDATE_LIST_FILTER_NAME = "UPDATE_LIST_FILTER_NAME",

  }
  
  export interface GetFilterNamesAction {
    type: FilterNameActionType.GET_ALL_FILTER_NAMES;
    payload:Array<IFilterNameVM>;
  }

  export interface GetFilterNameByIdAction {
    type: FilterNameActionType.GET_FILTER_NAME_BY_ID;
    payload:IFilterNameVM;
  }

  export interface CreateFilterNamesAction {
    type: FilterNameActionType.CREATE_FILTER_NAME;
    payload:IFilterNameVM;
  }  
  
  export interface UpdateFilterNamesAction {
    type: FilterNameActionType.UPDATE_FILTER_NAME;
    payload:IFilterNameVM;
  }
  export interface UpdateListFilterNamesAction {
    type: FilterNameActionType.UPDATE_LIST_FILTER_NAME;
    payload:IFilterNameVM[];
  }

  export interface ConnectingFilterForProductAction {
    type: FilterNameActionType.CONNECTING_FILTER_FOR_PRODUCT;
  }
  
  
  export type FilterNameActions =
    | GetFilterNamesAction
    | GetFilterNameByIdAction
    | UpdateFilterNamesAction
    | UpdateListFilterNamesAction
    | ConnectingFilterForProductAction
    | CreateFilterNamesAction;