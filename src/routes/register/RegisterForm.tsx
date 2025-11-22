// import { useState } from "react";
// import Input from "../../components/Input";
// import Button from "../../components/Button";
// import Label from "../../components/Label";
// // import Form from "../../components/Form";
// import { useNavigate } from "react-router-dom";
// import { Formik, Form as FormikForm } from "formik";
// import * as Yup from "yup";
// import RevealPassword from "../../components/RevealPassword";

// const RegisterForm = () => {
//   const [dialCode, setDialCode] = useState("+234");
//   const [reveal, setReveal] = useState(false);
//   const [reveal2, setReveal2] = useState(false);
//   const navigate = useNavigate();

//   const schema = Yup.object().shape({
//     firstName: Yup.string().required("First Name is Required"),
//     lastName: Yup.string().required("Last Name is Required"),
//     email: Yup.string().email("Email is invalid").required("Email is required"),
//     phone: Yup.string().required("Phone Number is Required"),
//     password: Yup.string()
//       .required("Password is Required")
//       .matches(
//         /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@$!%*?&]).{8,}$/,
//         "Minimum 8 characters, at least one uppercase letter, lowercase letter, number and special character"
//       ),
//     confirmPassword: Yup.string()
//       .required("Password Confirmation is Required")
//       .oneOf([Yup.ref("password")], "Passwords must match"),
//     terms: Yup.boolean().oneOf([true], "You must agree to the terms"),
//   });

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4 bg-green-100">
//       <div className="max-w-md w-full bg-white shadow-md rounded-xl p-8">
//         <h2 className="text-2xl text-green-800 font-bold mb-6 text-center">
//           Sign Up
//         </h2>

//         <Formik
//           initialValues={{
//             firstName: "",
//             lastName: "",
//             email: "",
//             phone: "",
//             password: "",
//             confirmPassword: "",
//             terms: false,
//           }}
//           validationSchema={schema}
//           onSubmit={(values) => {
//             console.log(values);
//             alert("Member successfully registered.");
//             navigate("/dashboard-home");
//           }}
//         >
//           {({ errors, touched, handleChange, setFieldValue }) => (
//             <FormikForm className="space-y-4">
//               {/* First Name */}
//               <div>
//                 <Label htmlFor="firstName">First Name</Label>
//                 <Input
//                   name="firstName"
//                   type="text"
//                   placeholder="First Name"
//                   onChange={handleChange}
//                   className="mt-1 w-full"
//                 />
//                 {errors.firstName && touched.firstName && (
//                   <p className="text-red-500 text-xs mt-1">
//                     {errors.firstName}
//                   </p>
//                 )}
//               </div>

//               {/* Last Name */}
//               <div>
//                 <Label htmlFor="lastName">Last Name</Label>
//                 <Input
//                   name="lastName"
//                   type="text"
//                   placeholder="Last Name"
//                   onChange={handleChange}
//                   className="mt-1 w-full"
//                 />
//                 {errors.lastName && touched.lastName && (
//                   <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
//                 )}
//               </div>

//               {/* Email */}
//               <div>
//                 <Label htmlFor="email">Email Address</Label>
//                 <Input
//                   name="email"
//                   type="email"
//                   placeholder="janedoe@mail.com"
//                   onChange={handleChange}
//                   className="mt-1 w-full"
//                 />
//                 {errors.email && touched.email && (
//                   <p className="text-red-500 text-xs mt-1">{errors.email}</p>
//                 )}
//               </div>

//               {/* Phone Number */}
//               <div>
//                 <Label>Phone Number</Label>

//                 <div className="flex border border-md-gray2 w-full px-3 py-2 rounded-[6px]">
//                   {/* Dial Code Selector */}
//                   <select
//                     className="pr-3 py-1 border-r border-md-gray2 bg-white outline-none"
//                     value={dialCode}
//                     onChange={(e) => setDialCode(e.target.value)}
//                   >
//                     <option value="+234">🇳🇬 +234</option>
//                     {/* <option value="+233">🇬🇭 +233</option>
//       <option value="+44">🇬🇧 +44</option>
//       <option value="+1">🇺🇸 +1</option> */}
//                   </select>

//                   {/* Phone Input */}
//                   <input
//                     type="text"
//                     name="phone"
//                     inputMode="numeric"
//                     pattern="[0-9]*"
//                     placeholder="801 234 5678"
//                     className="border-none outline-none w-full px-3 py-1"
//                     onChange={(e) => {
//                       const value = e.target.value.replace(/\D/g, "");
//                       setFieldValue("phone", `${dialCode}${value}`);
//                     }}
//                     onKeyDown={(e) => {
//                       if (
//                         !/[0-9]/.test(e.key) &&
//                         e.key !== "Backspace" &&
//                         e.key !== "Tab"
//                       ) {
//                         e.preventDefault();
//                       }
//                     }}
//                   />
//                 </div>

//                 {errors.phone && touched.phone && (
//                   <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
//                 )}
//               </div>

//               {/* Password */}
//               <div className="relative">
//                 <Label htmlFor="password">New Password</Label>
//                 <Input
//                   name="password"
//                   type={reveal ? "text" : "password"}
//                   placeholder="***************"
//                   onChange={handleChange}
//                   className="mt-1 w-full pr-10"
//                 />
//                 <div className="absolute right-3 top-9 transform -translate-y-1/2">
//                   <RevealPassword reveal={reveal} setReveal={setReveal} />
//                 </div>
//                 {errors.password && touched.password && (
//                   <p className="text-red-500 text-xs mt-1">{errors.password}</p>
//                 )}
//               </div>

//               {/* Confirm Password */}

//               <div className="relative ">
//                 <Label htmlFor="confirmPassword">Confirm Password</Label>
//                 <Input
//                   name="confirmPassword"
//                   type={reveal2 ? "text" : "password"}
//                   placeholder="***************"
//                   onChange={handleChange}
//                   className="mt-1 w-full pr-10"
//                 />
//                 <div className="absolute right-3 top-9 transform -translate-y-1/2">
//                   <RevealPassword reveal={reveal2} setReveal={setReveal2} />
//                 </div>
//                 {errors.confirmPassword && touched.confirmPassword && (
//                   <p className="text-red-500 text-xs mt-1">
//                     {errors.confirmPassword}
//                   </p>
//                 )}
//               </div>

//               {/* Terms */}
//               <div className="flex gap-2 items-start">
//                 <Input
//                   type="checkbox"
//                   id="terms"
//                   name="terms"
//                   onChange={handleChange}
//                 />
//                 <Label htmlFor="terms" className="text-sm">
//                   I agree to the Privacy Policy & Terms
//                 </Label>
//               </div>
//               {errors.terms && touched.terms && (
//                 <p className="text-red-500 text-xs mt-1">{errors.terms}</p>
//               )}

//               <Button
//                 text="Sign Up"
//                 htmlType="submit"
//                 onClick={() => {}}
//                 loading={false}
//                 disabled={false}
//                 width="100%"
//               />
//             </FormikForm>
//           )}
//         </Formik>
//         <div className="mt-6 flex flex-col items-center gap-3 text-center">
//           <p className="text-sm text-gray-600">
//             Already have an account?{" "}
//             <a href="/login" className="text-green-800 hover:underline">
//               Sign In
//             </a>
//           </p>

//           <p className="text-sm text-gray-600">
//             Forgot your password?{" "}
//             <a
//               href="/forgot-password"
//               className="text-green-800 hover:underline"
//             >
//               Reset it
//             </a>
//           </p>
//         </div>

//         {/* Terms */}
//         <div className="mt-6 text-center">
//           <p className="text-sm text-gray-600 leading-relaxed">
//             By registering, you agree to our{" "}
//             <a href="/terms" className="text-green-800 hover:underline">
//               Terms of Service
//             </a>{" "}
//             and{" "}
//             <a href="/privacy" className="text-green-800 hover:underline">
//               Privacy Policy
//             </a>
//             .
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterForm;


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Formik, Form as FormikForm } from "formik";
// import * as Yup from "yup";

// import Input from "../../components/Input";
// import Button from "../../components/Button";
// import Label from "../../components/Label";
// import RevealPassword from "../../components/RevealPassword";

// const RegisterForm = () => {
//   const [dialCode, setDialCode] = useState("+234");
//   const [reveal, setReveal] = useState(false);
//   const [reveal2, setReveal2] = useState(false);

//   const navigate = useNavigate();

//   const validationSchema = Yup.object().shape({
//     firstName: Yup.string().required("First Name is Required"),
//     lastName: Yup.string().required("Last Name is Required"),
//     email: Yup.string().email("Email is invalid").required("Email is required"),
//     phone: Yup.string().required("Phone Number is Required"),
//     password: Yup.string()
//       .required("Password is Required")
//       .matches(
//         /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{8,}$/,
//         "Minimum 8 characters, at least one uppercase letter, lowercase letter, number and special character"
//       ),
//     confirmPassword: Yup.string()
//       .required("Password Confirmation is Required")
//       .oneOf([Yup.ref("password")], "Passwords must match"),
//     terms: Yup.boolean().oneOf([true], "You must agree to the terms"),
//   });

//   const initialValues = {
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     terms: false,
//   };

//   const handlePhoneChange = (e: any, setFieldValue: any) => {
//     const numeric = e.target.value.replace(/\D/g, "");
//     setFieldValue("phone", `${dialCode}${numeric}`);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4 bg-green-100">
//       <div className="max-w-md w-full bg-white shadow-md rounded-xl p-8">
//         <h2 className="text-2xl text-green-800 font-bold mb-6 text-center">
//           Sign Up
//         </h2>

//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={(values) => {
//             console.log(values);
//             alert("Member successfully registered.");
//             navigate("/dashboard-home");
//           }}
//         >
//           {({ errors, touched, handleChange, setFieldValue }) => (
//             <FormikForm className="space-y-4">
//               {/* FIRST NAME */}
//               <FormField
//                 label="First Name"
//                 name="firstName"
//                 type="text"
//                 placeholder="First Name"
//                 errors={errors}
//                 touched={touched}
//                 handleChange={handleChange}
//               />

//               {/* LAST NAME */}
//               <FormField
//                 label="Last Name"
//                 name="lastName"
//                 type="text"
//                 placeholder="Last Name"
//                 errors={errors}
//                 touched={touched}
//                 handleChange={handleChange}
//               />

//               {/* EMAIL */}
//               <FormField
//                 label="Email Address"
//                 name="email"
//                 type="email"
//                 placeholder="janedoe@mail.com"
//                 errors={errors}
//                 touched={touched}
//                 handleChange={handleChange}
//               />

//               {/* PHONE NUMBER */}
//               <div>
//                 <Label>Phone Number</Label>

//                 <div className="flex border border-md-gray2 w-full px-3 py-2 rounded-[6px]">
//                   <select
//                     className="pr-3 py-1 border-r border-md-gray2 bg-white outline-none"
//                     value={dialCode}
//                     onChange={(e) => setDialCode(e.target.value)}
//                   >
//                     <option value="+234">🇳🇬 +234</option>
//                   </select>

//                   <input
//                     type="text"
//                     inputMode="numeric"
//                     pattern="[0-9]*"
//                     placeholder="801 234 5678"
//                     className="border-none outline-none w-full px-3 py-1"
//                     onChange={(e) => handlePhoneChange(e, setFieldValue)}
//                     onKeyDown={(e) => {
//                       if (
//                         !/[0-9]/.test(e.key) &&
//                         e.key !== "Backspace" &&
//                         e.key !== "Tab"
//                       ) {
//                         e.preventDefault();
//                       }
//                     }}
//                   />
//                 </div>

//                 {errors.phone && touched.phone && (
//                   <ErrorText message={errors.phone} />
//                 )}
//               </div>

//               {/* PASSWORD */}
//               <PasswordField
//                 label="New Password"
//                 name="password"
//                 reveal={reveal}
//                 setReveal={setReveal}
//                 errors={errors}
//                 touched={touched}
//                 handleChange={handleChange}
//               />

//               {/* CONFIRM PASSWORD */}
//               <PasswordField
//                 label="Confirm Password"
//                 name="confirmPassword"
//                 reveal={reveal2}
//                 setReveal={setReveal2}
//                 errors={errors}
//                 touched={touched}
//                 handleChange={handleChange}
//               />

//               {/* TERMS */}
//               <div className="flex gap-2 items-start">
//                 <Input
//                   type="checkbox"
//                   id="terms"
//                   name="terms"
//                   onChange={handleChange}
//                 />
//                 <Label htmlFor="terms" className="text-sm">
//                   I agree to the Privacy Policy & Terms
//                 </Label>
//               </div>
//               {errors.terms && touched.terms && (
//                 <ErrorText message={errors.terms} />
//               )}

//               <Button
//                 text="Sign Up"
//                 htmlType="submit"
//                 width="100%"
//                 loading={false}
//                 disabled={false}
//               />
//             </FormikForm>
//           )}
//         </Formik>

//         {/* FOOTER */}
//         <FooterLinks />
//       </div>
//     </div>
//   );
// };

// export default RegisterForm;

// /* -------------------------
//    REUSABLE SMALL COMPONENTS
// ---------------------------*/

// const ErrorText = ({ message }: { message: string }) => (
//   <p className="text-red-500 text-xs mt-1">{message}</p>
// );

// const FormField = ({
//   label,
//   name,
//   type,
//   placeholder,
//   errors,
//   touched,
//   handleChange,
// }: any) => (
//   <div>
//     <Label htmlFor={name}>{label}</Label>
//     <Input
//       name={name}
//       type={type}
//       placeholder={placeholder}
//       onChange={handleChange}
//       className="mt-1 w-full"
//     />
//     {errors[name] && touched[name] && <ErrorText message={errors[name]} />}
//   </div>
// );

// const PasswordField = ({
//   label,
//   name,
//   reveal,
//   setReveal,
//   errors,
//   touched,
//   handleChange,
// }: any) => (
//   <div className="relative">
//     <Label htmlFor={name}>{label}</Label>
//     <Input
//       name={name}
//       type={reveal ? "text" : "password"}
//       placeholder="***************"
//       onChange={handleChange}
//       className="mt-1 w-full pr-10"
//     />
//     <div className="absolute right-3 top-9 transform -translate-y-1/2">
//       <RevealPassword reveal={reveal} setReveal={setReveal} />
//     </div>
//     {errors[name] && touched[name] && <ErrorText message={errors[name]} />}
//   </div>
// );

// const FooterLinks = () => (
//   <div className="mt-6 flex flex-col items-center gap-3 text-center">
//     <p className="text-sm text-gray-600">
//       Already have an account?{" "}
//       <a href="/login" className="text-green-800 hover:underline">
//         Sign In
//       </a>
//     </p>

//     <p className="text-sm text-gray-600">
//       Forgot your password?{" "}
//       <a href="/forgot-password" className="text-green-800 hover:underline">
//         Reset it
//       </a>
//     </p>

//     <p className="text-sm text-gray-600 leading-relaxed mt-4">
//       By registering, you agree to our{" "}
//       <a href="/terms" className="text-green-800 hover:underline">
//         Terms of Service
//       </a>{" "}
//       and{" "}
//       <a href="/privacy" className="text-green-800 hover:underline">
//         Privacy Policy
//       </a>
//       .
//     </p>
//   </div>
// );


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form as FormikForm, FormikErrors, FormikTouched, FormikHandlers } from "formik";
import * as Yup from "yup";
import {toast} from "react-toastify";
import "react-toastify/ReactToastify.css";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Label from "../../components/Label";
import RevealPassword from "../../components/RevealPassword";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

const RegisterForm = () => {
  const [dialCode, setDialCode] = useState("+234");
  const [reveal, setReveal] = useState(false);
  const [reveal2, setReveal2] = useState(false);

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is Required"),
    lastName: Yup.string().required("Last Name is Required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    phone: Yup.string().required("Phone Number is Required"),
    password: Yup.string()
      .required("Password is Required")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{8,}$/,
        "Minimum 8 characters, at least one uppercase letter, lowercase letter, number and special character"
      ),
    confirmPassword: Yup.string()
      .required("Password Confirmation is Required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
    terms: Yup.boolean().oneOf([true], "You must agree to the terms"),
  });

  const initialValues: FormValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
  };

  const handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFieldValue: (field: string, value: any) => void
  ) => {
    const numeric = e.target.value.replace(/\D/g, "");
    setFieldValue("phone", `${dialCode}${numeric}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-green-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-xl p-8">
        <h2 className="text-2xl text-green-800 font-bold mb-6 text-center">
          Sign Up
        </h2>

      <Formik
  initialValues={initialValues}
  validationSchema={validationSchema}
  onSubmit={(values: FormValues) => {
    console.log(values);
    toast.success("Member successfully registered.");

 
    setTimeout(() => {
      navigate("/dashboard-home");
    }, 1000);
  }}
>
          {({ errors, touched, handleChange, setFieldValue }) => (
            <FormikForm className="space-y-4">
              <FormField
                label="First Name"
                name="firstName"
                type="text"
                placeholder="First Name"
                errors={errors}
                touched={touched}
                handleChange={handleChange}
              />

              <FormField
                label="Last Name"
                name="lastName"
                type="text"
                placeholder="Last Name"
                errors={errors}
                touched={touched}
                handleChange={handleChange}
              />

              <FormField
                label="Email Address"
                name="email"
                type="email"
                placeholder="janedoe@mail.com"
                errors={errors}
                touched={touched}
                handleChange={handleChange}
              />

              {/* Phone Number */}
              <div>
                <Label>Phone Number</Label>

                <div className="flex border border-md-gray2 w-full px-3 py-2 rounded-[6px]">
                  <select
                    className="pr-3 py-1 border-r border-md-gray2 bg-white outline-none"
                    value={dialCode}
                    onChange={(e) => setDialCode(e.target.value)}
                  >
                    <option value="+234">🇳🇬 +234</option>
                  </select>

                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="801 234 5678"
                    className="border-none outline-none w-full px-3 py-1"
                    onChange={(e) => handlePhoneChange(e, setFieldValue)}
                    onKeyDown={(e) => {
                      if (
                        !/[0-9]/.test(e.key) &&
                        e.key !== "Backspace" &&
                        e.key !== "Tab"
                      ) {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>

                {errors.phone && touched.phone && <ErrorText message={errors.phone} />}
              </div>

              {/* Password Fields */}
              <PasswordField
                label="New Password"
                name="password"
                reveal={reveal}
                setReveal={setReveal}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
              />

              <PasswordField
                label="Confirm Password"
                name="confirmPassword"
                reveal={reveal2}
                setReveal={setReveal2}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
              />

              {/* Terms */}
              <div className="flex gap-2 items-start">
                <Input type="checkbox" id="terms" name="terms" onChange={handleChange} />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the Privacy Policy & Terms
                </Label>
              </div>
              {errors.terms && touched.terms && <ErrorText message={errors.terms} />}

              <Button
                text="Sign Up"
                htmlType="submit"
                width="100%"
                loading={false}
                disabled={false}
              />
            </FormikForm>
          )}
        </Formik>

        <FooterLinks />
      </div>
    
    </div>
  );
};

export default RegisterForm;

/* -------------------------
   REUSABLE SMALL COMPONENTS
---------------------------*/

interface FieldProps {
  label: string;
  name: keyof FormValues;
  type?: string;
  placeholder?: string;
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
  handleChange: FormikHandlers['handleChange'];
}

const FormField = ({ label, name, type = "text", placeholder = "", errors, touched, handleChange }: FieldProps) => (
  <div>
    <Label htmlFor={name}>{label}</Label>
    <Input
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
      className="mt-1 w-full"
    />
    {errors[name] && touched[name] && <ErrorText message={errors[name] as string} />}
  </div>
);

interface PasswordFieldProps extends FieldProps {
  reveal: boolean;
  setReveal: React.Dispatch<React.SetStateAction<boolean>>;
}

const PasswordField = ({ label, name, reveal, setReveal, errors, touched, handleChange }: PasswordFieldProps) => (
  <div className="relative">
    <Label htmlFor={name}>{label}</Label>
    <Input
      name={name}
      type={reveal ? "text" : "password"}
      placeholder="***************"
      onChange={handleChange}
      className="mt-1 w-full pr-10"
    />
    <div className="absolute right-3 top-9 transform -translate-y-1/2">
      <RevealPassword reveal={reveal} setReveal={setReveal} />
    </div>
    {errors[name] && touched[name] && <ErrorText message={errors[name] as string} />}
  </div>
);

const ErrorText = ({ message }: { message: string }) => (
  <p className="text-red-500 text-xs mt-1">{message}</p>
);

const FooterLinks = () => (
  <div className="mt-6 flex flex-col items-center gap-3 text-center">
    <p className="text-sm text-gray-600">
      Already have an account?{" "}
      <a href="/login" className="text-green-800 hover:underline">
        Sign In
      </a>
    </p>

    <p className="text-sm text-gray-600">
      Forgot your password?{" "}
      <a href="/forgot-password" className="text-green-800 hover:underline">
        Reset it
      </a>
    </p>

    <p className="text-sm text-gray-600 leading-relaxed mt-4">
      By registering, you agree to our{" "}
      <a href="/terms" className="text-green-800 hover:underline">
        Terms of Service
      </a>{" "}
      and{" "}
      <a href="/privacy" className="text-green-800 hover:underline">
        Privacy Policy
      </a>
      .
    </p>
  </div>
);
