import { useContext, useEffect, useState } from 'react'
import classes from './Login.module.css'
import { useFormik } from 'formik'
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

export default function Login() {
  const [error, setError] = useState(null);  
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {setAccessToken} = useContext(AuthContext);

  const initialValues = {
    "email": "",
    "password": "",
  }
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
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
      const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values);
      console.log(response.data.token);
      
      /// success
      if(response.data.message === 'success'){
        setAccessToken(response.data.token);
        localStorage.setItem('accessToken', response.data.token);
        navigate('/');
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
      <h1 className='text-3xl text-center'>Login</h1>
      {error && <div className="alert alert-error max-w-xl mx-auto">{error}</div>}
      <form className="max-w-xl mx-auto" onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input type="email" name="email" id="email" onChange={formik.handleChange}
            value={formik.values.email} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder="" />
          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
          {formik.errors.email && formik.touched.email && <p className='text-red-600'>{formik.errors.email}</p>}

        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input type="password" name="password" id="password" onChange={formik.handleChange}
            value={formik.values.password} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder="" />
          <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password</label>
          {formik.errors.password && formik.touched.password && <p className='text-red-600'>{formik.errors.password}</p>}
        </div>

        <button  disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn">
          {isLoading? <i className='fas fa-spinner fa-spin'></i>: 'Login'}
          </button>

      </form>
    </>
  )
}
