import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom"; // Correct import
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <>
      <ToastContainer />
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <div className="w-full min-h-screen flex flex-col md:flex-row">
          {/* Sidebar - Show/Hide based on state */}
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

          <div className="flex-1 px-4 md:px-6">
            <Navbar
              toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
              setToken={setToken}
            />
            <div className="mt-4">
              {/* Main Content Goes Here */}
              <Routes>
                {/* <Route path="/" element={<List token={token} />} /> */}
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
