import { Transition } from "@headlessui/react";
// import { request } from "express";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const TableRequests = () => {
  const [requests, setRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [show] = useState(true); // New state for showing search input
  const [doctors, setDoctors] = useState();

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const details = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/request/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch request details");
      }
      const requestData = await response.json();
      console.log("requestData", requestData?.data?.senderId);
      setDoctors(requestData?.data?.senderId);
      console.log("id", id);

      // if (!doctors || doctors !== userId) {
      //   throw new Error("Unauthorized access");
      // }

      const res = await fetch(`http://localhost:3000/doctor`);
      if (!res.ok) {
        throw new Error("Failed to fetch doctor details");
      }
      const doctorDetails = await res.json();
      console.log("doctorDetails", doctorDetails);

      const doctor = doctorDetails.find((doctor) => doctor.userId === doctors);
      console.log(doctor);
      if (!doctor) {
        throw new Error("Doctor not found");
      }
      console.log("doctor", doctor);

      const userResponse = await fetch(
        `http://localhost:3000/user/${requestData.data.senderId}`
      );
      if (!userResponse.ok) {
        throw new Error("Failed to fetch user details");
      }
      const userData = await userResponse.json();

      const email = userData.email || "N/A";

      const detailsHTML = `
        <div>
          <p><strong>First Name:</strong> ${doctor.fname || "N/A"}</p>
          <p><strong>Last Name:</strong> ${doctor.lname || "N/A"}</p>
          <p><strong>Specialization:</strong> ${
            doctor.specialization || "N/A"
          }</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${doctor.phone || "N/A"}</p>
          <p><strong>Age:</strong> ${doctor.age || "N/A"}</p>
          <p><strong>Gender:</strong> ${doctor.gender || "N/A"}</p>
          <p><strong>Address:</strong> ${doctor.address || "N/A"}</p>
        </div>`;

      // Show the details in a modal
      await Swal.fire({
        title: "Doctor Details",
        html: detailsHTML,
        icon: "info",
        showCloseButton: true,
        confirmButtonColor: "green",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error fetching doctor details:", error);
      Swal.fire("Error!", "Failed to fetch doctor details.", "error");
    }
  };

  const fetchRequests = async () => {
    try {
      const response = await fetch("http://localhost:3000/request/pending");
      if (!response.ok) {
        throw new Error("Failed to fetch requests");
      }
      const requestData = await response.json();
      setRequests(requestData.data); // Update to setRequests(requestData.data)
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const displayApprovalPopup = async (requestId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You are about to approve this request.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, approve it!",
      });

      if (result.isConfirmed) {
        await approveRequest(requestId);
      }
    } catch (error) {
      console.error("Error displaying approval popup:", error);
      Swal.fire("Error!", "Failed to display approval popup.", "error");
    }
  };

  const approveRequest = async (requestId) => {
    console.log("requestId ===========>>>> ", requestId);
    try {
      const response = await fetch(
        `http://localhost:3000/request/approve/${requestId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch request details");
      }
      await Swal.fire({
        title: "Request Approoved",
        icon: "success",
        confirmButtonColor: "green",
        confirmButtonText: "OK",
      });
      fetchRequests();
    } catch (error) {
      console.error("Error fetching request details:", error);
      Swal.fire("Error!", "Failed to fetch request details.", "error");
    }
  };

  const displayRefusedPopup = async (requestId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You are about to refuse this request.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, refuse it!",
      });

      if (result.isConfirmed) {
        await refuseRequest(requestId);
      }
    } catch (error) {
      console.error("Error displaying approval popup:", error);
      Swal.fire("Error!", "Failed to display approval popup.", "error");
    }
  };

  const refuseRequest = async (requestId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/request/refuse/${requestId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch request details");
      }
      await Swal.fire({
        title: "Request Refused",
        icon: "success",
        confirmButtonColor: "green",
        confirmButtonText: "OK",
      });
      fetchRequests();
    } catch (error) {
      console.error("Error fetching request details:", error);
      Swal.fire("Error!", "Failed to fetch request details.", "error");
    }
  };

  return (
    <div>
      <div className="p-4">
        <div className="flex flex-row mb-4 gap-4 ">
          <h1 className="text-2xl flex-1 font-bold">Requests Table</h1>
          <div className="relative">
            {show ? (
              <input
                className="rounded-xl border border-gray-500 h-10 w-72 text-center"
                type="text"
                placeholder="Search Doctors.."
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowTooltip(true)}
                onBlur={() => setShowTooltip(false)}
              />
            ) : (
              ""
            )}
            <Transition
              show={showTooltip}
              as="div"
              enter="transition-opacity duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className="flex float-left mx-8  top-full right-0 mt-1 w-72 bg-green-100 text-center p-2 rounded-md shadow-md"
            >
              <span className="text-sm text-gray-700 ">
                Search by <b>Email</b>
              </span>
            </Transition>
          </div>
        </div>

        <table className="user-table w-full border-collapse border border-gray-300 shadow-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Number</th>
              <th className="p-2">Date </th>
              {/* <th className="p-2">Sender Full Name</th> */}
              <th className="p-2">Sender Email</th>
              {/* <th className="p-2">Sender Specialization</th> */}
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          {requests.length > 0 && (
            <tbody>
              {requests
                .filter((req) => req.sender.email.includes(searchQuery))

                .map((req, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="py-4 text-center">{index + 1}</td>
                    <td className="text-center">{formatDate(req.createdAt)}</td>
                    {/* <td className="py-4 text-center ">
                      <span className="px-1">{req.sender.fname}</span>
                      <span className="px-1">{req.sender.lname}</span>
                    </td> */}
                    <td className="text-center">{req.sender.email}</td>
                    {/* <td className="text-center">{req.sender.specialization}</td> */}
                    <td className="text-center">
                      <button
                        onClick={() => displayApprovalPopup(req._id)}
                        className="bg-green-600 text-white px-3 py-1 mx-2 rounded shadow-lg hover:bg-green-900"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => displayRefusedPopup(req._id)}
                        className="bg-red-600 text-white px-3 py-1 mx-2 rounded shadow-lg hover:bg-red-900"
                      >
                        Refuse
                      </button>
                      <button
                        className="bg-yellow-600 text-white px-3 py-1 mx-2 rounded shadow-lg hover:bg-yellow-900"
                        onClick={() => details(req._id)}
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default TableRequests;
