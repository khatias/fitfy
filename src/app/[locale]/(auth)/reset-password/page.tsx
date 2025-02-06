"use client";

import React, { useState } from "react";
import Input from "@/components/inputs/Input";
import { handleConfirmPassword } from "@/utils/auth/handleConfirmPassword";
import SubmitButton from "@/components/buttons/SubmitButton";
import SuccessPasswordChangeModal from "@/components/modals/SuccessPasswordChangeModal";
import { useTranslations } from "next-intl";

const ResetPasswordPage: React.FC = () => {
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });
  const t = useTranslations("Auth");

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
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg w-full max-w-md shadow-sm dark:shadow-lg">
        <form
          className="max-w-96 flex flex-col items-center justify-center"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl mb-4 font-semibold">{t("changePassword")}</h2>
          <p className="text-gray-400 text-center text-md pb-4">
          {t("changePsswordText")}
          </p>
          <Input
           label={t("newPassword")}
            type="password"
            placeholder={t("passwordplaceholder")}
            name="password"
            required
            value={data.password}
            onChange={handleChange}
          />

          <Input
           label={t("confirmPassword")}
            type="password"
            placeholder={t("confirmPassword")}
            name="confirmPassword"
            required
            value={data.confirmPassword}
            onChange={handleChange}
          />

          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="w-full">
            <SubmitButton text={t("changePassword")} />
          </div>
        </form>
      </div>
      <SuccessPasswordChangeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ResetPasswordPage;
