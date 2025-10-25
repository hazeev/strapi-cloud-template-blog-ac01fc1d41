# Backend SDK Tutorials

In this tutorial, we will go over how to integrate Smartcar Connect into your application and make requests to a vehicle using our backend SDKs.

## Overview

1. The application redirects the user to Smartcar Connect to request access to their vehicle. In Connect, the user logs in with their vehicle credentials and grants the application access.
2. The user’s browser is redirected to a specified `REDIRECT_URI`. The application server, listening at the `REDIRECT_URI`, retrieves the authorization code from query parameters.
3. The application sends a request to the Smartcar API with the authorization code, `CLIENT_ID`, and `CLIENT_SECRET`.
4. Smartcar returns an `ACCESS_TOKEN` and a `REFRESH_TOKEN`.
5. Using the `ACCESS_TOKEN`, the application can send requests to the Smartcar API to access protected resources and send commands to the user’s vehicle via the backend service.

## Prerequisites

- Sign up for a Smartcar account.
- Note your `CLIENT_ID` and `CLIENT_SECRET` from the **Configuration** section in the [Smartcar Dashboard](https://dashboard.smartcar.com).
- Add the following `REDIRECT_URI` to your application configuration: `http://localhost:8000/exchange`

## Setup

Clone the repository for the SDK you want to use and install the required dependencies:

```bash
$ git clone https://github.com/smartcar/getting-started-express.git
$ cd getting-started-express/tutorial
$ npm install
```

Set the following environment variables. If you’ve used one of our frontend SDKs to integrate Connect, set the `SMARTCAR_REDIRECT_URI` to the URI used for that application:

```bash
$ export SMARTCAR_CLIENT_ID=<your-client-id>
$ export SMARTCAR_CLIENT_SECRET=<your-client-secret>
$ export SMARTCAR_REDIRECT_URI=http://localhost:8000/exchange
```

**Note**: If using Windows, ensure you set environment variables appropriately for your shell. Refer to [this guide](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/set_1) for details.

## Build Your Connect URL

Instantiate a Smartcar object in your application. For example, in Node.js:

**index.js**

```javascript
const client = new smartcar.AuthClient({
  mode: 'simulated',
});
```

Set `mode` to `simulated` for testing or `live` to connect to a real vehicle.

To launch Smartcar Connect, redirect the user to the appropriate URL using the `getAuthUrl` function:

**index.js**

```javascript
app.get('/login', function(req, res) {
  const scope = ['read_vehicle_info'];
  const authUrl = client.getAuthUrl(scope);

  res.render('home', {
    url: authUrl,
  });
});
```

## Handle the Response

After the user authorizes the application, they are redirected to the `REDIRECT_URI` (`http://localhost:8000/exchange`) with an authorization code as a query parameter. Set up the server to receive the code:

**index.js**

```javascript
app.get('/exchange', function(req, res) {
  const code = req.query.code;

  console.log(code);

  res.sendStatus(200);
});
```

## Launching Connect

Restart your server and navigate to `http://localhost:8000/login` in your browser:

```bash
$ node index.js
```

This tutorial uses `test` mode by default, where any username and password are valid for each brand. Smartcar displays the requested permissions (`read_vehicle_info` in this case). After logging in and accepting the permissions, the authorization code will be printed to your console.

## Getting Your First Access Token

If you’ve used a frontend SDK to integrate Connect, this is where you fetch the access token. Exchange the authorization code for an `ACCESS_TOKEN` and redirect to the `/vehicle` route:

**index.js**

```javascript
// Global variable to save our access_token
let access;

app.get('/exchange', async function(req, res) {
  const code = req.query.code;
  
  // Access our global variable and store our access tokens.
  // In a production app, store this in persistent storage
  access = await client.exchangeCode(code);
  res.redirect('/vehicle');
});
```

## Getting Data from a Vehicle

With the `ACCESS_TOKEN`, the backend can send requests to a vehicle using the Smartcar API. Fetch the `vehicle_ids` associated with the `ACCESS_TOKEN`, then retrieve vehicle attributes and render them in a table:

**index.js**

```javascript
app.get('/vehicle', async function(req, res) {
  // Get the Smartcar vehicleIds associated with the access_token
  const { vehicles } = await smartcar.getVehicles(access.accessToken);
  
  // Instantiate the first vehicle in the vehicle id list
  const vehicle = new smartcar.Vehicle(vehicles[0], access.accessToken);

  // Make a request to Smartcar API
  const attributes = await vehicle.attributes();
  res.render('vehicle', {
    info: attributes, 
  });
});
```

Restart your server and navigate to `http://localhost:8000/login` to go through Connect and make your first API request:

```bash
$ node index.js
```