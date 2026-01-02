export async function resendVerificationLink(email: string | undefined) {
  console.log("Resend verification link called with email:", email);

  try {
    // Dummy delay to mimic an async request
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Dummy success log
    console.log("Dummy: Verification link 'sent' successfully.");

    return {
      message: "We have sent the verification link to your email again",
      success: true,
    };
  } catch (error) {
    console.log("Dummy error:", error);

    return {
      message: "Something went wrong (dummy).",
      success: false,
    };
  }
}
