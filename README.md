# GoDaddy GitHub Repositories Viewer

This is a simple React application, built with Vite, that fetches and displays a list of GoDaddy's public repositories from the GitHub API. Users can click on a repository to view more detailed information.

## Features

* Displays a list of GoDaddy's GitHub repositories.
* Blazing fast development server and HMR powered by Vite.
* Click on a repository to see a detailed view.
* **Reusable `useFetch` hook** for clean and maintainable data fetching.
* Detailed view includes:
    * Title and Description
    * Link to the repository
    * Primary programming language
    * Forks, open issues, and watchers counts

## How to Install and Run

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/xyfer17/godaddy-assessement.git](https://github.com/xyfer17/godaddy-assessement.git)
    cd godaddy-assessement
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This will open the application in your default browser at `http://localhost:5173` (the port may vary).

4.  **Run tests:**
    ```bash
    npm run test
    ```

## Core Technologies

* **Vite:** A next-generation frontend tooling that provides a faster and leaner development experience.
* **React:** For building the user interface.
* **`useFetch` (Custom Hook):** A reusable hook located in `src/hooks/` that encapsulates all data-fetching logic, including loading, error, and data states. It makes components cleaner and follows modern React best practices.
* **axios:** For making HTTP requests to the GitHub API within our custom hook.
* **react-router-dom:** For handling client-side routing.
* **Vitest & React Testing Library:** For running fast, modern unit and component tests.

## Aspects Skipped or Simplified

* **Styling:** The styling is clean but minimal. A real-world app might use a UI library (like Material-UI) or a CSS framework (like Tailwind CSS).
* **Data Caching/State Management:** Our `useFetch` hook re-fetches data whenever a component mounts or the URL changes. For a production app, you might want to cache API responses to avoid redundant network calls. Libraries like `React Query (TanStack Query)` or `SWR` are excellent, powerful hooks that provide caching, revalidation, and much more out of the box.
* **Pagination/Infinite Scrolling:** The app fetches all repos at once. For performance, a production app should use pagination or an infinite scroll mechanism to load data on demand.