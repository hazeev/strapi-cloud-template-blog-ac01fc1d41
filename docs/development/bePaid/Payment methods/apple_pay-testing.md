# Test your integration - bePaid API Documentation
Once the [integration](https://docs.bepaid.by/en/payment_methods/apple_pay/integration/index.html) is finished, test it to make sure that Apple Pay works fine on your resource.

Follow the [Apple Pay documentation](https://developer.apple.com/apple-pay/sandbox-testing/) to create a test account and add a test card to it. Use the test card numbers below:


|Card number     |Expiry date|CVC |
|----------------|-----------|----|
|4761120010000492|11/2022    |533 |
|4761349750010326|11/2022    |851 |
|5204247750001471|11/2022    |111 |
|5204247750001505|11/2022    |111 |
|349956959041362 |11/2022    |1111|
|349956153891398 |11/2022    |1111|
|6011000994462780|11/2022    |111 |
|6011000994589319|11/2022    |111 |


Info

You can also test the integration with your valid card. As long as the test tag is transmitted in requests, you can get successful test Apple Pay payments processed by the bePaid test payment gateway, however your card is not debited.