# Job Components

This directory contains components for managing and displaying job postings.

## Files

-   `job-form.tsx`: A form used for both creating and editing job postings. It uses `react-hook-form` for state management and `zod` for validation. The form includes fields for the job title, status, and tags.

-   `job-list.tsx`: A client component that displays a paginated and filterable table of all job postings. It allows users to filter jobs by title and status, and provides actions for each job, such as viewing details, editing, and deleting.
