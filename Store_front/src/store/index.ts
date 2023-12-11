import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
//Reducers
import { IsLoadingReducer } from "./loadingReducer/isLoadingReducer";

import { UserProfileReducer } from "./users/userReducers/userProfileReducer/userProfileReducer";
import { CategoryReducer } from "./category/categoryReducer";
import { AuthReducer } from "./auth/authReducer";
import productCombinedReducer from "./products/productReducer";
import ordersCombinedReducer from "./orders/ordersReducer";
import { UserSearchReducer } from "./users/userReducers/userSearchReducer/userReducer";
import { FilterGroupReducer } from "./filters/groupFilters/filterGroupReducer";
import { FilterValuesReducer } from "./filters/filterValue/filterValuesReducer";
import { FilterNameReducer } from "./filters/filterName/filterNamesReducer";
import { ProductSearchReducer } from "./productSearch/productReducer";

export const rootReducer = combineReducers({
  login: AuthReducer,
  category: CategoryReducer,
  userSearch: UserSearchReducer,
  userProfile: UserProfileReducer,
  isLoading: IsLoadingReducer,
  product: productCombinedReducer,
  order: ordersCombinedReducer,
  groupFilters: FilterGroupReducer,
  filterValues: FilterValuesReducer,
  filterNames: FilterNameReducer,
  productSearch: ProductSearchReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: [thunk],
});
