# Candidate Components

This directory contains components for managing and displaying candidate information.

## Files

-   `candidate-form.tsx`: A form component used for both creating new candidates and editing existing ones. It uses `react-hook-form` and `zod` for validation and handles form submission logic.

-   `candidate-list-skeleton.tsx`: A skeleton loading component that mimics the structure of the `CandidateList` table. It's displayed via `Suspense` while the actual candidate data is being fetched, providing a better user experience.

-   `candidate-list.tsx`: A feature-rich client component that displays a paginated, searchable, and filterable table of all candidates. It includes functionality for moving candidates between stages and deleting them.

-   `candidate-notes.tsx`: A component for displaying, adding, editing, and deleting notes for a specific candidate. It uses the `useNotes` hook to manage note state in local storage.

-   `candidate-stage-timeline.tsx`: A visual component that displays a timeline of the hiring process, highlighting the candidate's current stage and marking previous stages as complete.
