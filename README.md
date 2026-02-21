# Kreditku Frontend

Vue.js TypeScript chat interface for AI-powered credit card recommendations.

## Setup

1. Install dependencies:

```bash
   npm install
```

2. (Optional) Configure API URL:

```bash
   cp .env.example .env.local
   # Edit VITE_API_URL if backend runs on different port
```

3. Run development server:

```bash
   npm run dev
```

4. Open http://localhost:5173

## Tech Stack

- Vue 3 (Composition API)
- TypeScript
- Vite
- Tailwind CSS v4
- Pinia (state management)
- Vue Router

## Features

- ChatGPT-style conversational UI
- Excel file upload (.xlsx, .xls, .csv)
- Real-time typing indicators
- Chat history sidebar
- Responsive design
