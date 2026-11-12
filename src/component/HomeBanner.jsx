import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function HomeBanner() {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <section className="w-[92%] sm:w-[88%] lg:w-[80%] mx-auto mt-6 sm:mt-8">
      <div className="p-6 sm:p-10 md:p-12 lg:p-14 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.06)] bg-white flex flex-col-reverse md:flex-row items-center justify-between gap-6 sm:gap-8">
        <div className="text-center md:text-left flex-1">
          <span className="inline-block bg-green-100 text-green-700 text-xs sm:text-sm font-semibold px-3 py-1 sm:py-1.5 rounded-full">
            {date}
          </span>
          <h1 className="mt-3 sm:mt-5 text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 sm:mb-6 text-gray-900 leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed max-w-xl mx-auto md:mx-0">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম - বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন ও সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <Link href="/category-details/chal">
            <button className="btn btn-success btn-sm sm:btn-md text-white font-medium px-5 sm:px-6">
              সব পণ্য দেখুন
            </button>
          </Link>
        </div>

        <div className="shrink-0 w-44 sm:w-60 md:w-72 lg:w-96">
          <Image
            src={"/bazar-hero.png"}
            width={400}
            height={400}
            alt="Home Banner"
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
