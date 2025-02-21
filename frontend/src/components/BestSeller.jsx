import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    // console.log("product setBestSeller", bestProduct);
    setBestSeller(bestProduct.slice(1));
  }, [products]);
  return (
    <div className="py-10">
      <div className="text-center text-gray-700">
        <Title text1="BEST" text2="SELLERS" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-5">
        {bestSeller.map((item, index) => (
          <ProductItem
            key={index}
            name={item.name}
            image={item.image}
            price={item.price}
            id={item._id}
          />
        ))}
      </div>
    </div>
  );
};
export default BestSeller;
