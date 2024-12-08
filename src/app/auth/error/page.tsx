"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { AiOutlineWarning } from "react-icons/ai";

const ErrorPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");

  const errorMessages: Record<string, string> = {
    access_denied: "You have denied access. Please try again.",
    invalid_token: "Invalid token received. Please log in again.",
    missing_role: "Default role is missing. Contact support.",
    server_error: "An unexpected error occurred. Please try again later.",
  };

  const errorMessage =
    reason && typeof reason === "string"
      ? errorMessages[reason] || "An unknown error occurred."
      : "An unknown error occurred.";

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-surface flex flex-col items-center justify-center px-6">
      <div className="bg-surface shadow-lg rounded-lg p-8 max-w-lg text-center">
        {/* Icon Section */}
        <div className="flex justify-center items-center mb-4">
          <AiOutlineWarning className="text-error" size={60} />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-error mb-4">
          Oops! Something went wrong
        </h1>

        {/* Error Message */}
        <p className="text-textSecondary text-lg mb-6">{errorMessage}</p>

        {/* Call to Actions */}
        <div className="space-y-4">
          <button
            onClick={() => router.push("/auth/signin")}
            className="w-full bg-primary hover:bg-primaryHover text-text font-semibold py-3 px-6 rounded-md transition duration-300"
          >
            Go Back to Sign In
          </button>
          <a
            href="mailto:support@yourapp.com"
            className="w-full inline-block text-secondary font-medium underline hover:text-secondaryHover transition duration-300"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
