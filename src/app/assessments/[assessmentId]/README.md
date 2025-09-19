# Assessment Detail Page

This directory handles the display of a specific assessment.

## Files

-   `layout.tsx`: This layout file contains the `generateStaticParams` function, which is required for static site generation (`output: 'export'`). It pre-builds a page for each assessment ID found in `initialAssessments`, ensuring fast load times and proper routing.

-   `page.tsx`: This page component fetches and displays the detailed information for a single assessment, identified by the `assessmentId` in the URL. It shows the assessment's title, description, and a list of all its questions and their types.
