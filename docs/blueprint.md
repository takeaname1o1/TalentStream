# **App Name**: TalentStream

## Core Features:

- Job Listing & Filtering: Display a paginated and filterable list of jobs (title, status, tags).
- Candidate Management: Manage candidates, with search and filter options, to track them along various stages.
- Assessment Builder: Design and create assessments for jobs, including Single/Multi-choice, Short/Long text, Numeric range and File upload question types.
- Interactive Kanban Board: Visualize candidates in a Kanban board to easily transition them through different stages via drag and drop.
- Dashboard Overview: Display key metrics like active/archived jobs, candidates by stage, and recent activities.
- Refresh Safe State: Store state locally (IndexedDB) to allow continued work through a page refresh

## Style Guidelines:

- Primary color: Indigo (#4F46E5) to represent professionalism and clarity.
- Background color: Light gray (#F9FAFB), providing a clean and unobtrusive backdrop.
- Accent color: Purple (#8B5CF6) for interactive elements and highlights, contrasting with the primary color.
- Font pairing: 'Space Grotesk' sans-serif for headings and short chunks of text and 'Inter' sans-serif for body text. 'Source Code Pro' is suggested to present blocks of code, but this is outside of the default 'headline and body' pairing. Note: currently only Google Fonts are supported.
- Cards with rounded corners and soft shadows to group information logically and add depth.
- Loading skeletons with shimmer effects to provide feedback during data loading and artificial latency.