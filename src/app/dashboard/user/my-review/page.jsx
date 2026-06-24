import React from 'react';
import Link from 'next/link';
import { Star, MessageSquare, ArrowRight, Calendar } from 'lucide-react';
import { getMyReviews } from '@/lib/api/prompts';

export default async function UserMyReviewPage() {
    
    const response = await getMyReviews();
    const myReviews = response?.data || [];

   
    const renderStars = (rating) => {
        return (
            <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        size={16}
                        className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
          
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-950 flex items-center gap-2">
                    <MessageSquare className="text-blue-600" size={24} />
                    My Given Reviews
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Manage and see all the feedback and ratings you've shared with the community.
                </p>
            </div>

            
            {myReviews.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                    <p className="text-gray-500 mb-4">You haven`t reviewed any prompts yet.</p>
                    <Link href="/prompts" className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition">
                        Explore Prompts & Share Feedback <ArrowRight size={16} />
                    </Link>
                </div>
            ) : (
                
                <div className="space-y-4">
                    {myReviews.map((review) => (
                        <div 
                            key={review._id} 
                            className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition duration-200 flex flex-col md:flex-row md:items-start justify-between gap-4"
                        >
                            <div className="space-y-2 flex-1">
                               
                                <div className="flex flex-wrap items-center gap-2 text-xs">
                                    <span className="font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full">
                                        {review.aiTool}
                                    </span>
                                    <span className="text-gray-400 capitalize">{review.category}</span>
                                    <span className="text-gray-300">|</span>
                                    <span className="text-gray-400 flex items-center gap-1">
                                        <Calendar size={12} />
                                        {new Date(review.reviewedAt).toLocaleDateString()}
                                    </span>
                                </div>

                                
                                <h3 className="text-lg font-bold text-gray-900 group">
                                    <Link href={`/prompts/${review._id}`} className="hover:text-blue-600 transition">
                                        {review.promptTitle}
                                    </Link>
                                </h3>

                               
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-150 mt-2">
                                    <div className="mb-2">
                                        {renderStars(review.myRating)}
                                    </div>
                                    <p className="text-sm text-gray-700 italic">
                                        "{review.myComment}"
                                    </p>
                                </div>
                            </div>

                           
                            <div className="flex md:self-center">
                                <Link 
                                    href={`/prompts/${review._id}`} 
                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-blue-600 border border-gray-200 bg-white px-3 py-2 rounded-xl shadow-sm hover:border-blue-200 transition"
                                >
                                    View Prompt
                                    <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}