"use server";

import { getTokenServer } from "../getTokenServer";


const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getAdminAnalyticsAction() {
  try {
    const token = await getTokenServer();
    const res = await fetch(`${baseURL}/admin/analytics`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
      next: { revalidate: 0 } 
    });

    const data = await res.json();
    if (!res.ok) return null;
    return data;
  } catch (error) {
    console.error("Error in getAdminAnalyticsAction:", error);
    return null;
  }
}