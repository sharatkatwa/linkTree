# Linktree Client

React frontend for a simple Linktree-style application. Users can browse public profiles, view profile links, log in, manage their dashboard, add/remove links, and view click analytics.

## Tech Stack

- React
- Vite
- Tailwind CSS
- React Router
- React Hook Form
- Axios

## Features

- Public profile directory
- Public profile page with user links
- Login and register pages
- Logged-in dashboard
- Add and remove links
- Click analytics summary
- Route layouts for public, auth, and dashboard pages
- Vercel SPA routing config

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

Run lint:

```bash
npm run lint
```

## API Proxy

During local development, Vite proxies API requests from:

```txt
/api
```

to:

```txt
http://localhost:3000
```

This is configured in `vite.config.js`.

## Deployment

The `vercel.json` file is configured for Vercel:

- Build command: `npm run build`
- Output directory: `dist`
- SPA fallback rewrites to `/index.html`

## Folder Structure

```txt
src/
  app/
    layouts/
    app.routes.jsx
  features/
    auth/
    dashboard/
    home/
  index.css
  main.jsx
```

## Notes

Make sure the backend server is running when testing API-connected pages locally.
