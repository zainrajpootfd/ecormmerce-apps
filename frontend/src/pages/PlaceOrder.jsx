import { useState } from "react";
import { assets } from "../assets/assets";
import CartItem from "../components/CartItem";
import Title from "../components/Title";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    products,
    getCartAmount,
    delivery_fee,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    country: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!token) {
      navigate("/login");
      return;
    }
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const productData = structuredClone(
              products.find((product) => product._id === items)
            );
            if (productData) {
              productData.size = item;
              productData.quantity = cartItems[items][item];
              orderItems.push(productData);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };
      switch (method) {
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          console.log(response.data);
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
        case "stripe":
          // Implement Stripe payment integration here
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(response.data.message);
          }
          break;

        default:
          break;
      }
    } catch (error) {}
  };
  return (
    <form onSubmit={onSubmitHandler} className="border-t  mb-5">
      <div className="text-left flex mt-16 mb-5 ">
        <Title text1="DELIVERY" text2="INFORMATION" />
      </div>
      <div className="flex flex-col lg:flex-row justify-between  gap-6 ">
        <div className="w-full flex flex-col  gap-5  md:max-w-[480px]">
          <div className="flex gap-3 ">
            <input
              required
              type="text"
              placeholder="First name"
              onChange={onChangeHandler}
              name="firstName"
              value={formData.firstName}
              className="w-full rounded border border-gray-300 px-3.5 py-1.5"
            />
            <input
              required
              type="text"
              placeholder="Last name"
              onChange={onChangeHandler}
              name="lastName"
              value={formData.lastName}
              className="w-full rounded border border-gray-300 px-3.5 py-1.5"
            />
          </div>
          <input
            required
            type="email"
            placeholder="Email address"
            onChange={onChangeHandler}
            name="email"
            value={formData.email}
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
          />
          <input
            required
            type="text"
            placeholder="Street"
            onChange={onChangeHandler}
            name="street"
            value={formData.street}
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
          />
          <div className="flex gap-3 ">
            <input
              required
              type="text"
              placeholder="City"
              onChange={onChangeHandler}
              name="city"
              value={formData.city}
              className="w-full rounded border border-gray-300 px-3.5 py-1.5"
            />
            <input
              required
              type="text"
              placeholder="State"
              onChange={onChangeHandler}
              name="state"
              value={formData.state}
              className="w-full rounded border border-gray-300 px-3.5 py-1.5"
            />
          </div>
          <div className="flex gap-3 ">
            <input
              required
              type="number"
              placeholder="Zip Code"
              onChange={onChangeHandler}
              name="zipCode"
              value={formData.zipCode}
              className="w-full rounded border border-gray-300 px-3.5 py-1.5"
            />
            <input
              required
              type="text"
              placeholder="Country"
              onChange={onChangeHandler}
              name="country"
              value={formData.country}
              className="w-full rounded border border-gray-300 px-3.5 py-1.5"
            />
          </div>
          <input
            required
            type="number"
            placeholder="Phone"
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            className="w-full rounded border border-gray-300 px-3.5 py-1.5"
          />
        </div>
        <div className=" ">
          <div className=" ">
            <CartItem />
          </div>
          <div className="mt-8 ">
            <div className="mt-8 mb-6 text-xl flex item-center  gap-2 ">
              <p className="text-xl font-medium">
                <span className="text-gray-400">PAYMENT</span> METHOD
              </p>
              <hr className="w-8 sm:w-11 h-[2px] bg-[#414141] mt-3" />
            </div>
            <div className="flex flex-col  gap-3 w-2/2 sm:w-1/2  lg:w-full lg:flex-row ">
              <div
                onClick={() => setMethod("stripe")}
                className="flex item-center gap-3 border p-2 px-3 cursor-pointer"
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "stripe" ? "bg-green-400" : ""
                  }`}
                ></p>
                <img className="h-5 px-4" src={assets.stripe_logo} alt="" />
              </div>
              <div className="flex item-center gap-3 border p-2 px-3  cursor-not-allowed opacity-50">
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full  ${
                    method === "razorpay" ? "bg-green-400" : ""
                  }`}
                ></p>
                <img className="h-5 px-4" src={assets.razorpay_logo} alt="" />
              </div>
              <div
                onClick={() => setMethod("cod")}
                className="flex item-center lg:gap-3 border p-2 px-2 cursor-pointer"
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "cod" ? "bg-green-400" : ""
                  }`}
                ></p>
                <p className="h-5 px-2 text-xs font-medium">
                  CASH ON DELEVIERY
                </p>
              </div>
            </div>
          </div>
          <div className=" mt-8 flex justify-end md:w-1/2 lg:w-full">
            <button
              type="submit"
              className="bg-black text-white font-medium py-2 px-4 rounded  "
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default PlaceOrder;
