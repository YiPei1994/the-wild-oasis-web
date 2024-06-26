import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "@/styles/globals.css";

import Header from "@/components/Header";

const josefin = Josefin_Sans({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: {
    template: "%s : The Wild Oasis",
    default: "Welcome : The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian surrounded by beautiful mountains and dark forests.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} antialiased min-h-screen bg-primary-950 text-primary-100 flex flex-col relative`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
