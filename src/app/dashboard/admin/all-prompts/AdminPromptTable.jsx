"use client";

import React, { useState } from "react";
import { Button, Input, Label, Modal, Table, TextField } from "@heroui/react";
import { Check, X, Trash2, Eye, ShieldAlert } from "lucide-react";

export default function AdminPromptTable({ initialPrompts }) {
  const [prompts, setPrompts] = useState(initialPrompts);
  const [isOpen, setIsOpen] = useState(false);
  
  const [selectedPromptId, setSelectedPromptId] = useState(null);
  const [feedback, setFeedback] = useState("");

  const handleApprove = async (id) => {
    console.log("Approved Prompt ID:", id);
    setPrompts(prev => prev.map(p => p._id === id ? { ...p, status: "approved" } : p));
  };

  const triggerRejectModal = (id) => {
    setSelectedPromptId(id);
    setFeedback("");
    setIsOpen(true);
  };

  const handleRejectSubmit = async () => {
    console.log(`Rejected ID: ${selectedPromptId} with feedback: ${feedback}`);
    setPrompts(prev => prev.map(p => p._id === selectedPromptId ? { ...p, status: "rejected", feedback } : p));
    setIsOpen(false);
  };

  const handleDelete = async (id) => {
    if(confirm("Are you sure you want to delete this prompt permanently?")) {
        setPrompts(prev => prev.filter(p => p._id !== id));
    }
  };

  const statusStyleMap = {
    approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    rejected: "bg-rose-50 text-rose-700 border-rose-200",
  };

  return (
    <>
      <Table aria-label="Prompt Submission Table" className="bg-white text-zinc-800 shadow-none">
        <Table.ScrollContainer>
          <Table.Content className="min-w-[800px]">
            <Table.Header>
              {/* 🚀 এই যে এখানে 'isRowHeader' প্রপ্সটি বসিয়ে দেওয়া হলো, যা এররটা চিরতরে ভ্যানিশ করবে */}
              <Table.Column isRowHeader className="text-zinc-700 font-bold bg-zinc-50 border-b border-zinc-200">#</Table.Column>
              <Table.Column className="text-zinc-700 font-bold bg-zinc-50 border-b border-zinc-200">TEMPLATE TITLE</Table.Column>
              <Table.Column className="text-zinc-700 font-bold bg-zinc-50 border-b border-zinc-200">AI ENGINE</Table.Column>
              <Table.Column className="text-zinc-700 font-bold bg-zinc-50 border-b border-zinc-200">VISIBILITY</Table.Column>
              <Table.Column className="text-zinc-700 font-bold bg-zinc-50 border-b border-zinc-200 text-center">STATUS</Table.Column>
              <Table.Column className="text-right pr-6 text-zinc-700 font-bold bg-zinc-50 border-b border-zinc-200">ACTIONS</Table.Column>
            </Table.Header>
            <Table.Body>
              {prompts.map((prompt, index) => (
                <Table.Row key={prompt._id || index} className="border-b border-zinc-100 hover:bg-zinc-50/80 transition-colors">
                  
                  <Table.Cell className="text-zinc-400 font-mono text-xs">{index + 1}</Table.Cell>
                  
                  <Table.Cell>
                    <span className="font-semibold text-zinc-900 text-sm block max-w-[280px] truncate">
                      {prompt?.title}
                    </span>
                  </Table.Cell>
                  
                  <Table.Cell>
                    <span className="px-2.5 py-1 text-[11px] font-bold tracking-wider rounded-lg bg-purple-50 text-purple-600 uppercase border border-purple-100 inline-block">
                      {prompt?.aiTool || "N/A"}
                    </span>
                  </Table.Cell>
                  
                  <Table.Cell className="text-zinc-600 text-sm capitalize">{prompt?.visibility}</Table.Cell>
                  
                  <Table.Cell className="text-center">
                    <span className={`inline-block px-2.5 py-0.5 text-[11px] font-bold tracking-wider rounded-full border uppercase ${statusStyleMap[prompt?.status || "pending"]}`}>
                      {prompt?.status || "pending"}
                    </span>
                  </Table.Cell>
                  
                  <Table.Cell className="flex items-center justify-end gap-1.5 h-full py-2 pr-6">
                    <Button isIconOnly size="sm" variant="flat" className="bg-zinc-100 hover:bg-zinc-200 text-zinc-600 rounded-md w-7 h-7">
                      <Eye size={14} />
                    </Button>

                    <Button 
                      isIconOnly 
                      size="sm" 
                      variant="flat" 
                      className="bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-100 rounded-md w-7 h-7"
                      onClick={() => handleApprove(prompt._id)}
                      isDisabled={prompt?.status === "approved"}
                    >
                      <Check size={14} />
                    </Button>

                    <Button 
                      isIconOnly 
                      size="sm" 
                      variant="flat" 
                      className="bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-100 rounded-md w-7 h-7"
                      onClick={() => triggerRejectModal(prompt._id)}
                      isDisabled={prompt?.status === "rejected"}
                    >
                      <X size={14} />
                    </Button>

                    <Button 
                      isIconOnly 
                      size="sm" 
                      variant="flat" 
                      className="bg-zinc-100 hover:bg-red-50 hover:text-red-600 text-zinc-400 border border-transparent rounded-md w-7 h-7 transition-all"
                      onClick={() => handleDelete(prompt._id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>

      {/* ⚪ মডাল */}
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md bg-white border border-zinc-200 text-zinc-800 rounded-2xl shadow-xl">
              <Modal.CloseTrigger onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-zinc-600" />
              
              <Modal.Header>
                <Modal.Icon className="bg-rose-50 text-rose-600 border border-rose-100">
                  <ShieldAlert className="size-5" />
                </Modal.Icon>
                <Modal.Heading className="text-zinc-900 text-lg font-bold">Rejection Feedback</Modal.Heading>
                <p className="mt-1.5 text-sm leading-5 text-zinc-500">
                  Please provide constructive feedback explaining why this prompt structure or metadata was rejected.
                </p>
              </Modal.Header>
              
              <Modal.Body className="p-6">
                <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                  <TextField className="w-full" name="feedback" variant="secondary">
                    <Label className="text-zinc-700 text-xs font-semibold mb-1 block">Feedback Message</Label>
                    <Input 
                      placeholder="e.g., Missing explicit variable parameter maps..." 
                      className="bg-zinc-50 border-zinc-200 text-zinc-900 rounded-xl placeholder:text-zinc-400"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                    />
                  </TextField>
                </form>
              </Modal.Body>
              
              <Modal.Footer className="border-t border-zinc-100 pt-4">
                <Button variant="secondary" className="bg-zinc-100 text-zinc-600 hover:bg-zinc-200" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  className="bg-rose-600 hover:bg-rose-500 text-white font-semibold shadow-sm"
                  onClick={handleRejectSubmit} 
                  isDisabled={!feedback.trim()}
                >
                  Submit Rejection
                </Button>
              </Modal.Footer>

            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}