import React from 'react';

import { Bookmark, MessageSquare, Copy, Sparkles, TrendingUp, Compass, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { getUserAnalytics } from '@/lib/api/prompts';

export default async function UserDashboardHomePage() {
    
    const result = await getUserAnalytics();
    const analytics = result?.analytics || { totalBookmarks: 0, totalReviews: 0, totalCopies: 0 };
    const error = result?.success ? null : (result?.error || "Failed to load dashboard insights");


    const userSummary = [
        {
            title: "Bookmarked Prompts",
            value: analytics.totalBookmarks.toLocaleString(),
            desc: "Saved for quick access",
            icon: <Bookmark size={20} className="text-emerald-600" />,
            bgIcon: "bg-emerald-50/70 border-emerald-100/50",
        },
        {
            title: "Reviews Given",
            value: analytics.totalReviews.toLocaleString(),
            desc: "Feedback shared on tools",
            icon: <MessageSquare size={20} className="text-blue-600" />,
            bgIcon: "bg-blue-50/70 border-blue-100/50",
        },
        {
            title: "Copied Actions",
            value: analytics.totalCopies.toLocaleString(),
            desc: "Prompts used in projects",
            icon: <Copy size={20} className="text-purple-600" />,
            bgIcon: "bg-purple-50/70 border-purple-100/50",
        },
    ];

    return (
        <div className="bg-white text-zinc-900 py-6 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto space-y-8">
                
                {/* Error Box */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-2 text-sm">
                        <AlertCircle size={18} /> {error}
                    </div>
                )}

                {/* 👋 Welcome Header Module */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-100 pb-6">
                    <div className="space-y-1">
                        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-950 flex items-center gap-2">
                            Welcome to your Dashboard!
                            <span className="inline-block animate-bounce origin-bottom">⚡</span>
                        </h2>
                        <p className="text-sm text-zinc-500">
                            Explore your saved assets, platform interactions, and prompt usage history.
                        </p>
                    </div>

                    {/* Member Status Badge */}
                    <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200/60 rounded-xl px-3 py-1.5 text-xs font-semibold text-zinc-700 w-fit">
                        <Sparkles size={14} className="text-blue-500 fill-blue-400" />
                        Active Explorer Member
                    </div>
                </div>

                {/* 📊 Analytics Grid System */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {userSummary.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white border border-zinc-200/60 hover:border-zinc-300 rounded-2xl p-6 transition-all duration-300 hover:shadow-md group relative overflow-hidden"
                        >
                            <div className="flex items-start justify-between">
                                <div className="space-y-3">
                                    <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                                        {item.title}
                                    </p>
                                    <h3 className="text-3xl font-black tracking-tight text-zinc-950">
                                        {item.value}
                                    </h3>
                                </div>

                                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-transform duration-300 group-hover:rotate-6 ${item.bgIcon}`}>
                                    {item.icon}
                                </div>
                            </div>

                            <div className="mt-5 pt-4 border-t border-zinc-50 text-xs font-medium text-zinc-500 flex items-center gap-1">
                                <TrendingUp size={12} className="text-emerald-500" />
                                {item.desc}
                            </div>
                        </div>
                    ))}
                </div>

                {/* 🧭 Quick Action: Explore Marketplace Canvas */}
                <div className="bg-gradient-to-br from-zinc-50 to-zinc-100/50 rounded-3xl p-8 border border-zinc-200/60 flex flex-col items-center justify-center text-center py-12 space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center text-blue-600 shadow-xs">
                        <Compass size={22} className="animate-spin-slow" />
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-base font-bold text-zinc-900">
                            Ready to find more high-engineered prompts?
                        </h4>
                        <p className="text-xs text-zinc-500 max-w-sm mx-auto leading-relaxed">
                            Discover ultimate boilerplate templates, midjourney generation formulas, and ChatGPT workflows tailored for your needs.
                        </p>
                    </div>
                    <Link 
                        href="/prompts"
                        className="bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-all duration-200"
                    >
                        Browse Prompt Marketplace
                    </Link>
                </div>

            </div>
        </div>
    );
}