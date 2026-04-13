# Moneed — Finance Dashboard

> A clean, interactive personal finance dashboard built with React, Tailwind CSS, Recharts, and Lucide React. Designed with a custom design system and role-based UI.

---

<!-- PROJECT SCREENSHOT — replace with your actual screenshot -->
<!-- Suggested: Full dashboard overview in light mode -->
<!-- ![Moneed Dashboard Overview](./docs/images/dashboard-overview.png) -->


![Dashboard Overview](https://github.com/surajit-13-sutradhar/Moneed/blob/8a358aaafc54ddf2b39865fe7ff7f993f4445f64/Dashboard-Dark.png)


---

## Table of Contents

- [Overview](#overview)
- [Design Process](#design-process)
- [Development Approach](#development-approach)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Role-Based UI](#role-based-ui)
- [State Management](#state-management)
- [Data Layer](#data-layer)
- [Screenshots](#screenshots)
- [Design System](#design-system)
- [AI-Assisted Development](#ai-assisted-development)
- [Known Limitations](#known-limitations)
- [Future Improvements](#future-improvements)

---

## Overview

Moneed is a frontend finance dashboard built as an evaluation project. It allows users to track their financial activity through a clean interface that covers four core areas: a summary overview, a transactions explorer, a spending analytics page, and application settings.

The project was scoped and built to demonstrate:

- Frontend architecture decisions and component thinking
- UI/UX design sensibility and design system implementation
- Role-based interface behaviour without a backend
- Responsible and practical use of AI tooling in the development workflow

---

## Design Process

The design for Moneed was not an afterthought — it was the starting point. Before a single line of application code was written, a complete design system (`DESIGN_SYSTEM.md`) was defined and validated.

### Philosophy: "Modern Trust"

The guiding principle behind the visual language was **Modern Trust** — a UI that evokes security, clarity, and forward momentum. Financial data can feel intimidating. The design deliberately counteracts that through:

- **Soft geometry** — `rounded-3xl` (1.5rem) on cards avoids harsh 90-degree angles that make data feel confrontational
- **Data-first backgrounds** — surfaces use neutral Zinc tones so color is reserved exclusively for data, semantic meaning, and primary actions
- **High contrast** — all text combinations were chosen to maintain readable contrast ratios in both light and dark mode

### Design Tokens

The entire color system is CSS-variable driven, making light/dark mode a single class toggle on `<html>`. Tokens cover:

- Background layers: App canvas → Surface (card) → Surface Hover
- Typography: Primary (headings, amounts) → Secondary (labels, dates)
- Semantic: Brand (blue), Success (green), Danger (red), Warning (yellow)

### Typography

**Outfit** was chosen for its geometric construction and exceptional numerical legibility — critical for a finance interface where users are scanning numbers constantly. A six-level type scale was defined from Display (40px, main balance figures) down to Body Small (14px, table headers and labels).

### Layout Inspiration

The overall layout structure was inspired by modern finance SaaS interfaces — specifically the asymmetric **65/35 content split** between a primary content column and a secondary insights column. The sidebar uses a full-width rounded pill for the active navigation state, which feels more grounded than underlines or left borders.

### Visual Validation

Before any application code, a standalone HTML design system test page was built to validate that all tokens, typography, buttons, badges, cards, and table rows rendered correctly in both light and dark modes. This caught issues early and locked the system in before development began.

---



---

## Development Approach

The project was built in six clearly defined phases, each with a specific deliverable and a clear "done" state before the next phase began.

| Phase | Focus | Key Deliverable |
|-------|-------|-----------------|
| 1 | Foundation | Vite scaffold, Tailwind config, routing shell, design tokens wired |
| 2 | Data layer | 45 mock transactions, AppContext, aggregation utilities, localStorage |
| 3 | App shell | Sidebar, topbar, dark mode toggle, role switcher, mobile drawer |
| 4 | Overview page | Stat cards, area chart, donut chart, recent transactions, savings ring |
| 5 | Transactions page | Table, filters, search, sort, add/edit modal, export CSV/JSON |
| 6 | Analytics + polish | Bar chart, insights cards, month-over-month, settings, empty states |

This phased approach meant the app was always in a runnable state. Each phase was reviewed visually before proceeding, which kept feedback loops tight and prevented compounding issues.

---

## Features

### Dashboard Overview
- Summary stat cards for Total Balance, Monthly Income, and Monthly Expenses
- Month-over-month percentage change indicators with trend icons
- Cash Flow area chart (income vs expenses over time) powered by Recharts
- Spending breakdown donut chart with top 5 categories and inline legend
- Recent transactions list with quick-link to the full transactions page
- Savings Rate ring — animated SVG arc that shifts color based on savings health (green → yellow → red)

### Transactions
- Full transaction table with 45 realistic mock records across 4 months
- Real-time search across description, transaction ID, and category
- Filter by category, type (income/expense), and status (completed/pending/failed)
- Sort by date (newest/oldest) or amount (highest/lowest)
- Active filter indicator with one-click reset
- Table footer showing live totals of filtered income and expenses
- Empty state with contextual CTA
- Export current filtered view to CSV or JSON

### Admin-only (role-gated)
- Add new transaction via modal with full validation
- Edit any existing transaction inline
- Delete transactions with confirmation prompt
- Hover-reveal action menu per row (`...` button)

### Analytics & Insights
- Average monthly income, expenses, and savings rate stat cards
- Monthly grouped bar chart (income vs expenses side by side)
- Spending by category donut chart
- Top spending category breakdown with animated progress bars per category
- Month-over-month comparison table with delta indicators
- Average performance card with savings efficiency bar

### Settings
- Light/dark mode toggle (pill switcher, persisted to localStorage)
- Role switcher (Admin/Viewer) with contextual permission description
- Reset transactions to original mock data
- Clear all transaction data
- Live app info panel (version, stack, record count)

### General
- Full light and dark mode with smooth CSS variable transitions
- Responsive layout — mobile drawer sidebar, stacked cards, touch-friendly targets
- localStorage persistence for theme, role, and transaction data
- Notification dropdown with unread badge and mark-all-read
- Graceful empty states on all data-dependent views

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 (Vite) |
| Styling | Tailwind CSS v3 |
| Routing | React Router v6 |
| Charts | Recharts |
| Icons | Lucide React |
| State | React Context + useReducer |
| Persistence | localStorage (custom hook) |
| Font | Outfit (Google Fonts) |
| Build tool | Vite |

---

## Project Structure

```
src/
├── components/
│   ├── analytics/
│   │   ├── AvgStatsCard.jsx       # Average performance insight card
│   │   ├── InsightCard.jsx        # Base insight card wrapper
│   │   ├── MonthComparisonCard.jsx# Month-over-month comparison
│   │   └── TopCategoryCard.jsx    # Top spending category with bar breakdown
│   ├── charts/
│   │   ├── BalanceTrendChart.jsx  # Area chart — income vs expenses trend
│   │   ├── MonthlyBarChart.jsx    # Grouped bar chart — monthly breakdown
│   │   └── SpendingDonutChart.jsx # Donut chart — category spending
│   ├── dashboard/
│   │   ├── RecentTransactions.jsx # Last 6 transactions with link to full list
│   │   └── SavingsCard.jsx        # SVG ring — savings rate visualisation
│   ├── layout/
│   │   ├── AppShell.jsx           # Root layout — sidebar + topbar + outlet
│   │   ├── Sidebar.jsx            # Nav sidebar + mobile drawer
│   │   └── Topbar.jsx             # Fixed topbar — search, theme, notifs, role
│   ├── transactions/
│   │   ├── TransactionFilters.jsx # Search + filter + sort controls
│   │   ├── TransactionModal.jsx   # Add / edit transaction modal
│   │   └── TransactionRow.jsx     # Single table row with action menu
│   └── ui/
│       ├── Badge.jsx              # Semantic status/type badge
│       ├── SectionHeader.jsx      # Page title + subtitle + optional action
│       └── StatCard.jsx           # Summary metric card with trend badge
├── context/
│   └── AppContext.jsx             # Global state — useReducer + Provider
├── data/
│   └── mockData.js                # 45 mock transactions, categories, colors
├── hooks/
│   └── useLocalStorage.js         # Generic localStorage read/write hook
├── pages/
│   ├── Analytics.jsx              # Analytics & insights page
│   ├── Dashboard.jsx              # Main overview page
│   ├── Settings.jsx               # Preferences and data management
│   └── Transactions.jsx           # Transaction explorer page
└── utils/
    ├── aggregations.js            # Data computation — stats, trends, insights, export
    └── formatters.js              # Currency (INR), date, percent formatters
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/surajit-13-sutradhar/moneed.git
cd moneed

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
npm run preview
```

### Notes

- Tailwind CSS v3 is used explicitly. If you scaffold with a newer version, install with `npm install -D tailwindcss@3 postcss autoprefixer`
- No environment variables are required — the app runs entirely on the frontend with mock data
- On first load, `localStorage` is empty and the app seeds from `mockData.js` automatically

---

## Role-Based UI

Moneed implements a simulated role-based UI without any backend or authentication layer. The role is toggled via a dropdown in the topbar or through the Settings page, and persists across sessions via localStorage.

### Roles

| Role | Capabilities |
|------|-------------|
| **Admin** | Full access — view, add, edit, delete transactions, export data |
| **Viewer** | Read-only — all write actions (add button, edit/delete menus) are hidden |

### How it works

The `role` value lives in `AppContext`. Components read `state.role` directly and conditionally render action elements:

```jsx
// In Transactions.jsx
const isAdmin = role === 'admin'

// Add button only renders for admin
{isAdmin && (
  <button onClick={openAdd}>Add Transaction</button>
)}

// Row action menu only renders for admin
<TransactionRow isAdmin={isAdmin} onEdit={openEdit} onDelete={handleDelete} />
```

This is a frontend-only simulation. In a production system, role enforcement would live server-side — the frontend would receive a token/claim that determines the role, and all mutations would be validated by the API.

---

## State Management

Global state is managed with React's built-in `useContext` + `useReducer` — deliberately chosen over Redux or Zustand because the app's state complexity doesn't justify an external library.

### State shape

```js
{
  role: 'admin' | 'viewer',
  theme: 'light' | 'dark',
  transactions: Transaction[],
  filters: {
    search: string,
    category: string,    // 'all' | category name
    type: string,        // 'all' | 'income' | 'expense'
    status: string,      // 'all' | 'completed' | 'pending' | 'failed'
    sortBy: string,      // 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc'
  },
  notifications: Notification[],
}
```

### Reducer actions

| Action | Effect |
|--------|--------|
| `SET_ROLE` | Switch between admin and viewer |
| `SET_THEME` | Toggle light/dark, syncs class on `<html>` |
| `ADD_TRANSACTION` | Prepend new transaction to array |
| `EDIT_TRANSACTION` | Replace transaction by id |
| `DELETE_TRANSACTION` | Filter transaction by id |
| `SET_FILTER` | Merge partial filter update |
| `RESET_FILTERS` | Restore all filters to defaults |
| `MARK_NOTIFICATION_READ` | Mark single notification read |
| `MARK_ALL_READ` | Mark all notifications read |

### Persistence

Two separate localStorage keys are used:

- `moneed-prefs` — lightweight, stores only `{ theme, role }`, updated on every change
- `moneed-transactions` — full transaction array, written on every mutation, read on init

On first load with no stored transactions, the app seeds from `mockData.js`. This means any admin-added transactions survive page refreshes.

---

## Data Layer

### Mock data

45 transactions spanning January–April 2026, across 8 categories:

`Food & Dining` · `Transport` · `Housing` · `Shopping` · `Health` · `Entertainment` · `Income` · `Utilities`

Each transaction has: `id`, `description`, `category`, `type`, `amount`, `status`, `date`

Statuses include `completed`, `pending`, and `failed` to exercise all badge states.

### Aggregation utilities (`utils/aggregations.js`)

| Function | Returns |
|----------|---------|
| `getSummaryStats(txns)` | Balance, income, expenses, month-over-month changes, savings rate |
| `getMonthlyTrend(txns)` | Array of `{ label, income, expenses, balance }` per month |
| `getCategoryBreakdown(txns)` | Sorted array of `{ name, value, percentage, color }` |
| `getInsights(txns)` | Top category, month-over-month comparison, averages |
| `getFilteredTransactions(txns, filters)` | Filtered + sorted transaction array |
| `exportToCSV(txns)` | Triggers browser download of `.csv` file |
| `exportToJSON(txns)` | Triggers browser download of `.json` file |

All aggregations are wrapped in `useMemo` in the page components so they only recompute when `transactions` changes.

## Design System

The full design system is documented in `DESIGN_SYSTEM.md` at the root of the repository. Key decisions:

### Color tokens (CSS variables)

All colors are defined as RGB channel triplets on `:root` and `.dark`, enabling Tailwind's opacity modifier syntax (`bg-brand/10`, `text-success/50`) across the entire token system.

```css
:root {
  --color-brand:   0 82 255;    /* Electric blue */
  --color-success: 22 163 74;   /* Green 600 */
  --color-danger:  239 68 68;   /* Red 500 */
  --color-warning: 234 179 8;   /* Yellow 500 */
}

.dark {
  --color-brand:   59 130 246;  /* Soft blue — less harsh on dark bg */
  --color-success: 34 197 94;
  --color-danger:  248 113 113;
  --color-warning: 250 204 21;
}
```

### Elevation

- **Light mode** — cards use `box-shadow: 0 4px 20px -2px rgba(0,0,0,0.05)` for a floating paper effect
- **Dark mode** — shadows are disabled entirely. Depth is achieved purely through background contrast (Zinc 950 canvas vs Zinc 900 card surface)

### Border radius scale

| Token | Value | Used for |
|-------|-------|---------|
| `rounded-md` | 6px | Inputs, dropdowns |
| `rounded-2xl` | 16px | Inner elements, small widgets |
| `rounded-3xl` | 24px | Dashboard cards, modals |
| `rounded-full` | 9999px | Buttons, avatars, badges |

---

## AI-Assisted Development

This project was developed with meaningful assistance from an AI coding assistant (Claude by Anthropic). This section is included transparently to document how that collaboration worked and where human judgment drove the final outcome.

### What the AI contributed

- **Design system translation** — converting the written design token specification into working Tailwind config and CSS variable declarations
- **Component scaffolding** — generating the initial structure for complex components like `TransactionModal`, `BalanceTrendChart`, and `AppContext`
- **Aggregation logic** — first drafts of the data utility functions (`getSummaryStats`, `getMonthlyTrend`, `getCategoryBreakdown`)
- **Boilerplate acceleration** — routing setup, folder structure, localStorage hook, and formatter utilities

### What required human judgment and iteration

- **Design direction** — the "Modern Trust" philosophy, the Fundex layout reference, and all visual decisions were directed and refined by me. The AI had no aesthetic opinion until given explicit constraints.
- **Design system authorship** — the full `DESIGN_SYSTEM.md` including token names, color values, typography scale, and component specifications was written by me before AI involvement in code
- **Layout refinement** — the topbar spacing, mobile responsiveness, and sidebar behaviour went through several rounds of visual review and correction. The AI's first outputs required adjustment based on what was seen in the browser.
- **Phased scope decisions** — every "keep vs trim" decision (what features to build, what to simplify) was made by the developer based on evaluation requirements
- **Visual QA** — every phase was reviewed in the browser before proceeding. Issues caught this way (icon visibility on mobile, topbar positioning on small screens, sidebar width on mobile) were identified by the developer and fixed with targeted prompts

### The honest summary

The AI was a highly capable pair-programming partner that significantly accelerated the implementation phase. It did not drive design, make scope decisions, and required consistent review and correction from me. The final product reflects my design vision, architectural choices, and UX decisions.

---

## Known Limitations

- **No real backend** — all data is mock and lives in localStorage. Refreshing in a different browser or clearing storage resets to mock data.
- **No authentication** — the role switcher is entirely client-side and can be changed by anyone. This is by design for the evaluation scenario.
- **Mobile table layout** — the transactions table collapses to show only description and amount on small screens. Category, status, and date are hidden on mobile to maintain readability.
- **No pagination** — with 45 mock transactions this is fine, but a real implementation would need server-side or client-side pagination.
- **No real search** — the search is a client-side string match across the loaded dataset. A production version would hit a search API.

---

## Future Improvements

Given more time or a production context, the following would be natural next steps:

- **Real authentication** — JWT-based auth with role claims from the server
- **Backend API** — replace mock data with real CRUD endpoints, moving to `React Query` or `SWR` for server state
- **Pagination** — virtual list or server-side pagination for large transaction sets
- **Budget tracking** — set monthly budgets per category with progress indicators (partially visible in the design reference)
- **Date range filtering** — filter transactions by a custom date range picker
- **Recurring transactions** — mark and automatically generate recurring entries
- **Multi-currency** — support multiple currencies with live exchange rates
- **PDF export** — generate a formatted monthly statement PDF
- **Notifications system** — real-time alerts via WebSocket when budgets are exceeded
- **Accessibility audit** — full WCAG 2.1 AA pass including keyboard navigation and screen reader support
- **Unit and integration tests** — Jest + React Testing Library coverage for aggregation utilities and key components

---

## License

This project was built as a frontend evaluation assignment. All code is original work by the author, developed with AI assistance as documented above.

---

<p align="center">Built with React + Tailwind · Designed with intention · Powered by Outfit</p>
