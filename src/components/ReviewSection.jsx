import { getPromptReviews } from '@/lib/api/review';
import React from 'react';

const ReviewSection = async () => {
    const reviews = await getPromptReviews()
    console.log('reviews: ',reviews);
    return (
        <div>
            ReviewSection
        </div>
    );
};

export default ReviewSection;