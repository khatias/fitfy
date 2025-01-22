"use client";

import React from "react";
import Input from "@/components/inputs/Input";
import SubmitButton from "@/components/buttons/SubmitButton";

import { useState } from "react";
const Page = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const response = await fetch(`api/auth/signup`, {
      method: "POST",
      body: new URLSearchParams({
        email,
        password,
      }),
    });

    if (!response.ok) {
      const result = await response.json();
      console.log(result);
      setErrorMessage(result.error);
    } else {
      window.location.href = `/`;
    }
  };

  return (
    <div>
      <form className="max-w-96 flex flex-col " onSubmit={handleSubmit}>
        <Input
          data-cy="signup-email-input"
          label="Email Address"
          type="email"
          placeholder="Enter your name"
          name="email"
          required={true}
        />

        <Input
          data-cy="signup-password-input"
          label=" Password"
          type="password"
          placeholder="Enter your name"
          name="password"
          required={true}
        />
        {errorMessage && (
          <div
            data-cy="signup-error-message"
            className="text-center text-red-500 mt-4"
          >
            <strong>{errorMessage}</strong>
          </div>
        )}
        <SubmitButton text="Sign Up" />
      </form>
    </div>
  );
};
export default Page;
