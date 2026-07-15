# JALA Connect / JALA Admin

React frontend and Express backend are kept in the same repository, but deploy as separate services.

## Frontend deployment

Use the `client` folder as the frontend project root.

- Framework: Vite
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`
- Local dev: `npm run dev`

Default admin login shown on `/admin`:

- Email: `admin@jalaacademy.com`
- Password: `Admin@123`

## Backend deployment

Use the `server` folder as the backend project root.

- Runtime: Node.js
- Install command: `npm install`
- Start command: `npm start`
- Health check: `/health`

Create environment variables from `server/.env.example` in the hosting dashboard.
Do not commit real `.env` files.

