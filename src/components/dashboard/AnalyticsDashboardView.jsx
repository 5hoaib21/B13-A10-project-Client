"use client";

import React from "react";
import { Users, FileText, MessageSquare, Copy, TrendingUp, PieChart as PieIcon, DollarSign } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#006FEE", "#7828C8", "#17C964", "#F5A524", "#FF4ECD"];

export default function AnalyticsDashboardView({ stats, engineData }) {
  
  const distributionData = engineData.map(item => ({
    name: item.name,
    value: item.Prompts
  })).filter(item => item.value > 0);

  return (
    <>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        
        {/* TOTAL USERS */}
        <div className="p-4 bg-white border border-zinc-100 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Total Users</p>
            <h3 className="text-xl font-bold text-zinc-900 mt-1">{stats.totalUsers}</h3>
          </div>
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl"><Users size={18} /></div>
        </div>

        {/* TOTAL PROMPTS */}
        <div className="p-4 bg-white border border-zinc-100 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Total Prompts</p>
            <h3 className="text-xl font-bold text-zinc-900 mt-1">{stats.totalPrompts}</h3>
          </div>
          <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl"><FileText size={18} /></div>
        </div>

        {/* TOTAL REVIEWS */}
        <div className="p-4 bg-white border border-zinc-100 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Total Reviews</p>
            <h3 className="text-xl font-bold text-zinc-900 mt-1">{stats.totalReviews}</h3>
          </div>
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl"><MessageSquare size={18} /></div>
        </div>

        {/* TOTAL COPIES */}
        <div className="p-4 bg-white border border-zinc-100 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Total Copies</p>
            <h3 className="text-xl font-bold text-zinc-900 mt-1">{stats.totalCopies}</h3>
          </div>
          <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl"><Copy size={18} /></div>
        </div>

        {/* 💰 TOTAL REVENUE (নতুন যুক্ত করা হলো) */}
        <div className="p-4 bg-white border border-zinc-100 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Total Revenue</p>
            <h3 className="text-xl font-bold text-rose-600 mt-1">
              ${stats.totalRevenue?.toFixed(2) || "0.00"}
            </h3>
          </div>
          <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl"><DollarSign size={18} /></div>
        </div>

      </div>

      {/* 📊 চার্ট সেকশন */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ১. বার চার্ট (Engine Prompts Density vs Copies) */}
        <div className="lg:col-span-2 bg-white border border-zinc-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp size={16} className="text-zinc-500" />
            <h4 className="text-sm font-bold text-zinc-800">Engine Prompts Density vs Copies</h4>
          </div>
          
          <div className="w-full h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F4F4F5" />
                <XAxis dataKey="name" stroke="#A1A1AA" fontSize={12} tickLine={false} />
                <YAxis stroke="#A1A1AA" fontSize={12} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#ffffff", borderColor: "#E4E4E7", borderRadius: "12px" }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
                <Bar dataKey="Copies" fill="#006FEE" radius={[6, 6, 0, 0]} barSize={26} name="Total Copies" />
                <Bar dataKey="Prompts" fill="#7828C8" radius={[6, 6, 0, 0]} barSize={26} name="Total Prompts" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ২. ডোনাট পাই চার্ট (Prompt Distribution Share) */}
        <div className="bg-white border border-zinc-100 rounded-2xl p-5 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <PieIcon size={16} className="text-zinc-500" />
            <h4 className="text-sm font-bold text-zinc-800">Prompt Distribution Share</h4>
          </div>

          <div className="w-full h-[260px] flex-1 flex items-center justify-center">
            {distributionData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={distributionData} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={4} dataKey="value">
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "#ffffff", borderColor: "#E4E4E7", borderRadius: "12px" }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-xs text-zinc-400">No prompt share data available.</p>
            )}
          </div>

          {/* কাস্টম লিজেন্ড গাইড */}
          <div className="grid grid-cols-2 gap-2 pt-4 border-t border-zinc-50 text-xs">
            {distributionData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-1.5 text-zinc-600">
                <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                <span className="truncate">{entry.name} ({entry.value} prompts)</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}