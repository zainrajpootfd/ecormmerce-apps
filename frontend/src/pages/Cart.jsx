import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartItem from "../components/CartItem";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    let tempData = [];

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        } catch (error) {
          console.error("Error calculating cart count:", error);
        }
        setCartData(tempData);
      }
    }
  }, [cartItems]);
  return (
    <div className="border-t pt-12">
      <div className="text-left flex ">
        <Title text1="YOUR" text2="CART" />
      </div>
      <div className="border-t py-2">
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );
          return (
            <div className="flex items-start py-2 gap-5 border-b" key={index}>
              <img className="w-16 sm:w-20" src={productData.image[0]} alt="" />
              <div>
                <p className="text-sm sm:text-xl text-gray-500">
                  {productData.name}
                </p>
                <div className="flex items-center justify-between gap-5 sm:gap-28 md:gap-40 lg:gap-56 sm:mt-5 ">
                  <p className="text-slate-500 ">
                    {currency} {productData.price}
                  </p>
                  <p className=" border bg-slate-100 px-2 py-0 sm:px-3  sm:py-1">
                    {item.size}
                  </p>
                  <div className="flex  items-center gap-4 justify-between ">
                    <input
                      onChange={(e) =>
                        e.target.value === "" || e.target.value === 0
                          ? "null"
                          : updateQuantity(
                              item._id,
                              item.size,
                              Number(e.target.value)
                            )
                      }
                      type="number"
                      min={1}
                      defaultValue={item.quantity}
                      className="px-2 sm:px-3 py-1 max-w-10 sm:max-w-20 border sm:ml-20 mr-10 outline-none"
                    />
                    <img
                      onClick={() => updateQuantity(item._id, item.size, 0)}
                      src={assets.bin_icon}
                      className="w-4 inline-block cursor-pointer
                    "
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full my-20">
        <div className="flex justify-end">
          <CartItem />
        </div>
        <div className="w-full justify-end flex my-10">
          <button
            onClick={() => navigate("/place-order")}
            className="bg-black text-white px-2 py-2 rounded-sm hover:scale-105 transition-all ease-in-out"
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};
export default Cart;
