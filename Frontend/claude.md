# HVAC Landing Project Developer Reference (`claude.md`)

This reference documents the structure, components, styles, and development patterns of the Chicagoland HVAC Web App ("AAA Heating & Air Conditioning"). It is designed to help AI coding assistants and developers understand the codebase and maintain alignment with design principles.

---

## 🛠️ Technology Stack & Dependencies

- **Core Framework**: React 19.x
- **Build Tool / Bundler**: Vite 8.x
- **Routing**: React Router DOM 7.x
- **Icons**: Lucide React
- **Package Manager**: pnpm (v10.x)
- **Styling**: Mix of inline JS styles (for layout elements & tokens) and component `<style>` elements / global `index.css` for responsive overrides/animations.

---

## 📁 Project Structure

```
HVAC_Websites/
├── package.json          # Dependencies & npm scripts
├── vite.config.js        # Vite compilation settings
├── index.html            # Core HTML document layout
├── public/               # Static assets served as-is
├── src/
│   ├── main.jsx          # App entry point
│   ├── App.jsx           # Main routing & Homepage layout
│   ├── App.css           # Additional App styles
│   ├── index.css         # Base document, fonts, colors, and typography variables
│   ├── assets/           # Media assets (e.g. logo.webp)
│   ├── components/       # Shared structural elements
│   │   ├── SiteChrome.jsx # PageShell, Navbar, Footer, PageHero, CTASection
│   │   └── siteData.js   # Image URLs and pageStyles design system token dictionary
│   └── pages/            # Individual routing views
│       ├── Services.jsx
│       ├── About.jsx
│       ├── ServiceAreas.jsx
│       ├── Reviews.jsx
│       ├── Gallery.jsx
│       ├── Contact.jsx
│       ├── SignIn.jsx
│       ├── SignUp.jsx
│       └── Dashboard.jsx
```

---

## 🛣️ Routing Architecture

All routes are declared using `<BrowserRouter>` inside [App.jsx](file:///d:/Hvac_main/HVAC_Websites/src/App.jsx):

| Route Path | Component | Description |
| :--- | :--- | :--- |
| `/` | `HomePage` | Splash hero page featuring marquees and primary value props |
| `/services` | `Services` | Full listing of heating, cooling, and air quality offerings |
| `/about` | `About` | Company background, certifications, team overview |
| `/service-areas` | `ServiceAreas` | Interactive display of areas served throughout Chicagoland |
| `/reviews` | `Reviews` | Customer testimonials, star ratings, and review form submissions |
| `/gallery` | `Gallery` | Showcase of completed projects and job site photographs |
| `/contact` | `Contact` | Service request, estimate scheduler, and inquiry forms |
| `/signin` | `SignIn` | Client portal login interface |
| `/signup` | `SignUp` | Client registration flow |
| `/dashboard` | `Dashboard` | User profile, scheduled service tickets, and service history |

---

## 🎨 Design System & Styling Conventions

Rather than external utility classes (like Tailwind), the application leverages standard design tokens defined in [siteData.js](file:///d:/Hvac_main/HVAC_Websites/src/components/siteData.js):

### Core Typography & Fonts
- **Primary / Accent Font**: `'TT Norms Pro', sans-serif` (Premium layout, headers)
- **Body Font**: `'Inter', ui-sans-serif, system-ui, sans-serif`
- **Monospace Font**: `ui-monospace, Consolas, monospace`

### Color Palette (from `index.css`)
- **Light Theme**:
  - Main Background (`--bg`): `#ffffff` / `#F5F5F5` (off-white section dividers)
  - Primary Text (`--text`): `#6b6375`
  - Headers / Titles (`--text-h`): `#08060d`
  - Border Accents (`--border`): `#e5e4e7`
  - Highlighting (`--accent`): `#aa3bff`
- **Dark Theme (Dynamic media query enabled)**:
  - Background (`--bg`): `#16171d`
  - Primary Text (`--text`): `#9ca3af`
  - Headers (`--text-h`): `#f3f4f6`

### Global Components Reference
Imported from [SiteChrome.jsx](file:///d:/Hvac_main/HVAC_Websites/src/components/SiteChrome.jsx):

- **`<PageShell>`**: High-level page wrapper that auto-injects `<Navbar />` and `<Footer />` alongside global responsive layouts.
- **`<PageHero title="..." subtitle="..." image="..." />`**: Reusable banner style layout with automated linear gradients and responsive titles.
- **`<CTASection title="..." subtitle="..." buttonText="..." />`**: Large premium bottom-of-page layout directing users to the scheduling flow.
- **`<ButtonLink href="..." compact={true/false}>`**: Standardized black/white capsule button with interactive arrow micro-animations.

---

## 🔧 Workflow & Useful CLI Commands

Ensure you are inside the `HVAC_Websites` directory:

```bash
# Install packages and sync pnpm lockfile
pnpm install

# Start the Vite local development server
pnpm run dev

# Run ESLint validation
pnpm run lint

# Build production assets
pnpm run build
```

---

## 🚨 Essential Development Rules

1. **Maintain Responsive Styling**:
   - Always verify how pages scale on mobile. Utilize inline CSS rules like `flexWrap: "wrap"` or nested `<style>` tags for media query overrides (e.g. `.info-cards-grid { grid-template-columns: 1fr !important; }`).
2. **Visual Consistency**:
   - Reuse the `hvacImages` and `pageStyles` dictionaries inside [siteData.js](file:///d:/Hvac_main/HVAC_Websites/src/components/siteData.js) instead of hardcoding redundant parameters.
3. **Animations**:
   - Keep interactions smooth (e.g. `transition: "background 0.2s"`) on clickable blocks and menus. Keep the infinite scrolling marquee animations synchronized.
