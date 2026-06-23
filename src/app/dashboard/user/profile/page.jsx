import React from "react";
import { User, Mail, Shield, Zap, Terminal, AlertCircle } from "lucide-react";
import { getMyProfile } from "@/lib/api/prompts";

export default async function UserProfilePage() {
  const response = await getMyProfile();
  const profile = response?.data;
  console.log("profile:", profile);

  // যদি কোনো কারণে ডাটা লোড না হয়
  if (!response?.success || !profile) {
    return (
      <div className="p-6 max-w-xl mx-auto mt-10">
        <div className="bg-red-50 border border-red-200 text-red-700 p-5 rounded-2xl flex items-center gap-3 shadow-sm">
          <AlertCircle size={24} className="shrink-0" />
          <div>
            <h3 className="font-bold">Failed to load profile</h3>
            <p className="text-sm opacity-90">
              {response?.error || "Please make sure you are logged in."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ইমেজ যদি ফাঁকা বা ইনভ্যালিড হয় তার জন্য একটা ডিফল্ট ফলব্যাক ইউআরএল
  const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  const userImage =
    profile.image && profile.image.startsWith("http")
      ? profile.image
      : defaultAvatar;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* 🎯 পেজ হেডার */}
      <div>
        <h1 className="text-2xl font-bold text-gray-950">My Profile</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Manage your account details and view your platform statistics.
        </p>
      </div>

      {/* 👤 মেইন প্রোফাইলカード */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* বাম পাশের কার্ড: প্রোফাইল ফটো এবং প্ল্যান */}
        <div className="md:col-span-1 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
          <div className="relative">
            {profile.image ? (
              <img
                src={userImage}
                alt={profile.name}
                className="w-28 h-28 rounded-full object-cover border-4 border-gray-50 shadow-md"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold border-4 border-gray-50 shadow-md">
                {profile.name?.charAt(0).toUpperCase()}
              </div>
            )}

            {/* সাবস্ক্রিপশন ব্যাজ */}
            <span
              className={`absolute bottom-1 right-1 p-1.5 rounded-full shadow-md text-white ${
                profile.plan === "pro" || profile.plan === "premium"
                  ? "bg-gradient-to-r from-amber-500 to-orange-500"
                  : "bg-gray-400"
              }`}
            >
              <Zap size={14} className="fill-current" />
            </span>
          </div>

          <div className="space-y-1.5 w-full">
            <h2 className="text-xl font-bold text-gray-900 line-clamp-1">
              {profile.name}
            </h2>

            {/* Subscription Status */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm border">
              {profile.plan === "pro" || profile.plan === "premium" ? (
                <span className="bg-amber-50 text-amber-700 border-amber-200 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  Premium User
                </span>
              ) : (
                <span className="bg-gray-50 text-gray-600 border-gray-200 flex items-center gap-1">
                  Free Account
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ডান পাশের কার্ড: ডিটেইলস এবং স্ট্যাটস */}
        <div className="md:col-span-2 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* নাম */}
            <div className="flex items-center gap-3.5 p-3.5 bg-gray-50 rounded-xl border border-gray-100">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
                <User size={20} />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Full Name
                </p>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">
                  {profile.name}
                </p>
              </div>
            </div>

            {/* ইমেইল */}
            <div className="flex items-center gap-3.5 p-3.5 bg-gray-50 rounded-xl border border-gray-100">
              <div className="p-2.5 bg-green-50 text-green-600 rounded-lg">
                <Mail size={20} />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Email Address
                </p>
                <p className="text-sm font-semibold text-gray-800 mt-0.5 truncate">
                  {profile.email}
                </p>
              </div>
            </div>

            {/* অ্যাকাউন্ট রোল */}
            <div className="flex items-center gap-3.5 p-3.5 bg-gray-50 rounded-xl border border-gray-100">
              <div className="p-2.5 bg-purple-50 text-purple-600 rounded-lg">
                <Shield size={20} />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Account Role
                </p>
                <p className="text-sm font-semibold text-gray-800 mt-0.5 capitalize">
                  {profile.role}
                </p>
              </div>
            </div>

            {/* Total Prompts Card Grid */}
            <div className="flex items-center gap-3.5 p-3.5 bg-gray-50 rounded-xl border border-gray-100">
              <div className="p-2.5 bg-orange-50 text-orange-600 rounded-lg">
                <Terminal size={20} />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Total Prompts
                </p>
                {/* 🚀 update selector checks database response layer value */}
                <p className="text-sm font-extrabold text-gray-950 mt-0.5">
                  {profile.totalPrompts || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-400">
            <p>
              Account status:{" "}
              <span className="text-green-500 font-semibold">Active</span>
            </p>
            <p>Thank you for being part of our prompt community!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
