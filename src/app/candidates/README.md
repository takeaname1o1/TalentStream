# Candidates Root

This directory contains the pages for managing candidates.

## Files

-   `page.tsx`: This is the main page for the `/candidates` route. It displays the `CandidateList` component, which provides a searchable and filterable table of all candidates in the system. It uses a `Suspense` boundary to show a skeleton loader while the candidate data is being loaded.

## Subdirectories

-   `[candidateId]`: Contains the dynamic route for a specific candidate's profile.
-   `new`: Contains the page for adding a new candidate.
