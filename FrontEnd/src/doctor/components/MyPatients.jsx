import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Transition } from "@headlessui/react";

const MyPatients = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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
            <p><strong>Email:</strong> ${user?.email}</p>
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
          <div className="flex flex-row  w-full">
            <div className="flex-1"></div>

            <div>
              {" "}
              <input
                className="rounded-xl border border-gray-500 h-10 w-72 text-center"
                type="text"
                placeholder="Search Users.."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowTooltip(true)}
                onBlur={() => setShowTooltip(false)}
              />
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
          </div>
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
                <td className="text-center">{user.user?.email}</td>
                <td className="text-center">{user.gender}</td>
                <td className="text-center">{user.birthday}</td>
                <td className="text-center">{user.address}</td>
                <td className="text-center">{user.phone}</td>
                <td className="text-center">
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

export default MyPatients;
