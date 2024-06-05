import React, { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

export default function RequestDash() {
  const [doctor, setDoctor] = useState([]);
  const [refused, setRefused] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const userResponse = await fetch(`http://localhost:3000/user`);
        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await userResponse.json();

        const filteredUsers = userData.filter(
          (user) => user.role === 2 && user.state === 1
        );
        const userIds = filteredUsers.map((user) => user._id);

        const doctorResponse = await fetch(`http://localhost:3000/doctor`);
        if (!doctorResponse.ok) {
          throw new Error("Failed to fetch doctor data");
        }
        const doctorData = await doctorResponse.json();

        const userIdToEmail = filteredUsers.reduce((acc, user) => {
          acc[user._id] = user?.email;
          return acc;
        }, {});

        const filteredDoctors = doctorData
          .filter((doctor) => userIds.includes(doctor.userId))
          .map((doctor) => ({
            ...doctor,
            email: userIdToEmail[doctor.userId],
          }));

        setDoctor(filteredDoctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    const fetchRefused = async () => {
      try {
        const userResponse = await fetch(`http://localhost:3000/user`);
        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await userResponse.json();

        const filteredUsers = userData.filter(
          (user) => user.role === 2 && user.state === 2
        );
        const userIds = filteredUsers.map((user) => user._id);

        const doctorResponse = await fetch(`http://localhost:3000/doctor`);
        if (!doctorResponse.ok) {
          throw new Error("Failed to fetch doctor data");
        }
        const doctorData = await doctorResponse.json();

        const userIdToEmail = filteredUsers.reduce((acc, user) => {
          acc[user._id] = user.email;
          return acc;
        }, {});

        const filteredDoctors = doctorData
          .filter((doctor) => userIds.includes(doctor.userId))
          .map((doctor) => ({
            ...doctor,
            email: userIdToEmail[doctor.userId],
          }));

        setRefused(filteredDoctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
    fetchRefused();
  }, []);

  // Count the occurrences of each city for doctors
  const ApprovedRequests = doctor.reduce((acc, curr) => {
    acc[curr.address] = (acc[curr.address] || 0) + 1;
    return acc;
  }, {});

  // Count the occurrences of each city for refused
  const refusedCounts = refused.reduce((acc, curr) => {
    acc[curr.address] = (acc[curr.address] || 0) + 1;
    return acc;
  }, {});

  // Merge patient counts into comData
  const comData = { ...ApprovedRequests };
  Object.keys(refusedCounts).forEach((city) => {
    comData[city] = (comData[city] || 0) + refusedCounts[city];
  });

  // Create combinedData from comData
  const combinedData = Object.keys(comData).map((city) => ({
    name: city,
    ApprovedRequest: ApprovedRequests[city] || 0,
    RefusedRequest: refusedCounts[city] || 0,
  }));

  return (
    <div className="h-[22rem] bg-white p-4 rounded-xl border-[#333A73] shadow-3xl border-2 flex flex-col flex-1 z-9999">
      <strong className="text-[#333A73] font-semibold text-center text-lg">
        Requests Chart
      </strong>
      <div className="mt-3 w-full flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={combinedData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="ApprovedRequest" stroke="#8884d8" />
            <Line type="monotone" dataKey="RefusedRequest" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
