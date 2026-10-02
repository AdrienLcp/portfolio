---
name: Adrien Lacourpaille
description: A developer portfolio kept as a release register, one dated row per thing shipped.
colors:
  violet: "#4b2fd6"
  violet-night: "#8d79ff"
  on-violet: "#f7f8fa"
  on-violet-soft: "#dcd6ff"
  paper: "#f7f8fa"
  paper-night: "#101115"
  paper-sunk: "#eceef3"
  paper-sunk-night: "#17181d"
  screen: "#ffffff"
  screen-night: "#1b1c22"
  ink: "#15161a"
  ink-night: "#eceef3"
  ink-soft: "#4d505b"
  ink-soft-night: "#a4a8b4"
  rule: "#c9ccd6"
  rule-night: "#2c2f38"
typography:
  display:
    fontFamily: "Sofia Sans Condensed, Sofia Sans, system-ui, sans-serif"
    fontSize: "clamp(2.9rem, 9.5vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.86
    letterSpacing: "-0.025em"
  heading:
    fontFamily: "Sofia Sans Condensed, Sofia Sans, system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 5vw, 3.6rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "Sofia Sans, system-ui, sans-serif"
    fontSize: "clamp(1.2rem, 2.2vw, 1.5rem)"
    fontWeight: 500
    lineHeight: 1.35
  body:
    fontFamily: "Sofia Sans, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Sofia Sans Condensed, Sofia Sans, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.1em"
  label-large:
    fontFamily: "Sofia Sans Condensed, Sofia Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.06em"
  caption:
    fontFamily: "Sofia Sans Condensed, Sofia Sans, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.06em"
  figures:
    fontFamily: "Sofia Sans Condensed, Sofia Sans, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 600
    letterSpacing: "0.01em"
    fontFeature: "tnum, lnum"
  code:
    fontFamily: "ui-monospace, Cascadia Code, Consolas, monospace"
    fontSize: "0.9em"
rounded:
  hair: "1px"
  s: "2px"
  full: "999px"
spacing:
  4xs: "0.125rem"
  3xs: "0.25rem"
  2xs: "0.5rem"
  xs: "0.75rem"
  s: "1rem"
  m: "1.25rem"
  l: "1.5rem"
  xl: "2rem"
  2xl: "2.5rem"
  3xl: "3rem"
  4xl: "4.5rem"
  5xl: "7rem"
  block: "clamp(2rem, 4vw, 3rem)"
  section: "clamp(2.5rem, 6vw, 4.5rem)"
  columns: "clamp(2rem, 5vw, 5rem)"
components:
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label-large}"
    rounded: "{rounded.s}"
    padding: "0 1rem"
    height: "2.75rem"
  button-ink-hover:
    backgroundColor: "{colors.violet}"
    textColor: "{colors.on-violet}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label-large}"
    rounded: "{rounded.s}"
    padding: "0 1rem"
    height: "2.75rem"
  button-line-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.s}"
    padding: "0 0.5rem"
    height: "2rem"
  chip-lit:
    backgroundColor: "{colors.violet}"
    textColor: "{colors.on-violet}"
  rail-slot:
    backgroundColor: "transparent"
    textColor: "{colors.ink-soft}"
    typography: "{typography.label}"
    rounded: "{rounded.hair}"
    padding: "0 0.5rem"
    height: "2rem"
  rail-slot-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.s}"
    padding: "0.5rem 0.75rem"
  rubber-stamp:
    backgroundColor: "transparent"
    textColor: "{colors.violet}"
    rounded: "3px"
    padding: "0.25rem 0.5rem 0.5rem"
---

# Design System: Adrien Lacourpaille

## Overview

**Creative North Star: "The Release Register"**

The site is a ledger kept by hand: every app and every package is one dated row, ruled off from the next, and the site grows by a row each time something ships. Nothing is a card, nothing floats. Rows sit on one sheet, drawn edge to edge across a single column, and the eye reads down the dates the way it would read a logbook.

The voice of the page is in its lettering. Condensed capitals name, date and label everything; a plain humanist sans carries the sentences between. Colour is almost absent: cool paper, near-black ink, grey rules, and one violet reserved for the ink of a rubber stamp and for what is lit. Each page has one authored moment, the stamp pressed onto its newest entry, and everything else stays quiet so that moment lands.

The frame never borrows a project's domain. A party game, a training app and a public-records site each enter as a row with its own drawing; the register around them does not change.

**Key Characteristics:**
- One column (the sheet), ruled across its full width, capped at 90rem.
- Dates and versions in tabular condensed figures, left of every entry.
- Drawings of each app's screens, never screenshots.
- Violet only as stamp ink and as the lit state.
- Flat throughout: depth comes from rules and a sunk paper tone, never shadow.

## Colors

A cool, nearly monochrome paper-and-ink palette with a single saturated violet. Every colour is a `light-dark()` pair; the night values are the same roles, not a separate palette.

### Primary
- **Stamp Violet** (violet / violet-night): the ink of the rubber stamp, the lit chip, the hovered solid button and the caret. Text set on it uses **Violet Paper** (on-violet), and its quieter lines **Pale Violet** (on-violet-soft).

### Neutral
- **Cool Paper** (paper / paper-night): the page itself.
- **Sunk Paper** (paper-sunk / paper-sunk-night): a surface set below the sheet, such as the CV desk and the ledger's capital row.
- **Screen White** (screen / screen-night): the inside of a drawn device screen, never a page surface.
- **Register Ink** (ink / ink-night): text, the heavy rule, solid buttons, the selected rail slot.
- **Faded Ink** (ink-soft / ink-soft-night): secondary text, dates' captions, unselected controls, field borders at rest.
- **Ruling Grey** (rule / rule-night): hairlines between rows and around quiet controls.

### Named Rules
**The One Ink Rule.** Violet is stamp ink or the lit state, nothing else: no violet headings, no violet backgrounds behind sections, no violet flood.

**The Rule Is Ink Rule.** A strong rule is drawn in Register Ink (`--rule-strong` is `--ink`), so it reads as part of the writing, not as a border.

## Typography

**Display Font:** Sofia Sans Condensed (with Sofia Sans, system-ui)
**Body Font:** Sofia Sans (with system-ui, Segoe UI, Roboto)
**Label/Mono Font:** Sofia Sans Condensed for labels and figures; ui-monospace (Cascadia Code, Consolas) for code

**Character:** A register's lettering: tall condensed capitals stamped at the head of each entry, and a calm, open sans for the sentences a reader actually reads.

### Hierarchy
- **Display** (800, fluid per page, 0.86, -0.025em, capitals): the page's title, as large as the page allows: the name on the home page, a project's title, the 404's line.
- **Heading** (800, fluid per section, 0.9, -0.02em, capitals): a title inside the page: an entry's name, a section, a step of the path.
- **Lead** (500, fluid, 1.35): the sentence after a title that says what it is about.
- **Body** (400, 1.0625rem, 1.55): running text, held to a reading measure (34 to 40rem).
- **Label** (700, 0.8125rem, 0.1em, capitals): column heads, kinds, controls. **Label large** (1rem, 0.06em) for button text and field names; **Caption** (500, 0.06em) under figures.
- **Figures** (condensed, tabular and lining numerals): every date and version, so columns of them align.

Fixed sizes come from one step scale: 0.75, 0.8125, 0.875, 0.9375, 1, 1.0625 and 1.1875rem (`--text-2xs` to `--text-l`). Fluid sizes belong to display, heading and lead only, set per page.

### Named Rules
**The Capitals Name, Sentences Explain Rule.** Condensed capitals for anything that names, dates or labels; the prose sans for anything that explains. A sentence is never set in capitals.

## Layout

Everything sits on **the sheet**: one column inset from the window by a sheet gutter (16px, 32px from 720px, 48px from 1200px) and capped at 90rem. Rules run the full width of the sheet; content inside a row sits on the register's columns.

The register has four columns once the screen reaches 960px: date (6.5rem), text, drawing, state (7.5rem), with a 1.25rem column gap. Below that, the date and state fold above and beside the text and the drawing drops under it. The package ledger gains one column per app from 1120px. Below 600px a mechanism diagram moves its words into a key rather than shrinking past reading size.

Spacing comes from one rem scale on a 4px grid (`--space-4xs` 2px to `--space-5xl` 112px), plus three fluid steps: **block** (between a page head and what follows), **section** (above and below a section) and **columns** (between side-by-side columns). Controls have fixed heights: 2rem (chip, rail), 2.25rem (row heads), 2.75rem (the touch target of every button and link control), 3.25rem (a specimen's bar).

### Named Rules
**The Sheet Rule.** Nothing escapes the sheet except a sunk surface boundary; no element sets its own page width.

## Elevation & Depth

The system is flat. There are no shadows anywhere. Depth is said by ruling and tone: a hairline (1px Ruling Grey) between rows, a heavy rule (2px Register Ink) above a section or a ledger, and Sunk Paper for a surface set below the sheet. The only thing that rises off the page is the rubber stamp, and it does so with ink texture and a slight tilt, not with shadow.

### Named Rules
**The Ruled Not Raised Rule.** If something needs separating, draw a rule or sink the surface. Never lift it.

## Shapes

Corners are nearly square: 2px on buttons, chips, rails and fields, 1px on the rail's moving slot and highlight marks. Full rounding is kept for dots and swatches. Strokes come in three weights, 1px (hairline), 1.5px (control edge, underlines) and 2px (heavy rule, bold underline). An invalid field changes its stroke to a 4px double rule instead of turning red.

The rubber stamp is the one tilted shape (-7deg, -4deg when small): a 2.5px violet border with a 1px outline offset outside it, roughened by an ink-bleed filter.

## Components

### Buttons
- **Shape:** near-square corners (2px), 1.5px Register Ink edge, 2.75rem tall, label-large lettering, 1rem side padding.
- **Ink (primary):** Register Ink fill, Cool Paper text. On hover it turns Stamp Violet.
- **Line (secondary):** transparent with an ink edge. On hover it fills with ink.
- **Caps (tertiary):** label-large text with no box; hover draws a 2px underline.
- **Focus:** a 2px ink ring from the shared focus module, on every control.

### Chips
- **Style:** hairline border, 2px corners, condensed 600 at 0.9375rem, 2rem tall.
- **State:** a lit chip (the app being looked at) fills with Stamp Violet; hover on a fine pointer darkens the border.

### Inputs / Fields
- **Style:** Cool Paper fill, 1.5px Faded Ink edge, 2px corners, body text.
- **Focus:** the edge darkens to Register Ink; the caret is violet.
- **Error:** a 4px double ink rule and a bold message with an icon beside the field, never colour alone.

### Navigation
- **Style:** a running header of condensed capital links over a heavy rule; the current page is underlined. Language and theme are rails: a hairline box holding label slots, with an ink pawn that slides under the selected one.
- **Mobile:** the links fold into a menu button that opens a popover sheet.

### Rubber Stamp
The register's signature. A violet stamp states an entry's release state (shipped, live, in progress) with its date beneath in tabular figures. It comes small inside a ledger row, medium on an entry, large as a page's one stamp. The newest entry's stamp is pressed onto the page as it loads; with reduced motion it simply appears. On dark paper it drops the multiply blend so the ink stays visible.

### Register Row
A dated entry: its date in figures on the left, the entry's heading, kind line, lead and summary in the text column, a drawing of its screens, and its stamp on the right. Rows are separated by hairlines and unfold in place to show more.

## Do's and Don'ts

### Do:
- **Do** pick every margin, padding and gap from `--space-*`, every rule from `--hairline`, `--hairline-strong` or `--heavy-rule`, and every fixed text size from `--text-*`.
- **Do** set dates and versions in tabular figures so columns align.
- **Do** draw a new project's screens for its row rather than screenshot them.
- **Do** keep each page to one pressed stamp; smaller row stamps are register vocabulary, not moments.

### Don't:
- **Don't** use violet for anything but stamp ink and the lit state.
- **Don't** add shadows, soft gradients or rounded cards; separate with rules. A hard two-tone split (a folded corner) is the only gradient.
- **Don't** let a project's subject restyle the frame: a game does not make the register playful, a sport app does not make it athletic.
- **Don't** set sentences in condensed capitals.
