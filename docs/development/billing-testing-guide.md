# Billing System Testing Guide

## Quick Start: Initialize Existing Test Users

Your existing test users need to be initialized with subscriptions and usage limits. Follow these steps:

### Step 1: Run the Initialization Script

**Option A: Using Supabase Dashboard (Recommended)**

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `/scripts/initialize-existing-users-billing.sql`
4. Click **Run**
5. Check the output at the bottom - you should see your 2 users with:
   - `subscription_tier`: free
   - `subscription_status`: active
   - `vehicles_limit`: 1
   - `vehicles_used`: (current count of their cars)

**Option B: Using Supabase CLI**

```bash
supabase db execute -f scripts/initialize-existing-users-billing.sql
```

### Step 2: Verify Initialization

Refresh your `/billing` page. You should now see:
- **Current Plan**: Free
- **Status**: Active
- **Vehicle Usage**: X / 1 (where X is your current car count)

## Testing Scenarios

### Scenario 1: Test Free Plan Limits

**Goal**: Verify that free users can't add more than 1 vehicle

1. Log in as a test user
2. Navigate to `/cars`
3. If you already have 1 car:
   - Click "Add Car"
   - Fill out the form
   - Click "Save"
   - **Expected**: You should see an upgrade prompt dialog saying "You've reached your vehicle limit of 1"
4. If you have 0 cars:
   - Add your first car successfully
   - Try to add a second car
   - **Expected**: Upgrade prompt appears

### Scenario 2: Test Upgrade Flow (Without Payment)

**Goal**: Test the upgrade UI flow without actually processing payment

1. Go to `/billing`
2. You should see 3 plan cards: Free (current), Pro, Family
3. Click "Upgrade" on the Pro plan ($9.99/month)
4. **Expected**: 
   - In **test mode** (no bePaid configured): You'll get an error about missing BEPAID_SHOP_ID
   - With **bePaid test credentials**: You'll be redirected to bePaid checkout page

### Scenario 3: Test with bePaid Sandbox (Full Flow)

**Prerequisites**: Set up bePaid test account

#### A. Configure bePaid Test Environment

Add to `.env.local`:

```bash
# bePaid Test Credentials (get these from bePaid dashboard)
BEPAID_SHOP_ID=your_test_shop_id
BEPAID_SHOP_KEY=your_test_shop_key
BEPAID_PUBLIC_KEY=your_test_public_key
BEPAID_WEBHOOK_SIGNATURE_KEY=your_test_signature_key
```

#### B. Test Upgrade with Test Card

1. Click "Upgrade to Pro" on `/billing`
2. You'll be redirected to bePaid checkout
3. Use bePaid test card:
   - **Card Number**: 4200 0000 0000 0000 (Visa)
   - **Expiry**: Any future date (e.g., 12/26)
   - **CVV**: Any 3 digits (e.g., 123)
   - **Name**: Test User
4. Complete the payment
5. **Expected**: 
   - Redirected back to your app
   - bePaid sends webhook to `/api/bepaid/webhook`
   - Your subscription updates to Pro
   - Usage limits update to unlimited vehicles
   - Invoice created in database

#### C. Verify Upgrade Success

Check these after successful upgrade:

1. **On /billing page**:
   - Current Plan: Pro
   - Status: Active
   - Vehicle Usage: X / 999999 (essentially unlimited)
   - Features badges: AI, Analytics visible

2. **In database** (Supabase SQL Editor):
```sql
-- Check subscription
SELECT * FROM subscriptions WHERE user_id = 'your-user-id';
-- Should show: plan_tier='pro', status='active'

-- Check usage limits
SELECT * FROM usage_limits WHERE user_id = 'your-user-id';
-- Should show: vehicles_limit=999999, ai_assistant_enabled=true

-- Check invoices
SELECT * FROM invoices WHERE user_id = 'your-user-id' ORDER BY created_at DESC;
-- Should show a new invoice with status='paid'
```

3. **Try adding multiple cars**:
   - Go to `/cars` → "Add Car"
   - Should work without limits
   - Add 5+ cars to verify

### Scenario 4: Test Downgrade Flow

**Goal**: Verify downgrading from Pro to Free

1. Ensure you're on Pro plan
2. Go to `/billing`
3. Click "Downgrade" on Free plan card
4. **Expected**: 
   - Subscription changes to Free immediately (in test)
   - Usage limits revert: vehicles_limit=1, features disabled
   - If you have 2+ cars, you won't be able to add more

### Scenario 5: Test Cancellation Flow

**Goal**: Test subscription cancellation

1. Upgrade to Pro plan (see Scenario 3)
2. Go to `/billing`
3. Scroll to "Cancel Subscription" section (red card at bottom)
4. Click "Cancel Subscription"
5. Confirm in the alert dialog
6. **Expected**:
   - Subscription shows cancellation date
   - Warning banner: "Subscription will be canceled on [date]"
   - Still have Pro features until period ends
   - In test: immediate downgrade to Free

### Scenario 6: Test Feature Gates

**Goal**: Verify feature access based on plan

#### A. AI Assistant (Pro/Family only)

```typescript
// Create a test API endpoint
// src/app/api/test/ai-assistant/route.ts
import { requireAIAssistant } from '@/lib/feature-gates'

export async function POST(request: Request) {
  const { data: { user } } = await supabase.auth.getUser()
  
  try {
    await requireAIAssistant(user!.id)
    return NextResponse.json({ message: "AI Assistant access granted" })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 403 })
  }
}
```

**Test**:
1. Call endpoint as Free user → 403 error
2. Upgrade to Pro
3. Call endpoint again → 200 success

#### B. Advanced Analytics (Pro/Family only)

Use the `useFeatureAccess` hook in UI:

```tsx
// In any component
const { hasAdvancedAnalytics } = useFeatureAccess()

return hasAdvancedAnalytics ? (
  <AdvancedAnalyticsChart />
) : (
  <UpgradePromptBanner feature="Advanced Analytics" />
)
```

**Test**:
1. Free user: Analytics hidden, sees upgrade banner
2. Pro user: Analytics visible

### Scenario 7: Test Vehicle Usage Tracking

**Goal**: Verify automatic usage increment/decrement

1. Check current usage:
```sql
SELECT vehicles_used FROM usage_limits WHERE user_id = 'your-user-id';
```

2. Add a car via UI → Check again → Should increment by 1
3. Delete a car via UI → Check again → Should decrement by 1

## Manual Database Testing

### Check Subscription Status

```sql
-- View all subscriptions
SELECT 
  u.email,
  s.plan_tier,
  s.status,
  s.current_period_end,
  s.bepaid_subscription_id
FROM subscriptions s
JOIN auth.users u ON u.id = s.user_id
ORDER BY s.created_at DESC;
```

### Check Usage Limits

```sql
-- View usage limits
SELECT 
  u.email,
  ul.plan_tier,
  ul.vehicles_used,
  ul.vehicles_limit,
  ul.ai_assistant_enabled,
  ul.advanced_analytics_enabled,
  ul.team_features_enabled
FROM usage_limits ul
JOIN auth.users u ON u.id = ul.user_id;
```

### Check Invoices

```sql
-- View invoices
SELECT 
  u.email,
  i.invoice_number,
  i.amount / 100.0 as amount_dollars,
  i.currency,
  i.status,
  i.paid_at,
  i.created_at
FROM invoices i
JOIN auth.users u ON u.id = i.user_id
ORDER BY i.created_at DESC;
```

### Manually Upgrade a User (Testing Only)

```sql
-- Upgrade to Pro
UPDATE subscriptions 
SET 
  plan_tier = 'pro',
  status = 'active',
  updated_at = now()
WHERE user_id = 'your-user-id';

UPDATE usage_limits
SET
  plan_tier = 'pro',
  vehicles_limit = 999999,
  history_months = null,
  ai_assistant_enabled = true,
  advanced_analytics_enabled = true,
  team_features_enabled = false,
  api_access_enabled = false,
  updated_at = now()
WHERE user_id = 'your-user-id';
```

### Manually Downgrade to Free

```sql
-- Downgrade to Free
UPDATE subscriptions 
SET 
  plan_tier = 'free',
  status = 'active',
  updated_at = now()
WHERE user_id = 'your-user-id';

UPDATE usage_limits
SET
  plan_tier = 'free',
  vehicles_limit = 1,
  history_months = 6,
  ai_assistant_enabled = false,
  advanced_analytics_enabled = false,
  team_features_enabled = false,
  api_access_enabled = false,
  updated_at = now()
WHERE user_id = 'your-user-id';
```

## Testing Webhooks

### Using bePaid Test Webhook Tool

1. Log into bePaid dashboard
2. Navigate to Webhooks section
3. Find your webhook endpoint
4. Use "Test Webhook" button
5. Select event type (e.g., `renewed.subscription`)
6. Click Send

### Manual Webhook Testing (Local Development)

If testing locally, use ngrok or similar:

```bash
# Terminal 1: Start your dev server
npm run dev

# Terminal 2: Expose via ngrok
ngrok http 3000

# Copy the ngrok URL and configure in bePaid:
# https://abc123.ngrok.io/api/bepaid/webhook
```

### Webhook Event Examples

Create test JSON files for different events:

**created.subscription.json**
```json
{
  "event": "created.subscription",
  "subscription": {
    "id": "test-sub-123",
    "status": "active",
    "plan_id": "pro_plan",
    "customer_email": "test@example.com"
  }
}
```

Send with curl:
```bash
curl -X POST http://localhost:3000/api/bepaid/webhook \
  -H "Content-Type: application/json" \
  -d @created.subscription.json
```

## Common Issues & Solutions

### Issue: "Status: Unknown" on /billing page

**Solution**: Run the initialization script (see Step 1 above)

### Issue: Webhook not received after payment

**Possible causes**:
1. Webhook URL not configured in bePaid
2. HTTPS not enabled (bePaid requires HTTPS)
3. Signature verification failing

**Debug**:
```bash
# Check application logs
supabase functions logs

# Or check your hosting provider logs
```

### Issue: Can't add cars even on Pro plan

**Solution**: Check usage_limits table:
```sql
SELECT * FROM usage_limits WHERE user_id = 'your-user-id';
```

Make sure `vehicles_limit = 999999` for Pro users.

### Issue: Invoice not created after payment

**Solution**: Check webhook logs and ensure:
1. Webhook received successfully
2. No errors in webhook handler
3. Invoice creation function succeeded

## Production Checklist

Before going live with billing:

- [ ] Set up production bePaid account
- [ ] Configure production webhook URL (HTTPS required)
- [ ] Test all payment flows with test cards
- [ ] Verify webhook signature verification works
- [ ] Test all plan upgrade/downgrade scenarios
- [ ] Verify feature gates work correctly
- [ ] Test cancellation flow
- [ ] Ensure RLS policies are working
- [ ] Set up monitoring/alerts for failed payments
- [ ] Test with real payment cards (small amounts)
- [ ] Document customer support procedures
- [ ] Set up invoice email notifications (future)

## Next Steps

1. **Initialize your test users** (run the SQL script)
2. **Test the free plan limits** (try adding 2 cars)
3. **Manually upgrade a user to Pro** (via SQL)
4. **Test Pro features** (add multiple cars, check UI)
5. **Set up bePaid test account** (for full payment testing)

## Support

For issues:
- Check Supabase logs in Dashboard
- Review webhook history in bePaid dashboard
- Check the main billing documentation: `/docs/development/billing-subscriptions.md`

