import AllPromptsPage from "@/components/AllPromptsPage";
import FilterAndSort from "@/components/FilterAndSort";
import SearchPrompt from "@/components/SearchPrompt";
import { getAllPrompts } from "@/lib/api/prompts";

// app/prompts/page.jsx
const PublicPromptsPage = async ({ searchParams }) => {
    const params = await searchParams;

  const search = await params?.search || '';
  const category = await params?.category || '';
  const aiTool = await params?.aiTool || '';
  const difficulty = await params?.difficulty || '';
  const sort = await params?.sort || 'latest';
  
  // API কল করুন
  const prompts = await getAllPrompts({ 
    search, 
    status: 'approved',
    category,
    aiTool,
    difficulty,
    sort
  });
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">All Prompts</h1>
          <p className="mt-2 text-gray-600">
            Browse through our collection of {prompts?.length || 0} prompts
          </p>
        </div>
        
        {/* Search + Filters + Sort */}
        <div className="mb-10 space-y-4">
          <SearchPrompt />
          <FilterAndSort />
        </div>
        
        {/* Prompts Grid */}
        {prompts?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No prompts found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prompts.map((prompt) => (
              <AllPromptsPage key={prompt._id} prompt={prompt} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicPromptsPage;