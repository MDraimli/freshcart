import { createContext } from "react";
import { useContext } from "react";
import { AuthContext } from "./authContext";
import axios from "axios";
export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const { accessToken } = useContext(AuthContext);
  const endpoint = "https://ecommerce.routemisr.com/api/v1/cart";
  const headers = {
    token: accessToken
  }

  async function addToCart(productId) {
    try {
      const { data } = await axios.post(endpoint, { productId }, { headers });
      return data;
    }
    catch (error) {
      console.error(error);
    }
    finally { 
        console.log("end of function");
    } 
  
  }

  return <CartContext.Provider value={{ addToCart }}>{children}</CartContext.Provider>;
}