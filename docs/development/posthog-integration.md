# PostHog Integration Guide

This guide explains how to use PostHog analytics and event tracking in Carvetka.

## Overview

PostHog is integrated into Carvetka for:
- **User Identification**: Automatically track authenticated users
- **Pageview Tracking**: Track all page visits
- **Custom Events**: Track user actions and feature usage across all core features
- **Feature Flags**: A/B testing and feature rollouts
- **Error Tracking**: Automatic exception capture
- **Session Recording**: User behavior analysis (optional)
- **Analytics Dashboards**: Three comprehensive dashboards tracking vehicles, engagement, and maintenance

## Implementation Status

✅ **Completed** (as of October 2025):
- PostHog SDK installed and initialized
- User identification and authentication tracking
- Event tracking for all core features:
  - Vehicle management (create, update, delete, VIN decode)
  - Service records (create, update, delete)
  - Fuel entries (create, update, delete)
  - Issues (create, update, resolve, delete)
  - Documents (upload, delete)
  - Onboarding workflow
- Three comprehensive analytics dashboards
- Reverse proxy configuration to bypass ad-blockers

## Configuration

### Environment Variables

PostHog requires two environment variables in `.env.local`:

```env
NEXT_PUBLIC_POSTHOG_KEY=phc_your_project_key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

These are automatically set by the PostHog wizard during installation.

### Reverse Proxy

PostHog uses a reverse proxy to avoid ad-blockers. The configuration is in `next.config.ts`:

```typescript
async rewrites() {
  return [
    {
      source: '/ingest/static/:path*',
      destination: 'https://us-assets.i.posthog.com/static/:path*',
    },
    {
      source: '/ingest/:path*',
      destination: 'https://us.i.posthog.com/:path*',
    },
  ];
}
```

## User Identification

User identification happens automatically through the `PostHogProvider` component.

### How It Works

1. When a user signs in, PostHog identifies them with their user ID and email
2. When a user signs out, PostHog resets the session
3. User properties are automatically updated on auth state changes

```typescript
// Automatically handled by PostHogProvider
posthog.identify(user.id, {
  email: user.email,
  created_at: user.created_at,
})
```

## Tracking Custom Events

### Basic Event Tracking

Use the `captureEvent` helper function:

```typescript
import { captureEvent } from '@/lib/posthog-events'

// Track a simple event
captureEvent('VEHICLE_CREATED')

// Track an event with properties
captureEvent('VEHICLE_CREATED', {
  vehicle_id: 'abc123',
  vehicle_make: 'Toyota',
  vehicle_model: 'Camry',
  vehicle_year: 2020,
})
```

### Using Helper Functions

For common events, use the pre-built helper functions:

```typescript
import {
  trackVehicleEvent,
  trackServiceEvent,
  trackFuelEvent,
  trackIssueEvent,
  trackOnboardingEvent,
} from '@/lib/posthog-events'

// Track vehicle created
trackVehicleEvent.created(
  vehicleId,
  'Toyota',
  'Camry',
  2020,
  true // hasVin
)

// Track VIN decoded
trackVehicleEvent.vinDecoded(
  vehicleId,
  'Honda',
  'Accord',
  2019
)

// Track service record created
trackServiceEvent.created(
  vehicleId,
  'Oil Change',
  50.00,
  'USD'
)

// Track fuel entry
trackFuelEvent.created(
  vehicleId,
  'Regular',
  15.5,
  true // isFullTank
)

// Track issue created
trackIssueEvent.created(
  vehicleId,
  'high', // priority
  'open'  // status
)

// Track onboarding
trackOnboardingEvent.started()
trackOnboardingEvent.stepCompleted('add_first_car')
trackOnboardingEvent.completed()
```

## Event Naming Conventions

### Format

All events follow the `OBJECT_ACTION` pattern:

- ✅ Good: `vehicle_created`, `service_updated`, `issue_resolved`
- ❌ Bad: `create_vehicle`, `updating_service`, `resolved_issue`

### Property Naming

Properties use `snake_case`:

- ✅ Good: `vehicle_id`, `fuel_type`, `is_full_tank`
- ❌ Bad: `vehicleId`, `FuelType`, `isFullTank`

## Available Events

### Vehicle Events
- `vehicle_created`
- `vehicle_updated`
- `vehicle_deleted`
- `vin_decoded`

### Service Record Events
- `service_created`
- `service_updated`
- `service_deleted`

### Fuel Entry Events
- `fuel_entry_created`
- `fuel_entry_updated`
- `fuel_entry_deleted`

### Issue Events
- `issue_created`
- `issue_updated`
- `issue_resolved`
- `issue_deleted`

### Document Events
- `document_uploaded`
- `document_deleted`

### Subscription Events
- `subscription_started`
- `subscription_upgraded`
- `subscription_cancelled`
- `trial_started`
- `trial_converted`

### Onboarding Events
- `onboarding_started`
- `onboarding_completed`
- `onboarding_step_completed`

## Feature Flags

Feature flags allow you to control feature rollouts and A/B testing.

### Check Feature Flag

```typescript
import posthog from 'posthog-js'

// Check if feature is enabled
const isEnabled = posthog.isFeatureEnabled('new_dashboard_layout')

if (isEnabled) {
  // Show new dashboard layout
} else {
  // Show old dashboard layout
}
```

### With Variant Testing

```typescript
const variant = posthog.getFeatureFlag('pricing_page_variant')

if (variant === 'variant_a') {
  // Show pricing variant A
} else if (variant === 'variant_b') {
  // Show pricing variant B
} else {
  // Show control variant
}
```

### Using with React Components

```typescript
'use client'

import { useEffect, useState } from 'react'
import posthog from 'posthog-js'

export function NewFeature() {
  const [showFeature, setShowFeature] = useState(false)

  useEffect(() => {
    setShowFeature(posthog.isFeatureEnabled('new_feature'))
  }, [])

  if (!showFeature) return null

  return <div>New Feature Content</div>
}
```

## Error Tracking

PostHog automatically captures exceptions when `capture_exceptions: true` is set.

### Manual Error Capture

```typescript
import posthog from 'posthog-js'

try {
  // Your code
} catch (error) {
  posthog.capture('$exception', {
    error_message: error.message,
    error_stack: error.stack,
    context: 'vehicle_creation',
  })
}
```

## Best Practices

### 1. Use Enums for Event Names

Always use the predefined event names from `POSTHOG_EVENTS`:

```typescript
// Good
captureEvent('VEHICLE_CREATED', properties)

// Bad
posthog.capture('vehicle_created', properties)
```

### 2. Use Enums for Property Names

Always use the predefined property names from `POSTHOG_PROPERTIES`:

```typescript
import { POSTHOG_PROPERTIES } from '@/lib/posthog-events'

// Good
captureEvent('VEHICLE_CREATED', {
  [POSTHOG_PROPERTIES.VEHICLE_ID]: vehicleId,
})

// Bad
captureEvent('VEHICLE_CREATED', {
  vehicleId: vehicleId,
})
```

### 3. Include Context in Events

Provide relevant context to make data analysis easier:

```typescript
// Good
trackServiceEvent.created(vehicleId, 'Oil Change', 50.00, 'USD')

// Better
trackServiceEvent.created(vehicleId, 'Oil Change', 50.00, 'USD', {
  shop_name: 'Quick Lube',
  odometer_reading: 45000,
  parts_cost: 25.00,
  labor_cost: 25.00,
})
```

### 4. Don't Track PII

Never track sensitive personal information:

```typescript
// ❌ Bad
captureEvent('LOGIN_ATTEMPT', {
  password: user.password,
  credit_card: user.creditCard,
})

// ✅ Good
captureEvent('LOGIN_ATTEMPT', {
  login_method: 'email',
  success: true,
})
```

### 5. Test Events in Development

PostHog debug mode is enabled in development:

```typescript
// Check console for debug output
// Events will be logged but not sent to PostHog in dev mode
```

## Dashboards

Carvetka has three comprehensive PostHog dashboards for tracking user behavior and feature adoption:

### 1. Vehicle Management Analytics
Track vehicle-related activities:
- **Daily Vehicle Creations**: Line chart showing daily vehicle creation trends
- **VIN Decode Success Rate**: Track how often users successfully decode VINs
- **Vehicles by Make**: Bar chart of most popular vehicle makes
- **Total Vehicles Tracked**: Bold number showing cumulative vehicle count

**Dashboard URL**: https://us.posthog.com/project/233058/dashboard/594459

### 2. User Onboarding & Engagement
Monitor user onboarding and feature adoption:
- **New User Signups**: Daily user registration trends
- **Onboarding Funnel**: 4-step funnel (Started → Completed Step → Added Car → Completed)
- **Feature Adoption**: Line chart comparing daily active users across all 5 core features:
  - Vehicles
  - Services
  - Fuel Entries
  - Issues
  - Documents
- **Weekly Active Users**: Weekly active user trends

**Dashboard URL**: https://us.posthog.com/project/233058/dashboard/594461

### 3. Service & Maintenance Analytics
Track maintenance and document management:
- **Service Records Over Time**: Daily service record creation trends
- **Service Categories Breakdown**: Bar chart of service types (oil change, brake, tire, etc.)
- **Fuel Entry Trends**: Daily fuel entry creation tracking
- **Issue Status Distribution**: Issues broken down by priority (critical, high, medium, low)
- **Issue Resolution Rate**: Compare issues created vs resolved
- **Document Upload Activity**: Document uploads by category (insurance, registration, photos, etc.)

**Dashboard URL**: https://us.posthog.com/project/233058/dashboard/594470

## Viewing Data in PostHog

1. **Events**: Go to PostHog Dashboard → Events to see all tracked events
2. **Users**: Go to PostHog Dashboard → People to see identified users
3. **Insights**: Create custom dashboards and insights from tracked events
4. **Feature Flags**: Manage feature flags in PostHog Dashboard → Feature Flags
5. **Dashboards**: View the three pre-built dashboards (links above)

## Testing PostHog Integration

### 1. Start Development Server

```bash
npm run dev
```

### 2. Check Console

Look for PostHog debug output in browser console:

```
[PostHog] Event: vehicle_created
[PostHog] Properties: { vehicle_id: 'abc123', ... }
```

### 3. Verify in PostHog Dashboard

Check PostHog dashboard to see events appearing in real-time.

## Troubleshooting

### Events Not Appearing

1. Check that `NEXT_PUBLIC_POSTHOG_KEY` is set correctly
2. Verify the reverse proxy is working (`/ingest` endpoints)
3. Check browser console for errors
4. Ensure PostHog is not blocked by ad-blockers

### User Not Identified

1. Check that user is authenticated (use Supabase)
2. Verify `PostHogProvider` is wrapping your app
3. Check for auth state changes in console

### Feature Flags Not Working

1. Ensure feature flag is created in PostHog dashboard
2. Check that user is identified
3. Verify flag conditions match user properties

## Resources

- [PostHog Documentation](https://posthog.com/docs)
- [Next.js Integration Guide](https://posthog.com/docs/libraries/next-js)
- [Feature Flags Guide](https://posthog.com/docs/feature-flags)
- [Event Tracking Best Practices](https://posthog.com/docs/getting-started/send-events)
