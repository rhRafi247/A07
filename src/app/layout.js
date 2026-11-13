import { Suspense } from "react";
import { Geist, Geist_Mono, Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Header from "@/component/Header";
import Marquee from "@/component/Marquee";
import Footer from "@/component/Footer";
import ToastProvider from "@/component/ToastProvider";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["bengali", "latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "বাজার দর - নিত্যপণ্যের বাজারদর",
  description: "নিত্যপ্রয়োজনীয় পণ্যের বাজারদর, দামের পরিবর্তন ও তুলনামূলক চিত্র",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${notoSerifBengali.className} ${geistMono.variable} ${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <ToastProvider />
        <Suspense fallback={<div className="h-20" />}>
          <Header />
        </Suspense>
        <Suspense fallback={<div className="h-10" />}>
          <Marquee />
        </Suspense>
        <div className="bg-[#F0F5F0] flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
