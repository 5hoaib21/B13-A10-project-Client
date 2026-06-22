import { Plus, Terminal } from "lucide-react";
import Link from "next/link";

export const EmptyState = () => {
    return (
        <div className="bg-white border-2 border-dashed border-zinc-200/80 rounded-3xl p-12 text-center flex flex-col items-center justify-center max-w-lg mx-auto my-8 transition-colors duration-300 hover:border-zinc-300">
            <div className="w-12 h-12 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400 mb-4 shadow-xs">
                <Terminal size={22} />
            </div>
            <h3 className="text-base font-bold text-zinc-900 tracking-tight">No active prompts published</h3>
            <p className="text-xs text-zinc-400 mt-1 max-w-xs leading-relaxed">
                Your sandbox engine is clean. Build, optimize, and expose your AI asset parameters inside the community matrix.
            </p>
            <Link 
                href="/dashboard/add-prompt" 
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-white bg-zinc-900 hover:bg-zinc-800 transition-all px-4 py-2 rounded-xl shadow-xs cursor-pointer active:scale-95"
            >
                <Plus size={14} /> Create First Prompt
            </Link>
        </div>
    );
};