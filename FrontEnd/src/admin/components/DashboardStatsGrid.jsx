import React, { useEffect, useState } from "react";
import { HiOutlineUsers } from "react-icons/hi";
import { FaUserDoctor } from "react-icons/fa6";
import { Link } from "react-router-dom";
import {
  IoIosCheckmarkCircleOutline,
  IoIosCloseCircleOutline,
} from "react-icons/io";

const DashboardStatsGrid = () => {
  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [Refused, setRefused] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:3000/patient/all");
        const data = await res.json();
        const patients = data.data;
        setUsers(patients);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

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
        const refusedUsers = userData.filter((user) => user.state === 2);
        setRefused(refusedUsers);

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

    fetchUsers();
    fetchDoctors();
  }, []);
  return (
    <div className="flex gap-4 w-full ">
      <BoxWrapper color="sky">
        <Link
          to="/admin/patients"
          className="hover:bg-blue-800 rounded-full h-12 w-12 flex items-center justify-center bg-white text-white cursor-pointer"
        >
          <HiOutlineUsers
            size={32}
            className="text-2xl hover:text-white text-blue-600"
          />
        </Link>
        <div className="pl-4 ">
          <Link to="/admin/patients" className="hover:font-semibold">
            <span className="text-lg hover:text-blue-900 text-white font-semibold   hover:font-semibold">
              Total Patients
            </span>
          </Link>

          <div className="flex items-center">
            <strong className="text-xl text-white hover:text-blue-900 font-semibold">
              <Link to="/admin/patients" className=" ">
                {users.length}
              </Link>
            </strong>
          </div>
        </div>
      </BoxWrapper>

      <BoxWrapper color="yellow">
        <Link
          to="/admin/doctors"
          className="hover:bg-[#FBA834] rounded-full h-12 w-12 flex items-center justify-center bg-white cursor-pointer"
        >
          <FaUserDoctor
            size={32}
            className="text-2xl text-yellow-500 hover:text-white"
          />
        </Link>
        <div className="pl-4">
          <Link to="/admin/doctors" className="hover:font-semibold">
            <span className="text-lg text-white font-semibold hover:text-yellow-900 ">
              Total Doctors
            </span>
          </Link>

          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              <Link
                to="/admin/doctors"
                className="hover:text-yellow-900  text-white"
              >
                {doctors.length}
              </Link>
            </strong>
          </div>
        </div>
      </BoxWrapper>

      <BoxWrapper color="green">
        <Link
          to="/admin/approvedreq"
          className="hover:bg-green-700 rounded-full h-12 w-12 flex items-center justify-center bg-white cursor-pointer"
        >
          <IoIosCheckmarkCircleOutline
            size={38}
            className="text-2xl hover:text-white text-green-700"
          />
        </Link>
        <div className="pl-4">
          <Link to="/admin/approvedreq" className="hover:font-semibold">
            <span className="text-lg text-white font-semibold hover:text-green-900 ">
              Total Requests Approved
            </span>
          </Link>

          <div className="flex items-center">
            <strong className="text-xl font-semibold">
              <Link
                to="/admin/approvedreq"
                className="text-white hover:text-green-900"
              >
                {doctors.length}
              </Link>
            </strong>
          </div>
        </div>
      </BoxWrapper>

      <BoxWrapper color="red">
        <Link
          to="/admin/refusedreq"
          className="hover:bg-red-700 rounded-full h-12 w-12 flex items-center justify-center bg-white cursor-pointer"
        >
          <IoIosCloseCircleOutline
            size={38}
            className="text-2xl hover:text-white text-red-500"
          />
        </Link>

        <div className="pl-4">
          <Link to="/admin/refusedreq" className="hover:font-semibold">
            <span className="text-lg text-white font-semibold hover:text-red-900 ">
              Total Requests Refused
            </span>
          </Link>

          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              <Link
                to="/admin/refusedreq"
                className="text-white hover:text-red-900"
              >
                {Refused.length}
              </Link>
            </strong>
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
};

export default DashboardStatsGrid;

function BoxWrapper({ children, color }) {
  const bgColor = `bg-${color}-500`;
  return (
    <div
      className={`${bgColor} rounded-xl m-4 p-4  flex-1 border border-gray-200 flex items-center`}
    >
      {children}
    </div>
  );
}
