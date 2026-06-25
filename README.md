# 🚀 PromptForge, AI Prompt Sharing & Marketplace Platform

An advanced, modern, community-driven ecosystem engineered for AI enthusiasts to create, discover, discover, and manage high-quality AI prompts across diverse models like ChatGPT, Gemini, Claude, and Midjourney.

---

## 🌐 Live Deployment
🔗 **Live Application URL:** [Clink here](https://b13-a10-project-client.vercel.app)  

---

## 🎯 Project Purpose
The **AI Prompt Sharing & Marketplace Platform** bridges the gap between creative prompt engineers and AI users. It serves as a secure, role-based hub where users can exchange optimized blueprints for different AI tools. The platform aims to maximize productivity by offering robust searching, advanced filtering, community validation through reviews, and granular dashboard analytics for content creators and administrators alike.

---

## ✨ Key Features

### 👤 User & Authentication Management
- **Secure Authentication:** Seamless session management powered by `Better-Auth` with MongoDB persistence layer.
- **Role-Based Access Control (RBAC):** Distinct interfaces and guard rails tailored for **Users**, **Creators**, and **Administrators**.

### ⚡ Core Prompt Operations
- **Dynamic Exploration Hub:** Real-time lookup with lightning-fast search matching titles, tool tags, and keywords.
- **Advanced multi-axis filtering:** Refine assets effortlessly by Category, AI Tool, and Difficulty tiers.
- **Optimized Content Sorting:** Instantly arrange community blueprints by Latest additions, Popularity, or Copy counts.
- **Submission Guard Rails:** Free tier account limits capped at 3 prompt submissions before enforcing premium subscription plans.

### 📊 Interactive Engagement & Dashboards
- **One-Click Bookmark:** Save and catalog favorite prompts instantly into a customized collection layout.
- **Community Review System:** Rate and share detailed textual feedback on prompts with interactive star metrics.
- **Analytics Visualization:** Beautiful tracking metrics using responsive chart widgets (`Recharts`).
- **Responsive Navigation Structure:** Features a desktop-optimized sidebar transitioning into an fluid mobile drawer interaction interface.

### 🛡️ Administrative Controls
- **Prompt Moderation Workflow:** Administrative approval pipeline changing state transitions (`pending` to `approved`) seamlessly.
- **User & Payment Management:** Comprehensive panels for monitoring ecosystem transactions and user tiers.

---

## 📦 Core NPM Packages Used

### 🌐 Framework & Design Tokens
- `next (v16.2.9)` - Production-grade React framework running under specialized Turbopack compilation.
- `react (v19.2.4) & react-dom` - Core rendering engine operating with experimental React compiler optimization support.
- `tailwindcss (v4)` - Premium utility-first styling engine utilizing optimized PostCSS pipelines.

### 🔑 Authentication & Database Connectivity
- `better-auth (v1.6.17)` - Full-stack security structure handles robust session hooks.
- `@better-auth/mongo-adapter` - Adapter linking identity protocols securely with database layers.
- `mongodb (v7.3.0)` - Raw driver processing fast query execution sequences natively.

### 🎨 Component Library & Animation Layer
- `@heroui/react (v3.1.0) & @heroui/styles` - Premium design system providing foundational accessible UI components like Dialogs, Selects, and Drawers.
- `framer-motion (v12.40.0)` - Advanced declarative physics-based interaction engine handling view entrances.
- `embla-carousel-react & embla-carousel-autoplay` - Lightweight touch-fluid slideshow system.
- `react-fast-marquee` - Infinite horizontal looping showcase tickers.

### 📊 Validation & Visual Indicators
- `react-hook-form & @hookform/resolvers` - Performance-focused schema-validated form context state controller.
- `zod (v4.4.3)` - Strict TypeScript-first schema declaration and data validation engine.
- `recharts (v3.9.0)` - Composited declarative chart widgets charting dashboard analytics.
- `react-hot-toast` - Elegant asynchronous feedback notifications.

### 🗺️ Iconography
- `@gravity-ui/icons`
- `lucide-react`
- `react-icons`
- `@iconify/react`

### 💳 Transaction Systems
- `stripe` - Secure payment architecture backend handling pro tier subscription workflows.

---

## 🛠️ Local Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
   cd your-repo-name