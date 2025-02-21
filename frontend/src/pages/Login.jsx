import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { setToken, backendUrl, token, navigate } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to toggle between Sign Up and Login
  const toggleState = () => {
    setCurrentState(currentState === "Sign Up" ? "Login" : "Sign Up");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Registered successfully! Please log in.");
          setCurrentState("Login");
        } else {
          toast.error(response.data.message || "Registration failed!");
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Login successful!");
        } else {
          toast.error(response.data.message || "Login failed!");
        }
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error("User already registered! Please log in.");
        } else if (error.response.status === 401) {
          toast.error("Invalid email or password!");
        } else {
          toast.error(error.response.data.message || "An error occurred.");
        }
      } else {
        toast.error("Network error. Please try again.");
      }
    }
  };
  useEffect(() => {
    if (token) {
      navigate("/orders");
    }
  }, [token]);
  return (
    <div className="border-t">
      <div className="p-6 max-w-md mx-auto">
        {/* Heading */}
        <div className="flex items-center justify-center gap-2 mt-5">
          <p className="text-3xl  ">{currentState}</p>
          <hr className="w-8 h-[1.5px] bg-[#141414]" />
        </div>

        {/* Form */}
        <form
          className="flex flex-col gap-4 mt-6 w-full"
          onSubmit={handleSubmit}
        >
          {/* Name Field (Only for Sign Up) */}
          {currentState === "Sign Up" && (
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              className="border border-black px-4 py-3 w-full rounded-md outline-none focus:ring-2 focus:ring-gray-400"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            className="border border-black px-4 py-3 w-full rounded-md outline-none focus:ring-2 focus:ring-gray-400"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            className="border border-black px-4 py-3 w-full rounded-md outline-none focus:ring-2 focus:ring-gray-400"
          />

          {/* Forgot Password (Only for Login) */}
          {currentState === "Login" && (
            <p className="text-sm text-left text-gray-600 cursor-pointer hover:underline">
              Forgot Password?
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-2 bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
          >
            {currentState}
          </button>
        </form>

        {/* Toggle Between Sign Up and Login */}
        <div className="flex justify-between mt-4 text-xs sm:text-sm">
          <p>
            {currentState === "Sign Up"
              ? "Already have an account?"
              : "Don't have an account?"}
          </p>
          <p
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={toggleState}
          >
            {currentState === "Sign Up" ? "Login" : "Create Account"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
