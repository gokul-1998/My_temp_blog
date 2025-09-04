
**Pasted-You-get-ONE-prompt-I-m-going-to-sleep-Work-autonomously-Make-reasonable-assumptions-If-blocked-…**

You get ONE prompt. I’m going to sleep. Work autonomously. Make reasonable assumptions. If blocked, stub and move forward. PLAN → BUILD → TEST → FIX → SHIP.

**Project: DevRel Impact HQ**
A full web app to track DevRel activities, attribution, KPIs, and ROI across content, community, code, docs, events, and product funnels. Built as a React SPA with an Express API.

**Tech stack**

* Frontend: React + TypeScript (Vite), Tailwind CSS, Radix UI (or Headless UI), React Router, Recharts
* Backend: Express + TypeScript, Prisma ORM + SQLite, Zod for validation, Multer for uploads, pdfkit for PDFs, node-cron for jobs
* Auth: express-session + bcrypt (email/password), role-based access (admin, contributor, viewer), same-site cookies
* Emails: file transport writing JSON to /server/outbox (SMTP optional via env)
* Tests: Jest + Supertest (server), Vitest + React Testing Library (web), Playwright (e2e)
* Lint/format: ESLint + Prettier
* Repo layout: /server (Express API), /web (React app), /shared (types, utils)

**Core data model (Prisma)**

* User, Organization, Membership(role)
* Company (name, size, region, industry)
* Contact (name, email, title, company\_id, tags\[])
* Initiative (type: content, community, code, docs, event, launch, advocacy; owner\_id; start/end; target\_metrics JSON)
* Campaign (initiative\_id, channels\[], budget, goals)
* Channel (id, name: github, youtube, x, linkedin, blog, docs, discord, events, website, newsletter)
* **ContentItem** (title, type, url, publish\_at, cta\_url, campaign\_id)
* **Event** (title, slug, starts\_at, ends\_at, venue\_or\_url, description, banner\_path)
* **Registration** (event\_id, name, email, answers JSON, checked\_in, nps\_score)
* **ShortLink** (slug, destination, utm\_source/medium/campaign/content/term)
* **Click** (shortlink\_id, ts, ip\_hash, ua, ref, country)
* **Touch** (normalized engagement: contact\_id, company\_id, channel, source\_id, initiative\_id, campaign\_id, medium, utm JSON)
* **Conversion** (type: signup, trial\_start, activation, pr\_opened, pr\_merged, issue\_opened, paid\_start; contact\_id/company\_id; amount; ts; metadata JSON)
* **Deal** (optional CRM-lite: stage, amount, currency, close\_date, source)
* **MetricSnapshot** (daily aggregates by channel: stars\_delta, contributors, video\_views, watch\_time, docs\_views, discord\_joins, messages, site\_sessions, signups, trials, activations, sdk\_downloads, api\_calls)
* **Expense** (initiative\_id/campaign\_id, category, amount, currency, ts, notes)
* **TimeLog** (initiative\_id, user\_id, hours, rate, ts)
* **KpiDefinition** (id, name, formula, target\_per\_period)
* **KpiTarget** (kpi\_id, period, target)
* **ActivityLog** (who, what, where, when, payload JSON)

---

**Attribution and ROI**

* Implement four attribution models:

  * first\_touch
  * last\_touch
  * linear\_multi (even weight)
  * time\_decay (70/20/10 across last 3 touches)
* Each Conversion stores influenced\_by (channels, initiatives, campaigns) and weighted contribution by selected model
* ROI per initiative = influenced\_amount (or weighted conversions) – (expenses + time\_cost)
* Cost per outcome = total\_cost / count(conversions of selected type)
* Global filters: period, channel, initiative, region, company size, attribution model

---

**Express API (REST, JSON)**

* **Auth:**

  * `POST /api/auth/register`
  * `POST /api/auth/login`
  * `POST /api/auth/logout`
  * `GET /api/auth/me`

* **CRUD:**

  * `/api/contacts`
  * `/api/companies`
  * `/api/initiatives`
  * `/api/campaigns`
  * `/api/content`
  * `/api/events`
  * `/api/registrations`
  * `/api/links`
  * `/api/conversions`
  * `/api/expenses`
  * `/api/timelogs`
  * `/api/kpis`
  * `/api/reports`

* **Short links:**

  * `GET /!/:slug → 302 redirect + record Click`
  * `GET /api/links/:id/stats` (daily counts)

* **Imports:**

  * `POST /api/import/csv` for snapshots, contacts, clicks, conversions, expenses, timelogs

* **Reports:**

  * `POST /api/reports/generate` → PDF saved to `/server/outbox` and signed public token URL

* **Public data:**

  * `GET /api/public/events/:slug`
  * `GET /api/public/reports/:token` (read-only snapshot)

* **ICS export:**

  * `GET /api/events/:id.ics`

* **Validation:**

  * Zod on all mutating routes
  * RBAC checks on server

---

**React app routes (SPA)**

* `/login`
* `/register`
* `/forgot`
* `/reset`

* **/dashboard:** weekly KPI overview (influenced signups/activations, star growth, content reach, event outcomes, ROI by initiative, targets vs actuals)
* **/initiatives:** list + detail; attach campaigns, content, events, expenses, timelogs, targets; show ROI and influenced conversions
* **/campaigns:** table + detail; UTMs, short links, channel mix, cost per outcome
* **/content:** calendar view; types (video, short, blog, docs, newsletter); CSV import; CTA and short link builder
* **/events:** create event, registrations table, check-in mode, NPS capture, CSV export, ICS export, public link copy
* **/community:** import Discord CSVs; show joins, retention, DAU/WAU; cohort chart
* **/code:** import GitHub CSVs; stars, forks, PRs, issues, contributors; PR/issue funnels
* **/docs:** import docs analytics CSV; top paths, pageviews, CTAs
* **/product:** funnel view signups → trials → activations; conversion rates by channel
* **/links:** manage short links + UTM builder; click graphs
* **/contacts:** people and companies; merge duplicates by email/domain; timeline of touches/conversions
* **/expenses:** expenses and time logs; defaults for hourly rates; export CSV
* **/kpis:** define KPIs (formulas), set quarterly targets, track progress

---


### Funnel & Cohorts

* **Funnel:** touch → click → signup → trial → activation with drop-off percentages
* **Cohort explorer:** region and company size buckets

---

### Adapters

* If env tokens are present, fetch minimal stats; otherwise display instructions and accept CSV uploads
* All adapter actions write to **ActivityLog**
* Email adapter sends via SMTP if configured, else writes JSON to `/server/outbox`

---

### Security

* SameSite=Lax cookies, session store (SQLite via Prisma)
* CSRF token for mutating routes; rate limits on auth and uploads
* Input validation with Zod
* Organization scoping on every query

---

### Background jobs (node-cron)

* **Daily:** roll up MetricSnapshot
* **Weekly 09:00:** digest email (pending tasks, upcoming deadlines, unpaid invoices, KPI highlights). If SMTP off, write JSON to `/server/outbox`
* Rebuild signed public report snapshots

---

### Testing

* **Jest unit:** attribution weights, ROI calculator, KPI formula evaluation, UTM parser, slug generator, RBAC guards
* **Supertest integration:** auth, short link redirect, CSV import, report generation
* **Vitest + RTL:** key React components (KPI tiles, calendar drag/drop, funnel view)
* **Playwright e2e:**

  * register/login → create initiative → campaign → short link → simulated clicks → import conversions → view attribution/ROI
  * create event → public registration flow → check-in → NPS → generate PDF report and open public link
* **CI:** pnpm lint, typecheck, test, build

---

### **Developer Experience**
- **Seed script**: `pnpm seed` creates sample org, initiatives (content, event, launch), campaigns, short links, contacts, companies, clicks, conversions, expenses, timelogs, metric snapshots.  
- **PLAN.md**: Bullet build plan before coding.  
- **README.md**: Setup, `.env` examples, dev commands for `/server` and `/web`, where uploads/outbox live, seed data.  
- **DEMO.md**: 90-second narration + click path (dashboard → initiative ROI → switch attribution model → content calendar → event registration → public report).  
- **MORNING_REPORT.md**: Shipped features, test results, commands, known limits, next steps.  
- **CHANGELOG.md**: Notable changes.  

---

### **Non-negotiables**
- Clean, responsive UI; light/dark toggle; accessible labels and focus states.  
- Do not ask me questions; pick sensible defaults and document decisions in `MORNING_REPORT.md`.  
- Keep endpoints and types consistent between `/shared` and both apps.  

---

### **Finish Condition**
- Tests green.  
- Seed script works.  
- PDFs generate.  
- Public pages live (events, short links, report).  
- Core flows demoable end-to-end.  










