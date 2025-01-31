import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Montserrat, Noto_Sans_Georgian } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Header from "@/components/Header/Header";
import Banner from "@/components/Header/Banner";
import "../globals.css";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}
const notoSansGeorgian = Noto_Sans_Georgian({
  variable: "--font-noto-sans-georgian",
  subsets: ["georgian"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await Promise.resolve(params);

  if (!routing.locales.includes(locale as "en" | "ka")) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body
        className={`${notoSansGeorgian.variable} ${montserrat.variable} antialiased bg-white dark:bg-black text-black dark:text-white transition-colors duration-200 ease-in`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider defaultTheme="system" enableSystem attribute="class">
            <Banner/>
            <Header/>
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
