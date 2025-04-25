// import React, { useState, useEffect } from "react";
// import { backendUrl } from "../App";
// import axios from "axios";
// import { toast } from "react-toastify";

// const ProductPage = () => {
//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({ name: "", price: "" });

//   // Fetch products on component mount
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(`${backendUrl}/products`);
//         setProducts(response.data);
//       } catch (error) {
//         toast.error("Error fetching products");
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleAddProduct = async () => {
//     try {
//       await axios.post(`${backendUrl}/products`, newProduct);
//       setNewProduct({ name: "", price: "" });

//       // Re-fetch products to show the new one
//       const updatedProducts = await axios.get(`${backendUrl}/products`);
//       setProducts(updatedProducts.data);
//     } catch (error) {
//       toast.error("Error adding product");
//     }
//   };

//   const handleDeleteProduct = async (id) => {
//     try {
//       await axios.delete(`${backendUrl}/products/${id}`);
//       setProducts(products.filter((product) => product._id !== id));
//       toast.success("Product deleted successfully");
//     } catch (error) {
//       toast.error("Error deleting product");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold mb-4">Product Management</h1>
//       <div className="mb-4">
//         <input
//           type="text"
//           value={newProduct.name}
//           onChange={(e) =>
//             setNewProduct({ ...newProduct, name: e.target.value })
//           }
//           placeholder="Product Name"
//           className="p-2 border rounded-md mr-2"
//         />
//         <input
//           type="number"
//           value={newProduct.price}
//           onChange={(e) =>
//             setNewProduct({ ...newProduct, price: e.target.value })
//           }
//           placeholder="Product Price"
//           className="p-2 border rounded-md"
//         />
//         <button
//           onClick={handleAddProduct}
//           className="ml-4 p-2 bg-blue-500 text-white rounded-md"
//         >
//           Add Product
//         </button>
//       </div>

//       <div>
//         <h2 className="text-lg font-semibold">Product List</h2>
//         {products.length > 0 ? (
//           products.map((product) => (
//             <div key={product._id} className="border-b py-2">
//               <h3 className="font-semibold">{product.name}</h3>
//               <p>${product.price}</p>
//               <button
//                 onClick={() => handleDeleteProduct(product._id)}
//                 className="text-red-500"
//               >
//                 Delete
//               </button>
//             </div>
//           ))
//         ) : (
//           <p>No products found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductPage;
