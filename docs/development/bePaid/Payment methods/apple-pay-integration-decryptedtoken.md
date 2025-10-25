# Apple Pay payments with a decrypted token - bePaid API Documentation
The bePaid system can process payment, authorization and charge requests with the decrypted `paymentData` property of the payment token issued by Apple.

Info

You must be Payment Card Industry Data Security Standard (PCI DSS) compliant to decrypt and store the payment tokens from Apple.

Payment request with the decrypted token
----------------------------------------

##### Request

To initiate a payment with the decrypted Apple Pay data, send [the payment](https://docs.bepaid.by/en/integration/card_api/transactions/payment/), [authorization](https://docs.bepaid.by/en/integration/card_api/transactions/authorization/) or [charge](https://docs.bepaid.by/en/payment_management/saved_cards/charges/) request, where you should submit the decrypted Apple Pay token as the value of `request.credit_card.token` in the format described below.

**The required format of the decrypted Apple Pay token sent as the card token**

Submit the decrypted Apple Pay token in requests as the card token in the `$begateway_apple_pay_decrypted_1_0_0$<base64-decoded_paymentData_here>` format, where:

*   `$begateway_apple_pay_decrypted_1_0_0$` is the required prefix for the decrypted Apple Pay token;
*   `<base64-decoded_paymentData_here>` is the decrypted `paymentData` property of the `PaymentToken` serialized into JSON and then converted to the Base64-strict format.

For recurring payments and payments with the saved card data, get the bePaid payment token by sending the `request.additional_data.contract` parameter in [the payment](https://docs.bepaid.by/en/integration/card_api/transactions/payment/), [authorization](https://docs.bepaid.by/en/integration/card_api/transactions/authorization/) or [charge](https://docs.bepaid.by/en/payment_management/saved_cards/charges/) requests.

The required format of the JSON-serialized decrypted paymentData property

```
{
  "applicationPrimaryAccountNumber": "4200000000000000",
  "applicationExpirationDate": "230131",
  "currencyCode": "643",
  "transactionAmount": 10000,
  "cardholderName": "JohnDoe", // optional 
  "deviceManufacturerIdentifier": "050110300273",
  "paymentDataType": "3DSecure",
  "paymentData": {
    "onlinePaymentCryptogram": "AP6MRIToJV3AAbEcMTKNAoABFA==",
    "eciIndicator": "07" // optional
  }
}

```


Example of the payment request

```
{
  "request":{
    "amount":10000,
    "currency":"RUB",
    "description":"Apple Pay test transaction",
    "tracking_id":"your_uniq_number",
    "credit_card":{
      "token": "$begateway_apple_pay_decrypted_1_0_0$eyJhcHBsaWNhdGlvblByaW1hcnlBY2NvdW50TnVtYmVyIjoiNDIwMDAwMDAwMDAwMDAwMCIsImFwcGxpY2F0aW9uRXhwaXJhdGlbvkRhdGUiOiIyMzAxMzEiLCJjdXJyZW5jeUNvZGUiOiI2NDMiLCJ0cmFuc2FjdGlvbkFtb3VudCI6MTAwMDAsImRldmljZU1hbnVmYWN0dXJlcklkZW50aWZpZXIiOiIwNTAxMTAwMzAyNzMiLCJwYXltZW05RGF0YVR5cGUiOiIzRFNlY3VyZSIsInBheW1lbnREYXRhIjp7Im9ubGluZVBheW1lbnRDcnlwdG9ncmFtIjoiQVA2TVJJVG9KVjNiQUFFY01US05Bb0FCRkE9PSJ9fQ=="
    }
  }
}

```


##### Response

The response to the payment request with decrypted `paymentData` will be returned with [the processing status](https://docs.bepaid.by/en/integration/card_api/statuses/) and fully conforms to [the payment](https://docs.bepaid.by/en/integration/card_api/transactions/payment/) or [authorization](https://docs.bepaid.by/en/integration/card_api/transactions/authorization/) transaction response.