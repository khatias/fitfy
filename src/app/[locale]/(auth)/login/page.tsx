"use client";

import React, { useState } from "react";
import Input from "@/components/inputs/Input";
import SubmitButton from "@/components/buttons/SubmitButton";
import { handleAuthSubmit } from "@/utils/auth/handleAuthSubmit";
import { handleGithubLogin } from "@/utils/auth/handleGithubLogin";
import { sendResetPassword } from "@/utils/auth/sendResetPassword";
import RessetPasswordModal from "@/components/modals/RessetPasswordModal";

const LoginPage = () => {
  const [isResetView, setIsResetView] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isResetView) {
      await sendResetPassword(email);
      setIsSuccessModalOpen(true);
    } else {
      handleAuthSubmit(e, "login", setErrorMessage);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-96 flex flex-col">
        <div>
          <h2 className="text-2xl mb-4 font-semibold text-center">
            {isResetView ? "Reset your Password" : "Log In"}
          </h2>
          <p className="text-gray-400 text-center text-md pb-4 px-8">
            {isResetView
              ? "We will send you an email to reset your password."
              : "Welcome back! Please enter your credentials to continue."}
          </p>
        </div>
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {!isResetView && (
          <>
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              name="password"
              required
            />
            {errorMessage && (
              <div className="text-center text-red-500 mt-4">
                <strong>{errorMessage}</strong>
              </div>
            )}
            <SubmitButton text="Log In" />
            <button
              type="button"
              onClick={handleGithubLogin}
              className="mt-4 text-blue-500 hover:underline"
            >
              Sign in with GitHub
            </button>
            <button
              type="button"
              onClick={() => setIsResetView(true)}
              className="mt-4 text-gray-500 hover:underline"
            >
              Forgot Password?
            </button>
          </>
        )}
        {isResetView && (
          <>
            <SubmitButton text="Send Email" />
            <button
              type="button"
              onClick={() => setIsResetView(false)}
              className="mt-4 text-gray-500 hover:underline"
            >
              Back to Login
            </button>
          </>
        )}
      </form>

      <RessetPasswordModal
        email={email}
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </>
  );
};

export default LoginPage;
