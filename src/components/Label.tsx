import React from "react";

type LabelProps = {
  // name?: string;
  // id?: string;
  className?: string;
  htmlFor?: string;
  // style?: React.CSSProperties;
  children?: React.ReactNode;
};

const Label: React.FC<LabelProps> = ({
  className = "",
  htmlFor,

  children,
}) => {
  const baseStyles = `
         text-sm font-medium text-gray-700 text-left
        mb-1 text-sm
        ${!htmlFor ? "cursor-default" : ""}
        ${!children ? "invisible" : ""}
        ${!className ? "" : className}
        ${!htmlFor ? "cursor-pointer" : ""}
        ${!children ? "invisible" : ""}     
        ${className}
    `;

  return (
    <label htmlFor={htmlFor} className={baseStyles}>
      {children}
    </label>
  );
};

export default Label;
