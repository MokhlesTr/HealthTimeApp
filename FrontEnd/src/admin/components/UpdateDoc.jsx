import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const UpdateDoc = ({ setUp }) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (
        !fname ||
        !lname ||
        !email ||
        !specialization ||
        !username ||
        !email ||
        !phone ||
        !age ||
        !address ||
        !password
      ) {
        throw new Error("Please fill out all fields.");
      }

      const response = await fetch("http://localhost:3000/doctor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fname,
          lname,
          email,
          specialization,
          username,
          phone,
          age,
          address,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Registration failed. Please try again later.");
      }

      // Reset form fields
      setFname("");
      setLname("");
      setSpecialization("");
      setUsername("");
      setEmail("");
      setPhone("");
      setAge("");
      setAddress("");
      setPassword("");

      navigate("/admin/doctors");
      setUp(false);
      Swal.fire({
        title: "Doctor Successfully Updated",
        html: `
          <div>
            <p><strong>First Name:</strong> ${fname}</p>
            <p><strong>Last Name:</strong> ${lname}</p>
            <p><strong>Specialization:</strong> ${specialization}</p>
            <p><strong>Username:</strong> ${username}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Age:</strong> ${age}</p>
            <p><strong>Address:</strong> ${address}</p>
          </div>`,
        icon: "success",
        showCloseButton: true,
        confirmButtonColor: "green",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (error) {
      console.error("Failed Updating", error);
      Swal.fire({
        icon: "error",
        title: "Failed Updating!",
        text: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center flex-col justify-self-start self-start p-4 sm:px-6 lg:px-8 mb-12 ">
      <h1 className="text-3xl font-bold text-center text-black mb-6">
        Add New Doctor
      </h1>

      <form
        className=" bg-blue-300 p-8 rounded-xl space-y-4 border border-black"
        onSubmit={handleSubmit}
      >
        <div className="31 flex flex-row">
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
              value={fname}
              onChange={(e) => setFname(e.target.value)}
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
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="doctorSpeciality" className="sr-only">
              Specialization
            </label>
            <select
              id="doctorSpeciality"
              name="doctorSpeciality"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              required
              className="appearance-none mt-4 w-full rounded-md relative block  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
        </div>
        <div className="32 flex flex-row">
          <div>
            <label htmlFor="lastName" className="sr-only">
              Username
            </label>
            <input
              id="lastName"
              type="text"
              autoComplete="family-name"
              placeholder="Username"
              required
              className="appearance-none mt-4 rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="username" className="sr-only">
              Phone
            </label>
            <input
              id="username"
              type="tel"
              autoComplete="username"
              placeholder="Phone"
              required
              maxLength="8"
              minLength="8"
              className="appearance-none mt-4 rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className="33 flex flex-row ">
          <div>
            <label htmlFor="mobile" className="sr-only">
              Age
            </label>
            <input
              id="mobile"
              type="text"
              autoComplete="mobile"
              placeholder="Age"
              required
              title="Please enter a valid 8-digit mobile number"
              className="appearance-none mt-4 rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              value={age}
              onChange={(e) => setAge(e.target.value.replace(/\D/, ""))}
            />
          </div>
          <div>
            <label htmlFor="city" className="sr-only">
              Address
            </label>
            <select
              id="city"
              name="city"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="appearance-none mt-4 rounded-md relative block w-52  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="Password"
              required
              className="appearance-none mt-4 rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            {isSubmitting ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};
