"use client";

import React, { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import Input from "@/components/inputs/Input";
import SubmitButton from "@/components/buttons/SubmitButton";
import { handleAuthSubmit } from "@/utils/auth/handleAuthSubmit";
import { handleGithubLogin } from "@/utils/auth/handleGithubLogin";
import { sendResetPassword } from "@/utils/auth/sendResetPassword";
import ResetPasswordModal from "@/components/modals/RessetPasswordModal";
import { handleGoogleLogin } from "@/utils/auth/handleGoogleLogin";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const LoginPage = () => {
  const t = useTranslations("Auth");
  const [isResetView, setIsResetView] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg w-full max-w-md shadow-sm dark:shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <h2 className="text-xl font-extrabold text-gray-800 dark:text-white text-center pb-2 leading-tight">
              {isResetView ? t("ressetPasswordTItile") : t("loginTitle")}
            </h2>

            <p className="text-gray-500 dark:text-gray-300 text-center text-sm">
            {isResetView ? t("forgotPasswordText") : t("continue")}
            </p>
          </div>
          <Input
            label={t("email")}
            type="email"
            placeholder={t("emailplaceholder")}
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {!isResetView && (
            <>
              <Input
                label={t("password")}
                type="password"
                placeholder={t("passwordplaceholder")}
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errorMessage && (
                <div className="text-center text-red-500 mt-2">
                  {errorMessage}
                </div>
              )}
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setIsResetView(true)}
                  className="text-sm text-gray-600 hover:underline dark:text-gray-300"
                >
                  {t("forgorPassword")}
                </button>
                <Link
                  href="/signup"
                  className="text-sm text-gray-600 hover:underline dark:text-gray-300"
                >
                  {t("signUp")}
                </Link>
              </div>
              <SubmitButton text={t("login")} />
              <div className="mt-4 flex flex-col space-y-2">
                <button
                  type="button"
                  onClick={handleGithubLogin}
                  className="w-full px-4 py-2 text-center text-gray-800 bg-white border border-gray-300 rounded hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600 flex items-center justify-center gap-2"
                >
                  <FaGithub />
                  GitHub
                </button>
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full px-4 py-2 text-center text-gray-800 bg-white border border-gray-300 rounded hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600 flex items-center justify-center gap-2"
                >
                  <FaGoogle className="text-red-500" />
                  Google
                </button>
              </div>
            </>
          )}
          {isResetView && (
            <>
              <SubmitButton text="Send Email" />
              <button
                type="button"
                onClick={() => setIsResetView(false)}
                className="mt-4 text-gray-600 hover:underline dark:text-gray-300 text-center"
              >
             {t("backtologin")} 
              </button>
            </>
          )}
        </form>
      </div>

      <ResetPasswordModal
        email={email}
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </div>
  );
};

export default LoginPage;
