import { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        backendUrl + "/api/order/userOrders",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      } else {
        console.error("Error fetching order data:", response.data.message);
      }
    } catch (error) {}
  };
  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t">
      <div className="mt-8 flex justify-start font-light border-b">
        <Title text1="MY" text2="ORDERS" />
      </div>
      <div className="flex flex-col gap-4 relative w-full">
        {orderData.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col gap-3 sm:flex-row items-center justify-between w-full sm:px-4 py-4 border-b"
            >
              {/* Left Section - Image & Order Details */}
              <div className="flex items-center gap-5 ">
                <img
                  src={item.image[0]}
                  className="w-20 sm:w-20 mt-2"
                  alt={item.name}
                />
                <div>
                  <p className="font-light text-gray-700">{item.name}</p>
                  <div className="flex items-center gap-6 my-2 font-light">
                    <p>
                      {currency} {item.price}
                    </p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className="font-light">
                    Date: {new Date(item.date).toDateString()}
                  </p>
                  <p className="font-extralight">
                    Payment: {item.paymentMethod}
                  </p>
                </div>
              </div>

              {/* Right Section - Ready to Ship & Track Order */}
              <div className="flex items-center justify-between sm:w-[40%]  sm:p-2 gap-6">
                <div className="flex items-center gap-2">
                  <p className="bg-green-500 w-2.5 h-2.5 border rounded-full"></p>
                  <p className="font-light">{item.status}</p>
                </div>
                <button
                  onClick={loadOrderData}
                  className="font-light border border-gray-400 px-1 py-1 md:px-4 md:py-2 cursor-pointer"
                >
                  Track Order
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
