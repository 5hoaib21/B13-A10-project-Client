"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Terminal, MoveLeft, RefreshCw, HelpCircle } from "lucide-react";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center p-6 text-zinc-900 font-sans">
      
      {/* 🧩 মডার্ন মিনিমাল আর্টওয়ার্ক / আইকন গ্রুপ */}
      <div className="relative mb-8 flex items-center justify-center">
        {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট (খুবই হালকা ও সুক্ষ্ম) */}
        <div className="absolute w-24 h-24 bg-zinc-100 rounded-full blur-xl opacity-70 animate-pulse"></div>
        
        {/* মেইন আইকন কন্টেইনার */}
        <div className="relative p-5 bg-zinc-50 border border-zinc-100 rounded-2xl shadow-sm text-zinc-400">
          <Terminal size={48} className="stroke-[1.5]" />
          {/* একটি ছোট কোয়েশ্চেন মার্ক ব্যাজ */}
          <span className="absolute -top-1 -right-1 p-1 bg-zinc-950 text-white rounded-lg shadow">
            <HelpCircle size={14} />
          </span>
        </div>
      </div>

      {/* ✍️ টেক্সট কন্টেন্ট */}
      <div className="text-center max-w-md space-y-3">
        <h1 className="text-6xl font-black text-zinc-950 tracking-tighter">404</h1>
        <h2 className="text-xl font-bold text-zinc-900 tracking-tight">Pipeline compilation failed!</h2>
        <p className="text-sm text-zinc-400 leading-relaxed">
          The prompt blueprint or page you are looking for doesn`t exist or has been permanently deleted from <span className="font-semibold text-zinc-600">PromptForge</span>.
        </p>
      </div>

      {/* 🔗 ডাইনামিক অ্যাকশন বাটন গ্রুপ */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-8 w-full max-w-xs sm:max-w-none sm:w-auto">
        
        {/* আগের পেজে ফিরে যাওয়ার বাটন */}
        <button
          onClick={() => router.back()}
          className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-zinc-600 bg-white border border-zinc-200 rounded-xl hover:bg-zinc-50 hover:text-zinc-950 transition-all inline-flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <MoveLeft size={16} />
          Go Back
        </button>

        {/* হোম পেজে যাওয়ার মেইন বাটন */}
        <Link 
          href="/"
          className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-white bg-zinc-950 rounded-xl hover:bg-zinc-800 transition-all inline-flex items-center justify-center gap-2 shadow-sm active:scale-[0.98]"
        >
          <RefreshCw size={16} className="animate-spin-slow" />
          Back to Forge
        </Link>

      </div>

      {/* 🛡️ তলার ছোট ফুটার টেক্সট */}
      <p className="absolute bottom-6 text-xs text-zinc-300">
        Error Code: ERR_PROMPT_NOT_FORGED
      </p>

    </div>
  );
}