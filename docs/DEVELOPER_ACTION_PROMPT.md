# NewStart UK v1.2 - 10/10 Developer Action Prompt

Use this prompt with a coding agent/developer to realign the current NewStart UK prototype to the v1.2 MVP foundation.

---

You are working on the NewStart UK codebase. Before adding new static pages or extra surface features, realign the project to the NewStart UK Documentation Pack v1.2 standard.

## Primary goal

Move the app from a static LocalStorage checklist prototype into a profile-led, compliance-safe settlement assistant.

The target flow is:

**student profile -> rules engine -> personalised checklist -> progress/readiness score -> reminders -> guidance -> support/escalation.**

## Priority 0 - safety and content accuracy

1. Replace any active BRP collection task with UKVI/eVisa access guidance.
2. Remove police registration as an active task.
3. Rewrite student work guidance so it says users must check their own eVisa/visa and university conditions; avoid universal 20-hour claims.
4. Remove broad claims that dependants have the same work rights.
5. Remove unverified emergency numbers and use conservative official categories: 999, 111, 101, Samaritans 116 123, university/local emergency contacts, and official GOV.UK/NHS links.
6. Remove claims such as “reviewed by immigration advisers” unless documented.
7. Add disclaimers to sensitive pages: legal, immigration, financial, tax, medical, and housing matters are not advice.
8. Add source/review fields to checklist and guidance content.

## Priority 1 - technical cleanup

1. Fix or remove the misnamed `tailwind.config.ts` if it contains Next config.
2. Add a lockfile.
3. Upgrade dependencies to a current patched baseline.
4. Add safe JSON parsing for LocalStorage fallback.
5. Fix any nested `<button>` accessibility issues.
6. Fix progress bar colours using explicit mappings.
7. Add or clean the lint/test baseline.
8. Standardise brand naming as **NewStart UK**.

## Priority 2 - MVP v1.2 foundation

1. Add `/onboarding` and `/onboarding/student`.
2. Collect arrival date, arrival status, city, university, accommodation type, English confidence level, student category, and work-interest preference.
3. Expand checklist task schema with: `task_id`, `stage`, `category`, `priority`, `conditions`, `dependencies`, `reminder_trigger`, `guidance_slug`, `risk_warning`, `source_url`, `ai_helper_allowed`, `escalation_flag`, and `review_status`.
4. Replace static checklist loading with profile-based task generation.
5. Implement weighted UK Readiness Score.
6. Prepare Supabase Auth + Postgres schema and migration files.
7. Add basic `/admin` dashboard skeleton for task/guidance management.
8. Add reminder placeholders for future Resend integration.
9. Add Document Helper Lite placeholder with strong guardrails.
10. Add Nia - The NewStart Navigator as an AI-assisted guide, clearly disclosed as not a real adviser or official representative.

## Acceptance gate

The update is not complete until:

- no outdated BRP or police-registration active tasks remain;
- sensitive content includes disclaimers and signposting;
- onboarding profile exists;
- checklist generation uses profile-based logic;
- task schema includes dependencies, source fields, and risk warnings;
- Supabase/Auth architecture is implemented or prepared;
- admin dashboard skeleton exists;
- Nia appears transparently in key UX flows;
- README, setup, environment, lint/test, and deployment notes are current;
- the app builds successfully and works on mobile and desktop.

Do not add new feature pages until the v1.2 foundation is corrected.
