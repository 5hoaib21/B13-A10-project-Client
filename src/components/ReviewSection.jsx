import { getPromptReviews, getPromptsWithReviews } from '@/lib/api/review';
import { Star, User, Calendar, MessageCircle, Quote, Sparkles } from 'lucide-react';
import Marquee from 'react-fast-marquee';

const ReviewSection = async () => {
  const promptsWithReviews = await getPromptsWithReviews();
  

  const allReviews = [];
  promptsWithReviews.forEach(prompt => {
    if (prompt.reviews && prompt.reviews.length > 0) {
      prompt.reviews.forEach(review => {
        allReviews.push({
          ...review,
          promptTitle: prompt.title,
          promptCategory: prompt.category
        });
      });
    }
  });

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
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-3">
          <Sparkles size={14} />
          What Our Community Says
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Community Reviews
        </h2>
        <p className="text-gray-500">
          See what our community says about these prompts
        </p>
      </div>
  
      <div className="relative bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-2xl border border-gray-100 p-6 mb-8">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-blue-50 to-transparent z-10 rounded-l-2xl"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-blue-50 to-transparent z-10 rounded-r-2xl"></div>
        
        <Marquee
          gradient={false}
          speed={40}
          pauseOnHover={true}
          className="py-4"
        >
          {allReviews.map((review, index) => (
            <ReviewCard key={`marquee-${index}`} review={review} />
          ))}
        </Marquee>
      </div>

      {/* <div className="grid grid-cols-1 gap-8">
        {promptsWithReviews.map((prompt) => (
          <PromptReviewCard key={prompt._id} prompt={prompt} />
        ))}
      </div> */}
    </div>
  );
};

const ReviewCard = ({ review }) => {
  return (
    <div className="mx-3 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 w-[320px] hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-blue-200">
      {/* রেটিং */}
      <div className="flex items-center gap-1 mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            className={star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
          />
        ))}
        <span className="text-xs text-gray-400 ml-1">({review.rating})</span>
      </div>
      
      {/* রিভিউ টেক্সট */}
      <p className="text-sm text-gray-700 line-clamp-2 mb-3 h-10">
                        {review.comment}
      </p>
      
      {/* ইউজার ইনফো */}
      <div className="flex items-center justify-between border-t border-gray-100 pt-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
            {review.userName?.charAt(0) || 'U'}
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold text-gray-800">
              {review.userName || 'Anonymous'}
            </p>
            <p className="text-[10px] text-gray-400">
              {review.promptCategory || 'Prompt'}
            </p>
          </div>
        </div>
        <Quote size={14} className="text-blue-400 opacity-30" />
      </div>
    </div>
  );
};

// const PromptReviewCard = async ({ prompt }) => {
//   const { _id, title, description, category, image } = prompt;
  
//   // এই প্রম্পটের রিভিউ fetch করা
//   const reviewData = await getPromptReviews(_id);
//   const { reviews, totalReviews, rating } = reviewData;

//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
//       {/* প্রম্পট হেডার */}
//       <div className="p-6 border-b border-gray-100">
//         <div className="flex items-start justify-between">
//           <div>
//             <h3 className="text-xl font-bold text-gray-900 mb-1">
//               {title}
//             </h3>
//             <p className="text-gray-500 text-sm">{description}</p>
//           </div>
//           <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
//             {category}
//           </span>
//         </div>
        
//         {/* রেটিং সারাংশ */}
//         <div className="flex items-center gap-4 mt-3">
//           <div className="flex items-center gap-1">
//             <div className="flex items-center gap-0.5">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <Star 
//                   key={star} 
//                   size={16} 
//                   className={star <= Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
//                 />
//               ))}
//             </div>
//             <span className="text-sm font-semibold text-gray-700 ml-1">
//               {rating ? rating.toFixed(1) : '0.0'}
//             </span>
//           </div>
//           <span className="text-xs text-gray-400">
//             ({totalReviews} {totalReviews === 1 ? 'review' : 'reviews'})
//           </span>
//         </div>
//       </div>

//       {/* রিভিউ লিস্ট */}
//       <div className="p-6 space-y-4">
//         {reviews && reviews.length > 0 ? (
//           reviews.map((review, index) => (
//             <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
//               <div className="flex items-center justify-between mb-2">
//                 <div className="flex items-center gap-2">
//                   <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
//                     {review.userName?.charAt(0) || 'U'}
//                   </div>
//                   <span className="text-sm font-semibold text-gray-800">
//                     {review.userName || 'Anonymous'}
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <Star 
//                       key={star} 
//                       size={14} 
//                       className={star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
//                     />
//                   ))}
//                 </div>
//               </div>
//               <p className="text-sm text-gray-600">{review.comment}</p>
//               <p className="text-xs text-gray-400 mt-2">
//                 {new Date(review.createdAt).toLocaleDateString('en-US', {
//                   year: 'numeric',
//                   month: 'short',
//                   day: 'numeric'
//                 })}
//               </p>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-400 text-sm">No reviews yet</p>
//         )}
//       </div>
//     </div>
//   );
// };

export default ReviewSection;