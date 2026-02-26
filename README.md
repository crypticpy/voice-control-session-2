# Agentic Coding Workshop: Voice-Driven Development with Claude Code

A 90-minute live workshop demonstrating how to build production-quality software using voice-driven agentic coding with Claude Code and Azure OpenAI.

## What This Workshop Covers

This workshop walks through a structured 7-phase methodology for building software with AI coding agents — using voice input as the primary interface. Attendees learn how to guide an AI agent from research through execution without writing a single line of code by hand.

### The 7 Phases

1. **Orient & Research** — Ground the agent in its environment and tech stack
2. **Brainstorm & Define** — Describe the problem with explicit constraints
3. **Stories & Requirements** — Write testable user stories with binary acceptance criteria
4. **PRD** — Synthesize everything into a single source of truth
5. **Sprint Planning** — Break work into sequential, parallelizable sprints
6. **Mission Brief** — Create the orchestration document that governs execution
7. **Execute** — Launch the agent and watch it build

### Key Concepts

- **Agentic Drift** — Why documentation anchors prevent AI agents from losing context during long tasks
- **Mission Briefs** — Process documents with gates, reviews, and commits that replace babysitting
- **Voice-First Development** — Using SuperWhisper (or similar) to dictate prompts naturally
- **Constraint-Driven Design** — How explicit constraints produce better output than open-ended requests

## Repository Contents

```
├── AGENTIC CODING WORKSHOP.md    # Full presenter script and facilitator guide
├── Voice-Control-Workshop-Session-2.pptx  # Slide deck
├── demo/                          # Completed demo application
│   ├── server.js                  # Express server with Azure OpenAI integration
│   ├── package.json               # Node.js dependencies
│   ├── .env.template              # Environment variable template
│   ├── public/                    # Frontend (vanilla JS)
│   ├── lib/                       # Server-side modules (PDF, prompts, sanitization)
│   ├── style-guide/               # APH brand guidelines and assets
│   ├── PRD.md                     # Product Requirements Document
│   ├── SPRINTS.md                 # Sprint breakdown
│   ├── ORCHESTRATOR.md            # Mission Brief / execution rules
│   └── ...                        # Research, brainstorm, and requirements docs
└── LICENSE
```

## Demo App: Policy Plain Language Converter

The `demo/` folder contains the finished application built during the workshop. It converts dense public health policy text into three audience-specific outputs:

- **Executive Summary** — For department directors and leadership
- **Staff Briefing** — For internal teams and analysts
- **Public Version** — Plain-language version for community distribution

### Tech Stack

- **Backend:** Node.js + Express
- **Frontend:** Vanilla HTML/CSS/JavaScript
- **AI:** Azure OpenAI (GPT-4.1 Mini)
- **PDF Export:** pdfmake

### Running the Demo

```bash
cd demo
npm install
cp .env.template .env
# Edit .env with your Azure OpenAI credentials
npm start
# Open http://localhost:3001
```

### Azure OpenAI Setup

You'll need an Azure OpenAI resource with a deployed model. Update your `.env` with:

- `AZURE_OPENAI_API_KEY` — Your API key from the Azure portal
- `AZURE_OPENAI_ENDPOINT` — Your resource endpoint URL
- `AZURE_OPENAI_DEPLOYMENT` — Your model deployment name
- `AZURE_OPENAI_API_VERSION` — API version (default: `2024-12-01-preview`)

## Audience

Public health data and IT professionals, but the methodology applies to any domain where non-developers need to participate in software creation.

## License

See [LICENSE](LICENSE) for details.
