# React Tutorial

In this tutorial, we will use the JavaScript SDK to integrate Smartcar Connect into your React application.

Our frontend SDKs handle getting an authorization code representing a vehicle owner’s consent for your application to interact with their vehicle for the requested permissions. For security, token exchanges and requests to vehicles should not be made client-side. Use one of our backend SDKs for these operations.

## Overview

1. The Single-Page Application launches a pop-up window with Smartcar Connect to request access to a user’s vehicle using the Smartcar JavaScript SDK.
2. On Connect, the user logs in with their vehicle’s connected services account credentials and grants the application access.
3. The user’s browser is redirected to a Smartcar-hosted `REDIRECT_URI` (the Smartcar JavaScript SDK redirect page).
4. The redirect page receives an authorization code as a query parameter and sends it to the Single-Page Application’s `onComplete` callback using the `postMessage` web API (handled by the JavaScript SDK).
5. The Single-Page Application sends the authorization code to the application’s backend service.
6. The backend sends a request to the Smartcar API with the authorization code, `CLIENT_ID`, and `CLIENT_SECRET`.
7. Smartcar returns an `ACCESS_TOKEN` and a `REFRESH_TOKEN`.
8. Using the `ACCESS_TOKEN`, the application can send requests to the Smartcar API to access protected resources and send commands to the user’s vehicle via the backend service.

## Prerequisites

- Sign up for a Smartcar account.
- Note your `CLIENT_ID` and `CLIENT_SECRET` from the **Configuration** section in the [Smartcar Dashboard](https://dashboard.smartcar.com).
- Add the special JavaScript SDK redirect URI to your application configuration:  
  `https://javascript-sdk.smartcar.com/v2/redirect?app_origin=http://localhost:3000`
- Add the `REACT_APP_SERVER` redirect URI from **Setup** step 2 to your application configuration.

## Setup

Clone the repository and install the required dependencies:

```bash
$ git clone https://github.com/smartcar/getting-started-javascript-sdk-react.git
$ cd getting-started-javascript-sdk-react/tutorial
$ npm install
```

Set the following environment variables. Assume the backend server is listening on `http://localhost:8000`:

```bash
$ export REACT_APP_CLIENT_ID=<your-client-id>
$ export REACT_APP_REDIRECT_URI=https://javascript-sdk.smartcar.com/v2/redirect?app_origin=http://localhost:3000
$ export REACT_APP_SERVER=http://localhost:8000
```

**Note**: If using Windows, ensure you set environment variables appropriately for your shell. Refer to [this guide](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/set_1) for details.

## Build Your Connect URL

Instantiate a Smartcar object in the constructor of the `App` component:

**App.jsx**

```javascript
constructor(props) {
  // ...
  // Authorization Step 1: Initialize the Smartcar object
  this.smartcar = new Smartcar({
    clientId: process.env.REACT_APP_CLIENT_ID,
    redirectUri: process.env.REACT_APP_REDIRECT_URI,
    scope: ['required:read_vehicle_info'],
    mode: 'test',
    onComplete: this.onComplete,
  });
}
```

This tutorial uses `test` mode by default. Set `mode` to `live` to connect to a real vehicle or `simulated` for a simulated vehicle.

To launch Smartcar Connect, use the `openDialog` function in an `onClick` handler of an HTML button:

**App.jsx**

```javascript
authorize() {
  // Authorization Step 2a: Launch Connect
  this.smartcar.openDialog({ forcePrompt: true });
}

render() {
  // Authorization Step 2b: Render the Connect component
  return <Connect onClick={this.authorize} />;
}
```

## Handle the Response

After the user authorizes the application, they are redirected to the `redirect_uri` with an authorization code as a query parameter, and the pop-up dialog closes. The JavaScript SDK sends this code to the `onComplete` callback:

**App.jsx**

```javascript
onComplete(err, code, status) {
  // Authorization Step 3: Receive the authorization code
  console.log(code);
  // Prints the authorization code
}
```

## Launching Connect

Restart your server, open your browser, and go to `http://localhost:3000/login`. You should be redirected to Smartcar Connect.

In `test` mode, any username and password are valid for each brand. Smartcar displays the requested permissions (`read_vehicle_info` in this case). After logging in and accepting the permissions, the authorization code should be printed to your console.

## Getting Your First Access Token

Send the authorization code to the backend service’s `/exchange` endpoint to exchange it for an `ACCESS_TOKEN`:

**App.jsx**

```javascript
onComplete(err, code, status) {
  // Request Step 1: Obtain an access token
  return axios
    .get(`${process.env.REACT_APP_SERVER}/exchange?code=${code}`);
}
```

## Getting Data from a Vehicle

With the `ACCESS_TOKEN`, the backend can send requests to a vehicle using the Smartcar API. The React app sends a request to the backend’s `/vehicle` endpoint, which returns the vehicle’s information. Update the `onComplete` callback to fetch and store vehicle attributes:

**App.jsx**

```javascript
onComplete(err, code, status) {
  // Request Step 2a: Get vehicle information
  return axios
    .get(`${process.env.REACT_APP_SERVER}/exchange?code=${code}`)
    .then(_ => {
      return axios.get(`${process.env.REACT_APP_SERVER}/vehicle`);
    })
    .then(res => {
      this.setState({ vehicle: res.data });
    });
}
```

Render a `Vehicle` component to display the vehicle attributes in a table:

**App.jsx**

```javascript
render() {
  // Request Step 2b: Get vehicle information
  return Object.keys(this.state.vehicle).length !== 0 ? (
    <Vehicle info={this.state.vehicle} />
  ) : (
    <Connect onClick={this.authorize} />
  );
}
```

## Setting Up Your Backend

Create a backend service with `/exchange` and `/vehicle` endpoints using one of Smartcar’s backend SDKs, starting from the “Obtaining an access token” step. Ensure the `REDIRECT_URI` is set to:  
`https://javascript-sdk.smartcar.com/v2/redirect?app_origin=http://localhost:3000`