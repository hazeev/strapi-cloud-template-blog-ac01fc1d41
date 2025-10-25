# Shop ID and Secret Key

All requests to the bePaid API must use HTTP Basic authentication with the **Shop ID** as the username and the **Secret Key** as the password.

## Finding Your Shop ID and Secret Key

Follow these steps to locate your Shop ID and Secret Key:

1. Log into the [bePaid backoffice](https://backoffice.bepaid.by/) and select the **Shops** tab.
2. From the list of your shops, click the **Details** button for the required shop.

**Screenshot**: List of shops

3. On the shop details page, locate:
   - **Shop ID**: The value displayed in the **ID** line.
   - **Secret Key**: Click the **View secret key** button in the **Credential** section to reveal the key.

**Important**: Keep your Secret Key secure and never share it publicly. Use it only for API authentication purposes.