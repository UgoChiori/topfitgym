import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Label from "../../components/Label";
import Form from "../../components/Form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, googleProvider } from "../../auth/Firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../auth/Firebase";

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) return;

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement)
      .value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      console.log("User UID:", user.uid);

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      console.log("Doc exists?", docSnap.exists());

      const firstName = docSnap.exists() ? docSnap.data().firstName : "";

      toast.success(`${getGreeting()}, ${firstName}!`);

      setTimeout(() => navigate("/dashboard-home"), 1500);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("LOGIN ERROR:", err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;

      // fetch extra info from Firestore
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      const firstName = docSnap.exists() ? docSnap.data().firstName : "";

      toast.success(`${getGreeting()}, ${firstName || "User"}!`);

      setTimeout(() => navigate("/dashboard-home"), 1500);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-xl p-8">
        <Form onSubmit={handleSubmit}>
          <h2 className="text-2xl text-green-800 font-bold mb-6 text-center">
            Login
          </h2>

          <div className="mb-5">
            <Label htmlFor="email" className="block mb-2 text-green-800">
             Email
            </Label>
            <Input
              name="email"
              required
              placeholder="Email Address"
              className="w-full"
            />
          </div>
          <div className="mb-6">
            <Label htmlFor="password" className="block mb-2 text-green-800">
              Password
            </Label>

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="***************"
                className="w-full pr-10"
              />

              {/* Eye Icon */}
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  // Eye Off Icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223a10.477 10.477 0 00-.712 3.777c0 1.34.243 2.622.712 3.777m16.04-7.554a10.45 10.45 0 01.712 3.777c0 
            1.34-.243 2.622-.712 3.777M6.343 6.343a10.451 
            10.451 0 0111.314 0M9.879 9.879a3 3 0 
            104.242 4.242M3 3l18 18"
                    />
                  </svg>
                ) : (
                  // Eye On Icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 
            5c4.478 0 8.268 2.943 9.542 7-1.274 
            4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </span>
            </div>
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
            <a
              href="/forgot-password"
              className="text-green-800 hover:underline"
            >
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
