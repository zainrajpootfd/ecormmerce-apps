import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      console.log(response.data);
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching list:", error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, [token]);

  return (
    <>
      <p className="mb-2">All Products List </p>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-1 sm:grid-cols-[1fr_3fr_1fr_1fr_1fr] border px-2 py-2 rounded shadow-lg">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {/* Scrollable Container */}
        <div className="max-h-[80vh] overflow-y-auto  p-2">
          {list.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-1 sm:grid-cols-[1fr_3fr_1fr_1fr_1fr] border px-2 py-1 rounded shadow-lg items-center"
            >
              <img className="w-16" src={item.image[0]} alt="Image" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p
                onClick={() => removeProduct(item._id)}
                className="cursor-pointer text-red-500 font-bold"
              >
                X
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default List;
