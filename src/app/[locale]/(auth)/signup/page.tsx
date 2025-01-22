"use client"; // Required for React state management in Next.js

import React from "react";
import Input from "@/components/inputs/Input";
import SubmitButton from "@/components/buttons/SubmitButton";
const Page = () => {
  //   const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // const formData = new FormData(e.target as HTMLFormElement);
    // const email = formData.get("email") as string;
    // const password = formData.get("password") as string;
  };

  return (
    <div >
      <form className="max-w-96 flex flex-col gap-4" onSubmit={handleSubmit}>
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
          type="email"
          placeholder="Enter your name"
          name="password"
          required={true}
        />
        <SubmitButton text="Sign Up" />
      </form>
    </div>
  );
};

export default Page;
