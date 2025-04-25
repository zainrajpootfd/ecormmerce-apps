import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { X } from "lucide-react"; // Import close icon for mobile

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <div
      className={`fixed md:relative top-0 left-0 h-screen bg-gray-100 w-64 p-6 flex flex-col gap-4 shadow-md transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-transform duration-300`}
    >
      {/* Close Button on Mobile */}
      <button
        className="absolute top-4 right-4 md:hidden p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
        onClick={() => setIsOpen(false)}
      >
        <X size={24} />
      </button>

      <NavLink
        to="/add"
        className="flex items-center gap-3 p-3 bg-white rounded-md shadow-sm hover:bg-gray-200 transition"
      >
        <img className="w-6" src={assets.add_icon} alt="Add" />
        <p className="text-gray-700">Add Item</p>
      </NavLink>
      <NavLink
        to="/list"
        className="flex items-center gap-3 p-3 bg-white rounded-md shadow-sm hover:bg-gray-200 transition"
      >
        <img className="w-6" src={assets.add_icon} alt="List" />
        <p className="text-gray-700">List</p>
      </NavLink>
      <NavLink
        to="/orders"
        className="flex items-center gap-3 p-3 bg-white rounded-md shadow-sm hover:bg-gray-200 transition"
      >
        <img className="w-6" src={assets.add_icon} alt="Orders" />
        <p className="text-gray-700">Orders</p>
      </NavLink>

      <NavLink
        to="/Shop"
        className="flex items-center gap-3 p-3 bg-white rounded-md shadow-sm hover:bg-gray-200 transition"
      >
        <p className="text-gray-700">
          {" "}
          🛒 <span className="ml-3">Shop</span>
        </p>
      </NavLink>
      <NavLink
        to="/Inventory"
        className="flex items-center gap-3 p-3 bg-white rounded-md shadow-sm hover:bg-gray-200 transition"
      >
        <p className="text-gray-700">
          {" "}
          📦 <span className="ml-3">Inventory</span>
        </p>
      </NavLink>
      <NavLink
        to="/StockTransfer"
        className="flex items-center gap-3 p-3 bg-white rounded-md shadow-sm hover:bg-gray-200 transition"
      >
        <p className="text-gray-700">
          {" "}
          📦 <span className="ml-3">StockTranfer</span>
        </p>
      </NavLink>
    </div>
  );
};
export default Sidebar;
