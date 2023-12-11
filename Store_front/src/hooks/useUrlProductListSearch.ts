import { useEffect, useState, useRef } from "react";
import { useTypedSelector } from "./useTypedSelector";
import { useSearchParams } from "react-router-dom";
import { filterNonNull } from "../helpers/helpers";
import { IFilterSearch } from "../store/products/types";
import { IProductSearchParams } from "../store/productSearch/types";
import qs from "qs";

const defaultCountOnPage = 20;

export const useUrlProductListSearch = (url: string) => {
  const getQsValues = (qsObj: any) => {
    var tempObj: IFilterSearch = {
      page: qsObj.page || 1,
      values: qsObj.values || [],
      categoryName: qsObj.categoryName || "",
      sort: qsObj.sort || "Price",
      countOnPage: qsObj.countOnPage || defaultCountOnPage,
    };

    return tempObj;
  };

  const { name, description, shortDescription, price, quantity } =
    useTypedSelector((store) => store.productSearch.productSearchItem);

  const urlValues: any = qs.parse(url, {
    ignoreQueryPrefix: true,
  });

  const [searchValue, setSearch] = useState<IFilterSearch>(getQsValues(urlValues));

  const isFirst = useRef<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (url) {
      if (isFirst.current) {
        isFirst.current = false;
        return;
      }

      setSearch(getQsValues(urlValues));
    }
  }, [url]);

  const setSearchValue = (newValue: IFilterSearch) => {
    setSearchParams("?" + qs.stringify(filterNonNull(newValue)));
  };

  const getProductDetailsLink = (id: number, category: string) => {
    const tempObg: IProductSearchParams = {
      name: "",
      description: "",
      shortDescription: "",
      quantity: 0,
      price: 0
    };

    const str = qs.stringify(filterNonNull(tempObg as any), {
      addQueryPrefix: true,
      serializeDate: (d) => {
        return new Date(d.setMinutes(0, 0, 0)).toISOString();
      },
    });

    return `/${category}/${id}/details${str}`;
  };

  return { searchValue, setSearchValue, getProductDetailsLink };
};
