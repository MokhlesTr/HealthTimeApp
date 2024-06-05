import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddUser = ({ setAdd }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !birthday ||
        !gender ||
        !address ||
        !password
      ) {
        throw new Error("Please fill out all fields.");
      }

      // Check if email already exists
      const emailExistsResponse = await fetch(
        `http://localhost:3000/auth/check-email?email=${email}`
      );
      const emailExistsData = await emailExistsResponse.json();

      if (emailExistsData.exists) {
        throw new Error("Email already exists.");
      }

      const response = await fetch("http://localhost:3000/patient/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          gender,
          birthday,
          address,
          phone,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Registration failed. Please try again later.");
      }

      // Reset form fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setBirthday("");
      setGender("");
      setAddress("");
      setPassword("");

      navigate("/admin/userstable");
      setAdd(false);
      Swal.fire({
        title: "Doctor Successfully Added",
        html: `
          <div>
            <p><strong>First Name:</strong> ${firstName}</p>
            <p><strong>Username:</strong> ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Age:</strong> ${birthday}</p>
            <p><strong>Gender:</strong> ${gender}</p>
            <p><strong>Address:</strong> ${address}</p>
          </div>`,
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
      console.error("Registration failed:", error);
      Swal.fire({
        icon: "error",
        title: "Adding Failed!",
        text: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center flex-col  justify-self-start self-start p-4 sm:px-6 lg:px-8 mb-12 ">
      <h1 className="text-3xl font-bold text-center text-black mb-6">
        Add New User
      </h1>
      <form
        className="bg-blue-300 border-white border-4 p-8 rounded-xl space-y-4 shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="text-gray-700 sr-only">
              First Name
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="Enter firstName"
              required
              className="mt-2 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="lastName" className="text-gray-700 sr-only">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              autoComplete="lastName"
              placeholder="Enter lastName"
              required
              className="mt-2 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="text-gray-700 sr-only">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Enter email"
              required
              className="mt-2 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="phone" className="text-gray-700 sr-only">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              autoComplete="phone"
              placeholder="Enter phone"
              required
              maxLength="8"
              minLength="8"
              className="mt-2 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="text-gray-700 sr-only">
              City
            </label>
            <select
              id="city"
              name="city"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
            <label htmlFor="password" className="text-gray-700  sr-only">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="Enter password"
              required
              className="mt-2 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <label htmlFor="birthday" className="text-gray-700  sr-only">
              Age
            </label>
            <input
              id="birthday"
              name="birthday"
              type="date"
              autoComplete="birthday"
              required
              placeholder="Birthday"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="mt-2 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex items-center">
            <span className="text-gray-700 sr-only">Gender:</span>
            <div className="mr-8 flex items-center space-x-2">
              <div>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <label htmlFor="male" className="ml-2 text-white font-semibold">
                  Male
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) => setGender(e.target.value)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <label
                  htmlFor="female"
                  className="ml-2 text-white font-semibold"
                >
                  Female
                </label>
              </div>
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
          >
            {isSubmitting ? "Adding..." : "Add Patient"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
