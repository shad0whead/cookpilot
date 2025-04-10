# CookPilot Frontend

This is the enhanced frontend for the CookPilot application, featuring a professional dark theme with cooking-themed illustrations and comprehensive cooking tools.

## Features

- **Professional Dark Theme UI**: Dark background with cream/amber accents and cooking-themed illustrations
- **Recipe Substitution Calculator**: Interactive tool with balance indicators for flavor, texture, and moisture
- **Cooking Temperature Guide**: Comprehensive reference organized by food categories
- **Advanced Search & Filtering**: Powerful search with multiple filtering options
- **DEV_MODE Authentication**: Built-in development bypass for testing without authentication

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm (version 7 or higher)

### Installation

1. Clone this repository or extract the provided archive
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Development

To start the development server:

```bash
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### DEV_MODE Authentication

For development and testing purposes, the application includes a DEV_MODE flag in `src/contexts/AuthContext.tsx` that bypasses authentication:

```javascript
// DEV_MODE flag - set to true for development, false for production
const DEV_MODE = true;
```

When enabled, this will:
- Auto-login with a mock user (dev@example.com)
- Display a "DEVELOPMENT MODE" indicator on the login screen
- Allow direct access to all protected routes

Set this to `false` before production deployment.

### Building for Production

To create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

## Enhanced Components

The enhanced UI components are located in the `src/components/enhanced/` directory:

- `AIComponents.jsx`: AI-powered recipe analysis and cooking assistant
- `App.jsx`: Main application component with navigation and layout
- `CookingIcons.jsx`: Custom SVG cooking-themed illustrations
- `CookingTemperatureGuide.jsx`: Comprehensive cooking temperature reference
- `CookingToolsIntegrated.jsx`: Integrated cooking tools interface
- `RecipeInteractiveComponents.jsx`: Interactive recipe cards and filters
- `RecipeSubstitutionCalculator.jsx`: Advanced ingredient substitution calculator
- `Root.jsx`: Root component with authentication flow

## Deployment

This project is configured for deployment on Vercel. The `vercel.json` file includes the necessary configuration for proper routing.

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.
