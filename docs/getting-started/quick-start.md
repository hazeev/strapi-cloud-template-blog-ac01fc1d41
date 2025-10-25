# 🚀 Quick Start Guide

Get Carvetka up and running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- A Supabase account
- Git installed

## 1. Clone the Repository

```bash
git clone https://github.com/yourusername/carvetka.git
cd carvetka
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Set Up Environment

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 4. Set Up Database

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Navigate to SQL Editor
3. Run the migrations from `supabase/migrations/` in order
4. Verify all tables are created

## 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app!

## 6. Test the Application

1. **Register** a new account
2. **Add your first car** using the VIN decoder
3. **Add a service record** to track maintenance
4. **Upload documents** to store receipts
5. **Track fuel consumption** for efficiency analysis

## Next Steps

- Read the [Installation Guide](./installation.md) for detailed setup
- Explore [Features Overview](../user-guides/features.md) to understand capabilities
- Check [Development Setup](../development/setup.md) for local development

## Need Help?

- Check [Troubleshooting](../operations/troubleshooting.md) for common issues
- Join our [Discussions](https://github.com/yourusername/carvetka/discussions) for community support
- Report bugs in our [Issue Tracker](https://github.com/yourusername/carvetka/issues)
