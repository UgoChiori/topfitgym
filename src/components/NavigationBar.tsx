import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Label from "../components/Label";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../auth/Firebase";
import { toast } from "react-toastify";

// Responsive Navigation Component using your custom Button + Label components
const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const { user, userData, loading } = useContext(AuthContext);

  if (loading) return null;

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };
const handleSignOut = async () => {
  try {
    await signOut(auth);
    navigate("/login");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }catch (error:any) {
      console.error("Error signing out:", error.message);
    toast.error("Sign-out error:", error.message)
  }
};
  return (
    <>
      <nav className="w-full flex items-center justify-between px-6 py-4 shadow-md bg-white sticky top-0 z-50">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Label htmlFor="logo">
            <img src="/images/logo.png" alt="logo" className="w-8" />
          </Label>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-green-800 hover:underline">
            <Label>Home</Label>
          </Link>

          <Link to="/classes" className="text-green-800 hover:underline">
            <Label>Classes</Label>
          </Link>

          <Link to="/membership" className="text-green-800 hover:underline">
            <Label>Membership</Label>
          </Link>

          <Link to="/contact-us" className="text-green-800 hover:underline">
            <Label>Contact</Label>
          </Link>
        </div>
      
        <div className="hidden md:flex items-center gap-4">
          {!user && (
            <Button
              text="Login"
              onClick={() => navigate("/login")}
              loading={false}
              disabled={false}
              htmlType="button"
            />
          )}

          {user && (
            <div className="flex items-center gap-4">
              <span className="text-green-800 font-medium">
                {getGreeting()}, {userData?.firstName}
              </span>
              <Link to="/member-profile">
                <img
                  src={userData?.photoURL || "/images/default-avatar.png"}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover border"
                />
              </Link>

              <Button
                text="Sign Out"
                onClick={handleSignOut}
                loading={false}
                disabled={false}
                htmlType="button"
              />
            </div>
          )}
        </div>

        {/* <div className="hidden md:flex">
          <Button
            text="Login"
            onClick={() => navigate("/login")}
            loading={false}
            disabled={false}
            htmlType="button"
          />
        </div> */}

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            type="ghost"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
            className="text-gray-700 hover:text-[#4f7a20] focus:outline-none focus:ring-2 focus:ring-[#4f7a20] focus:ring-offset-2 rounded cursor-pointer transition"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </nav>
      {/* --- MOBILE MENU --- */}
      {isOpen && (
        <div className="lg:hidden bg-green-200 shadow-inner">
          <ul className="flex flex-col items-start space-y-3 px-6 py-4">
            <Link to="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link to="/classes" onClick={() => setIsOpen(false)}>
              Classes
            </Link>
            <Link to="/membership" onClick={() => setIsOpen(false)}>
              Membership
            </Link>
            <Link to="/contact" onClick={() => setIsOpen(false)}>
              Contact
            </Link>

            {!user && (
              <Button
                text="Login"
                onClick={() => {
                  navigate("/login");
                  setIsOpen(false);
                }}
                loading={false}
                disabled={false}
                htmlType="button"
              />
            )}

            {user && (
              <div className="flex flex-col gap-3">
                <span className="text-green-800 font-medium">
                  {getGreeting()}, {userData?.firstName}
                </span>

                <img
                  src={userData?.photoURL || "/images/default-avatar.png"}
                  alt="profile"
                  className="w-12 h-12 rounded-full object-cover border"
                />

                <Button
                  text="Sign Out"
                  onClick={() => signOut(auth)}
                  loading={false}
                  disabled={false}
                  htmlType="button"
                />
              </div>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default Navigation;

