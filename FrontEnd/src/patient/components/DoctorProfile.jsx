import React from "react";

const DoctorProfile = ({ doctor }) => {
  return (
    <div>
      <h1>
        {doctor.fname} {doctor.lname}'s Profile
      </h1>
      <p>Specialization: {doctor.specialization}</p>
      <p>Address: {doctor.address}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default DoctorProfile;
