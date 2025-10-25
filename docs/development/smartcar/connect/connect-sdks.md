# SDKs for Smartcar Connect

Our SDKs make integrating Smartcar fast and easy across different languages and frameworks.

## Frontend SDKs

For mobile or single-page web applications, you can use one of our frontend SDKs to integrate Smartcar Connect. These SDKs handle the Connect flow to obtain user consent and an authorization code. Note that frontend SDKs only facilitate the Connect integration—you will need a backend SDK to manage tokens and make API requests to vehicles.

- **Android**
- **iOS**
- **Flutter**
- **JavaScript**

**Important**: A backend SDK is strongly recommended to securely manage tokens, receive data from Smartcar, and make API requests to issue commands to vehicles. Frontend SDKs alone cannot handle token exchange or API communication.

## Backend SDKs

For server-side rendered applications, use one of our backend SDKs to handle authentication, token exchange, and all communication with Smartcar’s APIs:

- **Java**
- **Node.js**
- **Python**
- **Ruby**

## No SDK for Your Language?

No problem! As long as your application can build a URL and handle HTTP requests, you can integrate with Smartcar Connect and the Smartcar API without an SDK.