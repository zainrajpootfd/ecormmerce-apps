import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
const InventoryPage = () => {
  const [inventory, setInventory] = useState([]);
  const [shops, setShops] = useState([]);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    shopId: "",
    productId: "",
    quantity: 0,
  });
  const [editingId, setEditingId] = useState(null);
  const fetchInventory = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/inventory`);
      // Inventory is in data.data array
      setInventory(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      toast.error("Failed to load inventory");
      setInventory([]);
    }
  };

  // Fetch shops and products for dropdowns
  //
  const fetchShopsAndProducts = async () => {
    try {
      const [shopsRes, productsRes] = await Promise.all([
        axios.get(`${backendUrl}/api/shops`),
        axios.get(`${backendUrl}/api/product/list`),
      ]);

      // Shops response is an array directly in data
      setShops(Array.isArray(shopsRes.data) ? shopsRes.data : []);

      // Products response has a products array nested in data
      setProducts(
        Array.isArray(productsRes.data?.products)
          ? productsRes.data.products
          : []
      );
    } catch (err) {
      toast.error("Failed to load data");
      setShops([]);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchInventory();
    fetchShopsAndProducts();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.patch(`${backendUrl}/api/inventory/${editingId}`, formData);
        toast.success("Inventory updated!");
      } else {
        await axios.post(`${backendUrl}/api/inventory`, formData);
        toast.success("Inventory added!");
      }
      fetchInventory();
      setFormData({ shopId: "", productId: "", quantity: 0 });
      setEditingId(null);
    } catch (err) {
      toast.error(err.response?.data?.error || "Operation failed");
    }
  };

  // Handle edit
  const handleEdit = (item) => {
    setFormData({
      shopId: item.shopId?._id || item.shopId || "",
      productId: item.productId?._id || item.productId || "",
      quantity: item.quantity || 0,
    });
    setEditingId(item._id);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Delete this inventory item?")) {
      try {
        await axios.delete(`${backendUrl}/api/inventory/${id}`);
        toast.success("Deleted!");
        fetchInventory();
      } catch (err) {
        toast.error("Delete failed");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Inventory Management</h1>

      {/* Inventory Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Inventory" : "Add New Inventory"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shop
            </label>

            <select
              name="shopId"
              value={formData.shopId}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Shop</option>
              {(shops || []).map((shop) => (
                <option key={shop._id} value={shop._id}>
                  {shop.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product
            </label>

            <select
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Product</option>
              {(products || []).map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              min="0"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editingId ? "Update" : "Add"} Inventory
          </button>
        </form>
      </div>

      {/* Inventory List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Current Inventory</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Shop
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {(inventory || []).map((item) => (
                <tr key={item._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.shopId?.name || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.productId?.name || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex justify-between">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-yellow-600 hover:text-yellow-900 "
                    >
                      🖍
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
