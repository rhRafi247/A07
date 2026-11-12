"use client";
import React, { useState } from "react";
import ProductCard from "./ProductCard";

export default function CategoryFilterSection({ items = [], categoryInfo }) {
  const [sortBy, setSortBy] = useState("default");

  if (!items || items.length === 0) {
    return (
      <div className="mt-10 p-8 rounded-2xl bg-white border border-[#E5EAE5] text-center text-gray-500">
        এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
      </div>
    );
  }

  const sortedItems = [...items].sort((a, b) => {
    const priceA = Number(a.today) || 0;
    const priceB = Number(b.today) || 0;

    if (sortBy === "low-to-high") {
      return priceA - priceB;
    }
    if (sortBy === "high-to-low") {
      return priceB - priceA;
    }
    return 0; // "default": original order
  });

  const countBangla = Number(items.length).toLocaleString("bn-BD");

  return (
    <>
      {/* Category Info Header */}
      <div className="flex items-center gap-5 mt-10 rounded-2xl border border-[#E5EAE5] shadow-[0_0_15px_rgba(0,0,0,0.05)] bg-white p-5">
        <span className="bg-gray-100 w-14 h-14 flex justify-center items-center text-3xl rounded-2xl shrink-0">
          {categoryInfo?.image || categoryInfo?.categoryIcon || "🛒"}
        </span>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#181C1F]">
            {categoryInfo?.categoryNameBn || "ক্যাটাগরি"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {`${countBangla}টি পণ্যের আজকের দাম ও পরিবর্তন`}
          </p>
        </div>
      </div>

      {/* Filter Section Card */}
      <div className="mt-6 rounded-2xl border border-[#E5EAE5] shadow-[0_0_15px_rgba(0,0,0,0.05)] bg-white p-4 sm:p-5 flex justify-end items-center gap-3">
        <label
          htmlFor="category-sort-select"
          className="text-sm text-gray-500 font-medium"
        >
          সাজান
        </label>
        <div className="relative">
          <select
            id="category-sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none bg-white border border-gray-200 text-gray-700 text-sm rounded-xl pl-3.5 pr-8 py-2 focus:outline-none focus:border-green-600 cursor-pointer shadow-2xs font-medium"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-to-high">দাম: কম থেকে বেশি</option>
            <option value="high-to-low">দাম: বেশি থেকে কম</option>
          </select>
          <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </div>
      </div>

      {/* Total Products Count */}
      <div className="mt-6 mb-2">
        <p className="text-gray-500 text-sm">
          {`মোট ${Number(sortedItems.length).toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে`}
        </p>
      </div>

      {/* Products Grid */}
      <div>
        <ProductCard items={sortedItems} />
      </div>
    </>
  );
}

