# 🛠️ Installation Guide

Detailed setup instructions for Carvetka development and production environments.

## Prerequisites

### Required Software
- **Node.js 18+** - [Download](https://nodejs.org/)
- **Git** - [Download](https://git-scm.com/)
- **Supabase Account** - [Sign up](https://supabase.com/)

### Optional Software
- **Xcode 15+** (for iOS development) - [Download](https://developer.apple.com/xcode/)
- **Vercel CLI** (for deployment) - `npm install -g vercel`

## Development Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/yourusername/carvetka.git
cd carvetka

# Install dependencies
npm install
```

### 2. Supabase Project Setup

1. **Create New Project**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Choose organization and enter project details
   - Wait for project to be ready (2-3 minutes)

2. **Get Project Credentials**
   - Go to **Settings > API**
   - Copy the following values:
     - Project URL
     - anon/public key
     - service_role key (keep this secret!)

3. **Set Up Database**
   - Go to **SQL Editor**
   - Run migrations from `supabase/migrations/` in chronological order:
     ```sql
     -- Run these in order:
     -- 20241224_001_initial_schema.sql
     -- 20241224_002_parts_expenses_schema.sql
     -- 20241224_003_car_specifications.sql
     -- ... (continue with all migrations)
     ```

### 3. Environment Configuration

Create `.env.local` in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Optional: Email Service (for onboarding)
RESEND_API_KEY=your_resend_api_key

# Optional: VIN Decoding (if using paid APIs)
VINAUDIT_API_KEY=your_vinaudit_api_key
```

### 4. Authentication Setup

In your Supabase dashboard:

1. **Go to Authentication > Settings**
2. **Set Site URL**: `http://localhost:3000`
3. **Add Redirect URLs**:
   - `http://localhost:3000/dashboard`
   - `http://localhost:3000/auth/callback`

4. **Configure Providers** (optional):
   - **Email/Password**: Already enabled
   - **Google OAuth**: Follow [Google OAuth Setup](./configuration.md#google-oauth)

### 5. Storage Setup

1. **Go to Storage**
2. **Create bucket**: `documents`
3. **Set to Public** (or configure RLS policies)
4. **Set up policies** for file uploads

### 6. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app!

## iOS Development Setup

### 1. Prerequisites
- **macOS** with Xcode 15+
- **Apple Developer Account** (for device testing)
- **iOS 17.0+** deployment target

### 2. Open iOS Project

```bash
open iOS/Carvetka/Carvetka.xcodeproj
```

### 3. Configure Supabase

Update `iOS/Carvetka/Carvetka/Utils/Config.swift`:

```swift
struct Config {
    static let supabaseURL = "your_supabase_url"
    static let supabaseAnonKey = "your_supabase_anon_key"
}
```

### 4. Build and Run

1. Select target device or simulator
2. Press **Cmd+R** to build and run
3. Test authentication and data sync

## Production Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository**
   ```bash
   # Push to GitHub
   git add .
   git commit -m "Deploy Carvetka v1.0"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables from `.env.local`
   - Deploy automatically

3. **Update Supabase Settings**
   - **Site URL**: `https://your-app.vercel.app`
   - **Redirect URLs**: `https://your-app.vercel.app/dashboard`

### Alternative Deployment Options

- **Netlify**: Full Next.js support with edge functions
- **Railway**: Database and app hosting
- **Docker**: Containerized deployment
- **Self-hosted**: Ubuntu/CentOS with PM2

## Verification

### Test Core Features

1. **Authentication**
   - Register new account
   - Login with credentials
   - Access protected routes

2. **Car Management**
   - Add new vehicle
   - Test VIN decoding
   - Edit car information

3. **Service Records**
   - Add service record
   - View service history
   - Test data table features

4. **Document Management**
   - Upload documents
   - Test file storage
   - Verify mobile responsiveness

### Check Database

1. **Verify Tables Created**
   ```sql
   SELECT table_name FROM information_schema.tables 
   WHERE table_schema = 'public';
   ```

2. **Test RLS Policies**
   - Try accessing data without authentication
   - Verify user isolation

3. **Check Migrations**
   ```sql
   SELECT * FROM supabase_migrations.schema_migrations;
   ```

## Troubleshooting

### Common Issues

**"Invalid login credentials"**
- Check Supabase URL and keys
- Verify authentication settings

**"Redirect issues"**
- Check redirect URLs in Supabase
- Verify site URL configuration

**"Build errors"**
- Run `npm run build` to check TypeScript errors
- Clear `.next` folder and rebuild

**"Database connection issues"**
- Verify Supabase project is active
- Check network connectivity
- Review RLS policies

### Getting Help

- Check [Troubleshooting Guide](../operations/troubleshooting.md)
- Join [Discussions](https://github.com/yourusername/carvetka/discussions)
- Report bugs in [Issues](https://github.com/yourusername/carvetka/issues)

## Next Steps

- Read [Architecture Overview](../development/architecture.md)
- Explore [API Documentation](../development/api.md)
- Check [Deployment Guide](../deployment/production.md)
