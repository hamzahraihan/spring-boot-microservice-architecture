---
name: Microshop
description: Calm, dependable, task-first storefront UI for secure microservice flows.
colors:
  service-blue: "#2563eb"
  service-blue-hover: "#1d4ed8"
  base-text: "#1f2937"
  page-background: "#f9fafb"
  surface-white: "#ffffff"
  muted-footer: "#6b7280"
  brand-chip-background: "antiquewhite"
  card-surface: "beige"
  card-border: "blanchedalmond"
  field-border: "burlywood"
  action-ink: "#000000"
  action-danger: "orangered"
  action-order: "green"
  action-submit: "lightgreen"
  action-text-soft: "#fff3f6"
typography:
  body:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
rounded:
  sm: "5px"
  md: "8px"
  lg: "12px"
  xl: "20px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "20px"
  xl: "24px"
components:
  button-login:
    backgroundColor: "{colors.action-ink}"
    textColor: "{colors.action-text-soft}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "0.5rem 1.5rem"
    height: "50px"
  button-logout:
    backgroundColor: "{colors.action-danger}"
    textColor: "{colors.action-text-soft}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "0.5rem 1.5rem"
    height: "50px"
  button-order:
    backgroundColor: "{colors.action-order}"
    textColor: "{colors.action-text-soft}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "0.5rem 1.5rem"
    height: "50px"
  button-submit:
    backgroundColor: "{colors.action-submit}"
    textColor: "{colors.base-text}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "0.5rem 1.5rem"
    height: "50px"
  card-product:
    backgroundColor: "{colors.card-surface}"
    textColor: "{colors.base-text}"
    rounded: "{rounded.xl}"
    padding: "20px"
  input-default:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.base-text}"
    rounded: "{rounded.sm}"
    padding: "4px"
---

# Design System: Microshop

## Overview

**Creative North Star: "The Trustworthy Service Counter"**

Microshop presents commerce actions in a calm, dependable, and task-first visual language. The interface is intentionally simple: clear surfaces, explicit controls, and low visual noise so buyers can move from browsing to ordering without ambiguity.

The system favors readable utility over ornamental expression. Color is used functionally to separate action intent (login, order, submit, logout) while neutrals keep most surfaces quiet and stable. Rounded geometry softens system interactions while preserving a practical, operational tone suited to a microservice reference product.

**Key Characteristics:**
- Calm neutral canvas with functional action accents.
- Rounded, approachable control shapes without decorative depth.
- Compact vertical flow optimized for quick list scanning and form completion.
- Task-first interaction hierarchy with explicit action labeling.

## Colors

The palette is neutral-led, with one strong service accent and role-specific action colors.

### Primary
- **Service Blue** (`#2563eb`): Primary link/accent color for interactive emphasis.

### Neutral
- **Page Background** (`#f9fafb`): Base page canvas for low-contrast comfort.
- **Base Text** (`#1f2937`): Primary reading color across lists and labels.
- **Surface White** (`#ffffff`): Input and panel base where clarity is required.
- **Muted Footer** (`#6b7280`): De-emphasized informational text.
- **Brand Chip Background** (`antiquewhite`): Soft brand marker behind the Microshop title.
- **Card Surface** (`beige`): Product-card surface tint.
- **Card Border** (`blanchedalmond`): Soft card edge definition.
- **Field Border** (`burlywood`): Low-intensity field boundary.

### Named Rules (optional, powerful)
**The Functional Accent Rule.** Accent colors signal action intent before decoration; each strong color must map to a distinct action type.

**The Quiet Canvas Rule.** Background and body-text neutrals remain stable so operational content, not styling, carries attention.

## Typography

**Display Font:** system-ui (with `-apple-system`, `BlinkMacSystemFont`, `"Segoe UI"`, `Roboto`, sans-serif fallback stack)
**Body Font:** system-ui (with `-apple-system`, `BlinkMacSystemFont`, `"Segoe UI"`, `Roboto`, sans-serif fallback stack)
**Label/Mono Font:** same as body (no separate mono family defined)

**Character:** Contemporary system typography with high familiarity and zero setup friction. Weight shifts are sparse and practical, prioritizing legibility over expression.

### Hierarchy
- **Display** (browser-default heading scale): page-level route headings.
- **Headline** (browser-default heading scale): section-level product and form titles.
- **Title** (`500`, `1rem`, inherited line-height): navigation labels and action-adjacent descriptors.
- **Body** (`400`, `1rem`, `1.6`): all primary paragraph and product detail text.
- **Label** (`500`, `1rem`, normal letter spacing): buttons, nav links, and compact form labels.

### Named Rules (optional)
**The Native Readability Rule.** Keep the system stack intact to preserve predictable rendering across browsers and devices.

## Layout

The layout model is single-column and flow-driven: containers default to `padding: 1rem`, product lists stack vertically with `15px` rhythm, and card internals use `20px` breathing room. Primary navigation uses a centered wrapper with `90vw` width and horizontal distribution for quick scanning. Forms stay full-width on small screens and constrain to `40vw` at `min-width: 768px` for calmer desktop composition.

## Elevation & Depth

Depth is mostly flat and achieved through color separation plus border definition. The only explicit shadow in the system is a light ambient panel shadow intended for top-level framing (`0 1px 3px rgba(0, 0, 0, 0.1)`), not for frequent component stacking.

### Shadow Vocabulary (if applicable)
- **Ambient Frame** (`box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1)`): reserved for high-level container framing.

### Named Rules (optional)
**The Flat-by-Default Rule.** Components remain flat at rest; depth appears only when structural framing is needed.

## Shapes

The form language is soft-rectangular and utilitarian. Inputs use a tight corner (`5px`) for data-entry precision, shared action controls and brand chips use medium rounding (`12px`) for friendly affordance, and product cards use pronounced rounding (`20px`) to group commerce units as discrete modules.

## Components

### Buttons
- **Shape:** Gently rounded action pills (`12px` radius).
- **Primary action family:** Fixed-height controls (`50px`) with compact horizontal padding (`0.5rem 1.5rem`) and soft text contrast.
- **Intent variants:** Black for login, orange-red for logout, green for order, light green for submit.
- **Hover / Focus:** No explicit variant styling is currently defined; behavior follows browser defaults.

### Cards / Containers
- **Corner Style:** Large rounded corners (`20px`) for grouped product modules.
- **Background:** Warm neutral card fill (`beige`) with soft border (`blanchedalmond`).
- **Shadow Strategy:** Flat by default; no card-specific shadow.
- **Internal Padding:** Comfortable interior spacing (`20px`).

### Inputs / Fields
- **Style:** White fill with warm neutral border (`1px burlywood`) and compact radius (`5px`).
- **Focus:** No custom focus ring specified; browser native focus behavior remains.
- **Error / Disabled:** No dedicated visual variants currently defined.

### Navigation
- **Style:** Horizontal bar with distributed groups, compact 50px height, and system-type labels.
- **Brand marker:** Microshop title sits in an `antiquewhite` rounded chip to establish identity.
- **State model:** Link hover is defined for `nav a` via `service-blue`; most button-based nav items currently have no explicit hover or active states.

## Do's and Don'ts

### Do:
- **Do** preserve functional color intent (login/logout/order/submit each keep a distinct role).
- **Do** keep base spacing compact and consistent (`4px`, `8px`, `16px`, `20px`) to protect scan speed.
- **Do** use rounded geometry intentionally: tighter radii for inputs, larger radii for grouped cards.

### Don't:
- **Don't** introduce decorative shadows on routine components; keep the system flat-by-default.
- **Don't** replace the system font stack with expressive families that reduce operational clarity.
- **Don't** apply strong accent colors as background fields for large surfaces; reserve them for actions and state cues.
