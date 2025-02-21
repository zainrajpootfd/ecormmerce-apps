import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, name, image, price }) => {
  const { currency } = useContext(ShopContext);
  return (
    <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer">
      <div className="overflow-hidden">
        <img
          src={image[0]}
          alt=""
          className=" hover:scale-110 transition ease-in-out object-cover "
        />
        <div className="flex flex-col gap-2 px-4 py-2 bg-white text-sm text-gray-600">
          <p className="text-sm pt-3 pb-1">{name}</p>
          <p className="text-sm font-medium">
            {currency}
            {price}
          </p>
        </div>
      </div>
    </Link>
  );
};
export default ProductItem;
