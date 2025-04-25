import { useState } from "react";
import TransferForm from "../components/TransferForm";
import TransfersList from "../components/TransferList";

export default function TransfersPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTransferCreated = () => {
    setRefreshKey((prev) => prev + 1); // Trigger list refresh
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Stock Transfers</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <TransferForm onSuccess={handleTransferCreated} />
        </div>
        <div>
          <TransfersList key={refreshKey} />
        </div>
      </div>
    </div>
  );
}
