import { usersManagementByAdmin } from '@/lib/api/prompts';
import React from 'react';
import { Users } from 'lucide-react';
import AdminUserTable from './AdminUserTable';

export const dynamic = "force-dynamic";

const AllUsersPage = async () => {
    // এক্সপ্রেস ব্যাকএন্ড থেকে সব ইউজার ডেটা নিয়ে আসা হচ্ছে
    const users = await usersManagementByAdmin() || [];
    
    return (
        <div className="min-h-screen bg-white text-zinc-800 p-6 sm:p-10">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* 🎯 হেডার ব্লক (হোয়াইট থিম ভাইব) */}
                <div className="flex flex-col gap-1 border-b border-zinc-100 pb-6">
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-950 flex items-center gap-2.5">
                        <span className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                            <Users size={18} />
                        </span>
                        User Role & Accounts Management
                    </h1>
                    <p className="text-sm text-zinc-500">
                        Review accounts, modify role scopes, and delete users dynamically.
                    </p>
                </div>

                {/* 📊 টেবিল কন্টেইনার */}
                <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-xs">
                    {users.length === 0 ? (
                        <div className="text-center py-12 text-zinc-400 text-sm">
                            No registered users found.
                        </div>
                    ) : (
                        <AdminUserTable initialUsers={users} />
                    )}
                </div>

            </div>
        </div>
    );
};

export default AllUsersPage;