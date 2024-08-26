import { useEffect, useState } from 'react'
import classes from './Products.module.css'
import axios from 'axios';
import Loader from '../Loader/Loader';
import Product from '../Product/Product';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [metadata, setMetaData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getProducts(page = 1) {
    setProducts([]);
    setLoading(true);
    try {
      // Fetch Recent Products
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}`);
      console.log(data);
      setMetaData(data.metadata);
      setProducts(data.data);
    } catch (error) {
      setError(error.response.data.message);
      setError(null);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getProducts();
  }, [])

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
          <div className="grid grid-cols-4 gap-4">
            {products.map(product => {
              return (
                <Product key={product._id} product={product} />
              )
            })}
          </div>
          <div className='flex justify-center align-items-center mt-4'>
            <nav aria-label="Page navigation example">
              <ul className="flex items-center -space-x-px h-10 text-base">
                <li>
                  <a href="#" onClick={() => getProducts(1)} className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span className="sr-only">Previous</span>
                    <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                    </svg>
                  </a>
                </li>
                {Array.from({ length: metadata.numberOfPages }, (_, i) => i + 1).map(page => (
                  <li key={page}>
                    <a
                      href="#"
                      onClick={() => getProducts(page)}
                      className={"flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white " + (metadata.currentPage === page ? "bg-green-600 text-white" : "")}
                    >
                      {page}
                    </a>
                  </li>
                ))}

                <li>
                  <a href="#" onClick={() => getProducts(metadata.numberOfPages)} className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span className="sr-only">Next</span>
                    <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>

          </div>
        </div>
      </section>
    </>
  )
}
