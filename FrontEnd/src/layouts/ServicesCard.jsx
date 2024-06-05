import React from "react";
import { Link } from "react-router-dom";

const ServicesCard = ({ icon, title, content }) => {
  return (
    <Link
      to={"/login"}
      className=" bg-white group flex flex-col items-center text-center gap-2 w-full lg:w-1/3 p-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg cursor-pointer lg:hover:-translate-y-6 transition duration-300 ease-in-out"
    >
      <div className=" bg-blue-500 text-white p-3 rounded-full transition-colors duration-300 ease-in-out group-hover:bg-[#ade9dc]">
        {icon}
      </div>
      <h1 className=" font-semibold text-lg">{title}</h1>
      <p>{content}</p>
    </Link>
  );
};

export default ServicesCard;
