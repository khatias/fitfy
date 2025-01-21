// app/layout.tsx
import type { Metadata } from "next";
import { Montserrat, Noto_Sans_Georgian } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const notoSansGeorgian = Noto_Sans_Georgian({
  variable: "--font-noto-sans-georgian",
  subsets: ["georgian"],
});
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fitify App",
  description:
    "Fitify is an online store offering a wide range of stylish clothing. Shop the latest trends and find your perfect fit!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={` ${montserrat.variable} ${notoSansGeorgian.variable} antialiased bg-white dark:bg-black text-black dark:text-white transition-colors duration-200 ease-in`}
      >
        <ThemeProvider defaultTheme="system" enableSystem attribute="class">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
