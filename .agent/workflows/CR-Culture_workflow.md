---
description: Chiang Rai Culture WebApp Development Workflow
---

# Phase 1: Infrastructure & Environment Setup (The Foundation)

Goal: Create Docker environment and project structure.

1. **Initialize Next.js Project**
   - We will use `npx` to create the Next.js app.
   - **User Action Required**: Run the following command (or approve if suggested):
   ```bash
   npx -y create-next-app@16.1.1 . --typescript --eslint --tailwind --no-src-dir --import-alias "@/*" --app
   ```
   *(Note: Ensure the directory is empty or use a subdirectory if needed. Current directory contains this workflow file, which create-next-app might tolerate or you might want to move.)*

2. **Install Dependencies**
   - Install DaisyUI and Payload CMS dependencies.
   ```bash
   npm install daisyui@5.5.14 payload@latest
   ```
   *(Note: Tailwind 4.1 might need specific install instructions if it's in beta or new release, typically part of `npm install tailwindcss@next` or similar if not standard yet. Assuming standard or user manual intervention if specific version is tricky.)*

3. **Create Docker Configuration**
   - Create `Dockerfile` with Node 25.
   - Create `docker-compose.yml`.

   **Dockerfile**:
   ```dockerfile
   FROM node:25-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   EXPOSE 3000
   CMD ["npm", "run", "dev"]
   ```

   **docker-compose.yml**:
   ```yaml
   version: '3.8'
   services:
     app:
       build: .
       ports:
         - "3000:3000"
       volumes:
         - .:/app
         - /app/node_modules
       environment:
         - MONGODB_URI=mongodb://mongo:27017/cr-culture
     mongo:
       image: mongo:latest
       ports:
         - "27017:27017"
       volumes:
         - mongo-data:/data/db
   volumes:
     mongo-data:
   ```

# Phase 2: Data Modeling with Payload CMS (The Brain)

Goal: Design database for Chiang Rai culture.

1. **Setup Payload CMS**
   - Initialize Payload config.
   - Create Collections: `Districts` (18 districts), `CulturalHeritage`, `Scholars`, `Events`, `Media`.

# Phase 3: UI/UX & Design System (The Face)

Goal: Lanna-ChiangRai Theme.

1. **Configure Tailwind & DaisyUI**
   - Set theme color to Purple (#7B2CBF) and Gold (#D4AF37).
   - Create Global Components: Navbar (Council Logo), Footer.

# Phase 4: Integration & Server-Side Rendering (The Bridge)

Goal: Connect Next.js with Payload CMS.

1. **Implement Dynamic Routes**
   - Create `/app/heritage/[slug]/page.tsx` using Server Components.
   - Fetch data from Payload CMS.

