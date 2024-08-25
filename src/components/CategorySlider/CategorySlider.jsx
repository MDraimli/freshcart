import { useEffect, useState } from 'react'
import classes from './CategorySlider.module.css'
import axios from 'axios'
import Loader from '../Loader/Loader'
import Slider from "react-slick";

export default function CategorySlider() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3
  };

  async function getCategories() {
    try {
      setLoading(true)
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      setCategories(data.data)
      setError(null)
    }
    catch (error) {
      setError(error.response.data.message)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <>
      <section className='py-20'>
        <div className="container mx-auto">
          <h1>Shop Popular Categories</h1>
          {
            loading && <Loader />
          }
          {
            error && <div className='error bg-red-600 text-white p-3 border-red-800 border border-solid rounded-lg mt-2'>{error}</div>
          }
          {!loading && !error &&
            (
              <Slider {...settings}>
                {categories.map(category => {
                  return (
                    <div key={category._id} className='px-4'>
                      <img className={classes.categoryImage} src={category.image} alt={category.name} />
                      <h2>{category.name}</h2>
                    </div>
                  )
                })}
              </Slider>
            )
          }

        </div>
      </section>
    </>
  )
}
