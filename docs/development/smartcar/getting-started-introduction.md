# Getting Started with Smartcar

Welcome to Smartcar’s Developer Documentation! Here, you’ll learn how to integrate your application with over 40 OEM brands, securely connect to vehicles, and receive the dynamic vehicle data you need, delivered directly to your systems.

## Prerequisites

Before you begin, you’ll need:

- A Smartcar Account
- Your Application ID and Secret (found in the Smartcar Dashboard)
- An application with a redirect URI (e.g., a local development server or staging environment)

## Step 1: Register & Configure Your Application

1. Log in or sign up via the [Smartcar Dashboard](https://dashboard.smartcar.com).
2. Fill in your app name, description, and redirect URI in the configuration page of the dashboard.
3. Copy your Client ID and Client Secret to a safe location. These credentials identify your app during the authorization process. **Do not commit your client secret to version control.**
4. Select the data you want to access from vehicles by choosing the data signals (e.g., odometer, location, etc.).
5. The necessary permissions will be derived from these signals and presented to your users.

## Step 2: Start Connecting Vehicles via Smartcar Connect

Smartcar Connect is an OAuth 2.0 consent flow that lets your users link their vehicles securely. The vehicle access tab in the Smartcar Dashboard will generate a Connect URL for you. You can also generate the URL programmatically using one of our SDKs.

```javascript
const link = new Smartcar.AuthClient({ // Smartcar frontend SDK
  clientId: 'YOUR_CLIENT_ID',
  redirectUri: 'YOUR_REDIRECT_URI',
  scope: ['read_vehicle_info', 'read_odometer'], // add other scopes as needed
  mode: 'live', // use 'simulated' for testing with simulated vehicles
});

window.location.href = link.getAuthUrl();
```

This will take your user to the Smartcar Connect screen to authorize access.

## Step 3: Exchange Authorization Code for Access Tokens

After the user grants access, Smartcar redirects back to your app with an authorization code. This is where the redirect URI you configured earlier comes into play. Use this code in your backend to exchange for access and refresh tokens:

```javascript
const smartcar = require('smartcar'); // Smartcar backend SDK

const client = new smartcar.AuthClient({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  redirectUri: 'YOUR_REDIRECT_URI',
  mode: 'live', // use 'simulated' for testing with simulated vehicles
});

const access = await client.exchangeCode('AUTHORIZATION_CODE_FROM_QUERY');
```

You’ll receive:
- `accessToken`: used to make API calls
- `refreshToken`: used to obtain new access tokens

## Step 4: Configure an Integration to Receive Vehicle Data

Our recommended method is to use webhooks, allowing you to choose triggers (e.g., location changes, battery state of charge changes) and the data to be sent upon those triggers. For lower frequency data needs, you can also use our REST API to fetch data at lower intervals (e.g., once a week/month). Once you’ve configured a webhook, you’ve successfully integrated Smartcar and retrieved vehicle data.

## What’s Next?

- Learn how to configure your application.
- Connect your first vehicle.
- Build your first integration.

Need help? Visit our [Support Portal](https://support.smartcar.com) or contact us at [support@smartcar.com](mailto:support@smartcar.com).

Let’s get building!