import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { setAuthUserByToken } from "./store/auth/actions";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "react-toastify/dist/ReactToastify.css";

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";

import "./date_picker.scss";

import { APP_ENV } from "./env";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

if (localStorage.token) {
  const { token } = localStorage;
  setAuthUserByToken(token, store.dispatch);
}

root.render(
  <GoogleOAuthProvider clientId={APP_ENV.GOOGLE_CLIENT_ID}>
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer autoClose={2000} />
        <App />
      </BrowserRouter>
    </Provider>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
