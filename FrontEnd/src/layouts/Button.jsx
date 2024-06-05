import React from "react";

const Button = ({ title }) => {
  return (
    <div>
      <button class="bg-brightColor text-white px-4 py-2 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out transform hover:scale-105">
        {title}
      </button>
    </div>
  );
};

export default Button;
