import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/cartContext';
import { toast } from 'react-toastify';
import { WishListContext } from '../../context/wishListContext';

export default function Product(props) {
  const { product } = props;
  const { addToCart } = useContext(CartContext);
  const { addToWishList, wishList, removeFromWishList } = useContext(WishListContext);

  const [isInWishList, setIsInWishList] = useState(checkProductWishList(product._id));

  async function addProductToCart(productId) {
    const response = await addToCart(productId);
    if (response.status === 'success') {
      toast.success(response.message);
    } else {
      toast.error("Something went wrong");
    }
  }

  function handleHeartClick(productId) {
    if (isInWishList) {
      removeProductFromWishList(productId);
    } else {
      addProductToWishList(productId);
    }
  }
  async function addProductToWishList(productId) {
    const response = await addToWishList(productId);
    if (response.status === 'success') {
      toast.success(response.message);
      setIsInWishList(true);
    } else {
      toast.error("Something went wrong");
    }
  }

  async function removeProductFromWishList(productId) {
    const response = await removeFromWishList(productId);
    if (response.status === 'success') {
      toast.success(response.message);
      setIsInWishList(false);
    } else {
      toast.error("Something went wrong");
    }
  }

  function checkProductWishList(productId) {
    return wishList.some(product => product._id === productId);
  }

  // Update isInWishList state when wishList changes
  useEffect(() => {
    setIsInWishList(checkProductWishList(product._id));
  }, [wishList, product._id]);

  return (
    <div className="bg-white p-4 shadow-md">
      <Link to={`/product-details/${product._id}/${product.category.name}`}>
        <img src={product.imageCover} alt={product.title} className="w-full h-64 object-cover" />
        <p className="text-sm text-gray-500">{product.category.name}</p>
        <h1 className="text-lg font-semibold line-clamp-1">{product.title}</h1>
        <p className="flex justify-between">
          <span className='text-lg font-semibold text-green-500'>{product.price} EGP</span>
          <span>
            <i className="fas fa-star text-yellow-400"></i> {product.ratingsAverage}
          </span>
        </p>
      </Link>
      <div className="flex justify-between items-center mt-2">
        <button onClick={() => addProductToCart(product._id)} className="bg-green-500 text-white px-4 py-2">Add to Cart</button>
        <i
          onClick={() => handleHeartClick(product._id)}
          className={`fa-solid fa-heart text-2xl cursor-pointer ${isInWishList ? 'text-red-500' : 'text-gray-500'}`}
        />
      </div>
    </div>
  );
}