# SocialSparks — Social Media Management Dashboard

A responsive front-end starter project for a social media management platform. Built with plain HTML, CSS and JavaScript, so it can be opened locally and deployed to GitHub Pages or Vercel.

## Features
- Responsive dashboard overview and KPI cards
- Performance chart and channel breakdown
- Content planner with weekly navigation
- Create-post modal (demo interaction)
- Social inbox UI with local demo replies
- Analytics summary and CSV export
- Media library with local image preview uploads
- Mobile navigation

## Run locally
1. Download and extract the ZIP.
2. Open `index.html` in a modern browser.
3. For a local development server, use VS Code with the Live Server extension.

## Deploy to GitHub + Vercel
1. Create a GitHub repository.
2. Upload `index.html`, `styles.css`, `script.js`, and `README.md` to the repository root.
3. In Vercel, choose **Add New → Project**, import the repository, and deploy.
4. No build command is required for this static HTML project. The output directory is the project root (`.`).

## Important: demo vs production
This is a polished front-end prototype. The sample analytics, channel connections, scheduled posts and inbox messages are demonstration data. Real publishing, account authentication, message syncing and live analytics require official platform APIs, OAuth, a secure backend, database, and approval/permissions from each social network. Never place API secrets in browser JavaScript.

## Suggested production architecture
- Frontend: React / Next.js
- Backend: Node.js API routes
- Database: PostgreSQL
- Authentication: OAuth 2.0
- Background jobs: queue for scheduled publishing
- Integrations: official Meta, LinkedIn and X developer APIs, subject to their current access policies
