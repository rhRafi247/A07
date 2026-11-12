import Image from "next/image";
import React from "react";
import Category from "./Category";
import Link from "next/link";

export default function Header() {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <div className="w-[80%] mx-auto">
      <div className="flex justify-between items-center mt-3">
        <div className="flex gap-2 items-center">
          <Link href={'/'}>
            <Image
              src="/logo-icon.png"
              alt="Logo"
              width={60}
              height={60}
              className="bg-green-600 p-2 rounded-[10px]"
            />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">বাজার দর</h1>
            <p>{date}</p>
          </div>
        </div>
        <div className="flex gap-5">
          <Link href={"/signin"}>
            <button className="btn">সাইন ইন</button>
          </Link>
          <Link href={"/signup"}>
            <button className="btn btn-success">সাইন আপ</button>
          </Link>
        </div>
      </div>
      <Category />
    </div>
  );
}
