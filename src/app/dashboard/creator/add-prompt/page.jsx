import AddPromptForm from '@/components/dashboard/AddPromptForm';
import React from 'react';
import { Sparkles, ArrowLeft, Zap, ArrowRight, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import { checkPromptLimitAction } from '@/lib/api/prompts';


export const dynamic = "force-dynamic";
export const revalidate = 0;

const AddPromptPage = async () => {
    const user = await getUserSession();
    if(!user){
        redirect('/signin');
    }

 
    const limitStatus = await checkPromptLimitAction();
    
    // এক্সপ্রেস থেকে আসা নিখুঁত true/false এবং প্রম্পট সংখ্যা
    const isLimitExceeded = limitStatus?.isLimitExceeded || false;
    const totalPrompts = limitStatus?.totalPrompts || 0;


    return (
        <div className="min-h-screen bg-white text-zinc-900 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                
                {/* 🧭 Top Breadcrumb */}
                <div className="flex items-center gap-2">
                    <Link 
                        href="/dashboard" 
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 transition-colors bg-zinc-50 hover:bg-zinc-100 px-3 py-1.5 rounded-xl cursor-pointer"
                    >
                        <ArrowLeft size={14} />
                        Back to Dashboard
                    </Link>
                </div>

                {/* 🎯 Header Section */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-zinc-100 pb-6">
                    <div className="space-y-1.5">
                        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-950 flex items-center gap-2.5">
                            <span className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                                <Sparkles size={18} className="fill-blue-50/50" />
                            </span>
                            Forge New AI Prompt
                        </h1>
                        <p className="text-sm text-zinc-500 max-w-xl">
                            Create and optimize high-quality prompt configurations.
                        </p>
                    </div>
                </div>

                {/* 🛠️ Dynamic UI Switcher - এই কন্ডিশন এখন এক্সপ্রেসের রিয়েল ডেটা দিয়ে পারফেক্টলি চলবে */}
                {isLimitExceeded ? (
                    /* 👑 প্রফেশনাল আপগ্রেড স্ক্রিন (লিমিট শেষ হলে ফর্ম ১০০% হাইড হয়ে যাবে) */
                    <div className="bg-gradient-to-br from-zinc-50 via-zinc-100/30 to-white rounded-3xl border border-zinc-200 p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-6 max-w-2xl mx-auto shadow-2xs">
                        <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-600 relative">
                            <ShieldAlert size={32} />
                            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                            </span>
                        </div>
                        
                        <div className="space-y-2">
                            <h3 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">
                                Prompt Creation Limit Reached
                            </h3>
                            <p className="text-sm text-zinc-500 max-w-md mx-auto leading-relaxed">
                                Free tier accounts are capped at <strong className="text-zinc-800">3 prompt blueprints</strong>. You have already published {totalPrompts} prompts to the live marketplace ecosystem.
                            </p>
                        </div>

                        <div className="p-4 bg-white border border-zinc-200/60 rounded-2xl w-full max-w-sm flex items-center justify-between text-xs font-medium text-zinc-600">
                            <span>Current Plan: <span className="text-zinc-900 font-bold">Free Tier</span></span>
                            <span>Usage: <span className="text-amber-600 font-bold">{totalPrompts} / 3 Used</span></span>
                        </div>

                        <Link 
                            href="/pricing" 
                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-md transition-all duration-200 group cursor-pointer"
                        >
                            <Zap size={16} className="fill-current text-amber-400" />
                            Upgrade to Premium
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                ) : (
                    /* 📝 লিমিটের ভেতরে থাকলে কেবল এই ফর্মটি স্ক্রিনে রেন্ডার হবে */
                    <div className="bg-white rounded-3xl border border-zinc-200/80 p-6 sm:p-8 shadow-xs hover:border-zinc-300/80 transition-all duration-300">
                        <AddPromptForm />
                    </div>
                )}

            </div>
        </div>
    );
};

export default AddPromptPage;