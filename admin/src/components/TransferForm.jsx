import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";

export default function TransferForm({ onTransferSuccess }) {
  const [products, setProducts] = useState([]);
  const [shops, setShops] = useState([]);
  const [formData, setFormData] = useState({
    productId: "",
    fromShopId: "",
    toShopId: "",
    quantity: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productRes, shopRes] = await Promise.all([
          axios.get(`${backendUrl}/api/product/list`),
          axios.get(`${backendUrl}/api/shops`),
        ]);

        const productsData = productRes.data.products || [];
        setProducts(Array.isArray(productsData) ? productsData : []);
        setShops(Array.isArray(shopRes.data) ? shopRes.data : []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setMessage("Failed to load form data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     setMessage("");

  //     if (formData.fromShopId === formData.toShopId) {
  //       setMessage("From and To shop cannot be the same.");
  //       return;
  //     }

  //     try {
  //       // Send the transaction request
  //       const response = await axios.post(
  //         `${backendUrl}/api/transactions`,
  //         formData
  //       );
  //       setMessage("Transfer recorded successfully!");
  //       setFormData({
  //         productId: "",
  //         fromShopId: "",
  //         toShopId: "",
  //         quantity: "",
  //       });

  //       // Notify parent component
  //       if (onTransferSuccess) {
  //         onTransferSuccess(); // Refresh the list or other actions
  //       }
  //     } catch (err) {
  //       console.error("Transfer error:", err);
  //       setMessage(err.response?.data?.message || "Failed to record transfer.");
  //     }
  //   };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      console.log("Submitting transfer:", formData); // Add logging
      const response = await axios.post(
        `${backendUrl}/api/transactions`,
        formData
      );
      console.log("Transfer response:", response); // Log response

      if (response.data) {
        setMessage("Transfer recorded successfully!");
        setFormData({
          productId: "",
          fromShopId: "",
          toShopId: "",
          quantity: "",
        });
        if (onTransferSuccess) onTransferSuccess();
      } else {
        setMessage("Received empty response from server");
      }
    } catch (err) {
      console.error("Transfer error:", err.response?.data || err.message);
      setMessage(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Failed to record transfer"
      );
    }
  };

  if (loading)
    return <div className="text-center py-8">Loading form data...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Record Stock Transfer</h2>
      {message && (
        <div
          className={`mb-4 text-sm ${
            message.includes("success") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product
          </label>
          <select
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select Product</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>
          {products.length === 0 && (
            <p className="text-xs text-red-500">No products available</p>
          )}
        </div>

        {/* From Shop Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            From Shop
          </label>
          <select
            name="fromShopId"
            value={formData.fromShopId}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select Shop</option>
            {shops.map((shop) => (
              <option key={shop._id} value={shop._id}>
                {shop.name}
              </option>
            ))}
          </select>
        </div>

        {/* To Shop Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            To Shop
          </label>
          <select
            name="toShopId"
            value={formData.toShopId}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select Shop</option>
            {shops.map((shop) => (
              <option key={shop._id} value={shop._id}>
                {shop.name}
              </option>
            ))}
          </select>
        </div>

        {/* Quantity Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            min={1}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
