
import { getPrompts } from "@/lib/api/prompts";
import React from "react";
import MyPromptTable from "../../creator/my-prompt/PromptTable";
import { EmptyState } from "@/components/ui/EmptyState";



const MyPromptPage = async ({ searchParams }) => {
  const params = await searchParams;

  const prompts = await getPrompts(params.page); // Fetch prompts from the API
 
  return (
    <div>
        <div>Prompts Management page</div>
      <div className="w-10/12 mx-auto">
    { prompts.data.length == 0 && <EmptyState />}
      </div>
      <div className="flex flex-col gap-4">

      {prompts.data.length !== 0 &&  <MyPromptTable promptsData={prompts} />}
      </div>
    </div>
  );
};

export default MyPromptPage;