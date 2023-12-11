import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { AuthFooter } from "./footer/AuthFooter";
import { AuthHeader } from "./header/AuthHeader";

const AuthLayout = () => {
  const { isAuth } = useTypedSelector((store) => store.login);
  const { pathname } = useLocation();
  const navigator = useNavigate();

  const allowedPages = ["/sign-in/verifyEmail", "/sign-in/resetPassword"];

  useEffect(() => {
    if (isAuth && !allowedPages.includes(pathname)) navigator("/");
  }, [isAuth, pathname]);

  return (
    <>
      <AuthHeader />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <Outlet />
            <AuthFooter />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
