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



export async function deleteUserAction(userId) {
  const token = await getTokenServer();
  try {
    const res = await fetch(`${baseURL}/admin/users/${userId}`, {
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
        message: data.message || "Failed to delete user from server",
      };
    }

    return {
      success: true,
      message: data.message || "User deleted successfully!",
    };
  } catch (error) {
    console.error("Error in deleteUserAction:", error);
    return { success: false, message: "Internal Server Error" };
  }
}