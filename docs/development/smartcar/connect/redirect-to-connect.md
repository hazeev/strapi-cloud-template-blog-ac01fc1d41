# Build the Connect URL

Learn how to construct the Smartcar Connect URL to redirect users through the vehicle authorization flow.

For mobile or single-page web applications, you can use one of our frontend SDKs, or for server-side rendered applications, you can use one of our backend SDKs. Using our SDKs simplifies generating the Connect URL with the proper parameters.

You can configure default permissions for your application in the **Vehicle Access** tab of your application’s **Configuration** page in the [Smartcar Dashboard](https://dashboard.smartcar.com). These settings determine the permissions requested during the Connect flow. Any `scope` parameters specified in the Connect URL will override these dashboard settings.

To get a pre-built Connect URL, click the **Share Connect Link** button at the top right in the Smartcar Dashboard. To build the Connect URL manually, include the following parameters. Note that parameters in the Connect URL will override dashboard settings.

## Parameters

### `client_id`
- **Type**: String
- **Required**: Yes
- **Description**: The application’s unique identifier, available on the **Credentials** tab of the dashboard.

### `redirect_uri`
- **Type**: String
- **Required**: Yes
- **Description**: The URI to which the user is redirected after authorization. This must match one of the redirect URIs set in the **Credentials** tab of the dashboard. The first redirect URI added is set as the default. If no `redirect_uri` is specified in the Connect URL, Smartcar uses the default URI. Multiple URIs can be added, and any can be set as the default in the dashboard.

### `response_type`
- **Type**: String
- **Required**: Yes
- **Description**: Set to `code` for initial authentication, as Smartcar Connect uses the OAuth 2.0 “Authorization Code” flow. To reauthenticate a user for a previously connected vehicle, set this to the `vehicle_id` of that vehicle.

### `scope`
- **Type**: Array of permissions
- **Required**: Yes
- **Description**: A space-separated list of permissions your application requests. Valid permission names are listed in the [permissions section](https://smartcar.com/docs). Permissions are optional by default but can be made required by adding the `required:` prefix (e.g., `required:read_odometer`). If no `scope` is specified, Smartcar uses the permissions configured in the **Vehicle Access** tab of the dashboard. Any `scope` parameters in the Connect URL override dashboard settings.

### `state`
- **Type**: String
- **Required**: No
- **Description**: An optional value included as a query parameter in the `redirect_uri` response. Commonly used to identify a user or prevent cross-site request forgery.

### `approval_prompt`
- **Type**: String
- **Default**: `auto`
- **Description**: Controls the behavior of the approval dialog shown to the user. Defaults to `auto`, displaying the dialog only if the user hasn’t previously approved the scope. Set to `force` to always show the approval dialog, even if the user has approved the same scope before.

### `mode`
- **Type**: Enum
- **Default**: `live`
- **Values**:
  - `simulated`: Allows requests to a vehicle created using the Vehicle Simulator, returning realistic responses for specific makes, models, years, and vehicle states. If the simulator doesn’t support the desired endpoint, randomized data is returned.
  - `live`: Use for connecting to a real vehicle.

### `make`
- **Type**: String
- **Required**: No
- **Description**: Bypasses the Brand Selector screen by specifying a vehicle make. Valid makes are listed in the [API reference makes section](https://smartcar.com/docs). The `single_select_vin` parameter takes precedence over this parameter.

### `single_select`
- **Type**: Boolean
- **Default**: `false`
- **Description**: Controls vehicle selection in the grant dialog. If set to `true`, the user can select only one vehicle. Refer to the [Single Select section](https://smartcar.com/docs) for details. Available only in the Custom Plan.

### `single_select_vin`
- **Type**: String
- **Required**: No
- **Description**: Specifies a Vehicle Identification Number (VIN) to allow authorization of only that specific vehicle. Requires `single_select` to be set to `true`. Takes precedence over the `make` parameter. Refer to the [Single Select section](https://smartcar.com/docs) for details. Available only in the Custom Plan.

### `flags`
- **Type**: Array of flags
- **Required**: No
- **Description**: A space-separated list of feature flags in the form `{flag}:{value}`.
  - **country**: The two-character ISO country code of the user’s location. Can be set as the default in the dashboard. If not specified, Smartcar uses the device’s IP to determine the country, affecting which brands appear in the Brand Selector screen (e.g., Renault is available in Europe but not the US).
  - **user**: A unique identifier for the vehicle owner to track and aggregate analytics across Connect sessions in the dashboard. Use the `state` parameter to identify the user at the callback URI when receiving an authorization or error code.

**Note**: Always validate and secure your Connect URL parameters to ensure a smooth and secure authorization flow.