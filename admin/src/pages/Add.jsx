// import { useState } from "react";
// import axios from "axios";
// import { assets } from "../assets/assets";
// import { backendUrl } from "../App";
// import { toast } from "react-toastify";

// const Add = ({ token }) => {
//   const [image1, setImage1] = useState(null);
//   const [image2, setImage2] = useState(null);
//   const [image3, setImage3] = useState(null);
//   const [image4, setImage4] = useState(null);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState("Men");
//   const [subCategory, setSubCategory] = useState("Topwear");
//   const [sizes, setSizes] = useState([]);
//   const [bestseller, setBestseller] = useState(false);

//   const handleImageChange = (e, setImage) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Create a new FormData object
//     const formData = new FormData();

//     // Append form fields
//     formData.append("name", name);
//     formData.append("description", description);
//     formData.append("price", price);
//     formData.append("category", category);
//     formData.append("subCategory", subCategory);
//     formData.append("sizes", JSON.stringify(sizes)); // Convert sizes array to string
//     formData.append("bestseller", bestseller);

//     // Append images using &&
//     image1 && formData.append("image1", image1);
//     image2 && formData.append("image2", image2);
//     image3 && formData.append("image3", image3);
//     image4 && formData.append("image4", image4);

//     try {
//       // Sending the form data with axios
//       const response = await axios.post(
//         backendUrl + "/api/product/add",
//         formData,
//         {
//           headers: {
//             token,
//           },
//         }
//       );

//       console.log("Form submitted successfully:", response);

//       // Reset form after successful submission
//       if (response.data.success) {
//         toast.success(response.data.message);
//         setName("");
//         setDescription("");
//         setPrice("");
//         setCategory("Men");
//         setSubCategory("Topwear");
//         setSizes([]);
//         setBestseller(false);
//         setImage1(null);
//         setImage2(null);
//         setImage3(null);
//         setImage4(null);
//       } else {
//         toast.error(error.data.message);
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       toast.error(error.message);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="flex flex-col items-start gap-2 w-full"
//     >
//       <div className="mb-2">
//         <h2>Upload Item</h2>
//       </div>
//       <div className="flex gap-2">
//         <label htmlFor="image1">
//           <img
//             className="w-20 h-20 cursor-pointer object-cover border"
//             src={image1 ? URL.createObjectURL(image1) : assets.upload_area}
//             alt="Upload"
//           />
//           <input
//             type="file"
//             id="image1"
//             className="hidden"
//             accept="image/*"
//             onChange={(e) => handleImageChange(e, setImage1)}
//           />
//         </label>
//         <label htmlFor="image2">
//           <img
//             className="w-20 h-20 cursor-pointer object-cover border"
//             src={image2 ? URL.createObjectURL(image2) : assets.upload_area}
//             alt="Upload"
//           />
//           <input
//             type="file"
//             id="image2"
//             className="hidden"
//             accept="image/*"
//             onChange={(e) => handleImageChange(e, setImage2)}
//           />
//         </label>
//         <label htmlFor="image3">
//           <img
//             className="w-20 h-20 cursor-pointer object-cover border"
//             src={image3 ? URL.createObjectURL(image3) : assets.upload_area}
//             alt="Upload"
//           />
//           <input
//             type="file"
//             id="image3"
//             className="hidden"
//             accept="image/*"
//             onChange={(e) => handleImageChange(e, setImage3)}
//           />
//         </label>
//         <label htmlFor="image4">
//           <img
//             className="w-20 h-20 cursor-pointer object-cover border"
//             src={image4 ? URL.createObjectURL(image4) : assets.upload_area}
//             alt="Upload"
//           />
//           <input
//             type="file"
//             id="image4"
//             className="hidden"
//             accept="image/*"
//             onChange={(e) => handleImageChange(e, setImage4)}
//           />
//         </label>
//       </div>
//       <div className="w-full">
//         <p className="mb-2">Product Name</p>
//         <input
//           className="w-full max-w-[500px] border px-3 py-2 rounded outline"
//           type="text"
//           placeholder="Type here"
//           required
//           onChange={(e) => setName(e.target.value)}
//           value={name}
//         />
//       </div>
//       <div className="w-full">
//         <p className="mb-2">Product description</p>
//         <textarea
//           className="w-full max-w-[500px] border px-3 py-2 rounded outline"
//           placeholder="Write content"
//           required
//           onChange={(e) => setDescription(e.target.value)}
//           value={description}
//         />
//       </div>
//       <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 w-full">
//         <div>
//           <p className="mb-2">Product Category</p>
//           <select
//             onChange={(e) => setCategory(e.target.value)}
//             className="w-full px-2 py-1 cursor-pointer"
//           >
//             <option value="Men">Men</option>
//             <option value="Women">Women</option>
//             <option value="Kids">Kids</option>
//           </select>
//         </div>
//         <div>
//           <p className="mb-2">Product Subcategory</p>
//           <select
//             onChange={(e) => setSubCategory(e.target.value)}
//             className="w-full px-2 py-1 cursor-pointer"
//           >
//             <option value="Topwear">Topwear</option>
//             <option value="Bottomwear">Bottomwear</option>
//             <option value="Winterwear">Winterwear</option>
//           </select>
//         </div>
//         <div>
//           <p className="mb-2">Price</p>
//           <input
//             type="number"
//             onChange={(e) => setPrice(e.target.value)}
//             value={price}
//             placeholder="25"
//             min={0}
//             className="px-2 py-1 w-full sm:w-[120px]"
//           />
//         </div>
//       </div>
//       <div>
//         <p className="mb-2">Product Sizes</p>
//         <div className="flex gap-3">
//           {["S", "M", "L", "XL", "XXL"].map((size) => (
//             <div
//               key={size}
//               onClick={() =>
//                 setSizes((prev) =>
//                   prev.includes(size)
//                     ? prev.filter((item) => item !== size)
//                     : [...prev, size]
//                 )
//               }
//               className={`cursor-pointer bg-slate-200 px-3 text-2xl ${
//                 sizes.includes(size) ? "ring-2 ring-pink-200" : ""
//               }`}
//             >
//               <p>{size}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="flex gap-3 mt-2">
//         <input
//           type="checkbox"
//           id="bestseller"
//           onClick={(e) => setBestseller((prev) => !prev)}
//           checked={bestseller}
//         />
//         <label className="cursor-pointer" htmlFor="bestseller">
//           Add to bestseller
//         </label>
//       </div>
//       <div className="mt-4">
//         <button className="py-3 w-28 bg-black text-white" type="submit">
//           ADD
//         </button>
//       </div>
//     </form>
//   );
// };

// export default Add;

import { useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  const [showPreview, setShowPreview] = useState(false); // Preview modal toggle

  const handleImageChange = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("sizes", JSON.stringify(sizes));
    formData.append("bestseller", bestseller);
    image1 && formData.append("image1", image1);
    image2 && formData.append("image2", image2);
    image3 && formData.append("image3", image3);
    image4 && formData.append("image4", image4);

    try {
      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setPrice("");
        setCategory("Men");
        setSubCategory("Topwear");
        setSizes([]);
        setBestseller(false);
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
        setShowPreview(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start gap-2 w-full"
      >
        <h2 className="mb-2">Upload Item</h2>
        <div className="flex gap-2">
          {[setImage1, setImage2, setImage3, setImage4].map(
            (setImage, index) => (
              <label key={index} htmlFor={`image${index + 1}`}>
                <img
                  className="w-20 h-20 cursor-pointer object-cover border"
                  src={
                    [image1, image2, image3, image4][index]
                      ? URL.createObjectURL(
                          [image1, image2, image3, image4][index]
                        )
                      : assets.upload_area
                  }
                  alt="Upload"
                />
                <input
                  type="file"
                  id={`image${index + 1}`}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setImage)}
                />
              </label>
            )
          )}
        </div>

        <div className="w-full">
          <p className="mb-2">Product Name</p>
          <input
            className="w-full max-w-[500px] border px-3 py-2 rounded outline"
            type="text"
            placeholder="Type here"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>

        <div className="w-full">
          <p className="mb-2">Product description</p>
          <textarea
            className="w-full max-w-[500px] border px-3 py-2 rounded outline"
            placeholder="Write content"
            required
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 w-full">
          <div>
            <p className="mb-2">Product Category</p>
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-2 py-1 cursor-pointer"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div>
            <p className="mb-2">Product Subcategory</p>
            <select
              onChange={(e) => setSubCategory(e.target.value)}
              className="w-full px-2 py-1 cursor-pointer"
              value={subCategory}
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          <div>
            <p className="mb-2">Price</p>
            <input
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              placeholder="25"
              min={0}
              className="px-2 py-1 w-full sm:w-[120px] border"
            />
          </div>
        </div>

        <div>
          <p className="mb-2">Product Sizes</p>
          <div className="flex gap-3">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <div
                key={size}
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes(size)
                      ? prev.filter((item) => item !== size)
                      : [...prev, size]
                  )
                }
                className={`cursor-pointer bg-slate-200 px-3 text-2xl ${
                  sizes.includes(size) ? "ring-2 ring-pink-200" : ""
                }`}
              >
                <p>{size}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 mt-2">
          <input
            type="checkbox"
            id="bestseller"
            onChange={() => setBestseller(!bestseller)}
            checked={bestseller}
          />
          <label className="cursor-pointer" htmlFor="bestseller">
            Add to bestseller
          </label>
        </div>

        <div className="mt-4 flex gap-4">
          <button className="py-3 w-28 bg-black text-white" type="submit">
            ADD
          </button>
          <button
            type="button"
            className="py-3 w-28 bg-gray-600 text-white"
            onClick={() => setShowPreview(true)}
          >
            PREVIEW
          </button>
        </div>
      </form>

      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-lg lg:max-w-5xl w-full text-center ">
            <h3 className="text-xl font-bold mb-4">Product Preview</h3>
            <div className="flex mx-8 justify-between">
              <div className="flex justify-center gap-4">
                {[image1, image2, image3, image4].map(
                  (img, index) =>
                    img && (
                      <img
                        key={index}
                        src={URL.createObjectURL(img)}
                        className="w-40 h-40 object-cover border"
                        alt="Preview"
                      />
                    )
                )}
              </div>
              <div className="space-y-3 items-start flex flex-col">
                <p>
                  <strong>{name}</strong>
                </p>
                <p>{description}</p>
                <p className="text-lg font-bold">${price}</p>
                <p>
                  {category} - {subCategory}
                </p>
                <p>Sizes: {sizes.join(", ")}</p>
              </div>
            </div>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white"
              onClick={() => setShowPreview(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Add;
