import { useContext, useEffect, useState } from 'react'
import classes from './Checkout.module.css'
import { useFormik } from 'formik'
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { CartContext } from '../../context/cartContext';
import { toast } from 'react-toastify';

export default function Checkout() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { getPayment, cartId } = useContext(CartContext);
  const [isOnline, setIsOnline] = useState(false);

  const initialValues = {
    details: "",
    phone: "",
    city: ""
  }
  const validationSchema = Yup.object().shape({
    details: Yup.string().required('Name is required'),
    phone: Yup.string().required('Phone is required'),
    city: Yup.string().required('Name is required'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      submitForm(values);
    },
  });

  async function submitForm(values) {
    try {
      setIsLoading(true);
      let url = !isOnline ? `https://ecommerce.routemisr.com/api/v1/orders/${cartId}` : `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`;
      const response = await getPayment(url, values);
      /// success
      if (response.status === 'success') {
        if (isOnline) {
          window.location.href = response.session.url;
        }
        else {
          toast.success('Order placed successfully');
          setTimeout(() => {
            navigate('/allorders');
          }, 5000);
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.errors.msg);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <h1 className='text-3xl text-center'>Checkout</h1>
      {error && <div className="alert alert-error max-w-xl mx-auto">{error}</div>}
      <form className="max-w-xl mx-auto" onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input type="text" name="details" id="details" onChange={formik.handleChange}
            value={formik.values.details} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder="" />
          <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your details</label>
          {formik.errors.details && formik.touched.details && <p className='text-red-600'>{formik.errors.details}</p>}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input type="text" name="phone" id="phone" onChange={formik.handleChange}
            value={formik.values.phone} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder="" />
          <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your phone</label>
          {formik.errors.phone && formik.touched.phone && <p className='text-red-600'>{formik.errors.phone}</p>}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input type="text" name="city" id="city" onChange={formik.handleChange}
            value={formik.values.city} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder="" />
          <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your City</label>
          {formik.errors.city && formik.touched.city && <p className='text-red-600'>{formik.errors.city}</p>}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input type="checkbox" name="isOnline" id="isOnline" onChange={() => setIsOnline(!isOnline)}
            value={isOnline} className="peer" />
          <label htmlFor="isOnline" className="ms-2 peer-focus:font-medium text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Pay Online</label>
        </div>

        <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn">
          {isLoading ? <i className='fas fa-spinner fa-spin'></i> : isOnline ? 'Pay Online' : 'Pay Cash'}
        </button>

      </form>
    </>
  )
}
