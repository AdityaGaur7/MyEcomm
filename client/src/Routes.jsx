import { Routes as RouterRoutes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/user/Dashboard";
import Private from "./components/Routes/Private";
import AdminRoute from "./components/Routes/AdminRoute";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Products from "./pages/Admin/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AdminOrders from "./pages/Admin/AdminOrders";
import Wishlist from "./pages/user/Wishlist";
import Addresses from "./pages/user/Addresses";
import PaymentMethods from "./pages/user/PaymentMethods";
import Settings from "./pages/user/Settings";

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product/:slug" element={<ProductDetails />} />
      <Route path="/about" element={<About />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      
      {/* Protected User Routes */}
      <Route path="/dashboard" element={<Private />}>
        <Route path="user" element={<Dashboard />} />
        <Route path="user/orders" element={<Orders />} />
        <Route path="user/profile" element={<Profile />} />
        <Route path="user/wishlist" element={<Wishlist />} />
        <Route path="user/addresses" element={<Addresses />} />
        <Route path="user/payments" element={<PaymentMethods />} />
        <Route path="user/settings" element={<Settings />} />
      </Route>
      
      {/* Protected Admin Routes */}
      <Route path="/dashboard" element={<AdminRoute />}>
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/create-category" element={<CreateCategory />} />
        <Route path="admin/create-product" element={<CreateProduct />} />
        <Route path="admin/users" element={<Users />} />
        <Route path="admin/products" element={<Products />} />
        <Route path="admin/orders" element={<AdminOrders />} />
      </Route>
      
      {/* 404 Route */}
      <Route path="*" element={<Pagenotfound />} />
    </RouterRoutes>
  );
};

export default Routes; 