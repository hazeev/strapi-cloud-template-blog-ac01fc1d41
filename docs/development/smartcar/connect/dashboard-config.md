# Dashboard Configuration

## Registration

To get started, register your application with Smartcar by navigating to the [Smartcar Dashboard](https://dashboard.smartcar.com). After registration, your application will be assigned a `CLIENT_ID` and a `CLIENT_SECRET`. The `CLIENT_SECRET` must be kept secure and used only in exchanges between your application’s server and Smartcar’s authorization server.

## Redirect URIs

To authorize with Smartcar, you need to provide one or more redirect URIs. After a user authorizes your application, they will be redirected to the specified URI, which will include an authorization code as a query parameter. This code must be exchanged with Smartcar’s authorization server for an `ACCESS_TOKEN`.

- The first redirect URI you add to your application is automatically set as the default. If you do not specify a `redirect_uri` in your Connect URL, Smartcar will use this default URI.
- You can add multiple URIs and set any of them as the default in the Smartcar Dashboard.

The redirect URIs must match one of the following formats:

| Protocol       | Format                                                                 | Example                                                                 |
|----------------|-----------------------------------------------------------------------|-------------------------------------------------------------------------|
| **HTTP**       | A localhost URI with protocol `http://` (for testing purposes only)    | `http://localhost:8000`                                                 |
| **HTTPS**      | A URI with protocol `https://`                                        | `https://myapplication.com`                                             |
| **JavaScript SDK** | `https://javascript-sdk.smartcar.com/v2/redirect?app_origin={localhost-or-HTTPS-origin}` | `https://javascript-sdk.smartcar.com/v2/redirect?app_origin=https://myapp.com` |
| **Custom-scheme** | `sc{clientId}://{hostname-with-optional-path-component-or-TLD}`       | `sc4a1b01e5-0497-417c-a30e-6df6ba33ba46://callback`                   |

**Note**: HTTP is allowed only for testing purposes on `localhost`.

## JavaScript SDK

The JavaScript SDK redirect is used with the JavaScript SDK library. For more details and examples on redirect usage, refer to the [SDK documentation](https://smartcar.com/docs).

## Custom-scheme

Custom-scheme URIs are used for mobile applications. They must begin with `sc{clientId}` and can include an optional path or top-level domain (TLD). See the [OAuth reference on redirect URIs](https://smartcar.com/docs) for more details.