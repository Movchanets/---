import { combineReducers } from "redux";
import {
  IProductListState,
  IProductState,
  ProductActionTypes,
  ProductActions,
} from "./types";

const initialProductState: IProductState = {
  product: {
    id: 0,
    name: "",
    description: "",
    shortDescription: "",
    isSaved: false,
    category: "",
    categoryId: 0,
    images: [],
    quantity: 0,
    price: 0
  },
};

const initialProductListState: IProductListState = {
  currentPage: 0,
  pages: 0,
  totalElements: 0,
  products: [],
};

const productReducer = (
  state = initialProductState,
  action: ProductActions
): IProductState => {
  switch (action.type) {
    case ProductActionTypes.PRODUCT_GET: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case ProductActionTypes.PRODUCT_CREATE: {
      return {
        ...state,
      };
    }
    case ProductActionTypes.PRODUCT_EDIT: {
      return {
        ...state,
      };
    }
    case ProductActionTypes.PRODUCT_REMOVE: {
      return {
        ...state,
      };
    }
    case ProductActionTypes.PRODUCT_SET_SAVED: {
      if (action.productId === state.product.id) {
        return {
          ...state,
          product: { ...state.product, isSaved: !state.product.isSaved },
        };
      }
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

const productListReducer = (
  state = initialProductListState,
  action: ProductActions
): IProductListState => {
  switch (action.type) {
    case ProductActionTypes.PRODUCT_LIST_GET: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case ProductActionTypes.PRODUCT_LIST_BY_FILTER_GET: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case ProductActionTypes.PRODUCT_SET_SAVED: {
      const newList = state.products.map((product) => {
        if (product.id === action.productId) {
          return { ...product, isSaved: !product.isSaved };
        }
        return product;
      });
      return {
        ...state,
        products: newList,
      };
    }
    default:
      return state;
  }
};

const productCombinedReducer = combineReducers({
  item: productReducer,
  list: productListReducer,
});

export default productCombinedReducer;
