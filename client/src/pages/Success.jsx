import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4">
        Your account has been created successfully!
      </h1>
      <Link
        to="/login"
        className="px-6 py-3 text-lg text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Log In
      </Link>
    </div>
  );
};

export default Success;
