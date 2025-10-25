# How to Manage API Access Tokens and Refresh Tokens

Best practices for securely storing, refreshing, and rotating Smartcar API tokens.

This guide explains how to store, refresh, and rotate tokens using the Smartcar API.

## API Access Token vs. Application Management Token

- **API Access Token**: Used to access vehicle data and issue commands on behalf of a vehicle owner. These tokens are obtained through the OAuth flow after a user connects their vehicle and are required for all Smartcar API requests involving vehicle data.
- **Application Management Token**: Used to manage your Smartcar application itself (e.g., configuring webhooks or managing your vehicles). This token is found in the Smartcar Dashboard and is not used for accessing vehicle data or making API requests on behalf of users.

**Note**: Always use the correct token type for your use case: API access tokens for vehicle data, and management tokens for application configuration.

## Step 1: Store Tokens Securely

- Store both the `access_token` and `refresh_token` in your backend database, never in client-side code.
- Encrypt tokens at rest and restrict access to only necessary backend services.
- Associate tokens with the correct user and vehicle for easy lookup and management.

## Step 2: Use the Access Token for API Requests

Use the `access_token` as a Bearer token in the Authorization header for all API requests.

```http
GET https://vehicle.api.smartcar.com/v3/vehicles/{vehicleId}
Authorization: Bearer ACCESS_TOKEN
```

If the access token is valid, the API will return the requested data.

## Step 3: Detect Expired Access Tokens

If an API request returns a `401 Unauthorized` error, the access token may have expired. In this case, use the refresh token to obtain a new access token.

## Step 4: Refresh the Access Token

Make a POST request to the Smartcar OAuth token endpoint with `grant_type=refresh_token`.

```http
POST https://auth.smartcar.com/oauth/token?client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET&grant_type=refresh_token&refresh_token=YOUR_REFRESH_TOKEN
Content-Type: application/x-www-form-urlencoded
```

Store the new `access_token` and `refresh_token` in your database, replacing the old values.

## Step 5: Rotate and Revoke Tokens

Always update both tokens after a refresh to maintain security.