import { useEffect, useState } from "react";
import { IProductAutoComplete } from "../store/productSearch/types";
import ServiceResponse from "../ServiceResponse";
import http from "../http_common";

export const useProductAutoComplete = () => {
  const [value, setValue] = useState<string>("");
  const [searchResult, setSearchResult] = useState<
    Array<IProductAutoComplete>
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (value) {
      const controller = new AbortController();

      const searchMethod = async () => {
        setLoading(true);

        try {
          const resp = await http.get<
            ServiceResponse<Array<IProductAutoComplete>>
          >(`/api/Product/get_by_query/${value}`,{
            signal: controller.signal
          });
          setSearchResult(resp.data.payload);
        } catch (error) {
          setSearchResult([]);
        }
        setLoading(false);
      };

      searchMethod();
      return () => controller.abort();
    } else {
      setSearchResult([]);
    }
  }, [value]);

  return {
    value,
    setValue,
    searchResult,
    loading,
  };
};