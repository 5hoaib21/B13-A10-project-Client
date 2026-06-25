import React from 'react';
import { Award, Code2, ArrowRight, Crown, Sparkles, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getTopCreators } from '@/lib/api/topCreators';

export default async function TopCreators() {
  const creators = await getTopCreators();

  if (!creators || creators.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* সেকশন হেডার */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Crown size={20} className="text-amber-500" />
              <h2 className="text-2xl font-bold text-gray-900">Top Creators</h2>
            </div>
            <p className="text-sm text-gray-500">The masterminds behind trending blueprints</p>
          </div>
          <Link
            href="/"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 group"
          >
            View All
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* ক্রিয়েটর কার্ড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {creators.map((creator, index) => (
            <Link
              key={creator._id}
              href={`/creators/${creator._id}`}
              className="group bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-amber-200"
            >
              <div className="flex flex-col items-center text-center">
                {/* প্রোফাইল ইমেজ */}
                <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-white shadow-lg mb-3">
                  <Image
                    src={creator.authorImage || "https://i.ibb.co/Fq0mq52C/705809516-2567577786991572-6055184738500555577-n.jpg"}
                    alt={creator.authorName || "Creator"}
                    fill
                    className="object-cover"
                  />
                  {/* র‍্যাঙ্ক */}
                  <div className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg
                    ${index === 0 ? 'bg-amber-500' : 
                      index === 1 ? 'bg-slate-400' : 
                      index === 2 ? 'bg-amber-700' : 'bg-gray-400'}`}
                  >
                    {index + 1}
                  </div>
                </div>

                {/* নাম */}
                <h4 className="text-sm font-bold text-gray-900 line-clamp-1 group-hover:text-amber-600 transition-colors">
                  {creator.authorName || "Anonymous"}
                </h4>
                
                {/* ইউজারনেম */}
                <p className="text-xs text-gray-400 mt-0.5">
                  @{creator.authorEmail ? creator.authorEmail.split('@')[0] : 'creator'}
                </p>

                {/* ডিভাইডার */}
                <div className="w-12 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full my-3" />

                {/* স্ট্যাটস */}
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Code2 size={14} className="text-blue-500" />
                    <span className="font-semibold">{creator.totalPrompts}</span>
                    <span className="text-gray-400">prompts</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-600">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    <span className="font-semibold">4.8</span>
                  </div>
                </div>

                {/* হোভার ইফেক্ট */}
                <div className="mt-3 w-full h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}