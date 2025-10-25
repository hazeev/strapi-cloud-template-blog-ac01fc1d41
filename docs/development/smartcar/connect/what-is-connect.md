# What is Smartcar Connect?

Smartcar Connect is the fastest and most transparent way to collect user consent for accessing vehicle data. Before your application can make API requests to a car, the vehicle owner must link their vehicle to your app. Smartcar Connect simplifies this process with a user-friendly flow:

1. **Select the car brand**: Users choose their vehicle’s brand.
2. **Sign in**: Users log in with their vehicle’s connected services account credentials.
3. **Give consent**: Users review and approve the permissions your app requests.

## Default Smartcar Connect Flow

From your application, you redirect users to Smartcar Connect. Once the user completes or exits the Connect flow, you handle the response. Smartcar returns an authorization `code` as a query parameter, which you can exchange for an `access_token` to start making requests to the user’s vehicle(s).

Smartcar Connect is designed in compliance with the OAuth 2.0 authorization protocol, ensuring secure handling of all user information. It offers robust configuration options to fit your needs and includes frontend SDKs for faster integration.