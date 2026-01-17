import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./components/NavigationBar";
import CartDrawer from "./components/CartDrawer";
import Home from "./home/Home";
import Login from "./routes/login/Loginform";
import RegisterForm from "./routes/register/RegisterForm";
import DashboardHome from "./routes/dashboard/dashboard/DashboardHome";
import StatsOverview from "./routes/dashboard/dashboard/StatsOverview";
import UserStats from "./routes/dashboard/profile/UserStats";
import EditProfileForm from "./routes/dashboard/profile/EditProfileForm";
import ForgotPassword from "./routes/login/ForgotPassword";
import PasswordReset from "./routes/login/PasswordReset";
import Contact from "./routes/Contact";
import ClassSchedule from "./home/ClassSchedule";
import Products from "./routes/Products";
import Locations from "./home/Locations";
import NotFound from "./routes/NotFound";
import MembershipForm from "./routes/dashboard/membership/MembershipPlanForm";
import PlanList from "./routes/dashboard/membership/PlanList";
import Classes from "./home/Classes";
import UserProfile from "./routes/dashboard/profile/UserProfile";

const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100">
        <Navigation
          onOpenCart={() => setIsCartOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <ToastContainer position="top-right" />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/dashboard-home" element={<DashboardHome />} />
          <Route path="/member-stats" element={<StatsOverview />} />
          <Route path="/classes/:slug" element={<ClassSchedule />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/membership" element={<MembershipForm />} />
          <Route path="/planlist" element={<PlanList />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="editprofile" element={<EditProfileForm />} /> 
          <Route path="userstatistics" element={<UserStats />} />
          <Route path="/edit-profile" element={<EditProfileForm />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/password-reset" element={<PasswordReset />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/products" element={<Products />} />

          <Route path="/locations" element={<Locations />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </CartProvider>
  );
};

export default App;
