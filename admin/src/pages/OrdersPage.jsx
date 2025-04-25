// import React, { useState, useEffect } from "react";
// import { backendUrl } from "../App";
// import axios from "axios";
// import { toast } from "react-toastify";

// const OrdersPage = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get(`${backendUrl}/orders`);
//         setOrders(response.data);
//       } catch (error) {
//         toast.error("Error fetching orders");
//       }
//     };

//     fetchOrders();
//   }, []);

//   const handleUpdateOrderStatus = async (orderId, status) => {
//     try {
//       await axios.put(`${backendUrl}/orders/${orderId}`, { status });
//       setOrders(
//         orders.map((order) =>
//           order._id === orderId ? { ...order, status } : order
//         )
//       );
//       toast.success("Order status updated");
//     } catch (error) {
//       toast.error("Error updating order status");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold mb-4">Order Management</h1>
//       <div>
//         {orders.length > 0 ? (
//           orders.map((order) => (
//             <div key={order._id} className="border-b py-2">
//               <h3 className="font-semibold">Order #{order._id}</h3>
//               <p>Status: {order.status}</p>
//               <select
//                 value={order.status}
//                 onChange={(e) =>
//                   handleUpdateOrderStatus(order._id, e.target.value)
//                 }
//                 className="p-2 border rounded-md"
//               >
//                 <option value="pending">Pending</option>
//                 <option value="shipped">Shipped</option>
//                 <option value="delivered">Delivered</option>
//               </select>
//             </div>
//           ))
//         ) : (
//           <p>No orders found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrdersPage;
