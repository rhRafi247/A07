import React from "react";
import ProductCard from "./ProductCard";

export default async function AllProduct() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );
  const data = await res.json();
  const products = Array.isArray(data) ? data : [];

  return (
    <section className="w-[92%] sm:w-[88%] lg:w-[80%] mx-auto mt-8 sm:mt-12">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">সব পণ্য</h2>
        <p className="text-xs sm:text-sm text-gray-500 font-medium">
          {`মোট ${Number(products.length).toLocaleString("bn-BD")} টি পণ্য দেখানো হচ্ছে`}
        </p>
      </div>
      <ProductCard items={products} />
    </section>
  );
}
