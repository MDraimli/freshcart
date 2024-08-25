import { useContext, useEffect, useState } from 'react'
import classes from './Product.module.css'
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/cartContext';
import { toast } from 'react-toastify';


export default function Product(props) {
  const { product } = props;
  const { addToCart } = useContext(CartContext);

  async function addProductToCart(productId) {
    const response = await addToCart(productId);
    if(response.status === 'success') {
      toast.success(response.message); 
    }
    else {
      toast.error("something went wrong");
    }
  }

  return (
    <>
      <div className="bg-white p-4 shadow-md">
        <Link to={`/product-details/${product._id}/${product.category.name}`}>
          <img src={product.imageCover} alt={product.title} className="w-full h-64 object-cover" />
          <p className="text-sm text-gray-500">{product.category.name}</p>
          <h1 className="text-lg font-semibold line-clamp-1">{product.title}</h1>
          {/* <p className="text-sm text-gray-500">{product.description}</p> */}
          <p className="flex justify-between"><span className='text-lg font-semibold text-green-500'>{product.price} EGP</span><span><i className="fas fa-star text-yellow-400"></i> {product.ratingsAverage}</span></p>
        </Link>
        <button onClick={() => addProductToCart(product._id)} className="bg-green-500 text-white px-4 py-2 mt-2 mx-auto">Add to Cart</button>
      </div>
    </>
  )
}
