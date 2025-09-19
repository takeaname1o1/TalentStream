# Layout Components

This directory contains the high-level layout components that define the main structure of the application's UI.

## Files

-   `header.tsx`: The main application header component. It's displayed at the top of every page and includes the page title, a global search bar, a notifications button, and a user profile dropdown menu. On mobile, it also includes the trigger to open the sidebar.

-   `main-sidebar.tsx`: The primary navigation component for the application. It's a collapsible sidebar that contains links to all the main pages (Dashboard, Jobs, Candidates, etc.). It uses the custom `Sidebar` component from `src/components/ui/sidebar.tsx`.
