import { getPrompts } from '@/lib/api/prompts';
import React from 'react';
import MyPromptTable from './PromptTable';

const SellerPromptPage = async () => {
  const prompts = await getPrompts(); // Fetch prompts from the API
  // console.log(prompts);
  return (
    <div className="flex flex-col gap-4">
      <div>seller prompts page</div>
      <MyPromptTable prompts={prompts} />
    </div>
  );
};

export default SellerPromptPage;
