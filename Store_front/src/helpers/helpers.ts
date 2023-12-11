import { IFilterSearch } from "../store/products/types";
import { ISearch } from "../store/users/types";

export function filterNonNull(obj: ISearch | IFilterSearch) {
  return Object.fromEntries(Object.entries(obj).filter(([k, v]) => !!v));
}
