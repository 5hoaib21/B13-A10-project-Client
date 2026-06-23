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

