import axios from "axios";
import { toast } from "react-toastify";
import { APP_ENV } from "./env";
import { store } from "./store";
import { IsLoadingActionsTypes } from "./store/loadingReducer/isLoadingReducer";

const http = axios.create({
  baseURL: APP_ENV.REMOTE_HOST_NAME,
  headers: {
    "Content-type": "application/json",
  },
});

http.interceptors.request.use(
  (request: any) => {
    store.dispatch({ type: IsLoadingActionsTypes.SET_LOADING, payload: true });
    return Promise.resolve(request);
  },
  (error) => {
    store.dispatch({ type: IsLoadingActionsTypes.SET_LOADING, payload: false });
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response: any) => {
    store.dispatch({ type: IsLoadingActionsTypes.SET_LOADING, payload: false });
    return Promise.resolve(response);
  },
  (error) => {
    if (error.code === "ERR_NETWORK") {
      toast.error("Network Error");
    }

    store.dispatch({ type: IsLoadingActionsTypes.SET_LOADING, payload: false });
    return Promise.reject(error);
  }
);

export default http;
