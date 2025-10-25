# How to Design Your Backend Architecture for Smartcar

Learn how to design your backend to integrate your application with Smartcar.

Designing your backend architecture for Smartcar integration ensures secure storage of credentials, reliable webhook handling, and a scalable implementation. This guide walks you through the essential database tables and backend endpoints you’ll need.

## What You’ll Achieve

- Set up database tables to store vehicles, users, and tokens
- Create backend endpoints to handle OAuth and webhooks
- Understand the data flow between Smartcar and your backend

## Step 1: Plan Your Database Tables

You’ll need tables to track users, vehicles, and Smartcar tokens. Here’s a recommended schema:

| Table              | Purpose                                                                 | Key Fields                                                                 |
|--------------------|-------------------------------------------------------------------------|----------------------------------------------------------------------------|
| `users`            | You probably already have this table to store your app’s users          | `id`, `email`, `name`, etc.                                                |
| `smartcar_tokens`  | Stores Smartcar access and refresh tokens pairs with user and vehicle IDs| `id`, `your_app_user_id`, `smartcar_vehicle_id`, `smartcar_access_token`, `smartcar_refresh_token`, `expires_at`, `created_at`, `updated_at` |
| `vehicles`         | Stores connected vehicle information                                    | `id`, `smartcar_user_id`, `your_app_user_id`, `make`, `model`, `year`, `created_at`, `updated_at` |
| `vehicle_data`     | Stores data about your vehicles (i.e., odometer readings, location, etc.)| `id`, `smartcar_vehicle_id`, `created_at`, `data_type`, `data_value`       |
| `webhook_logs`     | Log incoming webhook events (optional)                                  | `id`, `smartcar_vehicle_id`, `event_type`, `payload`, `received_at`         |

**Note**: Always encrypt tokens at rest and never expose them to the client.

## Step 2: Implement OAuth Code Exchange Endpoint

Create a backend endpoint to handle the OAuth redirect from Smartcar and exchange the authorization code for tokens.

**Example**: `/api/smartcar/callback`

1. Receive the `code` and `state` query parameters from Smartcar.
2. Exchange the code for tokens using Smartcar’s token endpoint.
3. Store the tokens in your `smartcar_tokens` table, linked to the user and vehicle.

```http
POST https://auth.smartcar.com/oauth/token
Content-Type: application/x-www-form-urlencoded

client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET&grant_type=authorization_code&code=AUTH_CODE&redirect_uri=YOUR_REDIRECT_URI
```

## Step 3: Create a Webhook Receiver Endpoint

Set up an endpoint to receive webhook POST requests from Smartcar.

**Example**: `/api/webhooks/smartcar`

1. Validate the webhook signature (see [Smartcar webhook docs](https://smartcar.com/docs)).
2. Parse the event payload and update your database as needed.
3. Log the event in `webhook_logs` for auditing and debugging.

```javascript
// Example Express.js handler
app.post('/api/webhooks/smartcar', async (req, res) => {
  try {
    // 1. Validate webhook signature
    const isValid = await validateWebhookSignature(req);
    if (!isValid) {
      return res.status(401).send('Invalid signature');
    }

    // 2. Parse event and update database
    const event = req.body;
    await processWebhookEvent(event);

    // 3. Respond with 200 OK
    res.status(200).send('Received');
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).send('Error processing webhook');
  }
});
```

## Step 4: Secure Your Endpoints

- Restrict access to OAuth and webhook endpoints.
- Use HTTPS for all traffic.
- Never expose access or refresh tokens to the frontend.