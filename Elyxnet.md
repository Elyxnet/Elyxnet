# Elyxnet — Full Developer Brief
### For: Antigravity Dev Team
### Version: 1.0 — Complete Build Specification

---

## 1. Project Overview

**Elyxnet** is a decentralized AI infrastructure network where users contribute their authenticated social accounts and earn rewards while powering AI-driven research and intelligence services.

The core loop:
1. User connects a Web3 wallet → becomes their identity
2. User links social accounts (X, Telegram, Discord, YouTube)
3. User activates **Infrastructure Mode** → their accounts enroll as distributed infra
4. They earn points continuously based on uptime, score, and account count
5. They spend points to query the **AI Agent** — a distributed research engine
6. The AI Agent uses OpenRouter models to produce intelligence reports, simulating real distributed execution through a live execution trace UI

**MVP principle:** The MVP simulates distributed infrastructure execution visually. Real distributed execution via user accounts is the long-term roadmap. The AI research output (OpenRouter) is real; the infra allocation display is a believable simulation layer.

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (JavaScript only — no TypeScript) |
| Styling | Tailwind CSS v4 (CSS-first config, no `tailwind.config.js`) |
| Animation | Motion (the `motion` package — NOT framer-motion) |
| Icons | react-icons |
| Database | MongoDB Atlas via Mongoose |
| Auth | WalletConnect + custom SIWE (Sign-In with Ethereum) |
| AI | OpenRouter API (model-agnostic, streaming) |
| Queue | Bull or Upstash QStash for background jobs |
| Deployment | Vercel |
| Other libs | SWR, jose (JWT), ethers.js or viem |

> **CRITICAL NOTE — Tailwind v4:** Tailwind v4 uses a CSS-first configuration via `@import "tailwindcss"` and `@theme` in your CSS file. There is NO `tailwind.config.js`. All custom tokens are defined in `@theme {}` blocks inside your global CSS. Do NOT use `tailwind.config.js` or `tailwind.config.ts` at all.

---

## 3. Design System & Visual Language

### 3.1 Philosophy

The visual language is: **dark, premium, focused**. Reference: Clerk.com — clean dark UI, generous whitespace, precise typography, no visual clutter. Not crypto-bro neon. Not Web3 maximalism. Think: high-end SaaS product that happens to live on-chain.

Every screen should feel like something a senior designer at a funded startup built. Pixel-perfect spacing. Consistent hierarchy. Nothing feels like a template.

### 3.2 Colour Palette

Define all of the following as CSS custom properties inside `@theme {}` in your global CSS file (`app/globals.css`):

```css
@theme {
  /* Brand yellows */
  --color-yellow-400: #E6B93C;
  --color-yellow-200: #F5D278;
  --color-yellow-600: #C9983A;
  --color-yellow-950: #2A2008;
  --color-yellow-900: #1E1604;
  --color-yellow-border: #3A2E10;

  /* Dark backgrounds — layered depth system */
  --color-bg-base:    #0A0A0B;   /* page background */
  --color-bg-raised:  #0D0D0F;   /* sidebar, nav, cards on base */
  --color-bg-surface: #111113;   /* cards on raised bg */
  --color-bg-hover:   #18181B;   /* hover states */
  --color-bg-active:  #1C1C1E;   /* active / pressed */

  /* Borders */
  --color-border-default: #1C1C1E;
  --color-border-subtle:  #27272A;
  --color-border-strong:  #3F3F46;

  /* Text */
  --color-text-primary:   #F4F4F5;
  --color-text-secondary: #A1A1AA;
  --color-text-muted:     #71717A;
  --color-text-disabled:  #3F3F46;

  /* Semantic */
  --color-green-400: #4ADE80;
  --color-green-950: #0A1F12;
  --color-green-border: #1A3A22;
  --color-blue-400:  #60A5FA;
  --color-blue-950:  #0A1628;
  --color-purple-400: #A855F7;
  --color-purple-950: #1A0A28;
  --color-red-400:   #F87171;
  --color-red-950:   #1F0A0A;

  /* Font */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}
```

**Rule:** Use ONLY these tokens everywhere. Zero hardcoded hex values in components.

### 3.3 Typography

Use **Inter** (Google Fonts) as the primary typeface. Load it in `app/layout.js` via `next/font/google`.

Typography scale (Tailwind utility classes only — no inline styles):

| Role | Class combo |
|---|---|
| Display heading | `text-[28px] font-bold tracking-[-0.03em] text-[--color-text-primary] leading-[1.1]` |
| Page heading | `text-xl font-semibold tracking-[-0.02em] text-[--color-text-primary]` |
| Section heading | `text-base font-medium text-[--color-text-primary]` |
| Label | `text-sm font-medium text-[--color-text-secondary]` |
| Body | `text-[13px] font-normal text-[--color-text-muted] leading-relaxed` |
| Caption / overline | `text-[11px] font-medium tracking-[0.07em] uppercase text-[--color-text-disabled]` |
| Mono (wallet, code) | `font-mono text-[12px] text-[--color-text-secondary]` |

**Rule:** Never use `text-white` or `text-black`. Always use the token-based colors above.

### 3.4 Spacing

Base unit: `4px`. Use Tailwind spacing scale only — never arbitrary pixel values except where listed explicitly in this spec.

Consistent spacers:
- Page content padding: `px-6 py-8` on desktop, `px-4 py-6` on mobile
- Card internal padding: `p-5`
- Tight card: `p-4`
- Gap between stat cards: `gap-3`
- Section gap: `gap-6` or `space-y-6`
- Sidebar width: `w-56` (224px)

### 3.5 Borders & Radius

- Default card border: `border border-[--color-border-default]`
- Hover border: `hover:border-[--color-border-subtle]`
- Yellow accent border: `border-[--color-yellow-border]`
- Radius: `rounded-xl` for cards, `rounded-lg` for inputs/buttons, `rounded-md` for small chips/badges, `rounded-full` for pills and dots
- All borders `1px` — use `border` (1px) not thicker variants

### 3.6 Shadows

Minimal shadow system. Use only:
- `shadow-none` — default
- `shadow-[0_0_0_1px_var(--color-border-default)]` — subtle ring (via Tailwind ring utilities: `ring-1 ring-[--color-border-default]`)
- `shadow-[0_0_0_3px_var(--color-yellow-950)]` — focus ring on yellow-accented interactive elements

No box shadows for depth — depth is expressed through background layer differences (`bg-base → bg-raised → bg-surface`).

---

## 4. Component Specifications

### 4.1 Layout Shell

```
RootLayout
├── Sidebar (fixed left, w-56)
│   ├── Logo / Brand mark
│   ├── Navigation links
│   ├── Wallet address display (bottom)
│   └── Infra Mode toggle (bottom)
└── Main content area (ml-56, min-h-screen bg-[--color-bg-base])
    ├── Topbar (sticky, h-14)
    └── Page content
```

**Sidebar:**
- Background: `bg-[--color-bg-raised]`
- Right border: `border-r border-[--color-border-default]`
- Nav link: `text-[--color-text-muted] hover:text-[--color-text-primary] hover:bg-[--color-bg-hover]` — `rounded-lg px-3 py-2 text-sm font-medium`
- Active nav link: `bg-[--color-bg-surface] text-[--color-text-primary] border border-[--color-border-subtle]`
- Active link with yellow accent (AI Agent): `text-[--color-yellow-400]`
- Logo text: `text-[--color-yellow-400] font-bold text-[15px] tracking-[-0.01em]` — render as `ELYXNET` in caps

**Topbar:**
- Background: `bg-[--color-bg-raised]/80 backdrop-blur-sm`
- Bottom border: `border-b border-[--color-border-default]`
- Height: `h-14`
- Contains: page title left, network status badge + user avatar right

**Mobile:** Below `md` breakpoint — sidebar collapses to a slide-in drawer triggered by a hamburger button in the topbar. Use Motion `AnimatePresence` with `x: -224 → 0` translate for the drawer animation.

### 4.2 Buttons

Four variants. All use `transition-all duration-150` (via Motion or Tailwind transition):

**Primary (yellow):**
```
bg-[--color-yellow-400] text-[--color-bg-base] font-medium text-sm
rounded-lg px-4 h-9 inline-flex items-center gap-2
hover:bg-[--color-yellow-200] active:scale-[0.98]
```

**Secondary (dark):**
```
bg-[--color-bg-surface] text-[--color-text-primary] font-medium text-sm
border border-[--color-border-subtle] rounded-lg px-4 h-9
hover:bg-[--color-bg-hover] active:scale-[0.98]
```

**Ghost:**
```
bg-transparent text-[--color-text-muted] font-medium text-sm
border border-[--color-border-default] rounded-lg px-4 h-9
hover:text-[--color-text-primary] hover:border-[--color-border-subtle] active:scale-[0.98]
```

**Danger:**
```
bg-transparent text-[--color-red-400] font-medium text-sm
border border-[--color-red-950] rounded-lg px-4 h-9
hover:bg-[--color-red-950] active:scale-[0.98]
```

All buttons: `disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none`

**Loading state:** Replace button label with a spinning icon (`RiLoaderLine` from react-icons, `animate-spin`). Never disable+gray — show the spinner instead.

### 4.3 Badges / Status Pills

```jsx
// Yellow — infrastructure active
<span className="inline-flex items-center gap-1.5 bg-[--color-yellow-950] text-[--color-yellow-400] border border-[--color-yellow-border] rounded-full px-2.5 py-0.5 text-[11px] font-medium">
  Infrastructure active
</span>

// Green — live / online
<span className="inline-flex items-center gap-1.5 bg-[--color-green-950] text-[--color-green-400] border border-[--color-green-border] rounded-full px-2.5 py-0.5 text-[11px] font-medium">
  <span className="w-1.5 h-1.5 rounded-full bg-[--color-green-400]" />
  Online
</span>

// Muted — coming soon / inactive
<span className="inline-flex items-center gap-1.5 bg-[--color-bg-surface] text-[--color-text-disabled] border border-[--color-border-default] rounded-full px-2.5 py-0.5 text-[11px] font-medium">
  Coming soon
</span>
```

The green "live" dot should pulse: `animate-pulse` on the dot span.

### 4.4 Stat Cards

Used in the dashboard grid. 4 per row on desktop, 2 on tablet, 1 on mobile.

Structure:
```
Card (bg-surface, border-default, rounded-xl, p-5)
├── Caption label (11px, muted, uppercase, tracking)
├── Value (22px, semibold, primary — or yellow-400 for main KPI)
├── Subline (11px, muted — change indicator)
└── Progress bar (4px, rounded, bg-active → yellow-400 fill)
```

The main "Total Points" card gets `border-[--color-yellow-border] bg-[--color-yellow-950]/20` to make it visually distinct as the primary metric.

Progress bar fill color per card:
- Points: `bg-[--color-yellow-400]`
- Infra score: `bg-[--color-yellow-400]`
- Accounts: `bg-[--color-blue-400]`
- AI queries: `bg-[--color-purple-400]`

### 4.5 Form Inputs

```
bg-[--color-bg-surface] border border-[--color-border-default] rounded-lg
text-sm text-[--color-text-primary] placeholder:text-[--color-text-disabled]
px-3 h-9 w-full outline-none
focus:border-[--color-yellow-400] focus:ring-2 focus:ring-[--color-yellow-950]
transition-colors duration-150
```

For monospace fields (wallet address, API keys):
- Add `font-mono text-[12px]`

### 4.6 Social Account Connection Cards

Each social platform displayed as a card in the Infrastructure page:

```
Card (bg-raised, border-default, rounded-xl, p-4)
├── Left: Platform icon (react-icons, 20px) + platform name (label)
├── Center: Connection status badge
├── Right: Connect / Disconnect button
└── Bottom (if connected): Last synced timestamp, contribution tier
```

Platform icon colors (Tailwind arbitrary color values via CSS token):
- X/Twitter: `text-[--color-text-primary]`
- Telegram: `text-[--color-blue-400]`
- Discord: `text-[#5865F2]` — exception, brand color only here
- YouTube: `text-[--color-red-400]`

When connected, show a thin yellow left border accent: `border-l-2 border-l-[--color-yellow-400] pl-3` (adjust padding).

### 4.7 Infrastructure Mode Toggle

A prominent toggle on the dashboard and sidebar bottom:

```
Container (bg-yellow-950/30, border border-yellow-border, rounded-xl, p-4)
├── Left: Status text — "Infrastructure Mode" label + "Active / Inactive" sublabel
└── Right: Large toggle switch
```

Toggle switch: custom built — `w-12 h-6 rounded-full` track. When ON: `bg-[--color-yellow-400]`. Thumb: `w-5 h-5 rounded-full bg-[--color-bg-base]`. Animate thumb translation with Motion `animate={{ x: active ? 24 : 2 }}` with `transition={{ type: 'spring', stiffness: 500, damping: 30 }}`.

When activating: show a full-card overlay "Enrolling in network…" for 1.5s (fake progress) then confirm. This is the dramatic moment — make it feel real.

---

## 5. Page Specifications

### 5.1 Connect Page (`/connect`)

This is the entry point. No sidebar — full screen.

**Layout:** Centered card, max-w-md, on the base background. Background has a very subtle radial gradient behind the card using `bg-[--color-yellow-950]` at 5% opacity (use `bg-[radial-gradient(ellipse_at_center,_var(--color-yellow-950)_0%,_transparent_70%)]` as a pseudo-element or a behind-card div).

**Content:**
1. Logo mark — `ELYXNET` in yellow, 24px bold
2. Tagline — "Decentralized AI Infrastructure" in muted text
3. Network stats strip — 3 live stats: `12,847 nodes`, `$4.2M pts distributed`, `847K queries served` — pulled from `/api/network/stats`
4. "Connect Wallet" button (primary, full width, h-11)
5. WalletConnect modal triggers on click
6. After connect: brief success animation → redirect to `/dashboard`
7. Below button: "By connecting you agree to the network terms" in `text-[11px] text-[--color-text-disabled] text-center`

**Animation sequence on load:**
- Logo fades in: `initial={{ opacity: 0, y: -12 }}` → `animate={{ opacity: 1, y: 0 }}`
- Card fades in: delay 150ms
- Stats strip slides up: delay 300ms
- Button fades in: delay 500ms

All via Motion `motion.div`.

### 5.2 Dashboard (`/dashboard`)

**Top area:**
- Welcome line: "Good morning, `0x1a2b…4f9c`" — wallet truncated, monospace
- Network status: Live badge + "Elyxnet Network — 12,847 nodes active" caption

**Stats grid:** 4 cards (spec in 4.4 above):
- Total Points (primary — yellow accent)
- Infrastructure Score (0–100 with live indicator dot)
- Accounts Linked (X / total connected)
- AI Queries Used (this session)

**Below stats:** Two-column layout on desktop, stacked on mobile:

Left column — **Reward Growth Chart:**
- Line chart showing points accrued over last 7 days
- Use `recharts` with a `LineChart`
- Line color: `#E6B93C`
- Grid lines: `#1C1C1E`
- Axes text: `#52525B`
- Tooltip: dark background card style matching the system

Right column — **Activity Feed:**
- List of recent events: "X account synced", "Reward tick +12 pts", "AI query executed"
- Each item: icon + label + timestamp + amount badge
- Items appear with staggered `motion.div` on mount: `initial={{ opacity: 0, x: -8 }}`, staggered by 60ms per item

**Infrastructure Overview section (full width below):**
- Shows connected accounts as row of platform cards (see 4.6)
- Shows current infra mode status with the toggle (see 4.7)

### 5.3 Infrastructure Page (`/infrastructure`)

Full breakdown of the user's infrastructure contribution.

**Top:** Page heading + "Infrastructure Mode" status badge

**Stats row (3 cards):**
- Uptime percentage
- Contribution score
- Network rank (e.g. "Top 12%")

**Platform Cards grid:** 2-column on desktop. Each card for X, Telegram, Discord, YouTube (and Reddit, LinkedIn as "coming soon"):
- Connected state: yellow left border, green "Connected" badge, "Last synced: 2m ago", contribution score bar
- Disconnected state: Ghost connect button, muted badge
- Coming soon: disabled state, muted badge

**Activation Panel:**
Full-width card at bottom. If infra mode OFF: shows "Activate Infrastructure Mode" with the big toggle and description text. If ON: shows live stats — `allocated_nodes`, `coverage_percentage`, `estimated_utilization`, `uptime_streak` — updating every 30s via SWR.

### 5.4 AI Agent Page (`/agent`)

This is the most complex and most important page. It must feel premium and alive.

**Layout:**
- Left panel (60%): Chat / query interface
- Right panel (40%): Execution trace + network allocation display (sticky)

**Left panel — Query Input:**
```
Textarea (min-h-[88px], resizable-none)
bg-[--color-bg-surface] border border-[--color-border-default] rounded-xl
focus:border-[--color-yellow-400] transition-colors
text-sm font-normal text-[--color-text-primary]
placeholder: "Ask the network anything…"
```

Below textarea: row with points cost estimate (`-10 pts per query`, `text-[11px] text-muted`) + Send button (primary).

**Execution trace (right panel):**

When a query is submitted, the right panel comes alive with a real-time execution simulation driven by Server-Sent Events (SSE):

```
Panel (bg-raised, border, rounded-xl, p-5, sticky top-20)
├── Header: "Execution trace" caption label
├── Network allocation bar:
│   ├── Label: "Nodes allocated"
│   ├── Animated number counting up to target (e.g. 847)
│   └── Yellow progress bar filling over 1.2s
├── Stage list (staggered reveal):
│   ├── [✓] Allocating infrastructure nodes
│   ├── [✓] Scanning X / Twitter
│   ├── [●] Aggregating sentiment data (active — pulsing dot)
│   ├── [ ] Cross-referencing sources
│   └── [ ] Generating intelligence report
├── Metrics row: "Coverage", "Depth", "Utilization"
└── Footer: "−10 pts · Streaming…" or "−10 pts · Completed in 8.2s"
```

Execution stage dot states:
- Pending: `w-1.5 h-1.5 rounded-full bg-[--color-bg-active]`
- Active: `w-1.5 h-1.5 rounded-full bg-[--color-yellow-400] animate-pulse`
- Done: `w-1.5 h-1.5 rounded-full bg-[--color-green-400]`

Stage text transitions via Motion: `initial={{ opacity: 0, x: -6 }}` → `animate={{ opacity: 1, x: 0 }}`.

**Result output (left panel, below input):**

AI response streams token-by-token using `ReadableStream`. Display it in a result card:

```
Card (bg-surface, border, rounded-xl, p-5)
├── Header: query text (truncated, muted) + timestamp
├── Content: streamed markdown rendered via react-markdown
└── Footer: model used + tokens + points cost
```

**Query history** below the input: previous queries as collapsed cards. Clicking expands with Motion `AnimatePresence` height animation.

**Suggested queries** when idle (before first query):
```
Grid of 4 suggestion chips (2×2)
bg-[--color-bg-surface] border border-[--color-border-default] rounded-lg p-3
hover:border-[--color-border-subtle] cursor-pointer
text-[13px] text-[--color-text-secondary]
```
Examples: "Analyze Bitcoin sentiment", "Top AI projects this week", "DeFi trend report", "Layer 1 comparison"

### 5.5 Rewards Page (`/rewards`)

**Top:** Balance display — large yellow number (`text-[40px] font-bold text-[--color-yellow-400]`), subline "Total points earned", claim button (if on-chain claim is enabled, otherwise show "On-chain claims coming soon" muted badge).

**Chart:** 30-day points accrual chart (same recharts setup as dashboard).

**Breakdown table / list:**

Each reward event:
```
Row (border-b border-[--color-border-default], py-3, flex items-center gap-3)
├── Icon: colored circle (yellow for infra, blue for social connect, purple for bonus)
├── Label: "Infrastructure uptime reward"
├── Subline: timestamp
└── Right: "+48 pts" in yellow-400
```

**Reward rate panel:** Shows current rate calculation:
```
Card (bg-surface, border, rounded-xl, p-5)
├── "Your reward rate" heading
├── Formula breakdown:
│   ├── Accounts connected: × 1.0 base
│   ├── Infra score multiplier: × 1.42
│   └── Activity bonus: × 1.1
└── Result: "~348 pts / day estimated"
```

### 5.6 Network Page (`/network`)

**Global stats:** 4 cards — total nodes, total points distributed, total queries served, active contributors. All pulled from `/api/network/stats`.

**Leaderboard table:**
```
Table (w-full, text-sm)
├── Headers: Rank | Wallet | Score | Points | Accounts
├── Rows: top 20 contributors
└── "You" row highlighted with yellow-950 bg
```

**Network map placeholder:** A simple globe or world map outline SVG (static decorative element) showing "Geographic coverage" — use a world map SVG path with dots at major regions. Color: `#1C1C1E` base map, `#E6B93C` dots.

---

## 6. Micro-Animations — Full Specification

This section is critical. Every animation must feel natural — not flashy. Reference: Linear.app, Clerk.com.

### 6.1 Principles

- **Duration range:** 120ms (instant feedback) → 400ms (page transitions). Never above 500ms for UI responses.
- **Easing:** `ease-out` for entrances, `ease-in` for exits, `spring` for physical interactions (toggles, buttons, sliders)
- **Reduced motion:** All animations must respect `prefers-reduced-motion: reduce`. Use Motion's `useReducedMotion()` hook globally.
- **No continuous loops** except: the live "Online" dot pulse and the active execution stage dot. Everything else is triggered by state change.

### 6.2 Component-Level Animations

**Page transitions:**
Wrap page content in:
```jsx
<motion.div
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -4 }}
  transition={{ duration: 0.2, ease: 'easeOut' }}
>
```

**Stat cards — mount stagger:**
```jsx
<motion.div
  initial={{ opacity: 0, y: 16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.25, delay: index * 0.06, ease: 'easeOut' }}
>
```

**Number counters (stat values):**
When a stat card mounts or value updates, the number counts up from 0 (or from old value) to new value over 800ms using a custom `useCountUp` hook with `easeOut` interpolation.

```js
// useCountUp.js
import { useEffect, useState } from 'react'
export function useCountUp(target, duration = 800) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    let start = null
    const step = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
      setValue(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target])
  return value
}
```

**Infra Mode toggle activation:**
1. User clicks toggle → spring animation on thumb
2. If turning ON: 300ms pause → card content fades out → "Enrolling…" text fades in with progress bar
3. After API confirm: green checkmark animates in (scale 0→1 with spring), then transitions to "Active" state
4. Full sequence takes ~1.8s total including fake loading

**Infrastructure Mode status bar (when active):**
The progress bar on the activation panel slowly fills and refills on a loop while infra is active — `animate={{ width: ['60%', '92%', '60%'] }}` with `transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}`. This gives the visual impression of live network activity.

**Social account connect flow:**
1. Click "Connect" → button shows spinner
2. OAuth popup opens
3. On return: card slides down `y: -8 → 0`, status badge transitions from "Connect" to "Connected" with a brief green flash
4. Yellow left border appears: `scaleY: 0 → 1` over 300ms from top

**AI Agent query submit:**
1. Button press → `scale: 0.97` spring (instant)
2. Input fades to 40% opacity (disabled during execution)
3. Right panel slides in from right (if first query): `x: 24 → 0`
4. Execution stages appear one by one, each with `y: 4 → 0, opacity: 0 → 1`, 200ms between stages
5. Node count number animates up to target over 1.2s
6. Progress bar fills simultaneously
7. Streaming text appears token by token (native ReadableStream behavior — no extra animation needed, it already feels alive)
8. On completion: "Streaming…" badge transitions to "Completed in 8.2s" with a subtle green flash

**Sidebar navigation:**
Active link transition: `background-color` and `border-color` transition via `transition-all duration-150`. No sliding indicator (keep it simple).

**Topbar wallet avatar:**
On hover: `scale(1.05)` with spring. On click: small popover slides down `y: -4 → 0`.

**Reward feed items (activity feed on dashboard):**
When new items arrive (SWR revalidation): new items slide in from top with `y: -12 → 0, opacity: 0 → 1`. Old items shift down naturally.

**Leaderboard rows:**
On mount: staggered `opacity: 0 → 1` with 30ms between rows.

**Suggestion chips (AI Agent idle state):**
Mount stagger: `initial={{ opacity: 0, scale: 0.96 }}` → `animate={{ opacity: 1, scale: 1 }}`, 80ms between chips.

**Button hover micro-interaction:**
All buttons: use Tailwind `hover:scale-[1.01] active:scale-[0.98] transition-transform duration-100`. For the primary (yellow) button only: on hover, subtle `brightness-110` (Tailwind `hover:brightness-110`).

**Modal / drawer entrances:**
Sidebar mobile drawer: `x: -224 → 0` with `ease: [0.32, 0.72, 0, 1]` (swift in, eases out) over 280ms.
Any modal: `scale: 0.96 → 1, opacity: 0 → 1` over 200ms.
Backdrop: `opacity: 0 → 1` over 150ms.

**Progress bars:**
All progress bars animate their `width` on mount: `initial={{ width: '0%' }}` → `animate={{ width: targetPercent }}` over `700ms` with `ease: 'easeOut'`. Never snap to value.

**Notification / toast:**
Slide in from top-right: `x: 40 → 0, opacity: 0 → 1` over 250ms. Auto-dismiss after 4s with `x: 0 → 40, opacity: 1 → 0`.

---

## 7. Mongoose Models

### `User.js`
```js
const UserSchema = new Schema({
  walletAddress: { type: String, required: true, unique: true, lowercase: true },
  nonce: { type: String },
  joinedAt: { type: Date, default: Date.now },
  infraActive: { type: Boolean, default: false },
  infraActivatedAt: { type: Date },
  totalPoints: { type: Number, default: 0 },
  infraScore: { type: Number, default: 0, min: 0, max: 100 },
  lastHeartbeat: { type: Date },
}, { timestamps: true })
```

### `SocialAccount.js`
```js
const SocialAccountSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  walletAddress: { type: String, required: true, lowercase: true },
  platform: { type: String, enum: ['x', 'telegram', 'discord', 'youtube', 'reddit'], required: true },
  platformUserId: String,
  platformUsername: String,
  accessToken: String,          // encrypted with AES-256-GCM
  refreshToken: String,         // encrypted
  tokenExpiresAt: Date,
  connectedAt: { type: Date, default: Date.now },
  lastSyncedAt: Date,
  contributionScore: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true })
SocialAccountSchema.index({ walletAddress: 1, platform: 1 }, { unique: true })
```

### `InfraNode.js`
```js
const InfraNodeSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  walletAddress: { type: String, required: true, lowercase: true, unique: true },
  status: { type: String, enum: ['active', 'inactive', 'suspended'], default: 'inactive' },
  uptimePercent: { type: Number, default: 0 },
  contributionScore: { type: Number, default: 0 },
  accountsCount: { type: Number, default: 0 },
  lastScoreUpdate: Date,
  activeSince: Date,
  uptimeStreak: { type: Number, default: 0 },        // days
  networkRankPercent: { type: Number },               // e.g. 12 = top 12%
}, { timestamps: true })
```

### `Reward.js`
```js
const RewardSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  walletAddress: { type: String, required: true, lowercase: true },
  type: { type: String, enum: ['infra_uptime', 'social_connect', 'activity_bonus', 'ai_query_spend', 'referral'], required: true },
  amount: { type: Number, required: true },           // positive = earn, negative = spend
  description: String,
  metadata: Schema.Types.Mixed,
  epoch: String,                                       // e.g. "2024-W24"
}, { timestamps: true })
RewardSchema.index({ walletAddress: 1, createdAt: -1 })
```

### `AIQuery.js`
```js
const AIQuerySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  walletAddress: { type: String, required: true, lowercase: true },
  query: { type: String, required: true },
  result: String,
  model: String,
  pointsCost: { type: Number, default: 10 },
  tokensUsed: Number,
  completedAt: Date,
  durationMs: Number,
  status: { type: String, enum: ['pending', 'streaming', 'completed', 'failed'], default: 'pending' },
}, { timestamps: true })
```

### `NetworkSnapshot.js`
```js
const NetworkSnapshotSchema = new Schema({
  totalNodes: Number,
  activeNodes: Number,
  totalPoints: Number,
  totalQueries: Number,
  activeContributors: Number,
  snapshotAt: { type: Date, default: Date.now },
}, { timestamps: true })
```

---

## 8. API Routes

### Auth
- `GET /api/auth/nonce` — returns `{ nonce: '...' }` for a wallet address query param. Creates or finds User.
- `POST /api/auth/verify` — body `{ walletAddress, signature, nonce }`. Verifies SIWE. Issues JWT as httpOnly cookie. Returns `{ user }`.
- `POST /api/auth/logout` — clears cookie.
- `GET /api/auth/session` — returns current user from JWT cookie.

### Social
- `GET /api/social/connect/[platform]` — generates OAuth URL, redirects
- `GET /api/social/callback/[platform]` — OAuth callback, saves `SocialAccount`, redirects to `/infrastructure?connected=platform`
- `GET /api/social/list` — returns user's connected platforms `[{ platform, username, connectedAt, score }]`
- `DELETE /api/social/[platform]` — disconnects platform, soft-deletes SocialAccount

### Infrastructure
- `POST /api/infra/activate` — sets `infraActive: true`, creates/updates InfraNode
- `POST /api/infra/deactivate`
- `GET /api/infra/status` — returns InfraNode for current user
- `GET /api/infra/stats` — returns detailed stats for infra page

### Rewards
- `GET /api/rewards/balance` — returns `{ total, todayEarned }` (aggregation)
- `GET /api/rewards/history?page=1` — paginated reward ledger
- `GET /api/rewards/rate` — returns estimated daily rate calculation

### AI Agent
- `POST /api/agent/query` — creates AIQuery doc, deducts points, begins streaming response
  - Uses `ReadableStream` + SSE events for execution trace stages
  - Calls OpenRouter with streaming enabled
  - Returns both SSE stage events AND the streamed text
- `GET /api/agent/history` — last 20 queries for current user

### Network
- `GET /api/network/stats` — latest NetworkSnapshot (public, no auth)
- `GET /api/network/leaderboard` — top 50 InfraNodes with wallet + score (public)

---

## 9. Folder Structure

```
elyxnet/
├── app/
│   ├── globals.css                     # Tailwind v4 @theme config
│   ├── layout.js                       # Root layout, fonts, providers
│   ├── (connect)/
│   │   └── page.js                     # Wallet connect page (no sidebar)
│   ├── (app)/
│   │   ├── layout.js                   # App shell with sidebar
│   │   ├── dashboard/page.js
│   │   ├── infrastructure/page.js
│   │   ├── agent/page.js
│   │   ├── rewards/page.js
│   │   └── network/page.js
│   └── api/
│       ├── auth/[...]/route.js
│       ├── social/[...]/route.js
│       ├── infra/[...]/route.js
│       ├── rewards/[...]/route.js
│       ├── agent/[...]/route.js
│       └── network/[...]/route.js
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx
│   │   ├── Topbar.jsx
│   │   └── MobileDrawer.jsx
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Badge.jsx
│   │   ├── StatCard.jsx
│   │   ├── Input.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── Toggle.jsx
│   │   ├── Toast.jsx
│   │   └── Skeleton.jsx
│   ├── dashboard/
│   │   ├── RewardChart.jsx
│   │   └── ActivityFeed.jsx
│   ├── infrastructure/
│   │   ├── SocialCard.jsx
│   │   ├── InfraModePanel.jsx
│   │   └── UptimeStats.jsx
│   ├── agent/
│   │   ├── QueryInput.jsx
│   │   ├── ExecutionTrace.jsx
│   │   ├── ResultCard.jsx
│   │   ├── QueryHistory.jsx
│   │   └── SuggestionChips.jsx
│   ├── rewards/
│   │   ├── RewardFeed.jsx
│   │   └── RatePanel.jsx
│   ├── network/
│   │   ├── Leaderboard.jsx
│   │   └── GlobalStats.jsx
│   └── wallet/
│       ├── ConnectButton.jsx
│       └── WalletProvider.jsx
├── lib/
│   ├── db/
│   │   ├── mongoose.js
│   │   └── models/
│   │       ├── User.js
│   │       ├── SocialAccount.js
│   │       ├── InfraNode.js
│   │       ├── Reward.js
│   │       ├── AIQuery.js
│   │       └── NetworkSnapshot.js
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── social.service.js
│   │   ├── infra.service.js
│   │   ├── rewards.service.js
│   │   ├── agent.service.js
│   │   └── network.service.js
│   ├── middleware/
│   │   ├── withAuth.js
│   │   └── rateLimit.js
│   ├── queue/
│   │   ├── jobs/rewardCalculator.js
│   │   ├── jobs/infraScorer.js
│   │   └── worker.js
│   └── openrouter/
│       └── client.js
├── hooks/
│   ├── useCountUp.js
│   ├── useInfraStats.js
│   ├── useRewards.js
│   └── useAgent.js
├── providers/
│   ├── WalletProvider.jsx
│   └── ToastProvider.jsx
└── public/
    └── fonts/ (if self-hosting Inter)
```

---

## 10. Environment Variables

```env
MONGODB_URI=
NEXTAUTH_SECRET=
JWT_SECRET=

# WalletConnect
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=

# OpenRouter
OPENROUTER_API_KEY=
OPENROUTER_MODEL=openai/gpt-4o-mini   # default, can be overridden per query

# Social OAuth
X_CLIENT_ID=
X_CLIENT_SECRET=
X_CALLBACK_URL=

DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=
DISCORD_CALLBACK_URL=

TELEGRAM_BOT_TOKEN=

YOUTUBE_CLIENT_ID=
YOUTUBE_CLIENT_SECRET=
YOUTUBE_CALLBACK_URL=

# Encryption (for OAuth token storage)
ENCRYPTION_KEY=   # 32-byte hex string for AES-256-GCM

# Queue (Upstash or local Redis)
UPSTASH_REDIS_URL=
UPSTASH_REDIS_TOKEN=

# App
NEXT_PUBLIC_APP_URL=
```

---

## 11. Critical Notes for the Dev Team

> Read every item below before writing a single line of code.

1. **Tailwind v4 only.** No `tailwind.config.js`. No inline styles. No raw CSS outside `globals.css`. All tokens in `@theme {}`. All styling via Tailwind utility classes in JSX `className`. If you find yourself writing `style={{ color: '#E6B93C' }}`, stop and use `text-[--color-yellow-400]` instead.

2. **Motion, not framer-motion.** Import from `'motion/react'`. Do NOT `npm install framer-motion`. The package is `motion`. `import { motion, AnimatePresence } from 'motion/react'`.

3. **react-icons for all icons.** Import from the appropriate sub-package (e.g., `import { RiTwitterXLine } from 'react-icons/ri'`). Do NOT use any other icon library. Do NOT use emoji as icons. Preferred sets: `ri` (Remix Icons) for UI icons, `si` (Simple Icons) for brand icons (social platforms).

4. **UX must be pixel-perfect and responsive.** Test every component at 375px (iPhone SE), 768px (tablet), 1280px (laptop), 1440px (desktop). No horizontal overflow. No clipped text. No broken grids. The sidebar collapses correctly on mobile. Every touch target is minimum 44×44px.

5. **No TypeScript.** Plain JavaScript only. JSDoc comments for complex functions are welcome but optional.

6. **Optimistic UI everywhere.** When a user clicks "Activate Infra Mode", "Connect social", or "Submit query" — update the UI immediately, then confirm/revert based on API response. Never make users wait for a spinner before seeing progress.

7. **Streaming AI responses.** The `/api/agent/query` route MUST use `ReadableStream` with SSE encoding. The client reads via `fetch` + `ReadableStream`. Both the execution trace events AND the text stream are sent through this channel. Event format:
   ```
   data: {"type":"stage","stage":"SCANNING_X","label":"Scanning X / Twitter"}\n\n
   data: {"type":"token","content":"Bitcoin sentiment "}\n\n
   data: {"type":"done","durationMs":8200,"pointsCost":10}\n\n
   ```

8. **MongoDB connection singleton.** Use a cached connection in `lib/db/mongoose.js` to avoid exhausting Atlas connections on Vercel serverless functions. Standard pattern:
   ```js
   let cached = global.mongoose || { conn: null, promise: null }
   export async function connectDB() {
     if (cached.conn) return cached.conn
     if (!cached.promise) cached.promise = mongoose.connect(process.env.MONGODB_URI)
     cached.conn = await cached.promise
     return cached.conn
   }
   ```

9. **Auth middleware.** Create `lib/middleware/withAuth.js` as a higher-order function that wraps route handlers. It reads the JWT from `cookies().get('elyxnet_session')`, verifies with `jose`, and injects `req.user` (or throws 401). Every `/api/auth/*`, `/api/social/*`, `/api/infra/*`, `/api/rewards/*`, `/api/agent/*` route must use this middleware.

10. **Never store raw OAuth tokens.** Encrypt all `accessToken` and `refreshToken` values with AES-256-GCM before writing to MongoDB. Decrypt on read in the service layer.

11. **Reward ledger is append-only.** Never update a Reward document. Never store a mutable "balance" field. Balance = `db.rewards.aggregate([{ $match: { walletAddress } }, { $group: { _id: null, total: { $sum: '$amount' } } }])`. Points debited for AI queries are negative `amount` entries.

12. **useReducedMotion.** Wrap all Motion animations with a check:
    ```jsx
    import { useReducedMotion } from 'motion/react'
    const shouldReduce = useReducedMotion()
    // pass initial/animate/transition as undefined if shouldReduce
    ```

13. **SWR for data fetching.** Use `useSWR` from the `swr` package for all client-side data. Polling intervals: dashboard stats `refreshInterval: 30000`, activity feed `refreshInterval: 15000`, agent history `refreshInterval: 0` (manual).

14. **Error states and empty states must be designed.** Every data component needs three states: loading (skeleton), error (inline error message with retry button), and empty (illustration/message + CTA). No bare `undefined` renders. Skeleton components use `bg-[--color-bg-surface] animate-pulse rounded` shapes matching the real content layout.

15. **Typography hierarchy is sacred.** There is exactly one `text-[28px] font-bold` per page. Every page has a clear primary heading, secondary heading, and body text. No two elements at the same visual weight fighting for attention.

16. **Microservices boundary in code.** Each service in `lib/services/` should be a pure module — it takes arguments, calls DB/external APIs, returns data. It must NOT import from `next/headers`, `next/navigation`, or any Next.js-specific module. Keep it framework-agnostic so services can be extracted later.

17. **Points deduction is atomic.** When processing an AI query, deduct points and create the AIQuery document in the same logical operation. If OpenRouter fails, refund the points (create a positive Reward entry). Never deduct points for a failed query.

18. **The "simulation" must feel real.** The AI Agent execution trace is a simulation, but users should feel it's real. Stage durations should vary naturally: allocating nodes 800–1200ms, each platform scan 600–1000ms, aggregation 1200–2000ms. Add a small random jitter (±200ms) per stage. Never uniform 1s intervals — it reads as fake.

---

## 12. Build Order

1. `globals.css` — all `@theme` tokens defined first
2. `lib/db/mongoose.js` + all models
3. Auth service + API routes + `withAuth` middleware
4. WalletProvider + Connect page (test full auth flow)
5. App shell: Sidebar + Topbar + layout
6. UI primitives: Button, Badge, StatCard, Input, Toggle, ProgressBar, Skeleton
7. Social OAuth service + platform cards
8. Infrastructure service + Infra Mode toggle
9. Rewards service + dashboard chart
10. AI Agent — streaming route + ExecutionTrace + QueryInput
11. Network stats + leaderboard
12. Polish pass: animations, responsive, error states, empty states

---

*End of Elyxnet Developer Brief v1.0*