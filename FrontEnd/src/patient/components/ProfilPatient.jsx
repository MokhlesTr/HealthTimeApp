import React, { useEffect, useState } from "react";
import useLocalStorageUser from "../../hooks/useLocalStorageUser";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Add this import statement
import Swal from "sweetalert2";
const ProfilPatient = () => {
  const [, setFirstName] = useState("");
  const [, setLastName] = useState("");
  const [dataEmail, setEmail] = useState("");
  const [, setPhone] = useState("");
  const [, setBirthday] = useState("");
  const [, setAddress] = useState("");
  const [, setGender] = useState("");
  const [upd, setUpd] = useState(false);
  // const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const [isProfileChanged, setIsProfileChanged] = useState(false); // Track if any profile field has changed
  const { value } = useLocalStorageUser();
  const [users, setUsers] = useState();
  const [userx, setUserx] = useState();
  console.log("valueeeee", { value });
  const id = value.id;
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:3000/patient/all`);
        const responseEmail = await fetch(`http://localhost:3000/user/${id}`);
        const dataEmail = await responseEmail.json();
        console.log("dataEmail //////////", dataEmail.email);
        setEmail(dataEmail);
        if (!response.ok) {
          throw new Error("Failed to fetch patients");
        }
        const data = await response.json();
        console.log("data //////////", data);
        const filteredUsers = data.data;
        const user = filteredUsers.find(
          (singleUser) => singleUser.userId === id
        );
        if (!user) {
          throw new Error("Failed to fetch user information");
        }
        console.log("user", user);
        setUserx(user);
        console.log("filteredUsers //////////");
        console.log(filteredUsers);
        setUsers(filteredUsers);
        console.log("aaaaaaaa", users);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Update Failed",
        text: "The passwords you entered do not match. Please try again.",
      });

      return;
    }

    // Make an API call to update the password
    try {
      const response = await axios.patch(
        `http://localhost:3000/User/${id}/update-password`,
        {
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        }
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Password Updated Successfully",
          text: "Your password has been updated successfully.",
        });
        navigate("/login");
      } else {
        alert("Password update failed!");
      }
    } catch (error) {
      console.error("Password reset failed:", error.message);
      alert("Password update failed!");
    }
  };

  return (
    <div>
      <div>
        <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8 relative">
          <div
            className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
            aria-hidden="true"
          >
            <div
              className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="mx-auto max-w-2xl p-20 mb-20 md:mb-20 lg:mb-4 text-center flex flex-col items-center justify-center h-56  gap-8">
            <h2 className="text-3xl pt-20 font-bold tracking-tight text-gray-900 sm:text-4xl">
              Profil <span className="text-indigo-600">Account</span>
            </h2>
            <p className="text-lg leading-8 pb-32 text-gray-600">
              Welcome Home {userx?.firstName}!
            </p>
          </div>
          {!upd ? (
            <form className="flex flex-row  justify-center ">
              <div
                action="#"
                method="POST"
                className=" mt-16 max-w-xl sm:mt-20"
              >
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-semibold leading-6 text-gray-900"
                    >
                      First name
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={userx?.firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="company"
                      className="block text-sm font-semibold leading-6 text-gray-900"
                    >
                      Last Name
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        name="company"
                        id="company"
                        autoComplete="organization"
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={userx?.lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold leading-6 text-gray-900"
                    >
                      Email
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={dataEmail?.email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="phone-number"
                      className="block text-sm font-semibold leading-6 text-gray-900"
                    >
                      Phone number
                    </label>
                    <div className="relative mt-2.5">
                      <input
                        type="text"
                        name="phone-number"
                        id="phone-number"
                        maxLength="8"
                        minLength="8"
                        autoComplete="tel"
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={userx?.phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Gender:
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        id="male"
                        name="gender"
                        type="radio"
                        value="male"
                        onChange={(e) => setGender(e.target.value)}
                        checked={userx?.gender === "male"}
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
                        onChange={(e) => setGender(e.target.value)}
                        checked={userx?.gender === "female"}
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
                  <div className="sm:col-span-2">
                    <div className="flex items-center space-x-4"></div>
                  </div>
                </div>
              </div>

              <div>
                <div className="sm:col-span-2 grid  lg:pl-72 gap-x-8 gap-y-6 sm:grid-cols-2 mt-16 max-w-xl sm:mt-20">
                  <div className="lg:w-96">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="age"
                        className="block text-sm font-semibold leading-6 text-gray-900"
                      >
                        Birthday
                      </label>
                      <div className="mt-2.5">
                        <input
                          type="date"
                          name="birthday"
                          id="birthday"
                          autoComplete="bday"
                          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
                         focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          value={userx?.birthday}
                          onChange={(e) => setBirthday(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2 lg:my-4">
                      <label
                        htmlFor="address"
                        className="block text-sm font-semibold leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <select
                        id="address"
                        name="address"
                        value={userx?.address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        className="appearance-none mt-2.5 rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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

                    <div className="mt-10">
                      <button
                        type="submit"
                        className={`block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 ${
                          !isProfileChanged && "opacity-50 cursor-not-allowed"
                        }`}
                        disabled={!isProfileChanged} // Disable the button if no profile changes
                      >
                        Update Profile
                      </button>
                      <button
                        onClick={() => setUpd(!upd)}
                        type="button"
                        className="block w-full rounded-md mt-2 bg-neutral-400 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                      >
                        Change Password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <form className="flex flex-col items-center">
              <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 max-w-xl">
                {/* <div>
                  <label
                    htmlFor="current-password"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Current Password
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="password"
                      name="current-password"
                      id="current-password"
                      autoComplete="current-password"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                </div> */}
                <div>
                  <label
                    htmlFor="new-password"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    New Password
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="password"
                      name="new-password"
                      id="new-password"
                      autoComplete="new-password"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="password"
                      name="confirm-password"
                      id="confirm-password"
                      autoComplete="confirm-password"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                    onClick={handleSubmit}
                  >
                    Update Password
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="block w-full rounded-md mt-4 bg-neutral-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  >
                    Back
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilPatient;
