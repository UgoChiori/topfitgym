import React from "react";
import Login from "./routes/login/Loginform";
import Home from "./home/Home";
import Navigation from "./components/NavigationBar";
import { Routes, Route} from "react-router-dom"
import NotFound from "./routes/NotFound";
import DashboardHome from "./routes/dashboard/dashboard/DashboardHome";
import StatsOverview from "./routes/dashboard/dashboard/StatsOverview";
// import Classcard from "./routes/dashboard/classes/Classcard";
import MembershipStatusCard from "./routes/dashboard/membership/MembershipStatusCard";
import ProfileCard from "./routes/dashboard/profile/ProfileCard";
import EditProfileForm from "./routes/dashboard/profile/EditProfileForm";
import ForgotPassword from "./routes/login/ForgotPassword";
import PasswordReset from "./routes/login/PasswordReset";
import RegisterForm from "./routes/register/RegisterForm";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Contact from "./routes/Contact";
import ClassSchedule from "./home/ClassSchedule";



const App: React.FC = () => {


  return (
<>
 <Navigation/>
   <ToastContainer position="top-right"/>
<div className="bg-gray-100">
 <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<RegisterForm />} />
  <Route path="/dashboard-home" element={<DashboardHome />} />
  <Route path="/member-stats" element={<StatsOverview />} />
  <Route path="/classes/:slug" element={<ClassSchedule />} />
  <Route path="/membership" element={<MembershipStatusCard />} />
  <Route path="/member-profile" element={<ProfileCard />} />
   <Route path="/edit-profile" element={<EditProfileForm />} />
   <Route path="/forgot-password" element={<ForgotPassword /> } />
   <Route path="/password-reset" element={<PasswordReset/>} />
   <Route path="/contact-us" element={<Contact/>} />
  <Route path="*" element={<NotFound />} />
 </Routes>

</div></>
  )
}

export default App
