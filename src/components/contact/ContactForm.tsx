'use client';

import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { sendEmail } from '@/utils/contact/send-email';
import { useTranslations } from 'next-intl';

export type FormData = {
  name: string;
  email: string;
  message: string;
};

const ContactForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    sendEmail(data);
  };

  const t = useTranslations("Contact");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-full min-w-80 px-8 py-6 bg-white lg:min-w-[500px] dark:bg-gray-800 rounded-lg"
    >
      <div className="mb-6">
        <label
          htmlFor="name"
          className="block text-base font-medium text-gray-900 dark:text-gray-200"
        >
          {t("fullname")}
        </label>
        <input
          type="text"
          placeholder={t("fullname")}
          className={`mt-1 w-full rounded-md border py-3 px-4 text-base font-medium text-gray-700 dark:text-gray-300 outline-none focus:ring-1 focus:ring-red-500 ${
            errors.name
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-600"
          }`}
          {...register("name", {
            required: t("required.name"),
          })}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="email"
          className="block text-base font-medium text-gray-900 dark:text-gray-200"
        >
          {t("email")}
        </label>
        <input
          type="email"
          placeholder="example@domain.com"
          className={`mt-1 w-full rounded-md border py-3 px-4 text-base font-medium text-gray-700 dark:text-gray-300 outline-none focus:ring-1 focus:ring-red-500 ${
            errors.email
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-600"
          }`}
          {...register("email", {
            required: t("required.email"),
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
              message: t("invalidEmail"),
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="message"
          className="block text-base font-medium text-gray-900 dark:text-gray-200"
        >
          {t("message")}
        </label>
        <textarea
          rows={4}
          placeholder={t("messageplaceholder")}
          className={`mt-1 w-full resize-none rounded-md border py-3 px-4 text-base font-medium text-gray-700 dark:text-gray-300 outline-none focus:ring-1 focus:ring-red-500 ${
            errors.message
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-600"
          }`}
          {...register("message", {
            required: t("required.message"),
          })}
        ></textarea>
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      <div>
        <button className="w-full hover:bg-red-600 dark:hover:bg-red-700 rounded-md bg-red-500 py-3 px-6 text-base font-semibold text-white outline-none transition duration-300 ease-in-out">
          {t("submit")}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
