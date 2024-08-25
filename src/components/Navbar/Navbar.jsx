import { useContext, useEffect, useState } from 'react'
import classes from './Navbar.module.css'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/images/freshcart-logo.svg'
import { AuthContext } from '../../context/authContext'

export default function Navbar() {
  const { accessToken, setAccessToken } = useContext(AuthContext);
  function handleLogout() {
    localStorage.removeItem('accessToken');
    setAccessToken(null);
  }
  return (
    <>
      <nav className='bg-gray-100 p-4 static lg:fixed top-0 end-0 start-0'>
        <div className='container mx-auto'>
          <div className='flex justify-between flex-col lg:flex-row'>
            <div className='flex items-center flex-col lg:flex-row'>
              <Link to='' className='text-2xl font-bold text-gray-800'>
                <img src={logo} alt="" />
              </Link>
              {
                accessToken &&

                <ul className='flex flex-col lg:flex-row items-center'>
                  <li className='my-2 lg:my-0'>
                    <NavLink className={"p-2"} to={""}>Home</NavLink>
                  </li>
                  <li className='my-2 lg:my-0'>
                    <NavLink className={"p-2"} to={"/products"}>products</NavLink>
                  </li>
                  <li className='my-2 lg:my-0'>
                    <NavLink className={"p-2"} to={"/categories"}>Categories</NavLink>
                  </li>
                  <li className='my-2 lg:my-0'>
                    <NavLink className={"p-2"} to={"/brands"}>Brands</NavLink>
                  </li>
                  <li className='my-2 lg:my-0'>
                    <NavLink className={"p-2"} to={"/cart"}>Cart</NavLink>
                  </li>
                </ul>
              }
            </div>
            <div>
              <ul className='flex flex-col lg:flex-row items-center'>
                {
                  accessToken ?
                    <li className='my-2 lg:my-0'>
                      <Link onClick={handleLogout} className={"p-2"}>Logout</Link>
                    </li>

                    :
                    <>
                      <li className='my-2 lg:my-0'>
                        <NavLink className={"p-2"} to={"/login"}>Login</NavLink>
                      </li>
                      <li className='my-2 lg:my-0'>
                        <NavLink className={"p-2"} to={"/register"}>Register</NavLink>
                      </li>
                    </>
                }

                <li className='my-2 lg:my-0'>
                  <a href="#"><i className="fab fa-facebook mx-2"></i></a>
                  <a href="#"><i className="fab fa-twitter mx-2"></i></a>
                  <a href="#"><i className="fab fa-youtube mx-2"></i></a>
                  <a href="#"><i className="fab fa-instagram mx-2"></i></a>
                  <a href="#"><i className="fab fa-tiktok mx-2"></i></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
