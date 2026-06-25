"use server";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getPromptReviews(promptId) {
  try {
    // 🎯 [HARDCODED TEST]: এনভায়রনমেন্ট ভেরিয়েবল বাদে ডিরেক্ট আইপি দিয়ে টেস্ট
    const fullUrl = `${baseURL}/prompts/${promptId}/reviews`;
    
    console.log("🚀 Server is trying to hit:", fullUrl);

    const res = await fetch(fullUrl, {
      cache: "no-store",
    });
    
    if (!res.ok) {
      throw new Error(`Server status: ${res.status}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error("❌ Action Error details:", error.message);
    return { success: false, error: error.message, reviews: [] };
  }
}