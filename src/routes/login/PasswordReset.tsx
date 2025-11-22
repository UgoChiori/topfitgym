import React from "react";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
// import Form from "../../components/Form";
import Label from "../../components/Label";
import Input from "../../components/Input";
import Button from "../../components/Button";

const PasswordReset: React.FC = () => {
  const schema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Required"),
  });

    // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    // alert("password reset successfully")
    // }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
          Reset Password
        </h2>
<Formik
  initialValues={{ password: "", confirmPassword: "" }}
  validationSchema={schema}
  onSubmit={(values) => {
    console.log(values); 
    alert("Password reset successful")
  }}
//   onSubmit={(values) => alert("Password reset successfully")}
>
  {({ errors, touched, handleChange }) => (
    <FormikForm className="space-y-4">
      <div>
        <Label htmlFor="password">New Password</Label>
        <Input
          name="password"
          type="password"
          placeholder="Enter new password"
          onChange={handleChange}
          className="mt-1 w-full"
        />
        {errors.password && touched.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
        )}
      </div>

      <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
          onChange={handleChange}
          className="mt-1 w-full"
        />
        {errors.confirmPassword && touched.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">
            {errors.confirmPassword}
          </p>
        )}
      </div>

      <Button
        text="Reset Password"
        htmlType="submit"
        className="w-full"
      />
    </FormikForm>
  )}
</Formik>

        {/* <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={schema}
          onSubmit={(values) => console.log(values)}
        >
          {({ errors, touched, handleChange }) => (
            <Form onSubmit={handleSubmit}>
              <FormikForm>
                <div className="mb-4">
                  <Label htmlFor="New Password" />
                  <Input
                    name="password"
                    type="password"
                    placeholder="Enter new password"
                    onChange={handleChange}
                    className="mt-1 w-full"
                  />
                  {errors.password && touched.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                  )}
                </div>

                <div className="mb-4">
                  <Label htmlFor="Confirm Password" />
                  <Input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    onChange={handleChange}
                    className="mt-1 w-full"
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <Button className="w-full mt-4">Reset Password</Button>
              </FormikForm>
            </Form>
          )}
        </Formik> */}
      </div>
    </div>
  );
};

export default PasswordReset;
