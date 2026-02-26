# ORCHESTRATOR — Mission Brief

> **This file governs the entire execution phase.** Every agent must follow these rules exactly, in order, with no exceptions.

---

## The 10 Rules

### Rule 1: Read PRD.md first — always, before any code.

Before writing a single line of code, read `PRD.md` in its entirety. It is the single source of truth for what this application does, how it is built, what the Azure OpenAI integration looks like, and what the UI must contain. If a sprint instruction conflicts with the PRD, the PRD wins.

### Rule 2: Open SPRINTS.md and understand the full scope.

After reading the PRD, read `SPRINTS.md` completely. Understand all three sprints, their dependencies, and their acceptance criteria before starting Sprint 1. You need the full picture to avoid decisions in Sprint 1 that create problems in Sprint 3.

### Rule 3: Execute sprints in order — 1, then 2, then 3.

Sprint 1 (Frontend Scaffold and Styling) must be fully complete before Sprint 2 begins. Sprint 2 (Backend Server and Azure OpenAI Integration) must be fully complete before Sprint 3 begins. No parallel sprint execution. No skipping ahead.

### Rule 4: Build only what the sprint lists — no added features, no extra dependencies.

Each sprint specifies exact work packages, files to create, and acceptance criteria. Do not add features, utilities, helper functions, configuration files, linting rules, test frameworks, or dependencies that are not listed. If it is not in the sprint, do not build it.

### Rule 5: After completing each sprint, run the application and confirm it starts without errors.

- **Sprint 1:** Open `public/index.html` in a browser. Confirm it renders without console errors.
- **Sprint 2:** Run `npm start`. Confirm the server starts on port 3001 without errors. Run `curl http://localhost:3001/health` and confirm a JSON response.
- **Sprint 3:** Run `npm start`. Open `http://localhost:3001` in a browser. Confirm the full page loads and the textarea is interactive.

### Rule 6: Verify every acceptance criterion in the sprint before proceeding.

Go through each acceptance criterion listed in `SPRINTS.md` for the current sprint. Check each one. If any criterion fails, fix it before moving on. Do not proceed to the commit step with a failing criterion.

### Rule 7: After each sprint passes, commit with a descriptive message.

```bash
# Sprint 1
git add -A && git commit -m "feat: scaffold frontend HTML structure and APH-branded CSS

- Complete HTML with all UI states (input, loading, error, output, tabs)
- Full stylesheet with APH brand tokens, typography, component styles
- City of Austin logo assets copied to public/assets/
- No JavaScript logic, no backend — static scaffold only"

# Sprint 2
git add -A && git commit -m "feat: add Express server with Azure OpenAI integration

- Express server on port 3001 with static file serving
- POST /api/convert calls Azure OpenAI with structured output (Zod schema)
- System prompt for three-audience policy conversion
- Input validation and output sanitization
- Error handling for rate limits, content filters, and truncation
- PDF export endpoint stub with pdfmake"

# Sprint 3
git add -A && git commit -m "feat: wire frontend to backend with full interactivity

- Client-side form submission with character count and validation
- Loading state, error display, and input preservation on error
- Three-tab output rendering (executive, staff, public)
- Metadata bar with confidence and category badges
- Clipboard copy with visual confirmation
- PDF export download trigger
- Non-policy input warning and AI disclaimer"
```

### Rule 8: Only begin the next sprint after the commit.

The commit is the gate. Sprint 2 does not start until Sprint 1's commit is complete. Sprint 3 does not start until Sprint 2's commit is complete. This ensures each sprint is a clean, reversible checkpoint.

### Rule 9: Never skip a commit.

Every sprint produces a commit. Three sprints, three commits. If something goes wrong in a later sprint, we can revert to the previous commit. Skipping a commit eliminates this safety net.

### Rule 10: After all sprints complete, run a final end-to-end test.

After Sprint 3 is committed, perform the full end-to-end test described below. The application is not done until this test passes.

---

## Final End-to-End Test Procedure

1. Start the server: `npm start`
2. Open `http://localhost:3001` in a browser.
3. Confirm: City of Austin logo visible, APH Navy header, Montserrat headings, textarea with placeholder.
4. Paste the **sample policy text** below into the textarea.
5. Confirm the character count updates.
6. Click "Convert Policy."
7. Confirm: loading spinner appears, button is disabled.
8. Wait for the response (up to 60 seconds).
9. Confirm: three tabs appear, Executive Summary is active by default.
10. Confirm: bottom-line statement and risk badge are visible.
11. Click "Staff Briefing" tab. Confirm: key changes table is visible with current/new/action columns.
12. Click "Public Version" tab. Confirm: plain language content with "what you can do" and help info.
13. Confirm: metadata bar shows category, confidence, and word count.
14. Click "Copy" on any tab. Paste into a text editor. Confirm content matches.
15. Click "Export PDF." Confirm a PDF file downloads and opens in a reader.
16. Clear the textarea. Click "Convert Policy." Confirm: error message appears, no network request.
17. Type 10 characters. Click "Convert Policy." Confirm: "too short" error appears.
18. Confirm: the AI disclaimer is visible on the results screen.

---

## Sample Policy Text for Testing

Paste this text into the application to verify the full pipeline:

```
AUSTIN PUBLIC HEALTH DEPARTMENT
POLICY NUMBER: APH-EH-2026-003
EFFECTIVE DATE: March 1, 2026
SUBJECT: Revised Food Establishment Inspection Frequency and Risk-Based Classification

SECTION 1. PURPOSE AND AUTHORITY

This policy establishes a revised risk-based inspection framework for all permitted food establishments operating within the jurisdiction of Austin Public Health (APH), pursuant to Texas Health and Safety Code Chapter 437 and City of Austin Code of Ordinances Chapter 10-3. The revision responds to a 22% increase in permitted food establishments since 2022 and aims to optimize inspector allocation by aligning inspection frequency with empirical risk data rather than uniform scheduling.

SECTION 2. SCOPE

This policy applies to all food establishments holding a valid City of Austin food permit, including but not limited to: full-service restaurants, limited-service restaurants, mobile food vendors, temporary food events, food manufacturing facilities, institutional food services (schools, hospitals, correctional facilities), grocery stores with prepared food departments, and commissary kitchens. Establishments operating under a Texas Department of State Health Services (DSHS) permit but within city limits are excluded from this policy but may be subject to cooperative inspection agreements.

SECTION 3. RISK CLASSIFICATION FRAMEWORK

3.1 Classification Tiers

All permitted food establishments shall be assigned to one of four risk tiers based on a composite risk score calculated from the factors enumerated in Section 3.2:

(a) Tier 1 — Critical Risk (Score 80-100): Establishments with extensive raw protein handling, complex multi-step cooking processes, large-scale catering operations, and/or a history of critical violations. Inspection frequency: quarterly (4 per calendar year).

(b) Tier 2 — High Risk (Score 60-79): Establishments with moderate food preparation complexity, including cook-serve operations, sushi preparation, and smoking/curing processes. Inspection frequency: tri-annually (3 per calendar year).

(c) Tier 3 — Moderate Risk (Score 30-59): Establishments with limited cooking operations, primarily reheating pre-prepared foods, or serving only beverages with minimal food preparation. Inspection frequency: semi-annually (2 per calendar year).

(d) Tier 4 — Low Risk (Score 0-29): Establishments selling only pre-packaged foods, beverages without preparation, or operating as produce-only stands. Inspection frequency: annually (1 per calendar year).

3.2 Risk Score Factors

The composite risk score shall be calculated using the following weighted factors:

- Menu complexity and raw ingredient handling (0-25 points)
- Volume of meals served daily (0-15 points)
- Vulnerable population served, e.g., children, elderly, immunocompromised (0-20 points)
- Historical compliance record over preceding 36 months (0-20 points)
- Facility age and equipment condition (0-10 points)
- Staff food safety certification rate (0-10 points)

3.3 Annual Reclassification

Risk classifications shall be reviewed annually. Establishments demonstrating sustained compliance improvement may be reclassified to a lower tier. Establishments with critical violations or foodborne illness complaints may be immediately reclassified to a higher tier pending a full reassessment.

SECTION 4. IMPLEMENTATION

4.1 Timeline

Phase 1 (March-April 2026): Environmental Health Division completes risk scoring for all currently permitted establishments using the framework in Section 3.2.

Phase 2 (May 2026): New inspection schedules take effect. Notification letters sent to all permit holders communicating their assigned tier and inspection frequency.

Phase 3 (September 2026): First quarterly review of tier assignments. Data analysis on inspection outcomes by tier.

4.2 Resource Requirements

Implementation requires the reallocation of 3 FTE inspector positions from uniform scheduling to risk-targeted deployment. No additional budget appropriation is requested; existing personnel and technology resources are sufficient. The Environmental Health information system (EH-Track) shall be updated to support automated risk scoring and tier-based scheduling.

4.3 Stakeholder Notification

The Communications Division shall develop and distribute informational materials to affected food establishments within 30 days of policy adoption, including a plain-language summary of the new framework, a self-assessment checklist, and contact information for questions. Community meetings shall be held in each Council district during April 2026.

SECTION 5. FISCAL IMPACT

No net increase in departmental expenditure is anticipated. Optimization of inspector allocation is projected to reduce average per-inspection cost by 12-15% while increasing coverage of high-risk establishments by 30%. Annual savings are estimated at $85,000-$120,000 from reduced redundant inspections of low-risk establishments, which may be redirected to fund enhanced training and technology upgrades.

SECTION 6. COMPLIANCE AND ENFORCEMENT

Failure to comply with scheduled inspections may result in permit suspension under City Code Section 10-3-61. Establishments may appeal their risk tier classification through the existing administrative hearing process outlined in Section 10-3-72.

Approved by: Dr. Adrienne Sturrup, Director, Austin Public Health
Date of Approval: February 15, 2026
Review Date: February 2027
```

This sample covers: named policy with section numbers, an effective date, fiscal impact data, multiple affected teams, implementation timeline with phases, risk classification tiers, and regulatory references — all of which should produce rich, structured output across all three audience versions.
