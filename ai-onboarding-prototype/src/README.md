This directory contains the source code of the web frontend application.

## Directory Structure

```sh
.
├── api/
├── components/
├── layouts/
├── routes/
├── states/
├── styles/
│   ├── partials/
│   └── app.css
├── types/
├── utils/
├── App.tsx
├── main.tsx
└── routes.ts
```

## Main Subdirectories

- **`api`:** Stores API functions used within the application. These functions are used to fetch data from the backend.
- **`components`:** Stores reusable components used within the application. These components are not dependent on any specific domain or business logic, so they can be used from anywhere within the `src/` directory.
- **`layouts`:** Stores layout components used within the application. Components that affect the overall layout, such as headers and footers, are also placed here.
- **`routes`:** Stores components that are passed to the `Route` component of React Router to be displayed as pages.
- **`states`:** Stores state management logic used within the application. This directory contains the global state management logic, such as the context API.
- **`styles`:** Stores CSS files used within the application. The `partials/` directory contains CSS files that are imported into the `app.css` file.
- **`types`:** Stores TypeScript type definitions used within the application.
- **`utils`:** Stores utility functions used within the application.

## Main Files

- **`app.css`:** The global CSS file for the application. It defines reset CSS and common styles.
- **`App.tsx`:** The main component of the application. It handles the routing information and links components within the application.
- **`main.tsx`:** The entry point file of the application. It loads global CSS and defines the entry point for React.
- **`routes.ts`:** Defines the routing paths used within the application.
