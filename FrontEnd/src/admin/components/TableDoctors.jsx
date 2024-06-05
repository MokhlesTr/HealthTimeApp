import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Transition } from "@headlessui/react";
import AddDoc from "./AddDoc";
import EditDoc from "./EditDoc";

const TableDoctors = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [add, setAdd] = useState(false);
  const [editingDoctorId, setEditingDoctorId] = useState(null);
  const [show, setShow] = useState(true);

  useEffect(() => {
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
          (user) => user.role === 2 && user.state === 1
        );
        const userIds = filteredUsers.map((user) => user._id);

        // Fetch doctor data
        const doctorResponse = await fetch(`http://localhost:3000/doctor`);
        if (!doctorResponse.ok) {
          throw new Error("Failed to fetch doctor data");
        }
        const doctorData = await doctorResponse.json();

        // Map userIds to corresponding emails
        const userIdToEmail = filteredUsers.reduce((acc, user) => {
          acc[user._id] = user.email;
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
        setDoctors(filteredDoctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleDelete = async (id) => {
    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmation.isConfirmed) {
      try {
        await fetch(`http://localhost:3000/doctor/${id}`, { method: "DELETE" });
        setDoctors(doctors.filter((doctor) => doctor._id !== id));
        Swal.fire("Deleted!", "The doctor has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting doctor:", error);
        Swal.fire("Error!", "Failed to delete the doctor.", "error");
      }
    }
  };

  const details = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/doctor/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch doctor details");
      }
      const doctorDetails = await response.json();

      // Fetch user data based on doctor's userId
      const userResponse = await fetch(
        `http://localhost:3000/user/${doctorDetails.userId}`
      );
      if (!userResponse.ok) {
        throw new Error("Failed to fetch user details");
      }
      const userData = await userResponse.json();

      // Extract email from user data
      const email = userData.email || "N/A";

      const detailsHTML = `
        <div>
          <p><strong>First Name:</strong> ${doctorDetails.fname}</p>
          <p><strong>Last Name:</strong> ${doctorDetails.lname}</p>
          <p><strong>Specialization:</strong> ${doctorDetails.specialization}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${doctorDetails.phone}</p>
          <p><strong>Age:</strong> ${doctorDetails.age}</p>
          <p><strong>Gender:</strong> ${doctorDetails.gender}</p>
          <p><strong>Address:</strong> ${doctorDetails.address}</p>
        </div>`;

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

  const handleEditClick = (id) => {
    setEditingDoctorId(id);
    setShow(false);
  };

  const handleCancelEdit = () => {
    setEditingDoctorId(null);
    setShow(true);
  };

  const handleSaveEdit = async (updatedDoctorData) => {
    try {
      const response = await fetch(
        `http://localhost:3000/doctor/${updatedDoctorData._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedDoctorData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to save changes");
      }
      setDoctors((prevDoctors) =>
        prevDoctors.map((doctor) =>
          doctor._id === updatedDoctorData._id ? updatedDoctorData : doctor
        )
      );
      setEditingDoctorId(null);
    } catch (error) {
      console.error("Error saving changes:", error);
      await Swal.fire("Error!", "Failed to save changes.", "error");
    }
  };

  const filteredDoctors = doctors.filter((doctor) =>
    Object.values(doctor).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="p-4">
      <div className="flex flex-row mb-4 gap-4 ">
        <h1 className="text-2xl flex-1  font-bold ">
          {!add && show ? "Doctors Table" : null}
        </h1>
        {!add ? (
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
                Search by <b>Email</b> or <b> Doctor's Name</b>
              </span>
            </Transition>
          </div>
        ) : null}
        {show ? (
          <button
            onClick={() => setAdd(!add)}
            className={`px-3 py-1 rounded text-white font-semibold shadow-lg transition duration-300  ${
              add
                ? "bg-red-500 hover:bg-red-900"
                : "bg-green-500 hover:bg-green-900"
            } `}
          >
            {!add ? "Add" : "Cancel"}
          </button>
        ) : (
          ""
        )}
      </div>

      <div
        className={`Form add ${
          add
            ? "transition-transform duration-500 ease-out transform translate-y-0"
            : "transition-transform duration-500 ease-in transform -translate-y-full"
        }`}
      >
        {add && show && <AddDoc setAdd={setAdd} />}
      </div>

      <div
        className={`Form add ${
          editingDoctorId
            ? "transition-transform duration-500 ease-out transform translate-y-0 overflow-x-auto"
            : "transition-transform duration-500 ease-in transform -translate-y-full overflow-x-auto"
        }`}
      >
        {editingDoctorId && (
          <EditDoc
            doctorId={editingDoctorId}
            onSave={handleSaveEdit}
            onCancel={handleCancelEdit}
            defaultUsername={
              doctors.find((doc) => doc._id === editingDoctorId)?.username || ""
            }
            defaultEmail={
              doctors.find((doc) => doc._id === editingDoctorId)?.email || ""
            }
          />
        )}
      </div>

      <table className="user-table w-full border-collapse border border-gray-300 shadow-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Number</th>
            <th className="p-2">FName</th>
            <th className="p-2">LName</th>
            <th className="p-2">Specialization</th>
            {/* <th className="p-2">Username</th> */}
            <th className="p-2">Email</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Age</th>
            <th className="p-2">Gender</th>
            <th className="p-2">Address</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDoctors.map((doctor, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-50 " : "bg-white"}
            >
              <td className=" py-4 text-center">{index + 1}</td>
              <td className="text-center">{doctor.fname}</td>
              <td className="text-center">{doctor.lname}</td>
              <td className="text-center">{doctor.specialization}</td>
              {/* <td className="text-center">{doctor.username}</td> */}
              <td className="text-center">{doctor.email}</td>
              <td className="text-center">{doctor.phone}</td>
              <td className="text-center">{doctor.age}</td>
              <td className="text-center">{doctor.gender}</td>
              <td className="text-center">{doctor.address}</td>
              <td className="text-center">
                <button
                  onClick={() => handleDelete(doctor._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded mr-2 shadow-lg hover:bg-red-900"
                >
                  Delete
                </button>
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2 shadow-lg hover:bg-blue-900"
                  onClick={() => handleEditClick(doctor._id)}
                >
                  Edit
                </button>
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded shadow-lg hover:bg-yellow-900"
                  onClick={() => details(doctor._id)}
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableDoctors;
