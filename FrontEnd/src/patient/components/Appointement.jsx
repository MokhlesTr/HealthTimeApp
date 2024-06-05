import React, { useState, useEffect } from "react";
import backgroundRdv from "../../patient/assets/img/backgroundRdv.jpg";
import { Link } from "react-router-dom";

const Appointement = () => {
  const [currentDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch appointments from the database
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch("http://localhost:3000/appointments/All");
      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  return (
    <div
      className="min-h-screen bg-neutral-200 bg-cover justify-center items-center gap-8 flex flex-col px-20 py-40"
      style={{
        backgroundImage: `url(${backgroundRdv})`,
      }}
    >
      <h1 className="text-center text-3xl font-semibold shadow-lg w-1/4 justify-center items-center space-x-4 flex mx-auto bg-white ">
        My <span className=" mx-2 text-blue-600"> Appointments </span> Table
      </h1>
      <div>
        <div className="w-full max-w-4xl m-8 rounded-lg  shadow-xl ">
          <div className="bg-white shadow-md rounded px-8 pt-6  mb-4">
            <div className="mb-4 flex flex-row gap-8 text-lg">
              <label className=" text-indigo-600  font-bold mb-2">
                Actual Date:
              </label>
              <p>{currentDate.toISOString().slice(0, 10)}</p>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1"></div>
              <Link
                to={"/patient/mysearch"}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Add Appointment
              </Link>
            </div>
            <AgendaExample appointments={appointments} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointement;

const AgendaExample = ({ appointments, handleAppointmentClick }) => {
  return (
    <div className="overflow-x-auto p-12">
      <table className="table-auto w-full ">
        <thead>
          <tr>
            <th className="px-4 py-2">Reason</th>
            <th className="px-4 py-2">Date</th>
            {/* <th className="px-4 py-2">Doctor</th> */}
            {/* <th className="px-4 py-2">Patient Name</th> */}
            <th className="px-4 py-2">Appointment Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr
              key={appointment._id}
              className="cursor-pointer  hover:bg-gray-200"
              // onClick={() => handleAppointmentClick(appointment)}
            >
              <td className="border px-4 py-2">{appointment.subject}</td>
              <td className="border px-4 py-2">{appointment.date}</td>

              {/* <td className="border px-4 py-2">{appointment.doctorId}</td> */}

              {/* <td className="border px-4 py-2">{appointment.patientId}</td> */}
              <td className="border px-4 py-2 flex text-center justify-center flex-row">
                {appointment.state === 0 ? (
                  <span className="text-neutral-600">Pending</span>
                ) : appointment.state === 1 ? (
                  <span className="text-green-600">Accepted</span>
                ) : (
                  <span className="text-red-600">Refused</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
