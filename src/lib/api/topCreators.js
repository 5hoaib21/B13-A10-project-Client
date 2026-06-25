"use server";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getTopCreators() {
  try {
    const res = await fetch(`${baseURL}/api/top-creators`);

    if (!res.ok) {
      throw new Error(`Server status: ${res.status}`);
    }

    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    console.error("❌ Action Error in getTopCreators:", error.message);
    return [];
  }
}