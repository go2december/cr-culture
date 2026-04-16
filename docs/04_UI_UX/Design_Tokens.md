# 🎨 UI/UX Design Tokens
 
 ## Theme: Modern Lanna
 
 ## Runtime Source of Truth
 - Theme implementation file: `src/app/globals.css`
 - CSS engine: Tailwind CSS v4
 - UI plugin: daisyUI
 - Configured daisyUI theme mode: `light`
 
 ## Core Brand Palette
 
 ### Primary
 - `--color-primary`: `#1B2A49`
 - `--color-primary-light`: `#2A406B`
 - `--color-primary-dark`: `#0D1629`
 
 Usage:
 - Main brand color
 - Primary actions
 - Major headings and high-emphasis navigation states
 
 ### Secondary
 - `--color-secondary`: `#D4AF37`
 - `--color-secondary-light`: `#E8CA6B`
 - `--color-secondary-dark`: `#A38526`
 
 Usage:
 - Decorative emphasis
 - Section accents
 - Hover surfaces using low-opacity gold backgrounds
 
 ### Accent
 - `--color-accent`: `#C83228`
 - `--color-accent-light`: `#ED5045`
 - `--color-accent-dark`: `#911D15`
 
 Usage:
 - Alerting emphasis
 - Secondary call-to-action buttons
 - Small brand detail such as supporting labels
 
 ## Neutral / Surface Tokens
 - `--color-base-100`: `#FAFAFA`
 - `--color-base-200`: `#F4F4F5`
 - `--color-base-300`: `#E4E4E7`
 - `--color-base-content`: `#1B2A49`
 
 Usage:
 - `base-100`: page background
 - `base-200`: soft borders, subtle surfaces
 - `base-300`: stronger separators if needed
 - `base-content`: primary body text color
 
 ## DaisyUI Root Overrides
 The project overrides DaisyUI-related root tokens in `:root`:
 
 - `--color-primary: #1B2A49`
 - `--color-primary-content: #ffffff`
 - `--color-secondary: #D4AF37`
 - `--color-secondary-content: #ffffff`
 - `--color-accent: #C83228`
 - `--color-accent-content: #ffffff`
 - `--color-base-100: #FAFAFA`
 - `--color-base-200: #F4F4F5`
 - `--color-base-300: #E4E4E7`
 - `--color-base-content: #1B2A49`
 - `--radius-box: 1rem`
 - `--radius-btn: 0.5rem`
 
 ## Typography Tokens
 - `--font-sans`: `var(--font-sans), 'Noto Sans Thai', system-ui, sans-serif`
 - `--font-display`: `var(--font-display), var(--font-noto-serif), serif`
 
 Typography rules from implementation:
 - `html` uses `var(--font-sans)`
 - `h1` to `h6` use `var(--font-display)`
 - Heading weight is `700`
 - Heading letter spacing is `0.02em`
 - `body` uses `font-weight: 300`
 - `body` line-height is `1.8`
 
 Usage guidance:
 - Use display font for hero headings, section titles, and ceremonial/Lanna mood
 - Use sans font for paragraph text, navigation, metadata, and admin-like UI
 
 ## Radius Tokens
 - `--radius-lanna`: `0.5rem`
 - `--radius-card`: `1rem`
 - `--radius-box`: `1rem`
 - `--radius-btn`: `0.5rem`
 
 Usage guidance:
 - Buttons should prefer the smaller radius family
 - Cards and floating panels should prefer `radius-card`
 
 ## Layout and Base Behavior
 - `scroll-behavior: smooth`
 - `scroll-padding-top: 5rem`
 - `body` background uses `base-100`
 - `body` text color uses `base-content`
 
 ## Custom Pattern Utilities
 
 ### `.mask-kanok`
 Purpose:
 - Decorative abstract Lanna pattern using SVG masking
 - Use for subtle ornamental overlays, not dense content areas
 
 ### `.mask-woven`
 Purpose:
 - Textile-inspired masking pattern
 - Use for craft/culture themed decorative regions
 
 ### `.bg-lanna-pattern`
 Purpose:
 - Adds a soft patterned overlay via `::before`
 - Base overlay color is `var(--color-primary)` with low opacity
 
 Usage guidance:
 - Apply on section wrappers with enough contrast
 - Avoid pairing with dense text unless opacity stays subtle
 
 ## Component-Level Utility Classes
 
 ### `.section-header`
 Used for major section headings.
 
 Implementation details:
 - Font size: `2.25rem`
 - Tablet and up: `3rem`
 - Font weight: `700`
 - Text align: `center`
 - Color: `var(--color-primary)`
 - Font family: `var(--font-display)`
 - Decorative underline: `var(--color-secondary)`
 
 ### `.card-district`, `.card-heritage`, `.card-modern`
 Shared card surface pattern.
 
 Implementation details:
 - Background: white
 - Border: `1px solid var(--color-base-200)`
 - Radius: `var(--radius-card)`
 - Default shadow: soft navy-tinted shadow
 - Hover behavior:
   - translateY `-4px`
   - border shifts toward `secondary-light`
   - stronger shadow
 
 Usage guidance:
 - Prefer for public-facing content cards
 - Keep imagery and excerpts consistent inside these shells
 
 ### `.nav-lanna`
 Navigation shell styling.
 
 Implementation details:
 - White translucent background
 - Backdrop blur
 - Sticky positioning
 - Bottom border using `base-200`
 
 ### `.btn-lanna`
 Primary button tokenized class.
 
 Implementation details:
 - Background: `primary`
 - Text: white
 - Radius: `radius-lanna`
 - Shadow: primary-tinted
 - Hover:
   - uses `primary-dark`
   - translateY `-2px`
 
 ### `.btn-accent-lanna`
 Accent call-to-action button.
 
 Implementation details:
 - Background: `accent`
 - Text: white
 - Radius: `radius-lanna`
 - Hover uses `accent-dark`
 
 ### `.timeline-lanna`
 Used for timeline presentation.
 
 Implementation details:
 - `.timeline-start` uses display font, primary color, bold treatment
 - `.timeline-middle svg` uses secondary color
 
 ## Motion Tokens
 
 ### `.animate-fade-in-up`
 - Duration: `0.8s`
 - Easing: `cubic-bezier(0.16, 1, 0.3, 1)`
 - Initial state: `opacity: 0`, `translateY(20px)`
 
 Delay helpers:
 - `.delay-100`
 - `.delay-200`
 - `.delay-300`
 - `.delay-400`
 
 ### `.animate-fade-in`
 - Duration: `1s`
 - Easing: `ease-out`
 
 Usage guidance:
 - Use for staged entrance on hero or section content
 - Avoid applying to long lists with many items unless performance is acceptable
 
 ## Semantic Usage in Components
 Observed usage in components such as `Navbar.tsx` and share actions:
 
 - `text-primary`: main brand emphasis
 - `hover:text-primary`: interactive hover state
 - `text-accent`: small supporting highlight
 - `text-base-content/70` and `/80`: default nav/body subdued text
 - `border-base-200`: soft border standard
 - `hover:bg-secondary/5` or `/10`: gentle gold-tinted hover surface
 - `group-hover:text-secondary-dark`: premium emphasis on logo/title hover
 
 Recommended pattern:
 - Use `primary` for structure and brand authority
 - Use `secondary` for elegance and ornament
 - Use `accent` sparingly for urgency or culturally vivid emphasis
 
 ## UI Framework & Guidelines
 - Component library: daisyUI 5 with Tailwind CSS v4
 - Theme mode in plugin config is currently `light`
 - Tailwind utility classes and custom CSS classes are used together
 - Prefer semantic classes and shared custom classes over ad hoc inline color values
 
 ## Implementation Rules
 - New UI should use existing token names before introducing new colors
 - Prefer `base-*` tokens for surfaces and text hierarchy
 - Reuse `.section-header`, card classes, and Lanna button classes for consistency
 - If a new reusable visual pattern appears in 2 or more places, promote it into `globals.css`
 - Avoid mixing unrelated bright colors that conflict with the primary/secondary/accent system
 
 ## Gaps / Future Expansion
 The current implementation does not yet define:
 - a formal spacing scale document
 - a shadow token naming system
 - component state matrices for all shared components
 - dark mode tokens
 
 If these are introduced in code, this file should be updated to match.
