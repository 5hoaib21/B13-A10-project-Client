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
} from "lucide-react";
import { toast } from "react-hot-toast";
import { MdReport } from "react-icons/md";
import { incrementCopyCount, submitPromptReview } from "@/lib/actions/prompts";
import { useRouter } from "next/navigation";

export default function PromptInteractions({
  promptId,
  promptContent,
  rating: initialRating,
  totalReviews,
  reviews,
}) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // ✅ isLoading স্টেট যোগ করা হলো

  const router = useRouter();

  // Helper static stars calculation (✅ পুনরায় যোগ করা হলো)
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

  // Copy Template Functionality
  const handleCopy = async () => {
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

  const handleSaveToggle = () => {
    const nextSavedState = !isSaved;
    setIsSaved(nextSavedState);

    if (nextSavedState) {
      toast.success("Added to your saved collections!");
    } else {
      toast.success("Removed from saved collections.");
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating star first.");
      return;
    }
    
    setIsLoading(true); 

    try {
      const reviewPayload = {
        rating,
        comment
      };

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

  return (
    <div className="space-y-6">
      {/* 🚀 Action Buttons Grid */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleCopy}
          className="flex-1 min-w-[120px] bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-98"
        >
          <CopyCheck size={18} />
          Copy Prompt
        </button>
        <button className="flex-1 min-w-[120px] bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-xl transition-all duration-300 border border-gray-200 flex items-center justify-center gap-2">
          <MdReport size={18} />
          Report
        </button>
        <button
          onClick={handleSaveToggle}
          className={`flex-1 min-w-[120px] font-medium py-3 px-6 rounded-xl transition-all duration-300 border flex items-center justify-center gap-2 active:scale-98 cursor-pointer ${
            isSaved
              ? "bg-indigo-50 border-indigo-200 text-indigo-600 font-semibold"
              : "bg-white hover:bg-zinc-50 text-zinc-700 border-zinc-200"
          }`}
        >
          {isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
          {isSaved ? "Saved" : "Save"}
        </button>
      </div>

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

          {/* 🌟 Interactive Form Area */}
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 mb-5">
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
                      className={`transition-colors duration-200 ${
                        star <= rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-sm font-bold text-gray-700 ml-2">
                {rating > 0 ? `${rating}.0` : "0.0"}
              </span>
            </div>

            <div className="">
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

        {/* Reviews Iteration Layer */}
        {reviews && reviews.length > 0 ? (
          <div className="space-y-4 mb-6">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-4 border border-gray-100"
              >
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