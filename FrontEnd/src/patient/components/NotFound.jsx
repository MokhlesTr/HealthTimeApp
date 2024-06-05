import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-900 text-white">
      <h1 className="text-4xl font-bold mb-4 text-yellow-400">
        404 Not Found !!
      </h1>
      <p className="text-lg mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>

      <p className="text-lg">
        It seems you've reached the wrong place. Let's get you back on track.
      </p>
      {/* Add a link to the homepage or another relevant page */}
      <Link
        onClick={() => window.history.back()}
        className="text-lg font-semibold  bg-blue-700 rounded-full flex flex-row gap-4 shadow-lg p-4 m-4 hover:bg-white hover:text-blue-900"
      >
        <FaArrowLeft size={28} />
        Back
      </Link>
    </div>
  );
};

export default NotFound;
