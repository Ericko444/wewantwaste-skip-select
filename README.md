# We Want Waste Skip Selection Redesign

## Overview

*   **Purpose:** This project is a redesign of the skip selection page for We Want Waste (Skip select page), completed as a coding challenge...
*   **Key Features Implemented:**
    *   Responsive redesign of the skip selection interface.
    *   Dynamic rendering of skip options from provided data.
    *   Interactive skip selection with better visuals.
    *   Layout toggle between Grid View and Table View.
    *   Sorting functionality (e.g., by price, by size).
    *   Filtering functionality (e.g., by waste type, road permit needs).
    *   Clear "Selected Skip" summary bar.
*   **Live Demo:**
    *   `https://wewantwaste-skip-select.vercel.app/`

## Tech Stack

*   **Frontend:** React, TypeScript
*   **Styling:** Tailwind CSS
*   **Icons:** Font Awesome
*   **Build Tool:** Vite
*   **Version Control:** Git & GitHub
*   **Containerization:** Docker
*   **Deployment:** Vercel

## Getting Started / How to Run Locally


1.  **Prerequisites:** (Docker or Node >= 16)
2.  **Clone the repository:**
3.  **Build docker image:**
    ```docker build -t we-want-waste .```
4.  **Build docker image:**
    ```docker run -p 8080:3000 -e PORT=3000 we-want-waste```
5.  **Or with Node:**
    ```yarn install```
    ```yarn run dev```

## Approach & Design Choices

### Overall Architecture & Structure
*   **Component-Based Architecture:** The application was built using React and TypeScript with reusable React components.
*   **TypeScript for Type Safety:** TypeScript was used in the project to ensure type safety, improve code maintainability, and provide better autocompletion during development, reducing runtime errors.
*   **Directory Structure:** A standard React project structure was followed, separating directories like`components/`, `pages/`, `types/`,...
*   **State Management:** Local component state (`useState`) and derived state (`useMemo`) were primarily used for managing UI state (like selected layout, sort order, active filters) and processed data. For this scale of application, this approach was sufficient without needing a more complex global state manager like Redux.

### UI/UX Decisions & Improvements

*   **Modern Visual Refresh:** Used a lighter theme, new typography and color palette. 
*   **Dual View Layout (Grid & Table):** Implemented a layout toggle allowing users to switch between a visual Grid View (using `SkipCard` components) and a more data-dense Table View (`SkipTableRow`). The grid view is useful for a quick visual scan, while the table view can be used to compare specific attributes across multiple skips.
*   **Responsive Design:**
    *   **Mobile-First Considerations:** While the desktop view was a primary reference, responsive design was implemented to ensure usability on various screen sizes.
    *   **Controls & Navigation:** Header navigation and control elements (sort, filter buttons) are designed to wrap or adjust gracefully on smaller screens.
*   **Intuitive Controls:**
    *   Filter and Sort options are presented in clear dropdown menus.
    *   A "Reset" button is provided to easily clear active sort, filter, and search criteria, improving user experience when they want to start over.
    *   Visual cues (e.g., active state on layout toggle buttons) provide immediate feedback on control states.
*   **Data Presentation:**
    *   Prices are clearly displayed and include "inc. VAT" for transparency.
    *   Key skip attributes like "Allows Heavy Waste" and "Permit May Be Needed" are presented with distinct visual cues (icons and colored tags/text) for quick scannability and importance.

### Data Handling & Processing

*   **Memoization for Performance:** The `useMemo` hook is employed to calculate `processedSkips` (the list of skips to display after filtering, and sorting). This ensures that the computationally intensive processing of the skip list only re-runs when relevant dependencies (`allSkips`, `currentSort`, `activeFilters`) change, optimizing rendering performance.
*   **Data Integrity:** The original `allSkips` array is never mutated directly. Filtering and sorting operations always work on a copy of the array to maintain data integrity and ensure predictable state updates.


## Author

*   Ericko Andriamanarivo



