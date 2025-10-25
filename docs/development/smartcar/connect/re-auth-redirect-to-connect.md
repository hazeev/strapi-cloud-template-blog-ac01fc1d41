# Reauthentication

## Redirect to Connect

When a user updates their credentials for their connected services account, they will need to go through the Smartcar Connect flow again to update your application's authorization. You can streamline this process using a special re-authentication URL with the parameters outlined below.

If an `AUTHENTICATION_FAILED` API error occurs, it will include a partially constructed re-authentication URL in the `resolution.url` field.

## Parameters

### `client_id`
- **Type**: String
- **Required**: Yes
- **Description**: The application’s unique identifier, available on the **Credentials** tab of the [Smartcar Dashboard](https://dashboard.smartcar.com).

### `redirect_uri`
- **Type**: String
- **Required**: Yes
- **Description**: The URI to which the user is redirected after authorization. This must match one of the redirect URIs set in the **Credentials** tab of the dashboard. The first redirect URI added is set as the default. If no `redirect_uri` is specified in the Connect URL, Smartcar uses the default URI. Multiple URIs can be added, and any can be set as the default in the dashboard.

### `response_type`
- **Type**: String
- **Required**: Yes
- **Description**: Must be set to `vehicle_id` for reauthentication.

### `vehicle_id`
- **Type**: String
- **Required**: Yes
- **Description**: The ID of the vehicle being reauthenticated.

### `state`
- **Type**: String
- **Required**: No
- **Description**: An optional value included as a query parameter in the `redirect_uri` response. Commonly used to identify a user or prevent cross-site request forgery.

### `user`
- **Type**: String
- **Required**: No
- **Description**: A unique identifier for the vehicle owner to track and aggregate analytics across Connect sessions in the dashboard. Use the `state` parameter to identify the user at the callback URI when receiving an authorization or error code after the user exits the Connect flow.