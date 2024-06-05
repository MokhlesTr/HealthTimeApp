// import React, { useState } from "react";

// const Test = ({ appointments, onUpdateAppointmentState }) => {
//   const [selectedView, setSelectedView] = useState("Agenda");

//   const handleViewChange = (view) => {
//     setSelectedView(view);
//   };

//   const handleAccept = (id) => {
//     updateAppointmentState(id, 1) // Assuming 1 represents "Accepted" state
//       .then(() => {
//         // Update the appointment state using the function passed from the parent component
//         onUpdateAppointmentState(id, 1);
//       })
//       .catch((error) => {
//         console.error("Error accepting appointment:", error);
//       });
//   };

//   const handleRefuse = (id) => {
//     updateAppointmentState(id, 2) // Assuming 2 represents "Refused" state
//       .then(() => {
//         // Update the appointment state using the function passed from the parent component
//         onUpdateAppointmentState(id, 2);
//       })
//       .catch((error) => {
//         console.error("Error refusing appointment:", error);
//       });
//   };

//   const handleAddAppointment = () => {
//     // Your existing code for adding appointment
//   };

//   return (
//     <div className="bg-neutral-200 justify-center items-center gap-8 flex flex-col">
//       <div>
//         <div className="w-full max-w-4xl m-8">
//           <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//             <AgendaExample2
//               appointments={appointments}
//               handleAccept={handleAccept}
//               handleRefuse={handleRefuse}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const AgendaExample2 = ({ appointments, handleAccept, handleRefuse }) => {
//   return (
//     <div className="overflow-x-auto">
//       <table className="table-auto w-full">
//         <thead>
//           <tr>
//             <th className="px-4 py-2">Subject</th>
//             <th className="px-4 py-2">Start Time</th>
//             <th className="px-4 py-2">End Time</th>
//             <th className="px-4 py-2">Doctor</th>
//             <th className="px-4 py-2">Department</th>
//             <th className="px-4 py-2">Patient Name</th>
//             <th className="px-4 py-2">Appointment Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {appointments.map((appointment) => (
//             <tr
//               key={appointment._id}
//               className="cursor-pointer hover:bg-gray-200"
//             >
//               <td className="border px-4 py-2">{appointment.Subject}</td>
//               <td className="border px-4 py-2">
//                 {new Date(appointment.StartTime).toLocaleTimeString()}
//               </td>
//               <td className="border px-4 py-2">
//                 {new Date(appointment.EndTime).toLocaleTimeString()}
//               </td>
//               <td className="border px-4 py-2">{appointment.Doctor}</td>
//               <td className="border px-4 py-2">{appointment.Department}</td>
//               <td className="border px-4 py-2">{appointment.PatientName}</td>
//               <td className="border px-4 py-2">
//                 <div className="flex flex-row justify-between">
//                   <button
//                     onClick={() => handleAccept(appointment._id)}
//                     className="bg-green-600 text-white px-1 py-1 rounded shadow-lg hover:bg-green-900"
//                   >
//                     Accept
//                   </button>
//                   <button
//                     onClick={() => handleRefuse(appointment._id)}
//                     className="bg-violet-600 text-white px-1 py-1 rounded shadow-lg hover:bg-violet-900"
//                   >
//                     Refuse
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Test;
