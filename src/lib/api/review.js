"use server";

import { getAllPrompts } from "./prompts";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getPromptsWithReviews() {
  try {
    const prompts = await getAllPrompts();
    
    // ফিল্টার: যেসব প্রম্পটে reviews array আছে এবং খালি না
    const promptsWithReviews = prompts.filter(prompt => 
      prompt.reviews && 
      prompt.reviews.length > 0
    );
    
    return promptsWithReviews;
    
  } catch (error) {
    console.error("❌ Error fetching prompts with reviews:", error);
    return [];
  }
}

// নির্দিষ্ট প্রম্পটের রিভিউ fetch করা
export async function getPromptReviews(promptId) {
  try {
    const res = await fetch(`${baseURL}/prompts/${promptId}/reviews`, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      throw new Error(`Server status: ${res.status}`);
    }
    
    const data = await res.json();
    return data;
    
  } catch (error) {
    console.error("❌ Error fetching reviews:", error);
    return {
      success: false,
      error: error.message,
      reviews: [],
      totalReviews: 0,
      rating: 0
    };
  }
}