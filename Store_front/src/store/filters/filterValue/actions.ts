import { Dispatch } from "react";
import http from "../../../http_common";
import ServiceResponse from "../../../ServiceResponse";
import { FilterValuesActions, FilterValuesActionType, IFilterValueItem, IFilterValuesCreate, IFilterValueUpdate, IFilterValueVM } from "./types";


export const GetAllFilterValues = () => async (dispatch: Dispatch<FilterValuesActions>) => {
    try {

        const resp = await http.get<ServiceResponse<Array<IFilterValueVM>>>("/api/Filters/get_filter_values");
          const { data } = resp;

      dispatch({
        type: FilterValuesActionType.GET_ALL_FILTER_VALUES,
        payload: data.payload
      });
      return Promise.resolve(data.message);
  
    } catch (error: any) {
        const { data } = error.response;
        return Promise.reject(data.message);
    }
  }

  export const GetFilterValueById = (id:number) => async (dispatch: Dispatch<FilterValuesActions>) => {
    try {

        const resp = await http.get<ServiceResponse<IFilterValueItem>>(`/api/Filters/get_filter_value_by_id/${id}`);
          const { data } = resp;

      dispatch({
        type: FilterValuesActionType.GET_FILTER_VALUE_BY_ID,
        payload: data.payload
      });
      return Promise.resolve(data.payload);
  
    } catch (error: any) {
        const { data } = error.response;
        return Promise.reject(data.message);
    }
  }
  export const UpdateFilterValuesList = (list:Array<IFilterValueVM>) => async (dispatch: Dispatch<FilterValuesActions>) => {
    try {

      dispatch({
        type: FilterValuesActionType.CHENGE_CHECKED_FILTER_VALUES,
        payload:list
      });
      return Promise.resolve(list);
  
    } catch (error: any) {
        const { data } = error.response;
        return Promise.reject(data.message);
    }
  }

  export const CreateFilterValues = (model:IFilterValuesCreate) => async (dispatch: Dispatch<FilterValuesActions>) => {
    try {
        const resp = await http.post("/api/Filters/create_filter_value",model);
        const { data } = resp;

      dispatch({
        type: FilterValuesActionType.CREATE_FILTER_VALUES,
      });
      return Promise.resolve(data.message);
  
    } catch (error: any) {
        const { data } = error.response;
        return Promise.reject(data.message);
    }
  }

  export const UpdateFilterValue = (model:IFilterValueUpdate) => async (dispatch: Dispatch<FilterValuesActions>) => {
    try {
      const resp = await http.put<ServiceResponse<IFilterValueUpdate>>("/api/Filters/update_filter_value",model);
      console.log("Responce update filter value ", resp);
      const { data } = resp;
      dispatch({
        type: FilterValuesActionType.UPDATE_FILTER_VALUE,
        payload: data.payload
      });
      return Promise.resolve(data.payload);
  
    } catch (error: any) {
        const { data } = error.response;
        return Promise.reject(data.message);
    }
  }