# API version 3 - bePaid API Documentation
Introduction
------------

To make API responses more user-friendly and comprehensive for you, bePaid starts introducing the API version 3 (API v.3). The main changes relate to the response parameters and transaction status codes. The codes now go along with friendly messages for you to get more information about transaction processing.

As of September 15, 2022, the API v.3 is already configured for all `https://gateway.bepaid.by/` - endpoints. To submit requests, just add the `X-API-Version: 3` header to the request. For response parameters and their description, please use the guide below.

For any other questions related to the bePaid API v.3, you are welcome to contact our Tech Support Team on **help@bepaid.by**.

Requests
--------

To send `POST` or `GET` requests to the API v.3 of the `https://gateway.bepaid.by/`\- endpoints, add the `X-API-Version: 3` header to the request, or use the header instead of `X-API-Version: 2`, if the latter was required.

As for the request parameters, use the parameters described for the required endpoint. No additional parameters are required.

Responses
---------

The API v.3 responses have the following parameters:



* Parameter: uid
  * Type: string
  * Description: A UID of the processed transaction.
* Parameter: status
  * Type: string
  * Description: A status of the processed transaction.
* Parameter: code
  * Type: string
  * Description: A transaction processing code.
* Parameter: friendly_message
  * Type: string
  * Description: Message for the customer.
* Parameter: message
  * Type: string
  * Description: A message from the bank system.
* Parameter: amount
  * Type: integer
  * Description: An amount of the transaction in minimal currency units. For example, USD 12.00 is transmitted as 1200.
* Parameter: currency
  * Type: string
  * Description: A currency of the transaction in the ISO-4217 format, for example, USD.
* Parameter: description
  * Type: string
  * Description: A transaction description.
* Parameter: type
  * Type: string
  * Description: A transaction type.
* Parameter: tracking_id
  * Type: string
  * Description: Set to the tracking_id value from the request.
* Parameter: test
  * Type: boolean
  * Description: Set to true if a transaction is a test one.
* Parameter: created_at
  * Type: string
  * Description: A time when the transaction was created at in the ISO 8601 format YYYY-MM-DDThh:mm:ss.SSSZ.
* Parameter: updated_at
  * Type: string
  * Description: A time when the transaction was last updated at in the ISO 8601 format YYYY-MM-DDThh:mm:ss.SSSZ.
* Parameter: paid_at
  * Type: string
  * Description: A time when the transaction was successfully completed at in the ISO 8601 format YYYY-MM-DDThh:mm:ss.SSSZ. Set to null if the transaction is incomplete.
* Parameter: expired_at
  * Type: string
  * Description: A time when the transaction expires in the ISO 8601 format YYYY-MM-DDThh:mm:ss.SSSZ, i.e. a time till which the customer can complete the transaction. Set to null if the parameter is not applicable to the transaction.
* Parameter: closed_at
  * Type: string
  * Description: A time when a banking day in the acquiring bank ends in the ISO 8601 format YYYY-MM-DDThh:mm:ss.SSSZ. Set to null if the parameter is not applicable to the transaction.
* Parameter: settled_at
  * Type: string
  * Description: A time when the acquiring bank settled the transaction amount to the merchant's current account in the ISO 8601 format YYYY-MM-DDThh:mm:ss.SSSZ. Set to null if the parameter is not applicable to the transaction.
* Parameter: manually_corrected_at
  * Type: string
  * Description: A time when the transaction was manually updated at in the ISO 8601 format YYYY-MM-DDThh:mm:ss.SSSZ. Set to null if the parameter is not applicable to the transaction.
* Parameter: psp_settled_at
  * Type: string
  * Description: Date and time of the transaction settlement between bePaid and the merchant in the ISO 8601 format YYYY-MM-DDThh:mm:ss.SSSZ. Set to null if the parameter is not applicable to the transaction.
* Parameter: redirect_url
  * Type: string
  * Description: A URL of the page to finalize the transaction. If the status parameter is set to incomplete, redirect the customer to this URL. It runs the 3-D Secure verification of the cardholder.
* Parameter: parent_uid
  * Type: string
  * Description: A UID of the parent transactions, if applicable.
* Parameter: reason
  * Type: string
  * Description: A description of the chargeback reason.
* Parameter: recurring_type
  * Type: string
  * Description: A type of the recurring transaction. Set to null if the parameter is not applicable to the transaction.
* Parameter: language
  * Type: string
  * Description: A language parameter value from the request, or en, if the parameter is not sent in the request.
* Parameter: status_code
  * Type: integer
  * Description: A status code of the 3-D Secure verification. Set to null if the parameter is not applicable to the transaction.
* Parameter: errors
  * Type: object
  * Description: A section of error details and parameters.
* Parameter: customer
  * Type: object
  * Description: A section of the customer information.
* Parameter: ip
  * Type: string
  * Description: The customer's IP address.
* Parameter: email
  * Type: string
  * Description: The customer's email.
* Parameter: device_id
  * Type: string
  * Description: The customer's device ID.
* Parameter: birth_date
  * Type: string
  * Description: The customer's date of birth.
* Parameter: first_name
  * Type: string
  * Description: The customer's first name.
* Parameter: last_name
  * Type: string
  * Description: The customer's last name.
* Parameter: address
  * Type: string
  * Description: The customer' billing address.
* Parameter: country
  * Type: string
  * Description: The customer's billing country in the ISO 3166-1 alpha-2 format.
* Parameter: city
  * Type: string
  * Description: The customer's billing city.
* Parameter: state
  * Type: string
  * Description: The customer's two-letter billing state, if the billing address country is US or CA.
* Parameter: zip
  * Type: string
  * Description: The customer's billing ZIP or postal code. If country=US, the zip format must be NNNNN or NNNNN-NNNN.
* Parameter: phone
  * Type: string
  * Description: The customer's phone number.
* Parameter: payment_method
  * Type: object
  * Description: A section of details of the payment method used by the customer to make the transaction.
* Parameter: payment_method_type
  * Type: string
  * Description: A payment method type used to make the transaction.
* Parameter: holder
  * Type: string
  * Description: The cardholder name.
* Parameter: stamp
  * Type: string
  * Description: The card stamp.
* Parameter: brand
  * Type: string
  * Description: The card brand.
* Parameter: last_4
  * Type: string
  * Description: The last 4 digits of the card.
* Parameter: first_1
  * Type: string
  * Description: The first digit of the card.
* Parameter: bin
  * Type: string
  * Description: The card BIN.
* Parameter: issuer_country
  * Type: string
  * Description: The country of the card issuing bank.
* Parameter: issuer_name
  * Type: string
  * Description: The issuing bank of the card.
* Parameter: product
  * Type: string
  * Description: The card product type.
* Parameter: exp_month
  * Type: integer
  * Description: The card expiration month represented with two digits, for example 01.
* Parameter: exp_year
  * Type: integer
  * Description: The card expiration year represented with four digits, for example 2021.
* Parameter: token_provider
  * Type: string
  * Description: The card token provider, if any.
* Parameter: token
  * Type: string
  * Description: The card token.
* Parameter: recipient
  * Type: object
  * Description: A section of the recipient's details. Applicable for payouts and P2P transactions initiated by the customer to the recipient.
* Parameter: customer
  * Type: object
  * Description: A section of the recipient's personal and address details.
* Parameter: first_name
  * Type: string
  * Description: The recipient's first name.
* Parameter: last_name
  * Type: string
  * Description: The recipient's last name.
* Parameter: address
  * Type: string
  * Description: The recipient's billing address.
* Parameter: country
  * Type: string
  * Description: The recipient's billing country in the ISO 3166-1 alpha-2 format.
* Parameter: city
  * Type: string
  * Description: The recipient's billing city.
* Parameter: state
  * Type: string
  * Description: The recipient's two-letter billing state, if the billing address country is US or CA.
* Parameter: zip
  * Type: string
  * Description: The recipient's billing ZIP or postal code. If country=US, the zip format must be NNNNN or NNNNN-NNNN.
* Parameter: phone
  * Type: string
  * Description: The recipient's phone number.
* Parameter: payment_method
  * Type: object
  * Description: A section of details of the payment method used to receive a payout or P2P transfer.
* Parameter: holder
  * Type: string
  * Description: The recipient cardholder name.
* Parameter: stamp
  * Type: string
  * Description: The recipient card stamp.
* Parameter: brand
  * Type: string
  * Description: The recipient card brand.
* Parameter: last_4
  * Type: string
  * Description: The last 4 digits of the recipient card.
* Parameter: first_1
  * Type: string
  * Description: The first digit of the recipient card.
* Parameter: bin
  * Type: string
  * Description: The recipient card BIN.
* Parameter: issuer_country
  * Type: string
  * Description: The recipient card country.
* Parameter: issuer_name
  * Type: string
  * Description: The issuing bank of the recipient card.
* Parameter: product
  * Type: string
  * Description: The recipient card product type.
* Parameter: exp_month
  * Type: integer
  * Description: The recipient card expiration month represented with two digits, for example 01.
* Parameter: exp_year
  * Type: integer
  * Description: The recipient card expiration year represented with four digits, for example 2021.
* Parameter: token
  * Type: string
  * Description: The recipient card token.
* Parameter: token_provider
  * Type: string
  * Description: The source card token provider, if any.
* Parameter: payment_method_type
  * Type: string
  * Description: A payment method type used to receive a payout or P2P transfer.
* Parameter: smart_routing_verification
  * Type: object
  * Description: A section of the Smart Routing service parameters. Applicable if the Smart Routing service is activated.
* Parameter: status
  * Type: string
  * Description: A status of the Smart Routing service processing.
* Parameter: three_d_secure_verification
  * Type: object
  * Description: A section of the 3-D Secure verification parameters.
* Parameter: additional_data
  * Type: object
  * Description: A section of additional details about the transaction.
* Parameter: browser
  * Type: object
  * Description: A section of the customer's browser data.
* Parameter: contract
  * Type: object
  * Description: A section of the parameters related to card tokens issued for payments by saved cards.
* Parameter: avs_cvc_verification
  * Type: object
  * Description: A section of the AVS/ CVC verification check.
* Parameter: avs_verification
  * Type: object
  * Description: A section with the result of the AVS verification check.
* Parameter: result_code
  * Type: string
  * Description: A code of the AVS verification check result.
* Parameter: cvc_verification
  * Type: object
  * Description: A section with the result of the CVC verification check.
* Parameter: result_code
  * Type: string
  * Description: A code of the CVC verification check result.
* Parameter: transaction
  * Type: object
  * Description: A section of the transaction details.
* Parameter: ref_id
  * Type: string
  * Description: A transaction reference ID assigned by the bank.
* Parameter: message
  * Type: string
  * Description: A transaction processing message.
* Parameter: amount
  * Type: integer
  * Description: A transaction amount in minimal currency units.
* Parameter: currency
  * Type: string
  * Description: A currency of the transaction in the ISO-4217 format, for example, USD.
* Parameter: billing_descriptor
  * Type: string
  * Description: A transaction billing descriptor.
* Parameter: gateway_id
  * Type: integer
  * Description: An ID of the payment gateway through which the transaction was processed in the bePaid system.
* Parameter: status
  * Type: string
  * Description: A transaction status.
* Parameter: auth_code
  * Type: string
  * Description: A transaction authorization code.
* Parameter: rrn
  * Type: string
  * Description: A Retrieval Reference Number of the transaction assigned by the bank.
* Parameter: bank_code
  * Type: string
  * Description: A transaction processing code assigned by the bank.
* Parameter: links
  * Type: object
  * Description: A section of links.
* Parameter: receipt_url
  * Type: string
  * Description: A URL of the transaction receipt.
* Parameter: bank_info
  * Type: object
  * Description: A section of parameters of the balance request.


If the parameter is not applicable to the transaction, response parameter values are set to `null`.

Processing codes
----------------

An API v.3 response mandatory contains a `code` parameter value in the `{Letter code}.{4 code digits}` format, where:

*   `{Letter code}` stands for a transaction processing status;
*   `{4 error code digits}` relate to an error code of a system service that can not process a transaction.

#### Letter codes



* API v.3 letter code: S
  * API v2 status: successful
  * Status description: The transaction is successfully processed.
* API v.3 letter code: F
  * API v2 status: failed
  * Status description: The transaction is failed due to some reason in the system of the bank / integration provider.
* API v.3 letter code: P
  * API v2 status: pendingincomplete
  * Status description: The transaction is still being processed, or the system waits for the customer's action to complete the transaction.
* API v.3 letter code: E
  * API v2 status: error
  * Status description: There was an error while processing the transaction by bePaid internal services.


#### 4 error code digits



* API v.3 4 digit range: 0000
  * Description: The operation is successful.
* API v.3 4 digit range: 0001 - 0499
  * Description: Error codes of the system validation and processing service for card transactions.
* API v.3 4 digit range: 0501 - 0999
  * Description: Error codes of the system validation and processing service for transactions that are initiated with alternative payment methods.
* API v.3 4 digit range: 1000 - 1999
  * Description: Error codes of the payment gateway service.
* API v.3 4 digit range: 2000 - 3999
  * Description: Error codes of the Smart Routing service.
* API v.3 4 digit range: 4000 - 4999
  * Description: Error codes of the 3-D Secure verification service.
* API v.3 4 digit range: 6000 - 6999
  * Description: Error codes of the AVS/ CVC verification check.
* API v.3 4 digit range: 7000 - 7999
  * Description: Error codes of the Verify service.
* API v.3 4 digit range: 8001
  * Description: Error code of the P2P verification service.
* API v.3 4 digit range: 8010
  * Description: Error code of the payment gateway service for requests in asynchronous mode.
* API v.3 4 digit range: 8005 - 9999
  * Description: Bank error codes.


You can find detailed description of all the codes in the [API v.3 processing error codes](https://docs.bepaid.by/en/using_api/processing_codes/) appendix.

Example of the API v.3 response to the payment transaction request

The sample transaction has the `incomplete` status and the `P.9998` code. Provided that the `three_d_secure_verification` is the only section with the `incomplete` status, the transaction could not be processed as the bePaid system waits for the customer to take the 3-D Secure verification check.

```
{
  "uid": "46154-aba1cf5e57",
  "code": "P.9998",
  "friendly_message": "Incomplete transaction",
  "status": "incomplete",
  "amount": 100,
  "currency": "USD",
  "description": "Test transaction ütf",
  "type": "payment",
  "payment_method": {
    "payment_method_type": "credit_card",
    "holder": "John Doe",
    "stamp": "5f854c844e3007f2ecff2aa614f6a4cc6b8a2c241aab3e5776fe7912dc7b9d92",
    "brand": "visa",
    "last_4": "0013",
    "first_1": "4",
    "bin": "420000",
    "issuer_country": "LT",
    "issuer_name": "VISA",
    "product": "VISA",
    "exp_month": 10,
    "exp_year": 1,
    "exp_year": 2027,
    "token_provider": null,
    "token": "2efef4c9-d4de-4603-bc84-7a9bc5456939"
  },
  "tracking_id": "tracking_id_000",
  "message": null,
  "test": true,
  "created_at": "2022-09-15T08:43:56.521Z",
  "updated_at": "2022-09-15T08:43:57.943Z",
  "paid_at": null,
  "expired_at": null,
  "recurring_type": "initial",
  "closed_at": null,
  "settled_at": null,
  "manually_corrected_at": null,
  "language": "en",
  "redirect_url": "https://gateway.bepaid.by/process/46154-aba1cf5e57",
  "status_code": 21,
  "links": {
    "receipt_url": "https://merchant.bepaid.by/customer/transactions/46154-aba1cf5e57/bbe9f4090e43351ca1ee724a202376cb24da3ffbfa86df30c80e95fb4fdee386?language=en"
  },
  "additional_data": {
    "browser": {
      "screen_width": 1920,
      "screen_height": 1080,
      "screen_color_depth": 24,
      "language": "en",
      "java_enabled": false,
      "user_agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
      "time_zone": -180,
      "time_zone_name": "Europe/Vilnius",
      "accept_header": "*/*",
      "window_height": 667,
      "window_width": 600
    },
    "contract": [
      "recurring"
    ]
  },
  "customer": {
    "ip": "127.0.0.1",
    "email": "john@example.com",
    "device_id": "12312312321fff67",
    "birth_date": "1980-01-31",
    "first_name": "John",
    "last_name": "Doe",
    "address": "1st Street",
    "country": "US",
    "city": "Denver",
    "zip": "96002",
    "state": "CO",
    "phone": null
  },
  "smart_routing_verification": {
    "status": "successful"
  },      
  "three_d_secure_verification": {
    "status": "incomplete",
    "message": "Authentication Available",
    "ve_status": "Y",
    "acs_url": null,
    "pa_req": null,
    "md": null,
    "pa_res_url": "https://gateway.bepaid.by/process/46154-aba1cf5e57",
    "eci": null,
    "pa_status": null,
    "xid": null,
    "cavv": null,
    "cavv_algorithm": null,
    "fail_reason": null,
    "method_process_url": "https://gateway.bepaid.by/api/v1/transactions/bd79f747-a42f-4ee3-b993-069310ca8238/method-process",
    "creq": null
  },
  "transaction": {
    "auth_code": null,
    "bank_code": null,
    "rrn": null,
    "ref_id": null,
    "message": null,
    "amount": 100,
    "currency": "USD",
    "billing_descriptor": null,
    "gateway_id": 645,
    "status": "incomplete"
  },
  "avs_cvc_verification": {
    "avs_verification": {
      "result_code": null
    },
    "cvc_verification": {
      "result_code": null
    }
  }
}

```
