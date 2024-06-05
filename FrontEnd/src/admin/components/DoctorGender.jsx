import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

// Custom label rendering function
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
  const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function DoctorGender() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch(
          `http://localhost:3000/appointments/All`
        );
        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await userResponse.json();
        setData(userData);
        console.log("userData=========>", userData);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchData();
  }, []);

  // Count appointments based on state
  const acceptedCount = data.filter(
    (appointment) => appointment.state === 1
  ).length;
  const refusedCount = data.filter(
    (appointment) => appointment.state === 2
  ).length;

  const totalAppointments = acceptedCount + refusedCount;

  // Data for the pie chart
  const pieData = [
    { name: "Accepted", value: (acceptedCount / totalAppointments) * 100 },
    { name: "Refused", value: (refusedCount / totalAppointments) * 100 },
  ];

  // Colors for the pie chart
  const COLORS = ["#00C49F", "#BC7FCD"];

  return (
    <div className="w-[20rem] h-[22rem] bg-white border-2 rounded-xl p-4 border-[#333A73] flex flex-col">
      <strong className="font-semibolder bg-[#F3F4F6] hover:bg-[#333A73] text-[#333A73] hover:text-white transition-all duration-200 ease-in-out w-2/3 text-center rounded-xl">
        Appointment's status
      </strong>
      <div className="mt-3 w-full flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={300}>
            <Pie
              data={pieData}
              cx="50%"
              cy="45%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={105}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
