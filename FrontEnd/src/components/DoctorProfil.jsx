import React from "react";
import { Link } from "react-router-dom";

const DoctorProfil = ({
  setProfil,
  searchTerm,
  selectedCity,
  selectedSpecialty,
}) => {
  return (
    <div className="  max-w-3xl mx-auto p-8 rounded-lg shadow-lg bg-white backdrop-blur-lg">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Doctor Profile
        </h2>
        <img
          src="https://static.vecteezy.com/system/resources/previews/015/412/022/original/doctor-round-avatar-medicine-flat-avatar-with-male-doctor-medical-clinic-team-round-icon-medical-collection-illustration-vector.jpg"
          alt="Doctor Profile"
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <p className="text-gray-900 font-semibold text-2xl  mb-4">
          {searchTerm}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            First Name:
          </label>
          <p className="text-gray-800">{searchTerm}</p>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Last Name:
          </label>
          <p className="text-gray-800">{searchTerm}</p>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Specialization:
          </label>
          <p className="text-gray-800">{selectedSpecialty}</p>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            City:
          </label>
          <p className="text-gray-800">{selectedCity}</p>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Tarif:
          </label>
          <p className="text-gray-800">{selectedSpecialty}</p>
        </div>
        {/* <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Username:
          </label>
          <p className="text-gray-800">{searchTerm}</p>
        </div> */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Email:
          </label>
          <p className="text-gray-800">{searchTerm}</p>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Phone number:
          </label>
          <p className="text-gray-800">{searchTerm}</p>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Age:</label>
          <p className="text-gray-800">{searchTerm}</p>
        </div>
      </div>
      <div className=" flex flex-row gap-8 justify-center mt-6">
        <button
          onClick={() => setProfil(false)}
          className="bg-gray-800 text-white font-semibold py-2 px-6 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
          Back
        </button>
        <Link
          to="/login"
          className="bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
          Make an Appointement
        </Link>
      </div>
    </div>
  );
};

export default DoctorProfil;
