// import { useState } from "react";

// const NewsLetterBox = () => {
//   const [email, setEmail] = useState("");

//   const onSubmitHandler = (e) => {
//     e.preventDefault();
//     console.log("Form submitted with email:", email);
//     setEmail("");
//   };

//   return (
//     <div className="text-center px-4">
//       <p className="text-2xl font-medium text-gray-800">
//         Subscribe now & get 20% off
//       </p>
//       <p className="text-gray-400 pt-3">
//         Lorem Ipsum is simply dummy text of the printing and typesetting
//         industry.
//       </p>
//       <form
//         onSubmit={onSubmitHandler}
//         className="flex items-center my-5 w-full sm:w-3/4 md:w-1/2 mx-auto border pl-3 rounded-md"
//       >
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Enter your email"
//           className="w-full flex-1 outline-none px-3 py-2 "
//           required
//         />
//         <button
//           type="submit"
//           className="bg-black text-white px-4 sm:px-8 py-4 sm:py-4 text-xs  hover:bg-gray-800"
//         >
//           SUBSCRIBE
//         </button>
//       </form>
//     </div>
//   );
// };

// export default NewsLetterBox;

import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const NewsLetterBox = () => {
  const { backendUrl } = useContext(ShopContext);
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("Form submitted with email:", email);

    try {
      const res = await axios.post(`${backendUrl}/api/user/subscribe`, {
        email,
      });

      // alert(res.data.message);
      toast.success(res.data.message);
      setEmail("");
    } catch (err) {
      console.error("Subscription error:", err);
      const message =
        err.response?.data?.message || "Something went wrong. Try again.";
      // alert(message);
      toast.error(message);
    }
  };

  return (
    <div className="text-center px-4">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-400 pt-3">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="flex items-center my-5 w-full sm:w-3/4 md:w-1/2 mx-auto border pl-3 rounded-md"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full flex-1 outline-none px-3 py-2 "
          required
        />
        <button
          type="submit"
          className="bg-black text-white px-4 sm:px-8 py-4 sm:py-4 text-xs  hover:bg-gray-800"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
