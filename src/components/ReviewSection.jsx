
import { getPromptReviews, getPromptsWithReviews } from '@/lib/api/review';
import { Star, User, Calendar, MessageCircle } from 'lucide-react';

const ReviewSection = async () => {
  // শুধু রিভিউ থাকা প্রম্পটগুলো fetch করা
  const promptsWithReviews = await getPromptsWithReviews();
  
  console.log('Prompts with reviews:', promptsWithReviews);

  if (!promptsWithReviews || promptsWithReviews.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
        <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500 text-lg font-medium">No reviews yet</p>
        <p className="text-gray-400 text-sm">Be the first to share your experience!</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Community Reviews
        </h2>
        <p className="text-gray-500">
          See what our community says about these prompts
        </p>
      </div>

      {/* সকল প্রম্পটের রিভিউ দেখানো */}
      <div className="grid grid-cols-1 gap-8">
        {promptsWithReviews.map((prompt) => (
          <PromptReviewCard key={prompt._id} prompt={prompt} />
        ))}
      </div>
    </div>
  );
};

// Prompt Review Card কম্পোনেন্ট
const PromptReviewCard = async ({ prompt }) => {
  const { _id, title, description, category, image } = prompt;
  
  // এই প্রম্পটের রিভিউ fetch করা
  const reviewData = await getPromptReviews(_id);
  const { reviews, totalReviews, rating } = reviewData;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* প্রম্পট হেডার */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {title}
            </h3>
            <p className="text-gray-500 text-sm">{description}</p>
          </div>
          <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
            {category}
          </span>
        </div>
        
        {/* রেটিং সারাংশ */}
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  size={16} 
                  className={star <= Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-700 ml-1">
              {rating ? rating.toFixed(1) : '0.0'}
            </span>
          </div>
          <span className="text-xs text-gray-400">
            ({totalReviews} {totalReviews === 1 ? 'review' : 'reviews'})
          </span>
        </div>
      </div>

      {/* রিভিউ লিস্ট */}
      <div className="p-6 space-y-4">
        {reviews && reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                    {review.userName?.charAt(0) || 'U'}
                  </div>
                  <span className="text-sm font-semibold text-gray-800">
                    {review.userName || 'Anonymous'}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      size={14} 
                      className={star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600">{review.comment}</p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(review.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 text-sm">No reviews yet</p>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;