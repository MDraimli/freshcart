import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "./authContext";
import axios from "axios";
export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  const [cartId, setCartId] = useState(null)

  const { accessToken } = useContext(AuthContext);
  const endpoint = "https://ecommerce.routemisr.com/api/v1/cart";
  const headers = {
    token: accessToken
  }

  async function addToCart(productId) {
    try {
      const { data } = await axios.post(endpoint, { productId }, { headers });
      setNumOfCartItems(data.numOfCartItems);
      setCartId(data.data._id);
      return data;
    }
    catch (error) {
      console.error(error);
    }
    finally {
      console.log("end of function");
    }
  }

  async function getCart() {
    try {
      const { data } = await axios.get(endpoint, { headers });
      setNumOfCartItems(data.numOfCartItems);
      setCartProducts(data.data);
      setCartId(data.data._id);
      console.log(data.data._id);
      return data;
    }
    catch (error) {
      console.error(error);
    }
  }

  async function removeFromCart(productId) {
    try {
      const { data } = await axios.delete(`${endpoint}/${productId}`, { headers });
      setNumOfCartItems(data.numOfCartItems);
      setCartProducts(data.data);
      setCartId(data.data._id);
      return data;
    }
    catch (error) {
      console.error(error);
    }
  }

  async function updateQuantity(productId, count) {
    try {
      const { data } = await axios.put(`${endpoint}/${productId}`, { count }, { headers });
      setCartProducts(data.data);
      setCartId(data.data._id);
      return data;
    }
    catch (error) {
      console.error(error);
    }
  }

  async function getPayment(url, shippingDetails) {
    try {
      const { data } = await axios.post(url, { shippingDetails }, { headers });
      return data;
    }
    catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    accessToken && getCart();
  }, [accessToken]);


  return <CartContext.Provider value={{ addToCart, getCart, numOfCartItems, setCartProducts, cartProducts, removeFromCart, updateQuantity, getPayment, cartId }}>{children}</CartContext.Provider>;
}