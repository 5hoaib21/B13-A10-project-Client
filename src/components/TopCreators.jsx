import React from 'react';
import { Award, Code2, ArrowRight, Crown, Sparkles, Star, Medal, Trophy } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getTopCreators } from '@/lib/api/topCreators';

export default async function TopCreators() {
  const creators = await getTopCreators();

  if (!creators || creators.length === 0) return null;

  // মেডেল ইমোজি
  const medals = ['🥇', '🥈', '🥉'];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-white via-gray-50/30 to-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* সেকশন হেডার */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-amber-100 rounded-xl">
                <Crown size={18} className="text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Top Creators</h2>
            </div>
            <p className="text-sm text-gray-500 ml-1">The masterminds behind trending blueprints</p>
          </div>
          <Link
            href="/creators"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 group"
          >
            View All
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* ক্রিয়েটর কার্ড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {creators.map((creator, index) => {
            const isTop3 = index < 3;
            const rankColors = [
              'from-amber-400 to-amber-600',
              'from-slate-400 to-slate-600',
              'from-amber-600 to-amber-800',
              'from-blue-400 to-blue-600',
              'from-purple-400 to-purple-600',
              'from-pink-400 to-pink-600',
            ];

            return (
              <Link
                key={creator._id}
                href={`/creators/${creator._id}`}
                className="group relative bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:border-amber-200"
              >
                {/* টপ ৩ এর জন্য গ্লো ইফেক্ট */}
                {isTop3 && (
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${rankColors[index]} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10`} />
                )}

                <div className="flex flex-col items-center text-center relative">
                  {/* প্রোফাইল ইমেজ */}
                  <div className="relative">
                    <div className={`relative w-24 h-24 rounded-full overflow-hidden border-4 
                      ${isTop3 
                        ? index === 0 
                          ? 'border-amber-400 shadow-lg shadow-amber-200' 
                          : index === 1 
                          ? 'border-slate-400 shadow-lg shadow-slate-200'
                          : 'border-amber-600 shadow-lg shadow-amber-200'
                        : 'border-gray-200'
                      } 
                      bg-gradient-to-br from-gray-100 to-gray-200`}
                    >
                      <Image
                        src={creator.authorImage || "https://i.ibb.co/Fq0mq52C/705809516-2567577786991572-6055184738500555577-n.jpg"}
                        alt={creator.authorName || "Creator"}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* ✅ র‍্যাঙ্ক ব্যাজ - এখন পরিষ্কার দেখা যাবে */}
                    <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg border-2 border-white
                      ${index === 0 ? 'bg-gradient-to-br from-amber-400 to-amber-600' : 
                        index === 1 ? 'bg-gradient-to-br from-slate-400 to-slate-600' : 
                        index === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-800' : 
                        'bg-gradient-to-br from-gray-400 to-gray-600'}`}
                    >
                      {isTop3 ? medals[index] : `#${index + 1}`}
                    </div>

                    {/* 👑 টপ ১ এর জন্য ক্রাউন */}
                    {index === 0 && (
                      <div className="absolute -top-3 -right-3">
                        <div className="bg-amber-400 rounded-full p-1 shadow-lg shadow-amber-200">
                          <Crown size={14} className="text-white" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* নাম */}
                  <h4 className="text-base font-bold text-gray-900 line-clamp-1 mt-3 group-hover:text-amber-600 transition-colors duration-300">
                    {creator.authorName || "Anonymous"}
                  </h4>
                  
                  {/* ইউজারনেম */}
                  <p className="text-xs text-gray-400 mt-0.5">
                    @{creator.authorEmail ? creator.authorEmail.split('@')[0] : 'creator'}
                  </p>

                  {/* ডিভাইডার */}
                  <div className={`w-12 h-0.5 rounded-full my-3 
                    ${isTop3 
                      ? 'bg-gradient-to-r from-amber-400 to-orange-400' 
                      : 'bg-gradient-to-r from-gray-300 to-gray-400'
                    }`} 
                  />

                  {/* স্ট্যাটস */}
                  <div className="flex items-center gap-4 text-xs w-full justify-center">
                    <div className="flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-full">
                      <Code2 size={13} className="text-blue-500" />
                      <span className="font-semibold text-gray-700">{creator.totalPrompts}</span>
                      <span className="text-gray-400 text-[10px]">prompts</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-full">
                      <Star size={13} className="fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-gray-700">4.8</span>
                    </div>
                  </div>

                  {/* হোভার ইফেক্ট */}
                  <div className={`mt-4 w-full h-1 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left
                    ${isTop3 
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500' 
                      : 'bg-gradient-to-r from-blue-400 to-purple-400'
                    }`} 
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}