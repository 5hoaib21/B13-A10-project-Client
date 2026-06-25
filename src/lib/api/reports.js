"use server";

import { getTokenServer } from "../getTokenServer";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getReportsAction() {
  const token = await getTokenServer();
  try {
    const url = `${baseURL}/admin/reports`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
      next: { revalidate: 0 }
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`❌ Backend returned status ${res.status}:`, errorText.slice(0, 200));
      return [];
    }

    const data = await res.json();
    return data.data || [];

  } catch (error) {
    console.error("❌ Error in getReportsAction:", error.message);
    return [];
  }
}

export async function removeReportedPromptAction(reportId, promptId) {
  try {
    const token = await getTokenServer();
    const res = await fetch(`${baseURL}/admin/reports/remove-prompt`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ reportId, promptId }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || "Failed to remove prompt." };
    }

    return { success: true, message: data.message || "Prompt removed and report cleared!" };
  } catch (error) {
    console.error("Error in removeReportedPromptAction:", error);
    return { success: false, message: "Internal Server Error" };
  }
}

export async function warnCreatorAction(creatorEmail, reportId) {
  try {
    const token = await getTokenServer();
    const res = await fetch(`${baseURL}/admin/reports/warn-creator`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ creatorEmail, reportId }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || "Failed to send warning." };
    }

    return { success: true, message: data.message || "Warning sent to creator!" };
  } catch (error) {
    console.error("Error in warnCreatorAction:", error);
    return { success: false, message: "Internal Server Error" };
  }
}

export async function dismissReportAction(reportId) {
  const token = await getTokenServer();
  try {
    const res = await fetch(`${baseURL}/admin/reports/dismiss/${reportId}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if(!res.ok){
      return { success: false, message: data.message || "Failed to dismiss report." };
    }
    return { success: res.ok, message: data.message };
  } catch (error) {
    return { success: false, message: "Server Error" };
  }
}



