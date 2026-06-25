"use client";

import React, { useState, useEffect } from "react";
import { Search, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const ALL_TAGS = [
  "Midjourney v6", "ChatGPT-4o", "SaaS Copywriting", "SEO Optimization",
  "React Code Gen", "UI/UX Copy", "Social Media Hooks", "Email Sequences"
];

// অ্যানিমেশন কনফিগারেশন অবজেক্ট
const animations = {
  // ধীর অ্যানিমেশন
  slow: {
    duration: 0.8,
    ease: "easeOut"
  },
  // মিডিয়াম অ্যানিমেশন
  medium: {
    duration: 0.5,
    ease: "easeInOut"
  },
  // ফাস্ট অ্যানিমেশন
  fast: {
    duration: 0.3,
    ease: "easeOut"
  },
  // স্প্রিং ইফেক্ট
  spring: {
    type: "spring",
    stiffness: 300,
    damping: 20
  },
  // স্প্রিং ইফেক্ট (সফট)
  springSoft: {
    type: "spring",
    stiffness: 200,
    damping: 25
  },
  // স্প্রিং ইফেক্ট (হার্ড)
  springHard: {
    type: "spring",
    stiffness: 500,
    damping: 15
  },
  // ডিলে সহ
  delay: (ms) => ({
    delay: ms / 1000
  })
};

export default function Banner() {
  const [searchQuery, setSearchQuery] = useState("");
  const [trendingTags, setTrendingTags] = useState([]);

  useEffect(() => {
    const shuffled = [...ALL_TAGS].sort(() => 0.5 - Math.random());
    setTrendingTags(shuffled.slice(0, 4));
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    console.log("Searching for:", searchQuery);
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative overflow-hidden bg-white border-b border-gray-100 py-20 sm:py-24"
    >
      {/* ব্যাকগ্রাউন্ড ব্লাব - কন্টিনিউয়াস অ্যানিমেশন */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-0 left-1/2 -z-10 h-[400px] w-[800px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(120,119,198,0.1),transparent_50%)]"
      />

      {/* ফ্লোটিং পার্টিকেল ১ */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-10 left-10 text-4xl opacity-20 hidden sm:block"
      >
        ✨
      </motion.div>

      {/* ফ্লোটিং পার্টিকেল ২ */}
      <motion.div
        animate={{
          y: [0, 15, 0],
          x: [0, -10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-10 right-10 text-4xl opacity-20 hidden sm:block"
      >
        🚀
      </motion.div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* টপ ব্যাজ */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-50 border border-zinc-200 text-xs text-zinc-600 font-medium mb-6"
        >
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Sparkles size={13} className="text-amber-500 fill-amber-500" />
          </motion.span>
          The Ultimate Blueprint Marketplace
        </motion.div>

        {/* মেইন হেডলাইন */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight max-w-3xl mx-auto"
        >
          Discover & Forge High-Engineered{" "}
          <motion.span
            initial={{ backgroundPosition: "0% 50%" }}
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-[length:200%_auto]"
          >
            AI Prompts
          </motion.span>
        </motion.h1>
        
        {/* ডেসক্রিপশন */}
        <motion.p 
          variants={itemVariants}
          className="mt-4 text-base sm:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed"
        >
          Skip the guesswork. Access premium, production-ready blueprints optimized for ChatGPT, Midjourney, and LLMs.
        </motion.p>

        {/* সার্চ বার */}
        <motion.div 
          variants={itemVariants}
          className="mt-10 max-w-2xl mx-auto"
        >
          <motion.form 
            onSubmit={handleSearchSubmit} 
            className="relative flex items-center p-2 rounded-2xl bg-white border border-gray-200 shadow-md focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 transition-all duration-300"
            whileHover={{ scale: 1.01 }}
            transition={animations.springSoft}  // ← স্প্রিং ইফেক্ট এখানে
          >
            <div className="flex items-center pl-3 pointer-events-none text-gray-400">
              <Search size={20} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for copywriting, coding, design blueprints..."
              className="w-full pl-3 pr-4 py-3 bg-transparent text-sm text-gray-900 outline-none placeholder-gray-400"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={animations.spring}  // ← স্প্রিং ইফেক্ট এখানে
              className="bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-sm cursor-pointer"
            >
              Search
            </motion.button>
          </motion.form>
        </motion.div>

        {/* ট্রেন্ডিং ট্যাগস */}
        <motion.div 
          variants={itemVariants}
          className="mt-5 flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto"
        >
          <span className="text-xs font-semibold text-gray-400 mr-1">Trending:</span>
          <AnimatePresence mode="popLayout">
            {trendingTags.map((tag, index) => (
              <motion.button
                key={tag}
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                transition={{ 
                  ...animations.medium,  // ← মিডিয়াম অ্যানিমেশন
                  delay: index * 0.05
                }}
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "#f3f4f6",
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchQuery(tag)}
                className="text-xs bg-gray-50 hover:bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg border border-gray-200 transition-all cursor-pointer"
              >
                #{tag}
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA বাটনস */}
        <motion.div 
          variants={itemVariants}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={animations.springSoft}  // ← স্প্রিং ইফেক্ট এখানে
          >
            <Link
              href="/prompts"
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              Explore Blueprints
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ 
                  ...animations.slow,  // ← ধীর অ্যানিমেশন
                  repeat: Infinity 
                }}
              >
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </motion.span>
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={animations.springSoft}  // ← স্প্রিং ইফেক্ট এখানে
          >
            <Link
              href="/pricing"
              className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-700 font-bold text-sm px-8 py-3.5 rounded-xl border border-gray-200 shadow-sm transition-all text-center"
            >
              Get Pro Access
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </motion.div>
  );
}

// ভেরিয়েন্টস
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
      ...animations.medium  // ← মিডিয়াম অ্যানিমেশন এখানে
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: animations.medium  // ← মিডিয়াম অ্যানিমেশন এখানে
  }
};