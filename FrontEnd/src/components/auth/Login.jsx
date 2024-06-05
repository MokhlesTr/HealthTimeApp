import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert
import useLocalStorageUser from "../../hooks/useLocalStorageUser";
// import { useUserId } from "../../zustand/data";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const { setId } = useUserId();
  // eslint-disable-next-line no-unused-vars
  const { setValue, deleteValue } = useLocalStorageUser();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/signin/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log("data ===========>", data);
      // const id = data.id;
      deleteValue();
      setValue(data);

      // alert("sadsadasdasdasd");
      console.log(data.id);

      // setId(id);
      console.log("data ===========>", data);

      if (data.role === 0) {
        navigate("/admin");
      } else if (data.role === 1) {
        navigate("/patient");
      } else if (data.role === 2) {
        navigate("/doctor");
      }
      console.log(data.role);
      if (response.ok) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login successful!",
          showConfirmButton: false,
          timer: 1500,
        });

        return;
      } else {
        console.error("Login failed:", data.message);
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed: " + error.message);
    }
  }

  return (
    <div
      className="relative  overflow-hidden min-h-screen py-36 bg-cover bg-center bg-gray-100 flex items-center  justify-center sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url("https://images.pexels.com/photos/6941882/pexels-photo-6941882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
      }}
    >
      <div className="bg-white bg-opacity-50 border   p-12 rounded-3xl shadow-xl  max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Log in
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <Link
                to="/DocIns"
                className="bg-yellow-400 hover:bg-yellow-500 hover:scale-105 font-semibold text-center text-white appearance-none mt-4 rounded-md relative block w-full px-3 py-2"
              >
                Doctor's Portal
              </Link>
              <label htmlFor="email" className="sr-only">
                email
              </label>
              <input
                id="email"
                name="email"
                type="text"
                autoComplete="email"
                required
                className="appearance-none mt-4 rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative mt-4">
                <input
                  id="password"
                  name="password"
                  type={!showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
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
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-semibold rounded-md text-white bg-blue-900 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:scale-105"
            >
              Log in
            </button>
          </div>
        </form>
        <div className="">
          <p className="text-sm text-gray-600">
            Don't have an account?
            <Link
              to="/signup"
              className="font-medium text-blue-900 hover:underline ml-2"
            >
              Sign up
            </Link>
          </p>
          <p className="text-sm ">
            <Link
              to="/forgot-password"
              className="text-blue-900 hover:underline"
            >
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
