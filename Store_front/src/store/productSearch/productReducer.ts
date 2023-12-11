import {
    IProductSearchState,
    ProductSearchActions,
    ProductSearchActionTypes,
  } from "./types";
  
  const initialState: IProductSearchState = {
    productSearchItem: {
        name: "",
        description: "",
        shortDescription: "",
        quantity: 0,
        price: 0
    },
  };
  
  export const ProductSearchReducer = (
    state = initialState,
    action: ProductSearchActions
  ): IProductSearchState => {
    switch (action.type) {
      case ProductSearchActionTypes.SET_PRODUCT_SEARCH_PARAMS: {
        return {
          ...state,
          productSearchItem: action.payload,
        };
      }
      case ProductSearchActionTypes.SET_DEFAULT_PRODUCT_SEARCH_PARAMS: {
        return {
          ...state,
          ...action.payload,
        };
      }
      default:
        return state;
    }
  };