# Custom Hooks

This directory contains custom React hooks that encapsulate and manage reusable stateful logic across the application.

## Files

-   `use-activities.ts`: Manages the list of recent activities. It provides the activities array and a function to add a new activity, storing the data in local storage.

-   `use-assessments.ts`: A simple hook to manage the state of assessments, persisting them to local storage via `use-local-storage`.

-   `use-jobs.ts`: Manages the state of job postings, persisting them to local storage via `use-local-storage`.

-   `use-local-storage.ts`: A generic hook that abstracts the logic for reading from and writing to the browser's `localStorage`. It's a client-side hook that handles serialization and deserialization of data.

-   `use-mobile.tsx`: A hook that detects if the application is being viewed on a mobile-sized screen based on the window width.

-   `use-notes.ts`: Manages the state of notes for candidates. It provides functions to add, update, and delete notes for a specific candidate, storing all notes in a single `localStorage` item.

-   `use-toast.ts`: A hook for displaying toast notifications. It provides a `toast` function to trigger notifications from anywhere in the app.
