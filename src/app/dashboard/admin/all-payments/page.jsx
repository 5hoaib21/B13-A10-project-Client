export const dynamic = "force-dynamic";
import { paymentCollections } from '@/lib/api/payment';
import React from 'react';
import { CreditCard } from 'lucide-react';
import AdminPaymentTable from './AdminPaymentTable';


const AllPayments = async () => {
    // এক্সপ্রেস থেকে সব পেমেন্ট ট্রানজেকশন নিয়ে আসা হচ্ছে
    const subInfo = await paymentCollections() || [];
    
    return (
        // ⚪ bg-white এবং text-zinc-800 দিয়ে পুরো ব্যাকগ্রাউন্ড লাইট করা হয়েছে
        <div className="min-h-screen bg-white text-zinc-800 p-6 sm:p-10">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* 🎯 হেডার ব্লক - লাইট বর্ডার ও ডার্ক টেক্সট */}
                <div className="flex flex-col gap-1 border-b border-zinc-100 pb-6">
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-950 flex items-center gap-2.5">
                        <span className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                            <CreditCard size={18} />
                        </span>
                        Stripe Premium Payments Log
                    </h1>
                    <p className="text-sm text-zinc-500">
                        Comprehensive database of customer subscription transactions.
                    </p>
                </div>

                {/* 📊 ট্রানজেকশন টেবিল কন্টেইনার - সাদা ব্যাকগ্রাউন্ড ও হালকা শ্যাডো */}
                <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-xs">
                    {subInfo.length === 0 ? (
                        <div className="text-center py-12 text-zinc-400 text-sm">
                            No premium payment records found.
                        </div>
                    ) : (
                        <AdminPaymentTable initialPayments={subInfo} />
                    )}
                </div>

            </div>
        </div>
    );
};

export default AllPayments;