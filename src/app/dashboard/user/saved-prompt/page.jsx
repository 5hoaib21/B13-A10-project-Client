import React from "react";

import Link from "next/link";
import { ArrowRight, Sparkles, Tag } from "lucide-react";
import { getMySavedPrompts } from "@/lib/api/prompts";
import { Button } from "@heroui/react";

export default async function UserSavedPromptPage() {
  
  const response = await getMySavedPrompts();
  const savedPrompts = response?.data || [];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-950">
          My Saved Collections
        </h1>
        <p className="text-sm text-gray-500">
          All the prompts you have bookmarked for quick access.
        </p>
      </div>

     
      {savedPrompts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 mb-4">
            You haven`t saved any prompts yet.
          </p>
          <Link
            href="/prompts"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition"
          >
            Explore Prompts <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedPrompts.map((prompt) => (
            <div
              key={prompt._id}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full">
                    {prompt.aiTool}
                  </span>
                  <span className="text-xs text-gray-400 capitalize">
                    {prompt.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                  {prompt.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {prompt.description}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {(Array.isArray(prompt.tags)
                    ? prompt.tags
                    : typeof prompt.tags === "string"
                      ? prompt.tags.split(",").map((t) => t.trim())
                      : []
                  )
                    .slice(0, 2)
                    .map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-gray-50 text-gray-500 px-2 py-0.5 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                </div>
                <Link
                  href={`/prompts/${prompt._id}`}
                >
                <Button 
                variant="outline" 
                size="sm"
                className={`text-xs hover:font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group`}
                >
                  View Details
                  <ArrowRight
                    size={14}
                    className="transform group-hover:translate-x-0.5 transition-transform"
                  />
                    </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
