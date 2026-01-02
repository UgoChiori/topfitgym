// import React, {useState, useEffect} from "react";
// import { ScrollRestoration } from "react-router-dom";
// import Input from "../components/Input";
// import Button from "../components/Button";
// import Label from "../components/Label";
// import Form from "../components/Form";
// import { toast } from "react-toastify";
// // import { Formik } from "formik";

// const Contact: React.FC = () => {
//     const [ formData, setFormData] = useState({
//         fullName: "",
//         email:"",
//         contactNo:"",
//         subject:"",
//         message:"",
//     });
//     const [isFormFilled, setIsFormFilled] = useState(false);

//      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)  => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

// // const handleSubmit = async (e: { preventDefault: () => void }) => {
// //     e.preventDefault();
// //     // ARE ALL FIELDS FILLED?

// //   console.log(formData)

// //   };

//   return (
//  <div className="min-h-screen flex items-center justify-center px-4 bg-green-100">
// <div className="max-w-md w-full bg-white shadow-md rounded-xl p-8">
//         <Form onSubmit={handleSubmit}>
//           <h2 className="text-2xl text-green-800 font-bold mb-6 text-center">
//           Contact Us
//           </h2>
//           <div className="mb-5">
//             <Label htmlFor="fullName" className="block mb-2 text-green-800">Name</Label>
//                <Input
//               name="name"
//               required
//               placeholder="Name"
//               className="w-full"
//             />
//           </div>
//              <div className="mb-4">
//                   <Label htmlFor="Email Address" />
//                   <Input
//                     name="email"
//                     type="email"
//                     placeholder="Enter your email"
//                     onChange={handleChange}
//                     className="mt-1 w-full"
//                   />
//                   {/* {errors.email && touched.email && (
//                     <p className="text-red-500 text-xs mt-1">{errors.email}</p>
//                   )} */}
//                 </div>
//                                 <Label>Phone Number</Label>

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
//                <div className="mb-5">
//                   <Label htmlFor="subject" className="block mb-2 text-green-800">
//              Subject
//             </Label>
//                           <Input

//                             name="subject"
//                             type="text"
//                             placeholder="Subject"
//                             value={formData.subject}
//                             onChange={handleChange}
//                             required
//                           />
//                         </div>
//                          <div className="mb-5">
//                           <Label className="block mb-2 text-green-800">Message</Label>
//                           <textarea
//                             className="app-form-control"
//                             name="message"
//                             placeholder="Message"
//                             value={formData.message}
//                             onChange={handleChange}
//                           />
//                         </div>
//                            <Button
//             text="Submit"
//             htmlType="submit"
//             onClick={() => {}}
//             loading={loading}
//             disabled={false}
//             width="100%"
//           />
//           </Form>
//           </div>

//  </div>
//   )
// }

// export default Contact

import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Label from "../components/Label";
import Form from "../components/Form";
import { toast } from "react-toastify";
// import { ScrollRestoration } from "react-router-dom";

import { db } from "../auth/Firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNo: "",
    subject: "",
    message: "",
  });

  const [dialCode, setDialCode] = useState("+234");
  const [loading, setLoading] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);

  useEffect(() => {
    const complete = Object.values(formData).every((x) => x.trim() !== "");
    setIsFormFilled(complete);
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setFormData({ ...formData, contactNo: value });
  };

  const validate = () => {
    if (!formData.fullName) return "Name is required.";
    if (!formData.email || !formData.email.includes("@"))
      return "Valid email is required.";
    if (!formData.contactNo || formData.contactNo.length < 7)
      return "Enter a valid phone number.";
    if (!formData.subject) return "Subject is required.";
    if (!formData.message) return "Message is required.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error = validate();
    if (error) return toast.error(error);

    setLoading(true);

    try {
      const fullPhone = `${dialCode}${formData.contactNo}`;

      // 1️⃣ Save to contacts collection
      await addDoc(collection(db, "contacts"), {
        ...formData,
        phone: fullPhone,
        createdAt: Timestamp.now(),
      });

      // 2️⃣ Trigger Firebase Extension Email
      await addDoc(collection(db, "mail"), {
        to: "your-email@example.com", // where you want to receive messages
        message: {
          subject: `New Contact Form: ${formData.subject}`,
          text: `
            Name: ${formData.fullName}
            Email: ${formData.email}
            Phone: ${fullPhone}
            Subject: ${formData.subject}
            Message:
            ${formData.message}
          `,
        },
      });

      toast.success("Message sent successfully! 🎉");

      setFormData({
        fullName: "",
        email: "",
        contactNo: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
      <div className="max-w-md w-full rounded-xl p-8">
        <Form onSubmit={handleSubmit}>
          <h2 className="text-2xl text-green-800 font-bold mb-6 text-center">
            Contact Us
          </h2>
          <div className="mb-3">
            <Label className="block mb-2 text-green-800">Name</Label>
            <Input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="w-full"
            />
          </div>

          <div className="mb-3">
            <Label className="block mb-2 text-green-800">Email</Label>
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Your email"
              required
              className="w-full"
            />
          </div>

          <div className="mb-3">
            <Label className="block mb-2 text-green-800">Phone Number</Label>
            <div className="flex border px-3 py-2 rounded-lg">
              <select
                value={dialCode}
                onChange={(e) => setDialCode(e.target.value)}
                className="border-r pr-3 bg-white"
              >
                <option value="+234">🇳🇬 +234</option>
              </select>
              <input
                type="text"
                inputMode="numeric"
                value={formData.contactNo}
                onChange={handlePhoneChange}
                placeholder="801 234 5678"
                className="w-full px-3 outline-none"
              />
            </div>
          </div>
          <div className="mb-3">
            <Label className="block mb-2 tect-green-800">Subject</Label>
            <Input
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              required
              className="w-full"
            />
          </div>

          <div className="mb-3">
            <Label className="block mb-2 text-green-800">Message</Label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="Write Your Message..."
              required
            />
          </div>

          <Button
            text={loading ? "Sending..." : "Submit"}
            htmlType="submit"
            loading={loading}
            disabled={!isFormFilled || loading}
            width="100%"
          />
        </Form>
      </div>

      {/* <ScrollRestoration /> */}
    </div>
  );
};

export default Contact;
