import { Button } from "@heroui/react";
import { Copy, Clock, ArrowRight, Sparkles, User } from "lucide-react";
import Image from "next/image";

const AllPromptsPage = ({ prompt }) => {
  const {
    title,
    description,
    category,
    aiTool,
    difficulty,
    image,
    copyCount,
    createdAt,
    visibility,
    status,
  } = prompt;

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const difficultyColors = {
    beginner: "bg-emerald-500",
    intermediate: "bg-amber-500",
    advanced: "bg-rose-500",
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-gray-100 flex flex-col h-full">
      {/* Image Section */}
      <div className="relative w-full h-52 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-indigo-500 to-pink-500">
            <Sparkles className="text-white w-12 h-12 animate-spin-slow" />
          </div>
        )}

        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Difficulty Bar - Bottom */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-1 ${difficultyColors[difficulty]} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left`}
        ></div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Header: Category + Date */}
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-bold ${status === 'approved' ? 'text-green-600 bg-green-50' : 'text-red-400 bg-red-100'} px-3 py-1 rounded-full`}>
            {status || "Draft"}
          </span>
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Clock size={12} />
            {formattedDate}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2 flex-grow">
          {description}
        </p>
    <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-medium text-black bg-orange-500/20 px-2.5 py-1 rounded-full">
          {category}
        </span>
        <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">
          {aiTool}
        </span>
    </div>

        {/* Bottom Section: AI Tool + Copies + Button */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <span className={`text-xs font-medium ${visibility === "public" ? "text-green-600 bg-green-50" : "text-red-400 bg-red-100"} px-2.5 py-1 rounded-full flex items-center gap-1`}>
             
              {visibility === "public" ? "Public" : "Private"}
            </span>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Copy size={12} />
              {copyCount}
            </span>
          </div>

          <Button
            variant="outline"
            className="group/btn relative inline-flex gap-1.5 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-all duration-300 flex items-center"
          >
            <span>Step Inside</span>
            <ArrowRight
              size={16}
              className="transform group-hover/btn:translate-x-1 transition-transform duration-300"
            />
            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-blue-600 group-hover/btn:w-full transition-all duration-300"></span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AllPromptsPage;
