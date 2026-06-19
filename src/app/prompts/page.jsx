import AllPromptsPage from "@/components/AllPromptsPage";
import { getAllPrompts } from "@/lib/api/prompts";


const PublicPromptsPage = async () => {
    const prompts = await getAllPrompts();
    
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">All Prompts</h1>
                    <p className="mt-2 text-gray-600">
                        Browse through our collection of {prompts.length} prompts
                    </p>
                </div>
                
                {prompts.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No prompts available at the moment.</p>
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