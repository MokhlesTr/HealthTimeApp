import React from "react";
import ServicesCard from "../layouts/ServicesCard";
import { MdHealthAndSafety } from "react-icons/md";
import backgroundblue from "../assets/img/backgroundblue.png"; // Adjust the relative path accordingly

import {
  FaHandsHelping,
  FaHeartbeat,
  FaCalendarCheck,
  FaComments,
} from "react-icons/fa";

const Services = () => {
  const icons = {
    healthCheck: (
      <MdHealthAndSafety size={35} className="text-backgroundColor" />
    ),
    heartHealth: <FaHeartbeat size={35} className="text-backgroundColor" />,
    handsHelping: <FaHandsHelping size={35} className="text-backgroundColor" />,
    appointment: <FaCalendarCheck size={35} className="text-backgroundColor" />,
    easyDesign: <FaComments size={35} className="text-backgroundColor" />,
  };

  const services = [
    {
      icon: "appointment",
      title: "Quick Appointment",
      content:
        "Book your medical appointments quickly and easily through our online platform. Choose from a variety of available slots and receive instant confirmation.",
    },
    {
      icon: "easyDesign",
      title: "User-Friendly Design",
      content:
        "Our platform features an intuitive and easy-to-use design, ensuring a seamless experience for users of all levels of technical expertise.",
    },
    {
      icon: "easyDesign",
      title: "Interactive Chatbot",
      content:
        "Access our interactive chatbot for instant assistance with any queries or concerns. Our chatbot is designed to provide helpful responses and guidance 24/7.",
    },
    {
      icon: "healthCheck",
      title: "Variety of Doctor Specialties",
      content:
        "Choose from a diverse range of medical specialists tailored to your specific needs. Whether you require a general practitioner or a specialist in a particular field, we have you covered.",
    },
  ];

  return (
    <div
      className="min-h-screen flex flex-col justify-center lg:px-32 px-5 pt-24 lg:pt-16 relative overflow-hidden py-36 bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundblue})`,
      }}
    >
      <div className="flex flex-col items-center mt-24 lg:flex-row justify-between">
        <div>
          <h1 className="text-4xl font-semibold text-center lg:text-start">
            Our Services
          </h1>
          <p className="mt-2 text-center lg:text-start">
            Explore our range of healthcare services designed to meet your
            needs.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-8 pt-14 mb-24">
        {services.map((service) => (
          <ServicesCard
            key={service.title}
            icon={icons[service.icon]}
            title={service.title}
            content={service.content}
          />
        ))}
      </div>
    </div>
  );
};

export default Services;
