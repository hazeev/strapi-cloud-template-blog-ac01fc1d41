# Advanced Configuration

## Connect Flows

Smartcar Connect can be launched with three different workflows to suit your use case: **Default**, **Single Select**, and **Single Select with VIN**. Depending on the information you have about the vehicle before launching Connect, you can use one of these flows to provide a more streamlined authorization experience.

### Default

The default Connect flow allows users to select their vehicle’s brand from a list, sign in with their connected services account credentials, and grant access to your application.

#### Authorizing a Single Vehicle

In the default flow, users can select a single vehicle or multiple vehicles (if supported by their connected services account) to authorize your application to access.

#### Bypassing the Brand Selection Screen

To streamline the experience, you can bypass the brand selection screen by specifying the `make` parameter in the Connect URL. This directs users straight to the login screen for the specified vehicle brand. Valid makes can be found in the [API reference makes section](https://smartcar.com/docs).

**Example Connect URL (Node.js)**:

```javascript
const smartcar = require('smartcar');

const client = new smartcar.AuthClient({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  redirectUri: 'http://localhost:8000/exchange',
  mode: 'live', // or 'simulated' for testing
});

const scope = ['read_vehicle_info', 'read_odometer'];
const authUrl = client.getAuthUrl(scope, {
  make: 'TESLA', // Bypasses brand selection for Tesla
});

console.log(authUrl);
// Redirect the user to this URL to initiate the Connect flow
```

**Default Smartcar Connect Flow**

The default flow involves:
1. User selects their vehicle brand from the Brand Selector screen.
2. User signs in with their connected services account.
3. User reviews and approves the requested permissions.
4. Smartcar redirects the user back to your application’s `redirect_uri` with an authorization `code` (or error parameters if the flow fails).

For more control, consider the **Single Select** or **Single Select with VIN** flows, which are available in the Custom Plan and allow restricting authorization to a single vehicle or a specific VIN, respectively. Refer to the [Smartcar documentation](https://smartcar.com/docs) for details on these advanced flows.