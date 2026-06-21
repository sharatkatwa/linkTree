# Linktree Server

Express and MongoDB backend for the Linktree-style application. It handles authentication, public profiles, user links, click tracking, and dashboard analytics.

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- Cookie-based auth
- Express Validator
- Morgan

## Features

- User registration and login
- HTTP-only auth cookie
- Get logged-in user profile
- Public user profile listing
- Public links by username
- Add and soft-delete links
- Track clicks on links
- Click history collection
- Clicks per day for logged-in user
- Seed script with demo users, links, and click data

## Getting Started

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/linktree
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

Run the development server:

```bash
npm run dev
```

Run in production mode:

```bash
npm start
```

## Seed Data

Seed the database with demo users, links, and click history:

```bash
npm run seed
```

The seed script clears existing users, links, and clicks before inserting fresh demo data.

Default seeded user password:

```txt
password123
```

Example seeded user:

```txt
aarav@example.com
```

## API Routes

Base path:

```txt
/api
```

Auth routes:

```txt
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

Link routes:

```txt
GET    /api/links
GET    /api/links/:username
POST   /api/links
DELETE /api/links/:id
```

Click routes:

```txt
POST /api/clicks/:linkId
GET  /api/clicks
GET  /api/clicks/perDay
```

## Folder Structure

```txt
src/
  controllers/
  db/
  middlewares/
  models/
  routes/
  seed/
  validators/
config/
server.js
```

## Notes

- The client expects the API to be available under `/api`.
- Cookies are sent with `withCredentials: true` from the frontend.
- In production, set `NODE_ENV=production` and configure `CORS_ORIGIN` with your deployed frontend URL.
