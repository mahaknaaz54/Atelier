# Design System Strategy: The Chromatic Architect

## 1. Overview & Creative North Star
**The Creative North Star: "Digital Tonalism"**
This design system moves away from the rigid, boxed-in layouts of traditional SaaS and into the realm of high-end architectural editorial. Because the platform focuses on 3D interior color visualization, the UI must act as a sophisticated gallery—quiet enough to let the interior renders shine, yet sharp enough to signal cutting-edge technology.

We achieve an "edgy yet professional" feel through **intentional asymmetry** and **tonal depth**. Instead of standard grids, we use overlapping "plates" of color and massive typographic scales to create a sense of structural confidence. The aesthetic is "Dark Mode by Default," using the deep charcoal base to make the electric coral accents feel like light sources rather than just buttons.

---

## 2. Colors & Surface Philosophy
The palette is a sophisticated mix of industrial neutrals and high-energy accents.

*   **Primary (Electric Coral - `#FFB4AA`):** Used sparingly as a "laser-light" focus. It represents the "active" state of a color choice.
*   **Secondary (Muted Lavender - `#D8BAFA`):** Provides a soft, tech-forward counterpoint to the coral, used for secondary interactions and subtle highlights.
*   **Tertiary (Warm Beige - `#D7C3B0`):** Softens the industrial charcoal, used for text or backgrounds that need to feel "livable" and organic, mimicking natural interior materials.

### The "No-Line" Rule
**Standard 1px borders are strictly prohibited for sectioning.** To define a new area, use a background shift. 
*   Place a `surface_container_low` section directly against a `surface` background. 
*   The transition should be felt, not seen as a line. This creates a "seamless floorplan" feel rather than a "table of contents" feel.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers stacked in 3D space:
1.  **Base Layer:** `surface` (#131313) — The deep charcoal foundation.
2.  **Raised Plate:** `surface_container_low` (#1C1B1B) — Large content areas.
3.  **Interactive Layer:** `surface_container_high` (#2A2A2A) — Cards and interactive modules.
4.  **Floating Glass:** Use `surface_variant` at 40% opacity with a 20px `backdrop-filter: blur()`. This is reserved for navigation bars and floating tool palettes.

---

## 3. Typography: Space Grotesk & Manrope
We pair the futuristic, geometric "Space Grotesk" for headers with the highly legible, premium "Manrope" for utility.

*   **Display (Space Grotesk):** Set with tight letter-spacing (-2%). Use `display-lg` (3.5rem) for hero statements. These should often be intentionally offset to the left or right to break the symmetry.
*   **Headlines (Space Grotesk):** Use `headline-lg` (2rem) for section titles. These are the "architectural pillars" of the page.
*   **Body (Manrope):** Use `body-lg` (1rem) for descriptions. Manrope’s neutrality balances the "edgy" nature of Space Grotesk, ensuring professional readability.
*   **Labels (Space Grotesk):** Use `label-md` (0.75rem) in All Caps with +5% letter-spacing for small metadata or "Overlines" to provide a technical, "blueprint" aesthetic.

---

## 4. Elevation & Depth
In this system, depth is a gradient of light, not a drop shadow.

*   **The Layering Principle:** Avoid `box-shadow` on static elements. Instead, use the `surface_container` tokens. An "inner" card should be `surface_container_highest` sitting on a `surface_container_low` section.
*   **Ambient Shadows:** For floating elements (Modals, Dropdowns), use a "Coral Glow" shadow: `box-shadow: 0 20px 40px rgba(255, 180, 170, 0.08)`. The shadow is tinted with the primary color to simulate light bouncing off a colored surface.
*   **Ghost Borders:** If an edge needs definition (e.g., an input field), use `outline_variant` at 15% opacity. This creates a "whisper" of an edge that disappears into the background.

---

## 5. Components

### Buttons
*   **Primary:** Solid `primary_container` (#FF5447) with `on_primary` (#690003) text. 8px corner radius. No shadow.
*   **Secondary:** Glassmorphic. Background: `secondary_container` at 20% opacity. Border: 1px "Ghost Border" of `secondary`.
*   **States:** On hover, the Primary button should "glow"—increase the `primary_fixed` brightness and add a 15px blurred shadow of the same color.

### The "Color Swatch" Card
Unique to this platform, swatches should not have borders. Use a large `8px` corner radius. When selected, instead of a border, use a "Pulse" effect where the card grows by 2% and a subtle `surface_bright` halo appears behind it.

### Input Fields
*   Background: `surface_container_lowest`.
*   Border: None, except for a 2px bottom-bar in `outline_variant`.
*   Active State: The bottom-bar transforms into the `primary` (Electric Coral) color.

### Cards & Lists
**Forbidden:** Dividers or horizontal rules. 
**Required:** Use the Spacing Scale `8` (2.75rem) to separate list items. Content is grouped by proximity, not by lines.

---

## 6. Do’s and Don’ts

### Do:
*   **Use Oversized Typography:** Let a single word in Space Grotesk act as a background element (low opacity) to create an edgy, editorial look.
*   **Embrace Negative Space:** Use spacing `16` or `20` between major sections to let the design breathe.
*   **Layer Glass:** Use the glassmorphism effect for the 3D viewport controls to keep the UI feeling lightweight and "floating" over the room render.

### Don't:
*   **Don't use pure black (#000):** It kills the depth. Stick to the `surface` charcoal.
*   **Don't use 100% opaque borders:** They create "visual noise" that distracts from the 3D interiors.
*   **Don't center-align everything:** High-end design often uses "The Rule of Thirds." Align your text to the left but place your primary CTA in an unexpected, asymmetric position to create visual tension.