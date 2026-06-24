"use client";

import React from "react";
import { Terminal } from "lucide-react";

export default function LoadingPage() {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center p-6 text-zinc-900 font-sans">
      
      <div className="flex flex-col items-center space-y-6">
        
        {/* ⚙️ মডার্ন অ্যানিমেটেড লোগো কন্টেইনার */}
        <div className="relative flex items-center justify-center">
          
          {/* ১. আউটার ডাইনামিক স্পিনিং বর্ডার (Premium Ring Loader) */}
          <div className="w-16 h-16 border-2 border-zinc-100 border-t-zinc-950 rounded-full animate-spin"></div>
          
          {/* ২. ইনার ফিক্সড আইকন বক্স */}
          <div className="absolute p-2.5 bg-zinc-50 border border-zinc-100 rounded-xl text-zinc-800 shadow-sm animate-pulse">
            <Terminal size={22} className="stroke-[2.5]" />
          </div>
          
        </div>

        {/* ✍️ লোডিং টেক্সট ও স্ট্যাটাস */}
        <div className="text-center space-y-1.5">
          <h3 className="text-sm font-bold text-zinc-900 tracking-tight flex items-center justify-center gap-1">
            Forging Pipeline
            {/* ডাইনামিক ৩টি ডট অ্যানিমেশন */}
            <span className="flex items-center gap-0.5 ml-0.5">
              <span className="w-1 h-1 bg-zinc-950 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1 h-1 bg-zinc-950 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1 h-1 bg-zinc-950 rounded-full animate-bounce"></span>
            </span>
          </h3>
          <p className="text-xs text-zinc-400 tracking-wide">
            Compiling and fetching optimized engine blueprints...
          </p>
        </div>

      </div>

      {/* 🔮 ব্যাকগ্রাউন্ডে খুবই হালকা ওয়াটারমার্ক / ব্র্যান্ডিং নাম */}
      <div className="absolute bottom-8 text-[11px] font-medium tracking-widest text-zinc-300 uppercase">
        PromptForge Environment
      </div>

    </div>
  );
}