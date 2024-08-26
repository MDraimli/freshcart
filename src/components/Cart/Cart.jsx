import { useContext, useEffect, useState } from 'react'
import classes from './Cart.module.css'
import { CartContext } from '../../context/cartContext'
import { AuthContext } from '../../context/authContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { accessToken } = useContext(AuthContext);
  const { getCart, cartProducts, setCartProducts, numOfCartItems, removeFromCart, updateQuantity } = useContext(CartContext);


  async function deleteFromCart(productId) {
    const data = await removeFromCart(productId);
    if (data.status === 'success') {
      toast.success('Product removed from cart successfully');
    }
    else {
      toast.error('Failed to remove product from cart');
    }
  }

  async function getCartDetails() {
    const data = await getCart();
    if (data.status === 'success') {
      setCartProducts(data.data);
    }
  }

  async function updateProductQuantity(productId, count) {
    const data = await updateQuantity(productId, count);
    if (data.status === 'success') {
      toast.success('Product Quantity updated successfully');
    }
    else {
      toast.error('something went wrong');
    }
  }

  useEffect(() => {
    accessToken && getCartDetails();
  }, [accessToken]);


  return (
    <>
      {cartProducts && (
        <>
          <section className='py-20'>
            <div className="container mx-auto">
              <h1>Cart</h1>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className='flex justify-between'>
                  <h4 className='text-xl'>
                    Total items: <span className='text-green-600'>{numOfCartItems}</span>
                  </h4>
                  <h4 className='text-xl'>
                    Total Price: <span className='text-green-600'>{cartProducts.totalCartPrice} EGP</span>
                  </h4>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-16 py-3">
                        <span className="sr-only">Image</span>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Qty
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartProducts?.products?.map(product => (
                      <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="p-4">
                          <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title} />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {product.product.title}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <button onClick={() => updateProductQuantity(product.product.id, product.count - 1)} className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                              <span className="sr-only">Quantity button</span>
                              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                              </svg>
                            </button>
                            <div className="ms-3">
                              {product.count}
                            </div>
                            <button onClick={() => updateProductQuantity(product.product.id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                              <span className="sr-only">Quantity button</span>
                              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {product.price} EGP
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => deleteFromCart(product.product.id)}
                            className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Link to={'/checkout'} className="btn btn-primary w-full mt-4 flex justify-center rounded-xl" type='button'>Pay Now</Link>
            </div>
          </section>
        </>
      )
      }

    </>
  )
}
