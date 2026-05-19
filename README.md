# Hare Krishna Temple Avadi — Website

Public-facing website for the Hare Krishna Temple in Avadi. Built to handle events, festival calendar, photo gallery, donations, and seva offerings, with a small admin panel for the temple's volunteers to manage content without touching code.

Live use-case: visitors can read about programs, see upcoming festivals, view the gallery, donate, and submit seva offerings; volunteers log in to upload event photos, post updates, and review submissions.

## Features

- **Events & festival calendar** — upcoming events with carousel; Hindu calendar integration for festivals like Janmashtami, Rama Navami, Govardhan Puja.
- **Photo gallery** — managed via ImageKit, with admin upload from the temple dashboard.
- **Donation flow** — donation form with multiple amount tiers, donor info capture, and Google Sheets-backed receipt logging.
- **Seva / service offerings** — visitors can sponsor specific temple services (annadan, deity dressing, festival sponsorship, etc.).
- **Volunteer admin panel** — protected admin routes for managing events, gallery uploads, and reviewing donation/seva submissions.
- **Privacy, terms, and cookie consent** — full set of compliance pages for a public-facing site.

## Tech stack

| Layer | Tech |
|---|---|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS |
| Backend | Supabase (Postgres + Auth + Edge Functions) |
| Images | ImageKit CDN with on-the-fly transformations |
| Forms | Google Apps Script + Google Sheets for receipts |
| Hosting | Vercel |

## Getting started

```bash
# Install
npm install

# Configure
cp .env.example .env
# Fill in Supabase + ImageKit credentials

# Run dev server
npm run dev
```

Required env vars (see `.env.example` for the full list):

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_IMAGEKIT_PUBLIC_KEY=
VITE_IMAGEKIT_URL_ENDPOINT=
```

## Project structure

```
src/
├── App.tsx
├── main.tsx
├── components/
│   ├── Hero.tsx
│   ├── Events.tsx
│   ├── EventCarousel.tsx
│   ├── FestivalCalendar.tsx
│   ├── Gallery.tsx
│   ├── Donation.tsx
│   ├── OfferService.tsx
│   ├── Programs.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── PrivacyPolicy.tsx
│   ├── TermsOfService.tsx
│   ├── CookieConsent.tsx
│   └── admin/
│       ├── AdminLogin.tsx
│       ├── AdminDashboard.tsx
│       ├── AdminPage.tsx
│       └── DonationForm.tsx
└── lib/                  # Supabase + ImageKit clients
supabase/
├── functions/            # Edge functions
└── migrations/           # Database schema
```

## Deployment

Deploys to Vercel on push to `main`. Supabase edge functions deploy via `npx supabase functions deploy`. ImageKit credentials are stored as Vercel env vars (not in the repo).

## License

MIT — see [LICENSE](./LICENSE).
