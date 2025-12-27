# Parallax Shop Backend (Prisma + Postgres)

This is a generated boilerplate for the Parallax-Shop backend using:
- Node.js + Express + TypeScript
- Postgres + Prisma
- JWT auth (access + refresh)
- Cloudinary image uploads (multer)

Setup:
1. Copy `.env.example` -> `.env` and fill values.
2. `npm install`
3. `npx prisma generate`
4. `npx prisma migrate dev --name init`
5. `npm run dev`
docker compose up -d  -------> for DB
npm run dev

