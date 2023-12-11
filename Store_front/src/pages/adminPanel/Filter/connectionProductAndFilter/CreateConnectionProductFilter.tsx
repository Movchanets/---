import { Button } from "@mui/material";
import { useFormik } from "formik";
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { AutoCompleteProduct } from "../../../../components/common/autoCompletes/autoCompleteProduct/AutoCompleteProduct"

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import http from "../../../../http_common";
import ServiceResponse from "../../../../ServiceResponse";
import { IFilterProps } from "../../../../store/filters/filterName/types";

import { IProductAutoComplete } from "../../../../store/productSearch/types";
import { FiltersComponents } from "./FiltersComponents";



export const ConnectionProductAndFilterPage: React.FC = () => {

  const { GetAllFilterNames, UpdateReduxFilterName, ConnectingFilterForProduct } = useActions();
  const { list } = useTypedSelector(store => store.filterNames);

  const loadData = async () => {
    try {
      await GetAllFilterNames();
    } catch (e: any) {
      console.log("Erro: ", e);
    }
  }

  useEffect(() => {
    loadData();
  }, []);


  const onSubmitHandler = async (data: IFilterProps) => {
    console.log("model to send: ", data);
    try {
      await ConnectingFilterForProduct(data);
    }
    catch (error: any) {
      console.log("Error: ", error)
    }
  };

  const initialValue: IFilterProps = {
    productId: 0,
    connectionFilters: [],
    removeConnectionFilters: []
  }
  const formik = useFormik<IFilterProps>({
    initialValues: initialValue,
    onSubmit: onSubmitHandler
  })

  const { values, handleSubmit, setFieldValue } = formik;

  const handlerChangeCheckbox = (filterId: number, valueId: number, checked: boolean) => {
    var tempFilter = list.filter(e => e.id === filterId);
    var tempvalue = tempFilter[0].filterValues.filter(e => e.id == valueId);
    tempvalue[0].checked = checked;
  }

  const checkFilterValueHandler = (e: ChangeEvent<HTMLInputElement>, filterId: number, valueId: number) => {
    //update values checkbox
    handlerChangeCheckbox(filterId, valueId, e.target.checked);

    //Added element to list
    e.target.checked ?
      setFieldValue("connectionFilters", [...values.connectionFilters,
      { filterNameId: filterId, filterValueId: valueId }])
      :
      setFieldValue("connectionFilters",
        values.connectionFilters.filter(el => el.filterValueId != valueId)
      )

    //Added element to remove list
    !e.target.checked ?
      setFieldValue("removeConnectionFilters", [...values.removeConnectionFilters,
      { filterNameId: filterId, filterValueId: valueId }])
      :
      setFieldValue("removeConnectionFilters",
        values.removeConnectionFilters.filter(el => el.filterValueId != valueId)
      )
  }


  const autoCompleteProductHandel = async (product: IProductAutoComplete) => {
    console.log("click autocomplete", product);
    const resp = await http.get<ServiceResponse<number[]>>("/api/Filters/get_filters_value_id_by_product_id", { params: { id: product.id } });
    updateFilter(resp.data.payload);

    setFieldValue("connectionFilters", []);
    setFieldValue("removeConnectionFilters", []);
    setFieldValue("productId", product.id);
  }

  const updateFilter = (valuersId: Array<number>) => {
    setDefaultFilterValues();
    var tempListVule = [...list];
    for (let i = 0; i < tempListVule.length; i++) {
      var elementFilter = tempListVule[i];
      for (let j = 0; j < elementFilter.filterValues.length; j++) {
        var valueId = elementFilter.filterValues[j].id;

        if (valuersId.includes(valueId))
          tempListVule[i].filterValues[j].checked = true;
      }
    }

    UpdateReduxFilterName(tempListVule);
  }


  const setDefaultFilterValues = () => {
    var tempListVule = [...list];
    for (let i = 0; i < tempListVule.length; i++) {
      var elementFilter = tempListVule[i];
      for (let j = 0; j < elementFilter.filterValues.length; j++) {
        tempListVule[i].filterValues[j].checked = false;
      }
    }
    UpdateReduxFilterName(tempListVule);
  }



  return (
    <>
      <div className="container">
      <div className="row">
                    <div className="col text-center">
                        <h2>
                            <strong>Налаштування продукту до фільтрів</strong>
                        </h2>
                    </div>
                </div>
        <main className="row">
        <form onSubmit={handleSubmit}>

          <AutoCompleteProduct
            setSearchAutoComplete={autoCompleteProductHandel}
            style={{padding:"5px", borderRadius:"5px",borderWidth:"thin",  width:"500px", borderColor:"var(--blue)", margin:"10px 0px"}}/>
            <div className="col">
            <FiltersComponents
            callback={checkFilterValueHandler} />
            </div>
          
          <div className="col">
            <Button
              sx={{ mt: 1}}
              type="submit"
              variant="contained"
              disabled={!((values.connectionFilters.length > 0
                || values.removeConnectionFilters.length > 0)
                && values.productId > 0)}
            >
              Зберегти
            </Button>
          </div>
        </form>
        </main>
        
      </div>

    </>
  )
}