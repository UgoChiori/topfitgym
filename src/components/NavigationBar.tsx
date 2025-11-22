import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Label from "../components/Label";
import { Menu, X } from "lucide-react";

// Responsive Navigation Component using your custom Button + Label components
const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();

  // if (!e.currentTarget.checkValidity()) return;
  // console.log("Login clicked!");

  // navigate("/dashboard");
  // }

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

          <Link to="/contact" className="text-green-800 hover:underline">
            <Label>Contact</Label>
          </Link>
        </div>

        {/* Auth Button */}
        <div className="hidden md:flex">
          <Button
            text="Login"
            onClick={() => navigate("/login")}
            loading={false}
            disabled={false}
            htmlType="button"
          />
        </div>

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
      {/* mobile menu dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-green-200 shaadow-inner">
          <ul className="flex flex-col items-start space-y-3 px-6 py-4">
            <Link to="/classes">Classes</Link>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navigation;

// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import Label from "../Label";
// import Button from "../Button";
// import { AnimatePresence, motion } from "framer-motion";
// import { Menu, X } from "lucide-react";

// // NOTE: Auth logic placeholder — uncomment when auth is ready
// // const isAuthenticated = false;
// // const user = { name: "Ugo" };

// const Navigation: React.FC = () => {
//   const [open, setOpen] = useState(false);

//   const navItems = [
//     { label: "Home", to: "/" },
//     { label: "Classes", to: "/classes" },
//     { label: "Trainers", to: "/trainers" },
//     { label: "Membership", to: "/membership" },
//   ];

//   return (
//     <nav className="w-full bg-white dark:bg-gray-900 shadow-sm fixed top-0 left-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
//         {/* Logo */}
//         <Label className="text-xl font-bold text-gray-900 dark:text-white">TopFitGym</Label>

//         {/* Desktop Nav */}
//         <div className="hidden md:flex space-x-8 items-center">
//           {navItems.map((item) => (
//             <NavLink
//               key={item.to}
//               to={item.to}
//               className={({ isActive }) =>
//                 `text-sm font-medium transition duration-200 ${
//                   isActive
//                     ? "text-blue-600 dark:text-blue-400"
//                     : "text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
//                 }`
//               }
//             >
//               {item.label}
//             </NavLink>
//           ))}

//           {/* Auth Buttons */}
//           {/* {isAuthenticated ? (
//             <Label className="text-sm text-gray-700 dark:text-gray-300">Hi, {user.name}</Label>
//           ) : (
//             <>
//               <Button variant="ghost" to="/login">Login</Button>
//               <Button variant="primary" to="/register">Sign Up</Button>
//             </>
//           )} */}
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden text-gray-700 dark:text-gray-300"
//           onClick={() => setOpen(!open)}
//         >
//           {open ? <X size={26} /> : <Menu size={26} />}
//         </button>
//       </div>

//       {/* Mobile Drawer */}
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.2 }}
//             className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg"
//           >
//             <div className="flex flex-col space-y-4 p-4">
//               {navItems.map((item) => (
//                 <NavLink
//                   key={item.to}
//                   to={item.to}
//                   onClick={() => setOpen(false)}
//                   className={({ isActive }) =>
//                     `text-base font-medium transition duration-200 ${
//                       isActive
//                         ? "text-blue-600 dark:text-blue-400"
//                         : "text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
//                     }`
//                   }
//                 >
//                   {item.label}
//                 </NavLink>
//               ))}

//               {/* Auth Buttons (commented until auth is ready) */}
//               {/* {!isAuthenticated && (
//                 <div className="flex flex-col space-y-2">
//                   <Button to="/login" variant="ghost">Login</Button>
//                   <Button to="/register" variant="primary">Sign Up</Button>
//                 </div>
//               )} */}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// };

// export default Navigation;
