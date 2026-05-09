# 🧪 TESTS.md

<p align="center">
  <img src="https://img.shields.io/badge/Vitest-Testing-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/CI-Passing-brightgreen?style=for-the-badge&logo=githubactions" />
  <img src="https://img.shields.io/badge/Tests-5_Passed-success?style=for-the-badge" />
</p>

<p align="center">
  Automated testing coverage for the Credex AI Spend Audit platform.
</p>

---

# ⚡ Testing Framework

The project uses **Vitest** for automated testing.

The primary focus of testing is the deterministic audit engine because it contains the core financial recommendation and optimization logic used throughout the application.

---

# ▶️ How to Run Tests

## Run All Tests

```bash
npm run test
```

---

# 📁 Test File

```txt
src/lib/audit-engine.test.ts
```

---

# ✅ Automated Tests Written

## 1️⃣ Healthy Optimized Stack

### Purpose

Checks that a properly configured daily-used ChatGPT setup returns:

- High efficiency score
- Low waste score
- Minimal recommendations

### Validates

✅ Plan fit logic  
✅ Healthy stack scoring  
✅ Stable optimization calculations  

---

## 2️⃣ Duplicate Assistant Tools

### Purpose

Checks that overlapping assistant tools such as:

- ChatGPT
- Claude

increase duplicate tooling risk.

### Validates

✅ Duplicate tool detection  
✅ Waste findings generation  
✅ Recommendation logic  

---

## 3️⃣ Seat Waste Detection

### Purpose

Checks that rarely used paid tools with excessive seats create:

- High seat waste risk
- Savings recommendations
- Efficiency penalties

### Validates

✅ Seat optimization analysis  
✅ Unused subscription detection  
✅ Cost reduction calculations  

---

## 4️⃣ API Volatility Detection

### Purpose

Checks that high OpenAI API spend increases API volatility risk.

### Validates

✅ API spend monitoring  
✅ Volatility scoring  
✅ Risk findings generation  

---

## 5️⃣ Credex Fit Detection

### Purpose

Checks that high-savings audits are marked as strong Credex opportunities when monthly savings exceed the configured threshold.

### Validates

✅ Lead qualification logic  
✅ Savings threshold detection  
✅ High-value opportunity identification  

---

# 🎯 Why These Tests Matter

The audit engine is the most important business logic in the application.

These tests verify the behaviors that make the audit system financially explainable and defensible.

## Covered Logic Areas

| Logic Area | Covered |
|---|---|
| Plan fit analysis | ✅ |
| Duplicate tool detection | ✅ |
| Seat waste detection | ✅ |
| API volatility analysis | ✅ |
| Savings estimation | ✅ |
| Recommendation generation | ✅ |
| Lead qualification | ✅ |

---

# ⚙️ CI Integration

The project includes a GitHub Actions CI workflow.

The workflow automatically runs:

```bash
npm run lint
npm run test
npm run build
```

on every push to `main`.

---

# 📊 Current Status

| Metric | Status |
|---|---|
| Test Files | ✅ 1 Passed |
| Total Tests | ✅ 5 Passed |
| CI Workflow | ✅ Passing |
| Build Validation | ✅ Passing |
| Lint Validation | ✅ Passing |

---

# ✅ Vitest Execution Result

<img width="1155" height="558" alt="Screenshot 2026-05-09 213424" src="https://github.com/user-attachments/assets/a5be15fa-8067-409a-9711-1b6cfc4ec7cd" />


---

# 🏁 Final Notes

The current test suite focuses primarily on the audit engine because it powers:

- Savings calculations
- Risk analysis
- Recommendation generation
- Lead qualification
- Financial reasoning

The deterministic design of the audit engine makes it highly testable and more reliable than AI-generated financial calculations.
