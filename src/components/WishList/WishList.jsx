import { useContext, useEffect, useState } from 'react'
import classes from './WishList.module.css'
import axios from 'axios';
import Loader from '../Loader/Loader';
import Product from '../Product/Product';
import { WishListContext } from '../../context/wishListContext';
import { AuthContext } from '../../context/authContext';

export default function WishList() {
  const {wishList, getWishList} = useContext(WishListContext);
  const {accessToken} = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  async function getWishListAgain() {
    try {
      const data = await getWishList();
      console.log(data);
      setProducts(data.data);
    } catch (error) {
      console.log(error);
    }
  }
useEffect(() => {
  accessToken && getWishListAgain();
}, [accessToken,wishList]);
  return (
    <>
      <section className='py-20'>
        <div className="container mx-auto">
          <div className="grid grid-cols-4 gap-4">
            {products.map(product => {
              return (
                <Product key={product._id} product={product} />
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
