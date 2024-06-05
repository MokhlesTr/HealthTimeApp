import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const DocIns = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    specialization: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    address: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // New state for checkbox
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      if (!isChecked) {
        throw new Error(
          "Please agree to the Terms of Service and Privacy Policy."
        );
      }

      const response = await fetch("http://localhost:3000/doctor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Registration failed. Please try again later.");
      }

      // Reset form fields
      setFormData({
        fname: "",
        lname: "",
        specialization: "",
        email: "",
        phone: "",
        age: "",
        gender: "",
        address: "",
        password: "",
      });

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Registration successful",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      Swal.fire({
        icon: "error",
        title: "Registration failed",
        text: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="relative overflow-hidden min-h-screen py-36 bg-cover bg-center bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url("https://images.pexels.com/photos/6941882/pexels-photo-6941882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
      }}
    >
      <div className="bg-white bg-opacity-50 border p-12 mt-8 rounded-3xl shadow-xl max-w-md w-full space-y-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          Doctor Registration
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
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
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              className="appearance-none mt-4 rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
              name="lname"
              value={formData.lname}
              onChange={handleChange}
              className="appearance-none mt-4 rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="doctorSpeciality" className="sr-only">
              Specialization
            </label>
            <select
              id="doctorSpeciality"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
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
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="appearance-none mt-4 rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="phone" className="sr-only">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="Phone"
              required
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="appearance-none mt-4 rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="age" className="sr-only">
              Age
            </label>
            <input
              id="age"
              type="date"
              placeholder="Age"
              required
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="appearance-none mt-4 rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="block text-sm font-medium text-gray-700">
              Gender :
            </label>
            <div className="flex items-center space-x-4">
              <input
                id="male"
                type="radio"
                value="male"
                name="gender"
                onChange={handleChange}
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
                type="radio"
                value="female"
                name="gender"
                onChange={handleChange}
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
          <div>
            <label htmlFor="city" className="sr-only">
              Address
            </label>
            <select
              id="city"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="appearance-none mt-4 rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
          <div className="relative mt-4">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Password"
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
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
          <div>
            <div className="form-check">
              <input
                type="checkbox"
                id="acceptTerms"
                className="form-check-input"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <label
                htmlFor="acceptTerms"
                className="form-check-label text-sm text-gray-600 pl-2"
              >
                I agree to the Terms of Service and Privacy Policy of{" "}
                <span className="font-semibold pl-2 hover:text-blue-800">
                  HealthTime.
                </span>
              </label>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit my request"}
            </button>
          </div>
          <div className="text-sm">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/logindoc"
                className="font-medium text-blue-900  hover:underline ml-2"
              >
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DocIns;
