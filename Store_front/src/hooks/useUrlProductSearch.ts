import { useEffect } from "react";

import { useTypedSelector } from "./useTypedSelector";
import { useActions } from "./useActions";
import { useNavigate, useSearchParams } from "react-router-dom";
import { filterNonNull } from "../helpers/helpers";
import qs from "qs";
import { IProductSearchParams } from "../store/productSearch/types";

export const useUrlProductSearch = (url?: string) => {
  const {name, description ,shortDescription, price, quantity  } =
    useTypedSelector((store) => store.productSearch.productSearchItem);

  const navigate = useNavigate();
  const { SetProductSearchParams } = useActions();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (url) {
      const urlParams: any = qs.parse(url, {
        ignoreQueryPrefix: true,
      });

      var find: IProductSearchParams = {
        name: urlParams.name || "",
        description: urlParams.description || "",
        shortDescription: urlParams.shortDescription || "",
        quantity:Number.parseInt(urlParams.quantity) || 0,
        price: Number.parseFloat(urlParams.price) || 0,
      };

      SetProductSearchParams(find);
    }
  }, [url]);

  const setProductUrlParams = (
    productParams: IProductSearchParams,
    navigatePage?: string
  ) => {
    SetProductSearchParams(productParams);
    const str = qs.stringify(filterNonNull(productParams as any), {
      addQueryPrefix: true,
    
    });

    if (navigatePage) {
      navigate(`/${navigatePage}${str}`);
    } else setSearchParams(str);
  };

  return { setProductUrlParams };
};
