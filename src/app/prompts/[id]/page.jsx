import { getPromptById } from '@/lib/api/prompts';
import { 
    Clock, 
    User, 
    Star, 
    ArrowLeft,
    Eye,
    Award,
    Tag,
    Sparkles,
    CopyCheck
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import PromptInteractions from '@/components/PromptInteractions'; // 💡 Import Client Component Path

export default async function PromptDetailsPage({ params }) {
    const { id } = await params;
    const prompt = await getPromptById(id);
    
    if (!prompt) return <div className="min-h-screen flex items-center justify-center text-gray-500">Prompt not found.</div>;

    const {
        title,
        description,
        content,
        category,
        aiTool,
        difficulty,
        tags,
        image,
        copyCount,
        status,
        visibility,
        createdAt,
        rating = 0,
        totalReviews = 0,
        reviews = []
    } = prompt;

    const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const difficultyConfig = {
        beginner: { label: 'Beginner', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
        intermediate: { label: 'Intermediate', color: 'bg-amber-100 text-amber-700 border-amber-200' },
        advanced: { label: 'Advanced', color: 'bg-rose-100 text-rose-700 border-rose-200' }
    };

    const tagList = tags ? tags.split(',').map(tag => tag.trim()) : [];

    // Helper static full calculation 
    const renderServerStars = (ratingNum) => {
        const fullStars = Math.floor(ratingNum);
        return (
            <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < fullStars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                
                {/* Back Link */}
                <Link 
                    href="/prompts" 
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-300 mb-6 group"
                >
                    <ArrowLeft size={20} className="transform group-hover:-translate-x-1 transition-transform duration-300" />
                    <span className="font-medium">Back to Prompts</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Grid Layout Stack */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="relative w-full h-64 bg-gradient-to-r from-blue-500 to-purple-600">
                                {image ? (
                                    <Image src={image} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
                                ) : (
                                    <div className="flex items-center justify-center h-full"><Sparkles className="text-white w-20 h-20 opacity-50" /></div>
                                )}
                                
                                <div className="absolute top-4 right-4">
                                    <span className={`px-4 py-2 rounded-full text-xs font-semibold backdrop-blur-sm bg-white/90 shadow-lg ${
                                        status === 'pending' ? 'text-orange-600' : status === 'approved' ? 'text-green-600' : 'text-red-600'
                                    }`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
                                </div>

                                <div className="absolute bottom-4 left-4">
                                    <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-800 text-sm font-bold rounded-full shadow-lg">{category.toUpperCase()}</span>
                                </div>
                            </div>

                            <div className="p-6">
                                <h1 className="text-3xl font-bold text-gray-900 mb-3">{title}</h1>
                                <p className="text-gray-600 text-lg leading-relaxed mb-4">{description}</p>

                                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 mb-4">
                                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Prompt Template</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed font-mono whitespace-pre-wrap">{content}</p>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {tagList.map((tag, index) => (
                                        <span key={index} className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100">
                                            <Tag size={12} />#{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 💡 CALL INTERACTION CLIENT ELEMENT */}
                        <PromptInteractions 
                            promptId={prompt._id}
                            promptContent={content} 
                            rating={rating} 
                            totalReviews={totalReviews} 
                            reviews={reviews} 
                        />
                    </div>

                    {/* Right Grid Sidebar Layout */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Prompt Details</h3>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl border border-purple-100">
                                    <div className="flex items-center gap-2"><Sparkles size={16} className="text-purple-600" /><span className="text-sm text-gray-600">AI Engine</span></div>
                                    <span className="text-sm font-semibold text-purple-700">{aiTool.toUpperCase()}</span>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="flex items-center gap-2"><Award size={16} className="text-gray-600" /><span className="text-sm text-gray-600">Difficulty</span></div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${difficultyConfig[difficulty]?.color || 'bg-gray-100'}`}>
                                        {difficultyConfig[difficulty]?.label || 'Intermediate'}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="flex items-center gap-2"><CopyCheck size={16} className="text-gray-600" /><span className="text-sm text-gray-600">Copies Made</span></div>
                                    <span className="text-sm font-semibold text-gray-800">{copyCount}</span>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="flex items-center gap-2"><Clock size={16} className="text-gray-600" /><span className="text-sm text-gray-600">Created</span></div>
                                    <span className="text-sm font-medium text-gray-700">{formattedDate}</span>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="flex items-center gap-2"><Eye size={16} className="text-gray-600" /><span className="text-sm text-gray-600">Visibility</span></div>
                                    <span className="text-sm font-semibold text-gray-800 capitalize">{visibility}</span>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-600">Community Rating</span>
                                    <div className="flex items-center gap-2">
                                        {renderServerStars(rating)}
                                        <span className="text-sm font-bold text-gray-700">{rating.toFixed(1)}</span>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-400 text-right">Based on {totalReviews} reviews</p>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold"><User size={20} /></div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">Prompt Engineer</p>
                                        <p className="text-xs text-gray-400">creator@aiverse.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}