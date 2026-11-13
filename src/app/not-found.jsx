import React from 'react';
import Link from 'next/link'; 

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#F4F6F4] flex items-center justify-center p-4 sm:p-6">
            <div className="max-w-3xl w-full bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-12 md:p-16 text-center relative overflow-hidden">

                
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#DCFCE7] rounded-full opacity-40 blur-2xl pointer-events-none" />
                <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#FEE2E2] rounded-full opacity-40 blur-2xl pointer-events-none" />

                
                <div className="inline-flex items-center gap-2 bg-[#FEE2E2] text-[#DC2626] px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                    <span>▲ ৪০৪ ত্রুটি (Page Not Found)</span>
                </div>

                
                <div className="flex justify-center mb-6">
                    <svg
                        className="w-36 h-36 sm:w-44 sm:h-44"
                        viewBox="0 0 200 200"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        
                        <ellipse cx="100" cy="175" rx="60" ry="10" fill="#E5E7EB" />

                        
                        <text x="88" y="65" fill="#00C875" fontSize="36" fontWeight="bold" opacity="0.8">?</text>
                        <path d="M130 55C138 45 150 48 148 58C146 68 134 65 130 55Z" fill="#22C55E" opacity="0.7" />
                        <path d="M62 72C52 65 45 73 51 80C57 87 66 79 62 72Z" fill="#EF4444" opacity="0.7" />

                        
                        <path
                            d="M65 95C65 65 135 65 135 95"
                            stroke="#92400E"
                            strokeWidth="6"
                            strokeLinecap="round"
                        />

                       
                        <path
                            d="M45 95H155L142 162C140.8 168.5 135.2 173 128.6 173H71.4C64.8 173 59.2 168.5 58 162L45 95Z"
                            fill="#B45309"
                        />
                        
                        <rect x="40" y="90" width="120" height="12" rx="6" fill="#78350F" />

                        
                        <line x1="75" y1="102" x2="80" y2="173" stroke="#78350F" strokeWidth="3" />
                        <line x1="100" y1="102" x2="100" y2="173" stroke="#78350F" strokeWidth="3" />
                        <line x1="125" y1="102" x2="120" y2="173" stroke="#78350F" strokeWidth="3" />
                        <line x1="50" y1="132" x2="150" y2="132" stroke="#78350F" strokeWidth="3" />
                    </svg>
                </div>

                
                <h1 className="text-2xl sm:text-4xl font-bold text-[#111827] mb-3 tracking-tight">
                    দুঃখিত! এই পাতাটি খুঁজে পাওয়া যায়নি
                </h1>

                
                <p className="text-gray-500 text-base sm:text-lg max-w-md mx-auto mb-8 leading-relaxed">
                    আপনি যে পণ্য বা বাজারদরের তথ্য খুঁজছেন, সেটি সম্ভবত সরিয়ে ফেলা হয়েছে অথবা লিংকটি সঠিক নয়।
                </p>

                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                    <Link
                        href="/"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#00C875] hover:bg-[#00b067] text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200 shadow-sm"
                    >
                        <span>হোমপেজে ফিরে যান</span>
                    </Link>

                    
                </div>

            </div>
        </div>
    );
}