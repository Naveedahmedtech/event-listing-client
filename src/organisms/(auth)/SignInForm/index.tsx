import React, { useState } from "react";
import InputField from "@/atoms/form/InputField";
import Button from "@/atoms/Button";
import { AiOutlineMail, AiOutlineLock, AiOutlineWarning } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useLoginMutation } from "@/redux/api/auth";
import { useAppDispatch } from "@/hooks/redux";
import { setCredentials } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";


const SigninForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await login({ email, password, role: "USER" }).unwrap();
      dispatch(setCredentials({ user: response.data, token: response.token }));
      setError(""); // Clear any existing error messages
      router.push("/")
    } catch (err: any) {
      setError(err.data?.message || "An error occurred. Please try again.");
    }
  };

  const handleGoogleSignIn = () => {
    router.push("/api/auth/google-signin")
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative p-8 bg-surface rounded-lg shadow-xl max-w-md mx-auto space-y-6 z-10 my-10"
    >
      <h2 className="text-3xl font-extrabold text-center text-primary">
        Welcome Back
      </h2>

      {/* Error Alert */}
      {error && (
        <div className="flex items-center gap-2 p-3 mb-4 bg-error/10 border border-error rounded-lg text-error animate-pulse">
          <AiOutlineWarning size={30} />
          <span>{error}</span>
        </div>
      )}

      <InputField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        type="email"
        iconLeft={<AiOutlineMail size={20} />}
      />
      <InputField
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        type="password"
        iconLeft={<AiOutlineLock size={20} />}
        togglePassword
      />

      <div className="space-y-4">
        <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>

        <Button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center border border-border bg-surface text-text hover:bg-background"
        >
          <FcGoogle size={20} className="mr-2" />
          Sign In with Google
        </Button>
      </div>

      <div className="text-sm text-center text-textSecondary">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/registration"
          className="text-primary font-semibold hover:underline"
        >
          Sign Up
        </Link>
      </div>
    </form>
  );
};

export default SigninForm;
