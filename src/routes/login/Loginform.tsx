import React, {useState} from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Label from "../../components/Label";
import Form from "../../components/Form";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import { auth, googleProvider } from "../../auth/Firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";


const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
 e.preventDefault();
    if (!e.currentTarget.checkValidity()) return;

    const form = e.currentTarget;
    const email = (form.elements.namedItem("username") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");

      setTimeout(() => navigate("/dashboard-home"), 1500);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      toast.success("Logged in with Google!");

      setTimeout(() => navigate("/dashboard-home"), 1500);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="min-h-screen flex items-center justify-center px-4 bg-green-100">
    <div className="max-w-md w-full bg-white shadow-md rounded-xl p-8">
      <Form onSubmit={handleSubmit}>

        <h2 className="text-2xl text-green-800 font-bold mb-6 text-center">Login</h2>

        <div className="mb-5">
          <Label htmlFor="username" className="block mb-2 text-green-800">
            Username
          </Label>
          <Input
            type="text"
             name="username"
            required
            placeholder="Username"
            className="w-full"
          />
        </div>

        <div className="mb-6">
          <Label htmlFor="password" className="block mb-2 text-green-800">
            Password
          </Label>
          <Input
            type="password"
             name="password" 
            required
            placeholder="***************"
            className="w-full"
          />
        </div>

        <Button
          text="Login"
          htmlType="submit"
          onClick={() => {}}
          loading={loading}
          disabled={false}
          width="100%"
        />
          <Button
            text="Login with Google"
            htmlType="button"
            onClick={handleGoogleLogin}
            loading={false}
            disabled={false}
            width="100%"
            className="mt-3 text-white"
          />
      </Form>

      {/* Bottom Links */}
      <div className="mt-6 flex flex-col items-center gap-3 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-green-800 hover:underline">
            Register
          </a>
        </p>

        <p className="text-sm text-gray-600">
          Forgot your password?{" "}
          <a href="/forgot-password" className="text-green-800 hover:underline">
            Reset it
          </a>
        </p>
      </div>

      {/* Terms */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 leading-relaxed">
          By logging in, you agree to our{" "}
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
    </div>
  </div>
);

};

export default Login;
