# NewstartUK 🇬🇧

> **Your first 90 days in the UK, sorted.**

NewstartUK is a digital companion platform for new immigrants settling in the UK. MVP 1 focuses on **international students** — providing an interactive 90-day settlement checklist, UK budget planner, and essential guides for NHS registration, banking, and emergency contacts.

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/newstartuk/newstartuk.git
cd newstartuk

# Install dependencies
npm install

# Start development server
npm run dev

# Open → http://localhost:3000
```

---

## 📂 Project Structure

```
NewstartUK/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage
│   ├── dashboard/          # Progress dashboard
│   ├── checklist/          # Interactive 90-day checklist
│   ├── budget/             # UK student budget planner
│   ├── nhs/                # NHS registration guide
│   ├── bank/               # UK bank account guide
│   └── emergency/          # Emergency contacts
├── components/             # Reusable React components
│   ├── Navigation.tsx      # App-wide navigation (sidebar + mobile)
│   ├── DashboardWrapper.tsx # Dashboard logic + state
│   ├── ChecklistWrapper.tsx# Checklist logic + filtering
│   └── BudgetWrapper.tsx   # Budget planner logic + charts
├── lib/                    # Data and utilities
│   └── checklist-data.ts   # Full checklist data (all categories)
├── types/                  # TypeScript type definitions
│   ├── checklist.ts
│   └── budget.ts
└── project-docs/            # Scrum & Agile documentation
    ├── PROJECT_CHARTER.md
    ├── roles/
    ├── artifacts/
    └── sprints/
```

---

## 🎯 MVP 1 Features

| Feature | Status |
|---------|--------|
| 90-Day Settlement Checklist (20 tasks) | ✅ Complete |
| Progress Dashboard | ✅ Complete |
| UK Budget Planner with charts | ✅ Complete |
| NHS Registration Guide | ✅ Complete |
| UK Bank Account Guide | ✅ Complete |
| Emergency Contacts | ✅ Complete |
| LocalStorage persistence | ✅ Complete |
| Mobile responsive | ✅ Complete |
| Category filtering | ✅ Complete |
| Task detail modals | ✅ Complete |
| WCAG 2.1 AA audit | 🔜 Sprint 3 |
| Performance optimisation | 🔜 Sprint 4 |
| Production launch | 🔜 Sprint 4 |

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Icons | Lucide React |
| State | React hooks + LocalStorage |
| Deployment | Vercel (planned) |

---

## 📋 Scrum / Agile Documentation

All project documentation is in `project-docs/`:

- `PROJECT_CHARTER.md` — Vision, goals, phases
- `roles/SCRUM_ROLES.md` — PO, SM, Development Team responsibilities
- `artifacts/PRODUCT_BACKLOG.md` — Full product backlog (P0–P3)
- `sprints/SPRINT_1_PLAN.md` through `SPRINT_4_PLAN.md` — Sprint plans

---

## 🔁 Development Workflow

```bash
# Before starting work — pull latest
git checkout main
git pull origin main

# Create a branch for your feature
git checkout -b feature/my-feature

# Make changes, commit
git add .
git commit -m "Add: my feature description"

# Push and create PR
git push origin feature/my-feature

# Merge via GitHub PR → squash and merge to main
```

---

## ⚙️ Environment Setup

No environment variables are required for MVP 1 (LocalStorage-only).

When moving to production (Phase 2), you will need:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

---

*Built with ❤️ for new immigrants in the UK*  
*NewstartUK is not affiliated with the UK Government or any government agency.*
