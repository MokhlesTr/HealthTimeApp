import React, { useState, useEffect } from "react";

const RefusedRequests = () => {
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
          (req) => req.state === 2
        );
        console.log("Approved data: ", filteredRequests);
        setRequests(filteredRequests);

        // Fetch doctors
        const fetchDoctors = async () => {
          try {
            // Fetch user data
            const userResponse = await fetch(`http://localhost:3000/user`);
            if (!userResponse.ok) {
              throw new Error("Failed to fetch user data");
            }
            const userData = await userResponse.json();

            // Filter users with role 2 and state 1
            const filteredUsers = userData.filter(
              (user) => user.role === 2 && user.state === 2
            );
            const userIds = filteredUsers.map((user) => user.userId);

            // Fetch doctor data
            const doctorResponse = await fetch(`http://localhost:3000/doctor`);
            if (!doctorResponse.ok) {
              throw new Error("Failed to fetch doctor data");
            }
            const doctorData = await doctorResponse.json();

            // Map userIds to corresponding emails
            const userIdToEmail = filteredUsers.reduce((acc, user) => {
              acc[user.userId] = user.email;
              return acc;
            }, {});

            // Filter doctors whose userId matches the IDs of filtered users
            const filteredDoctors = doctorData
              .filter((doctor) => userIds.includes(doctor.userId))
              .map((doctor) => ({
                ...doctor,
                email: userIdToEmail[doctor.userId], // Add email from userIdToEmail
              }));

            // Set the filtered doctors state
            setDoctorData(filteredDoctors);
          } catch (error) {
            console.error("Error fetching doctors:", error);
          }
        };

        fetchDoctors();
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div>
      <div className="p-4">
        <div className="flex flex-row mb-4 gap-4 ">
          <h1 className="text-2xl flex-1 font-bold">Refused Requests</h1>
        </div>

        <table className="user-table w-full border-collapse border  border-red-600 shadow-lg">
          <thead>
            <tr className="bg-red-600 text-white">
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
                (doctor) => doctor.userId === req.senderId
              );

              // eslint-disable-next-line no-unused-vars
              const displayDoctorData =
                doctor && doctor.userId === req.senderId;

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
                  <td className="text-center">
                    {req?.sender?.email
                      ? req?.sender?.email
                      : "tesstDoctor@gmail.com"}
                  </td>
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

export default RefusedRequests;
