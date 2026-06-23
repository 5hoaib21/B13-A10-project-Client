import { getTokenServer } from "../getTokenServer";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;



export const paymentCollections = async () => {
  try {
    const token = await getTokenServer()

    const res = await fetch(`${baseURL}/admin/payments`, {
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