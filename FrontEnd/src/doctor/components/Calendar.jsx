import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

const Calendar = () => {
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
      console.log("dataAppppp", data.length);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleAccept = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/appointments/${id}/accept`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ state: 1 }), // Assuming 1 represents "Accepted" state
        }
      );
      if (!response.ok) {
        throw new Error("Failed to accept appointment");
      }
      // Update the local state to reflect the change
      const updatedAppointments = appointments.map((appointment) =>
        appointment._id === id ? { ...appointment, state: 1 } : appointment
      );
      setAppointments(updatedAppointments);
    } catch (error) {
      console.error("Error accepting appointment:", error);
    }
  };

  const handleRefuse = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/appointments/${id}/refuse`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ state: 2 }), // Assuming 2 represents "Refused" state
        }
      );
      if (!response.ok) {
        throw new Error("Failed to refuse appointment");
      }
      // Update the local state to reflect the change
      const updatedAppointments = appointments.map((appointment) =>
        appointment._id === id ? { ...appointment, state: 2 } : appointment
      );
      setAppointments(updatedAppointments);
    } catch (error) {
      console.error("Error refusing appointment:", error);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-200 bg-cover mt-20 items-center gap-8 flex flex-col ">
      <h1 className="text-center text-3xl font-semibold shadow-lg w-1/4 justify-center items-center space-x-4 flex mx-auto lg:bg-white ">
        <span className=" mx-2 text-blue-600"> Appointments </span> Table
      </h1>
      <div>
        <div className="  rounded-lg  shadow-xl  ">
          <div className="bg-white shadow-md rounded px-8 pt-6 p-8  mb-4">
            <div className="mb-4 flex flex-row gap-8 text-lg">
              <label className=" text-indigo-600  font-bold mb-2">
                Actual Date:
              </label>
              <p>{currentDate.toISOString().slice(0, 10)}</p>
            </div>
            <AgendaExample
              appointments={appointments}
              handleAccept={handleAccept}
              handleRefuse={handleRefuse}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;

const AgendaExample = ({ appointments, handleAccept, handleRefuse }) => {
  return (
    <div className="">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Reason</th>
            <th className="px-4 py-2">Date</th>
            {/* <th className="px-4 py-2">DoctorId</th> */}
            {/* <th className="px-4 py-2">PatientId</th> */}
            <th className="px-4 py-2"> Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr
              key={appointment._id}
              className="cursor-pointer hover:bg-gray-200"
              // onClick={() => handleAppointmentClick(appointment)}
            >
              <td className="border px-4 py-2">{appointment.subject}</td>
              <td className="border px-4 py-2">{appointment.date}</td>

              {/* <td className="border px-4 py-2">{appointment.doctorId}</td> */}

              {/* <td className="border px-4 py-2">{appointment.patientId}</td> */}
              <td className="border px-4 py-2 flex flex-row">
                {appointment.state === 0 ? (
                  <span className="text-neutral-600 flex flex-row gap-4 font-semibold">
                    Pending{" "}
                    <span
                      onClick={() => handleAccept(appointment._id)}
                      className="text-green-600"
                    >
                      <FaCheck size={24} />
                    </span>
                    <span
                      onClick={() => handleRefuse(appointment._id)}
                      className="text-red-600"
                    >
                      <FaTimes size={24} />
                    </span>
                  </span>
                ) : appointment.state === 1 ? (
                  <span className="bg-green-600 text-white px-4 py-1 mx-auto rounded-lg font-semibold">
                    Accepted
                  </span>
                ) : (
                  <span className="bg-red-600 text-white px-5 py-1 mx-auto rounded-lg font-semibold">
                    Refused
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
