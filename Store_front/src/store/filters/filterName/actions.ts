import { Dispatch } from "react";
import http from "../../../http_common";
import ServiceResponse from "../../../ServiceResponse";
import { FilterNameActions, FilterNameActionType, IFilterNameCreate, IFilterNameUpdate, IFilterNameVM, IFilterProps } from "./types";


export const ConnectingFilterForProduct= (model:IFilterProps) => async (dispatch: Dispatch<FilterNameActions>)=>{
  const controller = new AbortController();
  try {
    const resp = await http.post("/api/Filters/create_update_filter",model,{
      signal:controller.signal
    });
      const { data } = resp;
      console.log("Responce get all filter name ", data);
  dispatch({
    type: FilterNameActionType.CONNECTING_FILTER_FOR_PRODUCT,
  });
  controller.abort();
  return Promise.resolve(data.message);

} catch (error: any) {
    const { data } = error.response;
    controller.abort();
    return Promise.reject(data.message);
}
}


export const GetAllFilterNames = () => async (dispatch: Dispatch<FilterNameActions>) => {
    try {

        const resp = await http.get<ServiceResponse<Array<IFilterNameVM>>>("/api/Filters/get_filter_names");
          const { data } = resp;
          console.log("Responce get all filter name ", data);
      dispatch({
        type: FilterNameActionType.GET_ALL_FILTER_NAMES,
        payload: data.payload
      });
      return Promise.resolve(data.message);
  
    } catch (error: any) {
        const { data } = error.response;
        return Promise.reject(data.message);
    }
  }

  export const GetFilterNameById = (id:number) => async (dispatch: Dispatch<FilterNameActions>) => {
    try {

        const resp = await http.get<ServiceResponse<IFilterNameVM>>(`/api/Filters/get_filter_name_by_id/${id}`);
          const { data } = resp;
          console.log("Responce get filter name by id", data);
      dispatch({
        type: FilterNameActionType.GET_FILTER_NAME_BY_ID,
        payload: data.payload
      });
      return Promise.resolve(data.payload);
  
    } catch (error: any) {
        const { data } = error.response;
        return Promise.reject(data.message);
    }
  }

  export const CreateFilterName = (model:IFilterNameCreate) => async (dispatch: Dispatch<FilterNameActions>) => {
    try {
      const resp = await http.post<ServiceResponse<IFilterNameVM>>("/api/Filters/create_filter_name",model);
      console.log("Responce create filter name ", resp);
      const { data } = resp;
      dispatch({
        type: FilterNameActionType.CREATE_FILTER_NAME,
        payload: data.payload
      });
      return Promise.resolve(data.message);
  
    } catch (error: any) {
        const { data } = error.response;
        return Promise.reject(data.message);
    }
  }

  export const UpdateFilterName = (model:IFilterNameUpdate) => async (dispatch: Dispatch<FilterNameActions>) => {
    try {
      const resp = await http.put<ServiceResponse<IFilterNameVM>>("/api/Filters/update_filter_name",model);
      console.log("Responce update filter name ", resp);
      const { data } = resp;
      dispatch({
        type: FilterNameActionType.UPDATE_FILTER_NAME,
        payload: data.payload
      });
      return Promise.resolve(data.message);
  
    } catch (error: any) {
        const { data } = error.response;
        return Promise.reject(data.message);
    }
  }

  export const UpdateReduxFilterName = (newList:IFilterNameVM[]) => async (dispatch: Dispatch<FilterNameActions>)=>{

    dispatch({
      type: FilterNameActionType.UPDATE_LIST_FILTER_NAME,
      payload: newList
    });
  }