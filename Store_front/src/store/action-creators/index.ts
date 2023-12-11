import * as LoginActionCreators from "../auth/actions";
import * as CategoryActionCreators from "../category/actions";
import * as UserActionCreators from "../users/userActions/userSearchAction/actions";
import * as ProductActionCreators from "../products/actions";
import * as OrdersActionCreators from "../orders/actions";
import * as UserProfileActionCreators from "../users/userActions/userProfileAction/action";
import * as FilterGroupActionCreators from "../filters/groupFilters/actions";
import * as FilterValuesActionCreators from "../filters/filterValue/actions";
import * as FilterNamesActionCreators from "../filters/filterName/actions";
import * as ProductSearchActionCreators from "../productSearch/actions";
const actions = {
  ...LoginActionCreators,
  ...UserActionCreators,
  ...CategoryActionCreators,
  ...ProductActionCreators,
  ...UserProfileActionCreators,
  ...OrdersActionCreators,
  ...FilterGroupActionCreators,
  ...FilterValuesActionCreators,
  ...FilterNamesActionCreators,
  ...ProductSearchActionCreators,

};
export default actions;
