# Kanban Board Components

This directory contains components used to build the interactive Kanban board for tracking candidates.

## Files

-   `kanban-board.tsx`: The main component that orchestrates the entire board. It fetches candidate data from local storage, manages the drag-and-drop state, and renders a `KanbanColumn` for each stage in the hiring pipeline.

-   `kanban-card.tsx`: Represents a single candidate card on the board. It is draggable and displays the candidate's avatar, name, and current job title. It also includes a dropdown menu for actions like viewing the candidate's full profile.

-   `kanban-column.tsx`: Represents a single vertical column on the board (e.g., "Applied", "Interview"). It displays the stage title, the count of candidates in that stage, and renders the list of `KanbanCard` components. It also handles the drop event to update a candidate's stage.
