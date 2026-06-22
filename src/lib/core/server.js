"use server";

import { getTokenServer } from "../getTokenServer";



const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const serverMutation = async (path,data) => {
  const token = await getTokenServer();
  console.log("token: ", token);
  const res = await fetch(`${baseURL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return result;
};

export const serverDelete = async (path) => {
  const token = await getTokenServer();
  const res = await fetch(`${baseURL}${path}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  const result = await res.json();
  return result;
};
