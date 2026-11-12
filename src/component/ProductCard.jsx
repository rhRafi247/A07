import Link from "next/link";
import React from "react";

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

function ProductCard({ items }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-4 sm:mt-6">
      {items.map((i) => {
        const isUp = i.change?.dir === "up";
        const isDown = i.change?.dir === "down";

        return (
          <Link key={i.id} href={`/product-details/${i.id}`}>
            <div className="p-4 sm:p-5 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.06)] border border-[#E5EAE5] bg-white flex flex-col justify-between h-full transition hover:shadow-md hover:border-gray-300">
              <div className="flex gap-3.5 sm:gap-4 items-start">
                <span className="bg-gray-100 w-11 h-11 sm:w-12 sm:h-12 flex justify-center items-center text-2xl rounded-2xl shrink-0">
                  {i.image || i.categoryIcon}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug truncate">
                    {i.nameBn || i.categoryNameBn}
                  </h2>
                  <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
                    প্রতি {unitBangla[i.unit] || i.unit}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-2 flex items-end justify-between gap-2 border-t border-gray-50">
                <div>
                  <p className="text-[11px] sm:text-xs text-gray-500">
                    আজকের দাম
                  </p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900 leading-tight">
                    <span>{Number(i.today).toLocaleString("bn-BD")}</span>{" "}
                    <span className="text-sm font-normal text-gray-600">
                      টাকা
                    </span>
                  </p>
                </div>

                {i.change && (
                  <div
                    className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shrink-0 ${
                      isUp
                        ? "bg-red-50 text-red-600"
                        : isDown
                          ? "bg-green-50 text-green-600"
                          : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <span className="text-[9px]">
                      {isUp ? "▲" : isDown ? "▼" : "•"}
                    </span>
                    <span>
                      {Math.abs(Number(i.change.pct)).toLocaleString("bn-BD")}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default ProductCard;
