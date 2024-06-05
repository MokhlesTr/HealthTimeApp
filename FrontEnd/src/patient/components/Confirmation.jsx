import React from "react";
import DoctorImage from "../assets/img/doc1.jpg";
import { ImCancelCircle } from "react-icons/im";
import { FaExchangeAlt } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Confirmation = () => {
  return (
    <div className="flex flex-col gap-12">
      <div className="border rounded-lg border-indigo-500  backdrop-blur-md">
        <div className="flex flex-col lg:flex-row lg:items-center  lg:justify-between bg-white rounded-lg border-indigo-600 p-8 lg:p-12">
          <img
            src={DoctorImage}
            className="w-full lg:w-40 h-36 rounded-lg mb-6 lg:mb-0 lg:mr-8"
            alt="Doctor"
          />
          <div className="flex flex-col flex-1 mr-20 justify-center text-lg">
            <p className="text-xl text-indigo-600 font-semibold">
              Dr. Foulen Fouleni
            </p>
            <p className="text-gray-700">Cardiologist</p>
            <p className="text-gray-700">New York, NY</p>
          </div>
          <div className="text-right lg:text-left lg:mt-0 mt-4">
            <p className="font-semibold text-right pr-3 text-2xl text-indigo-700">
              Your Appointment on :
            </p>
            <div className="justify-end text-xl flex flex-row gap-8 lg:text-left p-4">
              <p>DD/MM/YYYY</p>
              <p>hh:mm</p>
            </div>
            <div className="flex flex-row items-center justify-center lg:justify-start">
              <button
                className="bg-red-600 flex items-center gap-4 rounded-lg hover:bg-red-900 h-12 text-white lg:mr-4 mb-4 lg:mb-0 text-sm px-6"
                onClick={() => alert("Appointment Cancelled")}
              >
                <ImCancelCircle size={28} className="text-xl" />
                <span>Cancel Appointment</span>
              </button>
              <button
                className="bg-blue-500 flex items-center gap-4 rounded-lg hover:bg-blue-800 h-12 text-white text-sm px-6"
                onClick={() => alert("Appointment Moved")}
              >
                <FaExchangeAlt size={28} className="text-xl" />
                <span>Move Appointment</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className=" rounded-lg border-white border-4 backdrop-blur-md">
        <div className="py-8">
          <p className="text-indigo-800 gap-2 cursor-pointer flex flex-row w-full px-12 pt-8 justify-start-left font-semibold text-lg">
            <FaArrowLeft size={24} className="pt-1" />
            Previous Step
          </p>
          <p className="font-semibold text-center text-indigo-700">
            Enter Otp Code
          </p>

          <div className="flex flex-col mt-8 gap-4 text-lg">
            {/* <p className="text-green-700 font-semibold text-center">
                Phone Verified Successfully!
              </p> */}
            <div className="flex justify-center items-center">
              {[...Array(4)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  autoComplete="off"
                  required
                  className="appearance-none m-2 rounded-md w-12 text-center px-3 py-2 border border-gray-300 text-gray-900 focus:border-blue-900 focus:z-10 text-xl"
                />
              ))}
            </div>
            <Link
              to={"/patient/appointements"}
              className=" px-8 bg-indigo-500 py-2 rounded-lg hover:bg-indigo-600 mx-auto  text-white"
            >
              Submit Appointment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
