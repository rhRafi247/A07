"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signOut } from "@/lib/auth-client";

export default function UserDropdown({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [failedUrl, setFailedUrl] = useState(null);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      setIsOpen(false);
      await signOut();
      toast.success("সফলভাবে সাইন আউট হয়েছে!");
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("সাইন আউট ব্যর্থ হয়েছে।");
    } finally {
      router.push("/signin");
      router.refresh();
    }
  };

  const displayName = user?.name || "ইউজার";
  const displayImage =
    user?.image && failedUrl !== user.image ? user.image : "/profileImage.jpg";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2.5 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl hover:bg-gray-100 transition cursor-pointer select-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="h-9 w-9 rounded-full overflow-hidden bg-gray-200 shrink-0">
          <Image
            src={displayImage}
            width={36}
            height={36}
            alt={displayName}
            className="h-full w-full object-cover"
            onError={() => setFailedUrl(user?.image)}
            referrerPolicy="no-referrer"
            unoptimized
          />
        </div>
        <span className="font-semibold text-gray-800 text-sm sm:text-base">
          {displayName}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white border border-gray-100 shadow-[0_10px_25px_rgba(0,0,0,0.08)] py-1.5 z-50">
          <Link
            href="/profile"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-green-700 transition"
          >
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span>আমার প্রোফাইল</span>
          </Link>

          <div className="h-px bg-gray-100 my-1" />

          <button
            type="button"
            onClick={handleSignOut}
            className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition text-left cursor-pointer"
          >
            <svg
              className="w-4 h-4 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span>সাইন আউট</span>
          </button>
        </div>
      )}
    </div>
  );
}
