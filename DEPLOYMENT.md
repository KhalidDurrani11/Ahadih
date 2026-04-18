# AHAD International Hospital - Deployment Guide

This application is built with Next.js App Router and Prisma with a Neon PostgreSQL database.

## Prerequisites
- A Vercel Account
- Neon PostgreSQL Account
- Git Repository for this codebase

## Step 1: Database Setup (Neon)
1. Log into Neon (neon.tech) and create a new project.
2. Obtain your Neon Database connection string.
3. Replace the `DATABASE_URL` in `.env` with your production Neon string.
   *(Make sure to append `?sslmode=require` if required).*

## Step 2: Deployment on Vercel
1. Push your code to a GitHub repository.
2. Log into [Vercel](https://vercel.com) and click **Add New Project**.
3. Import your GitHub repository.
4. Open the **Environment Variables** section and add the following keys:
   - `DATABASE_URL="your-neon-postgres-url"`
   - `ADMIN_USERNAME="admin"`
   - `ADMIN_PASSWORD="super_secure_password"`
5. Click **Deploy**. Vercel will automatically detect the Next.js framework, run `npm install`, then execute the `build` script (`prisma generate && next build`), and deploy.

## Step 3: Pushing Database Schema
1. Once deployed, or locally, you must sync your Prisma schema to your Neon database if you haven't already.
   Run: `npx prisma db push`.
2. Seed the database with the initial dummy data by running: `npx tsx scripts/seed.ts` (Ensure the `DATABASE_URL` points to your production Neon DB or run this locally against your production DB).

## Step 4: Admin Access
1. Visit the deployed website at `your-domain.com/admin`.
2. Log in using the `ADMIN_USERNAME` and `ADMIN_PASSWORD` defined in your environment variables.
3. Here you can add, edit, or delete Doctors and Departments dynamically.

## Assets
Make sure your original `aih_logo.ai` is kept safe. Currently, the `src/app/ahad-logo.png` handles the direct display of the logo and is committed.

That's it! Your dynamic website is now live!
