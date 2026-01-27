import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button";
import Label from "../components/Label";
import { Menu, X, ShoppingCart } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../auth/Firebase";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";

interface Props {
  onOpenCart: () => void;
  searchQuery?: string;
  setSearchQuery?: (val: string) => void;
}

const Navigation: React.FC<Props> = ({ onOpenCart }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const { user, userData, loading } = useContext(AuthContext);
  const { cartCount } = useCart();
  const location = useLocation();

  const isAuthPage = location.pathname === "/login" ||location.pathname === "/register";

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
    } catch (error: any) {
      console.error("Error signing out:", error.message);
      toast.error("Sign-out error:", error.message);
    }
  };
  if (isAuthPage) return null;
  return (
    <>
      <nav className="w-full flex items-center justify-between px-6 py-4 shadow-md bg-white sticky top-0 z-50">
        <div className=" flex items-center gap-2">
          <Link to="/">
            <img src="/images/logo.png" alt="logo" className="w-20 max-h-none -my-4" />
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-green-800 hover:underline">
            <Label>Home</Label>
          </Link>

          <Link to="/classes" className="text-green-800 hover:underline">
            <Label>Classes</Label>
          </Link>

          <Link to="/planlist" className="text-green-800 hover:underline">
            <Label>Membership</Label>
          </Link>

          <Link to="/contact-us" className="text-green-800 hover:underline">
            <Label>Contact</Label>
          </Link>
          <Link to="/products" className="text-green-800 hover:underline">
            <Label>Products</Label>
          </Link>
          <button
            onClick={onOpenCart}
            className="relative p-2 text-green-800 hover:bg-green-50 rounded-full transition cursor-pointer"
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
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
              <Link to="/userprofile">
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
            <Link to="/contact-us" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
            <Link to="/products" onClick={() => setIsOpen(false)}>
              Products
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
                <Link to="/userprofile">
                  <img
                    src={userData?.photoURL || "/images/default-avatar.png"}
                    alt="profile"
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                </Link>
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

