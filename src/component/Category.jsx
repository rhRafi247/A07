import React from "react";
import CategoryNav from "./CategoryNav";

export default async function Category() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories",
  );
  const data = await res.json();
  const categories = Array.isArray(data) ? data : [];

  return <CategoryNav categories={categories} />;
}
