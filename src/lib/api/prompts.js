import { getTokenServer } from "../getTokenServer";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const getPrompts = async (page) => {
    if(!page) {
        page = 1;
    }
    const token = await getTokenServer()
    const res = await fetch(`${baseURL}/creator/prompts?page=${page}`, {
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

export const getAllPrompts = async () => {
    const res = await fetch(`${baseURL}/prompts`);
    if (!res.ok) {
        throw new Error('Failed to fetch all prompts');
    }
    const data = await res.json();
    return data;
}