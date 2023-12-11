
import { FilterValuesActions, FilterValuesActionType, IFilterValuesState } from "./types";



const initialState: IFilterValuesState = {
  list:[],
  filterValue:{
    id:0,
    name:"",
    IsDelete: false
  },
};

export const FilterValuesReducer = (
  state = initialState,
  action: FilterValuesActions
): IFilterValuesState => {
  switch (action.type) {
    case FilterValuesActionType.GET_ALL_FILTER_VALUES: {
      return {
        ...state,
        list: action.payload
      };
    }
    case FilterValuesActionType.GET_FILTER_VALUE_BY_ID: {
      return {
        ...state,
        filterValue:action.payload
      };
    }
    case FilterValuesActionType.CHENGE_CHECKED_FILTER_VALUES: {
        return {
          ...state,
          list: action.payload
        };
      }
      case FilterValuesActionType.CREATE_FILTER_VALUES: {
        return {
          ...state,
        };
      }
      case FilterValuesActionType.UPDATE_FILTER_VALUE: {
        return {
          ...state,
          filterValue:action.payload
        };
      }
    default:
      return state;
  }
};