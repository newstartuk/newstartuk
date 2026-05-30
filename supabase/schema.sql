-- ============================================================
-- NewStart UK — Supabase Schema (MVP v1.2)
-- Purpose: Auth + user data + task/guidance management
-- Note: This is a schema draft. Apply via Supabase dashboard
-- or: supabase db push (when connected)
-- ============================================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ─── PROFILES ────────────────────────────────────────────────
-- Extends auth.users (Supabase Auth)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text not null,
  arrival_type text default 'international_student',
  arrival_status text default 'not_arrived',
  arrival_date date,
  city text,
  university text,
  accommodation_type text,
  nationality text,
  english_level text,
  interested_in_work boolean default false,
  profile_completed boolean default false,
  notification_permission text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─── USER TASKS ──────────────────────────────────────────────
create table if not exists public.user_tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  task_id text not null,          -- e.g. "STU_PRE_001"
  status text not null default 'not_started', -- not_started | in_progress | complete
  completed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, task_id)
);

-- ─── GUIDANCE ARTICLES ───────────────────────────────────────
create table if not exists public.guidance_articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null,
  description text,
  what_this_is text,
  why_it_matters text,
  safety_warning text,
  source_signpost text,
  disclaimer text not null,
  last_reviewed date,
  review_status text default 'pending', -- pending | reviewed | flagged | archived
  escalation_flag text default 'none',  -- none | advisor | urgent | legal
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─── SUPPORT TICKETS ─────────────────────────────────────────
create table if not exists public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  category text not null,           -- account | checklist | document | housing | partner | scam | other
  description text not null,
  email text not null,
  status text default 'open',       -- open | resolved
  created_at timestamptz default now(),
  resolved_at timestamptz
);

-- ─── REMINDER LOG ────────────────────────────────────────────
create table if not exists public.reminder_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  task_id text not null,
  scheduled_for timestamptz not null,
  sent_at timestamptz,
  channel text default 'email',     -- email | browser
  status text default 'pending',    -- pending | sent | failed
  created_at timestamptz default now()
);

-- ─── ADMIN: GUIDANCE MANAGEMENT ──────────────────────────────
create table if not exists public.admin_guidance_versions (
  id uuid primary key default gen_random_uuid(),
  article_id uuid references public.guidance_articles(id) on delete cascade,
  version integer not null,
  content_hash text,
  changed_by text,
  changed_at timestamptz default now(),
  change_summary text,
  unique(article_id, version)
);

-- ─── ADMIN: TASK AUDIT LOG ───────────────────────────────────
create table if not exists public.task_audit_log (
  id uuid primary key default gen_random_uuid(),
  task_id text not null,
  action text not null,  -- created | updated | archived | flagged
  performed_by text,     -- admin email
  details jsonb,
  created_at timestamptz default now()
);

-- ─── ROW LEVEL SECURITY (RLS) ─────────────────────────────────
-- RLS is ENABLED on all tables

-- Profiles: users can read/update their own profile
alter table public.profiles enable row level security;
create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- User tasks: users manage their own tasks
alter table public.user_tasks enable row level security;
create policy "Users manage own tasks"
  on public.user_tasks using (auth.uid() = user_id);

-- Guidance articles: anyone can read
alter table public.guidance_articles enable row level security;
create policy "Anyone can read guidance"
  on public.guidance_articles for select using (true);

-- Support tickets: users can create and view their own
alter table public.support_tickets enable row level security;
create policy "Users manage own tickets"
  on public.support_tickets using (auth.uid() = user_id);

-- Reminder log: users see their own reminders
alter table public.reminder_log enable row level security;
create policy "Users manage own reminders"
  on public.reminder_log using (auth.uid() = user_id);

-- Admin tables: no RLS for now (managed via service role)
-- Guidance admin versions: read-only for analysts
alter table public.admin_guidance_versions enable row level security;
create policy "Admins manage guidance versions"
  on public.admin_guidance_versions for all
  using (true); -- tighten to service role in production

-- Task audit log: read-only for analysts
alter table public.task_audit_log enable row level security;
create policy "Admins read task audit log"
  on public.task_audit_log for select using (true);

-- ─── FUNCTIONS & TRIGGERS ───────────────────────────────────

-- Auto-update updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

create trigger set_updated_at
  before update on public.user_tasks
  for each row execute function public.handle_updated_at();

create trigger set_updated_at
  before update on public.guidance_articles
  for each row execute function public.handle_updated_at();

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', ''),
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─── INDEXES ─────────────────────────────────────────────────
create index if not exists idx_user_tasks_user_id on public.user_tasks(user_id);
create index if not exists idx_user_tasks_status on public.user_tasks(status);
create index if not exists idx_reminder_log_user_id on public.reminder_log(user_id);
create index if not exists idx_reminder_log_scheduled on public.reminder_log(scheduled_for);
create index if not exists idx_support_tickets_user_id on public.support_tickets(user_id);
create index if not exists idx_support_tickets_status on public.support_tickets(status);

-- ─── SEED DATA ───────────────────────────────────────────────
-- Guidance articles seed (matches lib/guidance-data.ts)
insert into public.guidance_articles
  (slug, title, category, description, disclaimer, last_reviewed, review_status, escalation_flag)
values
  ('ukvi-evisa-guide', 'UKVI eVisa / UKVI Online Account', 'Documents',
   'How to access and use your UKVI online account — your digital proof of immigration status.',
   'This guidance is for general information only. It does not constitute immigration advice. Always verify your status at gov.uk/prove-immigration-status.',
   '2026-05-01', 'reviewed', 'advisor'),

  ('bank-account-guide', 'Opening a UK Bank Account', 'Money',
   'What you need to open a UK student bank account and how to choose the right one.',
   'This guidance is for general information only. Financial products change frequently — compare options at moneysavingexpert.com before deciding.',
   '2026-05-01', 'reviewed', 'none'),

  ('nhs-guide', 'NHS — How the UK Health System Works', 'Health',
   'A practical guide to using the NHS — GP, hospitals, prescriptions, dental, and optical services.',
   'This is general health system guidance, not medical advice. In an emergency, always call 999. For medical help that is not an emergency, call 111.',
   '2026-05-01', 'reviewed', 'none'),

  ('work-rights-guide', 'Part-Time Work and Your Visa', 'Work',
   'Understanding your right to work as an international student in the UK.',
   'This is general guidance. Your visa conditions are personal to you — always check your UKVI account or speak to your university international student support team for your specific situation.',
   '2026-05-01', 'reviewed', 'advisor'),

  ('housing-guide', 'Renting in the UK as a Student', 'Accommodation',
   'Your rights and responsibilities as a student tenant in the UK private rental sector.',
   'This is general housing guidance, not legal advice. For legal advice, contact Shelter, a student housing adviser, or a qualified solicitor.',
   '2026-05-01', 'reviewed', 'legal'),

  ('housing-scams-warning', 'Housing Scam Warning', 'Safety',
   'Red flags and warning signs for rental and housing scams targeting international students.',
   'If you believe you have been targeted by a scam, report it to Action Fraud at actionfraud.police.uk or call 0300 123 2040.',
   '2026-05-01', 'reviewed', 'urgent'),

  ('ni-number-guide', 'National Insurance Number', 'Work',
   'How to apply for and use your UK National Insurance (NI) number.',
   'This is general guidance for informational purposes only.',
   '2026-05-01', 'reviewed', 'none'),

  ('council-tax-guide', 'Council Tax and Student Exemption', 'Local Admin',
   'How council tax works, who has to pay, and how students can claim exemption.',
   'Council tax rules differ across England, Wales, Scotland, and Northern Ireland. Check your local council website for the rules in your area.',
   '2026-05-01', 'reviewed', 'none'),

  ('transport-guide', 'UK Transport — Buses, Trains, and Student Discounts', 'Transport',
   'How to get around the UK cheaply as a student — including oyster cards, railcards, and bus passes.',
   'Transport prices and discount schemes change. Always check tfl.gov.uk and nationalrail.co.uk for current prices.',
   '2026-05-01', 'reviewed', 'none'),

  ('90-day-review', 'Your 90-Day Settlement Review', 'Growth',
   'A structured framework for reflecting on your first 90 days in the UK and planning the next 90.',
   'This is a self-reflection guide. It does not constitute professional advice.',
   '2026-05-01', 'reviewed', 'none'),

  ('student-discounts-guide', 'Student Discounts Guide', 'Local Life',
   'How to access and maximise student discounts across the UK — Totum card, retail, tech, and travel.',
   'Discount offers change frequently. Check individual retailer websites for current deals.',
   '2026-05-01', 'reviewed', 'none'),

  ('emergency-contacts-guide', 'UK Emergency Contacts', 'Safety',
   'Official emergency and non-emergency contact numbers for the UK — police, NHS, and support services.',
   'In a life-threatening emergency, always call 999. This guide does not replace calling 999 in an emergency.',
   '2026-05-01', 'reviewed', 'none'),

  ('document-checklist-guide', 'UK Document Checklist', 'Documents',
   'A checklist of all the key identity and official documents you need as an international student in the UK.',
   'Document requirements can change. Always check gov.uk/student-visa for the latest requirements.',
   '2026-05-01', 'reviewed', 'advisor')
on conflict (slug) do update
  set title = excluded.title,
      category = excluded.category,
      description = excluded.description,
      disclaimer = excluded.disclaimer,
      last_reviewed = excluded.last_reviewed,
      review_status = excluded.review_status,
      escalation_flag = excluded.escalation_flag,
      updated_at = now();

comment on table public.profiles is 'User profiles — extends Supabase Auth users';
comment on table public.user_tasks is 'Per-user task completion state';
comment on table public.guidance_articles is 'Guidance articles with review status and escalation flags';
comment on table public.support_tickets is 'User-submitted support requests';
comment on table public.reminder_log is 'Future reminder schedule — for Resend/email integration';
comment on table public.admin_guidance_versions is 'Version history for guidance article changes';
comment on table public.task_audit_log is 'Audit trail for task content changes';
