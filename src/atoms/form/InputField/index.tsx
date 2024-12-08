import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: "text" | "email" | "password";
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  togglePassword?: boolean;
  errorMessage?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  iconLeft,
  iconRight,
  togglePassword = false,
  errorMessage,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = togglePassword && type === "password"
    ? showPassword
      ? "text"
      : "password"
    : type;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col">
      {label && <label className="text-sm text-textSecondary mb-1">{label}</label>}
      <div className="relative flex items-center">
        {/* Left Icon */}
        {iconLeft && <span className="absolute left-3 text-gray-400">{iconLeft}</span>}
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full p-2 pr-10 ${
            iconLeft ? "pl-10" : "pl-3"
          } border border-border rounded-lg bg-surface focus:ring-primary focus:border-primary text-text`}
        />
        {/* Right Icon or Toggle Password */}
        {togglePassword ? (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 text-gray-400"
          >
            {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
          </button>
        ) : (
          iconRight && <span className="absolute right-3 text-gray-400">{iconRight}</span>
        )}
      </div>
      {errorMessage && <p className="text-sm text-error mt-1">{errorMessage}</p>}
    </div>
  );
};

export default InputField;
