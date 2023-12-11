import { Dispatch } from "react";
import http from "../../../http_common";
import { GroupFilterActions, GroupFilterActionType, ICreateFilterGroupItem } from "./types";

export const UpgradeGroupFilter = (model:ICreateFilterGroupItem) => async (dispatch: Dispatch<GroupFilterActions>) => {
    try {

        const resp = await http.post("/api/Filters/upgrade_filter_group",model);
          const { data } = resp;

      dispatch({
        type: GroupFilterActionType.CREATE_GROUP_FILTER,
        newGroupElement: model
      });
      return Promise.resolve(data.message);
  
    } catch (error: any) {
        const { data } = error.response;
        return Promise.reject(data.message);
    }
  }