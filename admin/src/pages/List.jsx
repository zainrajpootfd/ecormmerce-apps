// import axios from "axios";
// import { useEffect, useState } from "react";
// import { backendUrl } from "../App";
// import { toast } from "react-toastify";

// const List = ({ token }) => {
//   const [list, setList] = useState([]);

//   const fetchList = async () => {
//     try {
//       const response = await axios.get(backendUrl + "/api/product/list");
//       console.log(response.data);
//       if (response.data.success) {
//         setList(response.data.products);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching list:", error);
//       toast.error(error.message);
//     }
//   };

//   const removeProduct = async (id) => {
//     try {
//       const response = await axios.post(
//         backendUrl + "/api/product/remove",
//         { id },
//         { headers: { token } }
//       );
//       if (response.data.success) {
//         toast.success(response.data.message);
//         await fetchList();
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchList();
//   }, [token]);

//   return (
//     <>
//       <p className="mb-2">All Products List </p>
//       <div className="flex flex-col gap-2">
//         <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-1 sm:grid-cols-[1fr_3fr_1fr_1fr_1fr] border px-2 py-2 rounded shadow-lg">
//           <b>Image</b>
//           <b>Name</b>
//           <b>Category</b>
//           <b>Price</b>
//           <b>Action</b>
//         </div>

//         {/* Scrollable Container */}
//         <div className="max-h-[80vh] overflow-y-auto  p-2">
//           {list.map((item, index) => (
//             <div
//               key={index}
//               className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-1 sm:grid-cols-[1fr_3fr_1fr_1fr_1fr] border px-2 py-1 rounded shadow-lg items-center"
//             >
//               <img className="w-16" src={item.image[0]} alt="Image" />
//               <p>{item.name}</p>
//               <p>{item.category}</p>
//               <p>{item.price}</p>
//               <p
//                 onClick={() => removeProduct(item._id)}
//                 className="cursor-pointer text-red-500 font-bold"
//               >
//                 X
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };
// export default List;

import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { Edit, Edit3 } from "lucide-react";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [editData, setEditData] = useState(null); // Holds the current product being edited

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
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
      toast.error(error.message);
    }
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/update",
        editData,
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Product updated!");
        setEditData(null); // Close modal
        fetchList(); // Refresh list
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, [token]);

  return (
    <>
      <p className="mb-2">All Products List</p>

      {/* Modal */}
      {editData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-2">Edit Product</h2>
            <input
              className="border p-2 mb-2 w-full"
              name="name"
              value={editData.name}
              onChange={handleEditChange}
              placeholder="Name"
            />
            <input
              className="border p-2 mb-2 w-full"
              name="category"
              value={editData.category}
              onChange={handleEditChange}
              placeholder="Category"
            />
            <input
              className="border p-2 mb-2 w-full"
              name="price"
              value={editData.price}
              onChange={handleEditChange}
              placeholder="Price"
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 px-4 py-1 rounded"
                onClick={() => setEditData(null)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-1 rounded"
                onClick={handleEditSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* List Table */}
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] sm:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] gap-1 border px-2 py-2 rounded shadow-lg">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Delete</b>
          <b>Edit</b>
        </div>

        <div className="max-h-[80vh] overflow-y-auto p-2">
          {list.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] sm:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] gap-1 border px-2 py-1 rounded shadow-lg items-center"
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
              <button
                onClick={() => setEditData(item)}
                className="cursor-pointer text-green-600 font-semibold"
              >
                <Edit3 size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default List;
