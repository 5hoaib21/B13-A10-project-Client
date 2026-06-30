
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Star, 
  Copy, 
  Clock, 
  User, 
  Sparkles, 
  ArrowRight,
  Award,
  Tag,
  Eye,
  Flame
} from 'lucide-react';
import { getFeaturedPrompts } from '@/lib/api/prompts';

const FeaturedPrompt = async () => {
    const data = await getFeaturedPrompts();
    
    // ✅ চেক করা data টি array কিনা
    const prompts = Array.isArray(data) ? data : data?.prompts || [];
    

    if (!prompts || prompts.length === 0) {
        return (
            <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
                    <div className="bg-white rounded-2xl p-12 border-2 border-dashed border-gray-200">
                        <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Featured Prompts</h3>
                        <p className="text-gray-400">Check back soon for featured prompts!</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* সেকশন হেডার */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-amber-700 text-xs font-semibold mb-3">
                            <Flame className="w-4 h-4" />
                            Featured Prompts
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
                            Handpicked{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600">
                                Premium
                            </span>{" "}
                            Prompts
                        </h2>
                        <p className="text-gray-500 mt-2">
                            Curated selection of the best prompts from our community
                        </p>
                    </div>
                    
                    <Link 
                        href="/prompts" 
                        className="hidden sm:inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold group"
                    >
                        View All
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* ফিচার্ড প্রম্পট গ্রিড */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {prompts.map((prompt, index) => (
                        <FeaturedCard key={prompt._id || index} prompt={prompt} index={index} />
                    ))}
                </div>

                {/* মোবাইলে View All */}
                <div className="text-center mt-8 sm:hidden">
                    <Link 
                        href="/prompts" 
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold group"
                    >
                        View All Prompts
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

// ফিচার্ড কার্ড কম্পোনেন্ট
const FeaturedCard = ({ prompt, index }) => {
    const {
        _id,
        title,
        description,
        category,
        aiTool,
        difficulty,
        tags,
        image,
        copyCount,
        rating = 0,
        totalReviews = 0,
        createdAt,
        author = "Prompt Engineer",
        authorName,
    } = prompt || {}; // ✅ prompt undefined হলে সমস্যা না হয়

    const formattedDate = createdAt ? new Date(createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }) : 'N/A';

    const tagList = Array.isArray(tags) ? tags : (typeof tags === 'string' ? tags.split(',').map(tag => tag.trim()): []) 

    const difficultyColors = {
        beginner: { label: 'Beginner', color: 'bg-emerald-100 text-emerald-700' },
        intermediate: { label: 'Intermediate', color: 'bg-amber-100 text-amber-700' },
        advanced: { label: 'Advanced', color: 'bg-rose-100 text-rose-700' }
    };

    const getDifficulty = (diff) => {
        return difficultyColors[diff] || difficultyColors.beginner;
    };

    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-amber-200 flex flex-col h-full transform hover:-translate-y-2">
            {/* ইমেজ সেকশন */}
            <div className="relative w-full h-48 overflow-hidden">
                {image ? (
                    <>
                        <Image
                            src={image}
                            alt={title || 'Featured Prompt'}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full bg-gradient-to-br from-amber-500 to-orange-600">
                        <Sparkles className="text-white w-12 h-12 opacity-50" />
                    </div>
                )}

                {/* ফিচার্ড ব্যাজ */}
                <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                        <Flame className="w-3 h-3" />
                        Featured
                    </span>
                </div>

                {/* ক্যাটাগরি ব্যাজ */}
                {category && (
                    <div className="absolute bottom-3 left-3">
                        <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium rounded-full shadow-lg">
                            {category?.toUpperCase()}
                        </span>
                    </div>
                )}

                {/* রেটিং - ডানে */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white px-2.5 py-1.5 rounded-full text-xs">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span>{rating ? rating.toFixed(1) : '0.0'}</span>
                    <span className="text-white/60">({totalReviews || 0})</span>
                </div>
            </div>

            {/* কন্টেন্ট সেকশন */}
            <div className="p-5 flex flex-col flex-grow">
                {/* টাইটেল */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-amber-600 transition-colors duration-300">
                    {title || 'Untitled Prompt'}
                </h3>

                {/* ডেসক্রিপশন */}
                <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2 flex-grow">
                    {description || 'No description available'}
                </p>

                {/* ট্যাগস */}
                {tagList.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                        {tagList.slice(0, 3).map((tag, idx) => (
                            <span 
                                key={idx}
                                className="px-2.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
                            >
                                #{tag}
                            </span>
                        ))}
                        {tagList.length > 3 && (
                            <span className="px-2.5 py-0.5 bg-gray-100 text-gray-400 text-xs rounded-full">
                                +{tagList.length - 3}
                            </span>
                        )}
                    </div>
                )}

                {/* মেটা ইনফো */}
                <div className="border-t border-gray-100 pt-3 mt-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {/* AI টুল */}
                            {aiTool && (
                                <span className="px-2.5 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full border border-purple-100">
                                    {aiTool}
                                </span>
                            )}
                            
                            {/* ডিফিকাল্টি */}
                            {difficulty && (
                                <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getDifficulty(difficulty).color}`}>
                                    {getDifficulty(difficulty).label}
                                </span>
                            )}
                        </div>
                        
                        {/* কপি কাউন্ট */}
                        <div className="flex items-center gap-1 text-gray-400 text-xs">
                            <Copy className="w-3 h-3" />
                            <span>{copyCount || 0}</span>
                        </div>
                    </div>
                </div>

                {/* ফুটার - ইউজার ও বাটন */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white text-xs font-bold">
                            {authorName?.charAt(0) || 'P'}
                        </div>
                        <span className="text-xs font-medium text-gray-700">
                            {authorName || 'Prompt Engneere'}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-400">
                            {formattedDate}
                        </span>
                    </div>
                    
                    <Link
                        href={`/prompts/${_id}`}
                        className="inline-flex items-center gap-1.5 text-amber-600 hover:text-amber-700 font-medium text-sm group/btn transition-colors duration-300"
                    >
                        Inside
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FeaturedPrompt;