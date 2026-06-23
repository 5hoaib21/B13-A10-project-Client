"use client";

import React, { useState } from "react";
import { Table } from "@heroui/react";
import { User } from "lucide-react";

export default function AdminPaymentTable({ initialPayments }) {
  const [payments] = useState(initialPayments);

  return (
    <Table aria-label="Stripe Payments Table" className="bg-white text-zinc-800 shadow-none">
      <Table.ScrollContainer>
        <Table.Content className="min-w-[800px]">
          {/* 🎯 লাইট থিম কলাম হেডার */}
          <Table.Header>
            <Table.Column isRowHeader className="text-zinc-700 font-bold bg-zinc-50 border-b border-zinc-200 text-xs tracking-wider">
              TRANSACTION ID / SESSION
            </Table.Column>
            <Table.Column className="text-zinc-700 font-bold bg-zinc-50 border-b border-zinc-200 text-xs tracking-wider">
              PURCHASER DETAILS
            </Table.Column>
            <Table.Column className="text-zinc-700 font-bold bg-zinc-50 border-b border-zinc-200 text-xs tracking-wider">
              BILLING EMAIL
            </Table.Column>
            <Table.Column className="text-zinc-700 font-bold bg-zinc-50 border-b border-zinc-200 text-xs tracking-wider">
              AMOUNT CHARGED
            </Table.Column>
            <Table.Column className="text-right pr-6 text-zinc-700 font-bold bg-zinc-50 border-b border-zinc-200 text-xs tracking-wider">
              PRICE ID
            </Table.Column>
          </Table.Header>
          
          <Table.Body>
            {payments.map((payment, index) => (
              <Table.Row 
                key={payment._id?.$oid || payment._id || index} 
                className="border-b border-zinc-100 hover:bg-zinc-50/80 transition-colors"
              >
                {/* ১. TRANSACTION / SESSION ID */}
                <Table.Cell>
                  <span className="font-mono text-xs text-indigo-600 font-semibold block max-w-[220px] truncate hover:text-indigo-500 cursor-pointer">
                    {payment?.sessionId || "N/A"}
                  </span>
                </Table.Cell>
                
                {/* ২. PURCHASER DETAILS */}
                <Table.Cell>
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 text-zinc-400">
                      <User size={14} />
                    </span>
                    <div className="flex flex-col">
                      <span className="font-semibold text-zinc-900 text-sm">
                        {payment?.customerName || "User"}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400 tracking-tight">
                        ID: {payment?.userId || "N/A"}
                      </span>
                    </div>
                  </div>
                </Table.Cell>
                
                {/* ৩. BILLING EMAIL */}
                <Table.Cell>
                  <span className="text-zinc-600 text-sm font-normal">
                    {payment?.customerEmail || "N/A"}
                  </span>
                </Table.Cell>
                
                {/* ৪. AMOUNT CHARGED */}
                <Table.Cell>
                  <span className="text-emerald-600 font-bold text-sm bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 inline-block">
                    ${parseFloat(payment?.price || 0).toFixed(2)}
                  </span>
                </Table.Cell>
                
                {/* ৫. PRICE ID */}
                <Table.Cell className="text-right pr-6">
                  <span className="text-xs font-mono text-zinc-400">
                    {payment?.priceId || "N/A"}
                  </span>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}