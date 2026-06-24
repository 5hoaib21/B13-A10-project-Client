"use server";

import { serverDelete, serverMutation } from "../core/server";
import { getTokenServer } from "../getTokenServer";
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const addPrompt = async (data) => {
  return serverMutation(`/api/prompts`, data);
};

export const deletePrompt = async (id) => {
  return serverDelete(`/api/prompts/${id}`);
};

export const updatePrompt = async (id, data) => {
  try {
    const token = await getTokenServer();
    const res = await fetch(`${baseURL}/api/prompts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return { success: false, error: error.message };
  }
};

//details page interactions:
//for copy
export const incrementCopyCount = async (id) => {
  try {
    const token = await getTokenServer();
    const res = await fetch(`${baseURL}/api/prompts/${id}/copy`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const submitPromptReview = async (id, reviewData) => {
  try {
    const token = await getTokenServer();
    const res = await fetch(`${baseURL}/api/prompts/${id}/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reviewData),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const togglePromptBookmark = async (id) => {
  try {
    const token = await getTokenServer();
    const res = await fetch(`${baseURL}/api/prompts/${id}/bookmark`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const submitPromptReport = async (id, reportData) => {
  try {
    const token = await getTokenServer();
    const res = await fetch(`${baseURL}/api/prompts/${id}/report`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reportData),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return { success: false, error: error.message };
  }
};



export async function updatePromptStatusAction(promptId, newStatus) {
  const token = await getTokenServer();
  try {
    const res = await fetch(`${baseURL}/admin/prompts/status/${promptId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Failed to update prompt status",
      };
    }

    return {
      success: true,
      message: data.message || `Prompt ${newStatus} successfully!`,
    };
  } catch (error) {
    console.error("Error in updatePromptStatusAction:", error);
    return { success: false, message: "Internal Server Error" };
  }
}



export async function deletePromptAction(promptId) {
  const token = await getTokenServer();
  try {
    const res = await fetch(`${baseURL}/admin/prompts/${promptId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Failed to delete prompt from server",
      };
    }

    return {
      success: true,
      message: data.message || "Prompt deleted successfully!",
    };
  } catch (error) {
    console.error("Error in deletePromptAction:", error);
    return { success: false, message: "Internal Server Error" };
  }
}

