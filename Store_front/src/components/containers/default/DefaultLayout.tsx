import { Outlet } from "react-router-dom";
import { DefaultHeader } from "./header/DefaultHeader";
import { DefaultFooter } from "./footer/DefaultFooter";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";

import { useEffect, useState } from "react";

const DefaultLayout = () => {
 
  const { GoogleLogin } = useActions();


  // useGoogleOneTapLogin({
  //   onSuccess: async (credential) => {
  //     await GoogleLogin(credential.credential ?? "", false);
  //   },
  //   onError: () => {
  //     console.log("Login Failed");
  //   },
  //   disabled: isAuth,
  // });



  

  return (
    <>
     
      <DefaultHeader />
     
      <Outlet />
      <DefaultFooter />
    </>
  );
};

export default DefaultLayout;
