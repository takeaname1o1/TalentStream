# App Directory

This is the root of the Next.js App Router. It contains the main entry points for your application's pages and layouts.

## Files

-   `globals.css`: This file contains the global styles for the application, primarily using Tailwind CSS directives and defining the base theme variables (colors, radius, etc.) for the ShadCN UI components.

-   `layout.tsx`: This is the root layout for the entire application. It defines the main HTML structure, including the `<html>` and `<body>` tags. It wraps all pages and is used to provide global context providers (like `SidebarProvider` and `Toaster`), import global stylesheets, and define metadata.

-   `page.tsx`: This file corresponds to the root URL (`/`) of your application and serves as the main dashboard page. It displays key statistics, charts, and recent activities.
