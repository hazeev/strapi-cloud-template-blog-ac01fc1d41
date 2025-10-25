# Billing & Subscriptions System

## Overview

Carvetka implements a subscription-based billing system using **bePaid** as the payment provider. The system supports three tiers: Free, Pro ($9.99/month), and Family ($29.99/month), each with different feature access and usage limits.

## Table of Contents

1. [Architecture](#architecture)
2. [Database Schema](#database-schema)
3. [Subscription Tiers](#subscription-tiers)
4. [Setup & Configuration](#setup--configuration)
5. [Usage Limits Enforcement](#usage-limits-enforcement)
6. [Feature Gating](#feature-gating)
7. [bePaid Integration](#bepaid-integration)
8. [Webhook Handling](#webhook-handling)
9. [User Flows](#user-flows)
10. [API Endpoints](#api-endpoints)
11. [Testing](#testing)

## Architecture

The billing system consists of several key components:

```
┌─────────────────────────────────────────────────────┐
│                  User Interface                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │
│  │ /billing │  │ Car Form │  │ Upgrade Prompts  │  │
│  └──────────┘  └──────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│              API Routes & Server Logic               │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │
│  │ Upgrade  │  │ Downgrade│  │  Usage Tracking  │  │
│  └──────────┘  └──────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│              bePaid Payment Gateway                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │
│  │Subscrip. │  │ Webhooks │  │  Card Tokens     │  │
│  └──────────┘  └──────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│                Supabase Database                     │
│  ┌──────────────┐  ┌────────┐  ┌────────────────┐  │
│  │subscriptions │  │invoices│  │ usage_limits   │  │
│  └──────────────┘  └────────┘  └────────────────┘  │
│  ┌──────────────────────────────────────────────┐   │
│  │         payment_methods                       │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

## Database Schema

### Tables

#### subscriptions
Tracks user subscriptions and billing periods.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Foreign key to auth.users |
| bepaid_subscription_id | text | bePaid subscription ID |
| bepaid_customer_id | text | bePaid customer ID |
| plan_tier | subscription_tier | free, pro, or family |
| status | subscription_status | pending, active, trial, failed, canceled, error |
| current_period_start | timestamptz | Start of current billing period |
| current_period_end | timestamptz | End of current billing period |
| trial_end | timestamptz | End of trial period |
| cancel_at | timestamptz | Scheduled cancellation date |

#### invoices
Stores payment history and invoices.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| subscription_id | uuid | Foreign key to subscriptions |
| user_id | uuid | Foreign key to auth.users |
| bepaid_transaction_uid | text | bePaid transaction UID |
| amount | integer | Amount in cents |
| currency | text | Currency code (e.g., "usd") |
| status | invoice_status | pending, paid, failed, refunded |
| invoice_number | text | Sequential invoice number |
| paid_at | timestamptz | Payment date |

#### usage_limits
Enforces per-plan usage limits and feature flags.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Foreign key to auth.users |
| plan_tier | subscription_tier | Current plan |
| vehicles_limit | integer | Maximum vehicles allowed |
| vehicles_used | integer | Current vehicle count |
| history_months | integer | History retention in months |
| ai_assistant_enabled | boolean | AI Assistant feature |
| advanced_analytics_enabled | boolean | Advanced Analytics feature |
| team_features_enabled | boolean | Team features |
| api_access_enabled | boolean | API access |

#### payment_methods
Stores tokenized payment cards.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Foreign key to auth.users |
| bepaid_card_token | text | bePaid card token |
| card_last_4 | text | Last 4 digits |
| card_brand | text | Card brand (visa, mastercard) |
| card_exp_month | integer | Expiration month |
| card_exp_year | integer | Expiration year |
| is_default | boolean | Default payment method |

### RPC Functions

- `increment_vehicle_usage(p_user_id uuid)` - Increment vehicle count
- `decrement_vehicle_usage(p_user_id uuid)` - Decrement vehicle count

## Subscription Tiers

### Free Plan
- **Price**: $0/month
- **Features**:
  - 1 vehicle
  - 6 months history retention
  - Basic features
- **Limitations**:
  - No AI Assistant
  - No Advanced Analytics
  - No Team Features
  - No API Access

### Pro Plan
- **Price**: $9.99/month
- **Features**:
  - Unlimited vehicles
  - Unlimited history retention
  - AI Assistant
  - Advanced Analytics
- **Perfect for**: Individual car enthusiasts

### Family Plan
- **Price**: $29.99/month
- **Features**:
  - Everything in Pro
  - Team features (5 users)
  - API Access
- **Perfect for**: Families and small teams

## Setup & Configuration

### Environment Variables

Add these to your `.env.local`:

```bash
# bePaid Configuration
BEPAID_SHOP_ID=your_shop_id
BEPAID_SHOP_KEY=your_shop_key
BEPAID_PUBLIC_KEY=your_public_key
BEPAID_WEBHOOK_SIGNATURE_KEY=your_webhook_signature_key

# URLs
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### Database Migration

Run the billing migration:

```bash
# Using Supabase CLI
supabase db push

# Or via Supabase Dashboard
# Copy contents of supabase/migrations/20251015_013_billing_subscriptions.sql
# and run in SQL Editor
```

### Initialize User Limits

When a new user signs up, their usage limits are automatically created via database trigger. No manual initialization required.

## Usage Limits Enforcement

### Automatic Tracking

Vehicle usage is automatically tracked:

```typescript
// Creating a car - automatically checks limits and increments
import { createCar } from '@/lib/cars'

try {
  await createCar(carData)
} catch (error) {
  if (error.message.includes("vehicle limit")) {
    // Show upgrade prompt
  }
}

// Deleting a car - automatically decrements
import { deleteCar } from '@/lib/cars'

await deleteCar(carId) // Automatically decrements usage
```

### Manual Checks

Use the feature gates API for manual checks:

```typescript
import { canAddVehicle, requireAIAssistant } from '@/lib/feature-gates'

// Check if user can add vehicle
const result = await canAddVehicle(userId)
if (!result.allowed) {
  console.log(result.reason) // "You've reached your vehicle limit..."
}

// Require AI Assistant feature (throws if not available)
try {
  await requireAIAssistant(userId)
  // User has access, proceed
} catch (error) {
  // User doesn't have access
  console.log(error.requiredTier) // "pro"
}
```

### Client-Side Hooks

Use React hooks for UI feature gating:

```typescript
import { useFeatureAccess, useCanAddVehicle } from '@/hooks/use-feature-access'

function MyComponent() {
  const { hasAIAssistant, hasAdvancedAnalytics, planTier } = useFeatureAccess()
  const { canAdd, reason } = useCanAddVehicle()
  
  return (
    <>
      {hasAIAssistant && <AIAssistantButton />}
      {!canAdd && <UpgradePrompt reason={reason} />}
    </>
  )
}
```

## Feature Gating

### Available Gates

- `requireAIAssistant(userId)` - Pro or Family
- `requireAdvancedAnalytics(userId)` - Pro or Family
- `requireTeamFeatures(userId)` - Family only
- `requireAPIAccess(userId)` - Family only
- `requireCanAddVehicle(userId)` - Checks vehicle limit

### Usage Example

```typescript
// In API route
import { requireAIAssistant } from '@/lib/feature-gates'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  try {
    // This will throw if user doesn't have access
    await requireAIAssistant(user!.id)
    
    // User has access, proceed with AI Assistant logic
    // ...
  } catch (error) {
    if (error instanceof FeatureNotAvailableError) {
      return NextResponse.json(
        { 
          error: error.message,
          required_tier: error.requiredTier,
          upgrade_url: "/billing"
        },
        { status: 403 }
      )
    }
    throw error
  }
}
```

## bePaid Integration

### Creating Subscriptions

```typescript
import { BePaidClient } from '@/lib/bepaid-client'

const client = new BePaidClient({
  shopId: process.env.BEPAID_SHOP_ID!,
  shopKey: process.env.BEPAID_SHOP_KEY!,
  publicKey: process.env.BEPAID_PUBLIC_KEY!,
})

// Create subscription
const result = await client.createSubscription({
  planId: 'pro_plan_id',
  customerEmail: 'user@example.com',
  amount: 999, // $9.99 in cents
  currency: 'USD',
  description: 'Carvetka Pro Subscription',
  trackingId: `sub_${userId}`,
  successUrl: `${baseUrl}/billing?success=true`,
  cancelUrl: `${baseUrl}/billing?canceled=true`,
})

console.log(result.checkout_url) // Redirect user here
```

### Webhook Signature Verification

```typescript
import { verifyWebhookSignature } from '@/lib/bepaid-client'

const signature = request.headers.get('bepaid-signature')
const body = await request.text()

const isValid = verifyWebhookSignature(
  body,
  signature!,
  process.env.BEPAID_WEBHOOK_SIGNATURE_KEY!
)

if (!isValid) {
  return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
}
```

## Webhook Handling

### Webhook Endpoint

`POST /api/bepaid/webhook`

Handles subscription lifecycle events:
- `created.subscription` - New subscription created
- `renewed.subscription` - Subscription renewed
- `canceled.subscription` - Subscription canceled
- `failed.subscription` - Payment failed
- `expired.subscription` - Subscription expired

### Webhook Configuration

Configure webhook URL in bePaid dashboard:

```
https://your-domain.com/api/bepaid/webhook
```

**Important**: Enable RSA signature verification in bePaid settings.

### Event Processing

The webhook handler automatically:
1. Verifies RSA signature
2. Updates subscription status
3. Creates invoices for successful payments
4. Updates usage limits based on plan
5. Handles downgrades on cancellation

## User Flows

### Upgrade Flow

1. User clicks "Upgrade" button
2. POST to `/api/billing/upgrade` with `plan_tier`
3. Server creates bePaid subscription
4. User redirected to bePaid checkout
5. User completes payment
6. bePaid sends webhook to `/api/bepaid/webhook`
7. Webhook updates subscription and usage limits
8. User redirected back to app

### Downgrade Flow

1. User clicks "Downgrade" button
2. POST to `/api/billing/downgrade` with `plan_tier`
3. If downgrading to free:
   - Cancel bePaid subscription
   - Schedule downgrade for end of period
4. Webhook handles final downgrade

### Cancellation Flow

1. User clicks "Cancel Subscription"
2. POST to `/api/billing/cancel`
3. Server cancels bePaid subscription
4. Subscription marked with `cancel_at` date
5. At period end, webhook downgrades to free

## API Endpoints

### GET /api/billing/subscription

Fetch current subscription and usage data.

**Response:**
```json
{
  "subscription": {
    "id": "uuid",
    "plan_tier": "pro",
    "status": "active",
    "current_period_end": "2025-11-15T00:00:00Z"
  },
  "usageLimits": {
    "vehicles_limit": 999999,
    "vehicles_used": 3,
    "ai_assistant_enabled": true
  },
  "invoices": [...],
  "paymentMethods": [...]
}
```

### POST /api/billing/upgrade

Upgrade to a paid plan.

**Request:**
```json
{
  "plan_tier": "pro"
}
```

**Response:**
```json
{
  "checkout_url": "https://checkout.bepaid.by/...",
  "subscription": {...}
}
```

### POST /api/billing/downgrade

Downgrade to a lower tier.

**Request:**
```json
{
  "plan_tier": "free"
}
```

**Response:**
```json
{
  "subscription": {...}
}
```

### POST /api/billing/cancel

Cancel active subscription.

**Response:**
```json
{
  "subscription": {
    "cancel_at": "2025-11-15T00:00:00Z",
    ...
  }
}
```

## Testing

### Test Cards

Use bePaid test cards for development:

- **Success**: 4200000000000000
- **Failure**: 4000000000000002
- **3D Secure**: 4000000000000028

Any CVV and future expiration date.

### Test Webhooks

Use bePaid's webhook testing tool or manually trigger:

```bash
curl -X POST https://your-domain.com/api/bepaid/webhook \
  -H "Content-Type: application/json" \
  -H "bepaid-signature: RSA_SIGNATURE" \
  -d @test-webhook.json
```

### Unit Tests

```typescript
// Example test for feature gates
import { canAddVehicle } from '@/lib/feature-gates'

test('free user cannot add second vehicle', async () => {
  const result = await canAddVehicle(freeUserId)
  expect(result.allowed).toBe(false)
  expect(result.requiredTier).toBe('pro')
})

test('pro user can add unlimited vehicles', async () => {
  const result = await canAddVehicle(proUserId)
  expect(result.allowed).toBe(true)
})
```

## Security Considerations

1. **Webhook Verification**: Always verify RSA signatures
2. **Service Role**: Webhook uses service role for bypassing RLS
3. **HTTPS Only**: All bePaid communication over HTTPS
4. **PCI Compliance**: Never store raw card numbers
5. **Rate Limiting**: Consider adding rate limits to billing endpoints

## Troubleshooting

### Webhook Not Received

1. Check webhook URL in bePaid dashboard
2. Verify HTTPS is enabled
3. Check application logs for errors
4. Use bePaid's webhook testing tool

### Usage Limits Not Updating

1. Check RPC functions are created
2. Verify triggers are enabled
3. Check for errors in vehicle creation/deletion
4. Manually run RPC functions to test

### Payment Failures

1. Check bePaid dashboard for transaction details
2. Review invoice table for failed payments
3. Check card expiration and limits
4. Test with test cards first

## Future Enhancements

Potential improvements for the billing system:

1. **Annual Billing**: Offer annual plans with discount
2. **Usage-Based Pricing**: Charge per vehicle over limit
3. **Payment Retry**: Automatic retry for failed payments
4. **Dunning**: Email campaigns for failed payments
5. **Coupon Codes**: Promotional discount codes
6. **Invoice PDFs**: Generate PDF invoices
7. **Billing History**: Detailed payment history export
8. **Team Management**: Multi-user workspace features
9. **API Rate Limiting**: Enforce API call limits
10. **White Labeling**: Custom branding options

## Support

For issues or questions:
- **bePaid Docs**: https://docs.bepaid.by/
- **bePaid Support**: support@bepaid.by
- **Internal**: Check logs in Supabase Dashboard

## License

Proprietary - Carvetka Team © 2025

