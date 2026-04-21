# Experiment 9: Secure & Scalable Full Stack System

## Overview

This experiment demonstrates a secure, scalable full-stack application using Spring Boot backend with React frontend, integrating Spring Security, OAuth 2.0 (Google Login), Role-Based Access Control (RBAC), JPA database optimization, and CORS for frontend-backend integration.

## Features Implemented

### Backend (Spring Boot)

- **Spring Security**: Configured with filter chains for authentication and authorization
- **OAuth 2.0 Authentication**: Google Login integration
- **Role-Based Access Control (RBAC)**: USER and ADMIN roles with method-level security
- **JPA Database Optimization**: Entity relationships, custom queries, and H2 in-memory database
- **CORS Configuration**: Allows requests from React frontend (localhost:5173)

### Frontend (React)

- Simple UI with buttons to test different API endpoints
- Axios for HTTP requests with credentials
- Login redirect to backend OAuth

## Project Structure

```
experiment_9/
├── client/          # React frontend
│   ├── src/
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
└── server/          # Spring Boot backend
    ├── src/main/java/com/example/experiment9/
    │   ├── Experiment9Application.java
    │   ├── config/SecurityConfig.java
    │   ├── controller/HelloController.java
    │   ├── entity/User.java
    │   ├── repository/UserRepository.java
    │   └── service/UserService.java
    ├── src/main/resources/application.properties
    └── pom.xml
```

## Setup Instructions

### Backend Setup

1. Navigate to `experiment_9/server`
2. Configure Google OAuth:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs: `http://localhost:8080/login/oauth2/code/google`
   - Update `application.properties`:
     ```
     spring.security.oauth2.client.registration.google.client-id=YOUR_CLIENT_ID
     spring.security.oauth2.client.registration.google.client-secret=YOUR_CLIENT_SECRET
     ```
3. Run the application:
   ```bash
   mvn spring-boot:run
   ```
   Server starts on http://localhost:8080

### Frontend Setup

1. Navigate to `experiment_9/client`
2. Install dependencies (already done):
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   Frontend runs on http://localhost:5173

## API Endpoints

- `GET /api/public` - Public access
- `GET /api/user` - Requires USER role
- `GET /api/admin` - Requires ADMIN role
- `GET /api/users` - Admin only: Get all users
- `POST /api/users` - Admin only: Create user

## Testing the Application

1. Open http://localhost:5173
2. Click "Call Public API" - Should work without login
3. Click "Login with Google" - Redirects to Google OAuth
4. After login, try "Call User API" - Should work for authenticated users
5. For admin access, login with email ending in "@admin.com" (as per SecurityConfig)

## Database

- Uses H2 in-memory database
- Access H2 console at http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:testdb`
- Username: `sa`, Password: `password`

## Security Features

- OAuth 2.0 with Google
- Session-based authentication
- Role-based authorization
- CORS enabled for frontend
- CSRF protection disabled for simplicity (not recommended for production)

## Notes

- For production, use proper database, enable CSRF, configure HTTPS
- Role assignment is simplified (based on email domain)
- Add proper error handling and UI feedback
