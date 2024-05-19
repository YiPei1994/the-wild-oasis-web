import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

import Logo from "@/components/Logo";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen bg-primary-950 text-primary-100`}
      >
        <header className="w-full flex justify-between items-center py-4 px-10">
          <Logo />
          <Navigation />
        </header>

        <main>{children}</main>
        <footer></footer>
      </body>
    </html>
  );
}
