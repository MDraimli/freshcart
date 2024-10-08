import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home';
import Layout from './components/Layout/Layout';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Brands from './components/Brands/Brands';
import Categories from './components/Categories/Categories';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
import Error from './components/Error/Error';
import AuthContextProvider from './context/authContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartContextProvider from './context/cartContext';
import WishListContextProvider from './context/wishListContext';
import Checkout from './components/Checkout/Checkout';
import MyOrders from './components/MyOrders/MyOrders';
import WishList from './components/WishList/WishList';

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <ProtectedRoute><Home /></ProtectedRoute>
        },
        {
          path: "/products",
          element: <Products />
        },
        {
          path: "/cart",
          element: <ProtectedRoute><Cart /></ProtectedRoute>
        },
        {
          path: "/brands",
          element: <ProtectedRoute><Brands /></ProtectedRoute>
        },
        {
          path: "/categories",
          element: <ProtectedRoute><Categories /></ProtectedRoute>
        },
        {
          path: "/checkout",
          element: <ProtectedRoute><Checkout /></ProtectedRoute>
        },
        {
          path: "/allorders",
          element: <ProtectedRoute><MyOrders /></ProtectedRoute>
        },
        {
          path: "/wishlist",
          element: <ProtectedRoute><WishList /></ProtectedRoute>
        },
        {
          path: "/register",
          element: <Register />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/product-details/:id/:category",
          element: <ProductDetails />
        },
        {
          path: "*",
          element: <NotFound />
        }
      ]
    }
  ]);
  return (
    <>
      <AuthContextProvider>
        <CartContextProvider>
        <WishListContextProvider>
          <RouterProvider router={router} />
          <ToastContainer />
        </WishListContextProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </>
  )
}

export default App
