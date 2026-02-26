# Policy Plain Language Converter — Demo App

A web application that converts dense public health policy text into three audience-specific outputs using Azure OpenAI:

- **Executive Summary** — For leadership decision-making
- **Staff Briefing** — For operational implementation
- **Public Version** — Plain language for community members

## Quick Start

```bash
npm install
cp .env.template .env
# Edit .env with your Azure OpenAI credentials (see below)
npm start
# Open http://localhost:3001
```

## Azure OpenAI Setup

You need an Azure OpenAI resource with a deployed model. Get your credentials from the Azure Portal and fill in `.env`:

| Variable                   | Where to Find It                                                   |
| -------------------------- | ------------------------------------------------------------------ |
| `AZURE_OPENAI_API_KEY`     | Azure Portal > Your Resource > Keys and Endpoint > KEY 1           |
| `AZURE_OPENAI_ENDPOINT`    | Same page — e.g. `https://your-resource.openai.azure.com`          |
| `AZURE_OPENAI_DEPLOYMENT`  | Azure Portal > Your Resource > Model Deployments > deployment name |
| `AZURE_OPENAI_API_VERSION` | Default: `2024-12-01-preview`                                      |

## Customize Branding for Your Agency

Everything you need to rebrand this app is in one file: **`branding.json`**

### 1. Change Text

Edit `branding.json` and update these fields:

```json
{
  "organizationName": "Your Organization",
  "departmentName": "Your Department",
  "appTitle": "Policy Plain Language Converter",
  "tagline": "Your custom tagline here",
  "footerDisclaimer": "Your disclaimer text here."
}
```

### 2. Swap Logos

Drop your logo and favicon into `public/assets/`, then update the paths:

```json
{
  "logoPath": "assets/your-logo.png",
  "logoAlt": "Your org logo",
  "faviconPath": "assets/your-icon.png"
}
```

The header logo displays at 56px tall, so a horizontal image around 200x56px works well. PNG or SVG both work.

### 3. Change Colors

Update the `colors` object to match your brand:

```json
{
  "colors": {
    "primary": "#003054",
    "primaryDark": "#001f38",
    "accent": "#007B83",
    "accentDark": "#006269",
    "accentLight": "#5EC6C3",
    "highlight": "#78BE20"
  }
}
```

Here's what each color controls:

| Color         | Used For                                              |
| ------------- | ----------------------------------------------------- |
| `primary`     | Header background, headings, executive summary accent |
| `primaryDark` | Footer background, deep header gradient               |
| `accent`      | Buttons, links, focus rings, staff briefing accent    |
| `accentDark`  | Button hover states                                   |
| `accentLight` | Department label, gradient endpoints                  |
| `highlight`   | Public version accent, success states                 |

The entire UI — header, buttons, cards, badges, gradients — updates automatically from these 6 values. No CSS editing required.

### After Making Changes

- **Text, logo, or color changes:** Restart the server (`npm start`) and refresh your browser
- **Logo files:** Just drop them in `public/assets/` — any image format works

## Project Structure

```
├── branding.json          # Branding config (edit this to customize)
├── .env.template          # Environment variable template
├── server.js              # Express server + Azure OpenAI integration
├── package.json           # Dependencies
├── public/
│   ├── index.html         # Main page
│   ├── css/styles.css     # Stylesheet (uses CSS custom properties)
│   ├── js/app.js          # Client-side logic + branding loader
│   └── assets/            # Logos, favicon — drop your own here
│       ├── coa-logo.png
│       └── coa-icon.png
├── lib/
│   ├── prompt.js          # System prompt + Zod schema
│   ├── pdf-generator.js   # PDF export via pdfmake
│   └── sanitize.js        # Input validation + output sanitization
└── style-guide/           # Original brand reference files
```

## Tech Stack

- **Backend:** Node.js + Express
- **Frontend:** Vanilla HTML/CSS/JavaScript (no framework)
- **AI:** Azure OpenAI (GPT-4.1 Mini) with structured output
- **PDF Export:** pdfmake
