import React, { useState } from "react";
import Swal from "sweetalert2";
import { GoX } from "react-icons/go";
import { MdOutlineUpdate } from "react-icons/md";
const Test = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState("Agenda");
  const [appointments, setAppointments] = useState([
    {
      Id: 1,
      Subject: "General Checkup",
      StartTime: new Date(2023, 2, 10, 10, 0),
      EndTime: new Date(2023, 2, 10, 11, 0),
      Doctor: "Dr. Smith",
      Department: "General Medicine",
      PatientName: "John Doe",
    },
    {
      Id: 2,
      Subject: "Dental Checkup",
      StartTime: new Date(2023, 2, 10, 12, 0),
      EndTime: new Date(2023, 2, 10, 13, 0),
      Doctor: "Dr. Johnson",
      Department: "Dentistry",
      PatientName: "Jane Smith",
    },
    {
      Id: 3,
      Subject: "Eye Checkup",
      StartTime: new Date(2023, 2, 10, 14, 0),
      EndTime: new Date(2023, 2, 10, 15, 0),
      Doctor: "Dr. Williams",
      Department: "Ophthalmology",
      PatientName: "Michael Brown",
    },
  ]);

  const handleViewChange = (view) => {
    setSelectedView(view);
  };
  const handleAddAppointment = () => {
    Swal.fire({
      title: "Enter your Appointment data",
      html:
        '<input id="swal-input1" required class="swal2-input" placeholder="Subject">' +
        '<input id="swal-input2" required type="datetime-local" class="swal2-input">' +
        '<input id="swal-input3" required type="datetime-local" class="swal2-input">' +
        '<input id="swal-input4" required class="swal2-input" placeholder="Doctor">' +
        '<input id="swal-input5" required class="swal2-input" placeholder="Department">' +
        '<input id="swal-input6" required class="swal2-input" placeholder="Patient Name">',
      focusConfirm: false,
      preConfirm: () => {
        const subject = document.getElementById("swal-input1").value.trim();
        const startTime = new Date(
          document.getElementById("swal-input2").value
        );
        const endTime = new Date(document.getElementById("swal-input3").value);
        const doctor = document.getElementById("swal-input4").value.trim();
        const department = document.getElementById("swal-input5").value.trim();
        const patientName = document.getElementById("swal-input6").value.trim();

        if (
          !subject ||
          !startTime ||
          !endTime ||
          !doctor ||
          !department ||
          !patientName
        ) {
          Swal.showValidationMessage("All fields are required");
          return;
        }

        return [subject, startTime, endTime, doctor, department, patientName];
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const [subject, startTime, endTime, doctor, department, patientName] =
          result.value;
        const newAppointment = {
          Id: Math.max(...appointments.map((a) => a.Id), 0) + 1,
          Subject: subject,
          StartTime: startTime,
          EndTime: endTime,
          Doctor: doctor,
          Department: department,
          PatientName: patientName,
        };
        setAppointments([...appointments, newAppointment]);
      }
    });
  };

  return (
    <div className="min-h-screen bg-neutral-200  justify-center items-center gap-8 flex flex-col px-20 py-40">
      <h1 className="text-center text-3xl font-semibold shadow-lg w-1/4 justify-center items-center space-x-4 flex mx-auto bg-white ">
        Make an <span className=" mx-2 text-blue-600"> Appointement</span>
      </h1>
      <div>
        <div className="w-full max-w-4xl m-8">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Select Date:
              </label>
              <input
                type="date"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Select Date"
                value={currentDate.toISOString().slice(0, 10)}
                onChange={(e) => setCurrentDate(new Date(e.target.value))}
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Select View:
                </label>
                <div className="inline-block relative w-32">
                  <select
                    value={selectedView}
                    onChange={(e) => handleViewChange(e.target.value)}
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="Day">Day</option>
                    <option value="Week">Week</option>
                    <option value="Month">Month</option>
                    <option value="Agenda">Agenda</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 12l-6-6 1.414-1.414L10 9.172l4.586-4.586L16 6z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleAddAppointment}
              >
                Add Appointment
              </button>
            </div>
            {selectedView === "Agenda" ? (
              <AgendaExample appointments={appointments} />
            ) : (
              <DayExample />
            )}
          </div>
        </div>
      </div>
      {/* ////////////////////// */}
      <div>
        <h1 className="text-center text-3xl font-semibold shadow-lg w-2/5 justify-center items-center space-x-4 flex mx-auto bg-white ">
          Check <span className=" mx-2 text-blue-600"> Appointements</span>
        </h1>

        <div className="w-full max-w-4xl m-8">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Select Date:
              </label>
              <input
                type="date"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Select Date"
                value={currentDate.toISOString().slice(0, 10)}
                onChange={(e) => setCurrentDate(new Date(e.target.value))}
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Select View:
                </label>
                <div className="inline-block relative w-32">
                  <select
                    value={selectedView}
                    onChange={(e) => handleViewChange(e.target.value)}
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="Day">Day</option>
                    <option value="Week">Week</option>
                    <option value="Month">Month</option>
                    <option value="Agenda">Agenda</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 12l-6-6 1.414-1.414L10 9.172l4.586-4.586L16 6z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleAddAppointment}
              >
                Add Appointment
              </button>
            </div>
            {selectedView === "Agenda" ? (
              <AgendaExample2 appointments={appointments} />
            ) : (
              <DayExample />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;

const AgendaExample = ({ appointments, handleAppointmentClick }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Subject</th>
            <th className="px-4 py-2">Start Time</th>
            <th className="px-4 py-2">End Time</th>
            <th className="px-4 py-2">Doctor</th>
            <th className="px-4 py-2">Department</th>
            <th className="px-4 py-2">Patient Name</th>
            <th className="px-4 py-2">Appointement Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr
              key={appointment.Id}
              className="cursor-pointer hover:bg-gray-200"
              onClick={() => handleAppointmentClick(appointment)}
            >
              <td className="border px-4 py-2">{appointment.Subject}</td>
              <td className="border px-4 py-2">
                {appointment.StartTime.toLocaleTimeString()}
              </td>
              <td className="border px-4 py-2">
                {appointment.EndTime.toLocaleTimeString()}
              </td>
              <td className="border px-4 py-2">{appointment.Doctor}</td>
              <td className="border px-4 py-2">{appointment.Department}</td>
              <td className="border px-4 py-2">{appointment.PatientName}</td>
              <td className="border px-4 py-2 flex flex-row">
                Pending...{" "}
                <span className="ml-4 text-red-600 hover:text-red-800">
                  <GoX size={28} />
                </span>
                <span className=" text-green-600 hover:text-green-800  ">
                  <MdOutlineUpdate size={28} />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const AgendaExample2 = ({ appointments, handleAppointmentClick }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Subject</th>
            <th className="px-4 py-2">Start Time</th>
            <th className="px-4 py-2">End Time</th>
            <th className="px-4 py-2">Doctor</th>
            <th className="px-4 py-2">Department</th>
            <th className="px-4 py-2">Patient Name</th>
            <th className="px-4 py-2">Appointement Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr
              key={appointment.Id}
              className="cursor-pointer hover:bg-gray-200"
              onClick={() => handleAppointmentClick(appointment)}
            >
              <td className="border px-4 py-2">{appointment.Subject}</td>
              <td className="border px-4 py-2">
                {appointment.StartTime.toLocaleTimeString()}
              </td>
              <td className="border px-4 py-2">
                {appointment.EndTime.toLocaleTimeString()}
              </td>
              <td className="border px-4 py-2">{appointment.Doctor}</td>
              <td className="border px-4 py-2">{appointment.Department}</td>
              <td className="border px-4 py-2">{appointment.PatientName}</td>
              <td className="border px-4 py-2">
                <div className="flex flex-row justify-between">
                  <button className="bg-green-600 text-white px-1 py-1 rounded  shadow-lg hover:bg-green-900">
                    Accept
                  </button>
                  <button className="bg-violet-600 text-white px-1 py-1 rounded  shadow-lg hover:bg-violet-900">
                    Refuse
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const DayExample = () => {
  return <h1>Day</h1>;
};
