# Design Brief

## Vision
Cinematic video platform with editorial sophistication — deep, atmospheric dark interface for immersive browsing and premium viewing experience.

## Tone & Aesthetic
Cinematic + editorial. High-end streaming platform sensibility (Criterion Collection aesthetic). Dark, moody, premium tech.

## Color Palette

| Token           | Light               | Dark                | Purpose                    |
| --------------- | ------------------- | ------------------- | -------------------------- |
| Background      | `0.95 0 0`          | `0.12 0 0`          | Page base                  |
| Foreground      | `0.12 0 0`          | `0.92 0 0`          | Text                       |
| Card            | `0.98 0 0`          | `0.16 0 0`          | Elevated surfaces          |
| Primary         | `0.72 0.18 58°`     | `0.78 0.20 58°`     | Warm gold accent           |
| Accent          | `0.72 0.18 58°`     | `0.78 0.20 58°`     | Highlights, active states  |
| Destructive     | `0.58 0.25 25°`     | `0.62 0.25 25°`     | Delete, danger             |
| Border          | `0.85 0 0`          | `0.26 0 0`          | Subtle dividers            |
| Muted           | `0.88 0 0`          | `0.22 0 0`          | Secondary text, disabled   |

## Typography

| Role      | Font              | Scale | Weight     | Use Case           |
| --------- | ----------------- | ----- | ---------- | ------------------ |
| Display   | Instrument Serif  | 2xl   | Regular    | Video titles, hero |
| Body      | General Sans      | base  | Regular    | UI text, metadata  |
| Mono      | Geist Mono        | sm    | Regular    | Timestamps, codes  |

## Structural Zones

| Zone        | Background        | Border               | Elevation | Purpose                     |
| ----------- | ----------------- | -------------------- | --------- | --------------------------- |
| Header      | Card with border  | `border-b`           | Elevated  | Navigation, search          |
| Hero        | Gradient overlay  | None                 | Base      | Featured video, CTA         |
| Grid        | Background        | None                 | Base      | Video cards in 3–4 col grid |
| Cards       | Card elevated     | None                 | Lifted    | Individual videos           |
| Sidebar     | Card              | `border-r`           | Elevated  | Admin nav, category list    |
| Footer      | Muted background  | `border-t`           | Base      | Links, copyright            |

## Spacing & Rhythm
Mobile-first: 16px base. Gaps: 8px (tight), 16px (normal), 24px (loose), 32px (section break). Cards: 20px padding. Header: 16px vertical. Stack sections with 32px vertical rhythm.

## Component Patterns
- **Video Cards**: `rounded-sm` (sharp), overlay gradient, title serif-display at bottom, hover lift effect
- **Buttons**: Primary gold accent with dark text, secondary with subtle border, destructive red
- **Forms**: Minimal labels, muted borders, focus ring gold
- **Navigation**: Horizontal tabs or sidebar toggle, active gold underline
- **Modal**: Dark overlay, card-elevated background, serif heading

## Motion
- **Entrance**: `fade-in 0.5s` on page load, `slide-up 0.4s` on cards
- **Interaction**: `transition-smooth` (0.3s cubic-bezier) on hover/focus
- **Hover**: Cards lift 4px with `shadow-cinematic`
- **State change**: Gold accent pulse on active/selected

## Differentiation
**Atmospheric depth**: Video cards use semi-transparent overlays mimicking film posters. Hero sections feature gradient overlays that fade upward. Sharp typography hierarchy via serif/sans pairing. Warm gold accents reserved for CTAs and active states — never scattered.

## Admin Interface (`/momoazz`)
Utility-focused, minimal decoration. Same palette, simpler structure. Form-heavy, table-based layout. Serif titles for section breaks, mono fonts for URLs and IDs.

## Constraints
- Avoid random shadows — use defined scale (card, elevated, cinematic)
- Gold accent used sparingly — active states, CTAs, hover feedback only
- No blur effects on background — maintain clarity
- Sharp corners (`rounded-sm`) reinforce cinematic aesthetic
- Typography hierarchy enforced strictly — serif for drama, sans for clarity
