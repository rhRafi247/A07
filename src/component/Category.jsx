import Link from "next/link";
import React from "react";

export default async function Category() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories",
  );
  const data = await res.json();
  return (
    <div>
      <div className="flex gap-7 mt-8 cursor-pointer">
        {data.map((i) => (
          <Link href={`/category-details/${i.slug}`} key={i.id}>
            {i.icon} {i.nameBn}
          </Link>
        ))}
      </div>
    </div>
  );
}
