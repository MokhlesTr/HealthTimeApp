import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbarp from "./patient/components/Navbarp";
import About from "./components/About";
import Services from "./components/Services";
import OurDoctors from "./components/OurDoctors";
import Blogs from "./components/Blogs";
import Footer from "./components/Footer";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Search from "./components/Search";
import Navbar from "./components/Navbar";
import ForgotPassword from "./components/auth/ForgotPassword";
import Rdv from "./patient/components/Rdv";
// import History from "./patient/components/History";
import { useLocation } from "react-router-dom";
import Chatbot from "./components/Chatbot";
import Dashboard from "./admin/components/Dashboard";
import TableUsers from "./admin/components/TableUsers";
import TableDoctors from "./admin/components/TableDoctors";
import Layouts from "./admin/components/shared/Layouts";
import LayoutsDoctor from "./doctor/components/shared/LayoutsDoctor";
import Calendar from "./doctor/components/Calendar";
import DashboardDoctor from "./doctor/components/DashboardDoctor";
import NotFound from "./patient/components/NotFound";
import Reset from "./components/auth/Reset";
import Otpcode from "./components/auth/Otpcode";
import DocIns from "./components/auth/DocIns";
import MedicalReport from "./doctor/components/MedicalReport";
import Article from "./components/Article";
// import MyMedicalReport from "./patient/components/MyMedicalReport";
import MySearch from "./patient/components/MySearch";
import ProfilPatient from "./patient/components/ProfilPatient";
import ProfilDoctor from "./doctor/components/ProfilDoctor";
import HomePatient from "./patient/components/HomePatient";
import UsersTable from "./admin/components/UsersTable";
import Test from "./components/Test";
import Tests from "./components/Tests";
import TableRequests from "./admin/components/TableRequests";
import MyPatients from "./doctor/components/MyPatients";
import Appointement from "./patient/components/Appointement";
import ApprovedRequests from "./admin/components/ApprovedRequests";
import RefusedRequests from "./admin/components/RefusedRequests";
import LoginDoc from "./components/auth/LoginDoc";

const App = () => {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/OurDoctors" element={<OurDoctors />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/article/:index" element={<Article />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />l
          <Route path="/logindoc" element={<LoginDoc />} />
          <Route path="/DocIns" element={<DocIns />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/Reset" element={<Reset />} />
          <Route path="/Otpcode" element={<Otpcode />} />
          <Route path="/test" element={<Test />} />
          <Route path="/tests" element={<Tests />} />
          {/* ///////////////////////////////////////////Patient */}
          <Route path="/patient" element={<HomePatient />} />
          {/* <Route path="/patient/" element={<HomePatient />} /> */}
          <Route path="/patient/profil" element={<ProfilPatient />} />
          <Route path="/patient/mysearch" element={<MySearch />} />
          <Route path="/patient/mysearch" element={<MySearch />} />
          <Route path="/patient/rdv" element={<Rdv />} />
          <Route path="/patient/appointements" element={<Appointement />} />
          {/* //////////////////////////////////////////////Admin */}
          <Route path="/admin" element={<Layouts />}>
            <Route index element={<Dashboard />} />
            <Route path="/admin/patients" element={<TableUsers />} />
            <Route path="/admin/doctors" element={<TableDoctors />} />
            <Route path="/admin/userstable" element={<UsersTable />} />
            <Route path="/admin/requests" element={<TableRequests />} />
            <Route path="/admin/approvedreq" element={<ApprovedRequests />} />
            <Route path="/admin/refusedreq" element={<RefusedRequests />} />
            <Route path="/admin/settings" element={<div>settings :)</div>} />
            <Route path="/admin/support" element={<div>support :)</div>} />
          </Route>
          {/* //////////////////////////////////////////////////Doctor */}
          <Route path="/doctor" element={<LayoutsDoctor />}>
            <Route index element={<DashboardDoctor />} />
            <Route path="/doctor/profil" element={<ProfilDoctor />} />
            <Route path="/doctor/reports" element={<MedicalReport />} />
            <Route path="/doctor/calendar" element={<Calendar />} />
            <Route path="/doctor/patients" element={<MyPatients />} />
            <Route path="/doctor/" element={<div>support :)</div>} />
          </Route>
          {/* //////////////////////////////////////////// ///////*/}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footers />
      </div>
    </Router>
  );
};

export default App;

const Navigation = () => {
  const location = useLocation();
  const isPatientPath = location.pathname.startsWith("/patient");
  const isAdminPath = location.pathname.startsWith("/admin");
  const isDoctorPath = location.pathname.startsWith("/doctor");
  const isNotFound = location.pathname.startsWith("/*");
  if (isPatientPath) {
    return (
      <>
        <Navbarp />
        <Chatbot />;
      </>
    );
  } else if (isAdminPath || isDoctorPath || isNotFound) {
    return null;
  } else {
    // eslint-disable-next-line no-sequences
    return <Navbar />;
  }
};

const Footers = () => {
  const location = useLocation();
  const isPatientPath = location.pathname.startsWith("/patient");
  const isAdminPath = location.pathname.startsWith("/admin");
  const isDoctorPath = location.pathname.startsWith("/doctor");
  if (isPatientPath) {
    return <Footer />;
  } else if (isAdminPath || isDoctorPath) {
    return null;
  } else {
    // eslint-disable-next-line no-sequences
    return <Footer />;
  }
};
