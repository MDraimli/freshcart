import React from 'react';
import classes from './Footer.module.css';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold mb-4">About FreshCart</h2>
          <p className="text-gray-400">
            FreshCart is your one-stop-shop for the freshest groceries, delivered to your doorstep.
          </p>
          <p className="text-gray-400 mt-2">
            © {new Date().getFullYear()} FreshCart. All rights reserved.
          </p>
        </div>
        
        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul>
            <li className="mb-2"><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
            <li className="mb-2"><a href="/products" className="text-gray-400 hover:text-white">Products</a></li>
            <li className="mb-2"><a href="/categories" className="text-gray-400 hover:text-white">Categories</a></li>
            <li className="mb-2"><a href="/brands" className="text-gray-400 hover:text-white">Brands</a></li>
            <li className="mb-2"><a href="/wishlist" className="text-gray-400 hover:text-white">Wish List</a></li>
            <li className="mb-2"><a href="/allorders" className="text-gray-400 hover:text-white">My Orders</a></li>
          </ul>
        </div>
        
        {/* Social Media */}
        <div>
          <h2 className="text-xl font-bold mb-4">Follow Us</h2>
          <ul className="flex space-x-4">
            <li><a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook"></i></a></li>
            <li><a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a></li>
            <li><a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-youtube"></i></a></li>
            <li><a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram"></i></a></li>
            <li><a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-tiktok"></i></a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}