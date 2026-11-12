import React from "react";
import CategoryFilterSection from "@/component/CategoryFilterSection";

export default async function CategoryId({ params }) {
  const { categoryId } = await params;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products?category=${categoryId}`,
  );
  const data = await res.json();
  const categoryInfo = data?.[0];

  return (
    <div className="w-[80%] mx-auto pb-16">
      <CategoryFilterSection items={data || []} categoryInfo={categoryInfo} />
    </div>
  );
}
