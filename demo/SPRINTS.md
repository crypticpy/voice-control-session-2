# Sprint Plan — Policy Plain Language Converter

**Source:** PRD.md
**Total Sprints:** 3

```
Sprint 1 ──────► Sprint 2 ──────► Sprint 3
 (Frontend)       (Backend)        (Wiring)

No dependencies   Depends on       Depends on
                  .env (exists)    Sprint 1 + Sprint 2
```

---

## Sprint 1 — Frontend Scaffold and Styling

**Goal:** All HTML structure and CSS in place. No JavaScript logic. No backend. The page loads in a browser with correct APH branding, layout, colors, and typography. All UI states exist as HTML elements, hidden or visible via CSS classes.

### Work Packages

#### WP-1.1 Project Initialization

| Task                       | Details                                                                                                                                                                      |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Create `package.json`      | Name, version, description only. No dependencies yet — Sprint 2 installs them.                                                                                               |
| Copy logo assets           | Copy `style-guide/COA-Logo-Horizontal-Official-RGB (1).png` → `public/assets/coa-logo.png`. Copy `style-guide/COA-Icon-Official-RGB (1).png` → `public/assets/coa-icon.png`. |
| Create directory structure | `public/`, `public/css/`, `public/js/`, `public/assets/`, `lib/`                                                                                                             |

#### WP-1.2 HTML Structure (`public/index.html`)

Build the complete single-page HTML document with all elements present. Use semantic HTML. Every UI state (empty, loading, success, error, warning) exists as a DOM element. Visibility is controlled by CSS classes (`hidden`, `active`).

| Section                     | HTML Elements                                                                                                                        | Initial Visibility          |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------- |
| **Header**                  | City of Austin logo (top-left), app title "Policy Plain Language Converter", APH sub-label                                           | Visible                     |
| **Input area**              | `<textarea>` with placeholder, character count display (`<span>` showing `0 / 100,000`), "Convert Policy" submit button              | Visible                     |
| **Loading state**           | Spinner element, status message ("Analyzing policy text for three audiences...")                                                     | Hidden (`hidden` class)     |
| **Error display**           | Error card with icon, message text, and suggestion text                                                                              | Hidden                      |
| **Warning banner**          | Yellow banner for non-policy input detection                                                                                         | Hidden                      |
| **AI disclaimer**           | Static text: "This tool assists with — but does not replace — human review."                                                         | Hidden (shown with results) |
| **Output tabs**             | Three tab buttons: "Executive Summary", "Staff Briefing", "Public Version"                                                           | Hidden                      |
| **Executive Summary panel** | Title, bottom-line callout, risk badge, summary text, key points list, fiscal impact, recommendation                                 | Hidden                      |
| **Staff Briefing panel**    | Title, overview text, key changes table (area / current / new / action columns), implementation steps list, timeline, affected teams | Hidden                      |
| **Public Version panel**    | Title, "what is this" intro, "why it matters" text, key takeaways list, "what you can do" list, "where to get help" block            | Hidden                      |
| **Metadata bar**            | Policy category, effective date, confidence badge, source word count                                                                 | Hidden                      |
| **Action buttons**          | "Copy" button (per tab), "Export PDF" button                                                                                         | Hidden                      |
| **Footer**                  | City of Austin, Austin Public Health, year                                                                                           | Visible                     |

Link to Google Fonts CDN (Montserrat: 500,600,700; Open Sans: 400,600) in `<head>`. Link to `css/styles.css`. Include an empty `<script src="js/app.js"></script>` at end of body.

#### WP-1.3 Stylesheet (`public/css/styles.css`)

Complete CSS with all APH brand tokens from PRD.md Design Notes.

| Category                  | Specifications                                                                                                                                                                                                           |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **CSS custom properties** | All tokens from PRD: `--aph-navy`, `--aph-teal`, `--aph-coral`, `--aph-gold`, `--aph-green`, `--aph-off-white`, `--aph-dark-gray`, `--aph-medium-gray`, `--aph-light-gray`, spacing scale, radius, shadow, font families |
| **Page layout**           | Max width 1200px, centered, Off-White (`#F5F5F5`) background, base-8 spacing                                                                                                                                             |
| **Header**                | APH Navy background, white text, logo left-aligned, flex layout                                                                                                                                                          |
| **Typography**            | Montserrat for all headings (H1–H4 per type scale in brand guidelines), Open Sans for body/captions, Dark Gray (`#333333`) body text                                                                                     |
| **Textarea**              | Full width, 8–10 rows, 1px `#666666` border, 6px radius, 2px APH Teal focus ring, Open Sans 16px, 12px 16px padding                                                                                                      |
| **Submit button**         | APH Teal background, white text, 6px radius, hover darkens, disabled state grayed out with `cursor: not-allowed`                                                                                                         |
| **Tabs**                  | Horizontal row, active tab has APH Navy bottom border, inactive tabs have transparent border, pointer cursor                                                                                                             |
| **Output cards**          | White background, 1px `#E8E8E8` border, 8px radius, card shadow, 32px padding                                                                                                                                            |
| **Risk badge**            | Inline pill shape. Critical/High: Coral bg + white text. Medium: Gold bg + Dark Gray text. Low: Green bg + white text.                                                                                                   |
| **Confidence badge**      | Same pattern as risk badge with matching colors                                                                                                                                                                          |
| **Key changes table**     | Full width, APH Navy header row with white text, alternating Off-White rows, 1px Light Gray borders                                                                                                                      |
| **Error card**            | Coral left-border (4px), Off-White background, Coral icon area                                                                                                                                                           |
| **Warning banner**        | Gold left-border (4px), light gold background                                                                                                                                                                            |
| **Loading spinner**       | CSS-only spinner (keyframe animation), APH Teal color                                                                                                                                                                    |
| **Metadata bar**          | Flex row of pill-shaped chips, Light Gray background, small text                                                                                                                                                         |
| **Footer**                | APH Navy background, white text, centered, small font                                                                                                                                                                    |
| **Utility classes**       | `.hidden { display: none; }`, `.active` for tab state                                                                                                                                                                    |
| **Copy button feedback**  | `.copied` class changes button text color to APH Green                                                                                                                                                                   |

#### WP-1.4 Empty JavaScript File

Create `public/js/app.js` as an empty file (or with a single comment: `// Sprint 3: client-side logic`). This ensures the `<script>` tag in HTML doesn't 404.

### Files Created

| File                         | Purpose                                    |
| ---------------------------- | ------------------------------------------ |
| `package.json`               | Project metadata (no dependencies)         |
| `public/index.html`          | Complete HTML structure with all UI states |
| `public/css/styles.css`      | Full APH-branded stylesheet                |
| `public/js/app.js`           | Empty placeholder                          |
| `public/assets/coa-logo.png` | Horizontal logo (copied from style-guide)  |
| `public/assets/coa-icon.png` | Icon/seal (copied from style-guide)        |

### Dependencies

None. Sprint 1 has no external dependencies. The `.env` file and `style-guide/` folder already exist.

### Acceptance Criteria

| #     | Criterion                                                                                                                                                  |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| S1-01 | Opening `public/index.html` directly in a browser displays the page without errors.                                                                        |
| S1-02 | The City of Austin logo is visible in the header.                                                                                                          |
| S1-03 | Headings use Montserrat font (verify via browser DevTools or visual comparison).                                                                           |
| S1-04 | Body text uses Open Sans font.                                                                                                                             |
| S1-05 | The header background is APH Navy (`#003054`).                                                                                                             |
| S1-06 | The submit button is APH Teal (`#007B83`) with white text.                                                                                                 |
| S1-07 | A multi-line text area is visible with placeholder text.                                                                                                   |
| S1-08 | A character count display reading "0 / 100,000" is visible near the text area.                                                                             |
| S1-09 | The output area, tabs, loading spinner, error card, and warning banner are all present in the HTML source but not visible on the page (hidden by default). |
| S1-10 | Removing the `hidden` class from the output section in DevTools reveals three styled tabs and output cards.                                                |
| S1-11 | The footer shows "City of Austin" and "Austin Public Health" with APH Navy background.                                                                     |
| S1-12 | The page max width is 1200px and content is centered on wider screens.                                                                                     |

---

## Sprint 2 — Backend Server and Azure OpenAI Integration

**Goal:** Express server running on port 3001, serving static files and exposing `POST /api/convert` that calls Azure OpenAI and returns structured JSON. Testable with `curl`.

### Work Packages

#### WP-2.1 Project Dependencies

| Task                  | Details                                                                                                                                                          |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Update `package.json` | Add `"type": "module"` for ES module imports. Add dependencies: `express`, `openai`, `dotenv`, `zod`, `pdfmake`. Add `"scripts": { "start": "node server.js" }`. |
| Run `npm install`     | Install all dependencies into `node_modules/`.                                                                                                                   |

#### WP-2.2 System Prompt and Schema (`lib/prompt.js`)

| Task                            | Details                                                                                                                                 |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Export `SYSTEM_PROMPT`          | The full system prompt from BRAINSTORM.md defining the three audience types, formatting rules, and constraints.                         |
| Export `PolicyConversionSchema` | The complete Zod schema from PRD.md with all four top-level objects (`executiveSummary`, `staffBriefing`, `publicVersion`, `metadata`). |

#### WP-2.3 Input Validation (`lib/sanitize.js`)

| Task                            | Details                                                                                                                                                                                  |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Export `validateInput(text)`    | Returns `{ valid: true, text: trimmed }` or `{ valid: false, error: "plain language message" }`. Checks: not null/undefined, is string, trimmed length >= 50, trimmed length <= 100,000. |
| Export `sanitizeOutput(parsed)` | Strips any markdown syntax (`**`, `*`, `#`, HTML tags) that may have leaked into JSON string values. Returns cleaned object.                                                             |

#### WP-2.4 Express Server (`server.js`)

| Task                          | Details                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Load environment              | `import 'dotenv/config'` at top of file.                                                                                                                                                                                                                                                                                                                                                                                        |
| Initialize AzureOpenAI client | Using all four `.env` variables.                                                                                                                                                                                                                                                                                                                                                                                                |
| Static file serving           | `express.static('public')` serves the frontend.                                                                                                                                                                                                                                                                                                                                                                                 |
| `GET /health`                 | Returns `{ status: "ok", timestamp: ISO string }`.                                                                                                                                                                                                                                                                                                                                                                              |
| `POST /api/convert`           | Accepts `{ text: string }`. Validates with `validateInput()`. Calls Azure OpenAI with `client.beta.chat.completions.parse()` using `zodResponseFormat`. Checks `finish_reason` and `message.refusal`. Sanitizes output. Returns the parsed JSON.                                                                                                                                                                                |
| Error handling                | `finish_reason === 'length'` → 422 with truncation message. `finish_reason === 'content_filter'` → 422 with filter message. `message.refusal` → 422 with refusal text. HTTP 429 from Azure → 503 with "service busy" message. HTTP 401/404 from Azure → 502 with "configuration error" message. HTTP 5xx from Azure → 502 with "service unavailable" message. All errors return `{ error: { code: string, message: string } }`. |
| Request timeout               | Set 60-second timeout on the convert endpoint.                                                                                                                                                                                                                                                                                                                                                                                  |
| Global error handler          | Express error middleware catches unhandled errors, returns JSON, never leaks stack traces.                                                                                                                                                                                                                                                                                                                                      |

#### WP-2.5 PDF Generator Stub (`lib/pdf-generator.js`)

| Task                                | Details                                                                                                                                          |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Export `generatePDF(data)`          | Stub that returns a basic pdfmake document. Full implementation is a post-Sprint 3 polish task, but the route and function signature must exist. |
| `POST /api/export-pdf` in server.js | Accepts the structured JSON, calls `generatePDF()`, pipes PDF buffer to response with `Content-Type: application/pdf`.                           |

### Files Created or Modified

| File                   | Action    | Purpose                                            |
| ---------------------- | --------- | -------------------------------------------------- |
| `package.json`         | Modified  | Add type, scripts, dependencies                    |
| `server.js`            | Created   | Express server with all routes                     |
| `lib/prompt.js`        | Created   | System prompt + Zod schema                         |
| `lib/sanitize.js`      | Created   | Input validation + output sanitization             |
| `lib/pdf-generator.js` | Created   | PDF generation (stub for Sprint 2, polished later) |
| `node_modules/`        | Generated | npm install output                                 |
| `package-lock.json`    | Generated | Lockfile                                           |

### Dependencies

- `.env` file with valid Azure OpenAI credentials (exists)
- `public/` directory from Sprint 1 (for static file serving, but server can start without it)

### Acceptance Criteria

| #     | Criterion                                                                                                                                                                    |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| S2-01 | `npm start` launches the server without errors and logs "Server running on port 3001" (or similar).                                                                          |
| S2-02 | `curl http://localhost:3001/health` returns a JSON response with `"status": "ok"`.                                                                                           |
| S2-03 | `curl http://localhost:3001/` returns the HTML from `public/index.html`.                                                                                                     |
| S2-04 | `curl -X POST http://localhost:3001/api/convert -H "Content-Type: application/json" -d '{"text":""}''` returns a JSON error with a plain language message about empty input. |
| S2-05 | `curl -X POST http://localhost:3001/api/convert -H "Content-Type: application/json" -d '{"text":"short"}'` returns a JSON error about text being too short.                  |
| S2-06 | Sending a valid 500+ word policy text to `POST /api/convert` returns JSON with all four top-level keys: `executiveSummary`, `staffBriefing`, `publicVersion`, `metadata`.    |
| S2-07 | The `executiveSummary` in the response contains `title`, `bottomLine`, `riskLevel`, `keyPoints`, and `recommendation`.                                                       |
| S2-08 | The `staffBriefing` contains at least one item in `keyChanges` with `area`, `currentState`, `newState`, and `actionRequired`.                                                |
| S2-09 | The `publicVersion` contains `whatYouCanDo` (array) and `whereToGetHelp` (string).                                                                                           |
| S2-10 | The `metadata` contains `policyCategory`, `confidence`, and `sourceWordCount`.                                                                                               |
| S2-11 | No error response contains an HTTP status code, stack trace, or technical error class name in the `message` field.                                                           |
| S2-12 | `POST /api/export-pdf` with valid data returns a response with `Content-Type: application/pdf`.                                                                              |

---

## Sprint 3 — Frontend Wiring and Final Integration

**Goal:** Connect the frontend to the backend. All interactive behavior works: form submission, loading states, tabbed output display, error handling, clipboard copy, and PDF export.

### Work Packages

#### WP-3.1 Form Submission and Validation (`public/js/app.js`)

| Task                     | Details                                                                                                                            |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| Character count          | Listen for `input` event on textarea. Update count display on every keystroke and paste.                                           |
| Client-side validation   | On submit: check empty (after trim), check < 50 chars, check > 100,000 chars. Show error in the error card. Do NOT send to server. |
| Submit handler           | On valid input: disable button, show loading state, POST to `/api/convert` with `{ text }`, handle response or error.              |
| Double-submit prevention | Disable button on submit, re-enable on response (success or error).                                                                |

#### WP-3.2 Loading State

| Task         | Details                                                                            |
| ------------ | ---------------------------------------------------------------------------------- |
| Show loading | Remove `hidden` from loading element, add `hidden` to output area and error card.  |
| Hide loading | Add `hidden` to loading element on response.                                       |
| Button state | Set `button.disabled = true` on submit. Set `button.disabled = false` on response. |

#### WP-3.3 Output Rendering

| Task               | Details                                                                                                                                                                         |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Executive summary  | Populate: title, bottom-line callout, risk badge (with correct color class), summary text, key points as `<li>` elements, fiscal impact (or "Not specified"), recommendation.   |
| Staff briefing     | Populate: title, overview, key changes table rows (area / current / new / action), implementation steps as `<li>`, timeline (or "Not specified"), affected teams as pill chips. |
| Public version     | Populate: title, whatIsThis, whyItMatters, keyTakeaways as `<li>`, whatYouCanDo as `<li>`, whereToGetHelp.                                                                      |
| Metadata bar       | Populate: policy category chip, effective date (or "Not specified"), confidence badge (with color), source word count.                                                          |
| Non-policy warning | If `metadata.inputQuality === 'not_policy'`, remove `hidden` from warning banner.                                                                                               |
| AI disclaimer      | Remove `hidden` from disclaimer element when output is shown.                                                                                                                   |
| Show output area   | Remove `hidden` from tabs, output card, metadata bar, action buttons.                                                                                                           |

#### WP-3.4 Tab Switching

| Task              | Details                                                                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Tab click handler | Event delegation on tab container. On click: add `active` class to clicked tab, remove from others. Show corresponding panel, hide others. |
| Default tab       | Executive Summary tab is active on initial render.                                                                                         |

#### WP-3.5 Error Handling

| Task                   | Details                                                                                                        |
| ---------------------- | -------------------------------------------------------------------------------------------------------------- |
| Server error responses | Parse `{ error: { code, message } }` from response body. Display `message` in the error card.                  |
| Network failure        | `fetch` throws on network error. Show: "Unable to connect to the server. Check your connection and try again." |
| Input preserved        | Never clear the textarea on error.                                                                             |
| Error card visibility  | Remove `hidden` from error card, add `hidden` to output area and loading state.                                |

#### WP-3.6 Clipboard Copy

| Task                | Details                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------ |
| Copy button handler | On click: build plain text from the currently visible tab's content. Call `navigator.clipboard.writeText()`. |
| Fallback            | If clipboard API fails, use fallback: create temporary `<textarea>`, select, `document.execCommand('copy')`. |
| Visual confirmation | Change button text to "Copied!" and add `.copied` class. After 3 seconds, reset to "Copy".                   |

#### WP-3.7 PDF Export

| Task                  | Details                                                                                                                                                          |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Export button handler | On click: POST the stored conversion result JSON to `/api/export-pdf`.                                                                                           |
| Download trigger      | Receive PDF blob from response. Create temporary `<a>` element with `URL.createObjectURL(blob)`, set `download` attribute to `policy-report.pdf`, trigger click. |
| Error handling        | If PDF generation fails, show error in the error card.                                                                                                           |

### Files Created or Modified

| File                    | Action                              | Purpose                                                              |
| ----------------------- | ----------------------------------- | -------------------------------------------------------------------- |
| `public/js/app.js`      | Created (replace empty placeholder) | All client-side logic                                                |
| `public/index.html`     | Minor modifications                 | Add any missing `id` or `data-*` attributes needed for JS targeting  |
| `public/css/styles.css` | Minor modifications                 | Add any animation or transition styles discovered during integration |

### Dependencies

- Sprint 1 complete: HTML structure and CSS must exist with correct element IDs and class names.
- Sprint 2 complete: Server must be running with `POST /api/convert` returning structured JSON.

### Acceptance Criteria

| #     | Criterion                                                                                                                        |
| ----- | -------------------------------------------------------------------------------------------------------------------------------- |
| S3-01 | Typing in the textarea updates the character count in real time.                                                                 |
| S3-02 | Clicking "Convert Policy" with empty textarea shows an error message without a network request (verify in DevTools Network tab). |
| S3-03 | Clicking "Convert Policy" with 10 characters shows a "too short" error without a network request.                                |
| S3-04 | Clicking "Convert Policy" with valid policy text shows a loading spinner and disables the button.                                |
| S3-05 | After the API returns, the loading spinner disappears and three tabs appear.                                                     |
| S3-06 | The Executive Summary tab is active by default and shows a bottom-line statement and risk badge.                                 |
| S3-07 | Clicking "Staff Briefing" tab shows the staff content and hides the executive summary. No page reload.                           |
| S3-08 | Clicking "Public Version" tab shows the public content.                                                                          |
| S3-09 | The metadata bar shows policy category, confidence level, and word count.                                                        |
| S3-10 | Clicking "Copy" on any tab copies text to clipboard. Pasting in another app matches the displayed content.                       |
| S3-11 | After copying, the button shows "Copied!" for approximately 3 seconds, then resets.                                              |
| S3-12 | If the server returns an error, a plain language error message appears and the textarea retains its content.                     |
| S3-13 | After an error, the submit button is re-enabled for retry.                                                                       |
| S3-14 | Clicking "Export PDF" downloads a PDF file that opens in a PDF reader.                                                           |
| S3-15 | Submitting non-policy text (e.g., a recipe) shows a yellow warning banner alongside the results.                                 |
| S3-16 | The AI disclaimer is visible when results are displayed.                                                                         |

---

## Sprint Dependency Map

```
Sprint 1 output          Sprint 2 output          Sprint 3 reads
─────────────           ─────────────           ─────────────
public/index.html  ──────────────────────────►  JS targets DOM elements
public/css/styles.css ───────────────────────►  JS toggles CSS classes
public/assets/*    ──────────────────────────►  (static, no changes)

                        server.js  ──────────►  JS calls POST /api/convert
                        lib/prompt.js            JS calls POST /api/export-pdf
                        lib/sanitize.js
                        lib/pdf-generator.js
                        .env (pre-existing) ──►  server.js reads at startup
```

## Definition of Done

The application is complete when all three sprints' acceptance criteria pass and:

1. `npm start` launches the server on port 3001.
2. Navigating to `http://localhost:3001` shows the branded UI.
3. Pasting policy text and clicking "Convert Policy" returns all three audience versions.
4. All error scenarios show plain language messages.
5. "Copy" and "Export PDF" buttons function correctly.
