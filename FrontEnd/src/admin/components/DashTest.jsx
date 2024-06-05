import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const DashTest = () => {
  const [pat, setPat] = useState([]);

  useEffect(() => {
    const fetchPat = async () => {
      try {
        const response = await fetch("http://localhost:3000/patient/all");
        if (!response.ok) {
          throw new Error("Failed to fetch patient data");
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        setPat(data.data);
      } catch (e) {
        console.log("Error fetching data: " + e.message);
      }
    };
    fetchPat();
  }, []);

  const patientCounts = pat.reduce((acc, curr) => {
    const city = curr.address; //current value
    if (city) {
      acc[city] = (acc[city] || 0) + 1;
    }
    return acc;
  }, {});

  const chartData = Object.keys(patientCounts).map((city) => ({
    name: city,
    count: patientCounts[city],
  }));

  return (
    <div className="bg-white p-4 justify-center items-center mx-auto">
      <BarChart width={730} height={250} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip /> {/* kil mouraba3 fou9 il bar*/}
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default DashTest;
