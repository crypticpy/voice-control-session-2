# User Stories — Policy Plain Language Converter

**Primary Persona:** Maya, a public health analyst / policy coordinator at Austin Public Health. She reads dense regulatory text daily and needs to communicate policy changes to multiple audiences quickly.

**Secondary Persona:** David, a department director at APH who reviews policy summaries before leadership meetings and city council briefings. He has 5 minutes per policy and needs the bottom line fast.

---

## Core Workflow

### Submitting Policy Text

**US-01** As a policy coordinator, I want to paste regulatory or policy text into a text input and submit it for conversion so that I don't have to manually rewrite it for different audiences.

**US-02** As a policy coordinator, I want to see how many characters I've entered before submitting so that I know whether my text is within the acceptable length.

**US-03** As a policy coordinator, I want the submit button to be disabled while a conversion is processing so that I don't accidentally send duplicate requests.

### Receiving Output

**US-04** As a policy coordinator, I want to receive an executive summary, a staff briefing, and a plain language public version from a single submission so that I can distribute each to the right audience without running the tool three times.

**US-05** As a department director, I want the executive summary to lead with a single bottom-line statement and a risk level so that I can assess urgency in under 10 seconds.

**US-06** As a policy coordinator, I want the staff briefing to show what is changing, how it differs from current practice, and what action each team needs to take so that I can forward it directly to program managers.

**US-07** As a policy coordinator, I want the public version written at a 6th-grade reading level with no jargon so that I can publish it to the APH website or community newsletters without further editing.

**US-08** As a department director, I want to switch between the three output versions using tabs so that I can review each one without scrolling through a single long page.

### Copying and Sharing

**US-09** As a policy coordinator, I want to copy any output version to my clipboard with one click so that I can paste it into an email, a Word document, or a content management system.

**US-10** As a policy coordinator, I want a visual confirmation when text has been copied successfully so that I know the clipboard operation worked before switching to another application.

### PDF Export

**US-11** As a department director, I want to export all three versions as a single branded PDF so that I can attach it to a leadership meeting agenda or email it to city council staff.

**US-12** As a department director, I want the exported PDF to include the City of Austin logo, professional formatting, and page numbers so that it looks appropriate for official distribution.

---

## Transparency and Limitations

### Knowing What the Tool Can and Cannot Do

**US-13** As a policy coordinator, I want to see a confidence indicator on each conversion so that I know when the AI is less certain about its output and I should review more carefully.

**US-14** As a policy coordinator, I want the tool to tell me when my input doesn't appear to be policy text so that I understand why the output may not be useful rather than receiving a misleading analysis.

**US-15** As a policy coordinator, I want to see the detected policy category and effective date so that I can verify the AI understood the document correctly before sharing the output.

**US-16** As a department director, I want a clear disclaimer that this tool assists with — but does not replace — human review so that I don't present AI-generated summaries as official department analysis without verification.

---

## Error Handling

**US-17** As a policy coordinator, I want a clear error message when my text is too short or too long so that I know exactly what to fix before resubmitting.

**US-18** As a policy coordinator, I want to know when the AI service is temporarily unavailable or busy so that I understand the issue is not with my input and can try again later.

**US-19** As a policy coordinator, I want to know when the policy text triggers content safety filters so that I can rephrase sensitive health terminology and resubmit rather than thinking the tool is broken.

**US-20** As a policy coordinator, I want my original text to remain in the input area after an error so that I don't have to paste it again when I retry.

---

## Visual Design and Usability

**US-21** As a department director, I want the interface to follow Austin Public Health branding so that it looks like an official city tool, not a generic AI chatbot.

**US-22** As a policy coordinator, I want a visual indicator that the conversion is in progress so that I know the system is working and hasn't frozen during the 10-15 second processing time.

**US-23** As a policy coordinator, I want the output to be easy to read on my desktop monitor with clear headings and adequate whitespace so that I can scan the content quickly during a busy workday.
