'use client'
import { useTranslations } from "next-intl";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import LanguageSwitcher from "@/components/LanguageSwitcher";

import { handleLogout } from "@/utils/auth/handleLogout";
export default function HomePage() {
  const t = useTranslations("HomePage");
  return (
    <div>
      <h1>{t("title")}</h1>
      <ThemeSwitcher />
      <LanguageSwitcher />
      <button onClick={handleLogout} >logout</button>
    </div>
  );
}
