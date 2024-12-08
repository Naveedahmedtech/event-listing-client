import React, { useState } from "react";
import InputField from "@/atoms/form/InputField";
import Button from "@/atoms/Button";
import { AiOutlineMail, AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import Link from "next/link";
import { useRegisterMutation } from "@/redux/api/auth";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/redux";
import { setCredentials } from "@/redux/slices/authSlice";

const RegistrationForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const router = useRouter();
  const dispatch = useAppDispatch()
  // Use the mutation hook from RTK Query
  const [register, { isLoading }] = useRegisterMutation();

  const validatePassword = (password: string): string | null => {
    const minLength = 8;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return "Password must be at least 8 characters long.";
    }
    if (!hasNumber) {
      return "Password must contain at least one number.";
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const role = "USER"; // Default role set to 'USER'

    if (!email || !password || !confirmPassword || !fullName) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    try {
      const response = await register({ email, password, fullName, role, confirmPassword }).unwrap();
      dispatch(setCredentials({ user: response.data, token: response.token }));
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setFullName("");
      router.push("/profile-setup");
    } catch (err: any) {
      setError(err?.data?.message || "An unexpected error occurred.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative p-8 bg-surface rounded-lg shadow-xl max-w-md mx-auto space-y-6 z-10 my-10"
    >
      <h2 className="text-3xl font-extrabold text-center text-primary">
        Create an Account
      </h2>

      {/* Error or Success Messages */}
      {error && <p className="text-sm text-error text-center">{error}</p>}
      {success && <p className="text-sm text-success text-center">{success}</p>}

      {/* Input Fields */}
      <InputField
        label="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Enter your full name"
        type="text"
        iconLeft={<AiOutlineUser size={20} />}
      />
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
      <InputField
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm your password"
        type="password"
        iconLeft={<AiOutlineLock size={20} />}
        togglePassword
      />

      {/* Submit Button */}
      <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
        {isLoading ? "Registering..." : "Register"}
      </Button>

      {/* Redirect to Sign In */}
      <div className="text-sm text-center text-textSecondary">
        Already have an account?{" "}
        <Link href="/auth/signin" className="text-primary font-semibold hover:underline">
          Sign In
        </Link>
      </div>
    </form>
  );
};

export default RegistrationForm;
