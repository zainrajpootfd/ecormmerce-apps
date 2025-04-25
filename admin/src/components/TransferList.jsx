// //

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { backendUrl } from "../App";

// export default function TransfersList() {
//   const [transfers, setTransfers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchTransfers = async () => {
//       try {
//         const response = await axios.get(`${backendUrl}/api/transactions`);
//         setTransfers(Array.isArray(response.data) ? response.data : []);
//       } catch (err) {
//         setError("Failed to load transfers");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTransfers();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this transfer?"))
//       return;

//     try {
//       await axios.delete(`${backendUrl}/api/transactions/${id}`);
//       setTransfers((prev) => prev.filter((t) => t._id !== id));
//     } catch (err) {
//       setError("Failed to delete transfer");
//     }
//   };

//   if (loading)
//     return <div className="text-center py-8">Loading transfers...</div>;
//   if (error)
//     return <div className="text-red-500 text-center py-8">{error}</div>;

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4">Transfer History</h2>

//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Date
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Product
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 From
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 To
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Qty
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {transfers.map((transfer) => (
//               <tr key={transfer._id}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {new Date(transfer.transferDate).toLocaleString()}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                   {transfer.product?.name || "N/A"}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {transfer.fromShop?.name || "N/A"}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {transfer.toShop?.name || "N/A"}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {transfer.quantity}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   <button
//                     onClick={() => handleDelete(transfer._id)}
//                     className="text-red-600 hover:text-red-900"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../App";

export default function TransfersList() {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/transactions`, {
          params: {
            page: pagination.page,
            limit: pagination.limit,
          },
        });

        // Handle the structured response
        if (response.data.success) {
          setTransfers(response.data.data || []);
          setPagination((prev) => ({
            ...prev,
            total: response.data.pagination?.total || 0,
          }));
        } else {
          setError(response.data.message || "Failed to load transfers");
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load transfers"
        );
        console.error("Fetch transfers error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTransfers();
  }, [pagination.page, pagination.limit]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transfer?"))
      return;

    try {
      await axios.delete(`${backendUrl}/api/transactions/${id}`);
      setTransfers((prev) => prev.filter((t) => t._id !== id));
      // Refresh the count
      setPagination((prev) => ({ ...prev, total: prev.total - 1 }));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete transfer");
      console.error("Delete transfer error:", err);
    }
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  if (loading)
    return <div className="text-center py-8">Loading transfers...</div>;
  if (error)
    return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Transfer History</h2>

      <div className="overflow-x-auto mb-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                From
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                To
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Qty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transfers.length > 0 ? (
              transfers.map((transfer) => (
                <tr key={transfer._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(
                      transfer.transferDate || transfer.createdAt
                    ).toLocaleString()}
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transfer.productName || transfer.product?.name || "N/A"}
                  </td> */}

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transfer.productName ||
                      transfer.product?.name ||
                      (typeof transfer.product === "string"
                        ? "Loading..."
                        : "N/A")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transfer.fromShop?.name || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transfer.toShop?.name || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transfer.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleDelete(transfer._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No transfers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      {pagination.total > pagination.limit && (
        <div className="flex justify-between items-center">
          <button
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
            className="px-4 py-2 border rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {pagination.page} of{" "}
            {Math.ceil(pagination.total / pagination.limit)}
          </span>
          <button
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={
              pagination.page >= Math.ceil(pagination.total / pagination.limit)
            }
            className="px-4 py-2 border rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
