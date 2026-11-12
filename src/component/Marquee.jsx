import Link from "next/link";
import React from "react";
import MarqueeText from "react-marquee-text";

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

export default async function Marquee() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );
  const data = await res.json();
  const products = Array.isArray(data) ? data : data.data || [];

  return (
    <div>
      <MarqueeText direction="right">
        <div className="flex items-center gap-7 mt-8 py-2.5 px-4 border-2 border-gray-300 bg-white">
          {products.map((i) => {
            const isUp = i.change?.dir === "up";
            const isDown = i.change?.dir === "down";

            return (
              <div
                key={i.id}
                className="flex items-center gap-2.5 border-r border-gray-400 pr-7 shrink-0"
              >
                <Link href={`/product-details/${i.id}`}>
                  <span className="text-gray-800 font-medium">
                    {i.categoryIcon} {i.nameBn}{" "}
                    <strong className="font-bold">
                      {Number(i.today).toLocaleString("bn-BD")}
                    </strong>{" "}
                    টাকা/{unitBangla[i.unit] || i.unit}
                  </span>

                  {i.change && (
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${
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
                        {Math.abs(Number(i.change.pct)).toLocaleString("bn-BD")}
                        %
                      </span>
                    </span>
                  )}
                </Link>
              </div>
            );
          })}
        </div>
      </MarqueeText>
    </div>
  );
}
