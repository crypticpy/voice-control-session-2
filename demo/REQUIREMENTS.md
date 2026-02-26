# Functional Requirements & Acceptance Criteria

**Project:** Policy Plain Language Converter
**Source:** USER_STORIES.md (US-01 through US-23)
**Verification:** All acceptance criteria are designed to be tested by a non-developer using only a web browser.

---

## 1. Text Input and Submission

### FR-01 Policy Text Input

**Story:** US-01
**Requirement:** The application must provide a multi-line text input where users can paste or type policy text and submit it for conversion.

| #       | Acceptance Criterion                                                                                                                     | Pass / Fail |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| AC-01.1 | A multi-line text area is visible on the page when it first loads.                                                                       |             |
| AC-01.2 | The text area accepts pasted text of at least 10,000 characters without truncating or freezing.                                          |             |
| AC-01.3 | A submit button labeled "Convert Policy" (or similar) is visible below or beside the text area.                                          |             |
| AC-01.4 | Clicking the submit button with valid text in the input begins a conversion.                                                             |             |
| AC-01.5 | The text area contains placeholder text that describes what to paste (e.g., "Paste your policy, regulation, or ordinance text here..."). |             |

### FR-02 Character Count Display

**Story:** US-02
**Requirement:** The application must display a live character count that updates as the user types or pastes text.

| #       | Acceptance Criterion                                                                                                | Pass / Fail |
| ------- | ------------------------------------------------------------------------------------------------------------------- | ----------- |
| AC-02.1 | A character count is visible near the text area showing the current number of characters entered.                   |             |
| AC-02.2 | The count updates immediately when the user types a single character.                                               |             |
| AC-02.3 | The count updates immediately when the user pastes a block of text.                                                 |             |
| AC-02.4 | The maximum allowed length (100,000 characters) is displayed alongside the current count (e.g., "1,532 / 100,000"). |             |

### FR-03 Duplicate Submission Prevention

**Story:** US-03
**Requirement:** The submit button must be disabled while a conversion is in progress to prevent duplicate requests.

| #       | Acceptance Criterion                                                                 | Pass / Fail |
| ------- | ------------------------------------------------------------------------------------ | ----------- |
| AC-03.1 | After clicking submit, the button becomes visually disabled (grayed out or similar). |             |
| AC-03.2 | Clicking the disabled button does not trigger a second conversion.                   |             |
| AC-03.3 | The button becomes enabled again after the conversion completes successfully.        |             |
| AC-03.4 | The button becomes enabled again after the conversion fails with an error.           |             |

---

## 2. Output Display

### FR-04 Three-Audience Output

**Story:** US-04
**Requirement:** A single submission must produce three distinct output versions: an executive summary, a staff briefing, and a plain language public version.

| #       | Acceptance Criterion                                                                                                                                                  | Pass / Fail |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| AC-04.1 | After a successful conversion, three labeled output sections are available: "Executive Summary," "Staff Briefing," and "Public Version" (or equivalent clear labels). |             |
| AC-04.2 | Each section contains text that is different in tone and content from the other two.                                                                                  |             |
| AC-04.3 | All three sections are generated from the same submission — the user does not need to submit the text three times.                                                    |             |

### FR-05 Executive Summary Structure

**Story:** US-05
**Requirement:** The executive summary must lead with a bottom-line statement and include a visible risk level.

| #       | Acceptance Criterion                                                                                                  | Pass / Fail |
| ------- | --------------------------------------------------------------------------------------------------------------------- | ----------- |
| AC-05.1 | The executive summary displays a bottom-line statement as the first prominent element (before the full summary text). |             |
| AC-05.2 | A risk level label is visible (one of: Critical, High, Medium, or Low).                                               |             |
| AC-05.3 | The risk level is visually distinguished from body text (e.g., colored badge, bold label, or icon).                   |             |
| AC-05.4 | The executive summary includes a list of key points (at least one).                                                   |             |
| AC-05.5 | The executive summary includes a recommendation statement.                                                            |             |

### FR-06 Staff Briefing Structure

**Story:** US-06
**Requirement:** The staff briefing must show operational changes with current state, new state, and required actions.

| #       | Acceptance Criterion                                                                                                                                                                          | Pass / Fail |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| AC-06.1 | The staff briefing displays at least one operational change that includes: the area affected, how it currently works, how it will work under the new policy, and what action staff must take. |             |
| AC-06.2 | The changes are presented in a structured format (table or cards), not buried in paragraph text.                                                                                              |             |
| AC-06.3 | The staff briefing includes a list of implementation steps.                                                                                                                                   |             |
| AC-06.4 | The staff briefing lists affected teams or roles.                                                                                                                                             |             |

### FR-07 Public Version Readability

**Story:** US-07
**Requirement:** The public version must use plain language with no jargon or acronyms.

| #       | Acceptance Criterion                                                                            | Pass / Fail |
| ------- | ----------------------------------------------------------------------------------------------- | ----------- |
| AC-07.1 | The public version uses a plain language title that a non-specialist would understand.          |             |
| AC-07.2 | The public version does not contain unexplained acronyms or technical terminology.              |             |
| AC-07.3 | The public version includes a "What you can do" section with at least one concrete action.      |             |
| AC-07.4 | The public version includes contact or help information (phone number, website, or "call 311"). |             |

### FR-08 Tabbed Navigation

**Story:** US-08
**Requirement:** Users must be able to switch between the three output versions using tabs without page reload.

| #       | Acceptance Criterion                                                             | Pass / Fail |
| ------- | -------------------------------------------------------------------------------- | ----------- |
| AC-08.1 | Three tabs (or equivalent toggle controls) are visible when output is displayed. |             |
| AC-08.2 | Clicking a tab shows that version's content and hides the others.                |             |
| AC-08.3 | The currently active tab is visually highlighted.                                |             |
| AC-08.4 | Switching tabs does not cause a page reload or new network request.              |             |
| AC-08.5 | The Executive Summary tab is selected by default when results first appear.      |             |

---

## 3. Copy and Export

### FR-09 Copy to Clipboard

**Story:** US-09, US-10
**Requirement:** Each output version must have a copy button that copies the text to the clipboard and shows a confirmation.

| #       | Acceptance Criterion                                                                                                                | Pass / Fail |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| AC-09.1 | A "Copy" button is visible on each output version.                                                                                  |             |
| AC-09.2 | Clicking the copy button places the output text onto the system clipboard.                                                          |             |
| AC-09.3 | After clicking copy, the user can paste the text into another application (e.g., Notepad, Word, email) and the content matches.     |             |
| AC-09.4 | A visual confirmation appears after a successful copy (e.g., the button text changes to "Copied!" or a toast notification appears). |             |
| AC-09.5 | The confirmation disappears or resets after 3 seconds.                                                                              |             |

### FR-10 PDF Export

**Story:** US-11, US-12
**Requirement:** Users must be able to export all three output versions as a single branded PDF document.

| #       | Acceptance Criterion                                                                                                                    | Pass / Fail |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| AC-10.1 | An "Export PDF" button is visible when output is displayed.                                                                             |             |
| AC-10.2 | Clicking the button triggers a file download (the browser's download dialog or notification appears).                                   |             |
| AC-10.3 | The downloaded file is a valid PDF that opens in a standard PDF reader.                                                                 |             |
| AC-10.4 | The PDF contains all three output versions (executive summary, staff briefing, public version).                                         |             |
| AC-10.5 | The PDF displays the City of Austin logo on the first page.                                                                             |             |
| AC-10.6 | Every page of the PDF displays a page number.                                                                                           |             |
| AC-10.7 | The PDF uses professional formatting: headings are visually distinct from body text, and there is adequate whitespace between sections. |             |

---

## 4. Transparency and Metadata

### FR-11 Confidence Indicator

**Story:** US-13
**Requirement:** The application must display a confidence level for each conversion.

| #       | Acceptance Criterion                                                                              | Pass / Fail |
| ------- | ------------------------------------------------------------------------------------------------- | ----------- |
| AC-11.1 | A confidence level (High, Medium, or Low) is visible after a successful conversion.               |             |
| AC-11.2 | The confidence level is visually distinct (e.g., green for High, yellow for Medium, red for Low). |             |

### FR-12 Non-Policy Input Detection

**Story:** US-14
**Requirement:** When the input text is not recognized as policy, regulatory, or procedural content, the application must display a warning.

| #       | Acceptance Criterion                                                                                                                                                    | Pass / Fail |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| AC-12.1 | When non-policy text is submitted (e.g., a recipe, a personal email, song lyrics), a visible warning message appears indicating the input may not be a policy document. |             |
| AC-12.2 | The warning is displayed in plain language (e.g., "This doesn't appear to be a policy document. Results may not be accurate.").                                         |             |
| AC-12.3 | The output is still shown alongside the warning — the tool does not refuse to process the text.                                                                         |             |

### FR-13 Policy Metadata Display

**Story:** US-15
**Requirement:** The application must display the detected policy category and effective date.

| #       | Acceptance Criterion                                                                                                   | Pass / Fail |
| ------- | ---------------------------------------------------------------------------------------------------------------------- | ----------- |
| AC-13.1 | A policy category label is visible after conversion (e.g., "Environmental Health," "Food Safety," etc.).               |             |
| AC-13.2 | An effective date is displayed if one was found in the source text.                                                    |             |
| AC-13.3 | If no effective date was found, the field shows "Not specified" or equivalent — it does not display a fabricated date. |             |

### FR-14 AI Disclaimer

**Story:** US-16
**Requirement:** The application must display a standing disclaimer about AI-assisted output.

| #       | Acceptance Criterion                                                                                               | Pass / Fail |
| ------- | ------------------------------------------------------------------------------------------------------------------ | ----------- |
| AC-14.1 | A disclaimer is visible on the output screen stating that the tool assists with but does not replace human review. |             |
| AC-14.2 | The disclaimer is visible without scrolling when output is first displayed.                                        |             |

---

## 5. Loading States

### FR-15 Processing Indicator

**Story:** US-22
**Requirement:** The application must show a visible loading state while the conversion is processing.

| #       | Acceptance Criterion                                                                                             | Pass / Fail |
| ------- | ---------------------------------------------------------------------------------------------------------------- | ----------- |
| AC-15.1 | After clicking submit, a loading indicator (spinner, progress bar, or animation) appears within 1 second.        |             |
| AC-15.2 | The loading indicator remains visible for the full duration of processing.                                       |             |
| AC-15.3 | A text message accompanies the indicator (e.g., "Analyzing policy text...") so the user knows what is happening. |             |
| AC-15.4 | The loading indicator disappears when the conversion completes (success or error).                               |             |

---

## 6. Error Handling

All error messages must be written in plain language that a non-technical user can understand. No error codes, stack traces, or technical jargon may be shown to the user.

### FR-16 Text Too Short

**Story:** US-17
**Requirement:** Submitting text shorter than 50 characters must show an error before sending to the server.

| #       | Acceptance Criterion                                                                                                                     | Pass / Fail |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| AC-16.1 | Submitting fewer than 50 characters displays an error message visible on the page.                                                       |             |
| AC-16.2 | The error message says the text is too short and specifies what is needed (e.g., "Please provide at least a paragraph of policy text."). |             |
| AC-16.3 | No network request is sent to the server — the error is caught in the browser.                                                           |             |
| AC-16.4 | The text area still contains the original text after the error (it is not cleared).                                                      |             |

### FR-17 Text Too Long

**Story:** US-17
**Requirement:** Submitting text longer than 100,000 characters must show an error.

| #       | Acceptance Criterion                                                                                                                             | Pass / Fail |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| AC-17.1 | Submitting more than 100,000 characters displays an error message visible on the page.                                                           |             |
| AC-17.2 | The error message says the text is too long and specifies the limit (e.g., "Text exceeds 100,000 characters. Please submit a shorter section."). |             |
| AC-17.3 | The text area still contains the original text after the error.                                                                                  |             |

### FR-18 Empty Input

**Requirement:** Submitting with an empty text area must show an error.

| #       | Acceptance Criterion                                                                                  | Pass / Fail |
| ------- | ----------------------------------------------------------------------------------------------------- | ----------- |
| AC-18.1 | Clicking submit with no text entered displays an error message visible on the page.                   |             |
| AC-18.2 | The error message tells the user to enter text (e.g., "Please paste policy text before submitting."). |             |
| AC-18.3 | Submitting text that is only whitespace (spaces, tabs, newlines) is treated the same as empty.        |             |

### FR-19 Service Unavailable

**Story:** US-18
**Requirement:** When the AI service is down or unreachable, the user must see a plain language error.

| #       | Acceptance Criterion                                                                                                                                             | Pass / Fail |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| AC-19.1 | If the AI service returns a 500, 502, or 503 error, the user sees a message like "The AI service is temporarily unavailable. Please try again in a few minutes." |             |
| AC-19.2 | The error message does not contain HTTP status codes, technical error names, or stack traces.                                                                    |             |
| AC-19.3 | The text area still contains the original text.                                                                                                                  |             |
| AC-19.4 | The submit button is re-enabled so the user can retry.                                                                                                           |             |

### FR-20 Rate Limiting

**Story:** US-18
**Requirement:** When the AI service returns a rate limit error, the user must see a plain language explanation.

| #       | Acceptance Criterion                                                                                                                        | Pass / Fail |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| AC-20.1 | If the AI service returns a 429 (rate limit) error, the user sees a message like "The service is busy. Please wait a moment and try again." |             |
| AC-20.2 | The error message does not mention "429," "rate limit," or any technical terminology.                                                       |             |
| AC-20.3 | The text area still contains the original text.                                                                                             |             |
| AC-20.4 | The submit button is re-enabled so the user can retry.                                                                                      |             |

### FR-21 Content Safety Filter

**Story:** US-19
**Requirement:** When the AI service blocks content due to safety filters, the user must see a specific, helpful message.

| #       | Acceptance Criterion                                                                                                                                                                                                           | Pass / Fail |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| AC-21.1 | If the conversion is blocked by content safety filters, the user sees a message that names the cause (e.g., "This text contains language that triggered the AI safety filter. This can happen with sensitive health topics."). |             |
| AC-21.2 | The message suggests a next step (e.g., "Try rephrasing specific clinical terms and resubmitting.").                                                                                                                           |             |
| AC-21.3 | The message does not blame the user or imply the input is inappropriate.                                                                                                                                                       |             |
| AC-21.4 | The text area still contains the original text.                                                                                                                                                                                |             |

### FR-22 Text Preserved After Error

**Story:** US-20
**Requirement:** The input text must remain in the text area after any error, across all error types.

| #       | Acceptance Criterion                                                               | Pass / Fail |
| ------- | ---------------------------------------------------------------------------------- | ----------- |
| AC-22.1 | After a "text too short" error, the original text remains in the text area.        |             |
| AC-22.2 | After a "text too long" error, the original text remains in the text area.         |             |
| AC-22.3 | After a "service unavailable" error, the original text remains in the text area.   |             |
| AC-22.4 | After a "rate limit" error, the original text remains in the text area.            |             |
| AC-22.5 | After a "content filter" error, the original text remains in the text area.        |             |
| AC-22.6 | After any unexpected or unknown error, the original text remains in the text area. |             |

---

## 7. Endpoint Scenarios

These criteria verify the server endpoint (`POST /api/convert`) under specific conditions.

### FR-23 Valid Policy Text

**Requirement:** The endpoint must return a complete, structured response when given valid policy text between 50 and 100,000 characters.

| #       | Acceptance Criterion                                                                                       | Pass / Fail |
| ------- | ---------------------------------------------------------------------------------------------------------- | ----------- |
| AC-23.1 | Submitting a 500-word public health policy returns all three output sections with visible content in each. |             |
| AC-23.2 | Submitting a 2,000-word regulatory document returns all three output sections within 60 seconds.           |             |
| AC-23.3 | The response includes metadata: policy category, confidence level, and source word count.                  |             |

### FR-24 Very Long Input

**Requirement:** The endpoint must handle long policy text gracefully — either returning a complete response or a clear error.

| #       | Acceptance Criterion                                                                                                                                                                                                | Pass / Fail |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| AC-24.1 | Submitting a 50,000-character policy document (approximately 8,000 words) either returns a complete conversion or displays a plain language error — it does not hang, crash, or return a partial/garbled result.    |             |
| AC-24.2 | Submitting a 90,000-character document (near the limit) either returns a complete conversion or displays a plain language error within 90 seconds.                                                                  |             |
| AC-24.3 | If the response is truncated by the AI model, the user sees a plain language message (e.g., "The policy text was too long to fully convert. Try submitting a shorter section.") — not garbled or incomplete output. |             |

### FR-25 Minimum Viable Input

**Requirement:** The endpoint must handle the shortest acceptable input (50+ characters).

| #       | Acceptance Criterion                                                                                                                          | Pass / Fail |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| AC-25.1 | Submitting exactly 50 characters of text does not produce a server error.                                                                     |             |
| AC-25.2 | The result either shows a conversion with a "Low" confidence indicator or a warning that the text may be too brief for a meaningful analysis. |             |

### FR-26 Server Validation

**Requirement:** The server must independently validate input, even if the browser validation is bypassed.

| #       | Acceptance Criterion                                                                                                                                        | Pass / Fail |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| AC-26.1 | Sending a request with no text field to the API endpoint returns a JSON error response with a plain language message — not a crash or an unformatted error. |             |
| AC-26.2 | Sending a request with text exceeding 100,000 characters to the API endpoint returns a JSON error response with a plain language message.                   |             |
| AC-26.3 | All server error responses use the same JSON structure (e.g., `{ "error": { "code": "...", "message": "..." } }`).                                          |             |

---

## 8. Visual Design

### FR-27 APH Branding

**Story:** US-21
**Requirement:** The interface must follow Austin Public Health brand guidelines.

| #       | Acceptance Criterion                                                                     | Pass / Fail |
| ------- | ---------------------------------------------------------------------------------------- | ----------- |
| AC-27.1 | The City of Austin logo is visible in the page header.                                   |             |
| AC-27.2 | The primary heading font is Montserrat (visually verify against Google Fonts specimen).  |             |
| AC-27.3 | The body text font is Open Sans.                                                         |             |
| AC-27.4 | The primary brand color (APH Navy #003054) is used in the header or primary UI elements. |             |
| AC-27.5 | The accent color (APH Teal #007B83) is used for buttons or interactive elements.         |             |

### FR-28 Readable Output Layout

**Story:** US-23
**Requirement:** Output text must be easy to scan with clear visual hierarchy.

| #       | Acceptance Criterion                                                                                      | Pass / Fail |
| ------- | --------------------------------------------------------------------------------------------------------- | ----------- |
| AC-28.1 | Section headings within each output version are visually larger or bolder than body text.                 |             |
| AC-28.2 | There is visible whitespace between sections (they are not cramped together).                             |             |
| AC-28.3 | Body text line length does not exceed approximately 80 characters per line on a standard desktop monitor. |             |
| AC-28.4 | The output area is at least 60% of the viewport width on a desktop screen.                                |             |

---

## 9. Health Check

### FR-29 Application Health Endpoint

**Requirement:** The server must expose a health check endpoint for operational verification.

| #       | Acceptance Criterion                                                          | Pass / Fail |
| ------- | ----------------------------------------------------------------------------- | ----------- |
| AC-29.1 | Navigating to `/health` in a browser returns a response (not a 404 or crash). |             |
| AC-29.2 | The response indicates whether the server is running.                         |             |

---

## Traceability Matrix

| Requirement | User Story   | Category          |
| ----------- | ------------ | ----------------- |
| FR-01       | US-01        | Input             |
| FR-02       | US-02        | Input             |
| FR-03       | US-03        | Input             |
| FR-04       | US-04        | Output            |
| FR-05       | US-05        | Output            |
| FR-06       | US-06        | Output            |
| FR-07       | US-07        | Output            |
| FR-08       | US-08        | Output            |
| FR-09       | US-09, US-10 | Copy/Export       |
| FR-10       | US-11, US-12 | Copy/Export       |
| FR-11       | US-13        | Transparency      |
| FR-12       | US-14        | Transparency      |
| FR-13       | US-15        | Transparency      |
| FR-14       | US-16        | Transparency      |
| FR-15       | US-22        | Loading           |
| FR-16       | US-17        | Error             |
| FR-17       | US-17        | Error             |
| FR-18       | —            | Error (edge case) |
| FR-19       | US-18        | Error             |
| FR-20       | US-18        | Error             |
| FR-21       | US-19        | Error             |
| FR-22       | US-20        | Error             |
| FR-23       | —            | Endpoint          |
| FR-24       | —            | Endpoint          |
| FR-25       | —            | Endpoint          |
| FR-26       | —            | Endpoint          |
| FR-27       | US-21        | Visual            |
| FR-28       | US-23        | Visual            |
| FR-29       | —            | Operations        |
