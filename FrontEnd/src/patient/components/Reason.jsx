import React from "react";
import useLocalStorageRdv from "../../hooks/useLocalStorageRdv";

const Reason = ({ handleClick }) => {
  const localStorageRdv = useLocalStorageRdv("rdvData", {
    doctorId: "",
    reason: "",
    patientId: "",
    date: "",
  });

  const handleReasonClick = (reason) => {
    console.log("Reason clicked:", reason);
    localStorageRdv.setValue({ reason });
    handleClick(1); // Advance to the next step
  };

  return (
    <div>
      <div className="pb-8 flex justify-center items-center rounded-lg shadow-lg bg-white backdrop-blur-lg">
        <div className="w-svw max-w-3xl flex flex-col items-center">
          <p className="text-gray-900 w-full text-left px-12 py-4 font-semibold text-2xl cursor-pointer">
            Choose your reason (Subject) for consultation
          </p>
          <div className="text-xl py-4 w-full px-24">
            <p
              onClick={() => handleReasonClick("General Medicine consultation")}
              className="text-gray-900 px-8 py-4 bg-white border border-indigo-500 cursor-pointer hover:bg-sky-200 rounded-xl"
            >
              General Medicine consultation
            </p>
            <p
              onClick={() => handleReasonClick("Dental check-up")}
              className="text-gray-900 px-8 py-4 my-5 bg-white border border-indigo-500 cursor-pointer hover:bg-sky-200 rounded-xl"
            >
              Dental check-up
            </p>
            <p
              onClick={() => handleReasonClick("Another reason")}
              className="text-gray-900 px-8 py-4 bg-white border border-indigo-500 cursor-pointer hover:bg-sky-200 rounded-xl"
            >
              Another reason
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reason;
