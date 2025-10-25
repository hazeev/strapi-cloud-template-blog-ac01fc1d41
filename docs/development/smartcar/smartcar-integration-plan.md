# Smartcar Integration Plan for Carvetka

## Overview

This document outlines the comprehensive plan for integrating Smartcar's connected car API with Carvetka to automate vehicle data collection and enhance user experience.

## Core Value Proposition

Smartcar automates data collection that users currently enter manually, making Carvetka significantly more powerful and user-friendly:

1. **Automatic Odometer Tracking** → eliminates manual meter_entries
2. **Automatic Fuel Level Monitoring** → track fuel consumption without receipts
3. **Vehicle Location Tracking** → geofence-based service reminders
4. **Battery State (EVs)** → charging session tracking
5. **Real-time Vehicle Health** → proactive maintenance alerts

## Key Features to Implement

### 1. Automated Odometer Readings

- Replace manual meter entry with automatic syncing from the vehicle
- Create `meter_entries` with `source: 'smartcar_sync'`
- Run daily/weekly webhooks to capture odometer data
- Calculate accurate mileage between services automatically

### 2. Smart Fuel Tracking (for ICE vehicles)

- Monitor fuel level changes to detect fill-ups automatically
- Calculate fuel economy from odometer + fuel level deltas
- Estimate fuel costs based on user's default currency
- Create `fuel_entries` automatically when tank level increases significantly

### 3. EV Charging Automation

- Track charging sessions (start/end times, energy added)
- Calculate charging costs if user inputs electricity rates
- Monitor battery health over time
- Create expense records for charging sessions

### 4. Predictive Maintenance

- Use odometer data to trigger service reminders (e.g., "Oil change due in 500 miles")
- Monitor tire pressure, battery voltage, engine coolant temp
- Alert users before issues become critical
- Create suggested issues when anomalies detected

### 5. Location-Based Features

- Geofence parking locations for security alerts
- Track trip history for business mileage logs
- Suggest nearby service centers when maintenance is due

### 6. Vehicle Health Dashboard

- Real-time vehicle status (locked/unlocked, engine on/off)
- Battery state, fuel level, tire pressure visualizations
- Integration with existing Carvetka dashboard

---

## Technical Integration Architecture

### Database Changes Needed

```sql
-- Store Smartcar tokens per vehicle
create table smartcar_vehicles (
  id uuid primary key default gen_random_uuid(),
  car_id uuid references cars(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  smartcar_vehicle_id text not null unique,
  access_token text not null,
  refresh_token text not null,
  token_expires_at timestamptz not null,
  connected_at timestamptz default now(),
  last_synced_at timestamptz,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Track sync history
create table smartcar_sync_logs (
  id uuid primary key default gen_random_uuid(),
  smartcar_vehicle_id uuid references smartcar_vehicles(id),
  sync_type text not null, -- 'odometer', 'fuel', 'location', etc.
  data jsonb not null,
  synced_at timestamptz default now()
);

-- Webhook event log
create table smartcar_webhook_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  vehicle_id text not null,
  payload jsonb not null,
  processed boolean default false,
  received_at timestamptz default now()
);
```

### Backend API Routes (Next.js API Routes)

- `src/app/api/smartcar/connect/route.ts` - Initiates Smartcar OAuth flow
- `src/app/api/smartcar/callback/route.ts` - Handles OAuth callback, exchanges code for tokens
- `src/app/api/smartcar/webhook/route.ts` - Receives webhook events from Smartcar
- `src/app/api/smartcar/disconnect/[carId]/route.ts` - Revokes access and disconnects vehicle
- `src/app/api/smartcar/sync/[carId]/route.ts` - Manual sync trigger for a specific vehicle

### Library Modules

**Files to create:**
- `src/lib/smartcar.ts` - Client-side helper
- `src/lib/smartcar-server.ts` - Server-side operations

**Key functions:**
- `connectVehicle()` - Initiate OAuth flow
- `exchangeCodeForTokens()` - Token exchange
- `refreshAccessToken()` - Refresh expired tokens
- `syncVehicleData()` - Fetch data from Smartcar API
- `disconnectVehicle()` - Revoke access

### Environment Variables

```env
SMARTCAR_CLIENT_ID=your_client_id
SMARTCAR_CLIENT_SECRET=your_client_secret
SMARTCAR_REDIRECT_URI=https://app.carvetka.com/api/smartcar/callback
SMARTCAR_WEBHOOK_SECRET=your_webhook_secret
```

---

## User Experience Flow

### Connecting a Vehicle

1. User goes to car detail page → sees "Connect to Smartcar" button
2. Click launches Smartcar Connect (OAuth popup)
3. User selects their car brand → logs into manufacturer account
4. Approves permissions (odometer, fuel, location, etc.)
5. Redirects back to Carvetka → tokens stored in `smartcar_vehicles`
6. Immediate sync fetches initial vehicle data
7. Dashboard shows "Connected" badge with sync status

### Automated Data Collection

**Option 1: Webhooks (recommended)**
- Smartcar sends events when data changes
- Odometer updates every trip
- Fuel level changes after fill-ups
- Charging sessions for EVs

**Option 2: Polling (fallback)**
- Scheduled job runs daily to sync data
- Cron job or Vercel Edge Function
- Fetches latest data from Smartcar API

### Manual Override

Users can still manually add entries if:
- Vehicle isn't Smartcar-compatible
- They prefer manual tracking
- Smartcar connection fails

---

## Implementation Roadmap

### Phase 1: Basic Connection (MVP)

- Set up Smartcar application in dashboard
- Create database migrations for `smartcar_vehicles`
- Implement OAuth flow (connect/callback routes)
- Store tokens securely
- Display connection status in UI

### Phase 2: Odometer Sync

- Webhook endpoint for odometer updates
- Create `meter_entries` with source `smartcar_sync`
- Manual sync button in UI
- Token refresh logic

### Phase 3: Fuel/Charging Tracking

- Detect fuel level changes
- Auto-create `fuel_entries` for fill-ups
- Track charging sessions for EVs
- Calculate fuel economy

### Phase 4: Advanced Features

- Predictive maintenance alerts
- Location tracking and geofencing
- Vehicle health dashboard
- Trip history logs

---

## Available Smartcar Permissions (Scopes)

### Signals (dynamic data)

- `read_odometer` - Mileage tracking ✅ **Critical for Carvetka**
- `read_fuel` - Fuel level for ICE vehicles ✅
- `read_battery` - Battery level for EVs ✅
- `read_charge` - Charging status ✅
- `read_location` - GPS coordinates
- `read_engine_oil` - Oil life percentage
- `read_tires` - Tire pressure

### Attributes (static info)

- `read_vehicle_info` - Make, model, year (already have via VIN decoder)

### Commands (optional)

- `control_security` - Lock/unlock (nice-to-have)
- `control_charge` - Start/stop charging (for EV features)

---

## Cost Considerations

**Smartcar pricing typically:**
- Per vehicle per month (around $2-5/vehicle)
- Free tier for development/testing
- Tiered pricing based on API calls

**Monetization Ideas for Carvetka:**
- Offer Smartcar integration as premium feature ($5-10/month)
- Bundle with unlimited storage or advanced analytics
- Free for first vehicle, paid for additional connected cars

---

## Limitations & Considerations

1. **Vehicle Compatibility:** Not all cars support all features (depends on manufacturer)
2. **Token Expiry:** Access tokens expire in 2 hours, refresh tokens in 60 days
3. **User Reauthorization:** Users must reconnect if refresh token expires
4. **Data Latency:** Webhooks may have delays (5-15 minutes for some brands)
5. **Privacy:** Clear user consent needed for location tracking

---

## Next Steps

1. Start implementing Phase 1 (OAuth connection flow)
2. Create the database migrations for Smartcar integration
3. Build a POC that connects one vehicle and displays odometer data
4. Review pricing and create a business plan for monetization

---

*Last updated: 2025-10-14*
