import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders); // Assuming the response contains 'orders'
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error(error.message);
    }
  };
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchOrders();
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  return (
    <div>
      <h3 className="my-5">Orders Page</h3>
      <div>
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              className="grid grid-cols-1 lg:grid-cols-5 gap-4 p-4 border border-gray-300 rounded-lg shadow-sm mb-6"
            >
              {/* Column 1: Image */}
              <div className="flex justify-center items-center">
                <img
                  src={assets.parcel_icon}
                  alt="Parcel icon"
                  className="w-16 h-16"
                />
              </div>

              {/* Column 2: Order Details and Address */}
              <div className="flex flex-col justify-center items-start font-light">
                {order.items && order.items.length > 0 ? (
                  order.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="order-item">
                      <p className="py-0.5">
                        {item.name} x {item.quantity} {item.size}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No items in this order.</p>
                )}
                <p className="font-semibold">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <p className="mt-3">{order.address.street}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country}
                </p>
                <p>{order.address.phone}</p>
              </div>

              {/* Column 3: Payment Method and Date */}
              <div className="flex flex-col   font-light">
                <p>Items: {order.items.length}</p>
                <p className="mt-3">Method: {order.paymentMethod}</p>
                <p>Payment: {order.payment ? "Done" : "Pending"}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>

              {/* Column 4: Amount */}
              <div className="flex justify-center items-start">
                <p className="text-base font-light">${order.amount}</p>
              </div>

              {/* Column 5: Select (Order Status) */}
              <div className="flex justify-center items-start">
                <select
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status}
                  className="border px-2 py-1 rounded-md"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
