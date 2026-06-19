import { getTokenServer } from "../getTokenServer";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const getPrompts = async () => {
    const token = await getTokenServer()
    const res = await fetch(`${baseURL}/creator/prompts`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    if (!res.ok) {
        throw new Error('Failed to fetch prompts');
    }
    const data = await res.json();
    return data;
}