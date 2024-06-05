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

export default function Dashboarddd() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/patient/all`);
        if (!response.ok) {
          throw new Error("Failed to fetch patients");
        }
        const data = await response.json();
        console.log("data //////////");
        console.log(data.data);
        // Filter doctors with role 2
        const filteredUsers = data.data;
        console.log("filteredUsers //////////");
        console.log(filteredUsers);
        setUserData(filteredUsers);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchData();
  }, []);

  const calculateAgeGroup = (birthdate) => {
    const birthYear = new Date(birthdate).getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;

    if (age >= 18 && age < 30) {
      return "18-30";
    } else if (age >= 30 && age < 40) {
      return "30-39";
    } else if (age >= 40 && age <= 50) {
      return "40-50";
    } else if (age > 50) {
      return "50+";
    } else {
      return "Under 18";
    }
  };

  // Calculate distribution of users' ages
  const ageDistribution = userData.reduce((acc, user) => {
    const ageGroup = calculateAgeGroup(user.birthday);
    acc[ageGroup] = (acc[ageGroup] || 0) + 1;
    return acc;
  }, {});

  // Data for the pie chart
  const pieData = Object.entries(ageDistribution).map(([ageGroup, count]) => ({
    name: ageGroup,
    value: count,
  }));

  // Colors for the pie chart
  const COLORS = ["#FF6F61", "#6B5B95", "gray", "orange", "#00C49F"];

  return (
    <div className="w-[20rem] h-[22rem] bg-white border-2 rounded-xl p-4 border-[#333A73] flex flex-col">
      <strong className="font-semibolder bg-[#F3F4F6] hover:bg-[#333A73] text-[#333A73] hover:text-white transition-all duration-200 ease-in-out w-2/3 text-center rounded-xl">
        Patient's Age
      </strong>
      <div>
        <ResponsiveContainer width={300} height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
