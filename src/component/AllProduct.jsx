import React from "react";
import ProductCard from "./ProductCard";

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

export default async function AllProduct() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );
  const data = await res.json();
  return (
    <div className="w-[80%] mx-auto mt-10">
      <h1 className="text-2xl font-bold">সব পণ্য</h1>
      <p>{`মোট ${data.length} টি পণ্য দেখানো হচ্ছে`}</p>
      <ProductCard items={data}/>
    </div>
  );
}
