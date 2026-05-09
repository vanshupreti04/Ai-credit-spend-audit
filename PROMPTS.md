# 🤖 PROMPTS

<p align="center">
  <img src="https://img.shields.io/badge/Gemini-AI-orange?style=for-the-badge" />
  <img src="https://img.shields.io/badge/LLM-Structured_Output-blueviolet?style=for-the-badge" />
  <img src="https://img.shields.io/badge/JSON-Response-green?style=for-the-badge" />
</p>

<p align="center">
  Prompt engineering strategy used for AI-generated executive summaries in Credex AI Spend Audit.
</p>

---

# 🎯 Purpose

The application uses **Gemini** to generate a personalized executive summary from the deterministic audit result.

The LLM is intentionally **not used for audit math**.

The rule-based audit engine handles:
- Savings calculations
- Risk scoring
- Findings generation
- Recommendation logic
- Credex fit analysis

Gemini is used only to convert structured audit results into a readable business report.

---

# 🧠 Prompt Flow

```txt
Structured Audit Result
        ↓
 Gemini API Route
        ↓
 Structured JSON Response
        ↓
 Dashboard Rendering
```
---

# ⚡ Main Gemini Prompt

```
You are an expert AI FinOps auditor for a SaaS product called Credex Audit.

Your task:
Generate a professional AI spend audit report from the structured audit data below.

IMPORTANT RULES:
- Do not invent numbers.
- Only use the provided audit data.
- Be clear, business-friendly, and practical.
- Write like a real SaaS audit report.
- Avoid generic motivational language.
- Focus on spend optimization, tool overlap, seat waste, API risk, and next actions.

Return ONLY valid JSON in this exact shape:

{
  "executiveSummary": "A detailed paragraph summarizing the team's AI spend situation.",
  "scoreExplanation": "A paragraph explaining the overall score and waste score.",
  "keyRisks": [
    {
      "title": "Risk title",
      "description": "Short explanation",
      "severity": "LOW | MEDIUM | HIGH"
    }
  ],
  "recommendedActions": [
    {
      "title": "Action title",
      "description": "Practical action explanation",
      "impact": "Expected business impact"
    }
  ],
  "finalVerdict": "A final paragraph explaining what the team should do next."
}
```

---

# 📦 Runtime Audit Data Appended

The runtime prompt dynamically appends structured audit data such as:

| Field | Purpose |
|---|---|
| 📊 Overall Score | Efficiency evaluation |
| ⚠️ Waste Score | Overspending indicator |
| 🧠 Maturity Level | Optimization maturity |
| 💰 Monthly Spend | Current AI spend |
| 📆 Yearly Spend | Annualized spend |
| 💸 Estimated Savings | Potential optimization value |
| 👥 Spend Per Employee | Efficiency benchmark |
| 🔁 Duplicate Tool Risk | Overlapping subscriptions |
| 🪑 Seat Waste Risk | Unused paid seats |
| 📈 API Volatility Risk | API instability exposure |
| 🎯 Credex Fit | High-value lead detection |
| 📋 Findings | Audit observations |
| ✅ Recommendations | Optimization actions |

---

# 🏗️ Why The Prompt Is Structured This Way

## 📄 Structured JSON Output

The prompt forces JSON output so the frontend can render:
- Cards
- Risk blocks
- Recommendation sections
- Summary panels

instead of displaying one large paragraph.

This makes the dashboard cleaner and easier to scan.

---

## 🔒 Preventing Hallucinated Numbers

The prompt explicitly says:

```txt
Do not invent numbers.
Only use the provided audit data.
```

because financial products require trust and consistency.

The deterministic audit engine already calculates:
- Savings
- Risk scores
- Findings
- Recommendations

Gemini should only interpret the data.

---

## 💼 Business-Friendly Tone

The prompt asks Gemini to write like:
- A SaaS audit platform
- A finance operations tool
- A real optimization report

instead of:
- Generic AI assistant output
- Motivational copy
- Overly technical explanations

The target audience includes:
- Startup founders
- Finance operators
- Engineering managers

---

# ❌ What Did Not Work

## 1️⃣ Free-Form Paragraph Output

Initially, Gemini returned large paragraphs.

Problems:
- Harder to display cleanly
- Inconsistent formatting
- Difficult to split into UI sections

Structured JSON worked much better.

---

## 2️⃣ Asking Gemini To Calculate Savings

This was intentionally removed.

Problems:
- Inconsistent calculations
- Hallucinated numbers
- Mismatch with audit engine
- Lower trustworthiness

Financial logic was moved entirely into the deterministic audit engine.

---

## 3️⃣ Long Multi-Page Reports

Long outputs looked impressive but created:
- Text-heavy dashboards
- Poor readability
- Weak UX

Short structured sections produced a cleaner experience.

---
