// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// import {
//   Formik,
//   Form as FormikForm,
//   FormikErrors,
//   FormikTouched,
//   FormikHandlers,
// } from "formik";
// import * as Yup from "yup";
// import { toast } from "react-toastify";
// import "react-toastify/ReactToastify.css";
// import Input from "../../components/Input";
// import Button from "../../components/Button";
// import Label from "../../components/Label";
// import RevealPassword from "../../components/RevealPassword";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   sendEmailVerification,
// } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { db } from "../../auth/Firebase";

// interface FormValues {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   username: string;
//   password: string;
//   confirmPassword: string;
//   terms: boolean;
// }

// const RegisterForm = () => {
//   const [dialCode, setDialCode] = useState("+234");
//   const [reveal, setReveal] = useState(false);
//   const [reveal2, setReveal2] = useState(false);

//   // const navigate = useNavigate();
//   const auth = getAuth();

//   const validationSchema = Yup.object().shape({
//     firstName: Yup.string().required("First Name is Required"),
//     lastName: Yup.string().required("Last Name is Required"),
//     email: Yup.string().email("Email is invalid").required("Email is required"),
//     phone: Yup.string().required("Phone Number is Required"),
//     username: Yup.string().required("Username is Required"),
//     password: Yup.string()
//       .required("Password is Required")
//       .matches(
//         /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{8,}$/,
//         "Minimum 8 characters, at least one uppercase letter, lowercase letter, number and special character"
//       ),
//     confirmPassword: Yup.string()
//       .required("Password Confirmation is Required")
//       .oneOf([Yup.ref("password")], "Passwords must match"),
//     terms: Yup.boolean().oneOf([true], "Please agree to the terms"),
//   });

//   const initialValues: FormValues = {
//     firstName: "",
//     lastName: "",
//     email: "",
//     username: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     terms: false,
//   };

//   const handlePhoneChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     // eslint-vccccdisable-next-line @typescript-eslint/no-explicit-any

//     setFieldValue: (field: string, value: any) => void
//   ) => {
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
//           onSubmit={async (values: FormValues, { setSubmitting }) => {
//             try {
//               // 1️⃣ Create user in Firebase Auth
//               const userCredential = await createUserWithEmailAndPassword(
//                 auth,
//                 values.email,
//                 values.password
//               );

//               const user = userCredential.user;

//               // 2️⃣ Send Email Verification
//               await sendEmailVerification(user);
//               // 4️⃣ Success notification
//               toast.success(
//                 "Account created! A verification email has been sent to your inbox."
//               );
//               // 3️⃣ Save user extra details to Firestore
//               await setDoc(doc(db, "users", user.uid), {
//                 firstName: values.firstName,
//                 lastName: values.lastName,
//                 username:values.username,
//                 phone: values.phone,
//                 email: values.email,
//                 createdAt: new Date().toISOString(),
//               });

//               // OPTIONAL: redirect to login page after 2 seconds
//            setRegisteredEmail(values.email);
// setShowVerifyModal(true);

//             } catch (error: any) {
//               console.error(error);
//               toast.error(error.message || "Registration failed");
//             } finally {
//               setSubmitting(false);
//             }
//           }}
//         >
//           {({ errors, touched, handleChange, setFieldValue }) => (
//             <FormikForm className="space-y-4">
//               <FormField
//                 label="First Name"
//                 name="firstName"
//                 type="text"
//                 placeholder="First Name"
//                 errors={errors}
//                 touched={touched}
//                 handleChange={handleChange}
//               />

//               <FormField
//                 label="Last Name"
//                 name="lastName"
//                 type="text"
//                 placeholder="Last Name"
//                 errors={errors}
//                 touched={touched}
//                 handleChange={handleChange}
//               />

//               <FormField
//                 label="Email Address"
//                 name="email"
//                 type="email"
//                 placeholder="janedoe@mail.com"
//                 errors={errors}
//                 touched={touched}
//                 handleChange={handleChange}
//               />

//               {/* Phone Number */}
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

//               {/* Password Fields */}
//               <PasswordField
//                 label="New Password"
//                 name="password"
//                 reveal={reveal}
//                 setReveal={setReveal}
//                 errors={errors}
//                 touched={touched}
//                 handleChange={handleChange}
//               />

//               <PasswordField
//                 label="Confirm Password"
//                 name="confirmPassword"
//                 reveal={reveal2}
//                 setReveal={setReveal2}
//                 errors={errors}
//                 touched={touched}
//                 handleChange={handleChange}
//               />

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

//         <FooterLinks />

//       </div>
//     </div>
//   );
// };

// export default RegisterForm;

// /* -------------------------
//    REUSABLE SMALL COMPONENTS
// ---------------------------*/

// interface FieldProps {
//   label: string;
//   name: keyof FormValues;
//   type?: string;
//   placeholder?: string;
//   errors: FormikErrors<FormValues>;
//   touched: FormikTouched<FormValues>;
//   handleChange: FormikHandlers["handleChange"];
// }

// const FormField = ({
//   label,
//   name,
//   type = "text",
//   placeholder = "",
//   errors,
//   touched,
//   handleChange,
// }: FieldProps) => (
//   <div>
//     <Label htmlFor={name}>{label}</Label>
//     <Input
//       name={name}
//       type={type}
//       placeholder={placeholder}
//       onChange={handleChange}
//       className="mt-1 w-full"
//     />
//     {errors[name] && touched[name] && (
//       <ErrorText message={errors[name] as string} />
//     )}
//   </div>
// );

// interface PasswordFieldProps extends FieldProps {
//   reveal: boolean;
//   setReveal: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const PasswordField = ({
//   label,
//   name,
//   reveal,
//   setReveal,
//   errors,
//   touched,
//   handleChange,
// }: PasswordFieldProps) => (
//   <div className="relative">
//     <Label htmlFor={name}>{label}</Label>
//     <Input
//       name={name}
//       type={reveal ? "text" : "password"}
//       placeholder="***************"
//       onChange={handleChange}
//       className="mt-1 w-full pr-10"
//     />
//     <div className="absolute right-3 top-9 transform-translate-y-1/2">
//       <RevealPassword reveal={reveal} setReveal={setReveal} />
//     </div>
//     {errors[name] && touched[name] && (
//       <ErrorText message={errors[name] as string} />
//     )}
//   </div>
// );

// const ErrorText = ({ message }: { message: string }) => (
//   <p className="text-red-500 text-xs mt-1">{message}</p>
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

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import {
  Formik,
  Form as FormikForm,
  FormikErrors,
  FormikTouched,
  FormikHandlers,
} from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Label from "../../components/Label";
import RevealPassword from "../../components/RevealPassword";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../auth/Firebase";
import VerifyEmailModal from "../../modals/VerifyEmailModal";

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
  const [showVerifyModal, setShowVerifyModal] = useState(false);
const [registeredEmail, setRegisteredEmail] = useState<string | undefined>("");

  // const navigate = useNavigate();
  const auth = getAuth();

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
    terms: Yup.boolean().oneOf([true], "Please agree to the terms"),
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
    // eslint-vccccdisable-next-line @typescript-eslint/no-explicit-any

    setFieldValue: (field: string, value: any) => void
  ) => {
    const numeric = e.target.value.replace(/\D/g, "");
    setFieldValue("phone", `${dialCode}${numeric}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-xl p-8">
        <h2 className="text-2xl text-green-800 font-bold mb-6 text-center">
          Sign Up
        </h2>
<Formik
  initialValues={initialValues}
  validationSchema={validationSchema}
  onSubmit={async (values: FormValues, { setSubmitting }) => {
    console.log("Formik submit called");
    console.log("Form values:", values);

    try {
      //  Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      console.log("Firebase Auth user created:", userCredential.user);

      const user = userCredential.user;

      //  Email Verification
      await sendEmailVerification(user);
      console.log("Email verification sent");

      // Save user extra details to Firestore
      try {
        await setDoc(doc(db, "users", user.uid), {
          firstName: values.firstName,
          lastName: values.lastName,
          // username: values.username,
          phone: values.phone,
          email: values.email,
          createdAt: new Date().toISOString(),
        });
        console.log("User document written to Firestore");
      } catch (firestoreError) {
        console.error("Firestore write failed:", firestoreError);
      }

      // Success notification
      toast.success(
        "Account created! A verification email has been sent to your inbox."
      );

      // OPTIONAL: redirect to login page after 2 seconds
      setRegisteredEmail(values.email);
setShowVerifyModal(true);
 console.log("Navigating to /login");
      // setTimeout(() => {
      //   console.log("Navigating to /login");
      //   navigate("/login");
      // }, 2000);

    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
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

                {errors.phone && touched.phone && (
                  <ErrorText message={errors.phone} />
                )}
              </div>

              {/* The Password Field */}
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

              {/* Terms and coditons*/}
              <div className="flex gap-2 items-start">
                <Input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  onChange={handleChange}
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the Privacy Policy & Terms
                </Label>
              </div>
              {errors.terms && touched.terms && (
                <ErrorText message={errors.terms} />
              )}

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
      {showVerifyModal && (
  <VerifyEmailModal
    email={registeredEmail}
   
  />
)}

    </div>
  );
};

export default RegisterForm;

/* -------------------------
  HERE, REUSABLE SMALL COMPONENTS 
---------------------------*/

interface FieldProps {
  label: string;
  name: keyof FormValues;
  type?: string;
  placeholder?: string;
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
  handleChange: FormikHandlers["handleChange"];
}

const FormField = ({
  label,
  name,
  type = "text",
  placeholder = "",
  errors,
  touched,
  handleChange,
}: FieldProps) => (
  <div>
    <Label htmlFor={name}>{label}</Label>
    <Input
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
      className="mt-1 w-full"
    />
    {errors[name] && touched[name] && (
      <ErrorText message={errors[name] as string} />
    )}
  </div>
);

interface PasswordFieldProps extends FieldProps {
  reveal: boolean;
  setReveal: React.Dispatch<React.SetStateAction<boolean>>;
}

const PasswordField = ({
  label,
  name,
  reveal,
  setReveal,
  errors,
  touched,
  handleChange,
}: PasswordFieldProps) => (
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
    {errors[name] && touched[name] && (
      <ErrorText message={errors[name] as string} />
    )}
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
