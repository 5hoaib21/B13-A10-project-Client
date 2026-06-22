'use server';


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5005';

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