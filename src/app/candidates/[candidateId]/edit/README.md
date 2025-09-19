# Edit Candidate Page

This directory contains the page for editing an existing candidate's profile.

## Files

-   `layout.tsx`: This layout is essential for static site generation. It implements `generateStaticParams` to ensure that Next.js can pre-build the edit pages for each candidate that exists in the initial data set.

-   `page.tsx`: This page renders the `CandidateForm` component in "edit" mode. It fetches the existing candidate's data based on the `candidateId` from the URL and pre-populates the form fields, allowing a user to update the candidate's information.
