"use client";

import { deletePrompt } from "@/lib/actions/prompts";
import { AlertDialog, Button } from "@heroui/react";
import { Delete } from "lucide-react";
import { useRouter } from "next/navigation"; // রিফ্রেশ করার জন্য ইম্পোর্ট করলাম
import toast from "react-hot-toast";

export function DeletePrompt({ promptId }) {
  const router = useRouter();

  const handleDelete = async () => {
    const response = await deletePrompt(promptId);
    if (response.success) {
      toast.success("সফলভাবে ডিলিট হয়েছে!");
      router.refresh(); // এটি সার্ভার কম্পোনেন্টকে বলবে নতুন ডাটা নিয়ে রিফ্রেশ হতে!
    } else {
      toast.error("ডিলিট করা যায়নি: " + response.error);
    }
  };

  return (
    <AlertDialog>
      {/* Trigger Button */}
      <Button variant="danger-soft" size="sm">
        <Delete />
      </Button>
      
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete project permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete this prompt and all of its data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              {/* এখানে onClick-এ handleDelete জুড়ে দেওয়া হলো */}
              <Button slot="close" variant="danger" onClick={handleDelete}>
                Delete Project
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}