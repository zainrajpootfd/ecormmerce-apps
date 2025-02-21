import { useContext, useState, useEffect } from "react";
import ProductItem from "../components/ProductItem";
import { ShopContext } from "../context/ShopContext";
import { HiChevronDown, HiChevronUp } from "react-icons/hi"; // Icons for toggle

const Collection = () => {
  const { products, searchTerm } = useContext(ShopContext); // Include `searchTerm` from context

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState("relevant");
  const [showFilters, setShowFilters] = useState(false); // Toggle state for filters

  // Update filtered products whenever filters, sort options, or searchTerm change
  useEffect(() => {
    let updatedProducts = [...products];

    // Filter by search term
    if (searchTerm) {
      updatedProducts = updatedProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by categories
    if (categories.length > 0) {
      updatedProducts = updatedProducts.filter((product) =>
        categories.includes(product.category)
      );
    }

    // Filter by subcategories
    if (subCategories.length > 0) {
      updatedProducts = updatedProducts.filter((product) =>
        subCategories.includes(product.subCategory)
      );
    }

    // Sort products
    if (sortOption === "lowToHigh") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "highToLow") {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updatedProducts);
  }, [categories, subCategories, sortOption, products, searchTerm]);

  const handleCategoryChange = (category) => {
    setCategories(
      (prev) =>
        prev.includes(category)
          ? prev.filter((item) => item !== category) // Remove if already selected
          : [...prev, category] // Add if not selected
    );
  };

  const handleSubCategoryChange = (subCategory) => {
    setSubCategories((prev) =>
      prev.includes(subCategory)
        ? prev.filter((item) => item !== subCategory)
        : [...prev, subCategory]
    );
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between gap-6 w-full border-t-2 border-gray-300">
      {/* Filters */}
      <div className="mt-5 lg:mt-14">
        {/* Filter toggle button for small/medium screens */}
        <div
          className="flex items-center justify-between lg:hidden cursor-pointer p-2 "
          onClick={() => setShowFilters(!showFilters)}
        >
          <p className="text-xl font-medium">FILTERS</p>
          {showFilters ? (
            <HiChevronUp size={24} />
          ) : (
            <HiChevronDown size={24} />
          )}
        </div>
        {/* Filter options */}
        <div
          className={`${
            showFilters ? "block" : "hidden"
          } lg:block transition-all duration-300`}
        >
          <div className="pt-5">
            <p className="text-2xl hidden lg:block">FILTERS</p>
            <div className="border w-64 px-6 my-5">
              <p className="text-xl font-light py-2">CATEGORIES</p>
              {["Men", "Women", "Kids"].map((category) => (
                <div key={category} className="flex items-center gap-4 my-2">
                  <input
                    type="checkbox"
                    onChange={() => handleCategoryChange(category)}
                    checked={categories.includes(category)}
                  />
                  <p className="font-light">{category}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="border w-64 px-6 my-5">
              <p className="text-xl font-light py-2">TYPE</p>
              {["Topwear", "Bottomwear", "Winterwear"].map((subCategory) => (
                <div key={subCategory} className="flex items-center gap-4 my-2">
                  <input
                    type="checkbox"
                    onChange={() => handleSubCategoryChange(subCategory)}
                    checked={subCategories.includes(subCategory)}
                  />
                  <p className="font-light">{subCategory}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right side of collections */}
      <div className="w-full px-2">
        <div className="flex flex-col md:flex-row items-center justify-between mt-10">
          <div className="inline-flex items-center gap-2">
            <p className="text-xl sm:text-3xl text-gray-500 py-2">
              ALL <span className="text-gray-900 font-bold">COLLECTIONS</span>
            </p>
            <p className="w-8 sm:w-11 h-[2px] bg-[#414141]"></p>
          </div>
          <div className="border border-gray-400 pr-2 sm:mr-7">
            <select
              className="px-2 py-2 bg-white text-gray-400 outline-none"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="relevant">Sort by: Price: Relevant</option>
              <option value="lowToHigh">Sort by: Price: Low To High</option>
              <option value="highToLow">Sort by: Price: High To Low</option>
            </select>
          </div>
        </div>
        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-9">
          {filteredProducts.map((item) => (
            <ProductItem
              key={item.id}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
