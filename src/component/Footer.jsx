import React from "react";

export default function Footer() {
  return (
    <footer className="rounded-t-2xl shadow-[0_0_15px_rgba(0,0,0,0.06)] bg-white py-6 sm:py-8 mt-16 sm:mt-24 border-t border-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-2 sm:gap-4 w-[92%] sm:w-[88%] lg:w-[80%] mx-auto text-xs sm:text-sm text-gray-700">
        <p className="font-semibold">
          বাজার দর - প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>
        <p className="text-gray-500 font-medium">
          সকল দাম সম্ভাব্য অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}
