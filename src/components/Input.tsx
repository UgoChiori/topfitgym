import React, { ChangeEvent } from "react";

type InputFieldProps = {
  name?: string;
  id?: string;
  placeholder?: string;
  className?: string;
  type?: string;
  defaultValue?: string;
  required?: boolean;
  readOnly?: boolean;
  value?: string;
  checked?: boolean;
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  style?: React.CSSProperties;
};

const Input: React.FC<InputFieldProps> = ({
  name,
  id,
  placeholder,
  className = "",
  type,
  defaultValue,
  required,
  value,
  onChange,
  onBlur,
  readOnly,
  style,
}) => {
  const baseStyles = `
   px-4 py-2 rounded-md text-sm border border-gray-300
    bg-white text-gray-800 placeholder-gray-400
    focus:outline-none focus:ring-2 focus:ring-blue-500
    transition duration-150 ease-in-out
    ${readOnly ? "bg-gray-100 cursor-not-allowed" : ""}
    ${className}
  `;

  if (type === "textarea") {
    return (
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required={required}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        readOnly={readOnly}
        style={style}
        className={baseStyles}
        rows={4}
      />
    );
  }

  return (
    <input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      defaultValue={defaultValue}
      required={required}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      readOnly={readOnly}
      style={style}
      className={baseStyles}
    />
  );
};

export default Input;
