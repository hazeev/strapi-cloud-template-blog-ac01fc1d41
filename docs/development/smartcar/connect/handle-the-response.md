# Handle the Response

Upon successfully accepting the permissions, Smartcar will redirect the user back to your application using the specified `REDIRECT_URI`, including an authorization code as a query parameter. In case of an error, Smartcar will provide an error type and description as parameters instead.

## Success

When the user successfully authorizes your application, the redirect will include the following parameters:

- **code**
  - **Description**: An authorization code used to obtain your initial `ACCESS_TOKEN`. The authorization code expires after 10 minutes.
- **state**
  - **Description**: If a `state` parameter was included in the redirect to Smartcar Connect, it will be returned here.

**Example**:

```http
HTTP/1.1 302 Found
Location: https://example.com/home?code=90abecb6-e7ab-4b85-864a-e1c8bf67f2ad&state=0facda3319
```

## Error

If an error occurs during the authorization process, Smartcar will return the following parameters. For a detailed description of errors, refer to the [Smartcar errors page](https://smartcar.com/docs).

- **error**
  - **Description**: The type of error.
- **error_description**
  - **Description**: A detailed explanation of what caused the error.
- **state**
  - **Description**: If a `state` parameter was included in the redirect to Smartcar Connect, it will be returned here.

**Example**:

```http
HTTP/1.1 302 Found
Location: https://example.com/home?error=access_denied&error_description=User+denied+access+to+application.&state=0facda3319
```

### Additional Parameters for Incompatible Vehicles

When a user attempts to authorize an incompatible vehicle in Smartcar Connect, the following additional parameters may be included:

- **vin**
  - **Description**: The Vehicle Identification Number (VIN) of the incompatible vehicle.
- **make**
  - **Description**: The manufacturer of the vehicle.
- **model**
  - **Description**: The model of the vehicle.
- **year**
  - **Description**: The year of production of the vehicle.