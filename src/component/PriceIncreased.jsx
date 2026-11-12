import React from "react";
import ProductCard from '@/component/ProductCard'

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

export default async function PriceIncreased() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );
  const data = await res.json();
  const filteredData = data.filter((i) => {
    return i.change.dir === "up";
  });
  filteredData.sort((a, b) => b.change.pct - a.change.pct);
  const topSix = filteredData.slice(0, 6);


  return (
    <div>
      <div className="w-[80%] mx-auto mt-10">
        <p className="text-2xl font-bold">
          <span className="text-red-600">▲</span> আজ দাম বেড়েছে
        </p>
        
          <ProductCard items={topSix}/>
        
      </div>
    </div>
  );
}
