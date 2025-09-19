# UI Components (ShadCN)

This directory contains the generic, reusable UI components that form the building blocks of the application's interface. These components are based on the [ShadCN/UI](https://ui.shadcn.com/) library.

They are unstyled primitives that are then styled using Tailwind CSS and your application's design tokens defined in `src/app/globals.css`.

## Key Components

-   `button.tsx`: For clickable actions.
-   `card.tsx`: For content containers.
-   `input.tsx`: For user text input.
-   `table.tsx`: For displaying tabular data.
-   `dialog.tsx`: For modal pop-ups.
-   `dropdown-menu.tsx`: For creating dropdown menus.
-   `form.tsx`: Provides helpers for building forms with `react-hook-form`.
-   `sidebar.tsx`: A custom, more advanced component built for this app to provide a collapsible sidebar, which is not part of the standard ShadCN library.

...and many others that provide the foundation for the application's look and feel.
