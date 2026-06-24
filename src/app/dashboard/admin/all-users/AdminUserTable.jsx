"use client";

import React, { useState } from "react";
import { Table, Chip, Select, ListBox, Button, AlertDialog } from "@heroui/react";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast"; 
import { deleteUserAction, updateUserRoleAction } from "@/lib/actions/users";

export default function AdminUserTable({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers);

  // 🔄 ১. রোল চেঞ্জ হ্যান্ডলার (উইথ রিয়্যাক্ট হট টোস্ট)
  const handleRoleChange = async (userId, key) => {
    const newRole = typeof key === "object" ? Array.from(key)[0] : key;
    if (!newRole) return;

    const rolePromise = updateUserRoleAction(userId, newRole).then((res) => {
      if (res.success) {
        setUsers((prev) =>
          prev.map((u) => (u._id?.$oid === userId || u._id === userId ? { ...u, role: newRole } : u))
        );
        return res.message || `Role updated to ${newRole}!`;
      } else {
        throw new Error(res.message || "Failed to update role");
      }
    });

    toast.promise(rolePromise, {
      loading: "Updating user role...",
      success: (msg) => msg,
      error: (err) => err.message,
    });
  };

  // 🗑️ ডিলিট হ্যান্ডলার (উইন্ডো কনফার্মেশন ছাড়া, ডিরেক্ট হট টোস্ট)
  const handleDeleteUser = async (user) => {
    const userId = user._id?.$oid || user._id;
    
    // কোনো কনফার্মেশন ছাড়াই সরাসরি প্রমিজ ট্রিপ রান হবে
    const deletePromise = deleteUserAction(userId).then((res) => {
      if (res.success) {
        // স্টেট থেকে ইউজার রিমুভ
        setUsers((prev) => prev.filter((u) => u._id?.$oid !== userId && u._id !== userId));
        return res.message || "User deleted permanently.";
      } else {
        throw new Error(res.message || "Failed to delete user");
      }
    });

    // সুন্দর প্রফেশনাল লোডার ও সাকসেস টোস্ট
    toast.promise(deletePromise, {
      loading: "Deleting user account...",
      success: (msg) => msg,
      error: (err) => err.message,
    });
  };;

  return (
    <Table aria-label="User Management Table" className="bg-white text-zinc-800 shadow-none">
      <Table.ResizableContainer>
        <Table.Content aria-label="Table with resizable columns" className="min-w-[750px]">
          <Table.Header>
            <Table.Column isRowHeader defaultWidth="1.5fr" id="profile" minWidth={220} className="text-zinc-700 font-bold bg-zinc-50 border-b border-zinc-200">
              PROFILE DETAILS <Table.ColumnResizer />
            </Table.Column>
            <Table.Column defaultWidth="1.5fr" id="email" minWidth={220} className="text-zinc-700 font-bold bg-zinc-50 border-b border-zinc-200">
              EMAIL ADDRESS <Table.ColumnResizer />
            </Table.Column>
            <Table.Column defaultWidth="0.8fr" id="subscription" minWidth={120} className="text-zinc-700 font-bold bg-zinc-50 border-b border-zinc-200">
              SUBSCRIPTION <Table.ColumnResizer />
            </Table.Column>
            <Table.Column defaultWidth="1.2fr" id="role" minWidth={160} className="text-zinc-700 font-bold bg-zinc-50 border-b border-zinc-200">
              ROLE LEVEL <Table.ColumnResizer />
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

                  <Table.Cell>
                    <span className="text-zinc-600 text-sm">{user?.email || "N/A"}</span>
                  </Table.Cell>

                  <Table.Cell>
                    <Chip color={user?.plan === "pro" ? "success" : "default"} size="sm" variant="soft" className="font-bold tracking-wider text-[10px] uppercase">
                      {user?.plan === "pro" ? "Premium" : "Free"}
                    </Chip>
                  </Table.Cell>

                  <Table.Cell>
                    <Select className="w-full max-w-[130px]" placeholder="Select role" selectedKey={user?.role || "user"} onSelectionChange={(key) => handleRoleChange(userId, key)}>
                      <Select.Trigger className="h-8 min-h-8 bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-700 text-xs font-medium">
                        <Select.Value /> <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover className="bg-white border border-zinc-200 rounded-xl shadow-lg">
                        <ListBox>
                          <ListBox.Item id="user" textValue="User" className="text-xs text-zinc-700 hover:bg-zinc-50 rounded-md">User</ListBox.Item>
                          <ListBox.Item id="creator" textValue="Creator" className="text-xs text-zinc-700 hover:bg-zinc-50 rounded-md">Creator</ListBox.Item>
                          <ListBox.Item id="admin" textValue="Admin" className="text-xs text-zinc-700 hover:bg-zinc-50 rounded-md">Admin</ListBox.Item>
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </Table.Cell>

                  <Table.Cell className="text-right pr-6">
                    {/* <Button 
                      isIconOnly size="sm" variant="flat" 
                      className="bg-zinc-50 hover:bg-red-50 hover:text-red-600 text-zinc-400 rounded-md w-7 h-7 transition-all"
                      onClick={() => handleDeleteUser(user)} // 🚀 সরাসরি উইন্ডো কনফার্ম কল হবে
                    >
                      <Trash2 size={14} />
                    </Button> */}

                      <AlertDialog>
      <Button variant="danger-soft"><Trash2 size={14} /></Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete user permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{user?.name}</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button 
              slot="close" 
              variant="danger"
              onClick={() => handleDeleteUser(user)}
              >
                Delete User
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>

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