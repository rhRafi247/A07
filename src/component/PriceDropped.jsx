import React from "react";
import ProductCard from "./ProductCard";

export default async function PriceDecreased() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );
  const data = await res.json();
  const filteredData = data.filter((i) => i.change?.dir === "down");
  filteredData.sort((a, b) => b.change.pct - a.change.pct);
  const topSix = filteredData.slice(0, 6);

  return (
    <section className="w-[92%] sm:w-[88%] lg:w-[80%] mx-auto mt-8 sm:mt-12">
      <div className="flex items-center gap-2">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          <span className="text-green-600 mr-1.5">▼</span>আজ দাম কমেছে
        </h2>
      </div>
      <ProductCard items={topSix} />
    </section>
  );
}
