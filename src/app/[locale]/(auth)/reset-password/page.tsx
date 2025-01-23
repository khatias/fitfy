"use client";

import React, { useState } from "react";
import Input from "@/components/inputs/Input";
import { handleConfirmPassword } from "@/utils/auth/handleConfirmPassword";

const ResetPasswordPage: React.FC = () => {
  const [data, setData] = useState<{
    password: string;
    confirmPassword: string;
  }>({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError(null); // Reset error on input change
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await handleConfirmPassword({ password: data.password });
      setError(null);
      console.log("Password updated successfully");
    } catch (err) {
      setError("An error occurred while resetting the password.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder="Enter your password"
        name="password"
        required
        value={data.password}
        onChange={handleChange}
      />

      <Input
        label="Confirm Password"
        type={showPassword ? "text" : "password"}
        placeholder="Confirm your password"
        name="confirmPassword"
        required
        value={data.confirmPassword}
        onChange={handleChange}
      />

      <button type="button" onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? "Hide" : "Show"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">Reset Password</button>
    </form>
  );
};

export default ResetPasswordPage;
