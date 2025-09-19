# Candidate Profile Page

This directory handles the display of a specific candidate's profile.

## Files

-   `layout.tsx`: This layout file contains the `generateStaticParams` function, which is necessary for static site generation (`output: 'export'`). It pre-builds pages for each candidate ID, which is crucial for the build process to succeed with dynamic routes.

-   `page.tsx`: This page component fetches and displays the detailed profile for a single candidate, identified by `candidateId`. It shows the candidate's avatar, name, job title, application date, contact information, hiring stage timeline, and notes.

## Subdirectories

-   `edit`: Contains the page for editing the candidate's profile.
