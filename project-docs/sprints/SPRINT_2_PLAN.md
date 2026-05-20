# Sprint 2 — Checklist Engine & Core Guides

> **Project:** NewstartUK | MVP 1  
> **Sprint Duration:** 2 Weeks (3 June – 17 June 2026)  
> **Sprint Number:** 2 of 4  
> **Scrum Master:** TBD  
> **Development Team:** TBD

---

## 🎯 Sprint Goal

> *"Deliver the full 90-Day Settlement Checklist with task persistence, task detail modals, and the NHS & Bank Account opening guides — the heart of the MVP."*

---

## 📋 Sprint Commitment

| Item | Type | Priority | Description |
|------|------|----------|-------------|
| S2-01 | Feature | P0 | Arrival Checklist — Day 1 tasks |
| S2-02 | Feature | P0 | Immigration / BRP Checklist |
| S2-03 | Feature | P0 | NHS Registration Guide page |
| S2-04 | Feature | P0 | Bank Account Opening Guide page |
| S2-05 | Feature | P0 | Checklist state persistence (LocalStorage) |
| S2-06 | Feature | P1 | Task Detail Modals (full instructions per task) |
| S2-07 | Feature | P1 | Checklist category filtering |
| S2-08 | Feature | P0 | Transport Guide (London / UK-wide basics) |

---

## 📊 Sprint Metrics

| Metric | Target |
|--------|--------|
| **Velocity** | ≥ Sprint 1 velocity |
| **Story Points** | TBD |
| **Completion Rate** | ≥ 85% |
| **Bug Escape Rate** | ≤ 4 |

---

## 📅 Sprint Ceremonies

### Sprint Planning
- **Date:** Tuesday, 3 June 2026
- **Duration:** 2 hours
- **Pre-read:** Updated Product Backlog, Sprint 1 Retrospective actions

### Daily Stand-ups
- **Frequency:** Daily (Mon–Fri)
- **Time:** 9:00 AM
- **Channel:** TBD

### Sprint Review & Retrospective
- **Date:** Monday, 16 June 2026
- **Review Duration:** 1.5 hours
- **Retrospective Duration:** 1 hour

---

## 🔧 Key Technical Decisions (Sprint 2)

| Decision | Rationale |
|---------|-----------|
| Checklist data stored as JSON | Simple, no backend required for MVP |
| LocalStorage for persistence | Fast, works offline, no auth required |
| Static guides in React components | SEO-friendly, fast loading |
| Tailwind CSS for responsive layout | Consistent styling, rapid development |

---

## ✅ Sprint 2 Definition of Done

All items must meet these criteria before being marked complete:

- [ ] Code written and reviewed
- [ ] All acceptance criteria met
- [ ] Task completion state persists across page refresh
- [ ] Fully responsive (mobile-first)
- [ ] No TypeScript errors or ESLint warnings
- [ ] Deployed to staging
- [ ] PO sign-off

---

## ⚠️ Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Immigration content requires specialist review | Medium | High | Advisory panel review in parallel; no blocking |
| LocalStorage quota exceeded | Low | Medium | Implement storage cleanup; plan for backend |
| Accessibility not prioritised | Medium | Medium | WCAG 2.1 AA checks built into DoD from Sprint 2 onward |

---

*Scrum Master: TBD*  
*Start Date: 3 June 2026 | End Date: 17 June 2026*
