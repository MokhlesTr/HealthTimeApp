import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const EditUser = ({ userId, onCancel, onSave }) => {
  const [userData, setUserData] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    user: {
      email: "",
    },
    phone: "",
    birthday: "",
    gender: "",
    address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/patient/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUserData(data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSave(userData);

      Swal.fire({
        title: "Patient Successfully Updated",
        icon: "success",
        showCloseButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
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
        Edit Patient
      </h1>
      <form
        className="bg-blue-300 border-black p-8 rounded-xl space-y-4 border  shadow-lg"
        onSubmit={handleSubmit}
      >
        {/* Form fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="text-gray-700">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              autoComplete="name"
              placeholder="Enter First Name"
              required
              className="mt-2 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={userData.firstName}
              onChange={(e) =>
                setUserData({ ...userData, firstName: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="lastName" className="text-gray-700">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              autoComplete="lname"
              placeholder="Enter Last Name"
              required
              className="mt-2 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={userData.lastName}
              onChange={(e) =>
                setUserData({ ...userData, lastName: e.target.value })
              }
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Enter email"
              required
              className="mt-2 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={userData.user.email}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  user: { ...userData.user, email: e.target.value },
                })
              }
            />
          </div>
          <div>
            <label htmlFor="phone" className="text-gray-700">
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
              value={userData.phone}
              onChange={(e) =>
                setUserData({ ...userData, phone: e.target.value })
              }
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="text-gray-700">
              Address
            </label>
            <select
              id="city"
              name="city"
              value={userData.address}
              onChange={(e) =>
                setUserData({ ...userData, address: e.target.value })
              }
              required
              className="mt-2 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              <option value="Kasserine">Kasserine</option>
              <option value="Monastir">Monastir</option>
              <option value="Ben Arous">Ben Arous</option>
              <option value="Medenine">Medenine</option>
              <option value="Nabeul">Nabeul</option>
              <option value="Mahdia">Mahdia</option>
              <option value="Siliana">Siliana</option>
              <option value="Jendouba">Jendouba</option>
              <option value="Tozeur">Tozeur</option>
              <option value="Kebili">Kebili</option>
              <option value="Tataouine">Tataouine</option>
              <option value="Zaghouan">Zaghouan</option>
            </select>
          </div>
          <div>
            <label htmlFor="birthday" className="text-gray-700">
              Birthday
            </label>
            <input
              id="birthday"
              type="date"
              autoComplete="birthday"
              placeholder="Enter birthday"
              required
              min="1900-01-01"
              max="2003-12-31"
              className="mt-2 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={userData.birthday}
              onChange={(e) =>
                setUserData({ ...userData, birthday: e.target.value })
              }
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="gender" className="text-gray-700">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={userData.gender}
              onChange={(e) =>
                setUserData({ ...userData, gender: e.target.value })
              }
              required
              className="mt-2 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
        {/* Form buttons */}
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isSubmitting ? "Updating..." : "Update"}
          </button>
          <button
            onClick={onCancel}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ml-4"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
