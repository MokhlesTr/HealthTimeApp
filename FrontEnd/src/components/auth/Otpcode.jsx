import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Otpcode = () => {
  const [otpValue, setOtpValue] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const verifyOTP = () => {
    setLoading(true);

    console.log("Début de la fonction verifyOTP()");
    const storedOTP = localStorage.getItem("otp");
    console.log("OTP récupéré depuis le localStorage :", storedOTP);
    const enteredCode = parseInt(otpValue.join(""));
    console.log("Code saisi par l'utilisateur :", enteredCode);
    console.log("Code OTP attendu :", storedOTP);

    if (enteredCode === parseInt(storedOTP)) {
      console.log("Code reçu avec succès.");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "OTP verification successful!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/reset");
    } else {
      console.log("Code incorrect");
      Swal.fire({
        position: "center",
        icon: "error",
        title: "OTP verification failed!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/forgot-password");
    }
  };

  const handleInputChange = (index, value) => {
    const newOtpValue = [...otpValue];
    newOtpValue[index] = value;
    setOtpValue(newOtpValue);

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
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
            Enter Code OTP
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={verifyOTP}>
          <div className="flex justify-center">
            {[0, 1, 2, 3].map((index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                autoComplete="off"
                required
                className="appearance-none m-2 rounded-md w-12 text-center px-3 py-2 border border-gray-300 text-gray-900 focus:border-blue-900 focus:z-10 text-xl"
                value={otpValue[index]}
                ref={(ref) => (inputRefs.current[index] = ref)}
                onChange={(e) =>
                  handleInputChange(index, e.target.value.replace(/\D/, ""))
                }
              />
            ))}
          </div>

          <div>
            <button
              type="submit"
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-900 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                loading ? "cursor-not-allowed opacity-50" : "hover:scale-105"
              }`}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
          <div className="flex justify-between space-x-2">
            <Link
              to="/forgot-password"
              className="font-medium text-blue-900 hover:underline"
            >
              Update Email
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Otpcode;
