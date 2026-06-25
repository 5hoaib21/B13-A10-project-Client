import "server-only";
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

export const getAllPrompts = async ({search = "",status = "approved", category = "", aiTool = "",difficulty = "",sort = "latest",} = {}) => {
   const params = new URLSearchParams();

  if (search) params.append("search", search);
  if (status) params.append("status", status);
  if (category) params.append("category", category);
  if (aiTool) params.append("aiTool", aiTool);
  if (difficulty) params.append("difficulty", difficulty);
  if (sort) params.append("sort", sort);

  const url = `${baseURL}/prompts?${params.toString()}`;
  // console.log("📤 Fetching URL:", url);

  const res = await fetch(url);
  // console.log("📡 Status:", res.status);
  if (!res.ok) {
    throw new Error("Failed to fetch all prompts");
  }

  const data = await res.json();
  // console.log("📦 Data:", data?.length || 0);
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


export const checkPromptLimitAction = async () => {
  try {
    const token = await getTokenServer();
    if (!token) return { isLimitExceeded: false, totalPrompts: 0 };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5005"}/api/my-profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      next: { revalidate: 0 }
    });

    if (!res.ok) return { isLimitExceeded: false, totalPrompts: 0 };

    const result = await res.json();
    if (result.success) {
      const plan = result.data?.plan?.toLowerCase() || "free";
      const totalPrompts = result.data?.totalPrompts || 0;
      const isPremium = plan === "pro" || plan === "premium";

      return {
        isLimitExceeded: !isPremium && totalPrompts >= 3,
        totalPrompts
      };
    }
    return { isLimitExceeded: false, totalPrompts: 0 };
  } catch (error) {
    console.error("Error in checkPromptLimitAction:", error);
    return { isLimitExceeded: false, totalPrompts: 0 };
  }
};

export const getMySavedPrompts = async () => {
  try {
    const token = await getTokenServer();
    const res = await fetch(`${baseURL}/api/my-bookmarks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      next: { revalidate: 0 },
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return { success: false, error: error.message, data: [] };
  }
};

export const getMyReviews = async () => {
  try {
    const token = await getTokenServer();
    const res = await fetch(`${baseURL}/api/my-reviews`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      next: { revalidate: 0 },
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return { success: false, error: error.message, data: [] };
  }
};

// const getTokenServer = async () => {
//   const cookieStore = await cookies();
//   return cookieStore.get("token")?.value;
// };

export const getMyProfile = async () => {
  try {
    const token = await getTokenServer();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000"}/api/my-profile`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        next: { revalidate: 0 },
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      return {
        success: false,
        error: errorData.error || "Failed to fetch profile",
      };
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("❌ Error in getMyProfile action:", error);
    return {
      success: false,
      error: "Something went wrong connection to server.",
    };
  }
};

export const getCreatorAnalytics = async () => {
  try {
    const token = await getTokenServer();

    if (!token) {
      return { success: false, error: "Token not found. Please login again." };
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000"}/api/creator-analytics`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        next: { revalidate: 0 },
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      return {
        success: false,
        error: errorData.error || "Failed to fetch analytics",
      };
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("❌ Error in getCreatorAnalytics action:", error);
    return {
      success: false,
      error: "Something went wrong connecting to server.",
    };
  }
};

export const getUserAnalytics = async () => {
  try {
    const token = await getTokenServer();

    if (!token) {
      return { success: false, error: "Token not found. Please login again." };
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000"}/api/user-analytics`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        next: { revalidate: 0 },
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      return {
        success: false,
        error: errorData.error || "Failed to fetch user analytics",
      };
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("❌ Error in getUserAnalytics action:", error);
    return {
      success: false,
      error: "Something went wrong connecting to server.",
    };
  }
};


export const promptManagementByAdmin = async () => {
  try {
    const token = await getTokenServer()

    const res = await fetch(`${baseURL}/admin/prompts`, {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`
      }

    })
    if(!res.ok){
      throw new Error("Failed to fetch all prompt");
    }
    const data = await res.json()
    return data;
  } catch (error) {
    return { success: false, error: error.message };
  }
};


export const usersManagementByAdmin = async () => {
  try {
    const token = await getTokenServer()

    const res = await fetch(`${baseURL}/admin/users`, {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`
      }

    })
    if(!res.ok){
      throw new Error("Failed to fetch all prompt");
    }
    const data = await res.json()
    return data;
  } catch (error) {
    return { success: false, error: error.message };
  }
};



export async function getFeaturedPrompts() {
    try {
        const res = await fetch(`${baseURL}/prompts/featured`, {
            cache: 'no-store'
        });
        
        if (!res.ok) {
            throw new Error(`Server status: ${res.status}`);
        }
        
        const data = await res.json();
        
        // ✅ ডেটা চেক করা - array নাকি object
        if (Array.isArray(data)) {
            return data;
        } else if (data?.prompts && Array.isArray(data.prompts)) {
            return data.prompts;
        } else if (data?.data && Array.isArray(data.data)) {
            return data.data;
        } else {
            // যদি ডেটা array না হয়, তাহলে খালি array return
            return [];
        }
        
    } catch (error) {
        console.error("❌ Error fetching featured prompts:", error);
        return [];
    }
}
