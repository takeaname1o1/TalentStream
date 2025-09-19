# Edit Job Page

This directory contains the page for editing an existing job posting.

## Files

-   `layout.tsx`: This layout file implements `generateStaticParams`, which is necessary for Next.js to pre-build the edit pages for each existing job during the static export process.

-   `page.tsx`: This page renders the `JobForm` component in "edit" mode. It uses the `jobId` from the URL to fetch the existing job's data and pre-populate the form, allowing a user to update the job's title, status, and tags.
