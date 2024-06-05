import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function TransactionChart() {
  const [patient, setPatient] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientResponse = await fetch(
          `http://localhost:3000/patient/all`
        );
        if (!patientResponse.ok) {
          throw new Error("Failed to fetch patient data");
        }
        const patientData = await patientResponse.json();
        const filteredPatients = patientData.data;

        setPatient(filteredPatients);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  // Count the occurrences of each city for patients
  const patientCounts = patient.reduce((acc, curr) => {
    acc[curr.address] = (acc[curr.address] || 0) + 1;
    return acc;
  }, {});

  // Merge patient counts into comData
  Object.keys(patientCounts).forEach((city) => {
    patientCounts[city] = (patientCounts[city] || 0) + patientCounts[city];
  });

  // Create combinedData from comData
  const combinedData = Object.keys(patientCounts).map((city) => ({
    name: city,
    patientCount: patientCounts[city] || 0,
  }));

  return (
    <div className="h-[22rem] bg-white p-4 rounded-xl border-[#333A73] shadow-3xl border-2 flex flex-col flex-1 z-9999">
      <strong className="text-[#333A73] font-semibold text-center text-lg">
        Patients per City{" "}
      </strong>
      <div className="mt-3 w-full flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={combinedData}
            margin={{ top: 20, right: 10, left: -30, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="patientCount" fill="#333A73" name="Patient Count" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
