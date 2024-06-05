import React, { useState, useEffect } from "react";

const ApprovedRequests = () => {
  const [requests, setRequests] = useState([]);
  const [doctorData, setDoctorData] = useState([]);

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // Fetch all requests
        const response = await fetch("http://localhost:3000/request/all");
        if (!response.ok) {
          throw new Error("Failed to fetch requests");
        }
        const requestData = await response.json();
        console.log("All requests: ", requestData);
        // Filter approved requests
        const filteredRequests = requestData.data.filter(
          (req) => req.state === 1
        );
        console.log("Approved data: ", filteredRequests);
        setRequests(filteredRequests);

        // Fetch all doctors
        const responseDoctor = await fetch("http://localhost:3000/doctor");
        if (!responseDoctor.ok) {
          throw new Error("Failed to fetch doctors");
        }
        const doctorData = await responseDoctor.json();
        console.log("All doctors: ", doctorData);
        setDoctorData(doctorData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div>
      <div className="p-4">
        <div className="flex flex-row mb-4 gap-4 ">
          <h1 className="text-2xl flex-1 font-bold">Approved Requests</h1>
        </div>

        <table className="user-table w-full border-collapse border  border-green-600 shadow-lg">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="p-2">Number</th>
              <th className="p-2">Date</th>
              {/* <th className="p-2">Sender Full Name</th> */}
              <th className="p-2">Sender Email</th>
              {/* <th className="p-2">Sender Specialization</th> */}
            </tr>
          </thead>
          <tbody>
            {requests?.map((req, index) => {
              // Find the corresponding doctor for this request
              const doctor = doctorData.find(
                (doctor) => doctor._id === req.senderId
              );

              // Check if the doctor exists and its ID matches the sender's ID
              const displayDoctorData = doctor && doctor._id === req.senderId;

              return (
                <tr
                  key={req.id} // Assuming "id" is unique for each request
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="py-4 text-center">{index + 1}</td>
                  <td className="text-center">{formatDate(req.createdAt)}</td>
                  {/* <td className="py-4 text-center ">
                    {displayDoctorData && (
                      <>
                        <span className="px-1">{displayDoctorData?.fname}</span>
                        <span className="px-1">{displayDoctorData?.lname}</span>
                      </>
                    )}
                  </td> */}
                  <td className="text-center">{req?.sender.email}</td>
                  {/* <td className="text-center">
                    {displayDoctorData?.specialization}
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovedRequests;
