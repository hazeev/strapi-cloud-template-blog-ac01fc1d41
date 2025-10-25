# 🍎 Carvetka iOS App Setup Guide

## 📋 Prerequisites

- **Xcode 15.0+** (latest version recommended)
- **iOS 17.0+** deployment target
- **Apple Developer Account** (for device testing and App Store)
- **Supabase project** with your existing database

## 🚀 Step-by-Step Setup

### 1. Add Supabase Swift Package

1. **Open your Xcode project** (`Carvetka.xcodeproj`)
2. **Go to File** → **Add Package Dependencies**
3. **Enter URL**: `https://github.com/supabase/supabase-swift`
4. **Click "Add Package"**
5. **Select these products**:
   - ✅ Supabase
   - ✅ SupabaseAuth
6. **Click "Add Package"**

### 2. Configure Supabase Credentials

1. **Open** `Config.swift` in your project
2. **Replace the placeholder values**:
   ```swift
   static let supabaseURL = "YOUR_ACTUAL_SUPABASE_URL"
   static let supabaseAnonKey = "YOUR_ACTUAL_SUPABASE_ANON_KEY"
   ```
3. **Get these values from**:
   - Supabase Dashboard → Settings → API
   - Copy the Project URL and anon/public key

### 3. Update Bundle Identifier (Optional)

1. **Select your project** in Xcode navigator
2. **Go to "Signing & Capabilities"**
3. **Change Bundle Identifier** to your own (e.g., `com.yourname.carvetka`)
4. **Select your Development Team**

### 4. Build and Test

1. **Select a simulator** (iPhone 15 Pro recommended)
2. **Press Cmd+R** to build and run
3. **Test the app**:
   - Try signing up with a new account
   - Add your first car
   - Navigate through the app

## 📱 App Features

### ✅ Implemented
- **Authentication**: Login/Register with Supabase
- **Car Management**: Add, view, and manage vehicles
- **User Preferences**: Currency, units, language settings
- **Navigation**: Tab-based navigation
- **Data Sync**: Real-time sync with your web app

### 🚧 Coming Soon
- **Service Records**: Track maintenance history
- **Fuel Tracking**: Log fuel purchases and efficiency
- **Document Storage**: Upload car documents and photos
- **Reminders**: Maintenance reminders
- **Offline Support**: Local data caching

## 🔧 Project Structure

```
Carvetka/
├── Models/
│   ├── Car.swift
│   └── UserPreferences.swift
├── Services/
│   └── SupabaseService.swift
├── Views/
│   ├── Auth/
│   │   ├── LoginView.swift
│   │   └── RegisterView.swift
│   ├── Cars/
│   │   ├── CarsListView.swift
│   │   ├── CarDetailView.swift
│   │   └── AddCarView.swift
│   ├── Settings/
│   │   └── UserPreferencesView.swift
│   └── MainTabView.swift
├── Config.swift
├── CarvetkaApp.swift
└── ContentView.swift
```

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**:
   - Make sure you added the Supabase package
   - Check that your iOS deployment target is 17.0+
   - Clean build folder (Cmd+Shift+K)

2. **Authentication Issues**:
   - Verify your Supabase URL and key in `Config.swift`
   - Check your Supabase project settings
   - Ensure RLS policies are set up correctly

3. **Data Not Loading**:
   - Check your internet connection
   - Verify Supabase database is accessible
   - Check Xcode console for error messages

### Getting Help

- **Check Xcode Console** for detailed error messages
- **Verify Supabase Dashboard** for database issues
- **Test with web app** to ensure backend is working

## 📦 Next Steps

1. **Test thoroughly** on simulator and device
2. **Add more features** (services, fuel tracking)
3. **Customize UI** to match your brand
4. **Prepare for TestFlight** distribution
5. **Submit to App Store** when ready

## 🔗 Integration with Web App

Your iOS app shares the same backend as your web app:
- **Same database** (PostgreSQL with RLS)
- **Same authentication** (Supabase Auth)
- **Same storage** (Supabase Storage)
- **Real-time sync** between web and mobile

Users can seamlessly switch between web and mobile apps with the same data!

---

**Happy coding! 🚗📱**
