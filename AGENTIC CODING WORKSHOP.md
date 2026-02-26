# AGENTIC CODING WORKSHOP

**Voice-Driven Development with Claude Code**
Presenter Script · Facilitator Guide · Recovery Playbook
VERSION 6 — MARKDOWN · PHASE TERMINOLOGY · LITE/MVP FRAMING

---

| FORMAT | DURATION | AUDIENCE | STACK |
| --- | --- | --- | --- |
| Live demo + narration | 90 min + 10 min Q&A | Public health data & IT | Claude Code (or Codex) + Azure OpenAI |

---


## Color Legend & How to Use This Script

| Symbol | Meaning |
| --- | --- |
| 🎙 | **VOICE PROMPT** — Read verbatim into SuperWhisper. Written for voice (clause-length pacing). |
| 🎤 | **AUDIENCE MOMENT** — Pause and engage. Cap at 60 seconds. Then move. |
| ⚠️ | **WCGW** — What Could Go Wrong. Recovery language for the spot. Never apologize — reframe as teaching. |
| 💡 | **TEACHING POINT** — The one sentence the audience should remember. Say it out loud. |
| 📌 | **PRESENTER NOTE** — Behind-the-scenes context. Not for the audience. |

---

## Setup 

Complete every step in order. Git init is not optional — missing it causes live failure in Phase 7.

* [ ] **Create folder** — `mkdir policy-converter && cd policy-converter`
* [ ] **Git init** — `git init && git config user.email 'you@austintexas.gov' && git config user.name 'Chris'`
* [ ] **First commit** — `echo '.env\nnode_modules/' > .gitignore && git add .gitignore && git commit -m 'init'`
* [ ] **Drop in .env** — Copy from template below. Confirm `AZURE_OPENAI_ENDPOINT` and `AZURE_OPENAI_DEPLOYMENT` match your Azure portal exactly.
* [ ] **Drop style-guide/** — `colors.md` + `fonts.md` in subfolder. These drive the UI appearance — don't skip.
* [ ] **Open Claude Code** — `claude` — confirm it lists folder contents before the audience arrives
* [ ] **Open SuperWhisper** — Dictate one test sentence. Confirm the transcript is clean. Adjust mic gain if needed.
* [ ] **Display setup** — Terminal full-screen on projector. All other windows closed. Font size 16+ for rear rows.
* [ ] **Port check** — `lsof -i :3001` — kill anything running on that port
* [ ] **Browser tab ready** — Open `localhost:3001` — will 404 until app starts. That's fine.
* [ ] **Clock visible** — Phone timer on lectern or second screen. 90 minutes start at the first audience moment.
* [ ] **Goodie bag ready** — Have the download link or USB drives at the door. Mention at close.

### .env Template — Copy This Exactly

```
AZURE_OPENAI_ENDPOINT=https://YOUR-RESOURCE.openai.azure.com/
AZURE_OPENAI_KEY=your-key-here
AZURE_OPENAI_DEPLOYMENT=gpt-4o
AZURE_OPENAI_API_VERSION=2024-02-15-preview
PORT=3001

```

---

## Phase 1 — Orient & Research ⏱ 3 min 

💡 **TEACHING POINT:** Grounding the agent in its environment before assigning tasks dramatically improves output quality.

🎙 **VOICE PROMPT — say into SuperWhisper:**

> You are a senior AI developer on a city government project.
> Inventory this current directory, including all files and the style-guide folder.
> Next, research the Azure OpenAI REST API format for Node.js.
> Also, research professional PDF formatting libraries that can output Gartner-level executive summaries.
> Write your findings to RESEARCH dot M D with three sections: environment inventory, Azure API implementation, and PDF formatting strategy.

📌 Watch for it to read the .env and confirm the deployment name. We're reloading the agent with current information about the type of app we're building.

**TRANSITION:** It's reading before it codes. That's intentional. We're not asking it to guess — we're giving it real information to draw from.

🎤 **AUDIENCE MOMENT:** Why are we making it write documents instead of just saying "build the app"? Because of something called **Agentic Drift**.  As an AI agent works through a long task, its context window fills up with code, errors, and terminal output. Without anchors, it will eventually lose the plot, forget its original requirements, and start hallucinating features or changing its tech stack. These Markdown files are our anchors. By forcing the agent to read them, we eliminate Agentic Drift. The output becomes bounded and repeatable. The less documentation we provide, the more volatile the result will be. 

This is also a way to speed up the documentation generation for a project, AND it requires no external applications or dependencies. You may have heard of tools like SpecKit, Buttons, and BMAD. We are doing something similar here. It's essential to understand this as a workflow, but you could substitute some of our work here with those tools. 

I am not specifically prompting Claude to use multiple agents, but it's certainly possible to sit down and write one mega prompt. I find that time-wise, it's faster to guide this way and cut down on dependencies. 

⚠️ **WHAT COULD GO WRONG — RECOVERY**

* **IF:** Agent researches OpenAI instead of Azure OpenAI — **SAY:** "Stop. We are using Azure OpenAI — not the OpenAI API directly. Azure uses a different endpoint format and requires a deployment name rather than a model name. Research the Azure OpenAI REST API and update RESEARCH dot M D."

---

## Phase 2 — Brainstorm & Define ⏱ 3 min

💡 **TEACHING POINT:** Giving the agent a defined problem with explicit constraints produces better output than open-ended requests. Constraints are the specification.

🎙 **VOICE PROMPT — say into SuperWhisper:**

> Read RESEARCH dot M D.
> We are building the Policy Plain Language Converter. It takes dense policy text and produces an executive summary, a staff briefing, and a plain-language public version.
> Constraints: Use a Node.js server and a vanilla JavaScript frontend. No databases, no authentication. Use the style-guide folder for the UI. No streaming output. Use frontend design skills for a clean UI/UX. 
> Brainstorm the technical architecture, Azure API prompt structure, and potential edge cases.
> Write this to BRAINSTORM dot M D. Keep it tight. 

📌 This is where non-developers get to participate in plain language. After it finishes, open BRAINSTORM.md and read one insight aloud.

**TRANSITION:** Notice that someone who doesn't know how to build software can fully participate in this phase. You're describing what you want in plain language. I am asking the AI to "keep it tight" as a way to guardrail its tendency to add features and to be overly verbose in its documentation. 


⚠️ **WHAT COULD GO WRONG — RECOVERY**

* **IF:** Agent proposes database, auth, or microservices — **SAY:** "Simplify. Single Node.js server, vanilla JS frontend, no database, no login. Everything runs locally. Update BRAINSTORM dot M D."

---

## Phase 3 — Stories & Requirements (Fast Path) ⏱ 3 min

💡 **TEACHING POINT:** Acceptance criteria are how you know when something is actually done. Without them, 'done' is whatever the developer decides it is.

🎙 **VOICE PROMPT — say into SuperWhisper:**

> Read RESEARCH dot M D and BRAINSTORM dot M D.
> Write testable user stories and binary acceptance criteria for our two personas: a public health analyst and a department director.
> You must cover: inputting text, generating all three outputs, clipboard copying, and plain language error handling. Include the PDF export services. 
> The acceptance criteria must be verifiable by a non-developer.
> Save to User_stories. MD, and Requirements. md.

📌 Open REQUIREMENTS.md and show one acceptance criterion. AI agents can't interpret 'easy' or 'fast' — they need testable conditions.

**TRANSITION:** We just defined 'done'. Without acceptance criteria, done is whatever the AI decides it is. With them, the AI builds to a standard. This will help prevent the AI from generating mockups, TODOs, or going off the rails to build components we didn't ask for. 

🎤 **AUDIENCE MOMENT:** In a production environment, you want separate User Stories and Acceptance Criteria documents. But if you are building a quick MVP on a Friday afternoon, you can combine them. We are combining this process today to save time, but notice how we are still forcing the AI to define *testable* rules for itself before it touches any code. In production, we would split this into multiple steps and sit down to review and tweak the story and acceptance criteria. This is where you can converse with the AI or even involve the stakeholders. 

⚠️ **WHAT COULD GO WRONG — RECOVERY**

* **IF:** Acceptance criteria are vague ('should look good', 'must be fast') — **SAY:** "Acceptance criteria must be binary and verifiable. Rewrite each one so a non-developer can evaluate it in 30 seconds."

---

## Phase 4 — PRD ⏱ 3 min

💡 **TEACHING POINT:** The PRD is the single source of truth. Every agent who runs after this reads the PRD first. It's the document that enables handoffs.

🎙 **VOICE PROMPT — say into SuperWhisper:**

> Using all of the markdown files we just created.
Synthesize them into a single Product Requirements Document (PRD).
> Include project goals, a strict must-have feature list, out-of-scope constraints, and the technical stack specification.
> This is now our single source of truth. Keep it under two pages.

📌 Point out the Azure integration section. Because we did the research, brainstorming, and requirements first, this PRD is richer and more accurate than anything we'd get from a cold start. This also compounds our context, reinforcing guardrails for the items we do and don't want. It's helpful to restate critical guidance, and the more it appears in the AI's context chain, the more likely we are to get the results we want. 

**TRANSITION:** The PRD ties everything together. Every agent reads it first. Now we're going to set up our execution plan.

🎤 **AUDIENCE MOMENT:** That PRD contains everything a new developer — or a new AI agent — needs to understand this project and start building—no Slack thread required.

---

## Phase 5 — Sprint Planning ⏱ 3 min

💡 **TEACHING POINT:** Sprints are parallelizable work packages. The more precisely you define them now, the less the agent has to guess during execution.

🎙 **VOICE PROMPT — say into SuperWhisper:**

> Now read prd.md, break the work into exactly three sequential sprints, and write them into sprints.md. Don't include       
  timelines. Include specific files to create acceptance criteria for each sprint. 
  But do not add features.  

📌 Pre-defining the sprints is deliberate. When we tell it to divide everything into sprints designed for multi-agent workflows, we're preloading all execution components with rich context.

🎤 **AUDIENCE MOMENT:** Notice we defined the sprint structure ourselves in the prompt — we didn't ask the agent to decide. That's intentional. When you control the plan, you control the narrative.

---

## Phase 6 — The Mission Brief ⏱ 3 min

💡 **TEACHING POINT:** The ORCHESTRATOR is where you stop prompting and start managing. One document governs the entire build. This is the skill that scales.

🎙 **VOICE PROMPT — say into SuperWhisper:**

> Write ORCHESTRATOR dot M D. This will govern your execution.
> Include exactly these rules in order:
> 1. Always read PRD dot M D before writing code.
> 2. Execute sprints strictly in order from SPRINTS. MD.
> 3. Build only what is explicitly listed.
> 4. Run the application locally and confirm it starts without errors after every sprint.
> 5. Verify that all acceptance criteria are met before moving on.
> 6. After a sprint passes, run git add all and git commit with a clear message.
> 7. Never skip a commit.
> 8. Run a final end-to-end test when finished. Provide a sample text input to test with. 
> 
> 

📌 Read rule 4 and rule 7 aloud. This is the document that means we don't have to babysit every step.

**TRANSITION:** The Mission Brief is written. Everything we've built for the last 45 minutes leads to the following command. The process will manage itself from here.

🎤 **AUDIENCE MOMENT:** That file is a process, not a prompt. It has gates. It has reviews. It has commits. The difference between a prompt and a Mission Brief is between asking someone to do something and managing them through it.

---

## Phase 7 — Execute: Watch It Build ⏱ 30 min

💡 **TEACHING POINT:** The process was the product. Phase 7 is proof. Every decision made in Phases 1–6 pays off here.

🎙 **VOICE PROMPT — say into SuperWhisper:**

> Read ORCHESTRATOR dot M D and begin.
> Follow every rule exactly in order.
> Start with Sprint One.



⚠️ **WHAT COULD GO WRONG — RECOVERY**

* **IF:** App won't start — port already in use — **SAY:** "`lsof -i :3001` in a second terminal. Kill that process. Try again."
* **IF:** Azure API returns 401 or 404 — **SAY:** "Stop. Read the .env file out loud. Confirm that the endpoint, key, and deployment name match what you see in the Azure portal. The most common cause is a trailing slash on the endpoint."
* **IF:** CORS error when frontend calls backend — **SAY:** "Add the cors package to Express. `npm install cors`. `app.use(cors())`. Restart the server."
* **IF:** Agent generates code but never runs it — **SAY:** "Stop. Rule 4 says run the application after each sprint. The app needs to start before you commit. Run it now."
* **IF:** Agent skips a sprint or tries to merge sprints — **SAY:** "Stop. Show me the acceptance criteria for Sprint [N]. Confirm each one passes. Then commit. Then start the next sprint."

