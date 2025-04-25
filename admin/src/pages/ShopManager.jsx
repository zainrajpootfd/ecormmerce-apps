// ShopManager.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { backendUrl } from "../App";

export default function ShopManager() {
  const [shops, setShops] = useState([]);
  const [form, setForm] = useState({ name: "", location: "" });
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchShops = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(backendUrl + "/api/shops");
      // Ensure data is an array before setting it
      setShops(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Failed to fetch shops");
      toast.error("Failed to fetch shops");
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (editingId) {
        await axios.put(`${backendUrl}/api/shops/${editingId}`, form);
        toast.success("Shop updated successfully");
      } else {
        await axios.post(`${backendUrl}/api/shops/create`, form);
        toast.success("Shop created successfully");
      }
      setForm({ name: "", location: "" });
      setEditingId(null);
      await fetchShops();
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed");
      console.error("Submit error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this shop?")) return;

    setIsLoading(true);
    try {
      await axios.delete(`${backendUrl}/api/shops/${id}`);
      toast.success("Shop deleted successfully");
      await fetchShops();
    } catch (err) {
      toast.error("Delete failed");
      console.error("Delete error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Toaster position="top-right" /> */}
      {<ToastContainer position="top-center" />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Form Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {editingId ? "Edit Shop" : "Add New Shop"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Shop Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    placeholder="Enter shop name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Location
                  </label>
                  <input
                    id="location"
                    name="location"
                    placeholder="Enter location"
                    value={form.location}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`px-4 py-2 rounded-md text-white font-medium ${
                      isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {isLoading
                      ? "Processing..."
                      : editingId
                      ? "Update Shop"
                      : "Create Shop"}
                  </button>

                  {editingId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(null);
                        setForm({ name: "", location: "" });
                      }}
                      disabled={isLoading}
                      className="ml-3 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Shop List Section */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">
                  Shop List
                </h2>
              </div>

              {isLoading && shops.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  Loading shops...
                </div>
              ) : shops.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  No shops found
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {shops.map((shop) => (
                    <li key={shop._id} className="px-6 py-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">
                            {shop.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {shop.location}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setForm({
                                name: shop.name,
                                location: shop.location,
                              });
                              setEditingId(shop._id);
                            }}
                            disabled={isLoading}
                            className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-md text-sm font-medium hover:bg-yellow-200 disabled:opacity-50"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(shop._id)}
                            disabled={isLoading}
                            className="px-3 py-1 bg-red-100 text-red-800 rounded-md text-sm font-medium hover:bg-red-200 disabled:opacity-50"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
