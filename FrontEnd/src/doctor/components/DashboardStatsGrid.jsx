import React, { useEffect, useState } from "react";
import { TbReportAnalytics } from "react-icons/tb";
import { HiOutlineUsers } from "react-icons/hi";
import { Link } from "react-router-dom";
// import { MdOutlineAccessTime } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
// import Appointement from "../../patient/components/Appointement";

const DashboardStatsGrid = () => {
  const [reports, setReports] = useState();
  const [users, setUsers] = useState();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch(`http://localhost:3000/rapports`);
        if (!response.ok) {
          throw new Error("Failed to fetch reports");
        }
        const data = await response.json();
        setReports(data);
        console.log(reports);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };
    fetchReports();
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

    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://localhost:3000/appointments/All");
        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }
        const data = await response.json();
        setAppointments(data.length);
        // console.log("dataAppppp", data.length);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchUsers();
    fetchAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex gap-4 w-full">
      <BoxWrapper color="sky">
        <Link
          to="/doctor/patients"
          className="hover:bg-sky-700 rounded-full h-12 w-12 flex items-center justify-center bg-white cursor-pointer"
        >
          <HiOutlineUsers
            size={32}
            className="text-2xl  text-sky-900 hover:text-white"
          />
        </Link>
        <div className="pl-4">
          <Link to="/doctor/patients" className="hover:font-semibold">
            <span className="text-lg text-white font-semibold hover:text-sky-900 hover:font-semibold">
              Total Patients Visited
            </span>
          </Link>

          <div className="flex items-center">
            <strong className="text-xl  font-semibold">
              <Link
                to="/doctor/patients"
                className="hover:text-sky-900 text-white hover:font-semibold"
              >
                {users?.length}
              </Link>
            </strong>
          </div>
        </div>
      </BoxWrapper>

      <BoxWrapper color="green">
        <Link
          to="/doctor/reports"
          className="hover:bg-green-700 rounded-full h-12 w-12 flex items-center justify-center bg-white cursor-pointer"
        >
          <TbReportAnalytics
            size={32}
            className="text-2xl text-green-900 hover:text-white"
          />
        </Link>
        <div className="pl-4">
          <Link to="/doctor/reports" className="hover:font-semibold">
            <span className="text-lg text-white font-semibold hover:text-green-900 hover:font-semibold">
              Total Medical reports
            </span>
          </Link>

          <div className="flex items-center">
            <strong className="text-xl  font-semibold">
              <Link
                to="/doctor/reports"
                className="hover:text-green-900 text-white "
              >
                {reports?.length}
              </Link>
            </strong>
          </div>
        </div>
      </BoxWrapper>

      <BoxWrapper color="red">
        <Link
          to="/doctor/calendar"
          className="hover:bg-red-700 rounded-full h-12 w-12 flex items-center justify-center bg-white cursor-pointer"
        >
          <IoIosCheckmarkCircleOutline
            size={38}
            className="text-2xl text-red-900 hover:text-white"
          />
        </Link>
        <div className="pl-4">
          <Link to="/doctor/calendar" className="hover:font-semibold">
            <span className="text-lg text-white font-semibold hover:text-red-900 hover:font-semibold">
              Total Appointments Today
            </span>
          </Link>

          <div className="flex items-center">
            <strong className="text-xl  font-semibold">
              <Link
                to="/doctor/calendar"
                className="hover:text-red-900 text-white "
              >
                {appointments}
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
