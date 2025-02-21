import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { HiX } from "react-icons/hi";
import { assets } from "../assets/assets";

const SearchBar = () => {
  const { search, setSearch, searchTerm, setSearchTerm } =
    useContext(ShopContext);

  const handleClose = () => {
    setSearch(false);
    setSearchTerm("");
  };

  if (!search) return null; // Only show the search bar if `search` is true

  return (
    <div className="w-full border border-gray-400 flex justify-center items-center gap-4 mb-2">
      <div className="w-2/4 h-12 flex items-center justify-between px-4 my-4 border border-gray-400 rounded-full">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search here..."
          className="w-full outline-none ml-5"
        />
        <button>
          <img src={assets.search_icon} alt="search" className="w-5" />
        </button>
      </div>
      <HiX size={24} onClick={handleClose} className="cursor-pointer" />
    </div>
  );
};

export default SearchBar;
