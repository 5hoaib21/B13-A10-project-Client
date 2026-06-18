'use server';


const baseUrl = process.env.SERVER_URL;

export const subscribeToPremium = async (data) => {
  const res= await fetch(`${baseUrl}/subscriptions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return result;
}