import { getTokenServer } from "../getTokenServer";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const getPrompts = async (page) => {
  if (!page) {
    page = 1;
  }
  const token = await getTokenServer();
  const res = await fetch(`${baseURL}/api/prompts?page=${page}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch prompts");
  }
  const data = await res.json();
  return data;
};

// export const getAllPrompts = async (search, status = 'approved') => {
//   const res = await fetch(`${baseURL}/prompts?search=${search}&status=${status}`);
//   if (!res.ok) {
//     throw new Error("Failed to fetch all prompts");
//   }
//   const data = await res.json();
//   return data;
// };

export const getAllPrompts = async ({
  search = "",
  status = "approved",
  category = "",
  aiTool = "",
  difficulty = "",
  sort = "latest",
} = {}) => {
  const params = new URLSearchParams();

  if (search) params.append("search", search);
  if (status) params.append("status", status);
  if (category) params.append("category", category);
  if (aiTool) params.append("aiTool", aiTool);
  if (difficulty) params.append("difficulty", difficulty);
  if (sort) params.append("sort", sort);

  const url = `${baseURL}/prompts?${params.toString()}`;
  console.log("📤 Fetching URL:", url); // 👈 URL দেখুন

  const res = await fetch(url);
  console.log("📡 Status:", res.status); // 👈 Status দেখুন

  if (!res.ok) {
    throw new Error("Failed to fetch all prompts");
  }

  const data = await res.json();
  console.log("📦 Data:", data?.length || 0); // 👈 Data দেখুন
  return data;
};

export const getPromptById = async (id) => {
  const res = await fetch(`${baseURL}/prompts/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch prompt by ID");
  }
  const data = await res.json();
  return data;
};


export const getMySavedPrompts = async () => {
  try {
    const token = await getTokenServer(); // ইউজার টোকেন নেওয়া হচ্ছে
    const res = await fetch(`${baseURL}/api/my-bookmarks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      next: { revalidate: 0 } // রিয়েল-টাইম ডাটা পাওয়ার জন্য ক্যাশিং অফ রাখা হলো
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return { success: false, error: error.message, data: [] };
  }
};
