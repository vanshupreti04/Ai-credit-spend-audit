# 🏗️ ARCHITECTURE.md

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-Fullstack-black?style=for-the-badge&logo=nextdotjs" />
  <img src="https://img.shields.io/badge/TypeScript-Strict-blue?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/Supabase-Backend-green?style=for-the-badge&logo=supabase" />
  <img src="https://img.shields.io/badge/Gemini-AI-orange?style=for-the-badge" />
</p>

<p align="center">
  Technical architecture and system flow for the Credex AI Spend Audit platform.
</p>

---

# 🌐 System Architecture

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/8875ed69-7b9e-4b1e-ad74-e510151ebf72" />

---

# ⚡ Core Architecture Flow

```txt
User Input
   ↓
Rule-Based Audit Engine
   ↓
Structured Audit Result
   ↓
Gemini Summary Generation
   ↓
Results Dashboard
   ↓
Lead Capture
   ↓
Supabase Storage
   ↓
Public Report URL + PDF Export
```

---

# 🧠 Frontend Layer

The frontend is built using Next.js App Router with TypeScript and Tailwind CSS.

## Responsibilities

- Audit input form
- Results dashboard
- Public report pages
- Lead capture modal
- PDF export
- Responsive UI rendering

## Frontend State

| Storage | Purpose |
|---|---|
| Local Storage | Persist audit form state |
| React State | Dashboard rendering |
| URL Params | Public report routing |

---

# ⚙️ Audit Engine

The audit engine is fully deterministic and handles all financial calculations.

## Engine Responsibilities

✅ Savings estimation  
✅ Waste scoring  
✅ Duplicate tool detection  
✅ Seat optimization analysis  
✅ Recommendation generation  
✅ Efficiency scoring  

## Why Deterministic Logic

Financial recommendations should remain:
- Explainable
- Repeatable
- Traceable

LLMs are intentionally not used for calculations.

---

# 🤖 AI Summary Layer

Gemini is used only for generating the executive summary.

## Flow

```txt
Structured Audit Result
        ↓
 Gemini API Route
        ↓
 Personalized Summary
```

## Why AI Is Limited

AI improves readability but does not control:
- Savings calculations
- Risk scoring
- Recommendations
- Financial logic

This keeps the audit system reliable.

---

# 🗄️ Backend Architecture

Supabase acts as the primary backend service.

## Main Backend Responsibilities

| Service | Purpose |
|---|---|
| Supabase | Report & lead storage |
| Resend | Transactional emails |
| Next.js API Routes | Server-side processing |

---

# 📦 Database Structure

## `audit_reports`

Stores:
- Audit payload
- Savings data
- Findings
- Public report ID
- Generated summary

---

## `audit_leads`

Stores:
- Name
- Email
- Company
- Team size
- Linked report ID

---

# 🌍 Public Report System

Every completed audit receives a unique public URL.

## Example

```txt
/report/[id]
```

## Public Reports Include

✅ Savings analysis  
✅ Recommendations  
✅ Charts  
✅ AI summary  

## Hidden From Public View

❌ Email address  
❌ Company contact info  
❌ Lead metadata  

---

# 📧 Email Delivery Flow

```txt
Lead Captured
      ↓
Save Report
      ↓
Generate Public URL
      ↓
Send Email via Resend
```

The user receives a shareable report link after submission.

---

# 📄 PDF Export Flow

PDF reports are generated client-side using structured audit data.

## Export Includes

- Savings summary
- Spend breakdown
- Recommendations
- Charts
- AI summary

---
