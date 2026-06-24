"use client";

import React from "react";
import Link from "next/link";
import { 
  Terminal, 
  ArrowUpRight,
  Heart
} from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { CiLinkedin } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // 🚀 ডাইনামিক লিংক মেনু ডাটা
  const footerLinks = [
    {
      title: "Explore",
      links: [
        { label: "All Prompts", href: "/prompts" },
        { label: "AI Tools", href: "/tools" },
        { label: "Trending", href: "/trending" },
        { label: "Pricing", href: "/pricing" },
      ],
    },
    {
      title: "Community",
      links: [
        { label: "Creators", href: "/creators" },
        { label: "Leaderboard", href: "/leaderboard" },
        { label: "Guidelines", href: "/guidelines" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Policy", href: "/cookies" },
      ],
    },
  ];

  return (
    <footer className="w-full bg-white border-t border-zinc-100 text-zinc-600 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        
        {/* 📐 টপ সেকশন: গ্রিড লেআউট */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-8 pb-12 border-b border-zinc-100">
          
          {/* ব্র্যান্ড ইনফো (২ কলাম জুড়ে থাকবে ডেস্কটপে) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative">
                <Terminal />
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 blur transition-opacity group-hover:opacity-20" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                PromptForge
              </span>
            </Link>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              Forge your productivity with high-engineered AI prompts. Discover, copy, and share optimized pipelines for top AI engines.
            </p>
            
            {/* সোশ্যাল আইকনস */}
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="p-2 text-zinc-400 hover:text-zinc-950 hover:bg-zinc-50 rounded-lg transition-colors" title="GitHub">
                <FiGithub size={18} />
              </a>
              <a href="#" className="p-2 text-zinc-400 hover:text-zinc-950 hover:bg-zinc-50 rounded-lg transition-colors" title="Twitter">
                <FaXTwitter size={18} />
              </a>
              <a href="#" className="p-2 text-zinc-400 hover:text-zinc-950 hover:bg-zinc-50 rounded-lg transition-colors" title="LinkedIn">
                <CiLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* ডাইনামিক লিংক ক্যাটাগরিগুলো */}
          {footerLinks.map((category) => (
            <div key={category.title} className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                {category.title}
              </h4>
              <ul className="space-y-2.5">
                {category.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href} 
                      className="text-sm text-zinc-500 hover:text-zinc-950 transition-colors inline-flex items-center gap-0.5 group"
                    >
                      {link.label}
                      <ArrowUpRight size={12} className="opacity-0 -translate-y-0.5 translate-x-0 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0.5 transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* 📐 বটম সেকশন: কপিরাইট ও ক্রেডিট */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-zinc-400">
          <div>
            &copy; {currentYear} <span className="font-semibold text-zinc-700">PromptForge</span>. All rights reserved.
          </div>
          
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <Heart size={12} className="text-rose-500 fill-rose-500 animate-pulse" />
            <span>by</span>
            <a 
              href="#" 
              className="font-medium text-zinc-700 hover:text-zinc-950 transition-colors underline underline-offset-4"
            >
              Shoaib
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}