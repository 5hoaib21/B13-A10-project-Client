import { getPromptById } from '@/lib/api/prompts';
import React from 'react';

const PromptDetailsPage = async ({params}) => {
    const { id } = await params;
    const prompt = await getPromptById(id)
    console.log(prompt);
    return (
        <div>
            Prompt Details Page
        </div>
    );
};

export default PromptDetailsPage;