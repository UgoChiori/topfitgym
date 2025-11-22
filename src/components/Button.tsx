// // import React from "react";

// // interface CustomButtonProps {
// //   text?: string;
// //   onClick: () => void;
// //   disabled?: boolean;
// //   type?: "primary" | "default" | "dashed" | "text" | "link" ;
// //   loading?: boolean;
// //   className?: string;
// //   color?: string;
// //   backgroundColor?: string;
// //   width?: string | number;
// //   children?: React.ReactNode;
// // }

// // const CustomButton: React.FC<CustomButtonProps> = ({
// //   text,
// //   className = "",
// //   onClick,
// //   disabled = false,
// //   loading = false,
// //   children,
// //   color,
// //   backgroundColor,
// //   width,
// // }) => {
// //   const inlineStyles: React.CSSProperties = {
// //     ...(color ? { color } : {}),
// //     ...(backgroundColor ? { backgroundColor } : {}),
// //     ...(width ? { width } : {}),
// //   };

// //   const baseStyles = `
// //     px-5 py-2.5 rounded-md font-medium text-sm shadow-md
// //     transition duration-200 ease-in-out cursor-pointer
// //   `;

// //   const activeStyles = disabled
// //     ? "bg-gray-400 text-gray-200 cursor-not-allowed"
// //     : !backgroundColor && !color
// //     ? "bg-blue-600 text-white hover:bg-blue-700"
// //     : "";

// //   return (
// //     <div className={`flex items-center justify-center  ${width ? "w-full" : ""}`}>
// //       <button
// //         type="button"
// //         onClick={onClick}
// //         disabled={disabled}
// //         className={`${baseStyles} ${activeStyles} ${className}`}
// //         style={inlineStyles}
// //       >
// //         {loading ? "Loading..." : children || text}
// //       </button>
// //     </div>
// //   );
// // };

// // export default CustomButton;


// import React from "react";

// interface CustomButtonProps {
//   text?: string;
//   onClick?: () => void;
//   disabled?: boolean;
//   type?: "primary" | "default" | "dashed" | "text" | "link" | "ghost";
//   htmlType?: "button" | "submit" | "reset";
//   loading?: boolean;
//   className?: string;
//   color?: string;
//   backgroundColor?: string;
//   width?: string | number;
//   children?: React.ReactNode;
// }

// const CustomButton: React.FC<CustomButtonProps> = ({
//   text,
//   className = "",
//   onClick,
//   disabled = false,
//   loading = false,
//   children,
//   color,
//   backgroundColor,
//   width,
//   htmlType = "button",
// }) => {
//   const inlineStyles: React.CSSProperties = {
//     ...(color ? { color } : {}),
//     ...(backgroundColor ? { backgroundColor } : {}),
//     ...(width ? { width } : {}),
//   };

//   const baseStyles = `
//     px-5 py-2.5 rounded-md font-medium text-sm shadow-md
//     transition duration-200 ease-in-out cursor-pointer
//   `;

//   const activeStyles = disabled
//     ? "bg-gray-400 text-gray-200 cursor-not-allowed"
//     : !backgroundColor && !color
//     ? "bg-green-800 text-white hover:bg-green-600"
//     : "";

//   return (
//     <div
//       className={`flex items-center justify-center ${width ? "w-full" : ""}`}
//     >
//       <button
//         type={htmlType}
//         onClick={onClick}
//         disabled={disabled}
//         className={`${baseStyles} ${activeStyles} ${className}`}
//         style={inlineStyles}
//       >
//         {loading ? "Loading..." : children || text}
//       </button>
//     </div>
//   );
// };

// export default CustomButton;
import React from "react";

interface CustomButtonProps {
  text?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "primary" | "default" | "dashed" | "text" | "link" | "ghost";
  htmlType?: "button" | "submit" | "reset";
  loading?: boolean;
  className?: string;
  color?: string;
  backgroundColor?: string;
  width?: string | number;
  children?: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  className = "",
  onClick,
  disabled = false,
  loading = false,
  children,
  color,
  backgroundColor,
  width,
  type = "primary",  // <-- default variant
  htmlType = "button",
}) => {
  const inlineStyles: React.CSSProperties = {
    ...(color ? { color } : {}),
    ...(backgroundColor ? { backgroundColor } : {}),
    ...(width ? { width } : {}),
  };

  const baseStyles = `
    px-5 py-2.5 rounded-md font-medium text-sm shadow-md
    transition duration-200 ease-in-out
    flex items-center justify-center
  `;

  // ⭐ Tailwind-like styles for variants
  const variantStyles: Record<string, string> = {
    primary:
      "bg-green-800 text-white hover:bg-green-600 cursor-pointer",
    default:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 cursor-pointer",
    dashed:
      "border border-dashed border-gray-500 text-gray-800 hover:bg-gray-100 cursor-pointer",
    text:
      "bg-transparent text-gray-700 hover:underline shadow-none cursor-pointer ",
    link:
      "bg-transparent text-blue-600 hover:underline shadow-none cursor-pointer ",
    ghost:
      "bg-transparent text-gray-700 hover:bg-gray-100",
  };

  const activeStyles = disabled
    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
    : backgroundColor || color
    ? "" // User manually overrides style
    : variantStyles[type] || variantStyles["primary"];

  return (
    <div className={`flex items-center justify-center ${width ? "w-full" : ""}`}>
      <button
        type={htmlType}
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyles} ${activeStyles} ${className}`}
        style={inlineStyles}
      >
        {loading ? "Loading..." : children || text}
      </button>
    </div>
  );
};

export default CustomButton;
