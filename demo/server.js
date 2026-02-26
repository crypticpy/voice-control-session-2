import "dotenv/config";
import express from "express";
import { AzureOpenAI } from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { SYSTEM_PROMPT, PolicyConversionSchema } from "./lib/prompt.js";
import { validateInput, sanitizeOutput } from "./lib/sanitize.js";
import { generatePDF } from "./lib/pdf-generator.js";

// ── Azure OpenAI Client ──

const client = new AzureOpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  endpoint: process.env.AZURE_OPENAI_ENDPOINT,
  apiVersion: process.env.AZURE_OPENAI_API_VERSION,
  deployment: process.env.AZURE_OPENAI_DEPLOYMENT,
});

// ── Express App ──

const app = express();

app.use(express.json({ limit: "1mb" }));
app.use(express.static("public"));

// ── Routes ──

/**
 * GET /health — Server health check
 */
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

/**
 * POST /api/convert — Convert policy text to structured summaries
 */
app.post("/api/convert", async (req, res) => {
  try {
    const { text } = req.body;

    // Validate input
    const validation = validateInput(text);
    if (!validation.valid) {
      return res.status(400).json({
        error: {
          code: "INVALID_INPUT",
          message: validation.error,
        },
      });
    }

    // Call Azure OpenAI with structured output
    const response = await client.beta.chat.completions.parse({
      model: process.env.AZURE_OPENAI_DEPLOYMENT,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: validation.text },
      ],
      temperature: 0.2,
      max_tokens: 8192,
      top_p: 0.95,
      response_format: zodResponseFormat(
        PolicyConversionSchema,
        "policy_conversion",
      ),
    });

    const choice = response.choices[0];
    const message = choice.message;

    // Check finish_reason: length (output truncated)
    if (choice.finish_reason === "length") {
      return res.status(422).json({
        error: {
          code: "OUTPUT_TRUNCATED",
          message:
            "The policy was too long to fully convert. Try submitting a shorter section.",
        },
      });
    }

    // Check finish_reason: content_filter
    if (choice.finish_reason === "content_filter") {
      return res.status(422).json({
        error: {
          code: "CONTENT_FILTERED",
          message:
            "This text contains language that triggered the AI safety filter. This can happen with sensitive health topics. Try rephrasing specific clinical terms and resubmitting.",
        },
      });
    }

    // Check model refusal
    if (message.refusal) {
      return res.status(422).json({
        error: {
          code: "MODEL_REFUSED",
          message: message.refusal,
        },
      });
    }

    // Check parsed output
    if (!message.parsed) {
      return res.status(500).json({
        error: {
          code: "PARSE_FAILED",
          message:
            "The AI returned a response that could not be parsed. Please try again.",
        },
      });
    }

    // Sanitize and return
    const sanitized = sanitizeOutput(message.parsed);
    return res.json(sanitized);
  } catch (error) {
    // Handle specific Azure OpenAI error codes
    if (error.status === 429) {
      return res.status(503).json({
        error: {
          code: "RATE_LIMITED",
          message:
            "The service is busy right now. Please wait a moment and try again.",
        },
      });
    }

    if (error.status === 401 || error.status === 404) {
      return res.status(502).json({
        error: {
          code: "SERVICE_CONFIG_ERROR",
          message:
            "There is a service configuration issue. Please contact the administrator.",
        },
      });
    }

    // All other errors — never expose error.message or stack traces
    return res.status(502).json({
      error: {
        code: "SERVICE_UNAVAILABLE",
        message:
          "The AI service is temporarily unavailable. Please try again in a few minutes.",
      },
    });
  }
});

/**
 * POST /api/export-pdf — Generate PDF from structured conversion data
 */
app.post("/api/export-pdf", async (req, res) => {
  try {
    const pdfBuffer = await generatePDF(req.body);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="policy-report.pdf"',
    );
    res.send(pdfBuffer);
  } catch (error) {
    return res.status(500).json({
      error: {
        code: "PDF_GENERATION_FAILED",
        message: "PDF generation failed. Please try again.",
      },
    });
  }
});

// ── Global Error Handler ──
// Must have 4 parameters for Express to recognize it as error middleware
// eslint-disable-next-line no-unused-vars
app.use((_err, _req, res, _next) => {
  return res.status(500).json({
    error: {
      code: "INTERNAL_ERROR",
      message: "An unexpected error occurred. Please try again.",
    },
  });
});

// ── Start Server ──

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Set server timeout to 120 seconds for long-running AI requests
server.timeout = 120_000;
