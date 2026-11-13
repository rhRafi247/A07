import React from "react";
import Link from "next/link";
import Image from "next/image";

const unitBangla = {
  kg: "কেজি",
  liter: "লিটার",
  litre: "লিটার",
  piece: "পিস",
  pcs: "পিস",
  dozen: "ডজন",
  hali: "হালি",
  gm: "গ্রাম",
};

export const instant = false;

export default async function SingleId({ params }) {
  const { singleId } = await params;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products/${singleId}`,
    { cache: "no-store" },
  );
  const rawData = await res.json();
  const product = rawData?.data || rawData;

  if (!product || !product.nameBn) {
    return (
      <div className="w-[92%] sm:w-[88%] lg:w-[80%] mx-auto py-16 text-center text-gray-500">
        পণ্যটি খুঁজে পাওয়া যায়নি।
      </div>
    );
  }

  const {
    nameBn,
    category,
    categoryNameBn,
    unit,
    image,
    today,
    yesterday,
    change,
    markets = [],
  } = product;

  const unitText = unitBangla[unit?.toLowerCase()] || unit;

  const priceDiff = today - yesterday;
  const isUp = change?.dir === "up" || priceDiff > 0;
  const isDown = change?.dir === "down" || priceDiff < 0;

  const minPrice =
    markets.length > 0 ? Math.min(...markets.map((m) => m.min)) : today;
  const maxPrice =
    markets.length > 0 ? Math.max(...markets.map((m) => m.max)) : today;
  const avgPrice =
    markets.length > 0
      ? Math.round(
          markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) /
            markets.length,
        )
      : today;

  const sortedMarkets = [...markets].sort(
    (a, b) => (a.min + a.max) / 2 - (b.min + b.max) / 2,
  );

  const toBn = (num) => Number(num).toLocaleString("bn-BD");

  return (
    <div className="w-[92%] sm:w-[88%] lg:w-[80%] mx-auto py-4 sm:py-6 space-y-4 sm:space-y-6">
      <nav className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-900 transition-colors">
          হোম
        </Link>
        <span>›</span>
        <Link
          href={`/category-details/${category}`}
          className="hover:text-gray-900 transition-colors"
        >
          {categoryNameBn}
        </Link>
        <span>›</span>
        <span className="text-gray-800 font-medium truncate max-w-[200px] sm:max-w-none">
          {nameBn}
        </span>
      </nav>

      <div className="bg-white border border-gray-200/80 rounded-2xl p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#f3f4f2] flex items-center justify-center text-3xl sm:text-4xl shrink-0">
            {image?.startsWith("http") ? (
              <Image
                src={image}
                alt={nameBn}
                width={48}
                height={48}
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                unoptimized
              />
            ) : (
              <span>{image}</span>
            )}
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">
              {nameBn}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
              প্রতি {unitText} · {categoryNameBn}
            </p>
            <p className="text-xs sm:text-sm text-gray-700 mt-1">
              গতকালের তুলনায় আজ দাম{" "}
              <strong className="font-bold">
                {priceDiff > 0
                  ? "বেড়েছে"
                  : priceDiff < 0
                    ? "কমেছে"
                    : "অপরিবর্তিত"}
              </strong>{" "}
              {priceDiff !== 0 && `· ${toBn(Math.abs(priceDiff))} টাকা`}
            </p>
          </div>
        </div>

        <div className="bg-[#f7f8f6] border border-gray-200/70 rounded-2xl px-5 py-3.5 sm:px-6 sm:py-4 text-center sm:min-w-[140px] self-stretch sm:self-auto flex sm:flex-col justify-between sm:justify-center items-center">
          <div>
            <p className="text-[11px] sm:text-xs text-gray-500">আজকের দাম</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-0.5 leading-tight">
              {toBn(today)}
            </p>
            <p className="text-[11px] sm:text-xs text-gray-600 mt-0.5">
              টাকা / {unitText}
            </p>
          </div>

          {change && (
            <div
              className={`inline-flex items-center gap-1 text-xs font-bold sm:mt-1.5 ${
                isUp
                  ? "text-[#c93b3b]"
                  : isDown
                    ? "text-[#16a34a]"
                    : "text-gray-600"
              }`}
            >
              <span className="text-[9px]">
                {isUp ? "▲" : isDown ? "▼" : "•"}
              </span>
              <span>{toBn(Math.abs(change.pct))}%</span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border border-gray-200/80 rounded-2xl p-4 sm:p-6 shadow-xs space-y-6 sm:space-y-8">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="border border-gray-200/80 rounded-xl p-3.5 sm:p-4 bg-[#fcfdfc]">
              <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
              <p className="mt-1">
                <span className="text-xl sm:text-2xl font-extrabold text-[#16a34a]">
                  {toBn(minPrice)}
                </span>{" "}
                <span className="text-xs sm:text-sm font-semibold text-[#16a34a]">
                  টাকা
                </span>
              </p>
              <p className="text-[11px] sm:text-xs text-gray-500 mt-1">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            <div className="border border-gray-200/80 rounded-xl p-3.5 sm:p-4 bg-[#fcfdfc]">
              <p className="text-xs text-gray-500">সর্বাধিক দাম</p>
              <p className="mt-1">
                <span className="text-xl sm:text-2xl font-extrabold text-[#dc2626]">
                  {toBn(maxPrice)}
                </span>{" "}
                <span className="text-xs sm:text-sm font-semibold text-[#dc2626]">
                  টাকা
                </span>
              </p>
              <p className="text-[11px] sm:text-xs text-gray-500 mt-1">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            <div className="border border-gray-200/80 rounded-xl p-3.5 sm:p-4 bg-[#fcfdfc]">
              <p className="text-xs text-gray-500">গড় দাম</p>
              <p className="mt-1">
                <span className="text-xl sm:text-2xl font-extrabold text-[#16a34a]">
                  {toBn(avgPrice)}
                </span>{" "}
                <span className="text-xs sm:text-sm font-semibold text-[#16a34a]">
                  টাকা
                </span>
              </p>
              <p className="text-[11px] sm:text-xs text-gray-500 mt-1">
                প্রতি {unitText}-এর হিসাবে
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto border border-gray-200/80 rounded-xl">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-[#f4f5f3] text-gray-600 text-xs font-semibold border-b border-gray-200">
                  <th className="py-3 px-3.5 sm:py-3.5 sm:px-4">বাজার</th>
                  <th className="py-3 px-3.5 sm:py-3.5 sm:px-4">বিভাগ</th>
                  <th className="py-3 px-3.5 sm:py-3.5 sm:px-4 text-center">
                    সর্বনিম্ন
                  </th>
                  <th className="py-3 px-3.5 sm:py-3.5 sm:px-4 text-center">
                    সর্বাধিক
                  </th>
                  <th className="py-3 px-3.5 sm:py-3.5 sm:px-4 text-right">
                    গড়
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-xs sm:text-sm">
                {sortedMarkets.map((item, idx) => {
                  const rowAvg = (item.min + item.max) / 2;
                  return (
                    <tr
                      key={idx}
                      className="hover:bg-gray-50/80 transition-colors"
                    >
                      <td className="py-3 px-3.5 sm:py-3.5 sm:px-4 font-semibold text-gray-900">
                        {item.market}
                      </td>
                      <td className="py-3 px-3.5 sm:py-3.5 sm:px-4 text-gray-600">
                        {item.division}
                      </td>
                      <td className="py-3 px-3.5 sm:py-3.5 sm:px-4 text-center text-gray-700">
                        {toBn(item.min)} টাকা
                      </td>
                      <td className="py-3 px-3.5 sm:py-3.5 sm:px-4 text-center text-gray-700">
                        {toBn(item.max)} টাকা
                      </td>
                      <td className="py-3 px-3.5 sm:py-3.5 sm:px-4 text-right font-bold text-gray-900">
                        {rowAvg.toLocaleString("bn-BD", {
                          maximumFractionDigits: 2,
                        })}{" "}
                        টাকা
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
