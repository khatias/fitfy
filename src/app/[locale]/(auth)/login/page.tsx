"use client";
import React, { useState } from "react";
import Input from "@/components/inputs/Input";
import SubmitButton from "@/components/buttons/SubmitButton";
import { handleAuthSubmit } from "@/utils/auth/handleAuthSubmit";
import { handleGithubLogin } from "@/utils/auth/handleGithubLogin";

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resetPassword, setResetPassword] = useState<boolean>(false);

  return (
    <div>
      {!resetPassword && (
        <>
          {" "}
          <form
            className="max-w-96 flex flex-col "
            onSubmit={(e) => handleAuthSubmit(e, "login", setErrorMessage)}
          >
            <Input
              data-cy="login-email-input"
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              name="email"
              required={true}
            />

            <Input
              data-cy="login-password-input"
              label="Password"
              type="password"
              placeholder="Enter your password"
              name="password"
              required={true}
            />
            {errorMessage && (
              <div
                data-cy="login-error-message"
                className="text-center text-red-500 mt-4"
              >
                <strong>{errorMessage}</strong>
              </div>
            )}
            <button onClick={() => setResetPassword(!resetPassword)}>
              resset my password{" "}
            </button>
            <SubmitButton text="Log In" />

            <button onClick={handleGithubLogin}>sing in with github</button>
          </form>
        </>
      )}
      {resetPassword && (
        <div>
          <form action="">
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              name="email"
              required={true}
            />
            <button>send email</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
