import React from "react";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import Form from "../../components/Form";
import Label from "../../components/Label";
import Input from "../../components/Input";
import Button from "../../components/Button";

const ForgotPassword: React.FC = () => {
  const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("reset password link sent to email");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
          Forgot Password
        </h2>

        <Formik
          initialValues={{ email: "" }}
          validationSchema={schema}
          onSubmit={(values) => console.log(values)}
        >
          {({ errors, touched, handleChange }) => (
            <Form onSubmit={handleSubmit}>
              <FormikForm>
                <div className="mb-4">
                  <Label htmlFor="Email Address" />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    className="mt-1 w-full"
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <Button className="w-full mt-4">Send Reset Link</Button>
              </FormikForm>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPassword;
