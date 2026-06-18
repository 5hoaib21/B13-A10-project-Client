"use client";

import React from "react";
import { Card, Button } from "@heroui/react";
import { CircleCheck, Firewall } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";

export default function UserPricingPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const userRole = user?.role; // Expected: "User" or "Creator"
  console.log("user", userRole);

 // Configured data structure for explicit AI Prompt Marketplace One-Time flat payment layout
  const oneTimePlans = [
    {
      name: "Standard Prompt Explorer",
      role: "User",
      price: "$5",
      period: "/one-time payment",
      description: "Perfect for prompt enthusiasts, engineers, and casual prompt buyers.",
      features: [
        "Lifetime marketplace access",
        "Unlock & copy premium verified prompts",
        "Organize unlimited prompts in custom Collections",
        "Advanced searching & category filtering tools",
        "Direct interaction with top creators via reviews",
        "Standard customer email support",
      ],
      popular: false,
    },
    {
      name: "Premium Prompt Architect",
      role: "Creator",
      price: "$5",
      period: "/one-time payment",
      description: "For prompt engineers and AI creators looking to publish & monetize setups.",
      features: [
        "Unlimited engineering prompt listings",
        "Advanced sales & engagement analytics dashboard",
        "Support for dynamic parameters [Variables] insertion",
        "Priority marketplace indexing & trending placement",
        "Automated community review management system",
        "24/7 Priority platform developer support",
      ],
      popular: true,
    },
  ];

  // 💡 FIX LOGIC: Filter out plans based on dynamic active logged-in user role
  // Jodi user dynamic login state-e accurate thake, shudhu tar corresponding card dekhabe.
  const filteredPlans = userRole 
    ? oneTimePlans.filter(plan => plan.role.toLowerCase() === userRole.toLowerCase())
    : oneTimePlans;

  return (
   <main className="w-full min-h-screen bg-slate-50 text-zinc-800 pt-32 pb-24 px-4 overflow-hidden relative">
  {/* 🌌 Background Decorative Mesh Blurs (Light Theme Soft Tones) */}
  <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none" />
  <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

  {/* Hero Header Block */}
  <section className="mx-auto max-w-4xl text-center space-y-4 mb-20 relative z-10">
    <span className="px-3 py-1 rounded-full border border-zinc-200 bg-white/80 text-[11px] font-semibold text-indigo-600 tracking-wider uppercase backdrop-blur-md shadow-xs">
      Simple Pricing
    </span>
    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-900 leading-tight">
      Unlock Lifetime Access <br />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
        No Monthly Subscriptions
      </span>
    </h1>
    <p className="mx-auto max-w-xl text-sm sm:text-base text-zinc-500 font-normal leading-relaxed">
      Pay once, enjoy forever. Your customized pricing matrix is automatically locked into your designated account role.
    </p>
  </section>

  {/* Pricing Grids - Dynamic Layout Context Adjustment */}
  <section className="mx-auto max-w-4xl px-4 pb-20 relative z-10">
    <div 
      className={`grid gap-8 items-stretch w-full mx-auto ${
        filteredPlans.length === 1 
          ? "max-w-md grid-cols-1" // Single card perfectly centered in middle
          : "max-w-3xl md:grid-cols-2" // Fallback default view
      }`}
    >
      {filteredPlans.map((plan) => (
        <Card
          key={plan.name}
          className={`relative bg-white border p-6 sm:p-8 rounded-[24px] flex flex-col justify-between transition-all duration-300 ${
            plan.popular || filteredPlans.length === 1
              ? "border-indigo-500 shadow-xl shadow-indigo-500/5 ring-4 ring-indigo-500/5 -translate-y-1" 
              : "border-zinc-200 shadow-xs hover:border-zinc-300 hover:shadow-md"
          }`}
        >
          {(plan.popular || filteredPlans.length === 1) && (
            <span className="absolute top-4 right-4 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
              <Firewall size={12} /> Best Value
            </span>
          )}

          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-bold text-zinc-900">{plan.name}</h3>
              <p className="text-xs text-zinc-400 mt-1 min-h-[32px]">
                {plan.description}
              </p>
            </div>

            <div className="flex items-baseline gap-1 py-2 border-b border-zinc-100">
              <span className="text-5xl font-extrabold text-zinc-900 tracking-tight">
                {plan.price}
              </span>
              <span className="text-zinc-400 text-xs font-medium lowercase tracking-wide">
                {plan.period}
              </span>
            </div>

            <ul className="space-y-3.5 pt-2">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 text-sm text-zinc-600 leading-relaxed"
                >
                  <CircleCheck
                    className="text-indigo-600 mt-0.5 shrink-0"
                    size={16}
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button
            color={plan.popular || filteredPlans.length === 1 ? "primary" : "default"}
            variant={plan.popular || filteredPlans.length === 1 ? "solid" : "bordered"}
            className={`w-full mt-8 h-11 rounded-xl text-sm font-semibold tracking-wide transition-all ${
              plan.popular || filteredPlans.length === 1
                ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/10"
                : "border-zinc-200 bg-transparent text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900"
            }`}
          >
            Pay Once As {plan.role}
          </Button>
        </Card>
      ))}
    </div>
  </section>
</main>
  );
}