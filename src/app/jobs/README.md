# Jobs Root

This directory contains the pages for managing job postings.

## Files

-   `page.tsx`: This is the main page for the `/jobs` route. It displays a header with an "Add Job" button and renders the `JobList` component. It uses a `Suspense` boundary to show a loading spinner while the job data is being fetched.

## Subdirectories

-   `[jobId]`: Contains the dynamic route for a specific job's details.
-   `new`: Contains the page for creating a new job posting.
