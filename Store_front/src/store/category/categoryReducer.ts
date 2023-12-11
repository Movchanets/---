import { CategoryActionType, CategoryActions, ICategoryState } from "./types";

const initialState: ICategoryState = {
  list: [],
  childList: [],
};

export const CategoryReducer = (
  state = initialState,
  action: CategoryActions
): ICategoryState => {
  switch (action.type) {
    case CategoryActionType.CATEGORY_LIST: {
      return {
        ...state,
        ...action.payload
      };
    }
    case CategoryActionType.CATEGORY_CREATE: {
      return {
        ...state,
      };
    }
    case CategoryActionType.CATEGORY_UPDATE: {
      return {
        ...state,
        selectCategory:action.payload
      };
    }
    case CategoryActionType.CATEGORY_REMOVE: {
      return {
        ...state,
      };
    }
    case CategoryActionType.GET_CATEGORY_BY_ID: {
      return {
        ...state,
        selectCategory:action.payload
      };
    }
    case CategoryActionType.LOAD_CURRENT_CATEGORY_CHILDREN: {
      return {
        ...state,
        childList:action.payload
      };
    }
    case CategoryActionType.START_REQUEST: {
      return state;
    }
    case CategoryActionType.SERVER_ERROR: {
      return {
        ...state
      };
    }
    default:
      return state;
  }
};