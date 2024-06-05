import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const EditDoc = ({ doctorId, onCancel, onSave }) => {
  const [doctorData, setDoctorData] = useState({
    _id: "",
    fname: "",
    lname: "",
    specialization: "",
    email: "", // Add email field
    phone: "",
    age: "",
    gender: "",
    address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/doctor/${doctorId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch doctor data");
        }
        const data = await response.json();
        setDoctorData(data);

        // Fetch user data based on doctor's userId to get email
        const userResponse = await fetch(
          `http://localhost:3000/user/${data.userId}`
        );
        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await userResponse.json();
        setDoctorData((prevData) => ({ ...prevData, email: userData.email }));
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchDoctorData();
  }, [doctorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSave(doctorData);

      setDoctorData((prevData) => ({
        ...prevData,
        fname: "",
        lname: "",
        specialization: "",
        email: "",
        phone: "",
        age: "",
        gender: "",
        address: "",
      }));

      Swal.fire({
        title: "Doctor Successfully Updated",
        icon: "success",
        showCloseButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload(); // Reload the page
        }
      });
    } catch (error) {
      console.error("Update failed:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed!",
        text: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center flex-col justify-self-start self-start p-4 sm:px-6 lg:px-8 mb-12">
      <h1 className="text-3xl font-bold text-center text-black mb-6">
        Edit Doctor
      </h1>
      <form
        className="bg-blue-300 p-8 rounded-xl space-y-4 border border-black"
        onSubmit={handleSubmit}
      >
        {/* Form fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="sr-only">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              autoComplete="given-name"
              placeholder="First Name"
              required
              className="appearance-none mt-4 rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              value={doctorData.fname}
              onChange={(e) =>
                setDoctorData({ ...doctorData, fname: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="lastName" className="sr-only">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              autoComplete="family-name"
              placeholder="Last Name"
              required
              className="appearance-none mt-4 rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              value={doctorData.lname}
              onChange={(e) =>
                setDoctorData({ ...doctorData, lname: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="doctorSpeciality" className="sr-only">
              Specialization
            </label>
            <select
              id="doctorSpeciality"
              name="doctorSpeciality"
              value={doctorData.specialization}
              onChange={(e) =>
                setDoctorData({
                  ...doctorData,
                  specialization: e.target.value,
                })
              }
              required
              className="appearance-none mt-4 rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            >
              <option value="" disabled>
                Select Doctor Speciality
              </option>
              <option value="Anesthesiology">Anesthesiology</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Endocrinology">Endocrinology</option>
              <option value="Gastroenterology">Gastroenterology</option>
              <option value="Hematology">Hematology</option>
              <option value="Infectious Disease">Infectious Disease</option>
              <option value="Nephrology">Nephrology</option>
              <option value="Neurology">Neurology</option>
              <option value="Oncology">Oncology</option>
              <option value="Ophthalmology">Ophthalmology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Otolaryngology">Otolaryngology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Psychiatry">Psychiatry</option>
              <option value="Pulmonology">Pulmonology</option>
              <option value="Radiology">Radiology</option>
              <option value="Rheumatology">Rheumatology</option>
              <option value="Urology">Urology</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Email"
              required
              className="appearance-none mt-4 rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm "
              value={doctorData.email}
              onChange={(e) =>
                setDoctorData({ ...doctorData, email: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="phone" className="sr-only">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              autoComplete="phone"
              placeholder="Phone"
              required
              maxLength="8"
              minLength="8"
              className="appearance-none mt-4 rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              value={doctorData.phone}
              onChange={(e) =>
                setDoctorData({ ...doctorData, phone: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="city" className="sr-only">
              Address
            </label>
            <select
              id="city"
              name="city"
              value={doctorData.address}
              onChange={(e) =>
                setDoctorData({ ...doctorData, address: e.target.value })
              }
              required
              className="appearance-none mt-4 rounded-md relative block w-52 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            >
              <option value="" disabled>
                Select City
              </option>
              <option value="Tunis">Tunis</option>
              <option value="Sfax">Sfax</option>
              <option value="Sousse">Sousse</option>
              <option value="Gabès">Gabès</option>
              <option value="Kairouan">Kairouan</option>
              <option value="Bizerte">Bizerte</option>
              <option value="Gafsa">Gafsa</option>
              <option value="Ariana">Ariana</option>
              <option value="El Mourouj">El Mourouj</option>
              <option value="Ben Arous">Ben Arous</option>
              <option value="Kasserine">Kasserine</option>
              <option value="Monastir">Monastir</option>
              <option value="Sidi Bouzid">Sidi Bouzid</option>
              <option value="Tataouine">Tataouine</option>
              <option value="Médenine">Médenine</option>
              <option value="Mahdia">Mahdia</option>
              <option value="Nabeul">Nabeul</option>
              <option value="Kef">Kef</option>
              <option value="Jendouba">Jendouba</option>
              <option value="Tozeur">Tozeur</option>
              <option value="Zarzis">Zarzis</option>
              <option value="Djerba">Djerba</option>
            </select>
          </div>
          <div>
            <label htmlFor="age" className="sr-only">
              Age
            </label>
            <input
              id="age"
              name="age"
              type="date"
              autoComplete="age"
              required
              placeholder="Birthday"
              value={doctorData.age}
              onChange={(e) =>
                setDoctorData({ ...doctorData, age: e.target.value })
              }
              className="appearance-none rounded-md relative block w-52 px-1 h-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>
          <div className="flex flex-row items-center space-x-4">
            <label className="text-sm">Gender:</label>
            <div>
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={doctorData.gender === "male"}
                onChange={(e) =>
                  setDoctorData({ ...doctorData, gender: e.target.value })
                }
              />
              <label htmlFor="male" className="ml-2">
                Male
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={doctorData.gender === "female"}
                onChange={(e) =>
                  setDoctorData({ ...doctorData, gender: e.target.value })
                }
              />
              <label htmlFor="female" className="ml-2">
                Female
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDoc;
