import React from "react";

type FormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  className?: string;
};

const Form: React.FC<FormProps> = ({ onSubmit, children, className = "" }) => {
  return (
    <form
      onSubmit={onSubmit}
      className={`bg-white p-6 rounded-lg shadow-md ${className}`}
      // noValidate
    >
      {children}
    </form>
  );
};

export default Form;
