
---

# [TalentStream](https://talent-stream-73jx.vercel.app/)

TalentStream is a **Next.js application** designed to streamline and manage your hiring process — from job postings to candidate tracking. It features a modern tech stack, a component-based architecture, and integrated AI capabilities.

---

## 🚀 Live Demo

👉 [**Open TalentStream App**](https://talent-stream-73jx.vercel.app/)

---

## 🛠 Tech Stack

This project is built with a modern, performant, and scalable tech stack:

* **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **UI Library**: [React 18](https://react.dev/)
* **Component Library**: [ShadCN/UI](https://ui.shadcn.com/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Form Management**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
* **Icons**: [Unicons](https://iconscout.com/unicons)
* **Data Layer**: React hooks + `localStorage`

---

## 📂 Project Structure

* `/src/app` – Routes, layouts & pages (`layout.tsx`, `globals.css`)
* `/src/components` – Feature-based components (`dashboard`, `candidates`, `jobs`)

  * `/ui` – Reusable ShadCN UI primitives (Button, Card, etc.)
* `/src/lib` – Utilities (`utils.ts`), types (`types.ts`), and seed data (`data.tsx`)
* `/src/hooks` – Custom hooks (`useLocalStorage`, `useActivities`, etc.)
* `/src/ai` – Genkit AI flows
* `/public` – Static assets

---

## ⚡ Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) v18+
* npm

### Setup

```bash
# Clone the repository
git clone https://github.com/takeaname1o1/TalentStream.git
cd TalentStream

# Install dependencies
npm install

# Run development server
npm run dev
```

👉 Open [http://localhost:9002](http://localhost:9002) in your browser.

---

## 📜 Scripts

* `npm run dev` – Start dev server
* `npm run build` – Build for production
* `npm start` – Run production build
* `npm run lint` – Lint code

---

## 💡 Core Concepts

### State Management

* **Local Storage** – Persistent JSON storage for candidates, jobs, assessments, activities
* **Custom Hooks** – `useCandidates`, `useJobs`, `useAssessments` abstract `localStorage` access

### Styling

* **ShadCN/UI** – Radix UI primitives wrapped in styled components
* **Tailwind CSS** – Utility-first styling with theme vars in `globals.css`
* **Fonts** – [Inter](https://fonts.google.com/specimen/Inter) (body) + [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) (headings)

---

