"use client";

import React, { useState } from "react";
import Input from "@/components/inputs/Input";
import SubmitButton from "@/components/buttons/SubmitButton";
import { handleAuthSubmit } from "@/utils/auth/handleAuthSubmit";
import { useTranslations } from "next-intl";

const SignUp = () => {
  const t = useTranslations("Auth");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg w-full max-w-md shadow-sm dark:shadow-lg">
        <form
          className="max-w-96 flex flex-col"
          onSubmit={(e) => handleAuthSubmit(e, "signup", setErrorMessage)}
        >
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white text-center pb-6 leading-tight">
            {t("signuptitle")}
          </h2>
          <Input
            data-cy="signup-email-input"
            label={t("email")}
            type="email"
            placeholder={t("emailplaceholder")}
            name="email"
            required={true}
          />

          <Input
            data-cy={`signup-password-input`}
            label={t("password")}
            type="password"
            placeholder={t("passwordplaceholder")}
            name="password"
            required={true}
          />

          {errorMessage && (
            <div
              data-cy={`signup-error-message`}
              className="text-center text-red-500 mt-4"
            >
              <strong>{errorMessage}</strong>
            </div>
          )}
          <SubmitButton text={t("signUp")} />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
