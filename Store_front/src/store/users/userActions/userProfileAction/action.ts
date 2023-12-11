import { Dispatch } from "react";
import http from "../../../../http_common";
import { toast } from "react-toastify";
import {
  UserProfileActionType,
  UserProfileActions,
} from "../../userReducers/userProfileReducer/userProfileReducer";
import { UserItem } from "../../types";
import ServiceResponse from "../../../../ServiceResponse";

export const LoadUserProfileData =
  (id: number) => async (dispatch: Dispatch<UserProfileActions>) => {
    try {
      const result = await http.get<ServiceResponse<UserItem>>(
        "/api/User/getById?id=" + id
      );
      // console.log("resp from server profile user : ", result.data);
      dispatch({
        type: UserProfileActionType.LOADING_USER_PROFILE_DATA,
        payload: {
          user: result.data.payload,
        },
      });
      toast.success("User profile data is loaded");
    } catch (err: any) {
      if (err.response) {
        const { data } = err.response;
        toast.error(data.message);
      }
    }
  };
