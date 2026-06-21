'use client'
import { authClient } from '@/lib/auth-client';
import React from 'react';
import { Sparkles, Terminal, Copy, Bookmark, TrendingUp, BarChart3, ArrowUpRight } from 'lucide-react';

const CreatorDashboardHomePage = () => {
    const { data: session, isPending } = authClient.useSession();
    
    if (isPending) {
        return (
            <div className="min-h-[60vh] mx-auto bg-white flex items-center justify-center">
                <div className="flex items-center gap-3 bg-zinc-50 border border-zinc-100 px-5 py-3 rounded-2xl shadow-xs">
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm font-medium text-zinc-600">Syncing creator account...</span>
                </div>
            </div>
        );
    }
    
    const user = session?.user;
    console.log('session data in creator page:', user);

    // 📊 Static Metrics Data Context Placeholder (Integrate backend array aggregations here)
    const analyticsSummary = [
        {
            title: "Total Prompts",
            value: "14",
            change: "+2 this week",
            icon: <Terminal size={20} className="text-blue-600" />,
            bgIcon: "bg-blue-50/70 border-blue-100/50"
        },
        {
            title: "Total Copies",
            value: "1,248",
            change: "+18.4% growth",
            icon: <Copy size={20} className="text-violet-600" />,
            bgIcon: "bg-violet-50/70 border-violet-100/50"
        },
        {
            title: "Total Bookmarks",
            value: "412",
            change: "Top 5% creator",
            icon: <Bookmark size={20} className="text-emerald-600" />,
            bgIcon: "bg-emerald-50/70 border-emerald-100/50"
        }
    ];

    return (
        <div className=" bg-white text-zinc-900 py-6 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto space-y-8">
                
                {/* 👋 Welcome Header Module */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-100 pb-6">
                    <div className="space-y-1">
                        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-950 flex items-center gap-2">
                            Welcome back, {user?.name || "Creator"}! 
                            <span className="inline-block animate-bounce origin-bottom">👋</span>
                        </h2>
                        <p className="text-sm text-zinc-500">
                            Monitor performance benchmarks, asset interactions, and user usage insights.
                        </p>
                    </div>

                    {/* Pro Account Status Chip */}
                    <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200/60 rounded-xl px-3 py-1.5 text-xs font-semibold text-zinc-700 w-fit">
                        <Sparkles size={14} className="text-amber-500 fill-amber-400" />
                        Verified Prompt Architect
                    </div>
                </div>

                {/* 📊 Analytics Dashboard Grid System */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {analyticsSummary.map((item, index) => (
                        <div 
                            key={index} 
                            className="bg-white border border-zinc-200/60 hover:border-zinc-300 rounded-2xl p-6 transition-all duration-300 hover:shadow-md group relative overflow-hidden"
                        >
                            <div className="flex items-start justify-between">
                                <div className="space-y-3">
                                    <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                                        {item.title}
                                    </p>
                                    <h3 className="text-3xl font-black tracking-tight text-zinc-950 transition-transform group-hover:scale-[1.01] duration-200">
                                        {item.value}
                                    </h3>
                                </div>
                                
                                {/* Status Layout Graphic Element */}
                                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-transform duration-300 group-hover:rotate-6 ${item.bgIcon}`}>
                                    {item.icon}
                                </div>
                            </div>

                            {/* Footer micro meta details */}
                            <div className="mt-5 pt-4 border-t border-zinc-50 flex items-center justify-between text-xs">
                                <span className="font-semibold text-zinc-500 flex items-center gap-1">
                                    <TrendingUp size={12} className="text-emerald-500" />
                                    {item.change}
                                </span>
                                <span className="text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                                    Insights <ArrowUpRight size={12} />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 📈 Placeholder Block: Activity Chart Canvas Area */}
                <div className="bg-zinc-50/50 rounded-3xl p-6 border border-zinc-100 flex flex-col items-center justify-center text-center py-12">
                    <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200/60 flex items-center justify-center text-zinc-400 mb-3 shadow-xs">
                        <BarChart3 size={18} />
                    </div>
                    <h4 className="text-sm font-bold text-zinc-800">Engagement Timelines Integration Area</h4>
                    <p className="text-xs text-zinc-400 max-w-xs mt-1 leading-relaxed">
                        Data flow matrix updates instantly when live copy signals trace active marketplace telemetry.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default CreatorDashboardHomePage;