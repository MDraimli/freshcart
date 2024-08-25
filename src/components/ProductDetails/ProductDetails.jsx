import { useContext, useEffect, useState } from 'react'
import classes from './ProductDetails.module.css'
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useParams } from 'react-router-dom';
import Rating from '../Rating/Rating';
import RelatedProducts from '../RelatedProducts/RelatedProducts';
import Slider from "react-slick";
import { CartContext } from '../../context/cartContext';
import { toast } from 'react-toastify';


export default function ProductDetails() {
  const {addToCart} = useContext(CartContext);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [displayImage, setDisplayImage] = useState('');
  const { id } = useParams();

  async function addProductToCart(productId) {
    const response = await addToCart(productId);
    if(response.status === 'success') {
      toast.success(response.message); 
    }
    else {
      toast.error("something went wrong");
    }
  }

  async function getProductDetails() {
    setLoading(true);
    try {
      // Fetch Recent Products
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products/' + id);
      setProduct(data.data);
      setDisplayImage(data.data.imageCover);
      /// scroll window top
      window.scrollTo(0, 0);
    } catch (error) {
      setError(error.response.data.message);
      setError(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProductDetails();
  }, [id])
  return (
    <>
      <section className='py-20'>
        <div className="container mx-auto">
          {
            loading && <Loader />
          }
          {
            error && <div className='error bg-red-600 text-white p-3 border-red-800 border border-solid rounded-lg mt-2'>{error}</div>
          }
          {
            !loading && !error &&
            <div className="container mx-auto p-6">
              <div className="flex flex-col md:flex-row">

                <div className="md:w-1/2 p-4">
                  <Slider {...settings}>
                    {product.images?.map((image, index) => (
                      <img key={`slider-image`+ index} src={image} alt={product.title} className="w-full rounded-lg shadow-lg" />
                    ))}
                  </Slider>
                </div>

                <div className="md:w-1/2 p-4 flex flex-col">
                  <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

                  <p className="text-sm text-gray-500 mb-2">
                    <span className="font-semibold">Category:</span> {product?.category?.name}
                  </p>

                  <p className="text-gray-700 mb-4">
                    {product.description}
                  </p>

                  <p className="text-2xl font-bold text-green-600 mb-4">{product.price} EGP</p>

                  <div className="flex items-center mb-4">
                    <span className="text-yellow-500 mr-2">
                      <Rating rating={product.ratingsAverage} />
                    </span>
                    <span className="text-gray-600">({product.ratingsAverage}/5)</span>
                    <span className='italic text-gray-600'>{product.ratingsQuantity} User Rate this product</span>
                  </div>

                  <button onClick={()=> addProductToCart(product._id)} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300">
                    <i className="bi bi-cart-fill mr-2"></i> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          }

        </div>
      </section>

      <RelatedProducts />
    </>
  )
}
