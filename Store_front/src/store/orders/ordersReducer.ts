import { combineReducers } from "redux";
import {
  ICartState,
  IOrderItem,
  IOrderState,
  IOrdersListState,
  IUserOrdersState,
  OrderActionTypes,
  OrderActions,
} from "./types";

const initialOrderState: IOrderState = {
  order: {
    id: 0,
    user: undefined,
    details: []
  },
};
const initialCartState: ICartState = {
  cart: {
    
    email: undefined,
    details: []
  },
};
const initialOrdersListState: IOrdersListState = {
  currentPage: 0,
  pages: 0,
  totalElements: 0,
  orders: [],
};

const initialUserOrdersState: IUserOrdersState = {
  orders: [],
  products: [],
};

const userOrdersReducer = (
  state = initialUserOrdersState,
  action: OrderActions
): IUserOrdersState => {
  switch (action.type) {
    case OrderActionTypes.ORDER_USER_GET: {
      return {
        ...state,
        orders: action.payload,
      };
    }
    case OrderActionTypes.ORDER_GET_PRODUCTS: {
      return {
        ...state,
        products: action.payload,
      };
    }

    default:
      return state;
  }
};

const orderReducer = (state = initialOrderState, action: OrderActions): IOrderState => {
  switch (action.type) {
    case OrderActionTypes.ORDER_GET: {
      return {
        ...state,
        ...action.payload,
      };
    }
    
    case OrderActionTypes.ORDER_REMOVE: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};
const CartReducer = (state = initialCartState, action: OrderActions): ICartState => {
  switch (action.type) {
   
    case OrderActionTypes.CART_ADD: {
      return {
        ...state,
        cart: {
          ...state.cart,
          details: [...state.cart.details, action.detail]
        }
      };
    }
    case OrderActionTypes.CART_REMOVE: {
      return {
        ...state,
        cart: {
          ...state.cart,
          details: state.cart.details.filter((item) => item?.product.id !== action.id)
        }
      };
    }
    case OrderActionTypes.CART_INCREASE: {
      return {
        ...state,
        cart: {
          ...state.cart,
          details: state.cart.details.map((item) => {
            if (item?.product.id === action.id) {
              return {
                ...item,
                quantity: item.quantity + 1
              }
            }
            return item;
          })
        }
      };
    }
    case OrderActionTypes.CART_DECREASE: {
      return {
        ...state,
        cart: {
          ...state.cart,
          details: state.cart.details.map((item) => {
            if (item?.product.id === action.id) {
              return {
                ...item,
                quantity: item.quantity - 1
              }
            }
            return item;
          })
        }
      };
    }
    case OrderActionTypes.CART_CLEAR: {
      return {
        ...state,
        cart: {
          ...state.cart,
          details: []
        }
      };
    }
    default:
      return state;
  }
};
const ordersListReducer = (
  state = initialOrdersListState,
  action: OrderActions
): IOrdersListState => {
  switch (action.type) {
    case OrderActionTypes.ORDERS_LIST_GET: {
      return {
        ...state,
        ...action.payload,
      };
    }
   

    default:
      return state;
  }
};

const ordersCombinedReducer = combineReducers({
  item: orderReducer,
  list: ordersListReducer,
  user: userOrdersReducer,
  cart : CartReducer
});

export default ordersCombinedReducer;
