# Research Document — Policy Plain Language Converter

**Project:** Voice-Driven AI Development Workshop Demo
**Department:** Austin Public Health (APH)
**Date:** February 25, 2026

---

## 1. Environment Inventory

### Project Structure

```
voice-test-2/
├── .env                                          # Azure OpenAI credentials & server config
├── style-guide/
│   ├── APH_Brand_Guidelines.md                   # Full APH brand guidelines (Sep 2025)
│   ├── COA-Icon-Official-RGB (1).png             # City of Austin seal/icon (~47 KB)
│   └── COA-Logo-Horizontal-Official-RGB (1).png  # Horizontal wordmark logo (~33 KB)
└── .claude/
    └── context-layer/                            # Claude Code session metadata
```

### Environment Variables (`.env`)

| Variable                   | Value                                                           | Purpose                                           |
| -------------------------- | --------------------------------------------------------------- | ------------------------------------------------- |
| `AZURE_OPENAI_API_KEY`     | `0a90c93a...`                                                   | API key for Azure OpenAI resource                 |
| `AZURE_OPENAI_ENDPOINT`    | `https://aph-cognitive-sandbox-openai-eastus2.openai.azure.com` | Azure OpenAI resource endpoint (East US 2 region) |
| `AZURE_OPENAI_API_VERSION` | `2024-12-01-preview`                                            | API version supporting GPT-4.1 family             |
| `AZURE_OPENAI_DEPLOYMENT`  | `gpt-4.1-mini`                                                  | Deployment name (see Section 3)                   |
| `PORT`                     | `3001`                                                          | Server port                                       |

### Brand Assets Summary

The `APH_Brand_Guidelines.md` file contains a complete design system:

- **Color Palette:** APH Navy (`#003054`), APH Teal (`#007B83`), Sky Blue (`#4DA8DA`), Light Teal (`#5EC6C3`), Green (`#78BE20`), Gold (`#F2A900`), Coral (`#E8604C`), Purple (`#6B4C9A`)
- **Typography:** Montserrat (headings — Bold/SemiBold/Medium), Open Sans (body — Regular/SemiBold/Italic)
- **Type Scale:** H1 32px → Micro/Legal 12px with full CSS custom property tokens
- **Layout:** 12-column grid, base-8 spacing (4px–64px), 8px border radius on cards
- **Iconography:** Line-style, 2px stroke, Lucide Icons
- **Accessibility:** WCAG 2.1 AA contrast guidance included

### Current State

The project is **pre-development**. No source code, `package.json`, build configuration, or framework setup exists. Only credentials, brand assets, and this research document are present.

---

## 2. Azure OpenAI API Overview

### Chat Completion Endpoint Format

Azure OpenAI uses a fundamentally different URL pattern than standard OpenAI:

```
POST {endpoint}/openai/deployments/{deployment-name}/chat/completions?api-version={version}
```

For this project:

```
POST https://aph-cognitive-sandbox-openai-eastus2.openai.azure.com/openai/deployments/gpt-4.1-mini/chat/completions?api-version=2024-12-01-preview
```

Key structural differences from standard OpenAI (`https://api.openai.com/v1/chat/completions`):

- The **deployment name** is embedded in the URL path, not in the request body
- The **API version** is a required query parameter
- Authentication uses an `api-key` header (not `Authorization: Bearer`)

### Required Headers

```
Content-Type: application/json
api-key: {your-api-key}
```

### Request Body

```json
{
  "messages": [
    { "role": "system", "content": "You are a policy analysis assistant." },
    { "role": "user", "content": "Analyze this policy..." }
  ],
  "temperature": 0.3,
  "max_tokens": 4096,
  "top_p": 0.95,
  "response_format": { "type": "json_object" }
}
```

No `model` field is needed in the body — the deployment name in the URL determines the model. If included, Azure ignores it.

### API Version Reference

| Version              | Type        | Notes                                                          |
| -------------------- | ----------- | -------------------------------------------------------------- |
| `2024-06-01`         | GA (Stable) | Production-ready, widest compatibility                         |
| `2024-10-21`         | GA          | Supports structured outputs, newer models                      |
| `2024-12-01-preview` | Preview     | **This project.** Supports GPT-4.1 family, o1 reasoning models |
| `2025-03-01-preview` | Preview     | Latest preview, OpenAPI 3.1.0 spec                             |

### Structured Output Options

**JSON Mode** — Set `response_format: { type: "json_object" }`. Guarantees valid JSON but does not enforce a schema. Requires the word "JSON" in the system or user prompt.

**Structured Outputs** — Set `response_format: { type: "json_schema", json_schema: { ... } }`. Guarantees valid JSON **conforming to a provided schema**. Available on GPT-4.1-mini with `2024-12-01-preview`. This is the recommended approach for our pipeline.

---

## 3. Deployment Name vs Model Name Distinction

This is the most commonly misunderstood aspect of Azure OpenAI.

### The Two Concepts

| Concept             | Definition                                                                  | Who Creates It      | Examples                                                        |
| ------------------- | --------------------------------------------------------------------------- | ------------------- | --------------------------------------------------------------- |
| **Model Name**      | The canonical name Microsoft/OpenAI assign to an AI model                   | Microsoft/OpenAI    | `gpt-4`, `gpt-4o`, `gpt-4.1-mini`, `gpt-35-turbo`               |
| **Deployment Name** | A user-chosen identifier assigned when deploying a model in Azure AI Studio | You (the developer) | `gpt-4.1-mini`, `policy-analyzer`, `prod-gpt4`, `my-fast-model` |

### How It Works

1. In Azure AI Studio, you **create a deployment** by selecting a model and giving it a name
2. The **deployment name goes in the URL**, the model name does not:
   ```
   /openai/deployments/{DEPLOYMENT-NAME}/chat/completions
   ```
3. A deployment name **CAN** match the model name (common convention) but **does NOT have to**
4. You can create **multiple deployments of the same model** with different names, rate limits, or configurations

### In This Project

```env
AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
```

This is a **deployment name** that happens to match the underlying model name. It's still a deployment name — if someone renames it in Azure to `policy-engine`, only the `.env` needs to change, not the code.

### Why This Matters for Code

- Never hardcode model names where deployment names belong
- The `model` parameter in the OpenAI SDK, when used with Azure, should be the **deployment name**
- Keep the deployment name in environment variables for portability across environments (dev, staging, prod)

### Multiple Deployment Pattern

```
Deployment: "dev-gpt4mini"   → Model: gpt-4.1-mini  (low rate limit, sandbox)
Deployment: "prod-gpt4mini"  → Model: gpt-4.1-mini  (high rate limit, production)
Deployment: "policy-gpt4o"   → Model: gpt-4o         (different model entirely)
```

---

## 4. Recommended Node.js Approach

### SDK Choice: `openai` npm Package with `AzureOpenAI` Class

The official `openai` npm package (v4+) has built-in Azure support. This is the recommended approach.

```bash
npm install openai
```

#### Basic Setup

```javascript
import { AzureOpenAI } from "openai";

const client = new AzureOpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  endpoint: process.env.AZURE_OPENAI_ENDPOINT,
  apiVersion: process.env.AZURE_OPENAI_API_VERSION,
  deployment: process.env.AZURE_OPENAI_DEPLOYMENT,
});
```

#### Chat Completion Call

```javascript
async function getChatCompletion(systemPrompt, userMessage) {
  const response = await client.chat.completions.create({
    model: process.env.AZURE_OPENAI_DEPLOYMENT,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ],
    temperature: 0.3,
    max_tokens: 4096,
  });

  return response.choices[0].message.content;
}
```

#### Structured Output with Zod Schema Validation

```javascript
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const PolicyAnalysisSchema = z.object({
  title: z.string().describe("Title of the policy analysis report"),
  executiveSummary: z
    .string()
    .describe("2-3 paragraph executive summary for C-suite readers"),
  keyFindings: z.array(
    z.object({
      id: z.number(),
      finding: z.string(),
      impact: z.enum(["High", "Medium", "Low"]),
      priority: z.enum(["Critical", "High", "Medium", "Low"]),
      details: z.string(),
    }),
  ),
  recommendations: z.array(
    z.object({
      id: z.number(),
      recommendation: z.string(),
      timeline: z.string(),
      estimatedCost: z.string(),
      responsible: z.string(),
    }),
  ),
  riskAssessment: z.object({
    overallRisk: z.enum(["High", "Medium", "Low"]),
    factors: z.array(
      z.object({
        factor: z.string(),
        level: z.enum(["High", "Medium", "Low"]),
        mitigation: z.string(),
      }),
    ),
  }),
  dataTables: z.array(
    z.object({
      title: z.string(),
      headers: z.array(z.string()),
      rows: z.array(z.array(z.string())),
    }),
  ),
  metadata: z.object({
    analyzedDate: z.string(),
    policyName: z.string(),
    department: z.string(),
    confidentiality: z.enum(["Public", "Internal", "Confidential"]),
  }),
});

const response = await client.beta.chat.completions.parse({
  model: process.env.AZURE_OPENAI_DEPLOYMENT,
  messages: [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: policyText },
  ],
  temperature: 0.2,
  max_tokens: 4096,
  response_format: zodResponseFormat(PolicyAnalysisSchema, "policy_analysis"),
});

const analysis = response.choices[0].message.parsed;
```

#### Error Handling

```javascript
async function safeChatCompletion(systemPrompt, userMessage) {
  try {
    const response = await client.chat.completions.create({
      model: process.env.AZURE_OPENAI_DEPLOYMENT,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      temperature: 0.3,
      max_tokens: 4096,
    });
    return {
      success: true,
      content: response.choices[0].message.content,
      usage: response.usage,
    };
  } catch (error) {
    if (error.status === 429)
      return {
        success: false,
        error: "RATE_LIMITED",
        retryAfter: error.headers?.["retry-after"],
      };
    if (error.status === 401) return { success: false, error: "AUTH_FAILED" };
    if (error.status === 404)
      return { success: false, error: "DEPLOYMENT_NOT_FOUND" };
    return { success: false, error: error.message };
  }
}
```

### Alternative Approaches

| Approach                      | Deps                                           | Best For                            | Tradeoff                                    |
| ----------------------------- | ---------------------------------------------- | ----------------------------------- | ------------------------------------------- |
| **`openai` + `AzureOpenAI`**  | `openai`                                       | Most projects (recommended)         | Lightest weight with full features          |
| **`@azure/openai` companion** | `openai` + `@azure/openai` + `@azure/identity` | Enterprise with Entra ID (AAD) auth | More deps, needed only for token-based auth |
| **Plain `fetch`**             | None                                           | Learning, minimal deployments       | No retries, no types, manual error handling |

For this sandbox project, the `openai` package with API key auth is sufficient. Entra ID auth is recommended for production but unnecessary here.

### Authentication Methods

| Method                                | When to Use                          | Setup                                                             |
| ------------------------------------- | ------------------------------------ | ----------------------------------------------------------------- |
| **API Key** (`api-key` header)        | Dev, sandbox, simple deployments     | Set key in `.env`                                                 |
| **Microsoft Entra ID** (Bearer token) | Production, multi-tenant, enterprise | Requires `@azure/identity`, managed identity or service principal |

---

## 5. PDF Generation Strategy for Executive-Level Documents

### Library Assessment

| Library                  | Typography      | Layout             | Tables        | Charts             | Difficulty | Deployment Weight |
| ------------------------ | --------------- | ------------------ | ------------- | ------------------ | ---------- | ----------------- |
| **@react-pdf/renderer**  | Excellent       | Flexbox            | Manual (JSX)  | Via image embed    | Medium     | Light             |
| **Puppeteer/Playwright** | Best (full CSS) | Full CSS Grid/Flex | HTML tables   | Chart.js/D3 native | Low        | Heavy (~300MB)    |
| **pdfmake**              | Good            | Columns/stacks     | Native        | Via image embed    | Low-Medium | Light             |
| **PDFKit**               | Excellent       | Manual positioning | Plugin needed | Via image embed    | High       | Light             |

### Recommendation: @react-pdf/renderer

For executive-grade PDFs with City of Austin branding, `@react-pdf/renderer` is recommended:

1. **Declarative JSX layout** — component-based templates with reusable styling
2. **Same data powers frontend and PDF** — pass LLM JSON as props to React PDF components
3. **No headless browser** — lighter deployment than Puppeteer
4. **Full typography** — Montserrat/Open Sans via `Font.register()`, proper weight variants
5. **Professional tables** — alternating row colors via index-based conditional styles
6. **Headers/footers with page numbers** — `fixed` prop + `render` callback

For **charts**, pre-render with `chartjs-node-canvas` as PNG, then embed via the `Image` component.

### Installation

```bash
npm install @react-pdf/renderer chartjs-node-canvas
```

### Example: Executive Report Template

```jsx
import {
  Document,
  Page,
  Text,
  View,
  Image,
  Font,
  StyleSheet,
} from "@react-pdf/renderer";

Font.register({
  family: "Montserrat",
  fonts: [
    { src: "./fonts/Montserrat-Regular.ttf", fontWeight: "normal" },
    { src: "./fonts/Montserrat-Bold.ttf", fontWeight: "bold" },
    { src: "./fonts/Montserrat-SemiBold.ttf", fontWeight: 600 },
  ],
});

Font.register({
  family: "Open Sans",
  fonts: [
    { src: "./fonts/OpenSans-Regular.ttf", fontWeight: "normal" },
    { src: "./fonts/OpenSans-Bold.ttf", fontWeight: "bold" },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: "Open Sans",
    fontSize: 10,
    color: "#333333",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    borderBottom: "2pt solid #003054",
    paddingBottom: 10,
  },
  logo: { width: 160, height: 50 },
  title: {
    fontFamily: "Montserrat",
    fontSize: 22,
    fontWeight: "bold",
    color: "#003054",
    marginBottom: 15,
  },
  sectionTitle: {
    fontFamily: "Montserrat",
    fontSize: 14,
    fontWeight: 600,
    color: "#003054",
    marginBottom: 8,
    marginTop: 15,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#003054",
    paddingVertical: 8,
  },
  tableHeaderText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontFamily: "Montserrat",
    fontSize: 9,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    paddingVertical: 6,
  },
  tableRowAlt: { backgroundColor: "#F5F5F5" },
  tableCell: { flex: 1, paddingHorizontal: 8, fontSize: 9 },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 50,
    right: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#E8E8E8",
    paddingTop: 8,
    fontSize: 8,
    color: "#666666",
  },
});

const PolicyReport = ({ data }) => (
  <Document>
    <Page size="LETTER" style={styles.page}>
      <View style={styles.header}>
        <Image
          src="./style-guide/COA-Logo-Horizontal-Official-RGB (1).png"
          style={styles.logo}
        />
        <Text
          style={{ fontFamily: "Montserrat", fontSize: 9, color: "#666666" }}
        >
          Austin Public Health{"\n"}Policy Analysis Division
        </Text>
      </View>

      <Text style={styles.title}>{data.title}</Text>

      <Text style={styles.sectionTitle}>Executive Summary</Text>
      <Text>{data.executiveSummary}</Text>

      <Text style={styles.sectionTitle}>Key Findings</Text>
      <View style={styles.tableHeader}>
        <Text style={[styles.tableCell, styles.tableHeaderText]}>Finding</Text>
        <Text style={[styles.tableCell, styles.tableHeaderText]}>Impact</Text>
        <Text style={[styles.tableCell, styles.tableHeaderText]}>Priority</Text>
      </View>
      {data.keyFindings.map((f, i) => (
        <View
          key={i}
          style={[styles.tableRow, i % 2 === 1 && styles.tableRowAlt]}
        >
          <Text style={styles.tableCell}>{f.finding}</Text>
          <Text style={styles.tableCell}>{f.impact}</Text>
          <Text style={styles.tableCell}>{f.priority}</Text>
        </View>
      ))}

      <View style={styles.footer} fixed>
        <Text>City of Austin — Confidential</Text>
        <Text
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
        />
      </View>
    </Page>
  </Document>
);
```

### Server-Side Rendering

```javascript
import ReactPDF from "@react-pdf/renderer";

// File output
await ReactPDF.render(
  <PolicyReport data={analysisData} />,
  "./output/report.pdf",
);

// HTTP stream (Express)
app.get("/api/analysis/:id/pdf", async (req, res) => {
  const stream = await ReactPDF.renderToStream(
    <PolicyReport data={analysisData} />,
  );
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    'attachment; filename="policy-report.pdf"',
  );
  stream.pipe(res);
});
```

---

## 6. Structured Output Pipeline — LLM to Visual Layer + PDF

### Architecture

```
Policy Text → Azure OpenAI (structured output) → JSON Schema
                                                      ├→ React Frontend (interactive UI)
                                                      └→ @react-pdf/renderer (PDF export)
```

The same JSON data feeds both renderers. The Zod schema defined in Section 4 serves as the contract between the LLM and both visual outputs.

### System Prompt for Parsable Output

```
You are a senior policy analyst for the City of Austin, Austin Public Health department.

TASK: Analyze the provided policy document and produce a structured executive briefing.

AUDIENCE-SPECIFIC GUIDELINES:
- Executive Summary: Written for department directors and city council members. Use clear,
  decisive language. Lead with impact and recommendations. Avoid jargon.
- Key Findings: Each finding must cite specific sections or provisions from the policy.
  Quantify impacts where possible (population affected, cost estimates, timeline).
- Recommendations: Must be actionable. Include responsible party, timeline, and estimated
  cost. Frame in terms of community benefit.
- Risk Assessment: Frame risks in terms of public health outcomes, regulatory compliance,
  and community trust.

FORMATTING RULES:
- All text must be plain text (no markdown, no HTML, no special characters)
- Data table values must be strings, even for numbers (e.g., "1,234" not 1234)
- Dates in ISO 8601 format (YYYY-MM-DD)
- Cost estimates as formatted strings (e.g., "$50,000 - $75,000")

OUTPUT: Return a structured analysis conforming to the provided JSON schema.
```

### Prompt Engineering Best Practices

1. **Low temperature (0.1–0.3)** for structural consistency
2. **Zod `.describe()` on each field** to guide content placement
3. **`z.enum()` for constrained values** (risk levels, priorities)
4. **Retry with error feedback** when JSON mode validation fails
5. **Refusal detection** — check `message.refusal` before accessing `message.parsed`

### Full Endpoint Example

```javascript
// Same data, two outputs
app.get("/api/analysis/:id", (req, res) => {
  res.json(analysisData); // → React frontend renders interactive UI
});

app.get("/api/analysis/:id/pdf", async (req, res) => {
  const stream = await ReactPDF.renderToStream(
    <PolicyReport data={analysisData} />,
  );
  res.setHeader("Content-Type", "application/pdf");
  stream.pipe(res); // → Browser downloads executive PDF
});
```
