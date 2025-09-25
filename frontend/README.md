# GuessNumber Frontend

This is the frontend application for the GuessNumber game, built with React, Vite, TypeScript, and Tailwind CSS.

## Project Structure

The project follows a domain-driven architecture to ensure scalability and maintainability.

- `src/app`: Core application setup (routing, providers, entry point).
- `src/core`: Shared, reusable, non-domain-specific code (UI components, hooks, utils).
- `src/domain`: Business logic encapsulated by domain. Each domain has its own components, hooks, services, etc.
- `src/pages`: Page components that are mapped to routes. They orchestrate components from `core` and `domain`.
- `src/assets`: Static assets like styles and images.

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository.
2. Navigate to the `frontend` directory.
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

To start the development server, run:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run lint`: Lints the codebase.
- `npm run preview`: Serves the production build locally.
- `npm run test`: Runs tests in watch mode.
- `npm run test:ui`: Runs tests with the Vitest UI.
- `npm run coverage`: Generates a test coverage report.
