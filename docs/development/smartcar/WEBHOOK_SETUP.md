# Smartcar Webhook Setup Guide

This guide walks you through setting up Smartcar webhooks to receive real-time vehicle data updates.

## Prerequisites

- Smartcar Developer Account
- Application Management Token (AMT)
- Ngrok or similar tunneling service (for development)
- Production domain (for production)

## Environment Variables

Add these environment variables to your `.env.local` file:

```bash
# Smartcar Webhook Configuration
SMARTCAR_MANAGEMENT_TOKEN=your_management_token_here
SMARTCAR_WEBHOOK_SECRET=your_webhook_secret_here
```

### How to Get These Values

1. **Management Token (AMT)**:
   - Go to [Smartcar Dashboard](https://dashboard.smartcar.com)
   - Navigate to your application
   - Go to "Settings" → "Management Token"
   - Copy the token

2. **Webhook Secret**:
   - You can generate this yourself (recommended: use a strong random string)
   - Or Smartcar will provide one when you create the webhook
   - This is used to verify webhook signatures

## Webhook Endpoint

Your webhook endpoint is: `/api/smartcar/webhook`

- **Development**: `https://your-ngrok-url.ngrok-free.app/api/smartcar/webhook`
- **Production**: `https://yourdomain.com/api/smartcar/webhook`

## Setting Up the Webhook in Smartcar Dashboard

### Step 1: Start Your Development Server

```bash
npm run dev
```

### Step 2: Start Ngrok (Development Only)

```bash
ngrok http 3000
```

Copy the HTTPS URL (e.g., `https://11d9afb6c9ae.ngrok-free.app`)

### Step 3: Create Webhook in Smartcar Dashboard

1. Go to [Smartcar Dashboard](https://dashboard.smartcar.com)
2. Navigate to your application
3. Click on "Webhooks" in the sidebar
4. Click "Create Webhook"
5. Fill in the details:

   **Webhook Name**: `Carvetka Odometer` (or any descriptive name)
   
   **Callback URI**: Your webhook endpoint URL
   - Development: `https://your-ngrok-url.ngrok-free.app/api/smartcar/webhook`
   - Production: `https://yourdomain.com/api/smartcar/webhook`
   
   **Vehicle Subscription**: Choose your preference
   - Per-vehicle subscription
   - Or application-wide

### Step 4: Verify the Webhook

Smartcar will display a verification challenge (e.g., `nsQsLU7wY9WKt2IU`).

The webhook is already configured to handle this automatically:

1. Smartcar sends a POST request with `eventType: 'VERIFY'`
2. Your endpoint receives the challenge
3. It hashes the challenge with your Management Token using `smartcar.hashChallenge()`
4. Returns the hashed value back to Smartcar
5. Smartcar verifies and activates your webhook

**Watch your server logs** to see the verification happening:
```
Webhook verification requested
Webhook verification successful
```

### Step 5: Test the Webhook

After verification is complete, you can test the webhook:

1. Connect a vehicle in your app
2. Trigger an event (manual sync, drive the vehicle, etc.)
3. Check your server logs for webhook events

## Webhook Event Types

The webhook handles these event types:

### 1. VERIFY (Verification Event)
```json
{
  "eventType": "VERIFY",
  "data": {
    "challenge": "nsQsLU7wY9WKt2IU"
  }
}
```

### 2. VEHICLE_STATE (Vehicle Data Update)
```json
{
  "eventType": "VEHICLE_STATE",
  "vehicleId": "vehicle-id-here",
  "data": {
    "odometer": {
      "distance": 12345,
      "unit": "kilometers"
    }
  }
}
```

### 3. VEHICLE_ERROR (Error Notification)
```json
{
  "eventType": "VEHICLE_ERROR",
  "vehicleId": "vehicle-id-here",
  "data": {
    "error": "Error details"
  }
}
```

## What Happens When an Event is Received

### Odometer Updates

1. Webhook receives `VEHICLE_STATE` event with odometer data
2. Looks up the connected vehicle in `smartcar_vehicles` table
3. Converts miles to kilometers if needed
4. Creates a meter entry using `createMeterEntryFromSmartcar()`
5. Checks for duplicates (skips if same reading within 1 hour)
6. Validates reading isn't lower than the latest entry
7. Logs the event in `smartcar_sync_logs` table
8. Marks the webhook event as processed in `smartcar_webhook_events` table

### Error Handling

- Invalid signatures are rejected with 401 status
- Missing data is logged but doesn't crash the endpoint
- Duplicate entries are skipped automatically
- All events are logged for debugging

## Troubleshooting

### Webhook Verification Fails

**Problem**: Smartcar shows "Verification failed"

**Solutions**:
- Check that `SMARTCAR_MANAGEMENT_TOKEN` is set correctly in `.env.local`
- Ensure your server is running and accessible via the webhook URL
- Check server logs for error messages
- Verify ngrok is forwarding requests correctly

### Events Not Being Processed

**Problem**: Webhook receives events but nothing happens

**Solutions**:
- Check that the vehicle is connected and `is_active = true` in database
- Verify `smartcar_vehicle_id` matches between webhook payload and database
- Check server logs for errors during processing
- Query `smartcar_webhook_events` table to see logged events

### Duplicate Meter Entries

**Problem**: Same reading is being created multiple times

**Solutions**:
- The code already has duplicate detection (1-hour window)
- Check `smartcar_sync_logs` to see if entries are being skipped
- Verify the duplicate detection is working in `checkDuplicateMeterEntry()`

## Database Tables Used

### smartcar_webhook_events
Logs all incoming webhook events for debugging:
```sql
SELECT * FROM smartcar_webhook_events 
ORDER BY created_at DESC 
LIMIT 10;
```

### smartcar_sync_logs
Tracks all sync operations (manual and webhook):
```sql
SELECT * FROM smartcar_sync_logs 
WHERE sync_type = 'odometer' 
ORDER BY created_at DESC;
```

### meter_entries
Check created entries from webhooks:
```sql
SELECT * FROM meter_entries 
WHERE source_type = 'manual' 
  AND notes LIKE '%webhook%'
ORDER BY entry_date DESC;
```

## Production Deployment

### Before Going Live

1. **Update Webhook URL**: Change from ngrok to your production domain
2. **Verify Environment Variables**: Ensure all tokens are set in production
3. **Test Webhook**: Send a test event to verify it works
4. **Monitor Logs**: Watch for any errors in the first few days
5. **Set Up Alerts**: Configure alerts for webhook failures

### Security Considerations

- ✅ Webhook signature verification is implemented
- ✅ Management token is stored securely in environment variables
- ✅ All events are logged for audit trail
- ✅ Duplicate entries are prevented
- ✅ Invalid data is rejected

## Monitoring

Monitor these metrics:

1. **Webhook Event Rate**: How many events per hour/day
2. **Processing Success Rate**: % of events successfully processed
3. **Duplicate Rate**: % of events skipped as duplicates
4. **Error Rate**: % of events that failed processing

Query for monitoring:
```sql
-- Webhook event summary
SELECT 
  event_type,
  processed,
  COUNT(*) as count
FROM smartcar_webhook_events
WHERE created_at > NOW() - INTERVAL '24 hours'
GROUP BY event_type, processed;

-- Sync success rate
SELECT 
  sync_type,
  COUNT(*) as total_syncs,
  COUNT(DISTINCT (data->>'meterEntryId')) as successful_entries
FROM smartcar_sync_logs
WHERE created_at > NOW() - INTERVAL '24 hours'
GROUP BY sync_type;
```

## Next Steps

After webhook verification is complete:

1. ✅ Webhook is now active
2. Connect test vehicles to verify data flow
3. Monitor the first few webhook events
4. Set up proper error handling and alerts
5. Document any edge cases you encounter
6. Consider implementing additional event types (fuel, battery, etc.)

## Support

If you encounter issues:

1. Check Smartcar's [Webhook Documentation](https://smartcar.com/docs/api#webhooks)
2. Review server logs for detailed error messages
3. Check the database tables for event history
4. Contact Smartcar support if issues persist

