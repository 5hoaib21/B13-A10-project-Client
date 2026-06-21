import AddPromptForm from '@/components/dashboard/AddPromptForm';
import React from 'react';
import { Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const AddPromptPage = () => {
    return (
        <div className="min-h-screen bg-white text-zinc-900 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                
                {/* 🧭 Top Breadcrumb / Nav Link */}
                <div className="flex items-center gap-2">
                    <Link 
                        href="/dashboard" 
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 transition-colors bg-zinc-50 hover:bg-zinc-100 px-3 py-1.5 rounded-xl cursor-pointer"
                    >
                        <ArrowLeft size={14} />
                        Back to Dashboard
                    </Link>
                </div>

                {/* 🎯 Header Section Layout */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-zinc-100 pb-6">
                    <div className="space-y-1.5">
                        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-950 flex items-center gap-2.5">
                            <span className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                                <Sparkles size={18} className="fill-blue-50/50" />
                            </span>
                            Forge New AI Prompt
                        </h1>
                        <p className="text-sm text-zinc-500 max-w-xl">
                            Create and optimize high-quality prompt configurations. Fill in the structural metadata below to publish onto the community marketplace.
                        </p>
                    </div>

                    {/* Quick Info Chip */}
                    <div className="hidden sm:flex items-center gap-2 bg-zinc-50 border border-zinc-200/60 rounded-xl px-4 py-2 text-xs font-medium text-zinc-600 h-fit w-fit">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Prompt Sandbox Active
                    </div>
                </div>

                {/* 🛠️ Dynamic Add Form Container Context Wrapper */}
                <div className="bg-white rounded-3xl border border-zinc-200/80 p-6 sm:p-8 shadow-xs hover:border-zinc-300/80 transition-all duration-300">
                    <AddPromptForm />
                </div>

                {/* 💡 Creator Policy Tip Box */}
                <div className="bg-zinc-50/50 rounded-2xl p-4 border border-zinc-100 flex gap-3 items-start">
                    <div className="text-amber-600 mt-0.5 text-sm font-bold">💡</div>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                        <strong className="text-zinc-700 font-semibold">Pro-tip:</strong> Make sure to specify clear instructions and placeholder parameters (e.g., <code className="bg-zinc-100 text-zinc-800 px-1 py-0.5 rounded-sm font-mono text-[11px]">[topic]</code>) in your prompt content to make it easier for community members to run and evaluate successfully!
                    </p>
                </div>

            </div>
        </div>
    );
};

export default AddPromptPage;