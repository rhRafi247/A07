import React from "react";
import CategoryFilterSection from "@/component/CategoryFilterSection";

export const instant = false;

export default async function CategoryId({ params }) {
  const { categoryId } = await params;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products?category=${categoryId}`,
  );
  const data = await res.json();
  const categoryInfo = data?.[0];

  return (
    <main className="w-[92%] sm:w-[88%] lg:w-[80%] mx-auto pb-16">
      <CategoryFilterSection items={data || []} categoryInfo={categoryInfo} />
    </main>
  );
}
