---
name: Adrien Lacourpaille
description: A developer portfolio printed as a board-game box and its rule booklet.
colors:
  petrol: "oklch(40.18% 0.0630 202.63)"
  petrol-night: "oklch(43.03% 0.0625 201.17)"
  tomato: "oklch(65.86% 0.1559 35.67)"
  tomato-night: "oklch(69.61% 0.1448 36.52)"
  marigold: "oklch(77.71% 0.1420 76.82)"
  marigold-night: "oklch(80.86% 0.1388 79.19)"
  brick: "oklch(54.67% 0.1523 34.72)"
  coral-night: "oklch(78.37% 0.1295 38.34)"
  mint-paper: "oklch(95.73% 0.0058 153.77)"
  night-paper: "oklch(19.78% 0.0171 195.85)"
  print-ink: "oklch(23.34% 0.0209 185.33)"
  night-ink: "oklch(93.62% 0.0094 171.79)"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "min(6rem, 10cqi)"
    fontWeight: 900
    lineHeight: 0.88
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.2rem + 4vw, 4.5rem)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 118"
  lead:
    fontFamily: "Literata, Georgia, serif"
    fontSize: "clamp(1.125rem, 1rem + 0.6vw, 1.5rem)"
    fontWeight: 500
    lineHeight: 1.35
  body:
    fontFamily: "Literata, Georgia, serif"
    fontSize: "clamp(1rem, 0.96rem + 0.2vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1rem, 0.96rem + 0.2vw, 1.125rem)"
    fontWeight: 800
    lineHeight: 1.2
    fontVariation: "'wdth' 100"
rounded:
  s: "4px"
  full: "999px"
spacing:
  xs: "8px"
  s: "12px"
  m: "20px"
  l: "32px"
  xl: "48px"
  2xl: "72px"
  3xl: "112px"
  gutter: "clamp(16px, 4vw, 48px)"
components:
  token:
    backgroundColor: "{colors.mint-paper}"
    textColor: "{colors.print-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "0 20px 0 12px"
    height: "44px"
  lid:
    backgroundColor: "{colors.petrol}"
    textColor: "{colors.mint-paper}"
    padding: "20px {spacing.gutter} 48px"
  lid-band:
    backgroundColor: "{colors.tomato}"
    textColor: "{colors.print-ink}"
    typography: "{typography.lead}"
    padding: "20px {spacing.gutter} 32px"
---

# Design System: Adrien Lacourpaille

## Overview

**Creative North Star: "The Game Box and Its Rule Booklet"**

Every piece of work is presented as a published board game. The lid sells it, the contents list proves it, the rule booklet explains it. The site is printed, not rendered: four-colour box printing in petrol and tomato, marigold for the pieces that matter, mint-grey paper underneath. Flat fields own whole regions of the screen, edge to edge, and meet at a hard ink rule. Links are die-cut cardboard tokens that lift off the table when a real pointer reaches them.

Two voices carry the type. Archivo, stretched wide and set black, is the lettering printed on the box. Literata is the booklet: anything read as a sentence. The voice is warm and a little playful, but the play lives in the objects (a token that tilts, a pip that lights up), never in decoration laid over them.

The world refuses the dark developer portfolio made of a name, a tagline and a grid of cards. It also refuses gradients: a printed box has no airbrush.

**Key Characteristics:**
- Flat colour fields that fill whole regions, full-bleed, with no gradient and no texture overlay.
- Wide, black, uppercase display lettering sized to its container, not to the viewport.
- Die-cut pill tokens with an ink edge and a coloured pip as the only link and button shape.
- A 3px print-ink rule where two fields meet.
- Light and dark themes resolved in CSS; printed pieces keep their own inks in both.

## Colors

A four-ink box print: one dominant cool field, one warm secondary field, one gold accent, on a faintly green paper. Every colour is a `light-dark()` pair; the night value sits beside the day value.

### Primary
- **Box Petrol** (`petrol`, night `petrol-night`): the dominant field. Paints the lid, the whole first viewport of the home page, and the broken box of the error screen. It is also the scrollbar thumb and the browser's theme colour. On-field text is paper (7.9:1 by day, 6.5:1 by night).

### Secondary
- **Tomato Print** (`tomato`, night `tomato-night`): the secondary field. Paints the band under the lid and the whole missing-piece field of the not-found page. Text on it is always print ink (5.0:1 by day, 5.8:1 by night), never paper.

### Tertiary
- **Marigold Token** (`marigold`, night `marigold-night`): the accent. The name on the lid, the error title, text selection, and the focus ring on petrol. It reaches only 4.3:1 on petrol, so it is reserved for display type and tokens there, never for small text.
- **Brick** (`brick`, night `coral-night`): the active colour. The caret, the lit pip of a hovered or current token, and the focus ring on paper (4.7:1 by day, 8.8:1 by night).

### Neutral
- **Mint-Grey Paper** (`mint-paper`, night `night-paper`): the page background and the table every field is laid on.
- **Print Ink** (`print-ink`, night `night-ink`): body text on paper (14.7:1 by day, 15.1:1 by night). Its day value is also the fixed ink of every printed piece.
- **Soft ink**: ink mixed 78% into paper, for secondary text on paper.

### Named Rules
**The Flat Field Rule.** A region is one colour, edge to edge. No gradients, no tints fading into each other, no noise over a field.

**The Printed Piece Rule.** A token, a sticker, anything that is cardboard lying on the table keeps its print inks (print ink on print paper) in both themes. Only the paper, the ink and the fields change with the theme.

**The Night Lift Rule.** At night the fields lift slightly (petrol and tomato gain a few points of lightness) so they still read as printed colour against the near-black paper instead of sinking into it.

## Typography

**Display Font:** Archivo (with system-ui, Segoe UI, Roboto, sans-serif)
**Body Font:** Literata (with Georgia, Times New Roman, serif)
**Label Font:** Archivo at its normal width

**Character:** a wide, heavy grotesque printed on the lid against a bookish serif with a warm italic. Both are self-hosted variable files under the SIL Open Font License, split into latin and latin-ext subsets by `unicode-range`, with the latin Archivo and the latin Literata italic preloaded.

### Hierarchy
- **Display** (900, width 125%, `min(6rem, 10cqi)`, line-height 0.88, uppercase): the name on the lid. Sized against its container so the longest word fits the narrowest lid, 320px included; capped at 12ch.
- **Headline** (900, width 118%, `clamp(2rem, 1.2rem + 4vw, 4.5rem)`, line-height 1): the one sentence a field carries on the not-found and error pages; capped at 16 to 18ch, long paths break anywhere.
- **Lead** (Literata italic 500, `clamp(1.125rem, 1rem + 0.6vw, 1.5rem)`, line-height 1.35): the line printed on the band under the lid.
- **Body** (Literata 400, `clamp(1rem, 0.96rem + 0.2vw, 1.125rem)`, line-height 1.6): all running text; measure capped at 65ch.
- **Label** (Archivo 800, width 100%, body size, line-height 1.2): the text of a token.

### Named Rules
**The Two Voices Rule.** Archivo is what the box prints and what a hand presses; Literata is what a person reads as a sentence. A sentence is never set in Archivo below headline size, and a control is never set in Literata.

**The Wide Only On The Lid Rule.** The 125% width is for the lid lettering. Headlines step down to 118%; labels stay at 100%.

## Layout

One column, mobile first. Every page fills the viewport height (`100dvh`) and stacks full-bleed fields: a tall field that grows to take the remaining height, then a short band or footer strip under it. Content inside a field is pushed to its bottom edge, so the lettering sits on the lid's lower third and the empty field above is part of the composition.

Horizontal padding is a single gutter (`clamp(16px, 4vw, 48px)`) on every field. Vertical rhythm uses the spacing scale: tall fields open with 112px above their content, bands take 20 to 32px, and from 900px wide the lid and its band gain one step of padding each. The only breakpoint is 900px; everything else scales fluidly with `clamp()` and container units. The page never scrolls horizontally.

## Elevation & Depth

The system is flat. Fields have no shadow and no layering; they are printed side by side and separated by a 3px ink rule. Depth belongs only to physical pieces lying on the print: a token casts one short soft shadow, and its edge is drawn with two inset rings (a paper-coloured bevel and a faint ink line) that read as a die-cut cardboard rim.

### Shadow Vocabulary
- **Token rest** (`box-shadow: inset 0 0 0 2px var(--token), inset 0 0 0 3.5px color-mix(in oklab, var(--print-ink) 35%, transparent), 0 3px 7px var(--shadow)`): every token. The shadow colour is print ink at 30% by day and black at 62% by night.

### Named Rules
**The Only Pieces Cast Shadows Rule.** A field never casts a shadow. Only a movable piece does, and only a short, soft one.

## Shapes

Two shapes. Fields are hard-edged rectangles running to the viewport edges, with no rounding. Pieces are full pills (999px radius) with a 2px print-ink border. A small inline chip (4px radius) is used only for a monospace error detail on the error screen. Where two fields meet, a 3px ink rule marks the fold.

## Components

### Token
The single link and button shape: a die-cut cardboard disc stretched into a pill, lying on whatever field it sits on.
- **Shape:** full pill (999px), 2px print-ink border, 44px minimum height, 12px left and 20px right padding, 8px gap to its pip.
- **Colour:** print paper (lightened toward white by day) with print ink text, identical on every field and in both themes.
- **Pip:** a 12px ink disc before the label. It turns brick when the token marks the current page or is hovered.
- **Hover:** only under a real pointer (`hover: hover` and `pointer: fine`): the token lifts 3px and tilts 1.5 degrees, over 280ms on `cubic-bezier(0.16, 1, 0.3, 1)`. Pressed, it sinks 1px.
- **Focus:** a 3px outline offset by 3px, drawn only on keyboard focus, in the focus colour of the field underneath.
- **Reduced motion:** all transition durations drop to zero.

### Fields
- **Lid (dominant field):** petrol, paper text, marigold display lettering, focus ring in marigold.
- **Band / missing piece (secondary field):** tomato, print-ink text, focus ring in print ink, a 3px ink rule on the edge it shares with the next field.

### Navigation
There is no navigation bar yet. The locale switch is a token in the lid's top-right corner, naming the other language in that language.

### Browser Surfaces
Text selection is marigold with print ink; the caret is brick; the scrollbar is a petrol thumb on paper; link underlines are 2px thick, offset 0.22em.

## Do's and Don'ts

### Do:
- **Do** fill a region with one flat field from edge to edge, and mark the meeting of two fields with a 3px print-ink rule.
- **Do** use a token for every link and button, with its pip, its ink edge and its short soft shadow.
- **Do** switch the focus colour with the field: marigold on petrol, print ink on tomato, brick on paper.
- **Do** keep marigold on petrol to display type and tokens (4.3:1); small text on petrol is paper.
- **Do** put print ink, not paper, on tomato.
- **Do** size lid lettering against its container so the full name fits at 320px.
- **Do** gate every hover effect behind `(hover: hover) and (pointer: fine)`.

### Don't:
- **Don't** use gradients, glass or blur on any surface.
- **Don't** set a shadow on a field; only pieces cast one.
- **Don't** repaint a printed piece for the dark theme.
- **Don't** set a sentence in Archivo below headline size, or a control label in Literata.
- **Don't** put a small label above a heading; the heading carries itself.
- **Don't** replace a token with a plain rectangle button.
