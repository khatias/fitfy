"use client";

import React, { useState } from "react";
import Input from "@/components/inputs/Input";
import { handleConfirmPassword } from "@/utils/auth/handleConfirmPassword";
import SubmitButton from "@/components/buttons/SubmitButton";
import SuccessPasswordChangeModal from "@/components/modals/SuccessPasswordChangeModal";

const ResetPasswordPage: React.FC = () => {
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const error = await handleConfirmPassword({ password: data.password });

    if (error) {
      setError(error);
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <form
        className="max-w-96 flex flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl mb-4 font-semibold">Change your password</h2>
        <p className="text-gray-400 text-center text-md pb-4">
          Enter a new password below to change your password
        </p>
        <Input
          label="New Password"
          type="password"
          placeholder="Enter your password"
          name="password"
          required
          value={data.password}
          onChange={handleChange}
        />

        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          name="confirmPassword"
          required
          value={data.confirmPassword}
          onChange={handleChange}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="w-full">
          <SubmitButton text="Change Password" />
        </div>
      </form>

      <SuccessPasswordChangeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ResetPasswordPage;
