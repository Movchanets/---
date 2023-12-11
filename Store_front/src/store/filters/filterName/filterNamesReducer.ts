import { FilterNameActions, FilterNameActionType, IFilterNameState } from "./types";

const initialState: IFilterNameState = {
  list:[],
  filterNameItem:{
    id:0,
    name:"",
    categoryId:0,
    filterValues:[],
    IsDelete:false,
  }
};

export const FilterNameReducer = (
  state = initialState,
  action: FilterNameActions
): IFilterNameState => {
  switch (action.type) {
    case FilterNameActionType.GET_ALL_FILTER_NAMES: {
      return {
        ...state,
        list: action.payload
      };
    }
    case FilterNameActionType.CREATE_FILTER_NAME: {
        return {
          ...state,
          list: [...state.list , action.payload ],
        };
      }
      case FilterNameActionType.GET_FILTER_NAME_BY_ID: {
        return {
          ...state,
          filterNameItem:action.payload
        };
      }
      case FilterNameActionType.UPDATE_FILTER_NAME: {
        return {
          ...state,
          filterNameItem:action.payload
        };
      }
      case FilterNameActionType.UPDATE_LIST_FILTER_NAME: {
        return {
          ...state,
          list:action.payload
        };
      }
      case FilterNameActionType.CONNECTING_FILTER_FOR_PRODUCT: {
        return {
          ...state,
        };
      }
    default:
      return state;
  }
};