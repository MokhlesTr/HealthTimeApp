import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Transition } from "@headlessui/react";
import AddUser from "./AddUser";
import EditUser from "./EditUser";

const TableUsers = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [add, setAdd] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [show, setShow] = useState(true); // New state for showing search input

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:3000/patient/all`);
        if (!response.ok) {
          throw new Error("Failed to fetch patients");
        }
        const data = await response.json();
        console.log("data //////////");
        console.log(data.data);
        const filteredUsers = data.data;
        console.log("filteredUsers //////////");
        console.log(filteredUsers);
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchUsers();
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
        await fetch(`http://localhost:3000/patient/${id}`, {
          method: "DELETE",
        });
        setUsers(users.filter((user) => user._id !== id));
        Swal.fire("Deleted!", "Your user has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting user:", error);
        Swal.fire("Error!", "Failed to delete user.", "error");
      }
    }
  };

  const details = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/patient/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }
      const userDetails = await response.json();
      console.log("userDetails=========>>", userDetails);

      // Ensure the response contains the expected fields
      const {
        firstName,
        lastName,
        // eslint-disable-next-line no-unused-vars
        email,
        gender,
        birthday,
        address,
        phone,
        user,
      } = userDetails.data;

      // Prepare the HTML content for Swal modal
      const detailsHTML = `
        <div>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Gender:</strong> ${gender}</p>
          <p><strong>Birthday:</strong> ${birthday}</p>
          <p><strong>City:</strong> ${address}</p>
          <p><strong>Phone:</strong> ${phone}</p>
        </div>`;

      // Display Swal modal with user details
      await Swal.fire({
        title: "User Details",
        html: detailsHTML,
        icon: "info",
        showCloseButton: true,
        confirmButtonColor: "green",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error fetching user details:", error);
      Swal.fire("Error!", "Failed to fetch user details.", "error");
    }
  };

  const handleEditClick = (id) => {
    setEditingUserId(id);
    setShow(false); // Hide search input when editing
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setShow(true); // Show search input when editing is canceled
  };

  // const handleSaveEdit = async (updatedUserData) => {
  //   try {
  //     // Optimistically update the local state
  //     setUsers((prevUsers) =>
  //       prevUsers.map((user) =>
  //         user._id === updatedUserData._id ? updatedUserData : user
  //       )
  //     );

  //     const response = await fetch(
  //       `http://localhost:3000/patient/${updatedUserData._id}`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(updatedUserData),
  //       }
  //     );
  //     if (!response.ok) {
  //       throw new Error("Failed to save changes");
  //     }
  //     // Reset editing state
  //     setEditingUserId(null);
  //     // await Swal.fire("Saved!", "Changes have been saved.", "success");
  //   } catch (error) {
  //     console.error("Error saving changes:", error);
  //     // Revert the local state update in case of error
  //     setUsers((prevUsers) =>
  //       prevUsers.map((user) =>
  //         user._id === updatedUserData._id ? user : user
  //       )
  //     );
  //     await Swal.fire("Error!", "Failed to save changes.", "error");
  //   }
  // };
  const handleSaveEdit = async (updatedUserData) => {
    try {
      const response = await fetch(
        `http://localhost:3000/patient/${updatedUserData._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUserData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to save changes");
      }
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === updatedUserData._id ? updatedUserData : user
        )
      );
      setEditingUserId(null);
    } catch (error) {
      console.error("Error saving changes:", error);
      await Swal.fire("Error!", "Failed to save changes.", "error");
    }
  };

  const filteredUsers = users.filter((user) =>
    Object.values(user).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div>
      <div className="p-4">
        <div className="flex flex-row mb-4 gap-4 ">
          <h1 className="text-2xl flex-1  font-bold ">
            {!add && show ? "Patient Table" : null}
          </h1>
          {!add ? (
            <div className="relative">
              {show ? (
                <input
                  className="rounded-xl border border-gray-500 h-10 w-72 text-center"
                  type="text"
                  placeholder="Search Users.."
                  value={searchQuery}
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
                  Search by <b>Email</b> or <b> User's Name</b>
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
          {add && show && <AddUser setAdd={setAdd} />}
        </div>

        <div
          className={`Form add ${
            editingUserId
              ? "transition-transform duration-500 ease-out transform translate-y-0 overflow-x-auto"
              : "transition-transform duration-500 ease-in transform -translate-y-full overflow-x-auto"
          }`}
        >
          {editingUserId && (
            <EditUser
              userId={editingUserId}
              onSave={handleSaveEdit}
              onCancel={handleCancelEdit}
            />
          )}
        </div>

        <table className="user-table w-full border-collapse border border-gray-300 shadow-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Number</th>
              <th className="p-2">First Name</th>
              <th className="p-2">Last Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Gender</th>
              <th className="p-2">Birthday</th>
              <th className="p-2">City</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-50 " : "bg-white"}
              >
                <td className=" py-4 text-center">{index + 1}</td>
                <td className="text-center">{user.firstName}</td>
                <td className="text-center">{user.lastName}</td>
                <td className="text-center">{user.user.email}</td>
                <td className="text-center">{user.gender}</td>
                <td className="text-center">{user.birthday}</td>
                <td className="text-center">{user.address}</td>
                <td className="text-center">{user.phone}</td>
                <td className="text-center">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded mr-2 shadow-lg hover:bg-red-900"
                  >
                    Delete
                  </button>
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2 shadow-lg hover:bg-blue-900"
                    onClick={() => handleEditClick(user._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded shadow-lg hover:bg-green-900"
                    onClick={() => details(user._id)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableUsers;
