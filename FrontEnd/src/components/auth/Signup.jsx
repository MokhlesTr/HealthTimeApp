import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
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
      const data = await response.json();

      if (response.ok) {
        // Signup successful
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Signup successful!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/login");
      } else {
        // Signup failed
        console.error("Signup failed:", data.message);
        alert("Signup failed: " + data.message);
      }
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed: " + error.message);
    }
  }

  return (
    <div
      style={{
        backgroundImage: `url("https://images.pexels.com/photos/6941882/pexels-photo-6941882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
      }}
      className="relative overflow-hidden min-h-screen py-36 bg-cover bg-center bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8"
    >
      <div className="bg-white bg-opacity-50 border  p-12 rounded-3xl shadow-xl max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
          Sign up
        </h2>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />

            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />

            <div className="flex items-center space-x-4">
              <label className="block text-sm font-medium text-gray-700">
                Gender :
              </label>
              <div className="flex items-center space-x-4">
                <input
                  id="male"
                  name="gender"
                  type="radio"
                  value="male"
                  onChange={(e) => setGender(e.target.checked ? "male" : "")}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label
                  htmlFor="male"
                  className="text-sm font-medium text-gray-700"
                >
                  Male
                </label>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  id="female"
                  name="gender"
                  type="radio"
                  value="female"
                  onChange={(e) => setGender(e.target.checked ? "female" : "")}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label
                  htmlFor="female"
                  className="text-sm font-medium text-gray-700"
                >
                  Female
                </label>
              </div>
            </div>

            <input
              id="birthday"
              name="birthday"
              type="date"
              autoComplete="birthday"
              required
              placeholder="Birthday"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />

            <select
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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

            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              minLength="8"
              maxLength="8"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/, ""))}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />

            <div className="relative">
              <input
                id="password"
                name="password"
                type={!showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                minLength="6"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setShowPassword(true)}
                onBlur={() => setShowPassword(false)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 z-50 right-0 flex items-center px-2 text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-900 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:scale-105"
            >
              Create
            </button>
          </div>
        </form>

        <div className="text-sm">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-900 hover:underline ml-2"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
