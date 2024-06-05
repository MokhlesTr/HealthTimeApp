import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

const MySearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      // Fetch user data
      const userResponse = await fetch(`http://localhost:3000/user`);
      if (!userResponse.ok) {
        throw new Error("Failed to fetch user data");
      }
      const userData = await userResponse.json();
      const filteredByRole = userData.filter(
        (user) => user.role === 2 && user.state === 1
      );
      const userIds = filteredByRole.map((user) => user._id);

      // Fetch doctor data
      const doctorResponse = await fetch(`http://localhost:3000/doctor`);
      if (!doctorResponse.ok) {
        throw new Error("Failed to fetch doctor data");
      }
      const doctorData = await doctorResponse.json();

      // Filter doctors whose userId matches the IDs of filtered users
      const filteredDoctors = doctorData.filter((doctor) =>
        userIds.includes(doctor.userId)
      );

      // Set the filtered doctors state
      setDoctors(filteredDoctors);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filtered = doctors.filter((doctor) => {
      const isNameMatch =
        doctor.fname &&
        doctor.fname.toLowerCase().includes(value.toLowerCase());
      const isCityMatch = selectedCity ? doctor.address === selectedCity : true;
      const isSpecialtyMatch = selectedSpecialty
        ? doctor.specialization === selectedSpecialty
        : true;

      return isNameMatch && isCityMatch && isSpecialtyMatch;
    });

    setFilteredDoctors(filtered);
  };

  const handleDoctorClick = (doctor) => {
    setSearchTerm(doctor.fname);
    setSelectedCity(doctor.address);
    setSelectedSpecialty(doctor.specialization);
    setFilteredDoctors([]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const filtered = doctors.filter((doctor) => {
      const isCityMatch = selectedCity ? doctor.address === selectedCity : true;
      const isSpecialtyMatch = selectedSpecialty
        ? doctor.specialization === selectedSpecialty
        : true;

      return isCityMatch && isSpecialtyMatch;
    });
    setFilteredDoctors(filtered);
  };

  const indexOfLastDoctor = currentPage * 12;
  const indexOfFirstDoctor = indexOfLastDoctor - 12;
  const currentDoctors = filteredDoctors.slice(
    indexOfFirstDoctor,
    indexOfLastDoctor
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div
      className="bg-cover backdrop-blur-lg"
      style={{
        backgroundImage:
          "url('https://masterbundles.com/wp-content/uploads/2023/02/wave-background-23-814.jpg')",
      }}
    >
      <div className="  lg:container mx-auto px-4 py-40   min-h-screen">
        <div>
          <div className="flex justify-between items-center lg:flex-row flex-col">
            <div className="text-white">
              <h1 className="text-5xl font-bold m-14">Search for a Doctor</h1>
              <p className="text-gray-600 mb-8 flex-row lg:ml-14 w-96 flex flex-wrap">
                Please enter the doctor's name and, if necessary, filter by city
                and specialty. <br />
                Then click on
                <span className="font-semibold text-white"> "Search" </span>
              </p>
            </div>
            <div>
              <img
                className="lg:w-64 w-40 "
                src="https://cdn2.iconfinder.com/data/icons/medical-health-care-thin-colored-outline/33/doctor_search-512.png"
                alt="Doctor Search"
              />
            </div>
          </div>
          <form
            className=" lg:flex-row flex-col flex items-center justify-evenly px-40 gap-8  mt-24"
            onSubmit={handleFormSubmit}
          >
            <div className=" w-full">
              <input
                type="text"
                className="block w-full p-2 text-sm text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Doctor's Name..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              {searchTerm && (
                <div className="absolute top-full left-0 z-10 w-full bg-white border border-gray-300 rounded-lg shadow-md">
                  {Array.isArray(filteredDoctors) &&
                    filteredDoctors.map((doctor, index) => (
                      <div
                        key={index}
                        className="p-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleDoctorClick(doctor)}
                      >
                        {doctor.fname} {doctor.lname}
                      </div>
                    ))}
                </div>
              )}
            </div>
            <select
              className="block w-full p-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              <option value="" disabled hidden>
                Specialty
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
            <select
              className="block w-full p-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="" disabled hidden>
                City
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
            <button
              type="submit"
              className="flex-shrink-0 lg:w-28 w-full flex flex-row text-white p-2 bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <CiSearch size={24} />
              <div>Search</div>
            </button>
            {/* <button
              type=""
              onClick={handleReset}
              className="flex-shrink-0 lg:w-28 w-full flex flex-row text-white p-2 bg-gray-700 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <CiSearch size={24} />
              <div>Reset</div>
            </button> */}
          </form>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {currentDoctors.map((doctor, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md hover:shadow-xl overflow-hidden flex flex-col"
              >
                <div className=" flex flex-row ">
                  <img
                    src="https://content.jdmagicbox.com/comp/def_content/general_physician_doctors/default-general-physician-doctors-15.jpg?clr="
                    alt=""
                    className="rounded-lg   border border-gray-400 m-4 mx-8   w-28 h-28"
                  />
                  <div className="p-6 flex flex-col  flex-grow">
                    <h2 className="text-xl font-semibold text-blue-500 mb-2">
                      {doctor.fname} {doctor.lname}
                    </h2>
                    <p className="text-gray-600 mb-2">
                      {doctor.specialization}
                    </p>
                    <p className="text-gray-600 mb-4">{doctor.address}</p>
                    <p className="text-gray-700 flex-grow">{doctor.bio}</p>
                  </div>
                </div>
                <div className=" py-3 px-auto flex justify-center">
                  <Link
                    to={"/login"}
                    className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                  >
                    Make an appointment
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            {filteredDoctors.length > 0 && (
              <ul className="flex space-x-2">
                {Array.from(
                  { length: Math.ceil(filteredDoctors.length / 12) },
                  (_, i) => (
                    <li key={i}>
                      <button
                        className={`px-4 py-2 rounded-lg font-medium ${
                          currentPage === i + 1
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                        onClick={() => paginate(i + 1)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  )
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySearch;
