export const dynamic = "force-dynamic";

import React from 'react';
import { Sparkles } from 'lucide-react';
import { promptManagementByAdmin } from '@/lib/api/prompts';
import AdminPromptTable from './AdminPromptTable';


const AllPromptPage = async () => {
    // এক্সপ্রেস থেকে সব প্রম্পট নিয়ে আসা হচ্ছে
    const prompts = await promptManagementByAdmin() || [];
    
    return (
        // ⚪ bg-zinc-950 বদলে bg-white বা bg-slate-50 এবং টেক্সট কালার লাইট করা হয়েছে
        <div className="min-h-screen bg-white text-zinc-800 p-6 sm:p-10">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* 🎯 Header block - বর্ডার এবং টেক্সট লাইট করা হয়েছে */}
                <div className="flex flex-col gap-1 border-b border-zinc-100 pb-6">
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-950 flex items-center gap-2.5">
                        <span className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                            <Sparkles size={18} />
                        </span>
                        Prompt Template Submissions Moderation
                    </h1>
                    <p className="text-sm text-zinc-500">
                        Approve templates, reject with feedback, or tag featured highlights.
                    </p>
                </div>

                {/* 📊 Moderation Table Component - ডার্ক ব্যাকগ্রাউন্ড সরিয়ে লাইট বর্ডার ও শ্যাডো দেওয়া হয়েছে */}
                <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-xs">
                    {prompts.length === 0 ? (
                        <div className="text-center py-12 text-zinc-400 text-sm">
                            No prompt templates submitted yet.
                        </div>
                    ) : (
                        <AdminPromptTable initialPrompts={prompts} />
                    )}
                </div>

            </div>
        </div>
    );
};

export default AllPromptPage;