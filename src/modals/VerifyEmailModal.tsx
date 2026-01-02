import { useState } from "react";
import { Link } from "react-router-dom";
import CheckmarkCircle from "../components/svg-icons/checkmark-circle"
import ModalBodyWrapper from "./ModalBodyWrapper";
import { resendVerificationLink } from "../lib/actions"

const VerifyEmailModal = ({ email }: { email: string | undefined }) => {
  const [status, setStatus] = useState({ message: "", success: false });

  const handleResendVerification = () => {
    resendVerificationLink(email).then((res) => {
      setStatus({ ...res });
    });
  };

  return (
    <>
      <ModalBodyWrapper>
        <p className="text-[0.625rem] font-semibold leading-9 tracking-[0.2em] text-md-gray uppercase mb-6">
          verify your email address
        </p>
        <div className="w-16 mx-auto mb-5">
          <CheckmarkCircle />
        </div>
        <h2 className="text-xl text-md-200 font-bold mb-5">
          Verify your Email Address
        </h2>
        <p className="text-sm font-normal text-md-200 mb-8">
          A verification link has been sent to your email (also check your spam
          folder). Please click the link to verify your account and continue the
          registration process.
        </p>
        <Link
          to="/"
          className="w-full bg-secondary py-4 px-6 text-white inline-block rounded-md text-base font-medium mb-5"
        >
          Back to Login
        </Link>
        {status.message.length > 0 && (
          <p
            className={`my-5 text-base font-bold ${
              status.success ? "text-secondary" : "text-red-600"
            }`}
          >
            {status.message}
          </p>
        )}
        <p className="text-sm font-normal text-md-200">
          Didn&apos;t get the link?{" "}
          <button
            className="text-secondary font-medium"
            onClick={handleResendVerification}
          >
            Resend Verification Link
          </button>
        </p>
      </ModalBodyWrapper>
    </>
  );
};

export default VerifyEmailModal;
