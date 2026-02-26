# Austin Public Health — Brand Guidelines

> **Source:** Austin Public Health Brand Guidelines, September 2025
> **Purpose:** Reference style guide for the Voice-Driven AI Development workshop demo project (Policy Plain Language Converter)

---

## Table of Contents

1. [Brand Overview](#brand-overview)
2. [Logo](#logo)
3. [Color Palette](#color-palette)
4. [Typography](#typography)
5. [Iconography](#iconography)
6. [Patterns & Textures](#patterns--textures)
7. [Photography Style](#photography-style)
8. [Layout & Composition](#layout--composition)
9. [Quick-Reference Token Table](#quick-reference-token-table)

---

## Brand Overview

Austin Public Health (APH) serves as the public health department for the City of Austin and Travis County. The brand identity conveys trust, accessibility, community health, and modern government services. All materials should feel welcoming, professional, and reflective of Austin's diverse population.

**Brand Personality:** Trustworthy · Approachable · Community-Centered · Modern · Inclusive

---

## Logo

### Primary Logo
- The **primary logo** is the full-color Austin Public Health logo featuring the City of Austin seal mark alongside the department name.
- Preferred placement: **top-left** of documents and presentations.

### Logo Versions
| Version | Use Case |
|---|---|
| **Full Color** | Primary use on white or light backgrounds |
| **Reverse (White)** | Use on dark backgrounds (APH Navy, APH Teal) |
| **Black** | Single-color printing or faxing |
| **City Seal Only** | When space is limited or co-branded with other City departments |

### Logo Clear Space
- Maintain a minimum clear space around the logo equal to the **height of the "A" in "Austin"** on all sides.
- Never place text, graphics, or other logos within this clear zone.

### Logo Don'ts
- Do not stretch, rotate, or skew the logo
- Do not change the logo colors outside approved palette
- Do not place the full-color logo on busy photographic backgrounds without a solid color bar or overlay
- Do not recreate or modify the City seal
- Do not add drop shadows, outlines, or effects

---

## Color Palette

### Primary Colors

| Color Name | Hex | RGB | Usage |
|---|---|---|---|
| **APH Navy** | `#003054` | rgb(0, 48, 84) | Primary brand color. Headers, footers, backgrounds, body text on light backgrounds |
| **APH Teal** | `#007B83` | rgb(0, 123, 131) | Secondary brand color. Accents, links, buttons, call-to-action elements |
| **White** | `#FFFFFF` | rgb(255, 255, 255) | Backgrounds, reverse text on dark fills |

### Secondary Colors

| Color Name | Hex | RGB | Usage |
|---|---|---|---|
| **APH Sky Blue** | `#4DA8DA` | rgb(77, 168, 218) | Charts, data visualizations, supportive accents |
| **APH Light Teal** | `#5EC6C3` | rgb(94, 198, 195) | Highlight backgrounds, callout boxes, wellness themes |
| **APH Green** | `#78BE20` | rgb(120, 190, 32) | Success states, environmental health, positive indicators |
| **APH Gold** | `#F2A900` | rgb(242, 169, 0) | Warnings, highlights, community engagement themes |

### Neutral Colors

| Color Name | Hex | RGB | Usage |
|---|---|---|---|
| **APH Dark Gray** | `#333333` | rgb(51, 51, 51) | Body text, secondary headers |
| **APH Medium Gray** | `#666666` | rgb(102, 102, 102) | Captions, metadata, supporting text |
| **APH Light Gray** | `#E8E8E8` | rgb(232, 232, 232) | Borders, dividers, table backgrounds, subtle fills |
| **APH Off-White** | `#F5F5F5` | rgb(245, 245, 245) | Page backgrounds, alternate row shading |

### Extended / Data Visualization Colors

| Color Name | Hex | RGB | Usage |
|---|---|---|---|
| **APH Coral** | `#E8604C` | rgb(232, 96, 76) | Alerts, urgent callouts, critical data |
| **APH Purple** | `#6B4C9A` | rgb(107, 76, 154) | Behavioral health, equity themes, chart series |
| **APH Warm Gray** | `#B5A898` | rgb(181, 168, 152) | Backgrounds, muted supporting graphics |

### Color Accessibility Notes
- All text must meet **WCAG 2.1 AA** contrast requirements (4.5:1 for normal text, 3:1 for large text).
- APH Navy on White: **12.6:1** ✅
- APH Teal on White: **5.2:1** ✅
- White on APH Navy: **12.6:1** ✅
- White on APH Teal: **5.2:1** ✅
- Do **not** place APH Gold or APH Light Teal text on white backgrounds — insufficient contrast.
- Use APH Dark Gray (`#333333`) instead of pure black for body text to reduce eye strain.

---

## Typography

### Primary Typeface: **Montserrat**
Open-source Google Font. Used for **headings, titles, and display text**.

| Weight | Usage | CSS |
|---|---|---|
| **Bold (700)** | H1 headings, hero titles, slide titles | `font-weight: 700` |
| **SemiBold (600)** | H2–H3 headings, subheads, button text | `font-weight: 600` |
| **Medium (500)** | Navigation labels, card titles, callouts | `font-weight: 500` |

### Secondary Typeface: **Open Sans**
Open-source Google Font. Used for **body text, captions, data labels, and form content**.

| Weight | Usage | CSS |
|---|---|---|
| **Regular (400)** | Body text, paragraphs, descriptions | `font-weight: 400` |
| **SemiBold (600)** | Inline emphasis, table headers, labels | `font-weight: 600` |
| **Italic (400i)** | Quotes, citations, legal disclaimers | `font-style: italic` |

### Type Scale (Recommended)

| Element | Font | Size | Weight | Line Height |
|---|---|---|---|---|
| H1 — Page Title | Montserrat | 32 px / 24 pt | Bold | 1.2 |
| H2 — Section Head | Montserrat | 24 px / 18 pt | SemiBold | 1.25 |
| H3 — Subsection | Montserrat | 20 px / 15 pt | SemiBold | 1.3 |
| H4 — Card Title | Montserrat | 16 px / 12 pt | Medium | 1.35 |
| Body | Open Sans | 16 px / 12 pt | Regular | 1.5 |
| Small / Caption | Open Sans | 14 px / 10.5 pt | Regular | 1.4 |
| Micro / Legal | Open Sans | 12 px / 9 pt | Regular | 1.4 |

### Fallback Stack
```css
/* Headings */
font-family: 'Montserrat', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;

/* Body */
font-family: 'Open Sans', 'Segoe UI', Helvetica, Arial, sans-serif;

/* Code / Monospace (for technical content) */
font-family: 'Source Code Pro', 'Consolas', 'Monaco', monospace;
```

---

## Iconography

### Style
- **Line-style icons** (not filled) preferred for UI and wayfinding
- Stroke weight: **2 px** at default 24 × 24 px size
- Corner radius: **2 px** (slightly rounded, not sharp)
- Color: APH Navy or APH Teal on light backgrounds; White on dark backgrounds

### Recommended Icon Sets
- [Lucide Icons](https://lucide.dev) (primary — open source, consistent)
- [Phosphor Icons](https://phosphoricons.com) (alternative)
- Custom icons should follow the same grid, weight, and style rules

### Icon Usage
| Context | Color | Size |
|---|---|---|
| Navigation / UI | APH Navy `#003054` | 24 × 24 px |
| Inline with body text | APH Teal `#007B83` | 16 × 16 px |
| Hero / Feature blocks | APH Teal or White | 48 × 48 px |
| Decorative / Section | APH Light Teal `#5EC6C3` | 64+ px |

---

## Patterns & Textures

### Approved Background Patterns
1. **Topographic Lines** — Subtle, light gray (#E8E8E8 at 40% opacity) curved contour lines. Nods to Austin's landscape and terrain. Use on section backgrounds and hero areas.
2. **Dot Grid** — Evenly spaced small dots (APH Light Gray) on Off-White. Use for infographic backgrounds, data sections.
3. **Diagonal Stripe** — Thin APH Light Teal stripes at 45° angle on white. Use sparingly on callout banners.

### Pattern Rules
- Patterns must **never compete** with text or data — keep at ≤ 30% opacity
- Always maintain sufficient contrast with overlaid text
- Patterns are **decorative only** — never convey information

---

## Photography Style

### Guidelines
- **Authentic, community-focused** images showing real Austin residents
- Diverse representation across age, ethnicity, ability, and gender
- Natural lighting preferred; avoid heavy filters or dramatic processing
- Show people **engaged in healthy activities** or **interacting with services**
- Austin landmarks and local scenery welcome as secondary imagery

### Photo Treatment
- Apply a subtle **APH Teal overlay at 15–20% opacity** for brand cohesion when using full-bleed photos
- Duotone treatment using **APH Navy + APH Light Teal** is acceptable for hero images
- Never use stock photos that feel generic or staged

---

## Layout & Composition

### Grid System
- **12-column grid** for web layouts
- **Gutter width:** 24 px (desktop), 16 px (mobile)
- **Max content width:** 1200 px
- **Margins:** 80 px (desktop), 24 px (mobile)

### Spacing Scale (Base 8)
| Token | Value | Usage |
|---|---|---|
| `spacing-xs` | 4 px | Tight gaps, inline icon padding |
| `spacing-sm` | 8 px | Compact spacing, chip padding |
| `spacing-md` | 16 px | Standard element spacing |
| `spacing-lg` | 24 px | Section internal padding |
| `spacing-xl` | 32 px | Card padding, major gaps |
| `spacing-2xl` | 48 px | Section breaks |
| `spacing-3xl` | 64 px | Page section separation |

### Component Styling

**Buttons:**
| Type | Background | Text | Border Radius |
|---|---|---|---|
| Primary | APH Teal `#007B83` | White | 6 px |
| Secondary | Transparent | APH Teal | 6 px (2 px border) |
| Danger | APH Coral `#E8604C` | White | 6 px |

**Cards:**
- Background: White
- Border: 1 px APH Light Gray (`#E8E8E8`)
- Border Radius: 8 px
- Shadow: `0 2px 8px rgba(0, 48, 84, 0.08)`
- Padding: `spacing-xl` (32 px)

**Input Fields:**
- Border: 1 px APH Medium Gray (`#666666`)
- Border Radius: 6 px
- Focus ring: 2 px APH Teal
- Padding: 12 px 16 px
- Font: Open Sans Regular 16 px

---

## Quick-Reference Token Table

For use as CSS custom properties or design tokens in the demo app:

```css
:root {
  /* === PRIMARY === */
  --aph-navy:        #003054;
  --aph-teal:        #007B83;
  --aph-white:       #FFFFFF;

  /* === SECONDARY === */
  --aph-sky-blue:    #4DA8DA;
  --aph-light-teal:  #5EC6C3;
  --aph-green:       #78BE20;
  --aph-gold:        #F2A900;

  /* === NEUTRALS === */
  --aph-dark-gray:   #333333;
  --aph-medium-gray: #666666;
  --aph-light-gray:  #E8E8E8;
  --aph-off-white:   #F5F5F5;

  /* === EXTENDED === */
  --aph-coral:       #E8604C;
  --aph-purple:      #6B4C9A;
  --aph-warm-gray:   #B5A898;

  /* === TYPOGRAPHY === */
  --font-heading:    'Montserrat', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  --font-body:       'Open Sans', 'Segoe UI', Helvetica, Arial, sans-serif;
  --font-code:       'Source Code Pro', 'Consolas', 'Monaco', monospace;

  /* === SPACING (base-8) === */
  --spacing-xs:      4px;
  --spacing-sm:      8px;
  --spacing-md:      16px;
  --spacing-lg:      24px;
  --spacing-xl:      32px;
  --spacing-2xl:     48px;
  --spacing-3xl:     64px;

  /* === BORDERS & RADIUS === */
  --radius-sm:       4px;
  --radius-md:       6px;
  --radius-lg:       8px;
  --border-default:  1px solid var(--aph-light-gray);
  --shadow-card:     0 2px 8px rgba(0, 48, 84, 0.08);
}
```

---

*This document was extracted from the official Austin Public Health Brand Guidelines (September 2025) for use as a project reference in the Voice-Driven AI Development workshop series.*
