import Image from "next/image";
import React from "react";

export default function HomeBanner() {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
  return (
    <div>
      <div className="w-[80%] mx-auto p-15 mt-8 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.1)] bg-white flex justify-between">
        <div>
          <span className="bg-green-100 text-green-500 p-2 text-center rounded-3xl">
            {date}
          </span>
          <h1 className="mt-5 text-4xl font-bold mb-10">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="text-gray-500 mb-10">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম - বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন <br /> - সর্বাধিক এবং দামের পরিবর্তন এক
            জায়গায়।
          </p>
          <button className="btn btn-success">সব পণ্য দেখুন</button>
        </div>
        <div>
          <Image src={"/bazar-hero.png"} width={400} height={400} alt="Home Banner"/>
        </div>
      </div>
    </div>
  );
}
