"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  Form,
  Fieldset,
  TextField,
  Label,
  Input,
  TextArea,
  Select,
  ListBox,
  Button,
  Card,
} from "@heroui/react";
import { MagicWand, Compass, ChevronDown } from "@gravity-ui/icons";
import { CloudUpload, CloudUploadIcon } from "lucide-react";
import { imageUpload } from "@/lib/actions/imgUpload";
import { addPrompt } from "@/lib/actions/prompts";
import { useRouter } from "next/navigation";
// import { addPrompt } from "@/lib/actions/prompts";

export default function AddPromptForm() {
  const [mounted, setMounted] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter()

  useEffect(() => {
    setMounted(true);
  }, []);

  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleThumbnailUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    // Fake upload emulator simulation (Apnar runtime backend hook mapping eikhane lagaben)
    setTimeout(() => {
      const url = URL.createObjectURL(file);
      setThumbnailUrl(url);
      setIsUploading(false);
      toast.success("Thumbnail uploaded successfully!");
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    
    const image = await imageUpload(data.image);

    // Validation Check Logic
    const newErrors = {};
    if (!data.title) newErrors.title = "Title is required";
    if (!data.description) newErrors.description = "Description is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const promptPayload = {
      ...data,
      image: image?.url || "",
      copyCount: 0,
      rating: 0,      
      ratingCount: 0, 
      status: "approved",
    };

    const result = await addPrompt(promptPayload);
    
    if (result && result.insertedId) {
      toast.success("Prompt submitted for review successfully!");
      e.target.reset();
      
      // 🚀 ক্লায়েন্ট সাইড সেফ রিডাইরেকশন
      router.push('/prompts'); 
    } else {
      // ব্যাকএন্ড গার্ড থেকে কোনো এরর আসলে (যেমন ৩ প্রম্পটের লিমিট ব্লক) তা টোস্টে পপআপ হবে
      toast.error(result?.error || "Failed to publish prompt asset.");
    }
  };

  // ✨ Light Theme Polished Global Classes
  const inputClass =
    "w-full text-zinc-800 bg-zinc-50 border border-zinc-200 focus:border-indigo-500 rounded-xl h-11 px-3.5 text-sm placeholder:text-zinc-400 outline-none transition-all duration-200 shadow-2xs";
  const textAreaClass =
    "w-full text-zinc-800 bg-zinc-50 border border-zinc-200 focus:border-indigo-500 rounded-xl p-3.5 text-sm placeholder:text-zinc-400 outline-none transition-all duration-200 shadow-2xs resize-none";
  const triggerClasses =
    "w-full flex items-center justify-between bg-zinc-50 border border-zinc-200 focus:border-indigo-500 h-11 rounded-xl px-3.5 text-zinc-700 text-sm transition-all duration-200 shadow-2xs";
  const popoverClasses =
    "bg-white border border-zinc-200 text-zinc-800 rounded-xl shadow-xl p-1.5 backdrop-blur-md z-50";
  const listItemClasses =
    "p-2.5 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-pointer text-sm font-medium text-zinc-600";

  if (!mounted) return <div className="min-h-screen bg-slate-50" />;

  return (
    <div className="w-full min-h-screen bg-slate-50 text-zinc-800 pt-5 pb-24 px-4 overflow-hidden relative">
      {/* 🌌 Ambient Soft Mesh Blurs - light mode styling standard */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10 animate-fade-in">
        <Card className="w-full bg-white border border-zinc-200 p-8 sm:p-10 rounded-[24px] shadow-xl shadow-indigo-500/5 flex flex-col">
          {/* Header Layout Component */}
          <div className="border-b border-zinc-100 pb-6 mb-8 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 shadow-2xs">
              <MagicWand size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-zinc-900 tracking-tight">
                Create AI Prompt Asset
              </h1>
              <p className="text-zinc-500 text-xs sm:text-sm mt-0.5">
                Submit your custom instructions architecture pipeline for
                moderator approval.
              </p>
            </div>
          </div>

          <Form
            onSubmit={handleSubmit}
            className="space-y-6"
            validationErrors={errors}
            validationBehavior="aria"
          >
            <Fieldset className="space-y-6 p-0 m-0 border-none">
              {/* Title & Description Fields */}
              <TextField
                name="title"
                isInvalid={!!errors.title}
                className="flex flex-col gap-1.5 w-full"
              >
                <Label className="text-zinc-700 text-xs font-semibold uppercase tracking-wider">
                  Prompt Title
                </Label>
                <Input
                  name="title"
                  placeholder="e.g., Ultra-Realistic Midjourney Portrait V6"
                  className={inputClass}
                />
                {errors.title && (
                  <span className="text-xs text-red-500 font-medium pl-1">
                    {errors.title}
                  </span>
                )}
              </TextField>

              <TextField
                name="description"
                className="flex flex-col gap-1.5 w-full"
              >
                <Label className="text-zinc-700 text-xs font-semibold uppercase tracking-wider">
                  Short Target Description
                </Label>
                <TextArea
                  name="description"
                  placeholder="Summarize the dynamic value or core purpose of this AI prompt architecture..."
                  rows={2}
                  className={textAreaClass}
                />
              </TextField>

              <TextField
                name="content"
                className="flex flex-col gap-1.5 w-full"
              >
                <Label className="text-zinc-700 text-xs font-semibold uppercase tracking-wider">
                  Prompt Instructions / Payload Content
                </Label>
                <TextArea
                  name="content"
                  placeholder="Paste your system level instructions here. Use [brackets] for user parameter variables..."
                  rows={5}
                  className={textAreaClass}
                />
              </TextField>

              {/* Grid 1: Category & AI Target Engine */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                <Select
                  name="category"
                  label="Category"
                  className="flex flex-col gap-1.5"
                >
                  <Label className="text-zinc-700 text-xs font-semibold uppercase tracking-wider">
                    Category
                  </Label>
                  <Select.Trigger className={triggerClasses}>
                    <Select.Value />
                    <ChevronDown size={14} className="text-zinc-400" />
                  </Select.Trigger>
                  <Select.Popover className={popoverClasses}>
                    <ListBox>
                      {["Coding", "Writing", "Marketing", "Design", "SEO"].map(
                        (item) => (
                          <ListBox.Item
                            key={item}
                            id={item.toLowerCase()}
                            className={listItemClasses}
                          >
                            {item}
                          </ListBox.Item>
                        ),
                      )}
                    </ListBox>
                  </Select.Popover>
                </Select>

                <Select
                  name="aiTool"
                  label="AI Tool"
                  className="flex flex-col gap-1.5"
                >
                  <Label className="text-zinc-700 text-xs font-semibold uppercase tracking-wider">
                    AI Tool Target
                  </Label>
                  <Select.Trigger className={triggerClasses}>
                    <Select.Value />
                    <ChevronDown size={14} className="text-zinc-400" />
                  </Select.Trigger>
                  <Select.Popover className={popoverClasses}>
                    <ListBox>
                      {[
                        "ChatGPT",
                        "Claude",
                        "Gemini",
                        "Midjourney",
                        "Stable Diffusion",
                      ].map((item) => (
                        <ListBox.Item
                          key={item}
                          id={item.toLowerCase()}
                          className={listItemClasses}
                        >
                          {item}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              {/* Grid 2: Complexity Tier & Authorization Mode */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                <Select
                  name="difficulty"
                  label="Difficulty"
                  className="flex flex-col gap-1.5"
                >
                  <Label className="text-zinc-700 text-xs font-semibold uppercase tracking-wider">
                    Complexity Level
                  </Label>
                  <Select.Trigger className={triggerClasses}>
                    <Select.Value />
                    <ChevronDown size={14} className="text-zinc-400" />
                  </Select.Trigger>
                  <Select.Popover className={popoverClasses}>
                    <ListBox>
                      <ListBox.Item id="beginner" className={listItemClasses}>
                        Beginner Tier
                      </ListBox.Item>
                      <ListBox.Item
                        id="intermediate"
                        className={listItemClasses}
                      >
                        Intermediate Setup
                      </ListBox.Item>
                      <ListBox.Item id="pro" className={listItemClasses}>
                        Pro Architect
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>

                <Select
                  name="visibility"
                  label="Visibility"
                  defaultSelectedKeys={["public"]}
                  className="flex flex-col gap-1.5"
                >
                  <Label className="text-zinc-700 text-xs font-semibold uppercase tracking-wider">
                    Access Scope Mode
                  </Label>
                  <Select.Trigger className={triggerClasses}>
                    <Select.Value />
                    <ChevronDown size={14} className="text-zinc-400" />
                  </Select.Trigger>
                  <Select.Popover className={popoverClasses}>
                    <ListBox>
                      <ListBox.Item id="public" className={listItemClasses}>
                        Public Space (Free Users)
                      </ListBox.Item>
                      <ListBox.Item id="private" className={listItemClasses}>
                        Private Premium (Paid Creators)
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              <TextField name="tags" className="flex flex-col gap-1.5 w-full">
                <Label className="text-zinc-700 text-xs font-semibold uppercase tracking-wider">
                  Metadata Tags (Comma-separated)
                </Label>
                <Input
                  name="tags"
                  placeholder="e.g., react, copywriter, conversion-rate"
                  className={inputClass}
                />
              </TextField>

              {/* Refactored Image Drag Drop Area */}
              <div className="flex flex-col gap-2 w-full">
                <label className="text-zinc-700 text-xs font-semibold uppercase tracking-wider">
                  Cover Thumbnail
                </label>

                <div className="flex flex-col md:flex-row items-center gap-6 p-6 border-2 border-dashed border-zinc-200 hover:border-indigo-400 bg-zinc-50/50 rounded-2xl group transition-all duration-200 cursor-pointer relative overflow-hidden">
                  <input
                    type="file"
                    name="image"
                    accept="image/png, image/jpeg"
                    onChange={handleThumbnailUpload}
                    className="hidden"
                    id="thumbnail-upload"
                  />

                  {/* Dynamic Drag Cover Trigger Area Target Label */}
                  <label
                    htmlFor="thumbnail-upload"
                    className="absolute inset-0 w-full h-full cursor-pointer z-20"
                  />

                  {/* Dynamic Image Preview Container Frame */}
                  <div className="w-full md:w-44 h-28 bg-white border border-zinc-200/80 rounded-xl flex items-center justify-center overflow-hidden shrink-0 relative shadow-2xs z-10">
                    {thumbnailUrl ? (
                      <img
                        src={thumbnailUrl}
                        alt="Thumbnail Preview"
                        className="w-full h-full object-cover animate-fade-in"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-indigo-50/60 flex items-center justify-center text-zinc-400 group-hover:text-indigo-600 transition-colors">
                        <CloudUpload size={22} />
                      </div>
                    )}
                  </div>

                  {/* Metadata Status Content Framework Description */}
                  <div className="flex flex-col text-center md:text-left space-y-1 relative z-10">
                    <span className="text-sm font-bold text-zinc-700 group-hover:text-indigo-600 transition-colors">
                      {isUploading
                        ? "Uploading assets..."
                        : "Upload Cover Thumbnail"}
                    </span>
                    <span className="text-xs text-zinc-400 max-w-xs leading-relaxed">
                      Drag and drop your high-res banner format capture
                      workspace. Supports PNG, JPG up to 4MB.
                    </span>
                  </div>
                </div>
              </div>
            </Fieldset>

            {/* Bottom Form Trigger Action Wrapper */}
            <div className="flex justify-end pt-5 mt-4 border-t border-zinc-100">
              <Button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl px-6 h-11 tracking-wide shadow-lg shadow-indigo-500/10 flex items-center gap-1.5 transition-all"
              >
                <Compass size={16} />
                Publish to Marketplace
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
}
