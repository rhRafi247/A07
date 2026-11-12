import Image from "next/image";
import React from "react";
import Category from "./Category";
import Link from "next/link";
import { auth } from "@/lib/auth"; // আপনার সার্ভার auth ফাইল
import { headers } from "next/headers";

export default async function Header() {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  // সার্ভার সাইডে সেশন চেক করার সঠিক নিয়ম
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="w-[80%] mx-auto">
      <div className="flex justify-between items-center mt-3">
        <div className="flex gap-2 items-center">
          <Link href={"/"}>
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

        
        {session?.user ? (
          <Link href={'/profile'}>
            <div className="flex items-center gap-3">
              <Image src={"/profileImage.jpg"} width={100} height={100} alt="Profile Image"/>
              <span className="font-semibold text-gray-800">
                {session.user.name}
              </span>
            </div>
          </Link>
        ) : (
          <div className="flex gap-5">
            <Link href={"/signin"}>
              <button className="btn">সাইন ইন</button>
            </Link>
            <Link href={"/signup"}>
              <button className="btn btn-success">সাইন আপ</button>
            </Link>
          </div>
        )}
      </div>
      <Category />
    </div>
  );
}
