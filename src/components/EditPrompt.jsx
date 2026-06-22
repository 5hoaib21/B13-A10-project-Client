"use client";

import {
  Button,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
  ListBox,
  Select,
} from "@heroui/react";
import { Edit, Pencil } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // সার্ভার কম্পোনেন্ট রিফ্রেশ করার জন্য
import { toast } from "react-hot-toast";
import { updatePrompt } from "@/lib/actions/prompts";

export function EditPrompt({ promptData, promptId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  // State for form fields
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    aiTool: "",
    visibility: "public",
    tags: "",
  });

  // Populate form when promptData changes or modal opens
  useEffect(() => {
    if (promptData) {
      setFormData({
        title: promptData.title || "",
        content: promptData.content || "",
        category: promptData.category || "",
        aiTool: promptData.aiTool || "",
        visibility: promptData.visibility || "public",
        tags: Array.isArray(promptData.tags) ? promptData.tags.join(", ") : (promptData.tags || ""),
      });
    }
  }, [promptData]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ✅ HeroUI-এর Set অবজেক্ট থেকে পুরো string-টি বের করার জন্য ফাংশনটি ফিক্স করা হলো
  const handleSelectChange = (field, keys) => {
    const selectedValue = Array.from(keys).join(""); // Set থেকে সম্পূর্ণ শব্দ রূপান্তর
    setFormData(prev => ({
      ...prev,
      [field]: selectedValue
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formValues = {
        title: formData.title,
        content: formData.content,
        category: formData.category,
        aiTool: formData.aiTool,
        visibility: formData.visibility,
        tags: formData.tags?.split(",").map(tag => tag.trim()).filter(tag => tag) || [],
      };

      // Validate required fields
      if (!formValues.title || !formValues.content) {
        toast.error("Title and Content are required!");
        setIsLoading(false);
        return;
      }

      // এপিআই কল এবং রেসপন্স হ্যান্ডলিং
      const response = await updatePrompt(promptId, formValues);
      
      if (response.success) {
        toast.success("Prompt updated successfully!");
        setIsOpen(false); // মডাল বন্ধ হবে
        router.refresh(); // টেবিলের ডাটা সার্ভার থেকে রিফ্রেশ হবে
      } else {
        toast.error(response.error || "Failed to update prompt");
      }

    } catch (error) {
      console.error("❌ Error saving prompt:", error);
      toast.error(error.message || "Failed to save prompt");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button variant="secondary" onPress={() => setIsOpen(true)}>
        <Edit />
      </Button>
      
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger onPress={() => setIsOpen(false)} />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Pencil className="size-5" />
              </Modal.Icon>
              <Modal.Heading>
                {promptId ? "Edit Your Prompt" : "Create New Prompt"}
              </Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted">
                Fill out the form below to {promptId ? "update" : "create"} your prompt.
              </p>
            </Modal.Header>
            
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                  {/* Title */}
                  <TextField className="w-full" name="title" type="text" variant="secondary">
                    <Label>Title *</Label>
                    <Input 
                      placeholder="Enter prompt title" 
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </TextField>

                  {/* Content */}
                  <TextField className="w-full" name="content" type="text" variant="secondary">
                    <Label>Content *</Label>
                    <Input 
                      placeholder="Enter your prompt content" 
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      required
                    />
                  </TextField>

                  {/* Category */}
                  <Select 
                    className="w-full" 
                    placeholder="Select category"
                    name="category"
                    selectedKeys={formData.category ? [formData.category] : []}
                    onSelectionChange={(keys) => handleSelectChange("category", keys)} // ✅ ফিক্সড
                  >
                    <Label>Category</Label>
                    <Select.Trigger>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        <ListBox.Item id="writing" textValue="Writing">
                          ✍️ Writing
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                        <ListBox.Item id="coding" textValue="Coding">
                          💻 Coding
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                        <ListBox.Item id="marketing" textValue="Marketing">
                          📊 Marketing
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                        <ListBox.Item id="design" textValue="Design">
                          🎨 Design
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                        <ListBox.Item id="education" textValue="Education">
                          📚 Education
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                        <ListBox.Item id="business" textValue="Business">
                          💼 Business
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>

                  {/* AI Tool */}
                  <Select 
                    className="w-full" 
                    placeholder="Select AI tool"
                    name="aiTool"
                    selectedKeys={formData.aiTool ? [formData.aiTool] : []}
                    onSelectionChange={(keys) => handleSelectChange("aiTool", keys)} // ✅ ফিক্সড
                  >
                    <Label>AI Tool</Label>
                    <Select.Trigger>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        <ListBox.Item id="chatgpt" textValue="ChatGPT">
                          🤖 ChatGPT
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                        <ListBox.Item id="gemini" textValue="Gemini">
                          🌟 Gemini
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                        <ListBox.Item id="claude" textValue="Claude">
                          🧠 Claude
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                        <ListBox.Item id="midjourney" textValue="Midjourney">
                          🎨 Midjourney
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                        <ListBox.Item id="stable-diffusion" textValue="Stable Diffusion">
                          🖼️ Stable Diffusion
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>

                  {/* Visibility */}
                  <Select 
                    className="w-full" 
                    placeholder="Select visibility"
                    name="visibility"
                    selectedKeys={formData.visibility ? [formData.visibility] : ["public"]}
                    onSelectionChange={(keys) => handleSelectChange("visibility", keys)} // ✅ ফিক্সড
                  >
                    <Label>Visibility</Label>
                    <Select.Trigger>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        <ListBox.Item id="public" textValue="Public">
                          🌍 Public
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                        <ListBox.Item id="private" textValue="Private">
                          🔒 Private
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                        <ListBox.Item id="unlisted" textValue="Unlisted">
                          🔗 Unlisted
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>

                  {/* Tags */}
                  <TextField className="w-full" name="tags" type="text" variant="secondary">
                    <Label>Tags (comma separated)</Label>
                    <Input 
                      placeholder="e.g., AI, writing, creative" 
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                    />
                  </TextField>

                  <Modal.Footer>
                    <Button 
                      variant="secondary" 
                      onPress={() => setIsOpen(false)}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      color="primary"
                      isLoading={isLoading}
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : promptId ? "Update" : "Create"}
                    </Button>
                  </Modal.Footer>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}