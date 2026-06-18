"use client";
import { useForm, Controller } from "react-hook-form";
import { 
  Input, 
  Textarea, 
  Select, 
  Label, 
  Button, 
  RadioGroup, 
  Radio, 
  ListBox, 
  ListBoxItem, 
  SelectTrigger, 
  SelectValue, 
  SelectIndicator, 
  SelectPopover 
} from "@heroui/react";
import { Upload } from "lucide-react";

export default function CreatePromptForm() {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      title: "",
      description: "",
      content: "",
      category: "",
      aiEngine: "",
      difficulty: "",
      visibility: "public",
      tags: ""
    }
  });

  const onSubmit = async (data) => {
    const finalData = {
      ...data,
      copyCount: 0,
      status: "pending"
    };
    console.log("Submitting Data:", finalData);
    // এখানে আপনার API Call হবে (fetch বা axios)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-[#0f172a] p-8 rounded-xl max-w-2xl mx-auto space-y-6 text-white border border-gray-700">
      <h2 className="text-2xl font-bold">Create New Prompt Template</h2>

      <Input label="Prompt Title" {...register("title", { required: true })} variant="bordered" />
      
      <Textarea label="Short Description" {...register("description")} variant="bordered" />
      
      <Textarea label="Prompt Content Template" {...register("content")} variant="bordered" minRows={5} />

      {/* Category Select */}
      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <Select label="Category" selectedKey={field.value} onSelectionChange={field.onChange}>
            <Label>Category</Label>
            <SelectTrigger>
              <SelectValue />
              <SelectIndicator />
            </SelectTrigger>
            <SelectPopover>
              <ListBox>
                <ListBoxItem id="coding">Coding</ListBoxItem>
                <ListBoxItem id="writing">Writing</ListBoxItem>
                <ListBoxItem id="marketing">Marketing</ListBoxItem>
              </ListBox>
            </SelectPopover>
          </Select>
        )}
      />

      {/* AI Engine Select */}
      <Controller
        name="aiEngine"
        control={control}
        render={({ field }) => (
          <Select label="AI Engine" selectedKey={field.value} onSelectionChange={field.onChange}>
            <Label>AI Engine</Label>
            <SelectTrigger>
              <SelectValue />
              <SelectIndicator />
            </SelectTrigger>
            <SelectPopover>
              <ListBox>
                <ListBoxItem id="chatgpt">ChatGPT</ListBoxItem>
                <ListBoxItem id="claude">Claude</ListBoxItem>
                <ListBoxItem id="gemini">Gemini</ListBoxItem>
              </ListBox>
            </SelectPopover>
          </Select>
        )}
      />

      {/* Difficulty */}
      <Controller
        name="difficulty"
        control={control}
        render={({ field }) => (
          <Select label="Difficulty Level" selectedKey={field.value} onSelectionChange={field.onChange}>
            <Label>Difficulty Level</Label>
            <SelectTrigger>
              <SelectValue />
              <SelectIndicator />
            </SelectTrigger>
            <SelectPopover>
              <ListBox>
                <ListBoxItem id="beginner">Beginner</ListBoxItem>
                <ListBoxItem id="intermediate">Intermediate</ListBoxItem>
                <ListBoxItem id="pro">Pro</ListBoxItem>
              </ListBox>
            </SelectPopover>
          </Select>
        )}
      />

      {/* Visibility */}
      <Controller
        name="visibility"
        control={control}
        render={({ field }) => (
          <RadioGroup label="Visibility Status" value={field.value} onValueChange={field.onChange}>
            <Radio value="public">Public (Free access)</Radio>
            <Radio value="private">Private (Premium lock)</Radio>
          </RadioGroup>
        )}
      />

      <Input label="Tags (Comma-separated)" placeholder="e.g. tailwind, react, component" {...register("tags")} />

      {/* Upload Placeholder */}
      <div className="border-2 border-dashed border-gray-600 p-6 rounded-lg text-center cursor-pointer hover:border-purple-500 transition-colors">
        <Upload className="mx-auto mb-2 text-gray-400" />
        <p className="text-sm text-gray-400">Click to choose a thumbnail image file</p>
      </div>

      <Button type="submit" className="w-full bg-purple-600 text-white font-bold py-6 hover:bg-purple-700">
        Submit Prompt for Review
      </Button>
    </form>
  );
}