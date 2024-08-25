import { useEffect, useState } from 'react'
import classes from './RecentProducts.module.css'
import axios from 'axios';
import Loader from '../Loader/Loader';
import Product from '../Product/Product';

export default function RecentProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getRecentProducts() {
    setLoading(true);
    try {
      // Fetch Recent Products
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      setProducts(data.data);
    } catch (error) {
      setError(error.response.data.message);
      setError(null);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getRecentProducts();
  }, [])
  
  return (
    <>
      <section className='py-20'>
        <div className="container mx-auto">
          <h1>Recent Products</h1>
          {
            loading && <Loader />
          }
          {
            error && <div className='error bg-red-600 text-white p-3 border-red-800 border border-solid rounded-lg mt-2'>{error}</div>
          }
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
