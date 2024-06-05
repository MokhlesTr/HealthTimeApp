import React, { useEffect, useState } from "react";
import useLocalStorageUser from "../../hooks/useLocalStorageUser";
// import HoursOfOperation from "./HoursOfOperation";

const ProfilDoctor = () => {
  const [, setFirstName] = useState("");
  const [, setLastName] = useState("");
  const [dataEmail, setEmail] = useState("");
  const [, setPhone] = useState("");
  const [, setBirthday] = useState("");
  const [, setAddress] = useState("");
  const [, setSpecialization] = useState("");
  const [, setGender] = useState("");
  const [upd, setUpd] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isProfileChanged, setIsProfileChanged] = useState(false); // Track if any profile field has changed
  const { value } = useLocalStorageUser();
  const [user, setuser] = useState();
  const id = value.id;

  console.log(">>>>>>>>>>>>>>>>>>>>>");
  console.log("localStorage====>>>", { value });
  console.log(">>>>>>>>>>>>>>>>>>>>>");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseEmail = await fetch(`http://localhost:3000/user/${id}`);
        const dataEmail = await responseEmail.json();
        console.log("Doctor Email=========>>>", dataEmail.email);
        setEmail(dataEmail);
        ////////////******************************///////////
        const response = await fetch(`http://localhost:3000/doctor`);
        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }
        const filteredUsers = await response.json();
        console.log("filteredDOCTORS==========>>>>", filteredUsers);

        const user = filteredUsers.find(
          (singleUser) => singleUser.userId === id
        );
        if (!user) {
          throw new Error("Failed to fetch user information");
        }
        console.log("user", user);
        setuser(user);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="">
      <div className="py-20  bg-white ">
        <div>
          <div className="mx-auto max-w-2xl p-20 mb-20 md:mb-20 lg:mb-4 text-center flex flex-col items-center justify-center h-56  gap-8">
            <h2 className="text-3xl pt-20 font-bold tracking-tight text-gray-900 sm:text-4xl">
              Profil <span className="text-indigo-600">Account</span>
            </h2>
            <p className="text-lg leading-8 pb-32 text-gray-600">
              Welcome Home Dr.{user?.fname}
            </p>
          </div>
          {!upd ? (
            <>
              <form className="flex flex-row  justify-center ">
                <div className=" mt-16 max-w-xl sm:mt-20">
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
                          value={user?.fname}
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
                          value={user?.lname}
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
                          value={user?.phone}
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
                          checked={user?.gender === "male"}
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
                          checked={user?.gender === "female"}
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
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={user?.age}
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
                          value={user?.address}
                          onChange={setAddress}
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
                      <div className="sm:col-span-2 lg:my-4">
                        <label
                          htmlFor="specialization"
                          className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                          specialization
                        </label>
                        <select
                          id="specialization"
                          name="specialization"
                          value={user?.specialization}
                          onChange={setSpecialization}
                          required
                          className="appearance-none mt-2.5 rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        >
                          <option value="" disabled>
                            Select Speciality
                          </option>
                          <option value="Anesthesiology">Anesthesiology</option>
                          <option value="Cardiology">Cardiology</option>
                          <option value="Dermatology">Dermatology</option>
                          <option value="Endocrinology">Endocrinology</option>
                          <option value="Gastroenterology">
                            Gastroenterology
                          </option>
                          <option value="Hematology">Hematology</option>
                          <option value="Infectious Disease">
                            Infectious Disease
                          </option>
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
            </>
          ) : (
            <form className="flex flex-col items-center min-h-screen max-h-screen">
              <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 max-w-xl">
                <div>
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
                    />
                  </div>
                </div>
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
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  >
                    Update Password
                  </button>
                  <button
                    type="button"
                    onClick={() => setUpd(!upd)}
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

export default ProfilDoctor;
