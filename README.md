# EFIQ One

EFIQ One is a modern, modular web application built for seamless attendance and stock inventory management. This repository serves as the foundational frontend architecture for the ecosystem.

## 🚀 Tech Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Fonts:** Inter & Orbitron (Optimized via `next/font/google`)
- **Icons:** Material Symbols Outlined

---

## 🏗 Folder Architecture

Our codebase is structured for maximum modularity. **When creating new features, follow this structure:**

```text
src/
├── app/                  # Next.js App Router (Pages & Layouts)
│   ├── layout.js         # Root layout (Global providers, Navbar)
│   ├── globals.css       # Tailwind theme tokens & global animations
│   ├── (route-name)/     # 🆕 ALL NEW PAGES GO HERE (e.g., /dashboard)
│   │   └── page.jsx      # The UI for that specific route
│   └── choose-product/   # (Example) Product selection page
│
├── components/           # Reusable UI Components
│   ├── Navbar.jsx        # Global responsive navigation
│   ├── OptionCard.jsx    # Generic reusable card component
│   └── ...               # 🆕 ADD NEW REUSABLE COMPONENTS HERE
│
├── lib/                  # Utilities & Constants
│   └── constants.js      # Global data (Navigation links, product info)
│
└── styles/               # Global Theming
    └── theme.js          # Brand colors (used strictly across the app)
```

---

## 🛠 Getting Started

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd efiq-one
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🤝 Collaboration Guidelines

To keep the codebase clean, robust, and consistent, please adhere to the following rules when contributing:

### 1. Creating a New Page
- Generate a new folder inside `src/app/` matching your desired route name (e.g., `src/app/inventory/`).
- Inside that folder, create a `page.jsx` file and use the `export default function PageName()` syntax.
- Ensure the page is responsive from the start (test on mobile `390px` and desktop viewports).

### 2. Building Components
- If a UI element is used on more than one page (e.g., buttons, specific cards, inputs), create it inside `src/components/`.
- Make components dynamic using props. Avoid hardcoding data into the UI components.

### 3. Styling & Theming
- Do **not** use random hex codes in your Tailwind classes.
- Always use the predefined Tailwind theme variables (mapped from `src/styles/theme.js` to `src/app/globals.css`). 
- Examples: `text-primary`, `bg-background`, `bg-navbar`.

### 4. Git Workflow
- Branch naming convention: `feature/your-feature-name` or `fix/issue-name`.
- Always pull the latest changes from `main` before starting new work:
  ```bash
  git pull origin main
  git checkout -b feature/your-feature-name
  ```
- Write clear, concise commit messages.

---

## 📦 Production Build

To test the optimized production build locally:
```bash
npm run build
npm start
```
