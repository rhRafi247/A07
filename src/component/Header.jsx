import Image from "next/image";
import React from "react";
import Category from "./Category";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import UserDropdown from "./UserDropdown";

export default async function Header() {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className="w-[92%] sm:w-[88%] lg:w-[80%] mx-auto pt-3 sm:pt-4">
      <div className="flex justify-between items-center gap-2 sm:gap-4">
        <div className="flex gap-2 sm:gap-3 items-center min-w-0">
          <Link href={"/"} className="shrink-0">
            <Image
              src="/logo-icon.png"
              alt="Logo"
              width={48}
              height={48}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600 p-1.5 sm:p-2 rounded-[10px]"
              priority
            />
          </Link>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold leading-tight truncate">
              বাজার দর
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 truncate">{date}</p>
          </div>
        </div>

        <div className="shrink-0">
          {session?.user ? (
            <UserDropdown user={session.user} />
          ) : (
            <div className="flex gap-2 sm:gap-3">
              <Link href={"/signin"}>
                <button className="btn btn-sm sm:btn-md px-3 sm:px-4 text-xs sm:text-sm">
                  সাইন ইন
                </button>
              </Link>
              <Link href={"/signup"}>
                <button className="btn btn-sm sm:btn-md btn-success px-3 sm:px-4 text-xs sm:text-sm text-white">
                  সাইন আপ
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <Category />
    </header>
  );
}
