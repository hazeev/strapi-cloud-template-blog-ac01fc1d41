# Reauthentication

## Handle the Response

If the re-authentication is successful, the redirect to your application will contain a vehicle ID. In case of an error, Smartcar will provide an error type and description as parameters instead.

### Success

- **vehicle_id**
  - **Description**: Unique identifier for a vehicle on Smartcar’s platform.
- **state**
  - **Description**: If a `state` parameter was included in the redirect to Smartcar Connect, it will be returned here.

**Example**:

```http
HTTP/1.1 302 Found
Location: https://example.com/home?vehicle_id=sc4a1b01e5-0497-417c-a30e-6df6ba33ba46&state=0facda3319
```

### Error

For a detailed description of errors, refer to the [Smartcar errors page](https://smartcar.com/docs).

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