import { getPrompts } from '@/lib/api/prompts';
import React from 'react';
import MyPromptTable from './PromptTable';

const SellerPromptPage = async ({searchParams}) => {
  const params = await searchParams;
  
  const prompts = await getPrompts(params.page); // Fetch prompts from the API
  
  return (
    <div className="flex flex-col gap-4">
      <div>seller prompts page</div>
      <MyPromptTable promptsData={prompts} />
    </div>
  );
};

export default SellerPromptPage;
