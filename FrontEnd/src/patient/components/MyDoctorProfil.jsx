// import { useEffect } from "react";
// import useLocalStorageRdv from "../../hooks/useLocalStorageRdv";

// const MyDoctorProfil = ({ doctor }) => {
//   const localStorageRdv = useLocalStorageRdv("rdvData", {
//     doctorId: "0000",
//     reason: "0000",
//     patientId: "0000",
//     date: "0000",
//     duration: 30, // Fixed value
//     state: 0, // Fixed value
//     subject: "0000",
//   });

//   useEffect(() => {
//     if (doctor && doctor.userId) {
//       handleStoreDoctorId(doctor.userId);
//     }
//   }, [doctor]); // Run this effect whenever the doctor prop changes

//   // Function to handle storing doctor ID in local storage
//   const handleStoreDoctorId = (doctorId) => {
//     localStorageRdv.setValue({ doctorId });
//   };

//   return null;
// };

// export default MyDoctorProfil;
