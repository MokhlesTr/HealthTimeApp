import React, { useRef, useState, useEffect } from "react";
import ReactToPrint from "react-to-print";
import { MdLocalPrintshop } from "react-icons/md";
import Swal from "sweetalert2";
import { IoAddCircleOutline } from "react-icons/io5";
import useLocalStorageUser from "../../hooks/useLocalStorageUser";

const MedicalReport = () => {
  const componentRef = useRef();
  const [addRapp, setAddRapp] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [selectedUser, setSelectedUser] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [description, setDescription] = useState("");
  const [prescriptions, setPrescriptions] = useState([
    { name: "", dosage: "", duration: "" },
  ]);
  const [reports, setReports] = useState([]);
  const [doctorEmail, setDoctorEmail] = useState("");
  const { value: localStorageUser } = useLocalStorageUser();
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:3000/patient/all`);
        if (!response.ok) {
          throw new Error("Failed to fetch patients");
        }
        const data = await response.json();
        setUsers(data.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch(`http://localhost:3000/rapports`);
        if (!response.ok) {
          throw new Error("Failed to fetch reports");
        }
        const data = await response.json();
        setReports(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };
    fetchReports();
  }, []);

  const fetchSelectedUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/user/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch selected user data");
      }
      const data = await response.json();
      setSelectedUser(data);
    } catch (error) {
      console.error("Error fetching selected user data:", error);
    }
  };

  useEffect(() => {
    if (selectedUserId) {
      fetchSelectedUser(selectedUserId);
    }
  }, [selectedUserId]);

  useEffect(() => {
    setAppointmentDate(getCurrentDate());
  }, []);

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        const responseEmail = await fetch(
          `http://localhost:3000/user/${localStorageUser.id}`
        );
        const dataEmail = await responseEmail.json();
        setDoctorEmail(dataEmail.email);

        const responseDoctors = await fetch(`http://localhost:3000/doctor`);
        if (!responseDoctors.ok) {
          throw new Error("Failed to fetch doctors");
        }
        const dataDoctors = await responseDoctors.json();
        const doctor = dataDoctors.find(
          (singleDoctor) => singleDoctor.userId === localStorageUser.id
        );
        if (!doctor) {
          throw new Error("Failed to fetch user information");
        }
        setUser(doctor);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchDoctorInfo();
  }, [localStorageUser]);

  const handleAddPrescription = () => {
    setPrescriptions([
      ...prescriptions,
      { name: "", dosage: "", duration: "" },
    ]);
  };

  const handlePrescriptionChange = (index, field, value) => {
    const newPrescriptions = [...prescriptions];
    newPrescriptions[index][field] = value;
    setPrescriptions(newPrescriptions);
  };

  const handleSaveReport = async () => {
    if (
      !selectedUserId ||
      !appointmentDate ||
      !description ||
      prescriptions.some((p) => !p.name || !p.dosage || !p.duration)
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please complete all fields before saving the report.",
      });
      return;
    }

    const newReport = {
      patient: selectedUserId,
      appointmentDate,
      description,
      prescription: prescriptions,
    };

    try {
      const response = await fetch(`http://localhost:3000/rapports`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReport),
      });

      if (response.ok) {
        setReports([...reports, newReport]);
        setAddRapp(false);
        setDescription("");
        setPrescriptions([{ name: "", dosage: "", duration: "" }]);
      } else {
        console.error("Failed to save report");
      }
    } catch (error) {
      console.error("Error saving report:", error);
    }
  };

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  return (
    <div className="px-10 pt-8 border-b border-gray-300">
      <div className="flex justify-end">
        {addRapp && (
          <ReactToPrint
            trigger={() => (
              <button className="bg-gray-500 text-white px-4 py-2 flex flex-row gap-3 rounded">
                Print <MdLocalPrintshop size={24} />
              </button>
            )}
            content={() => componentRef.current}
          />
        )}
        {addRapp && (
          <button
            onClick={() => handleSaveReport()}
            className="bg-blue-500 text-white px-4 mx-4 py-2 flex flex-row gap-3 rounded"
          >
            Save Report
          </button>
        )}

        <button
          onClick={() => setAddRapp(!addRapp)}
          className={`px-5 py-2  rounded text-white ml-2 font-semibold shadow-lg transition duration-300  ${
            addRapp
              ? "bg-red-700 hover:bg-red-900"
              : "bg-blue-700 hover:bg-blue-900"
          } `}
        >
          {!addRapp ? "Add" : "Cancel"}
        </button>
      </div>

      {addRapp && (
        <div className="flex justify-center mx-40">
          <div
            className="papier w-full bg-white items-center mt-4 border-double rounded-lg border-gray-900 outline-double shadow-xl"
            ref={componentRef}
          >
            <h1 className="font-semibold text-center text-3xl py-8 border-b border-gray-300">
              Medical Report <br />
              <span className="text-lg text-neutral-600 ">
                Dr. {doctorEmail.split("@")[0].toUpperCase()}
              </span>
            </h1>

            <div className="flex items-center px-10 py-8 border-b border-gray-300">
              <div>
                <h2 className="font-semibold text-lg mb-2">
                  Patient's Information:
                </h2>
                <select
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                  className="w-full p-2 flex justify-center rounded"
                  required
                >
                  <option value="">Select a patient</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.firstName} {user.lastName} - {user.address} -{" "}
                      {user.gender} - {user.phone}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="px-10 py-8 border-b border-gray-300">
              <div className="flex items-center">
                <p className="font-semibold mr-4">Appointment Date:</p>
                <input
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  required
                />
              </div>
              <div className="pt-8">
                <h2 className="font-semibold mb-4">Prescription</h2>
                {prescriptions.map((prescription, index) => (
                  <div key={index} className="flex items-center mb-4">
                    <input
                      className="w-full p-2 border border-gray
              -600 mr-2"
                      type="text"
                      placeholder="Prescription Name"
                      value={prescription.name}
                      onChange={(e) =>
                        handlePrescriptionChange(index, "name", e.target.value)
                      }
                      required
                    />
                    <input
                      className="w-full p-2 border border-gray-600 mr-2"
                      type="text"
                      placeholder="Dosage"
                      value={prescription.dosage}
                      onChange={(e) =>
                        handlePrescriptionChange(
                          index,
                          "dosage",
                          e.target.value
                        )
                      }
                      required
                    />
                    <input
                      className="w-full p-2 border border-gray-600"
                      type="text"
                      placeholder="Duration"
                      value={prescription.duration}
                      onChange={(e) =>
                        handlePrescriptionChange(
                          index,
                          "duration",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>
                ))}
                <button
                  onClick={handleAddPrescription}
                  className="text-neutral-300 flex  px-4 py-2 "
                >
                  <IoAddCircleOutline size={34} />
                </button>
              </div>
            </div>
          </div>
          <div className="px-10 pt-8 max-w-1/2">
            <h2 className="font-semibold mb-4">Description</h2>
            <div>
              <textarea
                rows={4}
                className="w-96 p-4 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Write a comment..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
      )}

      <div>
        <h1 className="font-semibold text-center text-3xl py-8 border-b border-black">
          Reports history
        </h1>
        <table className="w-full border border-black shadow-lg">
          <thead>
            <tr className="bg-blue-600 text-white font-semibold">
              <th className="p-2 text-center border border-black">Patient</th>
              <th className="p-2 text-center border border-black">Date</th>
              <th className="p-2 text-center border border-black">
                Description
              </th>
              <th className="p-2 text-center border border-black ">
                Prescription
              </th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={index}>
                <td className="p-2 text-center border border-black">
                  {report.patient}
                </td>
                <td className="p-2 text-center border border-black">
                  {report.appointmentDate}
                </td>
                <td className="p-2 text-center border border-black">
                  {report.description}
                </td>
                <td className="p-2 text-center border border-black">
                  {report.prescription.map((item, index) => (
                    <div key={index}>
                      {item.name} - {item.dosage} - {item.duration}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicalReport;
