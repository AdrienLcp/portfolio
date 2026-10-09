---
name: Adrien Lacourpaille
description: A developer portfolio set as an index of names, each project's picture following the pointer and unfolding in place.
colors:
  violet: "#4b2fd6"
  violet-night: "#8d79ff"
  on-violet: "#f7f8fa"
  on-violet-night: "#101115"
  on-violet-soft: "#dcd6ff"
  on-violet-soft-night: "#1f1757"
  paper: "#f7f8fa"
  paper-night: "#101115"
  surface: "#eceef3"
  surface-night: "#1a1b21"
  surface-strong: "#e2e5ec"
  surface-strong-night: "#24262d"
  screen: "#ffffff"
  screen-night: "#1b1c22"
  ink: "#15161a"
  ink-night: "#eceef3"
  ink-soft: "#4d505b"
  ink-soft-night: "#a4a8b4"
  ink-faded: "#8b8f9b"
  ink-faded-night: "#6c707c"
  rule: "#c9ccd6"
  rule-night: "#2c2f38"
typography:
  display:
    fontFamily: "Sofia Sans Condensed, Sofia Sans, system-ui, sans-serif"
    fontSize: "clamp(3rem, 0.7059rem + 8.8235vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.88
    letterSpacing: "-0.025em"
  index-name:
    fontFamily: "Sofia Sans Condensed, Sofia Sans, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 1.3298rem + 5.4622vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.025em"
  heading:
    fontFamily: "Sofia Sans Condensed, Sofia Sans, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 1.4847rem + 1.0204vw, 2.25rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.01em"
  role:
    fontFamily: "Sofia Sans Condensed, Sofia Sans, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 500
  lead:
    fontFamily: "Sofia Sans, system-ui, sans-serif"
    fontSize: "clamp(1.2rem, 1.0143rem + 0.7143vw, 1.5rem)"
    fontWeight: 500
    lineHeight: 1.4
  body:
    fontFamily: "Sofia Sans, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  label-large:
    fontFamily: "Sofia Sans Condensed, Sofia Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.04em"
  label:
    fontFamily: "Sofia Sans Condensed, Sofia Sans, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.1em"
  figures:
    fontFamily: "Sofia Sans Condensed, Sofia Sans, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.5439rem + 1.7544vw, 2.75rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.01em"
    fontFeature: "tnum, lnum"
  code:
    fontFamily: "ui-monospace, Cascadia Code, Consolas, monospace"
    fontSize: "0.875rem"
    lineHeight: 1.65
rounded:
  s: "6px"
  m: "14px"
  l: "clamp(20px, 3vw, 32px)"
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
  chapter: "clamp(3rem, 1.6891rem + 5.042vw, 6rem)"
  section: "clamp(2.5rem, 1.4388rem + 4.0816vw, 4.5rem)"
  masthead: "clamp(3rem, 1rem + 7.6923vw, 7rem)"
  columns: "clamp(2rem, 0.9459rem + 4.0541vw, 5rem)"
  card: "clamp(2rem, 0.6435rem + 5.2174vw, 5rem)"
  opening: "clamp(1.5rem, 0.7041rem + 3.0612vw, 3rem)"
  lead: "clamp(1.5rem, 1.102rem + 1.5306vw, 2.25rem)"
  step: "clamp(1.25rem, 0.6848rem + 2.1739vw, 2.5rem)"
  title: "clamp(1.25rem, 0.7685rem + 1.8519vw, 2rem)"
components:
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label-large}"
    rounded: "{rounded.full}"
    padding: "0 1.1rem"
    height: "2.75rem"
  button-ink-hover:
    backgroundColor: "{colors.violet}"
    textColor: "{colors.on-violet}"
  button-line:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.label-large}"
    rounded: "{rounded.full}"
    padding: "0 1.1rem"
    height: "2.75rem"
  button-line-hover:
    backgroundColor: "{colors.surface-strong}"
  button-caps:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label-large}"
    padding: "0 0.25rem"
    height: "2.75rem"
  button-caps-hover:
    textColor: "{colors.violet}"
  rail:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.full}"
    padding: "3px"
  rail-slot:
    backgroundColor: "transparent"
    textColor: "{colors.ink-soft}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "0 0.6rem"
    height: "2.75rem"
    width: "2.25rem"
  rail-slot-selected:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  index-toggle:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    size: "2.5rem"
  index-toggle-open:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  picture:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.m}"
  following-preview:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.m}"
    width: "clamp(18rem, 26vw, 24rem)"
  soft-block:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.l}"
    padding: "{spacing.card}"
  address-tile:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.m}"
    padding: "1rem 1.25rem"
    height: "2.75rem"
  address-tile-hover:
    backgroundColor: "{colors.surface-strong}"
    textColor: "{colors.violet}"
  field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.s}"
    padding: "0.5rem 0.75rem"
    height: "3.1rem"
  field-hover:
    backgroundColor: "{colors.surface-strong}"
  verdict:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.full}"
    padding: "0 0.75rem"
    height: "2rem"
  verdict-refused:
    backgroundColor: "{colors.violet}"
    textColor: "{colors.on-violet-soft}"
---

# Design System: Adrien Lacourpaille

## Overview

**Creative North Star: "The Index"**

The site is an index of names. Each project is set as large as the name in the hero above it, and the list of them is the page: point at a name and a screenshot of that app, working, follows the pointer with a little lag and a lean; click it and the row unfolds in place to say what it is, what it proves and where to go next. Nothing is a card in a grid, and nothing is a dated row in a ledger. The reading order is the story: who this is, in one sentence; the names, each seen working; the packages underneath them, set as a single run of names; then an invitation to write.

The page is cool paper and ink with one violet. Violet marks whatever is pointed at, open or current, and nothing else, so the eye always knows where it is. Names and titles are tall condensed letters in mixed case; sentences are an open humanist sans. Things are separated by space and by soft surface blocks, never by ruled lines: a hairline survives only between the rows of a true table. Actions are pills. Pictures are the one thing that floats, on a rounded corner and a lifted shadow.

The frame never borrows a project's domain. A party game, a training app and a public-records site each enter the index as a name and a picture; the index around them does not change. Light and dark are the same roles, declared once as `light-dark()` pairs, and every motion has a still equivalent for readers who ask for reduced motion.

**Key Characteristics:**
- Project names set huge (up to 6rem), as large as the hero's name.
- A screenshot that trails the pointer over the names; on touch or narrow screens the names stand alone and the picture waits inside each project.
- Rows unfold in place rather than navigating away.
- One violet for pointed, open and current; everything else is paper, surfaces and three inks.
- Space and soft `surface` blocks separate; hairlines only in true tables.
- Pills for actions, rounded pictures on a lifted shadow.

## Colors

A cool, near-monochrome paper-and-ink palette with a single saturated violet; every colour is a `light-dark()` pair, and the night values (the `-night` keys) play the same roles.

### Primary
- **Pointer Violet** (violet / violet-night): the colour of attention. A pointed or open project name, a pointed package, the hovered ink pill, a hovered caps link or footer link, the current step of the path, the open-to-work dot and its pulse, list bullets, the stack separators, code keywords and the wavy squiggle, the focus ring (`--focus`), the caret and the text selection. Text set on it is **Violet Paper** (on-violet), which turns dark on the night violet; quieter text on it is **Pale Violet** (on-violet-soft), used by the refused verdict pill.

### Neutral
- **Cool Paper** (paper / paper-night): the page, and the inside of a pill or a code that sits on a surface (the line pill inside the contact invite, the verdict pill, inline code on the 404).
- **Soft Surface** (surface / surface-night): the separating block. Line pills, rails, the index's plus disc, picture backgrounds while they load, code specimens, address tiles, form fields, the contact invite, the current path step, the project scene, the CV desk.
- **Pressed Surface** (surface-strong / surface-strong-night): the hover state of anything set on a surface: line pill, address tile, field.
- **Screen White** (screen / screen-night): the inside of a drawn device screen in a project's scene, never a page surface.
- **Ink** (ink / ink-night): text, the ink pill, the open plus disc, the invalid field's edge.
- **Soft Ink** (ink-soft / ink-soft-night): secondary text: the role under the name, taglines, section intros, notes, nav links at rest, unselected rail slots.
- **Faded Ink** (ink-faded / ink-faded-night): the dimmed names when another one is pointed at, a package's scope, list commas. Never text that has to be read at body size: it sits at 3:1 on paper, so hints and notes take Soft Ink.
- **Table Grey** (rule / rule-night): the 1px line between rows of a true table (a project's history and its package list). Nowhere else.

### Named Rules
**The One Violet Rule.** Violet means pointed, open or current. It is never a section background, never a heading colour at rest, never decoration. If nothing on screen is pointed at, open or current, only the hero's emphasised words and the small marks (dots, bullets) carry it.

**The Dim the Rest Rule.** When a name in the index is pointed at, it turns violet and every other name and tagline fades to Faded Ink, so the pointed one is the only lit word on the page.

## Typography

**Display Font:** Sofia Sans Condensed (with Sofia Sans, system-ui), self-hosted, weights 300 to 900
**Body Font:** Sofia Sans (with system-ui, -apple-system, Segoe UI, Roboto), self-hosted, weights 300 to 800
**Label/Mono Font:** Sofia Sans Condensed for labels and figures; ui-monospace (Cascadia Code, Consolas) for code

**Character:** Tall condensed letters name things in mixed case, the way a book's index sets its entries; an open, calm sans carries every sentence. The condensed face does the shouting so the prose never has to.

### Hierarchy
- **Display** (800, 3rem to 6rem on the hero and about page, 6.5rem for the CV, the contact address fitted to its block (11.5cqi, from 2rem up to 10rem), line-height 0.88, -0.025em, mixed case, balanced wrap, top trimmed to the capitals): the page's title.
- **Index name** (800, 2.75rem to 6rem, 0.95, -0.025em): a project's name in the index; the neighbour links at the foot of a project page use the same voice at 2.5rem to 4.5rem.
- **Heading** (800, 1.75rem to 2.25rem, 1, -0.01em): a section's title. A path step's name takes it larger (up to 3.25rem).
- **Role** (condensed 500, 1.1875rem; 1.5rem to 2.5rem under the about page's name): the job line and kind line under a name, in Soft Ink.
- **Lead** (prose 500, 1.2rem to 1.5rem, 1.4, pretty wrap): the sentence after a title; held to about 40ch.
- **Body** (prose 400, 1.0625rem, 1.55): running text, held to 52 to 62ch.
- **Label large** (condensed 700, 1rem, 0.04em, mixed case): pill and link text.
- **Label** (condensed 700, 0.8125rem, 0.1em, uppercase): only for two-letter codes in a rail (EN, FR) and the CV's term labels.
- **Figures** (condensed, tabular and lining numerals): every date, version and key figure, so columns of them align; key figures set at 800, up to 2.75rem.

Fixed sizes come from one step scale: 0.75, 0.8125, 0.875, 0.9375, 1, 1.0625, 1.1875 and 2rem (`--text-4xs` to `--text-xl`, the body on `--text-m`; `--text-xl` is the floor of the contact address fitted to its box). Fluid sizes belong to display, index names, headings, role and lead, each a role token (`--text-display`, `--text-index`, `--text-heading`, `--text-lead`…) written with `sizes.fluid`: its minimum holds up to a 26rem phone, its maximum is reached where the old viewport-only size reached it, and the middle carries a rem part so zoom still enlarges it.

### Named Rules
**The Names Are Condensed Rule.** Anything that names (a person, a project, a package, a section, a step) is set in Sofia Sans Condensed, mixed case. Anything that explains is Sofia Sans. A sentence is never condensed, and a title is never uppercase.

**The Name Is the Picture's Peer Rule.** A project's name in the index is set at the hero's size. It is the thing you point at; it must be big enough to aim for.

## Layout

Every section sits on **the sheet**: one column inset from the window by a sheet gutter (1rem, 2rem from a 45rem window, 3rem from 75rem) inside an 84rem frame. The home page is a single column of sections with generous vertical air: the hero takes 3.2rem to 8rem above it, each later section 3rem to 6rem (`--space-chapter`) above and below.

Two-part sections (about in brief, the contact page's "elsewhere" and note form, the about page's evenings) put the heading in a narrow left column and the text in a wider right one (1 : 1.4) once there is room, and stack when the page is narrower than 48rem or 60rem. An unfolded project row splits 1 : 1.25 between its text and its screenshot, and stacks with the screenshot first below 48rem. A project page sets an excerpt beside its notes from 60rem (1.6 : 1). The about page's path steps lay out as date, name, story (10rem, 1fr, 1.3fr) from a 60rem page.

Each of these thresholds is a container query against the page (`body` is a container), not the window: a component lays out by the room it is given. Only the page shell answers the window: the header's two lines below 40rem, the footer's colophon from 900px, the sheet gutter, and the index's preview mode, which also needs a hovering pointer.

The index has two modes. Where a fine pointer can hover and the window is wider than 48rem, the names stand alone and the floating preview does the showing. Otherwise (`hover: none`, `pointer: coarse` or width at most 48rem) each row is a name over its tagline with the plus disc at its right, and rows are spaced 1.5rem apart. The header fits one line from 40rem; below it the brand shares the first line with the language rail, the page links take the second, and the theme rail moves to the footer.

Spacing comes from one rem scale (`--space-4xs` 2px to `--space-5xl` 112px), plus fluid role tokens: **chapter**, **section**, **masthead**, **columns**, **card**, **opening**, **lead**, **step** and **title**. Every control — a pill, a link, a rail slot, a field, an address tile — stands at least `--control-height` (the shared 2.75rem, never below the 44px touch target); a verdict badge is 2rem and a specimen's bar 3.25rem. Reading measures are 34, 36, 40 and 46rem (`--measure-lead`, `-text`, `-wide`, `-form`), and in characters 16 to 62ch, each a role (`--measure-sentence` 40ch for a lead, `--measure-intro` 52ch, `--measure-prose` 60ch, `--measure-summary` 62ch…); no component writes a raw `ch`.

### Named Rules
**The Space Separates Rule.** Two things are told apart by the space between them or by putting one on a Soft Surface. If you reach for a border to separate sections, add space instead.

## Elevation & Depth

The page is flat; pictures float. Depth comes from two places only: the Soft Surface tone, which sets a block slightly below the paper, and a lifted shadow under every picture (the index's preview, an unfolded screenshot, the about portrait, the CV sheet on its desk). The rail's sliding pawn carries a tiny contact shadow so it reads as a piece on the track, and an app's icon beside its name on the project page sits on a short soft shadow, like on a home screen. Nothing else casts a shadow: pills, tiles, fields and surface blocks are flat.

### Shadow Vocabulary
- **Lifted** (`box-shadow: 0 1px 2px light-dark(rgb(21 22 26 / 0.08), rgb(0 0 0 / 0.4)), 0 18px 40px -12px light-dark(rgb(21 22 26 / 0.28), rgb(0 0 0 / 0.7))`): under a picture, so it sits above the page.
- **Pawn** (`box-shadow: 0 1px 2px light-dark(rgb(0 0 0 / 0.12), rgb(0 0 0 / 0.5))`): under a rail's selected pawn only.
- **Icon** (`box-shadow: 0 2px 6px light-dark(rgb(21 22 26 / 0.18), rgb(0 0 0 / 0.5))`): under an app's icon, beside the project page's title only.

### Named Rules
**The Only Pictures Float Rule.** A shadow means "this is a picture of the work". Do not lift a pill, a card or a section.

## Shapes

Corners are soft and come in four sizes: 6px (`s`) on fields, inline code and the contact address's focus box; 14px (`m`) on every picture, code specimen and address tile; clamp(20px, 3vw, 32px) (`l`) on large surface blocks (the contact invite, the 404, the current path step, a project's scene, the sent note); and full rounding on pills, rails, the rail pawn, the plus disc and small marks. Dots are circles: the open-to-work dot (0.55rem), list bullets (0.4 to 0.45rem), the round hero portrait (3.5rem).

Strokes are rare. Icons are drawn at 1.75 with round caps and joins. A field has a 1px border that is transparent at rest and violet when focused; when invalid it becomes a 2px ink edge (border plus a 1px inset shadow), never red. Pictures clip to their corner; screenshots crop from the top (`object-position: top`).

## Components

### Buttons (pills)
Quiet, round-ended and confident: one solid pill per group, the rest softer.
- **Shape:** fully rounded (999px), 2.75rem tall, 1.1rem side padding, label-large lettering trimmed to its capitals so it centres optically; an optional icon sits before the label at 1.15em.
- **Ink:** Ink fill, Paper text; on hover it turns Pointer Violet. For the one action a group is for (play, see it live, send).
- **Line:** Soft Surface fill, Ink text, no border; on hover Pressed Surface. Beside the ink pill (source code, a second action). On a surface block it sits on Paper instead.
- **Caps:** label-large text with no frame; on hover it turns violet. A third, lighter action ("details", "the whole story").
- **Plain:** inherits the text around it, underlined at 1.5px.
- **Focus:** a 2px violet outline offset 3px, on every control.
- **Pressed:** every pressable answers the finger as the pointer would: a pill, a tile, a rail slot or the plus disc takes its hover look and sinks to 97% (98.5% for a wide tile); a word takes Pointer Violet, and a word already violet takes its underline. The browser's tap highlight is off.
- **Pending:** a form's submit goes to 75% opacity with a progress cursor and three square dots that blink in steps (static with reduced motion).

### Rails (segmented switches)
- **Style:** a Soft Surface pill with 3px padding holding label slots (language codes, theme icons), each 2rem tall and at least 2.25rem wide.
- **State:** unselected slots in Soft Ink, Ink on hover; the selected slot sits on a Paper pawn with the pawn shadow, which slides between slots over 280ms.

### Inputs / Fields
- **Style:** Soft Surface fill, a transparent 1px border, 6px corners, body text, 3.1rem minimum height (11rem for the message); hover lifts to Pressed Surface.
- **Focus:** the border turns violet; the caret is violet.
- **Error:** a 2px ink edge and a bold message with an icon beside the field, never colour alone.

### Navigation
- **Style:** the brand name in condensed 800 at 1.25rem (violet on hover), page links in prose 600 at Soft Ink, Ink on hover and for the current page (no underline, no bar), then the language and theme rails. The header has no rule under it.
- **Footer:** Soft Ink text at 0.9375rem, links in Ink 600 that turn violet on hover, the colophon pushed right from 900px.
- **Mobile:** two lines below 40rem, the theme rail moved to the footer.

### Soft blocks
- **Corner Style:** the large radius.
- **Background:** Soft Surface; pills inside them sit on Paper.
- **Shadow Strategy:** none.
- **Border:** none.
- **Internal Padding:** 2rem to 5rem (`--space-card`) for an invitation or the 404, 1.25rem to 2.5rem (`--space-step`) for a path step.
Used for the contact invitation at the foot of each page (a display title with a violet word, a note, a row of pills), the 404, the current step of the path, a project's scene and a sent note.

### Address tiles
Each other address (GitHub, LinkedIn, npm, the CV) is its own Soft Surface tile with 14px corners: a condensed label, the address, and an arrow icon. On hover the tile presses to Pressed Surface, the label and arrow turn violet, and the arrow nudges 2px up and right.

### Project Index (signature)
The home page's centre. Each project is a toggle button: its name at index size, its tagline in Soft Ink beside it on the baseline (36ch), and a 2.5rem Soft Surface plus disc at the far right.
- **Pointing:** the pointed name turns violet over 280ms (`--transition-base`) and every other name and tagline fades to Faded Ink.
- **Following preview:** a 16:10 screenshot, clamp(18rem, 26vw, 24rem) wide, 14px corners, lifted shadow, fixed over the page. It fades in from 90% scale (280ms opacity, 560ms scale), keeps 48px right of the pointer and 40px clear of the text, stays 16px inside the viewport, and closes 16% of the gap to the pointer each frame. It leans into its motion up to 8 degrees either way around a resting -2 degrees. Moving between names crossfades the image (280ms). Keyboard focus snaps the preview to the row instead of gliding.
- **Unfolding:** clicking opens the row in place: the panel grows from `0fr` to `1fr` over 560ms (`--transition-slow`), the plus disc fills with Ink and turns 45 degrees into a cross alongside it. Inside: the summary, key facts with violet dots, then an ink pill, a line pill and a caps link, beside a 16:10 screenshot on the lifted shadow. A folded panel leaves the accessibility tree and find-in-page once the fold has finished.
- **Touch and narrow screens:** no preview and no thumbnail; the unfolded screenshot comes before the text.
- **Reduced motion:** the preview jumps to place without lag or tilt; every duration is one of the three `--transition-*` tokens, which `reduced-motion.css` collapses, and it ends the looping pulse and blink too.

### Package shelf
One lead sentence, then every package name as a single wrapping run in condensed 700 (up to 2.25rem), the `@adrienlcp/` scope in Faded Ink 500, commas between names. Pointing a name turns it (scope included) violet and writes its job in the line below. On touch or narrow screens the run becomes a column with each job under its name.

### Open-to-work mark
A 0.55rem violet dot beside a bold "open to work" line, next to a round 3.5rem portrait in the hero. Without reduced motion it pulses a violet ring outward every 2.4s. The same dot appears on the about page, the contact page and the CV.

### Project page
A display title up to 6rem with the app's home-screen icon on its left (0.7 of the title's size, iOS 22.5% corners, the icon shadow, centred on the title, 0.9rem apart), the kind line, a lead, a summary, the stack as condensed words separated by violet middle dots, and the action pills; then the app's drawn screens on a large Soft Surface scene; key figures in tabular 800 numerals; sections with a heading and violet-dotted lists; code excerpts on 14px Soft Surface specimens with a title bar and a verdict pill (Paper, or violet when the excerpt is the refused version), keywords in violet and errors under a violet wavy squiggle; a history and a package list as true tables with 1px Table Grey lines between rows (dates in tabular figures, a "first" mark as a small violet-on-surface pill); and the previous and next projects as two huge names whose arrows nudge 0.25rem outward on hover.

### CV sheet
On phones the CV reflows on Paper. From a 60rem page, and in print, it becomes an A4 sheet (210mm, 240mm from 80rem) with 14px corners and the lifted shadow on a Soft Surface desk; its type is set in em so one size scales the whole sheet. Print drops the site chrome, the shadow and the corners, and forces light inks on white.

## Do's and Don'ts

### Do:
- **Do** use violet only for what is pointed at, open or current, plus the small marks (dots, bullets, the hero's emphasised words).
- **Do** set every name and title in Sofia Sans Condensed, mixed case; every sentence in Sofia Sans.
- **Do** separate with space or a Soft Surface block; draw a 1px Table Grey line only between the rows of a true table.
- **Do** make every action a pill (ink for the main one, line beside it, caps for the lightest) at the 2.75rem touch height.
- **Do** give every picture 14px corners and the lifted shadow, and show real screenshots of the apps working.
- **Do** declare every colour as a `light-dark()` pair and check both themes.
- **Do** give every motion a still equivalent under `prefers-reduced-motion`, and replace pointer-only behaviour with something visible on touch (the plus disc, jobs under names).
- **Do** pick margins from `--space-*`, fixed text sizes from `--text-*`, radii from `--radius-*`.

### Don't:
- **Don't** bring back rubber stamps, ink-bleed filters or tilted labels; the only tilt is the following preview's lean.
- **Don't** draw heavy rules, ruled headers, ruled sections or hairlines between list items outside a true table.
- **Don't** set display titles or names in uppercase.
- **Don't** use register vocabulary in copy or names: no "register" / "registre", "entry" / "entrée", "shipped" / "livré".
- **Don't** lay projects out as a card grid, or as dated rows; the index is names.
- **Don't** lift anything that is not a picture.
- **Don't** let a project's subject restyle the frame: a game does not make the index playful, a sport app does not make it athletic.
