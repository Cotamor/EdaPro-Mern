import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import Home from './pages/home/Home'
import Shipping from './pages/shipping/Shipping'
import Payment from './pages/payment/Payment'
import PlaceOrder from './pages/placeOrder/PlaceOrder'
import Order from './pages/order/Order'
import Profile from './pages/profile/Profile'
import OrderList from './pages/admin/orderList/OrderList'
import UserList from './pages/admin/userList/UserList'
import ProductEdit from './pages/admin/productEdit/ProductEdit'
import UserEdit from './pages/admin/userEdit/UserEdit'
import ProductList from './pages/admin/productList/ProductList'
import Error from './pages/error/Error'
import store from './store'
import { Provider } from 'react-redux'
import Product from './pages/product/Product'
import Cart from './pages/cart/Cart'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import { HelmetProvider } from 'react-helmet-async'
import PrivateRoute from './components/privateRoute/PrivateRoute'
import AdminRoute from './components/adminRoute/AdminRoute'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

// const PrivateRoute = () => {
//   console.log('private route')
//   return <Outlet />
// }
// const AdminRoute = () => {
//   console.log('admin route')
//   return <Outlet />
// }

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<Error />}>
      <Route index={true} element={<Home />} />
      <Route path="/search/:keyword" element={<Home />} />
      <Route path="/page/:pageNumber" element={<Home />} />
      <Route path="/search/:keyword/page/:pageNumber" element={<Home />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* REGISTER USERS */}
      <Route element={<PrivateRoute />}>
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      {/* ADMIN USERS */}
      <Route element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<OrderList />} />
        <Route path="/admin/productlist" element={<ProductList />} />
        <Route path="/admin/productlist/:pageNumber" element={<ProductList />} />
        <Route path="/admin/userlist" element={<UserList />} />
        <Route path="/admin/product/:id/edit" element={<ProductEdit />} />
        <Route path="/admin/user/:id/edit" element={<UserEdit />} />
      </Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
          <RouterProvider router={router} />
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
)

reportWebVitals()
