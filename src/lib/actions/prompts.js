"use server";

import { serverDelete, serverMutation } from "../core/server";
import { getTokenServer } from "../getTokenServer";


export const addPrompt = async (data) => {
    return serverMutation(`/api/prompts`, data)
}


export const deletePrompt = async (id) => {
  return serverDelete(`/api/prompts/${id}`); 
}



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





// import { getTokenServer } from "../getTokenServer";

// const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

// export const addPrompt = async (data) => {
//   const token = await getTokenServer();
//   console.log("token: ", token);
//   const res = await fetch(`${baseURL}/api/prompts`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(data),
//   });
//   const result = await res.json();
//   return result;
// };








// export const updatePrompt = async (data) => {
//   try {
//     const token = await getTokenServer();
//     console.log("token: ", token);

//     const res = await fetch(`${baseURL}/api/prompts/${data._id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(data),
//     });
//     if(!res.ok){
//       const errorData = await res.json();
//       throw new Error(errorData.message || 'failed to update')
//     }
//     const result = await res.json();
//     console.log('prompt update', result);
//     return result;
//   } catch (error) {
//      console.error("❌ Error updating prompt:", error);
//     throw error;
//   }
// };
