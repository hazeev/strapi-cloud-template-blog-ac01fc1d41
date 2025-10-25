# 🚀 Carvetka Setup Guide

This guide will help you set up Carvetka locally and deploy it to production.

## 📋 Prerequisites

- Node.js 18+ installed
- A Supabase account
- A Vercel account (for deployment)

## 🛠️ Local Development Setup

### 1. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd carvetka
npm install
```

### 2. Set up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. In your Supabase dashboard, go to **SQL Editor**
3. Copy and paste the contents of `database.sql` and run it
4. Go to **Settings > API** and copy:
   - Project URL
   - anon/public key
   - service_role key (keep this secret!)

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Vehicle Databases API (for OEM maintenance schedules)
VEHICLE_DATABASES_API_KEY=your_vehicle_databases_api_key
```

### 4. Configure Authentication

In your Supabase dashboard:

1. Go to **Authentication > Settings**
2. Set **Site URL** to: `http://localhost:3000`
3. Add **Redirect URLs**:
   - `http://localhost:3000/dashboard`
4. For Google OAuth (optional):
   - Go to **Authentication > Providers**
   - Enable Google provider
   - Add your Google OAuth credentials

### 5. Set up Storage (for file uploads)

1. In Supabase, go to **Storage**
2. Create a new bucket called `documents`
3. Set it to **Public** (or configure policies as needed)

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app!

## 🚀 Production Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add the same environment variables from `.env.local`
5. Deploy!

### Update Supabase Settings for Production

1. In your Supabase dashboard, update:
   - **Site URL**: `https://your-app.vercel.app`
   - **Redirect URLs**: `https://your-app.vercel.app/dashboard`

## 📱 Features Included

### ✅ Implemented (MVP)
- ✅ Authentication (Email/Password + Google OAuth)
- ✅ Responsive design with ShadCN components
- ✅ Dashboard with overview stats
- ✅ Database schema with Row Level Security
- ✅ Mobile-friendly navigation

### 🚧 To Be Implemented
- 🚧 Car management (Add/Edit/Delete cars)
- 🚧 Service history tracking
- 🚧 Reminders system
- 🚧 File upload for receipts/documents
- 🚧 Data visualization/charts
- 🚧 Export functionality

## 🗂️ Project Structure

```
src/
├── app/
│   ├── (auth)/              # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/         # Protected dashboard pages
│   │   └── dashboard/
│   └── layout.tsx
├── components/
│   ├── ui/                  # ShadCN components
│   └── layout/              # Layout components
├── lib/
│   ├── supabase.ts         # Supabase client config
│   ├── auth.ts             # Authentication utilities
│   └── utils.ts            # Utility functions
└── types/
    └── database.ts         # TypeScript types
```

## 🔧 Development Tips

1. **Database Changes**: Update `database.sql` and re-run in Supabase SQL editor
2. **New Components**: Use `npx shadcn@latest add [component-name]`
3. **Environment**: Restart dev server after changing `.env.local`

## 🆘 Troubleshooting

- **"Invalid login credentials"**: Check your Supabase URL and keys
- **Redirect issues**: Verify redirect URLs in Supabase auth settings
- **Build errors**: Run `npm run build` to check for TypeScript errors

## 📞 Support

If you encounter issues, check:
1. Supabase dashboard for auth/database errors
2. Browser console for client-side errors
3. Vercel deployment logs for server errors 