# CRMPilot

> AI-Powered CRM with Intelligent Sales Insights

CRMPilot is a modern customer relationship management platform that integrates AI-driven lead scoring, deal pipeline management, revenue forecasting, and email tracking into a unified sales workspace.

## Features

- **Sales Dashboard** -- Pipeline value, won deals, weighted forecasts, and hot leads at a glance
- **AI Lead Scoring** -- Automatic contact scoring with engagement and intent analysis
- **Contact Management** -- Searchable contact database with detailed profiles and tags
- **Deal Pipeline** -- Kanban-style pipeline with AI-generated insights per deal
- **Email Integration** -- Track email opens, replies, and engagement metrics
- **Revenue Forecasting** -- Best/most-likely/worst-case projections with AI commentary
- **Dashboard Builder** -- Customizable widget-based dashboard creation
- **AI Insights** -- Contextual recommendations for each deal and contact

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **AI:** OpenAI API
- **State Management:** Zustand
- **Notifications:** react-hot-toast
- **Date Utilities:** date-fns

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your SUPABASE_URL, SUPABASE_ANON_KEY, and OPENAI_API_KEY

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
  app/
    page.tsx              # Main CRM application (all tabs)
  components/             # UI components
  lib/                    # Supabase client, utilities
```

## License

MIT
