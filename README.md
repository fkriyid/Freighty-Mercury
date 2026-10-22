# FREIGHTY MERCURY Web App

Pricing dashboard for freight forwarding: update vendor pricing like exchange rates, compare Incoterms, and calculate total shipment cost automatically.

Designed in Figma Make, built with React + TypeScript + Tailwind CSS.

**Live demo:** _add your Vercel / Netlify / GitHub Pages link here_

## Features

- **Dashboard**: overview of active quotes, average quote value, shipments, and recent quotes
- **Incoterms database**: search and compare EXW, FOB, CIF, DDP and more with cost-responsibility breakdowns
- **Exchange rates**: live-style currency dashboard with weekly trends (Recharts)
- **Cost calculator**: total shipment cost using current exchange rates
- **Vendor database**: manage vendors and pricing
- **Help page**, **dark mode**, and a demo login screen

> Demo login: any email and password works. All data is mock/sample data; there is no backend.

## Tech stack

React 18 · TypeScript · Vite · Tailwind CSS v4 · Radix UI / shadcn-ui · Recharts · Lucide icons

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build     # output in /dist
npm run preview   # preview the production build
```

## Deploy

- **Vercel / Netlify**: import the repo. Framework preset: Vite, build command `npm run build`, output `dist`.
- **GitHub Pages**: Repo Settings → Pages → Source: *GitHub Actions*. The included workflow deploys on every push to `main`.

## Credits

UI components from [shadcn/ui](https://ui.shadcn.com/) (MIT). See `ATTRIBUTIONS.md`.
