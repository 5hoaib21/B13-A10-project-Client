"use client";

import React, { useState } from "react";
import { Table, Chip, Select, ListBox, Button } from "@heroui/react";
import { Trash2 } from "lucide-react";

export default function AdminUserTable({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers);

  // রোল আপডেট করার হ্যান্ডলার ফাংশন
  const handleRoleChange = (userId, newRole) => {
    console.log(`Updating User ${userId} role to: ${newRole}`);
    setUsers((prev) =>
      prev.map((u) => (u._id?.$oid === userId || u._id === userId ? { ...u, role: newRole } : u))
    );
  };

  // ইউজার ডিলিট করার হ্যান্ডলার ফাংশন
  const handleDeleteUser = (userId) => {
    if (confirm("Are you sure you want to permanently delete this user?")) {
      setUsers((prev) => prev.filter((u) => (u._id?.$oid !== userId && u._id !== userId)));
    }
  };

  return (
    <Table aria-label="User Management Table" className="bg-white text-zinc-800 shadow-none">
      <Table.ResizableContainer>
        <Table.Content aria-label="Table with resizable columns" className="min-w-[750px]">
          
          {/* 🎯 মোট কলাম সংখ্যা ৫টি (রেজিস্ট্রেশন ডেট বাদ দেওয়া হয়েছে) */}
          <Table.Header>
            <Table.Column isRowHeader defaultWidth="1.5fr" id="profile" minWidth={220} className="text-zinc-700 font-bold bg-zinc-50 border-b border-zinc-200">
              PROFILE DETAILS
              <Table.ColumnResizer />
            </Table.Column>
            <Table.Column defaultWidth="1.5fr" id="email" minWidth={220} className="text-zinc-700 font-bold bg-zinc-50 border-b border-zinc-200">
              EMAIL ADDRESS
              <Table.ColumnResizer />
            </Table.Column>
            <Table.Column defaultWidth="0.8fr" id="subscription" minWidth={120} className="text-zinc-700 font-bold bg-zinc-50 border-b border-zinc-200">
              SUBSCRIPTION
              <Table.ColumnResizer />
            </Table.Column>
            <Table.Column defaultWidth="1.2fr" id="role" minWidth={160} className="text-zinc-700 font-bold bg-zinc-50 border-b border-zinc-200">
              ROLE LEVEL
              <Table.ColumnResizer />
            </Table.Column>
            <Table.Column defaultWidth="0.6fr" id="actions" minWidth={80} className="text-right pr-6 text-zinc-700 font-bold bg-zinc-50 border-b border-zinc-200">
              ACTIONS
            </Table.Column>
          </Table.Header>

          <Table.Body>
            {users.map((user, index) => {
              const userId = user._id?.$oid || user._id || index;

              return (
                <Table.Row key={userId} className="border-b border-zinc-100 hover:bg-zinc-50/80 transition-colors">
                  
                  {/* ১. PROFILE DETAILS (ইমেজ + নাম) */}
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <img 
                        src={user?.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
                        alt={user?.name}
                        className="w-8 h-8 rounded-full object-cover border border-zinc-200"
                        onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png"; }}
                      />
                      <span className="font-semibold text-zinc-900 text-sm">{user?.name || "User"}</span>
                    </div>
                  </Table.Cell>

                  {/* ২. EMAIL ADDRESS */}
                  <Table.Cell>
                    <span className="text-zinc-600 text-sm">{user?.email || "N/A"}</span>
                  </Table.Cell>

                  {/* ৩. SUBSCRIPTION (PRO / FREE) */}
                  <Table.Cell>
                    <Chip 
                      color={user?.plan === "pro" ? "success" : "default"} 
                      size="sm" 
                      variant="soft"
                      className="font-bold tracking-wider text-[10px] uppercase"
                    >
                      {user?.plan === "pro" ? "Premium" : "Free"}
                    </Chip>
                  </Table.Cell>

                  {/* ৪. ROLE LEVEL ড্রপডাউন সিলেক্ট */}
                  <Table.Cell>
                    <Select 
                      className="w-full max-w-[130px]" 
                      placeholder="Select role"
                      selectedKey={user?.role || "user"}
                      onSelectionChange={(key) => handleRoleChange(userId, key)}
                    >
                      <Select.Trigger className="h-8 min-h-8 bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-700 text-xs font-medium">
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover className="bg-white border border-zinc-200 rounded-xl shadow-lg">
                        <ListBox>
                          <ListBox.Item id="user" textValue="User" className="text-xs text-zinc-700 hover:bg-zinc-50 rounded-md">
                            User
                          </ListBox.Item>
                          <ListBox.Item id="creator" textValue="Creator" className="text-xs text-zinc-700 hover:bg-zinc-50 rounded-md">
                            Creator
                          </ListBox.Item>
                          <ListBox.Item id="admin" textValue="Admin" className="text-xs text-zinc-700 hover:bg-zinc-50 rounded-md">
                            Admin
                          </ListBox.Item>
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </Table.Cell>

                  {/* ৫. ACTIONS (ডিলিট বাটন) */}
                  <Table.Cell className="text-right pr-6">
                    <Button 
                      isIconOnly 
                      size="sm" 
                      variant="flat" 
                      className="bg-zinc-50 hover:bg-red-50 hover:text-red-600 text-zinc-400 border border-transparent rounded-md w-7 h-7 transition-all"
                      onClick={() => handleDeleteUser(userId)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </Table.Cell>

                </Table.Row>
              );
            })}
          </Table.Body>

        </Table.Content>
      </Table.ResizableContainer>
    </Table>
  );
}