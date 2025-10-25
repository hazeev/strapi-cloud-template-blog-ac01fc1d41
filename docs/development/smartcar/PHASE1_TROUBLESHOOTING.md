# Phase 1 Smartcar Integration - Troubleshooting Log

## Issues Encountered and Fixes

### Issue 1: `TypeError: scope.join is not a function`

**Error:**
```
Error in Smartcar connect route: TypeError: scope.join is not a function
```

**Root Cause:**
The Smartcar SDK's `getAuthUrl()` method expects the `scope` parameter as the **first positional argument** (an array), not as an option in the config object.

**Solution:**
Changed from:
```typescript
client.getAuthUrl({ state, scope: SMARTCAR_SCOPES, forcePrompt: true })
```

To:
```typescript
client.getAuthUrl(SMARTCAR_SCOPES, { state, forcePrompt: true })
```

**Files Modified:**
- `src/lib/smartcar-server.ts` - Fixed `getAuthorizationUrl()` function
- `src/types/smartcar.d.ts` - Updated `getAuthUrl()` signature

---

### Issue 2: `TypeError: smartcarClient.getVehicles is not a function`

**Error:**
```
Error in Smartcar callback route: TypeError: smartcarClient.getVehicles is not a function
```

**Root Cause:**
`getVehicles()` is a **static method** on the main `smartcar` module, not an instance method on `AuthClient`.

**Solution:**
Changed from:
```typescript
const smartcarClient = new smartcar.AuthClient({ ... })
const { vehicles } = await smartcarClient.getVehicles(tokens.access_token)
```

To:
```typescript
const { vehicles } = await smartcar.getVehicles(tokens.access_token)
```

**Files Modified:**
- `src/app/api/smartcar/callback/route.ts` - Removed unnecessary `AuthClient` instantiation
- `src/types/smartcar.d.ts` - Added `getVehicles` as static method on smartcar module

---

### Issue 3: `RangeError: Invalid time value`

**Error:**
```
RangeError: Invalid time value
    at Date.toISOString (<anonymous>)
    at storeVehicleConnection (src/lib/smartcar-server.ts:243:68)
```

**Root Cause:**
The Smartcar Node.js SDK's `exchangeCode()` response doesn't include an `expiresIn` field (it returns `undefined`), which caused `Date.now() + undefined * 1000` to produce `NaN`.

**Solution:**
Added fallback to default value (7200 seconds = 2 hours):
```typescript
return {
  access_token: tokens.accessToken,
  refresh_token: tokens.refreshToken,
  expires_in: tokens.expiresIn || 7200, // Default to 2 hours if not provided
  token_type: 'Bearer',
}
```

**Files Modified:**
- `src/lib/smartcar-server.ts` - Added fallback in `exchangeCodeForTokens()`

---

## Configuration Issues

### Environment Variables

**Correct configuration in `.env.local`:**
```env
SMARTCAR_CLIENT_ID=your-client-id
SMARTCAR_CLIENT_SECRET=your-client-secret
SMARTCAR_REDIRECT_URI=http://localhost:3000/api/smartcar/callback
```

**Notes:**
- `SMARTCAR_WEBHOOK_SECRET` is NOT needed for Phase 1 (only for Phase 2 webhooks)
- The "Application Management Token" from Smartcar Dashboard is different from webhook secret
- Redirect URI must EXACTLY match what's configured in Smartcar Dashboard (including protocol, port, no trailing slash)

### Smartcar Dashboard Configuration

**Required settings:**
1. **Redirect URI:** `http://localhost:3000/api/smartcar/callback` (for local development)
2. **Test Mode:** Enabled
3. **Permissions/Scopes:**
   - `read_vehicle_info` (required)
   - `read_odometer`
   - `read_fuel`
   - `read_battery`
   - `read_charge`
   - `read_location`
   - `read_engine_oil`
   - `read_tires`

---

## TypeScript Declaration Learnings

Since the Smartcar Node.js SDK doesn't include TypeScript definitions, we created comprehensive type declarations in `src/types/smartcar.d.ts`.

**Key learnings:**
1. `AuthClient.getAuthUrl()` takes `scope` as first parameter (array), then options object
2. `smartcar.getVehicles()` is a static method on the module, not on `AuthClient`
3. Token response structure from `exchangeCode()`:
   - `accessToken` (string)
   - `refreshToken` (string)
   - `expiresIn` (undefined in current SDK version)
   - `tokenType` (string)

---

## Testing Notes

**Test Mode Behavior:**
- Any username/password combination works in test mode
- Smartcar returns simulated vehicle data
- "Fuel data not available" warning is expected for test vehicles (not all data types are available)

**Successful Connection Flow:**
1. User clicks "Connect to Smartcar"
2. Redirected to Smartcar Connect (OAuth page)
3. User logs in with test credentials and approves permissions
4. Redirected back to `/api/smartcar/callback` with authorization code
5. Code exchanged for access token and refresh token
6. Vehicle ID retrieved from Smartcar API
7. Connection stored in `smartcar_vehicles` table
8. Initial sync triggered in background
9. User redirected to car detail page with success message

---

## Status

✅ **Phase 1 Implementation Complete**

All OAuth flow, token management, and manual sync functionality is working correctly. Ready for Phase 2 (automatic sync via webhooks).

---

*Last Updated: 2025-10-14*
