import { useEffect, useState } from 'react'
import classes from './Categories.module.css'
import axios from 'axios';
import Loader from '../Loader/Loader';
import Product from '../Product/Product';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getCategories() {
    setLoading(true);
    try {
      // Fetch Recent Products
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/Categories');
      setCategories(data.data);
    } catch (error) {
      setError(error.response.data.message);
      setError(null);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getCategories();
  }, [])
  
  return (
    <>
      <section className='py-20'>
        <div className="container mx-auto">
          <h1>Categories</h1>
          {
            loading && <Loader />
          }
          {
            error && <div className='error bg-red-600 text-white p-3 border-red-800 border border-solid rounded-lg mt-2'>{error}</div>
          }
          <div className="grid grid-cols-5 gap-4">
            {categories.map(category => {
              return (
              <div key={category._id} className="flex flex-col items-center">
                <img src={category.image} alt={category.name} className="w-20 h-20 object-contain mb-2" />
                <span className="text-lg font-semibold">{category.name}</span>
              </div>
              ) 
            })}
          </div>
        </div>
      </section>
    </>
  )
}
