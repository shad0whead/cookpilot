# CookPilot Enhanced Frontend

This is the enhanced version of the CookPilot frontend with improved visual identity, AI features, and additional functionality.

## Features

- **Professional Visual Design**:
  - Dark theme with cream-colored cards and amber accents
  - Custom cooking-themed SVG illustrations (egg, whisk, cupcake, bowl, etc.)
  - Consistent typography with font-display class and tracking-wide for headings

- **AI Features**:
  - Prominent AI Insights toggle on dashboard
  - AI Recipe Analysis with flavor profiles, nutrition insights, and cooking tips
  - AI Cooking Assistant chat interface for recipe questions
  - AI Substitution Analysis with visual balance indicators

- **Account Profile**:
  - Complete user account screen showing profile information
  - Organization/team affiliation for future recipe access scoping
  - Cooking preferences with dietary restrictions and cuisine preferences

- **Smart Cooking Tips**:
  - Contextual cooking tips based on season and user preferences
  - Category-based navigation (Seasonal, Technique, Ingredient, Equipment)
  - Personalized recommendations based on cooking history

- **Development Features**:
  - DEV_MODE authentication bypass for testing without login barriers
  - Mock user (dev@example.com) auto-login functionality
  - Toggle for production deployment

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm 6.x or higher

### Installation

1. Extract the archive to your project directory:
   ```
   tar -xzvf cookpilot_enhanced_frontend.tar.gz -C ./your-project-directory
   ```

2. Navigate to the project directory:
   ```
   cd your-project-directory
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Build for production:
   ```
   npm run build
   ```

## Development Mode

The application includes a DEV_MODE flag in `src/contexts/AuthContext.jsx` that allows bypassing authentication during development. When enabled, it automatically logs in with a mock user account.

To toggle DEV_MODE:

1. Open `src/contexts/AuthContext.jsx`
2. Find the `DEV_MODE` constant at the top of the file
3. Set it to `true` for development or `false` for production

```javascript
// At the top of AuthContext.jsx
const DEV_MODE = true; // Set to false for production
```

## Project Structure

- `public/` - Static assets and HTML template
- `src/` - Source code
  - `components/` - React components
    - `auth/` - Authentication components
    - `enhanced/` - Enhanced UI components with cooking-themed illustrations
  - `contexts/` - React context providers
  - `utils/` - Utility functions and Firebase configuration

## Key Components

- `Dashboard.jsx` - Main dashboard with AI insights toggle
- `AIComponents.jsx` - AI-powered features and insights
- `AccountProfile.jsx` - User profile and settings
- `CookingTipsSection.jsx` - Contextual cooking tips
- `CookingIcons.jsx` - Custom cooking-themed SVG illustrations

## Deployment

This frontend is ready for deployment to Vercel, Netlify, or any other static site hosting service. The Firebase configuration is already set up for authentication.

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.
