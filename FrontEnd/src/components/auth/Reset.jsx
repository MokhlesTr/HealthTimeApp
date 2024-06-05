import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Reset = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user ID from localStorage
    const userId = localStorage.getItem("id");
    if (!userId) {
      // Handle the case where the user ID is not available
      // Redirect the user or show an error message
      console.error("User ID not found in localStorage");
      // For example, you can redirect the user to the login page
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Passwords do not match!",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    setLoading(true);

    try {
      // Get user ID from localStorage
      const userId = localStorage.getItem("id");

      // Make an API call to update the password
      const response = await axios.patch(
        `http://localhost:3000/User/${userId}/update-password`,
        {
          newPassword: password,
          confirmPassword: password,
        }
      );

      if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Password reset successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/login");
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Password reset failed!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.error("Password reset failed:", response.data);
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Password reset failed!",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error("Password reset failed:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative overflow-hidden min-h-screen py-36 bg-cover bg-center bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url("https://images.pexels.com/photos/6941882/pexels-photo-6941882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
      }}
    >
      <div className="bg-white bg-opacity-50 border p-12 rounded-3xl shadow-xl max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Update Password
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="password" className="sr-only">
                New Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none mt-4 rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none mt-4 rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-900 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                loading ? "cursor-not-allowed opacity-50" : "hover:scale-105"
              }`}
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reset;
