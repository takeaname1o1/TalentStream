# Job Detail Page

This directory handles the display of a specific job posting.

## Files

-   `layout.tsx`: This layout file contains the `generateStaticParams` function, which is required for static site generation. It pre-builds a page for each job ID found in the initial data, which is necessary for dynamic routes when using `output: 'export'`.

-   `page.tsx`: This page component fetches and displays the detailed information for a single job posting, identified by the `jobId` in the URL. It shows the job's title, status, tags, and provides links to view associated candidates and assessments.

## Subdirectories

-   `edit`: Contains the page for editing the job posting.
