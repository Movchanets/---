
export interface IFilterValueItem {
    id: number;
    name: string;
    checked?:boolean;
    IsDelete?: boolean;
}

export interface IFilterValuesCreate{
    names:Array<string>
}

export interface IFilterValueVM {
    id: number;
    name: string;
    IsDelete?: boolean;
    checked: boolean ;
}

export interface IFilterValueUpdate{
  id: number;
  name: string;
  IsDelete?: boolean;
}

export interface IFilterValuesState{
    list:Array<IFilterValueVM>;
    filterValue:IFilterValueItem;
}

  export enum FilterValuesActionType {
    GET_ALL_FILTER_VALUES = "GET_ALL_FILTER_VALUES",
    GET_FILTER_VALUE_BY_ID = "GET_FILTER_VALUE_BY_ID",
    CHENGE_CHECKED_FILTER_VALUES = "CHENGE_CHECKED_FILTER_VALUES",
    CREATE_FILTER_VALUES = "CREATE_FILTER_VALUES",
    UPDATE_FILTER_VALUE = "UPDATE_FILTER_VALUE",

  }
  
  export interface GetFilterValuesAction {
    type: FilterValuesActionType.GET_ALL_FILTER_VALUES;
    payload:Array<IFilterValueVM>;
  }

  export interface GetFilterValueByIdAction {
    type: FilterValuesActionType.GET_FILTER_VALUE_BY_ID;
    payload:IFilterValueItem;
  }

  export interface CreateFilterValuesAction {
    type: FilterValuesActionType.CREATE_FILTER_VALUES;
  }

  export interface UpdateFilterValuesAction {
    type: FilterValuesActionType.UPDATE_FILTER_VALUE;
    payload:IFilterValueUpdate | IFilterValueItem;
  }

  export interface UpdateListFilterValuesAction {
    type: FilterValuesActionType.CHENGE_CHECKED_FILTER_VALUES;
    payload:Array<IFilterValueVM>;
  }
  
  
  export type FilterValuesActions =
    | GetFilterValuesAction
    | GetFilterValueByIdAction
    | CreateFilterValuesAction
    | UpdateFilterValuesAction
    | UpdateListFilterValuesAction;