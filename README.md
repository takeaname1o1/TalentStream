# TalentStream

TalentStream is a Next.js application designed to streamline and manage your hiring process, from job postings to candidate tracking. It features a modern tech stack, a component-based architecture, and integrated AI capabilities.

## Tech Stack

This project is built with a modern, performant, and scalable tech stack:

-   **Framework**: [Next.js](https://nextjs.org/) (v15) with App Router
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **UI Library**: [React](https://react.dev/) (v18)
-   **Component Library**: [ShadCN/UI](https://ui.shadcn.com/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **AI Integration**: [Genkit](https://firebase.google.com/docs/genkit)
-   **Form Management**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for validation
-   **Icons**: [Unicons](https://iconscout.com/unicons)
-   **Data Fetching/State**: Client-side state is managed with React hooks and `localStorage`.

## Project Structure

The project follows a standard Next.js App Router structure. Key directories include:

-   `/src/app`: Contains all the routes, pages, and layouts. Each route has its own folder with a `page.tsx` file.
    -   `layout.tsx`: The root layout for the entire application.
    -   `globals.css`: Global styles and Tailwind CSS theme configuration.
-   `/src/components`: Contains all React components, organized by feature (e.g., `dashboard`, `candidates`, `jobs`).
    -   `/ui`: Core, reusable UI components from ShadCN (Button, Card, etc.).
-   `/src/lib`: Contains utility functions (`utils.ts`), type definitions (`types.ts`), and initial data (`data.tsx`).
-   `/src/hooks`: Custom React hooks for managing state and side effects (e.g., `useLocalStorage`, `useActivities`).
-   `/src/ai`: Contains all Genkit-related code for generative AI features, organized into `flows`.
-   `/public`: Static assets like images and fonts.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (version 18 or later recommended) and npm installed on your machine.

### Installation & Setup

1.  **Clone the repository** (if you haven't already):
    ```bash
    git clone <your-repository-url>
    cd TalentStream
    ```

2.  **Install dependencies**:
    This command will install all the necessary packages for the project.
    ```bash
    npm install
    ```

3.  **Run the development server**:
    This starts the application in development mode.
    ```bash
    npm run dev
    ```

4.  **Open your browser**:
    Navigate to [http://localhost:9002](http://localhost:9002) to see your application in action.

## Available Scripts

In the project directory, you can run:

-   `npm run dev`: Runs the app in development mode.
-   `npm run build`: Builds the app for production.
-   `npm start`: Starts the production server (after building).
-   `npm run lint`: Lints the code for errors and style issues.

## Core Concepts

### State Management

The application primarily uses client-side state management for this prototype.

-   **Local Storage**: The `useLocalStorage` hook is the foundation for data persistence. It stores data for candidates, jobs, assessments, and activities as JSON in the browser's local storage.
-   **Custom Hooks**: Feature-specific hooks like `useCandidates`, `useJobs`, and `useAssessments` abstract the interaction with `localStorage`, providing a simple API for components to consume and update data.

### Styling

-   **ShadCN/UI**: Components are built on top of unstyled primitives from Radix UI.
-   **Tailwind CSS**: Utility classes are used for all styling. The theme (colors, fonts, radius) is configured in `src/app/globals.css` using CSS variables, allowing for easy customization.
-   **Fonts**: The application uses `Inter` for body text and `Space Grotesk` for headlines, imported from Google Fonts in the root layout.

### AI Features

Generative AI functionality is powered by **Genkit**.

-   **Flows**: AI logic is organized into "flows" located in the `/src/ai/flows` directory. A flow is a server-side function that can call language models (like Gemini), define tools, and manage complex AI-driven tasks.
-   **Genkit Configuration**: The core Genkit instance is configured in `/src/ai/genkit.ts`.
-   **Development UI**: You can run the Genkit development server with `npm run genkit:dev` to test and debug your AI flows in a separate UI.
