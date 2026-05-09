># 🛠️ DEVLOG

> Development progress log for the Credex AI Spend Audit assignment.

---

# 📅 Day 1 — 2026-05-06

**Hours worked:** 4

## ✅ What I did

- Reviewed the full Credex assignment requirements
- Planned the MVP scope and feature flow
- Set up the Next.js + TypeScript project
- Configured Tailwind CSS and base folder structure
- Started building the landing page sections
- Added hero section, CTA flow, and navigation layout

## 🧠 What I learned

The assignment focuses heavily on:
- product thinking,
- shipping quality,
- and realistic engineering trade-offs

instead of only frontend implementation.

## ⚠️ Blockers

Understanding how detailed the audit engine should be without making the MVP overly complex.

## 🎯 Plan for tomorrow

Build the audit form and start implementing audit logic.

---

# 📅 Day 2 — 2026-05-07

**Hours worked:** 6

## ✅ What I did

- Built the audit form flow
- Added inputs for:
  - tools,
  - plans,
  - spend,
  - seats,
  - workflow type,
  - usage frequency
- Added local form persistence
- Started implementing deterministic audit rules
- Added initial savings calculations and findings logic

## 🧠 What I learned

The form needed enough detail for meaningful recommendations while still feeling fast enough for a cold visitor.

## ⚠️ Blockers

Balancing realistic scoring without unfairly penalizing optimized stacks.

## 🎯 Plan for tomorrow

Complete the audit engine and build the results dashboard.

---

# 📅 Day 3 — 2026-05-08

**Hours worked:** 7

## ✅ What I did

- Completed the deterministic audit engine
- Added:
  - risk scoring,
  - duplicate tooling detection,
  - seat waste analysis,
  - savings estimation
- Built the results dashboard UI
- Added charts and recommendation cards
- Integrated Gemini summary generation
- Added fallback handling for AI failures

## 🧠 What I learned

Rule-based financial logic feels significantly more trustworthy than AI-generated calculations.

The LLM worked best for:
- summaries,
- explanations,
- and executive-style reporting.

## ⚠️ Blockers

Handling invalid Gemini JSON responses safely.

## 🎯 Plan for tomorrow

Integrate backend storage and public report sharing.

---

# 📅 Day 4 — 2026-05-09

**Hours worked:** 8

## ✅ What I did

- Integrated Supabase backend
- Added lead capture modal
- Saved reports and leads to the database
- Built unique public shareable report URLs
- Added Resend transactional email support
- Added PDF export functionality
- Improved public report rendering

## 🧠 What I learned

Capturing email after value delivery creates a much better user experience than gating the audit before results.

## ⚠️ Blockers

Making sure public reports hide private lead information while still showing useful audit details.

## 🎯 Plan for tomorrow

Add tests, CI workflow, deployment, and complete documentation.

---

# 📅 Day 5 — 2026-05-10

**Hours worked:** 10

## ✅ What I did

- Added Vitest audit-engine tests
- Created GitHub Actions CI workflow
- Fixed TypeScript and lint issues
- Improved responsiveness and UI polish
- Deployed the project to Vercel
- Completed all required markdown documentation files
- Finalized README screenshots and diagrams
- Reviewed deployment and audit flows end-to-end

## 🧠 What I learned

CI workflows exposed several issues that still appeared to work locally.

The documentation and reasoning behind decisions are almost as important as the working product itself.

## ⚠️ Blockers

Final deployment verification and documentation cleanup.

## 🎯 Final Status

Completed the full MVP including:
- deterministic audit engine,
- AI-generated summaries,
- Supabase backend,
- public shareable reports,
- transactional email,
- CI pipeline,
- tests,
- deployment,
- and documentation.

---

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/5997b0ec-f75c-49b5-9701-e7a2cb927f30" />
