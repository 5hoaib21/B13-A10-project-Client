"use server";

import { getTokenServer } from "../getTokenServer";
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export async function updateUserRoleAction(userId, newRole) {
  const token = await getTokenServer();
  try {
    const res = await fetch(`${baseURL}/admin/users/role/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role: newRole }),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Failed to update role from server",
      };
    }

    return {
      success: true,
      message: data.message || "Role updated successfully!",
    };
  } catch (error) {
    console.error("Error in updateUserRoleAction:", error);
    return { success: false, message: "Internal Server Error" };
  }
}



