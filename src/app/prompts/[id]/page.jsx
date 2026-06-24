import { getPromptById } from "@/lib/api/prompts";
import {
  Clock,
  User,
  Star,
  ArrowLeft,
  Eye,
  Award,
  Tag,
  Sparkles,
  CopyCheck,
  Lock, // 💡 [UPDATE]: লক আইকন ইম্পোর্ট করা হয়েছে
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PromptInteractions from "@/components/PromptInteractions";
import { getUserSession } from "@/lib/core/session";

export default async function PromptDetailsPage({ params }) {
  const user = await getUserSession();
  console.log("user: ", user);
  const { id } = await params;
  const prompt = await getPromptById(id);

  if (!prompt)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Prompt not found.
      </div>
    );

  const {
    title,
    description,
    content,
    category,
    aiTool,
    difficulty,
    tags,
    image,
    copyCount,
    status,
    visibility,
    createdAt,
    rating = 0,
    totalReviews = 0,
    reviews = [],
  } = prompt;

  // 🎯 [UPDATE START]: প্রো মেম্বারশিপ লক কন্ডিশনাল লজিক
  // যদি প্রম্পটটি "private" হয় এবং ইউজারের plan "pro" না হয় (বা ইউজার লগইন না থাকে)
  const isLocked = visibility === "private" && user?.plan !== "pro";

  // সিকিউরিটি প্রোটেকশন: লক থাকলে ক্লায়েন্ট সাইডে আসল content-এর বদলে ডামি টেক্সট পাঠানো হচ্ছে, যেন ডাটা লিক না হয়
  const safeContent = isLocked
    ? "This content is locked. Please upgrade to a Pro plan to view the full prompt blueprint."
    : content;
  // 🎯 [UPDATE END]

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const difficultyConfig = {
    beginner: {
      label: "Beginner",
      color: "bg-emerald-100 text-emerald-700 border-emerald-200",
    },
    intermediate: {
      label: "Intermediate",
      color: "bg-amber-100 text-amber-700 border-amber-200",
    },
    advanced: {
      label: "Advanced",
      color: "bg-rose-100 text-rose-700 border-rose-200",
    },
  };

  const tagList = Array.isArray(tags)
    ? tags
    : typeof tags === "string"
      ? tags.split(",").map((tag) => tag.trim())
      : [];

  const renderServerStars = (ratingNum) => {
    const fullStars = Math.floor(ratingNum);
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={
              i < fullStars
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/prompts"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-300 mb-6 group"
        >
          <ArrowLeft
            size={20}
            className="transform group-hover:-translate-x-1 transition-transform duration-300"
          />
          <span className="font-medium">Back to Prompts</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="relative w-full h-64 bg-gradient-to-r from-blue-500 to-purple-600">
                {image ? (
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Sparkles className="text-white w-20 h-20 opacity-50" />
                  </div>
                )}

                <div className="absolute top-4 right-4 flex gap-2">
                  {/* 💡 [UPDATE]: প্রম্পটটি প্রাইভেট ও লক হলে একটি প্রিমিয়াম ট্যাগ ব্যাজ দেখাবে */}
                  {isLocked && (
                    <span className="px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm bg-amber-500 text-white shadow-lg flex items-center gap-1">
                      <Lock size={12} /> Pro Exclusive
                    </span>
                  )}
                  <span
                    className={`px-4 py-2 rounded-full text-xs font-semibold backdrop-blur-sm bg-white/90 shadow-lg ${
                      status === "pending"
                        ? "text-orange-600"
                        : status === "approved"
                          ? "text-green-600"
                          : "text-red-600"
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4">
                  <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-800 text-sm font-bold rounded-full shadow-lg">
                    {category.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                  {title}
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  {description}
                </p>

                {/* 🎯 [UPDATE]: প্রম্পট বক্স কন্টেইনার - লক থাকলে রিলেটিভ পজিশন ও সিলেকশন অফ করার জন্য ক্লাস ডাইনামিক করা হয়েছে */}
                {/* 🎯 [UPDATE]: এখানে min-h কে ডাইনামিক করা হয়েছে। লক থাকলে min-h-[185px] থাকবে যাতে ভেতরের লক উইজেট কেটে না যায় এবং গ্লাস ইফেক্ট সুন্দর লাগে। লক না থাকলে স্বাভাবিক নিয়মে min-h-0 বা h-auto হয়ে যাবে */}
                <div
                  className={`relative bg-gray-50 rounded-xl p-5 border border-gray-200 mb-4 overflow-hidden transition-all duration-300 ${isLocked ? "min-h-[185px] select-none" : ""}`}
                >
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    Prompt Template
                  </h3>

                  {/* 🎯 [UPDATE]: ব্লার ইফেক্ট ফিরিয়ে আনা হয়েছে (blur-md) এবং টেক্সট অপাসিটি হালকা রাখা হয়েছে */}
                  <p
                    className={`text-gray-600 text-sm leading-relaxed font-mono whitespace-pre-wrap transition-all duration-300 ${isLocked ? "blur-md pointer-events-none opacity-30 select-none" : ""}`}
                  >
                    {safeContent}
                  </p>

                  {/* 🔒 লকড ওভারলে সেকশন */}
                  {isLocked && (
                    // 💡 [UPDATE]: bg-white/20 এবং backdrop-blur-md একসাথে দেওয়া হয়েছে যাতে আসল প্রিমিয়াম গ্লাস লুক (Blurry Effect) ফিরে আসে এবং ব্যাকগ্রাউন্ড কেটে না যায়
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/0.5 backdrop-blur-md p-4 text-center z-10 select-none">
                      {/* আইকন বক্স */}
                      <div className="p-2 bg-white/80 border border-zinc-200/50 rounded-xl shadow-sm text-amber-600 mb-1.5 animate-pulse">
                        <Lock size={16} className="stroke-[2.5]" />
                      </div>

                      {/* হেডার */}
                      <h4 className="text-xs font-bold text-gray-900 flex items-center justify-center gap-1">
                        <Sparkles
                          size={12}
                          className="text-amber-500 fill-amber-500"
                        />
                        Unlock Private Blueprint
                      </h4>

                      {/* ডেসক্রিপশন */}
                      <p className="text-[11px] text-gray-500 max-w-[250px] mt-1 leading-normal">
                        Upgrade to a{" "}
                        <span className="font-semibold text-zinc-900">
                          Pro Plan
                        </span>{" "}
                        to view, copy, and forge this high-engineered pipeline.
                      </p>

                      {/* বাটন */}
                      <Link
                        href="/pricing"
                        className="mt-2.5 px-3.5 py-1.5 text-[11px] font-bold text-white bg-zinc-950 rounded-xl hover:bg-zinc-800 transition-all shadow-sm active:scale-95 inline-block"
                      >
                        Upgrade to Pro
                      </Link>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {tagList.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100"
                    >
                      <Tag size={12} />#{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <PromptInteractions
              promptId={prompt._id}
              promptContent={content}
              rating={rating}
              totalReviews={totalReviews}
              reviews={reviews}
              currentUserId={prompt.userId}
              isLocked={isLocked} // 💡 [UPDATE]: ক্লায়েন্ট কম্পোনেন্টে লকিং ফ্ল্যাগ পাস করা হলো
              user={user}
            />
          </div>

          {/* Right Grid Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Prompt Details
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl border border-purple-100">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-purple-600" />
                    <span className="text-sm text-gray-600">AI Engine</span>
                  </div>
                  <span className="text-sm font-semibold text-purple-700">
                    {aiTool.toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-2">
                    <Award size={16} className="text-gray-600" />
                    <span className="text-sm text-gray-600">Difficulty</span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${difficultyConfig[difficulty]?.color || "bg-gray-100"}`}
                  >
                    {difficultyConfig[difficulty]?.label || "Intermediate"}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-2">
                    <CopyCheck size={16} className="text-gray-600" />
                    <span className="text-sm text-gray-600">Copies Made</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-800">
                    {copyCount}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gray-600" />
                    <span className="text-sm text-gray-600">Created</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {formattedDate}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-2">
                    <Eye size={16} className="text-gray-600" />
                    <span className="text-sm text-gray-600">Visibility</span>
                  </div>
                  {/* 💡 [UPDATE]: কন্ডিশনাল টেক্সট কালার দেওয়া হয়েছে ভিজিবিলিটিতে */}
                  <span
                    className={`text-sm font-semibold capitalize ${visibility === "private" ? "text-amber-600" : "text-green-600"}`}
                  >
                    {visibility}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    Community Rating
                  </span>
                  <div className="flex items-center gap-2">
                    {renderServerStars(rating)}
                    <span className="text-sm font-bold text-gray-700">
                      {rating.toFixed(1)}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 text-right">
                  Based on {totalReviews} reviews
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Prompt Engineer
                    </p>
                    <p className="text-xs text-gray-400">creator@aiverse.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
