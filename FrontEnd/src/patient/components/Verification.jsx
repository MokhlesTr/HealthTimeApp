import React, { useState } from "react";
import DoctorImage from "../assets/img/doc1.jpg";
import { ImCancelCircle } from "react-icons/im";
import { FaSms } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { MdOutlineUpdate } from "react-icons/md";

const Verification = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

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
                <MdOutlineUpdate size={28} className="text-xl" />
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
            Enter Your Information
          </p>
          <div className="flex flex-col justify-center items-center  mt-8 gap-4 text-lg">
            <input
              className="border w-1/2 placeholder-center border-indigo-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-200 px-4 py-2 mb-4"
              placeholder="Enter your Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="border w-1/2 border-indigo-500 rounded-xl placeholder-center focus:outline-none focus:ring-2 focus:ring-indigo-200 px-4 py-2 mb-4"
              placeholder="Enter your Phone Number"
              type="tel"
              maxLength={8}
              min={8}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <p className="text-black font-semibold">
              A code will be sent to you on this phone to validate your
              appointment
            </p>
            <button className="bg-blue-500 w-1/5 text-center justify-center mx-auto flex items-center gap-4 rounded-lg hover:bg-blue-700 h-12 text-white text-sm px-6">
              <FaSms size={28} />
              Verify Phone
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
