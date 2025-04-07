# CookPilot - Professional Recipe Management Platform

CookPilot is a comprehensive recipe management platform designed specifically for professional chefs. It provides advanced features for recipe creation, scaling, ingredient substitution, nutrition calculation, and sharing.

## Features

- **Authentication System**: Secure login and signup functionality with email verification
- **Recipe Management**: Create, read, update, and delete recipes
- **Recipe Scaling**: Automatically adjust ingredient quantities based on serving size
- **Ingredient Replacement**: AI-assisted suggestions for ingredient substitutions
- **Nutrition Information**: Calculate estimated nutrition facts for recipes
- **Export & Sharing**: Share recipes with team members and clients in various formats
- **Dashboard**: Central hub with recipe statistics and quick access to tools

## Project Structure

The project is divided into two main parts:

### Frontend

- Built with React and TypeScript
- Uses React Router for navigation
- Styled with Tailwind CSS
- Firebase Authentication integration with email verification

### Backend

- Built with FastAPI (Python)
- MongoDB database integration
- RESTful API endpoints for recipe management

## Getting Started

### Prerequisites

- Node.js (v14+)
- Python (v3.8+)
- MongoDB

### Installation

1. Clone the repository
2. Set up the backend:
   ```
   cd backend
   pip install -r requirements.txt
   ```
3. Set up the frontend:
   ```
   cd frontend
   npm install
   ```

### Environment Variables

Create a `.env` file in the frontend directory with the following variables:
```
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
```

Create a `.env` file in the backend directory with the following variables:
```
MONGO_URI=your_mongodb_connection_string
```

### Running the Application

1. Start the backend server:
   ```
   cd backend
   uvicorn main:app --reload
   ```

2. Start the frontend development server:
   ```
   cd frontend
   npm start
   ```

## Email Verification

CookPilot implements a secure email verification system:

1. When users sign up, a verification email is automatically sent to their email address
2. Users must click the verification link in the email to verify their account
3. Unverified users cannot access the application features
4. Users can request a new verification email if needed
5. The system checks verification status on login and redirects unverified users to the verification screen

## Deployment

### Backend Deployment

The backend can be deployed to any platform that supports Python applications, such as:
- Heroku
- AWS Elastic Beanstalk
- Google Cloud Run
- Digital Ocean App Platform

### Frontend Deployment

The frontend can be deployed to:
- Vercel
- Netlify
- Firebase Hosting
- GitHub Pages

## Future Enhancements

- User role management with company affiliations
- Team/company workspaces
- Permissions for recipe visibility within companies
- Advanced search features
- Media management (image uploads)
- Integration with inventory management systems

## License

This project is licensed under the MIT License.
