// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Fitify App",
  description:
    "Fitify is an online store offering a wide range of stylish clothing. Shop the latest trends and find your perfect fit!",
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return children;
}
