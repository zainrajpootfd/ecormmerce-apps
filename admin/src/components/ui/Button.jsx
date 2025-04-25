// src/components/ui/Button.jsx
import React from "react";

const Button = ({ children, type = "button", className, ...props }) => {
  return (
    <button
      type={type}
      className={`bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
