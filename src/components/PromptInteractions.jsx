"use client";

import React, { useState } from "react";
import {
  Share2,
  Bookmark,
  Star,
  Send,
  MessageCircle,
  CopyCheck,
  BookmarkCheck,
  Lock, 
  Sparkles, // 💡 [UPDATE]: স্পার্কলস আইকন নিশ্চিত করার জন্য ইম্পোর্ট করা হয়েছে
} from "lucide-react";
import { toast } from "react-hot-toast";
import { MdReport } from "react-icons/md";
import {
  incrementCopyCount,
  submitPromptReview,
  togglePromptBookmark,
  submitPromptReport,
} from "@/lib/actions/prompts";
import { useRouter } from "next/navigation";
import Link from "next/link"; // 💡 [UPDATE]: আপগ্রেড লিংকের জন্য Link ইম্পোর্ট করা হয়েছে

import {
  Button,
  Input,
  Label,
  Modal,
  Select,
  ListBox,
  TextField,
} from "@heroui/react";

export default function PromptInteractions({
  promptId,
  promptContent,
  rating: initialRating,
  totalReviews,
  reviews,
  bookmarks = [],
  currentUserId,
  isLocked = false, 
  user,
}) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSaved, setIsSaved] = useState(bookmarks.includes(currentUserId));
  const [isLoading, setIsLoading] = useState(false);
  const [isReporting, setIsReporting] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportDescription, setReportDescription] = useState("");

  const router = useRouter();

  // 🎯 [UPDATE]: ইউজার প্রো প্ল্যানে আছে কি না তা যাচাই করার সহজ ভেরিয়েবল
  const isProUser = user?.plan === "pro";

  const renderStarsStatic = (num) => {
    const fullStars = Math.floor(num);
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < fullStars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  const handleCopy = async () => {
    if (isLocked) {
      toast.error("Premium Prompt! Please upgrade your plan to unlock.");
      return;
    }
    try {
      await navigator.clipboard.writeText(promptContent);
      toast.success("Prompt copied to clipboard!");

      const response = await incrementCopyCount(promptId);
      if (response.success) {
        console.log("📈 Copy count incremented in database");
        router.refresh();
      } else {
        console.error("⚠️ Failed to update copy count in DB:", response.error);
      }
    } catch (err) {
      toast.error("Failed to copy prompt.");
    }
  };

  const handleSaveToggle = async () => {
    if (isLocked) {
      toast.error("Saving private prompts requires a Pro plan.");
      return;
    }
    try {
      const response = await togglePromptBookmark(promptId);
      if (response.success) {
        setIsSaved(response.isSaved);
        if (response.isSaved) {
          toast.success("Added to your saved collections!");
        } else {
          toast.success("Removed from saved collections.");
        }
        router.refresh();
      } else {
        toast.error(response.error || "Failed to update bookmark. Make sure you are logged in.");
      }
    } catch (error) {
      console.error("❌ Bookmark error:", error);
      toast.error("Something went wrong!");
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    // 🎯 [UPDATE]: সিকিউরিটি গার্ড - ফ্রি ইউজার ডেভটুলস দিয়ে বাটন আনলক করলেও সাবমিট আটকে যাবে
    if (!isProUser) {
      toast.error("Writing reviews is a Pro feature.");
      return;
    }

    if (rating === 0) {
      toast.error("Please select a rating star first.");
      return;
    }

    setIsLoading(true);
    try {
      const reviewPayload = { rating, comment };
      const response = await submitPromptReview(promptId, reviewPayload);

      if (response.success) {
        toast.success("Review submitted successfully!");
        setComment("");
        setRating(0);
        router.refresh();
      } else {
        toast.error(response.error || "Failed to submit review. Make sure you are logged in.");
      }
    } catch (error) {
      console.error("❌ Error submitting review:", error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    if (!reportReason) {
      toast.error("Please select a reason for reporting.");
      return;
    }

    setIsReporting(true);
    try {
      const response = await submitPromptReport(promptId, {
        reason: reportReason,
        description: reportDescription,
      });

      if (response.success) {
        toast.success(response.message || "Report submitted successfully.");
        setReportReason("");
        setReportDescription("");
        setIsModalOpen(false);
      } else {
        toast.error(response.error || "Failed to submit report.");
      }
    } catch (error) {
      toast.error("Something went wrong. Failed to submit report.");
    } finally {
      setIsReporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 🚀 Action Buttons Grid */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleCopy}
          className={`flex-1 min-w-[120px] font-medium py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 active:scale-98 cursor-pointer ${
            isLocked
              ? "bg-zinc-100 text-zinc-400 cursor-not-allowed border border-zinc-200"
              : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg"
          }`}
        >
          {isLocked ? <Lock size={18} /> : <CopyCheck size={18} />}
          Copy Prompt
        </button>

        {/* 🎯 [UPDATE]: Report Button - ফ্রি ইউজার হলে এটি গ্লাসমরফিজম স্টাইলে লক থাকবে এবং মাউস হোভার করলে সুন্দর 'Pro Feature' টেক্সট দেখাবে */}
        {!isProUser ? (
          <div className="flex-1 min-w-[120px] relative border border-gray-200 bg-gray-50 text-gray-400 font-medium py-3 px-6 rounded-xl flex items-center justify-center gap-2 select-none overflow-hidden group">
            <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex items-center justify-center text-xs font-bold text-amber-600 gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Lock size={12} /> Pro Feature
            </div>
            <MdReport size={18} className="text-gray-300" />
            Report
          </div>
        ) : (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 min-w-[120px] bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-xl transition-all duration-300 border border-gray-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <MdReport size={18} className="text-red-500" />
            Report
          </button>
        )}

        <button
          onClick={handleSaveToggle}
          className={`flex-1 min-w-[120px] font-medium py-3 px-6 rounded-xl transition-all duration-300 border flex items-center justify-center gap-2 active:scale-98 cursor-pointer ${
            isLocked
              ? "bg-zinc-100 text-zinc-400 cursor-not-allowed border border-zinc-200"
              : isSaved
                ? "bg-indigo-50 border-indigo-200 text-indigo-600 font-semibold"
                : "bg-white hover:bg-zinc-50 text-zinc-700 border-zinc-200"
          }`}
        >
          {isLocked ? <Lock size={18} /> : isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
          {isSaved && !isLocked ? "Saved" : "Save"}
        </button>
      </div>

      {/* 🚀 NEW HEROUI REPORT MODAL */}
      <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
        <Modal.Backdrop>
          <Modal.Container placement="center">
            <Modal.Dialog className="sm:max-w-md bg-white p-6 rounded-2xl border border-gray-100 shadow-xl">
              <Modal.CloseTrigger onClick={() => setIsModalOpen(false)} />

              <Modal.Header>
                <Modal.Heading className="flex items-center gap-2 text-red-600 font-bold text-xl">
                  <MdReport size={24} /> Report Prompt
                </Modal.Heading>
                <p className="mt-1.5 text-sm leading-5 text-gray-500">
                  Help us understand what's wrong with this prompt.
                </p>
              </Modal.Header>

              <Modal.Body className="py-4">
                <form onSubmit={handleReportSubmit} className="flex flex-col gap-4">
                  <div className="w-full flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700">
                      Select Report Reason
                    </label>
                    <select
                      value={reportReason}
                      onChange={(e) => setReportReason(e.target.value)}
                      className="w-full border border-gray-200 bg-white rounded-xl py-2.5 px-3 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 12px center",
                        backgroundSize: "16px",
                      }}
                    >
                      <option value="" disabled className="text-gray-400">
                        Choose a reason
                      </option>
                      <option value="Inappropriate Content" className="text-gray-900 py-2">
                        Inappropriate Content
                      </option>
                      <option value="Spam" className="text-gray-900 py-2">
                        Spam
                      </option>
                      <option value="Copyright Violation" className="text-gray-900 py-2">
                        Copyright Violation
                      </option>
                      <option value="Other" className="text-gray-900 py-2">
                        Other
                      </option>
                    </select>
                  </div>
                  <TextField className="w-full" name="description" variant="secondary">
                    <Label className="text-sm font-medium text-gray-700">
                      Description (Optional)
                    </Label>
                    <Input
                      placeholder="Provide additional details or proof..."
                      value={reportDescription}
                      onChange={(e) => setReportDescription(e.target.value)}
                      className="w-full border border-gray-200 bg-white rounded-xl py-2 px-4 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </TextField>

                  <Modal.Footer className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-xl font-medium"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isReporting}
                      className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-sm"
                    >
                      {isReporting ? "Submitting..." : "Submit Report"}
                    </Button>
                  </Modal.Footer>
                </form>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>

      {/* 💬 Community Reviews Layout Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <MessageCircle size={20} className="text-blue-600" />
            Community Reviews
          </h3>
          <div className="flex items-center gap-2">
            {renderStarsStatic(initialRating)}
            <span className="text-xs text-gray-400">({totalReviews})</span>
          </div>
        </div>

        {/* 🎯 [UPDATE]: Interactive Form Area কন্টেইনারকে relative ও পজিশন দিয়ে ব্লার লেয়ার তৈরি করা হয়েছে */}
        <div className="relative border border-gray-200 rounded-xl overflow-hidden mb-5">
          
          {/* রিভিউ ফর্মের ভেতরের অংশ - ফ্রি ইউজার হলে blur-md ইফেক্ট পাবে */}
          <div className={`bg-gray-50 p-5 transition-all duration-300 ${!isProUser ? "blur-md pointer-events-none opacity-20 select-none" : ""}`}>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              Write a Review
            </h4>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Your Rating:</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      disabled={isLoading}
                      onClick={() => setRating(star)}
                      className="hover:scale-110 active:scale-95 transition-transform duration-150 focus:outline-none"
                    >
                      <Star
                        size={24}
                        className={`transition-colors duration-200 ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    </button>
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-700 ml-2">
                  {rating > 0 ? `${rating}.0` : "0.0"}
                </span>
              </div>

              <div>
                <textarea
                  value={comment}
                  disabled={isLoading}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write your review here. What worked? How did you test it?"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none text-sm outline-none"
                  rows="3"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <Send size={18} />
                {isLoading ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>

          {/* 🔒 [UPDATE]: ফ্রি ইউজারদের জন্য প্রিমিয়াম গ্লাস-ব্লার লক ওভারলে কার্ড উইজেট */}
          {!isProUser && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/10 backdrop-blur-[2px] p-4 text-center z-10 select-none">
              <div className="p-2 bg-white border border-zinc-100 rounded-xl shadow-md text-amber-600 mb-2 animate-pulse">
                <Lock size={16} className="stroke-[2.5]" />
              </div>
              <h4 className="text-xs font-bold text-gray-900 flex items-center justify-center gap-1">
                <Sparkles size={12} className="text-amber-500 fill-amber-500" />
                Unlock Ratings & Reviews
              </h4>
              <p className="text-[11px] text-gray-500 max-w-[240px] mt-1 leading-normal">
                Join our <span className="font-semibold text-zinc-900">Pro Membership</span> to rate blueprints and share your engineering feedback.
              </p>
              <Link
                href="/pricing"
                className="mt-2.5 px-3.5 py-1.5 text-[11px] font-bold text-white bg-zinc-950 rounded-xl hover:bg-zinc-800 transition-all shadow-sm active:scale-95 inline-block"
              >
                Upgrade to Pro
              </Link>
            </div>
          )}
        </div>

        {/* Reviews Iteration Layer */}
        {reviews && reviews.length > 0 ? (
          <div className="space-y-4 mb-6">
            {reviews.map((review, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                      {review.userName?.charAt(0) || "U"}
                    </div>
                    <span className="text-sm font-semibold text-gray-800">
                      {review.userName || "Anonymous"}
                    </span>
                  </div>
                  {renderStarsStatic(review.rating)}
                </div>
                <p className="text-sm text-gray-600">{review.comment}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 mb-6">
            <MessageCircle size={40} className="text-gray-300 mx-auto mb-2" />
            <p className="text-gray-400 text-sm">
              No reviews yet. Be the first to review!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}