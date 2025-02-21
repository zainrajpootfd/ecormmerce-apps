import { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProduct, setLatestProduct] = useState([]);

  useEffect(() => {
    setLatestProduct(products.slice(0, 10));
  }, [products]);
  return (
    <div className="py-10">
      <div className=" py-8">
        <Title text1="LATEST" text2="COLLECTION" />
        <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-10">
          {latestProduct.map((item, index) => (
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
    </div>
  );
};
export default LatestCollection;
