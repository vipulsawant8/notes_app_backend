# Notes App Backend

This project is a REST API for a notes application built with Node.js,
Express, and MongoDB.

The API allows users to create an account, log in, and manage personal
notes. Users can create, edit, delete, and organize notes. Notes can
also be pinned or unpinned for quick access.

Each user only has access to their own notes.

# Features

Main features included in the API:

-   User registration
-   User login
-   Email verification
-   JWT authentication
-   Create notes
-   Update notes
-   Delete notes
-   Fetch notes with pagination
-   Pin and unpin notes
-   User specific notes (data isolation)

# Tech Stack

The backend uses the following technologies:

-   Node.js
-   Express
-   MongoDB
-   Mongoose
-   JWT (JSON Web Token)
-   Zod validation
-   Pino logging
-   Helmet security
-   Express rate limiting
-   Swagger API documentation
-   Jest + Supertest for testing

# API Base URL

/api/v1

Example:

http://localhost:5000/api/v1

# Authentication

The API uses JWT authentication.

After login, a token is returned which must be sent with protected
requests.

# Auth Endpoints

Register a user
```
POST /api/v1/auth/create-account
```
Login
```
POST /api/v1/auth/login
```
Verify email
```
GET /api/v1/auth/verify-email
```

# Notes Endpoints

Create a note
```
POST /api/v1/notes
```
Get notes (with pagination)
```
GET /api/v1/notes?page=1&limit=10
```
Get a single note
```
GET /api/v1/notes/:id
```
Update a note
```
PATCH /api/v1/notes/:id
```
Delete a note
```
DELETE /api/v1/notes/:id
```

# Pin / Unpin Notes

Update Pin a note
```
PATCH /api/v1/notes/:id/update-pin
```
Pinned notes can be used to highlight important notes.

# Pagination

The API supports pagination when fetching notes.

Example request:
```
GET /api/v1/notes?page=1&limit=10
```
Example response:
```
{ "docs": \[\], "totalDocs": 45, "limit": 10, "page": 1, "totalPages": 5
}
```

Pagination is implemented using mongoose-paginate-v2.

# Environment Variables

Create a `.env` file in the project root & copy variables from .env, .env.example with your values.

# Running the Project

Install dependencies
```
npm install
```
Run development server
```
npm run dev
```
Run tests
```
npm test
```
Start production server
```
npm start
```

# API Documentation

Swagger documentation is available for testing endpoints.

Open in browser:
```
/api-docs
```

# Notes

This project was built to practice:

-   REST API development
-   JWT authentication
-   MongoDB and Mongoose
-   Pagination
-   API security
-   Backend testing

# License

ISC License