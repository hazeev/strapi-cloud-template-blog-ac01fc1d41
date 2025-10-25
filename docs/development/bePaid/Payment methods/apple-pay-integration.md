# Apple Pay integration options - bePaid API Documentation
bePaid offers a number of Apple Pay integration options to its merchants. Choose an option based on what bePaid solution you use to accept payments and whether you are going to obtain own Apple Merchant ID.

Info

Before you begin, make sure you finished the [registration](https://docs.bepaid.by/en/payment_methods/apple_pay/registration/).

Follow this way if you want to accept Apple Pay payments via payment links or on the bePaid payment widget on your website, or use the bePaid payment page in UIWebView in your mobile app. Just submit the registration request and wait till Apple Pay service is activated for your customers.

You can accept payments both under bePaid ID and under your own Apple Merchant ID.

[Start with this integration option](https://docs.bepaid.by/en/payment_methods/apple_pay/integration/widget/)

Apple Pay on own checkout
-------------------------

In case you use own checkout on the website, place the Apple Pay button wherever you consider it necessary for your customers and add a JavaScript code of a suitable sample out of those offered by bePaid.

Both setup options available for the websites.

[Start with this integration option](https://docs.bepaid.by/en/payment_methods/apple_pay/integration/owncheckout/)

Apple Pay in mobile app
-----------------------

Incorporate Apple Pay in your mobile app by following the guidelines of Apple Passkit SDK or React Native Payments. Get `PaymentToken` from Apple and pass it in the payment or authorization request to the bePaid system.

Direct setup with Apple is required.

[Start with this integration option](https://docs.bepaid.by/en/payment_methods/apple_pay/integration/mobapp/)

Apple Pay payments with decrypted token
---------------------------------------

PCI DSS compliant and ready to submit the decrypted token from Apple? Get `paymentData` under your own Merchant ID and certificates and pass them in the payment or authorization request to the bePaid system.

[Start with this integration option](https://docs.bepaid.by/en/payment_methods/apple_pay/integration/decryptedtoken/)