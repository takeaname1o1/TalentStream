# Lib Directory

This directory contains library code, utilities, type definitions, and shared data for the application.

## Files

-   `data.tsx`: Contains initial seed data for the application, such as initial jobs, candidates, and assessments. This data is used to populate local storage when the app is first run or when the database is seeded.

-   `placeholder-images.json`: A JSON file that stores data for placeholder images used throughout the app, including image URLs and AI hints for generating real images later.

-   `placeholder-images.ts`: A TypeScript file that imports the JSON data and exports it as a typed array, making it easy and safe to use in the application.

-   `types.ts`: This file contains all the core TypeScript type definitions and enums used across the application (e.g., `Candidate`, `Job`, `Stage`, `Assessment`). Centralizing types here makes them easy to manage and import.

-   `utils.ts`: A utility file that contains helper functions. Currently, it includes the `cn` function from `tailwind-merge` and `clsx`, which is used to conditionally combine and merge Tailwind CSS class names.
