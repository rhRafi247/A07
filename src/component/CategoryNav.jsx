"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function CategoryNav({ categories = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="w-full relative" ref={menuRef}>
      <div className="sm:hidden mt-3">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full flex items-center justify-between px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-800 text-sm font-semibold shadow-xs hover:border-green-600 transition cursor-pointer select-none"
          aria-expanded={isOpen}
          aria-label="ক্যাটাগরি সমূহ দেখুন"
        >
          <span className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-600 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
            <span>ক্যাটাগরি সমূহ</span>
          </span>

          <span className="flex items-center gap-1.5 text-xs text-gray-500 font-normal">
            <span>{isOpen ? "বন্ধ করুন" : "সব দেখুন"}</span>
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
          </span>
        </button>

        {isOpen && (
          <div className="absolute left-0 right-0 top-full mt-2 p-3 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 grid grid-cols-2 gap-2 animate-in fade-in duration-150">
            {categories.map((i) => (
              <Link
                href={`/category-details/${i.slug}`}
                key={i.id}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-green-50 text-gray-800 hover:text-green-700 text-sm font-medium transition border border-gray-100"
              >
                <span className="text-xl shrink-0">{i.icon}</span>
                <span className="truncate">{i.nameBn}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="hidden sm:flex items-center gap-6 mt-5 overflow-x-auto pb-2 scrollbar-none whitespace-nowrap">
        {categories.map((i) => (
          <Link
            href={`/category-details/${i.slug}`}
            key={i.id}
            className="shrink-0 text-sm sm:text-base font-medium text-gray-700 hover:text-green-600 transition-colors py-1 px-1.5 rounded-lg"
          >
            <span className="mr-1.5">{i.icon}</span>
            <span>{i.nameBn}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
