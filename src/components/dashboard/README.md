# Dashboard Components

This directory contains components specifically designed for the main dashboard page.

## Files

-   `candidates-by-stage-chart.tsx`: A client component that renders a bar chart visualizing the number of candidates in each stage of the hiring pipeline. It uses the `recharts` library for charting.

-   `db-controls.tsx`: A utility component for development that provides buttons to "Seed" and "Clear" the local database (`localStorage`). This allows for easy testing with a large dataset or starting from a clean slate.

-   `recent-activities.tsx`: A component that displays a feed of recent user actions, such as moving a candidate or creating a job. It uses the `useActivities` hook to fetch and display the data.

-   `stat-card.tsx`: A reusable component for displaying a single statistic on the dashboard (e.g., "Active Jobs", "Total Candidates"). It includes a title, a value, an icon, and an optional description.
