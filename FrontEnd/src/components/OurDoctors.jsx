import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const OurDoctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
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

  const slider = useRef(null);

  const settings = {
    accessibility: true,
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Default picture URL for doctors with no picture
  const defaultPictureURL =
    "https://png.pngtree.com/png-vector/20191130/ourmid/pngtree-doctor-icon-circle-png-image_2055257.jpg";

  return (
    <div
      className="min-h-screen bg-cover bg-no-repeat mt-96 flex flex-col justify-center lg:px-32 px-5"
      style={{
        backgroundImage:
          "url('https://masterbundles.com/wp-content/uploads/2023/02/wave-background-23-814.jpg')",
        backgroundPosition: "bottom",
      }}
    >
      <div>
        <h1
          className="text-white font-poppins font-semibold text-4xl  text-center animate-fade-left animate-infinite animate-ease-linear transition-opacity duration-300"
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
        >
          Your journey begins here.. Login to{" "}
          <span className="text-yellow-300">start managing your health</span>{" "}
          with ease
        </h1>
        <Link
          to="/login"
          className="hover:bg-indigo-600 hover:text-white text-xl inline-block rounded-md border border-transparent mb-40 mt-8 ml-36 px-8 py-3 text-center font-semibold text-indigo-600 bg-white transition duration-500 animate-bounce"
        >
          Login now!
        </Link>
      </div>

      <div className="flex flex-col items-center lg:flex-row justify-between mb-10 lg:mb-0">
        <button
          className="bg-gray-300 text-white px-4 py-2 rounded-lg  hover:bg-gray-600 active:bg-gray-900"
          onClick={() => slider.current.slickPrev()}
        >
          <FaArrowLeft size={25} />
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg active:bg-blue-900"
          onClick={() => slider.current.slickNext()}
        >
          <FaArrowRight size={25} />
        </button>
      </div>
      <div className="mt-5">
        <Slider ref={slider} {...settings}>
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className="text-black rounded-xl backdrop-blur border-8 border-white  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mb-4 cursor-pointer"
              style={{ marginRight: "15px" }}
            >
              <img
                src={doctor.picture || defaultPictureURL} // Use default picture URL if doctor has no picture
                alt="Doctor"
                className="h-80 rounded-t-xl w-full object-cover"
              />
              <div className="p-4">
                <h1 className="font-semibold text-white text-xl">
                  Dr {doctor.fname} {doctor.lname}
                </h1>
                <h3 className="text-white font-thin">
                  {doctor.specialization}
                </h3>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default OurDoctors;
