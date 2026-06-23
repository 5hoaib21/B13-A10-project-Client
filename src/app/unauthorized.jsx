"use client";

import React from "react";
import { Button } from "@heroui/react";
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white text-zinc-800 flex flex-col items-center justify-center p-6 sm:p-10">
      <div className="max-w-md w-full text-center space-y-8">
        
        {/* 🎨 আইকন এবং ভিজ্যুয়াল পার্ট */}
        <div className="relative flex justify-center">
          {/* গ্লো ইফেক্ট (লাইট থিমের জন্য হালকা ব্যাকগ্রাউন্ড) */}
          <div className="absolute inset-0 m-auto w-24 h-24 bg-rose-50 rounded-full blur-xl opacity-80" />
          
          <div className="relative w-20 h-20 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 shadow-xs">
            <ShieldAlert size={40} strokeWidth={1.5} />
          </div>
        </div>

        {/* 📝 টেক্সট সেকশন */}
        <div className="space-y-3">
          <h1 className="text-4xl font-black tracking-tight text-zinc-950">
            Access Denied
          </h1>
          <p className="text-zinc-400 font-mono text-sm tracking-wide uppercase">
            Error 403 / Unauthorized
          </p>
          <p className="text-zinc-500 text-base leading-relaxed max-w-sm mx-auto">
            Oops! You don't have permission to view this page. Please contact your admin or log in with authorized credentials.
          </p>
        </div>

        {/* 🔗 অ্যাকশন বাটনসমূহ */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Button
            size="lg"
            variant="flat"
            className="w-full sm:w-auto bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-semibold rounded-xl flex items-center justify-center gap-2"
            onClick={() => router.back()}
          >
            <ArrowLeft size={16} />
            Go Back
          </Button>

          <Button
            size="lg"
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-xs flex items-center justify-center gap-2"
            onClick={() => router.push("/")}
          >
            <Home size={16} />
            Back to Home
          </Button>
        </div>

      </div>

      {/* footer এর মতো ছোট টেক্সট */}
      <div className="absolute bottom-6 text-xs text-zinc-400 font-medium">
        Secured Dashboard System
      </div>
    </div>
  );
}