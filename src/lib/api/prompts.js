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

export const getAllPrompts = async (search) => {
    const res = await fetch(`${baseURL}/prompts?search=${search}`);
    if (!res.ok) {
        throw new Error('Failed to fetch all prompts');
    }
    const data = await res.json();
    return data;
}

export const getPromptById = async (id) => {
    const res = await fetch(`${baseURL}/prompts/${id}`);
    if (!res.ok) {
        throw new Error('Failed to fetch prompt by ID');
    }
    const data = await res.json();
    return data;
}

