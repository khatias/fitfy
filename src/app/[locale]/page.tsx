import { useTranslations } from "next-intl";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import LanguageSwitcher from "@/components/LanguageSwitcher";
export default function HomePage() {
  const t = useTranslations("HomePage");
  return (
    <div>
      <h1>{t("title")}</h1>
      <ThemeSwitcher />
      <LanguageSwitcher />
    </div>
  );
}
