import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const InventoryReport = () => {
  const [inventory, setInventory] = useState([]);
  const [shops, setShops] = useState([]);
  const [transfers, setTransfers] = useState([]);
  //   const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all required data
  const fetchData = async () => {
    try {
      setLoading(true);
      const [inventoryRes, shopsRes, transfersRes, salesRes] =
        await Promise.all([
          axios.get(`${backendUrl}/api/inventory`),
          axios.get(`${backendUrl}/api/shops`),
          axios.get(`${backendUrl}/api/transactions`),
          //   axios.get(`${backendUrl}/api/sales`), // Assuming you have a sales endpoint
        ]);
      console.log("Inventory:", inventory);
      console.log("Shops:", shops);
      console.log("Transfers:", transfers);
      setInventory(inventoryRes.data.data || []);
      setShops(shopsRes.data || []);
      setTransfers(transfersRes.data.data || []);
      //   setSales(salesRes.data.data || []);
    } catch (err) {
      toast.error("Failed to load report data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Calculate transfer quantity for a product in a shop
  //   const getTransferQty = (shopId, productId) => {
  //     return transfers
  //       .filter((t) => t.toShopId === shopId && t.productId === productId)
  //       .reduce((sum, t) => sum + (parseInt(t.quantity) || 0), 0);
  //   };

  const getTransferQty = (shopId, productId) => {
    return transfers
      .filter((t) => t.toShop?._id === shopId && t.product?._id === productId)
      .reduce((sum, t) => sum + (parseInt(t.quantity) || 0), 0);
  };

  // Calculate sales quantity for a product in a shop
  //   const getSalesQty = (shopId, productId) => {
  //     return sales
  //       .filter((s) => s.shopId === shopId && s.productId === productId)
  //       .reduce((sum, s) => sum + (parseInt(s.quantity) || 0), 0);
  //   };

  //   const exportToCSV = () => {
  //     const headers = [
  //       "Shop",
  //       "Product",
  //       "Initial Qty",
  //       "Transferred In",
  //       //   "Sold",
  //       "Current Stock",
  //     ];

  //     const csvRows = shops.flatMap((shop) =>
  //       inventory
  //         .filter(
  //           (item) => item.shopId === shop._id || item.shopId?._id === shop._id
  //         )
  //         .map((item) => {
  //           const productId = item.productId?._id || item.productId;
  //           const transferQty = getTransferQty(shop._id, productId);
  //           //   const salesQty = getSalesQty(shop._id, productId);

  //           return [
  //             `"${shop.name}"`,
  //             `"${item.productId?.name || "Unknown Product"}"`,
  //             item.initialQuantity || 0,
  //             transferQty,
  //             // salesQty,
  //             item.quantity,
  //           ].join(",");
  //         })
  //     );

  //     const csvContent = [headers.join(","), ...csvRows].join("\n");

  //     const blob = new Blob([csvContent], { type: "text/csv" });
  //     const url = URL.createObjectURL(blob);
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.download = "inventory_report.csv";
  //     link.click();
  //   };

  const exportToCSV = () => {
    const headers = [
      "Shop",
      "Product",
      "Initial Qty",
      "Transferred In",
      "Current Stock",
    ];

    const csvRows = shops.flatMap((shop) =>
      inventory
        .filter(
          (item) => item.shopId === shop._id || item.shopId?._id === shop._id
        )
        .map((item) => {
          const productId = item.productId?._id || item.productId;
          const transferQty = getTransferQty(shop._id, productId);

          return [
            `"${shop.name}"`,
            `"${item.productId?.name || "Unknown Product"}"`,
            item.initialQuantity || 0,
            transferQty,
            item.quantity,
          ].join(",");
        })
    );

    const csvContent = [headers.join(","), ...csvRows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "inventory_report.csv";
    link.click();
  };

  if (loading) return <div className="text-center py-8">Loading report...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Inventory Report</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Shop-wise Inventory Status</h2>
          <button
            onClick={fetchData}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Refresh Data
          </button>
          <button
            onClick={exportToCSV}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ml-2"
          >
            Export to CSV
          </button>
        </div>

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
                  Initial Qty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Transferred In
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Sold
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Current Stock
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {shops.map((shop) =>
                inventory
                  .filter(
                    (item) =>
                      item.shopId === shop._id || item.shopId?._id === shop._id
                  )
                  .map((item) => {
                    const productId = item.productId?._id || item.productId;
                    const transferQty = getTransferQty(shop._id, productId);
                    // const salesQty = getSalesQty(shop._id, productId);

                    return (
                      <tr key={`${shop._id}-${productId}`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {shop.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.productId?.name || "Unknown Product"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.initialQuantity ?? item.quantity ?? 0}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {transferQty}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {/* {salesQty} */}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.quantity + transferQty}
                        </td>
                      </tr>
                    );
                  })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryReport;
