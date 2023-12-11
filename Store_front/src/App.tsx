import { Route, Routes } from "react-router-dom";
import "./App.css";

import NotFoundPage from "./pages/notFound";
import DefaultLayout from "./components/containers/default";
import AdminLayout from "./components/containers/admin";
import { HelloAdmin } from "./components/containers/admin/listItems";
import UserList from "./pages/adminPanel/user/userList";
import UserInfo from "./pages/adminPanel/user/userInfo";
import Loader from "./components/common/Loader";
import AuthPage from "./pages/auth";
import AuthLayout from "./components/containers/auth";
import ForgetPasswordPage from "./pages/auth/forgetPassword";

import ResetPasswordPage from "./pages/auth/resetPassword";

import { ScrollToTop } from "./helpers/scrollToTop";
import OrderStatus from "./pages/order/list";
import SettingsPage from "./pages/settings";
import PersonalPage from "./pages/settings/personal";
import CreateCategoryAdminPage from "./pages/adminPanel/category/create";
import CategoryEditAdminPage from "./pages/adminPanel/category/edit";
import CategoryList from "./pages/adminPanel/category/list";

import CreateProduct from "./pages/adminPanel/products/create";
import EditProduct from "./pages/adminPanel/products/edit/EditProduct";
import OrdersList from "./pages/adminPanel/orders/list";
import ProductList from "./pages/adminPanel/products/list";
import ProductListPage from "./pages/product/productList/ProductListPage";
import ProductDetailPage from "./pages/product/productDetails/ProductDetailsPage";
import FilterListPage from "./pages/adminPanel/Filter/list/FilterListPage";
import { ConnectionProductAndFilterPage } from "./pages/adminPanel/Filter/connectionProductAndFilter/CreateConnectionProductFilter";
import CreateFilterName from "./pages/adminPanel/Filter/createName";
import EditFilterNamePage from "./pages/adminPanel/Filter/editName/EditFilterNamePage";
import EditFilterValuePage from "./pages/adminPanel/Filter/editValue/EditFilterValuePage";
import CreateFilterValue from "./pages/adminPanel/Filter/createValue/CreateFilterValue";
import CreateFilterGroupPage from "./pages/adminPanel/Filter/createFilerGroup/CreateFilterGroup";
import SavedProducts from "./pages/saved/list/SavedProducts";
import { Cart } from "./components/common/OrderCart/Cart";
import VerifyEmailPage from "./components/containers/auth/verifyEmail/VerifiyEmailPage";
import VerificationLinkPage from "./components/containers/auth/verificationLink/VerificationLinkPage";


declare global {
  interface Window {
    google: any;
    [key: string]: any;
  }
}

function App() {
  return (
    <>
      <Loader />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<ProductListPage />} />

         
          <Route path="settings">
            <Route index element={<SettingsPage />} />
            <Route path="orders" element={<OrderStatus />} />
            <Route path="personal" element={<PersonalPage />} />
           
            
          </Route>
          <Route path="saved" element={<SavedProducts />} />
          <Route path="cart" element={<Cart />} />
          <Route path="products">
            <Route path="search/:categoryName" element={<ProductListPage />} />
            
          </Route>
          <Route path="/:categoryName/:ID/details" element={<ProductDetailPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="sign-in" element={<AuthLayout />}>
          <Route index element={<AuthPage />} />
          <Route path="forgetPassword" element={<ForgetPasswordPage />} />
          <Route path="resetPassword" element={<ResetPasswordPage />} />
          <Route path="verifyEmail" element={<VerifyEmailPage />} />
          <Route path="verificationLink/:email" element={<VerificationLinkPage />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<HelloAdmin />} />

          <Route path="users">
            <Route index element={<UserList />} />
            <Route path="editeProfile/:userId" element={<UserInfo />} />
          </Route>

          <Route path="category">
            <Route index element={<CategoryList />} />
            <Route path="create" element={<CreateCategoryAdminPage />} />
            <Route path="edit/:id" element={<CategoryEditAdminPage />} />
          </Route>

        

          <Route path="products">
            <Route index element={<ProductList />} />
            <Route path="create" element={<CreateProduct />} />
            <Route path="edit/:id" element={<EditProduct />} />
          </Route> 

         

         

           <Route path="orders">
            <Route index element={<OrdersList />} />
           
          </Route>

          <Route path="filter">
            <Route index element={<FilterListPage />} />
            <Route path="connection" element={<ConnectionProductAndFilterPage />} />
            <Route path="name">
              <Route path="create" element={<CreateFilterName />} />
              <Route path="edit/:id" element={<EditFilterNamePage />} />
            </Route>

            <Route path="value">
              <Route path="create" element={<CreateFilterValue />} />
              <Route path="edit/:id" element={<EditFilterValuePage />} />
            </Route>

            <Route path="group">
              <Route path="create" element={<CreateFilterGroupPage />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
