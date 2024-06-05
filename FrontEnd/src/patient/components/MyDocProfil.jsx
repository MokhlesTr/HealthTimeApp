import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { GiPositionMarker } from "react-icons/gi";
import { MdEventAvailable } from "react-icons/md";
import useLocalStorageRdv from "../../hooks/useLocalStorageRdv";

const MyDoctorProfil = ({ doctor, setProfil }) => {
  const localStorageRdv = useLocalStorageRdv("rdvData", {
    doctorId: "",
    reason: "",
    patientId: "",
    date: "",
  });

  useEffect(() => {
    if (doctor && doctor.userId) {
      handleStoreDoctorId(doctor?.userId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctor]); // Run this effect whenever the doctor prop changes

  // Function to handle storing doctor ID in local storage
  const handleStoreDoctorId = (doctorId) => {
    localStorageRdv.setValue({ doctorId });
  };

  return (
    <div className="">
      <div className="  max-w-3xl mx-auto p-8 rounded-lg shadow-lg   backdrop-blur-lg flex flex-row gap-4">
        <div className="text-center w-1/2  backdrop-blur-lg ">
          <h2 className="text-3xl font-bold text-white  mb-4">
            Doctor Profile
          </h2>
          <img
            src="https://static.vecteezy.com/system/resources/previews/015/412/022/original/doctor-round-avatar-medicine-flat-avatar-with-male-doctor-medical-clinic-team-round-icon-medical-collection-illustration-vector.jpg"
            alt="Doctor Profile "
            className="w-32 h-32 rounded-full border-4 border-white mx-auto mb-4"
          />
          <p className="text-neutral-800 font-semibold text-2xl  mb-4">
            Dr.{" "}
            <span className="text-white">
              {doctor.fname} {doctor.lname}
            </span>
          </p>
          <p className="text-white  text-lg  mb-4">{doctor.specialization}</p>
        </div>
        <div className=" w-1/2  backdrop-blur-lg rounded-lg shadow-lg border-neutral-600 border-8  bg-white py-4 border-r-0 border-t-0 border-b-0  border-l-red">
          <p className="text-gray-900 text-center font-semibold text-xl  mb-4">
            In summary
          </p>
          <div className="text-neutral-900 flex gap-8 flex-col text-lg m-4 h-full py-6 pl-2  rounded-lg mb-4">
            <div className="flex flex-row ">
              <span className="pr-3 ">
                <MdEventAvailable size={24} />
              </span>
              Is not Available on : Saturday / Sunday
            </div>
            <div className="flex flex-row gap-4">
              <span>
                <GiPositionMarker size={20} />
              </span>
              {doctor.address}
            </div>
            <div>
              <Link
                to="/patient/rdv"
                className="bg-neutral-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
              >
                Make an Appointement
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* fjhbdjhfbj */}
      <div className=" my-20 max-w-3xl mx-auto p-8 rounded-lg shadow-lg bg-white backdrop-blur-lg">
        <div className=" flex flex-col text-left ">
          <div className="border-4 border-b-neutral-900  py-4 border-t-0 border-x-0">
            <p className="text-gray-900 font-semibold text-2xl  mb-2">
              Personel infos
            </p>
            <div className="flex flex-row mb-2 ">
              <span className="font-semibold pr-4">Gender:</span>

              <div className="text-sm">{doctor.gender}</div>
            </div>
            <div className="flex flex-row mb-2">
              <span className="font-semibold pr-4">Birthday:</span>

              <div className="text-sm">{doctor.age}</div>
            </div>
            <div className="flex flex-row mb-2">
              <span className="font-semibold pr-4">Phone Number:</span>

              <div className="text-sm">{doctor.phone}</div>
            </div>
          </div>
          <div className="  py-4 ">
            <p className="text-gray-900 font-semibold text-2xl  mb-2">
              Work Time
            </p>
            <div className="flex flex-row mb-2 ">
              <span className="font-semibold pr-4">Monday:</span>
              <div className="text-sm">
                9:00 AM - 1:00 PM, 2:00 PM - 6:30 PM
              </div>
            </div>
            <div className="flex flex-row mb-2 ">
              <span className="font-semibold pr-4">Tuesday:</span>
              <div className="text-sm">
                9:00 AM - 1:00 PM, 2:00 PM - 6:30 PM
              </div>
            </div>
            <div className="flex flex-row mb-2 ">
              <span className="font-semibold pr-4">Wednesday:</span>
              <div className="text-sm">
                9:00 AM - 1:00 PM, 2:00 PM - 6:30 PM
              </div>
            </div>
            <div className="flex flex-row mb-2 ">
              <span className="font-semibold pr-4">Thursday:</span>
              <div className="text-sm">
                9:00 AM - 1:00 PM, 2:00 PM - 6:30 PM
              </div>
            </div>
            <div className="flex flex-row mb-2 ">
              <span className="font-semibold pr-4">Friday:</span>
              <div className="text-sm">
                9:00 AM - 1:00 PM, 2:00 PM - 6:30 PM
              </div>
            </div>
            <div className="flex flex-row mb-2 ">
              <span className="font-semibold pr-4">Saturday:</span>
              <div className="text-sm">Closed</div>
            </div>
            <div className="flex flex-row mb-2 ">
              <span className="font-semibold pr-4">Sunday:</span>
              <div className="text-sm">Closed</div>
            </div>
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
            to="/patient/rdv"
            className="bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            Make an Appointement
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyDoctorProfil;
