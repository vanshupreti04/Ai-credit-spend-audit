# 🚀 Credex AI Spend Audit

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs" />
  <img src="https://img.shields.io/badge/TypeScript-Strict-blue?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/Supabase-Backend-green?style=for-the-badge&logo=supabase" />
  <img src="https://img.shields.io/badge/CI-Passing-brightgreen?style=for-the-badge&logo=githubactions" />
</p>

<p align="center">
  AI Spend Audit platform for startups to detect overspending across AI tools, generate optimization reports, and surface actionable savings opportunities.
</p>

---

# 🌐 Live Links

### 🔗 Live Application
https://ai-credit-spend-audit.vercel.app/

---

# 📸 Screenshots

## 🏠 Landing Page
<img width="1895" height="912" alt="Screenshot 2026-05-09 203304" src="https://github.com/user-attachments/assets/cf9e2c6c-f213-4384-a3b8-af60a354aa9c" />


---

## 📝 Audit Form

<img width="1822" height="792" alt="Screenshot 2026-05-09 203343" src="https://github.com/user-attachments/assets/410911c6-2c32-4f58-a2e9-b0c1641ae6e9" />


---

## 📊 Results Dashboard

<p align="center">
  <img width="90%" alt="Results Dashboard 1" src="https://github.com/user-attachments/assets/920e6fb8-8678-474d-9ebf-bf9259ec8f6b" />
</p>

<br/>

<p align="center">
  <img width="90%" alt="Results Dashboard 2" src="https://github.com/user-attachments/assets/6b62a494-6824-4d10-8c14-243bea207acc" />
</p>

<br/>

<p align="center">
  <img width="90%" alt="Results Dashboard 3" src="https://github.com/user-attachments/assets/1533237c-d9ac-4cce-97b1-2a4fcef3db16" />
</p>

---

# ✨ What I Built

Credex AI Spend Audit is a full-stack AI cost optimization platform designed for startup founders, engineering managers, and finance teams.

The platform allows users to:

- Enter AI tools and subscription details
- Analyze overspending patterns
- Generate AI-powered audit summaries
- View savings opportunities
- Export PDF reports
- Capture leads after delivering value
- Share reports through public URLs

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/892e26d6-1687-4d69-ac72-26ce25d06510" />


---

# 🔥 Core Features

💾 AI spend input form with persisted state  
🧠 Rule-based audit engine  
💸 Savings estimation system  
✨ AI-generated personalized summary  
📊 Interactive analytics dashboard  
🌐 Public shareable report URLs  
📄 PDF report export  
📬 Lead capture after value delivery  
🗄️ Supabase backend integration  
📧 Transactional email support using Resend  
🧪 Automated Vitest test coverage  
⚙️ GitHub Actions CI pipeline  
🎨 Responsive UI using Tailwind CSS  
🛡️ Graceful AI fallback handling  

---

# 🧠 Supported AI Tools

<p align="center">

<img src="https://img.shields.io/badge/Cursor-AI-000000?style=for-the-badge" />
<img src="https://img.shields.io/badge/GitHub_Copilot-181717?style=for-the-badge&logo=github" />
<img src="https://img.shields.io/badge/Claude-AI-orange?style=for-the-badge" />
<img src="https://img.shields.io/badge/ChatGPT-OpenAI-10A37F?style=for-the-badge&logo=openai" />
<img src="https://img.shields.io/badge/Anthropic-API-black?style=for-the-badge" />
<img src="https://img.shields.io/badge/OpenAI-API-412991?style=for-the-badge&logo=openai" />
<img src="https://img.shields.io/badge/Gemini-Google-blue?style=for-the-badge&logo=google" />
<img src="https://img.shields.io/badge/Windsurf-AI-purple?style=for-the-badge" />

</p>

The audit engine currently supports:

- 🧩 Multiple pricing plans
- 👥 Seat-based calculations
- 💰 Spend tracking
- 🎯 Recommendation logic
- 📈 Savings analysis

---

# 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| ![Next.js](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=white) | Frontend framework & routing |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) | Type safety & scalable logic |
| ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38BDF8?logo=tailwindcss&logoColor=white) | UI styling |
| ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white) | Backend & database |
| ![Gemini](https://img.shields.io/badge/Gemini-AI-orange) | AI-generated summaries |
| ![Resend](https://img.shields.io/badge/Resend-Email-black) | Transactional emails |
| ![Recharts](https://img.shields.io/badge/Recharts-Charts-blue) | Dashboard visualizations |
| ![jsPDF](https://img.shields.io/badge/jsPDF-PDF-red) | PDF report export |
| ![Vitest](https://img.shields.io/badge/Vitest-Testing-green) | Automated testing |
| ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI-2088FF?logo=githubactions&logoColor=white) | CI pipeline |

---

# ⚡ Quick Start

## 📥 Clone Repository

```bash
git clone https://github.com/vanshupreti04/Ai-credit-spend-audit
cd Ai-credit-spend-audit
```

---

## 📦 Install Dependencies

```bash
npm install
```

---

## ▶️ Run Development Server

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

---

# 🔐 Environment Variables

Create a `.env.local` file:

```env
GEMINI_API_KEY=your_gemini_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
RESEND_API_KEY=your_resend_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For production:

```env
NEXT_PUBLIC_SITE_URL=https://your-vercel-url.vercel.app
```

---

# 🧪 Available Scripts

## Run Tests

```bash
npm run test
```

---

## Run Lint

```bash
npm run lint
```

---

## Build Application

```bash
npm run build
```

---

# 🏗️ Architecture Highlights

- Deterministic rule-based audit engine
- AI-generated narrative summaries
- Public report generation
- PDF export pipeline
- Persisted client-side form state
- Server-side API routes
- Graceful fallback handling
- Secure environment variables
- Modular reusable component structure

---

# 🎯 Key Engineering Decisions

## 1️⃣ Rule-Based Audit Logic Instead of AI Calculations

Financial audit recommendations must remain explainable and consistent. The audit calculations use deterministic logic while AI is used only for narrative summaries.

---

## 2️⃣ Value Before Lead Capture

Users receive the audit results before email capture to create trust and improve conversion quality.

---

## 3️⃣ Supabase for Persistent Storage

Supabase stores reports and lead information while local storage only handles temporary form persistence.

---

## 4️⃣ Public URLs Instead of Authentication

The MVP avoids unnecessary auth complexity and focuses on frictionless report sharing.

---

## 5️⃣ Structured PDF Export

Instead of screenshot-based exports, structured PDFs are generated directly from audit data for cleaner formatting.

---

# ✅ Testing & CI

The project includes:

- Automated audit engine tests
- Vitest coverage
- GitHub Actions CI workflow
- Type-safe builds
- Lint validation
- AI fallback validation

CI automatically runs:
- Lint
- Tests
- Production build

on every push to `main`.

---
