import { useEffect, useState } from 'react';
import { useJwt } from "react-jwt";
import axios from 'axios';
import Loader from '../Loader/Loader';

export default function MyOrders() {
  const token = localStorage.getItem('accessToken');

  // Directly call useJwt hook in the component body
  const { decodedToken } = useJwt(token);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getOrders() {
    if (!decodedToken) return;
    setLoading(true);
    try {
      // Fetch Orders
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${decodedToken.id}`);
      console.log(data);
      setOrders(data);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred while fetching orders.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      getOrders();
    }
  }, [token, decodedToken]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>

      {loading && <Loader />}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && orders.length === 0 && <p>No orders found.</p>}

      <div>
        {orders.map(order => (
          <div key={order.id}>
            <div>
            {/* User Information */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold">Customer Information</h3>
              <p className="text-gray-700"><strong>Name:</strong> {order.user.name}</p>
              <p className="text-gray-700"><strong>Email:</strong> {order.user.email}</p>
              <p className="text-gray-700"><strong>Phone:</strong> {order.user.phone}</p>
            </div>

            {/* Order Information */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold">Order Information</h3>
              <p className="text-gray-700"><strong>Order ID:</strong> {order._id}</p>
              <p className="text-gray-700"><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              <p className="text-gray-700"><strong>Total Price:</strong> {order.totalOrderPrice} EGP</p>
              <p className="text-gray-700"><strong>Payment Method:</strong> {order.paymentMethodType}</p>
              <p className="text-gray-700"><strong>Paid:</strong> {order.isPaid ? 'Yes' : 'No'}</p>
              <p className="text-gray-700"><strong>Delivered:</strong> {order.isDelivered ? 'Yes' : 'No'}</p>
            </div>
            </div>

            {/* Cart Items Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Product Image</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Product Title</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Brand</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Category</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Price</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Quantity</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.cartItems.map((item) => (
                    <tr key={item._id} className="border-t border-gray-300">
                      <td className="px-6 py-4">
                        <img src={item.product.imageCover} alt={item.product.title} className="w-16 h-16 object-cover" />
                      </td>
                      <td className="px-6 py-4 text-gray-700">{item.product.title}</td>
                      <td className="px-6 py-4 text-gray-700">{item.product.brand.name}</td>
                      <td className="px-6 py-4 text-gray-700">{item.product.category.name}</td>
                      <td className="px-6 py-4 text-gray-700">{item.price} EGP</td>
                      <td className="px-6 py-4 text-gray-700">{item.count}</td>
                      <td className="px-6 py-4 text-gray-700">{item.price * item.count} EGP</td>
                    </tr>
                  ))}
                  <tr className="border-t border-gray-300">
                    <td colSpan="6" className="px-6 py-4 text-right text-lg font-semibold text-gray-700">Total Price:</td>
                    <td className="px-6 py-4 text-gray-700">{order.totalOrderPrice} EGP</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br /><br /><br /><br />
          </div>
        ))}
      </div>
    </div>
  );
}