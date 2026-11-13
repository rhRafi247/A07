import { Suspense } from "react";
import AllProduct from "@/component/AllProduct";
import HomeBanner from "@/component/HomeBanner";
import PriceDropped from "@/component/PriceDropped";
import PriceIncreased from "@/component/PriceIncreased";

export default function Home() {
  return (
    <div>
      <HomeBanner />
      <Suspense fallback={<div className="p-8 text-center text-gray-500">লোড হচ্ছে...</div>}>
        <PriceIncreased />
      </Suspense>
      <Suspense fallback={<div className="p-8 text-center text-gray-500">লোড হচ্ছে...</div>}>
        <PriceDropped />
      </Suspense>
      <Suspense fallback={<div className="p-8 text-center text-gray-500">লোড হচ্ছে...</div>}>
        <AllProduct />
      </Suspense>
    </div>
  );
}
