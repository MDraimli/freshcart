import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "./authContext";
import axios from "axios";
export const WishListContext = createContext();

export default function WishListContextProvider({ children }) {
  const [wishList, setWishList] = useState([]);

  const { accessToken } = useContext(AuthContext);
  const endpoint = "https://ecommerce.routemisr.com/api/v1/wishlist";
  const headers = {
    token: accessToken
  }

  async function addToWishList(productId) {
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

  async function getWishList() {
    try {
      const { data } = await axios.get(endpoint, { headers });
      setWishList(data.data);
      console.log(data.data._id);
      return data;
    }
    catch (error) {
      console.error(error);
    }
  }

  async function removeFromWishList(productId) {
    try {
      const { data } = await axios.delete(`${endpoint}/${productId}`, { headers });
      getWishList();
      return data;
    }
    catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    accessToken && getWishList();
  }, [accessToken]);


  return <WishListContext.Provider value={{ addToWishList, getWishList, setWishList, wishList, removeFromWishList }}>{children}</WishListContext.Provider>;
}