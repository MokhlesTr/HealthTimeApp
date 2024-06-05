import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:3000/User/email/${email}`
      );
      const data = response.data;
      console.log("id===>", data.data?._id);

      if (data.status === 200) {
        // Email exists, proceed to send OTP
        const otp = Math.floor(Math.random() * 9000 + 1000);
        const emailData = {
          recipientEmail: email,
          recipientName: email.split("@")[0].replace(/[0-9]/g, ""),
          otp: otp,
        };

        const emailResponse = await axios.post(
          "http://localhost:3000/send_email",
          emailData,
          { headers: { "Content-Type": "application/json" } }
        );

        localStorage.setItem("otp", otp);
        localStorage.setItem("email", email);
        localStorage.setItem("id", data.data?._id);

        if (emailResponse.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Password reset sent!!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/OTPcode");
        } else {
          console.error("Password reset failed:", emailResponse);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Password reset failed!",
          });
        }
      } else {
        // Email does not exist
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Email does not exist!",
        });
      }
    } catch (error) {
      console.error("Password reset failed:", error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email does not exist!",
      });
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
      <div className="bg-white bg-opacity-50 border  p-12 rounded-3xl shadow-xl max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Forgot Password
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none mt-4 rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              {loading ? "Sending..." : "Reset Password"}
            </button>
          </div>
          <div className="text-sm">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-900 hover:underline ml-2"
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

export default ForgotPassword;
