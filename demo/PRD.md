# PRD — Policy Plain Language Converter

> **This is the single source of truth.** Every agent building this application must read this document first.

**Project:** Policy Plain Language Converter
**Department:** Austin Public Health, City of Austin
**Stack:** Node.js + Express server, vanilla HTML/CSS/JS frontend
**AI Provider:** Azure OpenAI (GPT-4.1-mini)

---

## Project Overview

A web application that takes dense public health policy or regulatory text as input and produces three audience-specific outputs from a single submission: an executive summary for leadership, a staff briefing for internal teams, and a plain language version for the public. No frameworks, no build step, no database, no authentication.

## Goals

1. Reduce the time a policy coordinator spends rewriting a single policy for multiple audiences from hours to seconds.
2. Ensure every output is structured, consistent, and ready to distribute without reformatting.
3. Provide a professional, branded experience that looks like an official City of Austin tool.

## Success Criteria

- A user can paste policy text and receive all three outputs within 60 seconds.
- Every error the user sees is plain language — no status codes, stack traces, or technical jargon.
- The exported PDF is professional enough to attach to a city council meeting agenda.
- Non-policy input is flagged, not silently misrepresented.

## Personas

**Maya — Policy Coordinator.** Reads dense regulatory text daily. Needs to communicate changes to leadership, staff, and the public quickly. Primary user of all features.

**David — Department Director.** Reviews summaries before leadership meetings. Has 5 minutes per policy. Needs the bottom line and risk level instantly. Primary user of executive summary and PDF export.

---

## Features

### Must-Have (v1)

| ID   | Feature                             | Acceptance Summary                                                                                                                                                                       |
| ---- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| F-01 | **Text input with character count** | Multi-line textarea, live count showing `n / 100,000`, placeholder text                                                                                                                  |
| F-02 | **Single-submission conversion**    | One POST produces all three audience versions from one API call                                                                                                                          |
| F-03 | **Executive summary**               | Bottom-line statement, risk level badge (Critical/High/Medium/Low), key points, fiscal impact, recommendation                                                                            |
| F-04 | **Staff briefing**                  | Current state → new state → action required table, implementation steps, affected teams, timeline                                                                                        |
| F-05 | **Public version**                  | 6th-grade reading level, no jargon, "what you can do" actions, help/contact info (311)                                                                                                   |
| F-06 | **Tabbed output navigation**        | Three tabs, Executive selected by default, no page reload on switch                                                                                                                      |
| F-07 | **Copy to clipboard**               | Per-tab copy button, visual confirmation ("Copied!"), resets after 3 seconds                                                                                                             |
| F-08 | **PDF export**                      | Server-side pdfmake, all three versions in one PDF, City of Austin logo, page numbers, professional layout                                                                               |
| F-09 | **Metadata display**                | Policy category, effective date (or "Not specified"), confidence level (High/Medium/Low), source word count                                                                              |
| F-10 | **Non-policy input warning**        | Yellow warning banner when `metadata.inputQuality === "not_policy"`, output still shown                                                                                                  |
| F-11 | **AI disclaimer**                   | Visible without scrolling: "This tool assists with — but does not replace — human review."                                                                                               |
| F-12 | **Loading state**                   | Spinner + status message within 1 second of submit, button disabled during processing                                                                                                    |
| F-13 | **Error handling**                  | Plain language messages for: empty input, too short (<50 chars), too long (>100K chars), rate limit, service outage, content filter, truncation. Input text preserved after every error. |
| F-14 | **Input validation**                | Client-side (length checks) + server-side (independent validation, reject missing/oversized text, consistent JSON error format)                                                          |
| F-15 | **Health endpoint**                 | `GET /health` returns server status                                                                                                                                                      |

### Out of Scope (v1)

- File upload (PDF, DOCX, TXT)
- User authentication or saved history
- Streaming / incremental output display
- Editable output before export
- Individual tab PDF export (v1 exports all three)
- Custom font embedding in PDF (v1 uses Roboto, upgrade to Montserrat/Open Sans in v2)
- Multi-language input handling
- Response caching

---

## Technical Stack

```
Dependencies:
  express           HTTP server + static file serving
  openai            Azure OpenAI SDK (AzureOpenAI class)
  dotenv            Environment variable loading
  zod               Schema definition + structured output validation
  pdfmake           Server-side PDF generation (JSON-based, no JSX)

Dev Dependencies:
  None — no build step, no transpilation, no bundler

File Structure:
  server.js              Express server, API routes, Azure OpenAI calls
  package.json           Dependencies
  .env                   Azure credentials (exists)
  public/
    index.html           Single-page UI
    css/styles.css       APH-branded stylesheet
    js/app.js            Client-side logic (fetch, DOM, tabs)
    assets/              Logo files (copied from style-guide/)
  lib/
    prompt.js            System prompt + Zod schema
    pdf-generator.js     pdfmake document builder
    sanitize.js          Input validation + output sanitization
```

### Server Routes

| Method | Path              | Purpose                                      |
| ------ | ----------------- | -------------------------------------------- |
| `GET`  | `/`               | Serve `public/index.html`                    |
| `POST` | `/api/convert`    | Policy text → Azure OpenAI → structured JSON |
| `POST` | `/api/export-pdf` | Structured JSON → pdfmake → PDF stream       |
| `GET`  | `/health`         | Server status                                |

---

## Azure OpenAI Integration

### Credentials (from `.env`)

```
AZURE_OPENAI_API_KEY=0a90c93a1e9d40d6b6d51215bb019a25
AZURE_OPENAI_ENDPOINT=https://aph-cognitive-sandbox-openai-eastus2.openai.azure.com
AZURE_OPENAI_API_VERSION=2024-12-01-preview
AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
```

### Endpoint Format

```
POST {ENDPOINT}/openai/deployments/{DEPLOYMENT}/chat/completions?api-version={API_VERSION}
```

### Required Headers

```
Content-Type: application/json
api-key: {AZURE_OPENAI_API_KEY}
```

Note: Azure uses `api-key` (not `Authorization: Bearer`). The deployment name goes in the URL path, not the request body. No `model` field is needed in the body.

### SDK Usage

```javascript
import { AzureOpenAI } from "openai";
import { zodResponseFormat } from "openai/helpers/zod";

const client = new AzureOpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  endpoint: process.env.AZURE_OPENAI_ENDPOINT,
  apiVersion: process.env.AZURE_OPENAI_API_VERSION,
  deployment: process.env.AZURE_OPENAI_DEPLOYMENT,
});

const response = await client.beta.chat.completions.parse({
  model: process.env.AZURE_OPENAI_DEPLOYMENT,
  messages: [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: policyText },
  ],
  temperature: 0.2,
  max_tokens: 8192,
  response_format: zodResponseFormat(
    PolicyConversionSchema,
    "policy_conversion",
  ),
});
```

### Expected JSON Response Structure

```json
{
  "executiveSummary": {
    "title": "string",
    "bottomLine": "string (one sentence)",
    "summary": "string (150-250 words, plain text)",
    "keyPoints": ["string (3-5 items)"],
    "fiscalImpact": "string | null",
    "riskLevel": "Critical | High | Medium | Low",
    "recommendation": "string (one sentence)"
  },
  "staffBriefing": {
    "title": "string",
    "overview": "string (1-2 paragraphs)",
    "keyChanges": [
      {
        "area": "string",
        "currentState": "string",
        "newState": "string",
        "actionRequired": "string"
      }
    ],
    "implementationSteps": ["string (ordered)"],
    "timeline": "string | null",
    "affectedTeams": ["string"]
  },
  "publicVersion": {
    "title": "string (plain language)",
    "whatIsThis": "string (1-2 sentences)",
    "whyItMatters": "string (6th-grade reading level)",
    "keyTakeaways": ["string (3-5 items, no jargon)"],
    "whatYouCanDo": ["string (start with verb)"],
    "whereToGetHelp": "string (include 311)"
  },
  "metadata": {
    "policyTitle": "string (verbatim from source)",
    "policyCategory": "enum (10 categories)",
    "effectiveDate": "string (ISO 8601) | null",
    "sourceWordCount": "number",
    "inputQuality": "policy | regulation | procedure | guidance | not_policy",
    "confidence": "High | Medium | Low"
  }
}
```

### Error Handling by `finish_reason`

| Value            | Meaning                           | User-Facing Message                                                                                                      |
| ---------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `stop`           | Success                           | —                                                                                                                        |
| `length`         | Output truncated (max_tokens hit) | "The policy was too long to fully convert. Try a shorter section."                                                       |
| `content_filter` | Azure safety filter triggered     | "This text triggered the AI safety filter. This can happen with sensitive health topics. Try rephrasing clinical terms." |

Also check `message.refusal` (model refused) and `message.parsed` (structured output parse failure).

---

## Design Notes

### Reference Files

All visual design decisions reference `style-guide/APH_Brand_Guidelines.md`. Logo assets are in `style-guide/`.

### Key Tokens

| Token     | Value     | Usage                                   |
| --------- | --------- | --------------------------------------- |
| APH Navy  | `#003054` | Header, headings, primary UI            |
| APH Teal  | `#007B83` | Buttons, links, accents                 |
| APH Coral | `#E8604C` | Critical/High risk badges, error states |
| APH Gold  | `#F2A900` | Medium risk badges, warnings            |
| APH Green | `#78BE20` | Low risk badges, success states         |
| Off-White | `#F5F5F5` | Page background                         |
| Dark Gray | `#333333` | Body text                               |

### Typography

- **Headings:** Montserrat (Bold 700, SemiBold 600, Medium 500) via Google Fonts CDN
- **Body:** Open Sans (Regular 400, SemiBold 600) via Google Fonts CDN
- **Fallback:** `'Segoe UI', 'Helvetica Neue', Arial, sans-serif`

### Component Specs

- **Buttons:** APH Teal background, white text, 6px radius
- **Cards:** White background, 1px `#E8E8E8` border, 8px radius, `0 2px 8px rgba(0,48,84,0.08)` shadow, 32px padding
- **Input fields:** 1px `#666666` border, 6px radius, 2px APH Teal focus ring
- **Max content width:** 1200px
- **Spacing scale:** 4 / 8 / 16 / 24 / 32 / 48 / 64px (base-8)

### Risk Level Badge Colors

| Level    | Background        | Text      |
| -------- | ----------------- | --------- |
| Critical | `#E8604C` (Coral) | White     |
| High     | `#E8604C` (Coral) | White     |
| Medium   | `#F2A900` (Gold)  | `#333333` |
| Low      | `#78BE20` (Green) | White     |

---

_Supporting documents: RESEARCH.md, BRAINSTORM.md, USER_STORIES.md, REQUIREMENTS.md_
