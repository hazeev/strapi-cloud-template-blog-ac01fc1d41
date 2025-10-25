# API v3 and API v2 error codes - bePaid API Documentation
System error codes
------------------


|Code  |Message                   |Friendly message                          |
|------|--------------------------|------------------------------------------|
|S.0000|Transaction is successful.|The transaction is successfully processed.|


Error codes for card transactions: new processing error codes
-------------------------------------------------------------

**F.0100–F.0999**



* Code: F.0100
  * Message: Account ID blocked. Failed to complete the transaction. Check the request parameters or contact the payment service provider for details.
  * Friendly message: Account ID blocked. Failed to complete the transaction. Contact your payment service provider for details.
* Code: F.0101
  * Message: Account ID not found. Failed to complete the transaction. Check the request parameters.
  * Friendly message: Account ID not found. Failed to complete the transaction. Contact your payment service provider for details.
* Code: F.0102
  * Message: Authorization error. Failed to complete the transaction. Check the authorization request parameters.
  * Friendly message: Authorization error. Failed to complete the transaction. Contact the merchant for details.
* Code: F.0103
  * Message: Invalid request signature. Failed to complete the transaction. Check the request signature or certificate.
  * Friendly message: Invalid request signature. Contact the merchant for details.
* Code: F.0104
  * Message: Not allowed. Use another transaction type or contact the payment service provider for details.
  * Friendly message: Not allowed. Failed to complete the transaction. Contact the merchant for details or use another payment method.
* Code: F.0105
  * Message: Do not honor. Contact the payment service provider for details.
  * Friendly message: Do not honor. Failed to complete the transaction. Contact the merchant for details.
* Code: F.0106
  * Message: Terminal error. Contact the payment service provider for details.
  * Friendly message: Terminal error. Failed to complete the transaction. Contact the merchant for details or use another payment method.
* Code: F.0107
  * Message: Invalid merchant account. Contact the payment service provider or acquirer for details.
  * Friendly message: Invalid merchant account. Failed to complete the transaction. Contact the merchant for details.
* Code: F.0108
  * Message: Duplicate transaction or order. Check the status of the original transaction or order. Contact the payment service provider for details.
  * Friendly message: Duplicate order. Failed to complete the transaction. Contact the merchant for the status of the original order.
* Code: F.0109
  * Message: Order expired. Failed to complete the transaction.
  * Friendly message: Order expired. Failed to complete the transaction. Contact the merchant for details.
* Code: F.0110
  * Message: Order ID not found. Failed to complete the transaction. Check the request parameters.
  * Friendly message: Order ID not found. Failed to complete the transaction. Check the transaction parameters or contact the merchant for details.
* Code: F.0111
  * Message: Card expired. Ask the customer to use a valid card.
  * Friendly message: Card expired. Failed to complete the transaction. Use a valid card.
* Code: F.0112
  * Message: CVV verification failed. Ask the customer to enter the valid card CVV.
  * Friendly message: CVV verification failed. Failed to complete the transaction. Enter a valid CVV indicated on your card.
* Code: F.0113
  * Message: Currency not supported. Check the currency in the request or contact the payment service provider for details.
  * Friendly message: Currency not supported. Failed to complete the transaction. Choose another currency or contact the merchant for details.
* Code: F.0114
  * Message: Insufficient funds. Check the account balance or contact the payment service provider for details.
  * Friendly message: Insufficient funds. Failed to complete the transaction. Check the account balance.
* Code: F.0115
  * Message: Acquirer error. Potential fraud. The means of payment might be stolen or lost. Check your customer details.
  * Friendly message: Payment details error. Failed to complete the transaction. Contact the merchant for details.
* Code: F.0116
  * Message: Issuer error. Potential fraud. The means of payment might be stolen or lost. Check your customer details.
  * Friendly message: Payment details error. Failed to complete the transaction. Contact the merchant or the card-issuing bank for details. The bank's phone number is indicated on the back of your card.
* Code: F.0117
  * Message: Temporary provider system error. Contact the payment service provider for details.
  * Friendly message: Provider system error. Failed to complete the transaction. Try again later or contact the merchant for details.
* Code: F.0118
  * Message: Provider system error. Contact the payment service provider for details.
  * Friendly message: Provider system error. Failed to complete the transaction. Use another payment method or contact the merchant for details.
* Code: F.0119
  * Message: Temporary provider system error. Contact the card-issuing bank for details.
  * Friendly message: Provider system error. Failed to complete the transaction. Try again later or contact the bank that issued your card for details. The bank's phone number is indicated on the back of your card.
* Code: F.0120
  * Message: Provider system error. Contact the card-issuing bank for details.
  * Friendly message: Provider system error. Failed to complete the transaction. Use another payment method or contact the bank that issued your card for details. The bank's phone number is indicated on the back of your card.
* Code: F.0121
  * Message: Temporary provider system error. Contact the customer’s payment service provider for details.
  * Friendly message: Provider system error. Failed to complete the transaction. Try again later or contact your payment service provider for details.
* Code: F.0122
  * Message: Provider system error. Contact the customer’s payment service provider for details.
  * Friendly message: Provider system error. Failed to complete the transaction. Use another payment method or contact your payment service provider for details.
* Code: F.0123
  * Message: Transaction amount or the number of transactions exceeds the payment service provider’s limits. Check the transaction amount and the number of transactions or contact the payment service provider for details.
  * Friendly message: Transaction amount or the number of transactions exceeds the limits. Failed to complete the transaction. Check the transaction amount or contact the merchant for details.
* Code: F.0124
  * Message: Transaction amount or the number of transactions exceeds the issuer's limits. Check the transaction amount or the number of transactions. Ask the customer to contact the card-issuing bank.
  * Friendly message: Transaction amount or the number of transactions exceeds the limits. Failed to complete the transaction. Contact the merchant or the bank that issued your card for details. The bank's phone number is indicated on the back of your card.
* Code: F.0125
  * Message: Transaction amount or the number of transactions exceeds the payment service provider’s limits. Check the transaction amount and the number of transactions. Contact the customer’s payment service provider for details.
  * Friendly message: Transaction amount or the number of transactions exceeds the limits. Failed to complete the transaction. Contact the merchant or your payment service provider for details.
* Code: F.0126
  * Message: Wallet data error. Ask the client to check the wallet data. Contact the payment service provider for details.
  * Friendly message: Wallet data error. Check the wallet data or use another card.
* Code: F.0127
  * Message: Invalid card data. Ask the customer to check the card data. Contact the payment service provider for details.
  * Friendly message: Invalid card data. Failed to complete the transaction. Check your card details or use another card.
* Code: F.0128
  * Message: Invalid request parameters. Failed to complete the transaction. Check the required request parameters.
  * Friendly message: Invalid request parameters. Check the transaction data or contact the merchant for details.
* Code: F.0129
  * Message: 3-D Secure verification error. Contact the payment service provider for details.
  * Friendly message: 3-D Secure verification error. Check your 3-D Secure code or contact the payment service provider for details.
* Code: F.0130
  * Message: 3-D Secure verification error. Contact the issuing bank for details.
  * Friendly message: 3-D Secure verification error. Check your 3-D Secure code or contact your card-issuing bank for details. The bank's phone number is indicated on the back of your card.
* Code: F.0131
  * Message: Transaction confirmation error. Failed to complete the transaction. Ask the customer to confirm the payment.
  * Friendly message: Transaction confirmation error. Failed to complete the transaction. Check the payment confirmation.
* Code: F.0132
  * Message: The transaction was rejected by the client. The transaction could not be completed. Ask the customer to repeat the payment.
  * Friendly message: The transaction was rejected. The transaction could not be completed. Please choose another payment method or retry the payment.
* Code: F.0133
  * Message: Wrong phone number. Failed to complete the transaction. Ask the customer to enter the phone number associated with their card.
  * Friendly message: The submitted phone number doesn’t match the one associated with your card. Failed to complete the transaction. Please enter the correct phone number.
* Code: F.0134
  * Message: Transaction confirmation error. Wrong SMS key. Ask the customer to submit the correct value.
  * Friendly message: Transaction not confirmed by the bank. Wrong SMS key. Please check the submitted data.
* Code: F.0135
  * Message: Cannot initialize a new transaction until the previous one is processed. Please ask the customer to complete the previous transaction or wait until it is completed.
  * Friendly message: Transaction failed. Complete the previous transaction or wait until the previous transaction is finalized and try again.
* Code: F.0998
  * Message: Transaction failed. The transaction was automatically completed by the provider's system. No further action is required.
  * Friendly message: Transaction failed. The transaction was automatically completed by the provider's system. No further action is required.
* Code: F.0999
  * Message: Failed to complete the transaction. Contact the payment service provider.
  * Friendly message: Failed to complete the transaction. Contact the merchant for details.


Error codes for alternative payment method transactions: processing errors
--------------------------------------------------------------------------

**0200—0399**



* Code: F.0201
  * Message: Authorization error: Failed to complete the transaction. Check the authorization request parameters.
  * Friendly message: Authorization error: Failed to complete the transaction. Contact the payment method provider for details.
* Code: F.0202
  * Message: Account ID not found: Failed to complete the transaction. Check the request parameters.
  * Friendly message: Account ID not found: Failed to complete the transaction. Contact the payment method provider for details.
* Code: F.0203
  * Message: Account ID blocked: Failed to complete the transaction. Check the request parameters or contact the payment method provider for details.
  * Friendly message: Account ID blocked: Failed to complete the transaction. Contact the payment method provider for details.
* Code: F.0204
  * Message: Order ID not found: Failed to complete the transaction. Check the request parameters.
  * Friendly message: Order ID not found: Failed to complete the transaction. Check the transaction parameters or contact the merchant for details.
* Code: F.0205
  * Message: Order expired: Failed to complete the transaction.
  * Friendly message: Order expired: Failed to complete the transaction. Contact the merchant for details.
* Code: F.0206
  * Message: Transaction confirmation error: Failed to complete the transaction. Ask the customer to confirm the payment.
  * Friendly message: Transaction confirmation error: Failed to complete the transaction. Check the payment confirmation.
* Code: F.0207
  * Message: Insufficient funds: Check the account balance or contact the payment service provider for details.
  * Friendly message: Insufficient funds: Failed to complete the transaction. Check the account balance.
* Code: F.0208
  * Message: Invalid provider: Contact the payment service provider for details.
  * Friendly message: Invalid provider: Failed to complete the transaction. Contact the merchant for details.
* Code: F.0209
  * Message: Terminal error: Contact the payment service provider for details.
  * Friendly message: Terminal error: Failed to complete the transaction. Check the transaction parameters or use a different terminal.
* Code: F.0210
  * Message: Provider system error: Contact the payment service provider for details.
  * Friendly message: Provider system error: Failed to complete the transaction. Try again later or contact the payment method provider for details.
* Code: F.0211
  * Message: Provider system error: Contact the payment service provider for details.
  * Friendly message: Provider system error: Failed to complete the transaction. Contact the merchant for details or use another payment method.
* Code: F.0212
  * Message: Provider system error: Contact the payment service provider for details.
  * Friendly message: Provider system error: Failed to complete the transaction. Contact the payment method provider for details or use another payment method.
* Code: F.0213
  * Message: Not allowed: Contact the payment service provider for details.
  * Friendly message: Not allowed: Failed to complete the transaction. Contact the merchant for details or use another payment method.
* Code: F.0214
  * Message: Currency not supported: Check the currency in the request or contact the payment service provider for details.
  * Friendly message: Currency not supported: Failed to complete the transaction. Choose another currency or contact the merchant for details.
* Code: F.0215
  * Message: Duplicate transaction or order: Check the status of original transaction or order.
  * Friendly message: Duplicate transaction or order: Failed to complete the transaction. Contact the merchant for details.
* Code: F.0216
  * Message: Wrong transaction amount: Check the transaction amount or contact the payment service provider for details.
  * Friendly message: Wrong transaction amount: Failed to complete the transaction. Check the transaction amount or contact the merchant for details.
* Code: F.0217
  * Message: Payment details error: Potential fraud. Check your customer details.
  * Friendly message: Payment details error: Failed to complete the transaction. Contact the merchant for details.
* Code: F.0218
  * Message: Invalid request parameters: Failed to complete the transaction. Check the required request parameters.
  * Friendly message: Invalid request parameters: Check the transaction parameters or contact the merchant for details.
* Code: F.0219
  * Message: Invalid request signature: Failed to complete the transaction. Check the request signature.
  * Friendly message: Invalid request signature: Contact the merchant for details.
* Code: P.0220
  * Message: Transaction in progress.
  * Friendly message: Transaction is being processed. Please wait.
* Code: F.0221
  * Message: Wallet error. Failed to complete the transaction. Check wallet data or contact the payment service provider for details.
  * Friendly message: Wallet error. Contact the merchant for details.
* Code: F.0222
  * Message: Provider system error: Contact the payment service provider for details.
  * Friendly message: Provider system error. Failed to complete the transaction. Try again later or contact the payment method provider for details or select another payment method.
* Code: F.0399
  * Message: Unknown error: Failed to complete the transaction. Contact the payment service provider.
  * Friendly message: Unknown error: Failed to complete the transaction. Contact the merchant for details.


Error codes for card transactions: bePaid validation errors
-----------------------------------------------------------

**1000—1899**



* Code: E.1000
  * Message: Unknown error. Contact the payment service provider for details.
  * Friendly message: We are sorry, but something went wrong.
* Code: E.1001
  * Message: Invalid request URL. Contact the payment service provider for details.
  * Friendly message: Invalid request URL. Contact the merchant for details.
* Code: E.1002
  * Message: Request URL not found. Contact the payment service provider for details.
  * Friendly message: Request URL not found. Contact the merchant for details.
* Code: E.1003
  * Message: gateway_id not found. Send the correct gateway_id or contact the payment service provider for details.
  * Friendly message: Payment gateway not found. Contact the merchant for details.
* Code: E.1004
  * Message: Shop not found. Contact the payment service provider for details.
  * Friendly message: Shop not found. Contact the merchant for details.
* Code: E.1005
  * Message: Invalid parameters. Contact the payment service provider for details.
  * Friendly message: Invalid parameters. Contact the merchant for details.
* Code: E.1006
  * Message: Unsupported gateway type. Contact the payment service provider for details.
  * Friendly message: Unsupported gateway type. Contact the merchant for details.
* Code: E.1007
  * Message: Unsupported currency. Contact the payment service provider for details.
  * Friendly message: Unsupported currency. Contact the merchant for details.
* Code: E.1008
  * Message: Unsupported card type. Contact the payment service provider for details.
  * Friendly message: Unsupported card type. Contact the merchant for details.
* Code: E.1009
  * Message: Not allowed. Contact the payment service provider for details.
  * Friendly message: Not allowed. Failed to process the request. Contact the merchant for details.
* Code: E.1010
  * Message: Card data decryption error. Contact the payment service provider for details.
  * Friendly message: Card data decryption error. Contact the payment service provider for details.
* Code: E.1011
  * Message: Not allowed to use PAN. Contact the payment service provider for details.
  * Friendly message: Not allowed to use PAN. Failed to complete the transaction. Contact the merchant for details.
* Code: E.1012
  * Message: Invalid test value. Check test values for the selected payment method.
  * Friendly message: Invalid test value. Contact the merchant for details.
* Code: E.1013
  * Message: Empty test set. Indicate the test set in the shop settings.
  * Friendly message: Empty test set. Contact the merchant for details.
* Code: E.1014
  * Message: Wrong test set. A wrong test set is used. Use the test set indicated for the shop.
  * Friendly message: Wrong test set. Contact the merchant for details.
* Code: E.1015
  * Message: Live data not supported. Use test values only for test requests
  * Friendly message: Live data not supported in test mode. Contact the merchant for details.
* Code: E.1016
  * Message: Transaction type not supported. Use a different transaction type or contact the payment service provider for details.
  * Friendly message: Transaction type not supported. Contact the merchant for details.
* Code: E.1017
  * Message: Request section missing. Check request parameters.
  * Friendly message: Request section missing. Contact the merchant for details.
* Code: E.1018
  * Message: Duplicate transaction or order. Failed to complete the transaction. Check the status of the original transaction.
  * Friendly message: Duplicate transaction or order. Failed to complete the transaction. Check the status of the original transaction or contact the merchant for details.
* Code: P.1019
  * Message: Transaction in progress
  * Friendly message: Transaction is being processed. Please wait.
* Code: E.1020
  * Message: Welcome!
  * Friendly message: Welcome!
* Code: E.1021
  * Message: Authorization error. Check the authorization request parameters or contact the payment service provider for details.
  * Friendly message: Authorization error. Contact the merchant for details.
* Code: E.1022
  * Message: Access denied. Contact the payment service provider for details.
  * Friendly message: Access denied. Contact the merchant for details.
* Code: E.1023
  * Message: Bad request. Check the request parameters.
  * Friendly message: Bad request. Contact the merchant for details.
* Code: E.1024
  * Message: MIME type not supported. Set 'Content-type' header to 'application/ json'.
  * Friendly message: MIME type not supported. Contact the merchant for details.
* Code: E.1025
  * Message: Invalid request parameters.orCheck the transaction parameters or contact the payment service provider for details.
  * Friendly message: Invalid request parameters. Contact the merchant for details.
* Code: E.1026
  * Message: Invalid JSON. Check the request parameters.
  * Friendly message: Invalid JSON. Contact the merchant for details.
* Code: E.1027
  * Message: Parent transaction required. Customer should make a payment before a credit transaction.
  * Friendly message: Parent transaction required. Contact the merchant for details.
* Code: E.1028
  * Message: No available gateways. Allowed gateways are missing. Contact the payment service provider for details.
  * Friendly message: No available gateways. Failed to complete the transaction. Contact the merchant for details.
* Code: E.1029
  * Message: Invalid Google merchant token. Check the request parameters or contact the payment service provider for details.
  * Friendly message: Invalid Google merchant token. Contact the merchant for details.
* Code: E.1030
  * Message: Invalid payment token. Failed to get payment details by the submitted token. Check the payment token or contact the payment service provider for details.
  * Friendly message: Invalid payment token. Failed to complete the transaction. Contact the merchant for details.
* Code: E.1031
  * Message: Invalid AFT parameters. Check the request parameters or contact the payment service provider for details.
  * Friendly message: Invalid AFT parameters. Contact the merchant for details.
* Code: E.1032
  * Message: Invalid OCT parameters. Check the request parameters or contact the payment service provider for details.
  * Friendly message: Invalid OCT parameters. Contact the merchant for details.
* Code: E.1033
  * Message: Currency not found. Contact the payment service provider for details.
  * Friendly message: Currency not found. Failed to complete the transaction. Contact the merchant for details.
* Code: E.1034
  * Message: Gateway not defined. Send the gateway_id parameter.
  * Friendly message: Payment method provider not defined. Contact the merchant for details.
* Code: E.1035
  * Message: Acquirer response error. Contact the payment service provider for details.
  * Friendly message: Acquirer response error.  Contact the merchant for details.
* Code: E.1036
  * Message: Request expired. Send your request again.
  * Friendly message: Request expired. Try again or contact the merchant to check the request status.
* Code: E.1037
  * Message: Visa Alias parameter not found. Check request parameters.
  * Friendly message: Visa Alias not found. Check the phone number or contact the merchant for details.
* Code: E.1038
  * Message: Invalid transaction parameters. Total amount in split section must equal the transaction amount. Check the transaction parameters or contact the payment service provider for details.
  * Friendly message: Invalid transaction parameters. Total amount in split section must equal the transaction amount. Contact the merchant for details.
* Code: E.1039
  * Message: Invalid transaction parameters. tax_id required. Check the transaction parameters or contact the payment service provider for details.
  * Friendly message: Invalid transaction parameters. tax_id required. Contact the merchant for details.
* Code: E.1040
  * Message: Invalid transaction parameters. tax_id supports only numbers. Check the transaction parameters or contact the payment service provider for details.
  * Friendly message: Invalid transaction parameters. tax_id supports only numbers. Contact the merchant for details.
* Code: E.1041
  * Message: Invalid transaction parameters. additional_data.split section required. Check the transaction parameters or contact the payment service provider for details.
  * Friendly message: Invalid transaction parameters. additional_data.split section required. Contact the merchant for details.
* Code: E.1042
  * Message: Invalid transaction parameters. screen_width is required. Check the transaction parameters or contact the payment service provider for details.
  * Friendly message: Invalid transaction parameters. screen_width is required. Contact the merchant for details.
* Code: E.1043
  * Message: Invalid transaction parameters. screen_width supports only numeric values. Check the transaction parameters or contact the payment service provider for details.
  * Friendly message: Invalid transaction parameters. screen_width supports only numeric values. Contact the merchant for details.
* Code: E.1044
  * Message: Invalid transaction parameters. screen_height is required. Check the transaction parameters or contact the payment service provider for details.
  * Friendly message: Invalid transaction parameters. screen_height is required. Contact the merchant for details.
* Code: E.1045
  * Message: Invalid transaction parameters. screen_height supports only numeric values. Check the transaction parameters or contact the payment service provider for details.
  * Friendly message: Invalid transaction parameters. screen_height supports only numeric values. Contact the merchant for details.
* Code: E.1046
  * Message: Invalid transaction parameters. screen_color_depth is required. Check the transaction parameters or contact the payment service provider for details.
  * Friendly message: Invalid transaction parameters. screen_color_depth is required. Contact the merchant for details.
* Code: E.1047
  * Message: Invalid transaction parameters. screen_color_depth supports only numeric values. Check the transaction parameters or contact the payment service provider for details.
  * Friendly message: Invalid transaction parameters. screen_color_depth supports only numeric values. Contact the merchant for details.
* Code: E.1048
  * Message: Invalid transaction parameters. language is required. Check the transaction parameters or contact the payment service provider for details.
  * Friendly message: Invalid transaction parameters. language is required. Contact the merchant for details.
* Code: E.1049
  * Message: Invalid transaction parameters. Unsupported value of the language parameter. Check the transaction parameters or contact the payment service provider for details.
  * Friendly message: Invalid transaction parameters. Unsupported value of the language parameter. Contact the merchant for details.
* Code: E.1050
  * Message: Invalid transaction parameters. java_enabled is required. Check the transaction parameters or contact the payment service provider for details.
  * Friendly message: Invalid transaction parameters. java_enabled is required. Contact the merchant for details.
* Code: E.1051
  * Message: Invalid transaction parameters. java_enabled supports only boolean values. Check the transaction parameters or contact the payment service provider for details.
  * Friendly message: Invalid transaction parameters. java_enabled supports only boolean values. Contact the merchant for details.
* Code: E.1052
  * Message: Invalid transaction parameters. window_height is required. Check the transaction parameters or contact the payment service provider for details.
  * Friendly message: Invalid transaction parameters. window_height is required. Contact the merchant for details.
* Code: E.1053
  * Message: Invalid transaction parameters. window_height supports only numeric values. Check the transaction parameters or contact the payment service provider for details.
  * Friendly message: Invalid transaction parameters. window_height supports only numeric values. Contact the merchant for details.
* Code: E.1054
  * Message: Invalid transaction parameters. window_width is required. Check the transaction parameters or contact the payment service provider for details.
  * Friendly message: Invalid transaction parameters. window_width is required. Contact the merchant for details.
* Code: E.1055
  * Message: Invalid transaction parameters. window_width supports only numeric values. Check the transaction parameters or contact the payment service provider for details.
  * Friendly message: Invalid transaction parameters. window_width supports only numeric values. Contact the merchant for details.
* Code: E.1056
  * Message: Invalid transaction parameters. time_zone is required. Check the transaction parameters or contact the payment service provider for details.
  * Friendly message: Invalid transaction parameters. time_zone is required. Contact the merchant for details.
* Code: E.1057
  * Message: Invalid transaction parameters. Unsupported format of the time_zone parameter. Check the transaction parameters or contact the payment service provider for details.
  * Friendly message: Invalid transaction parameters. Unsupported format of the time_zone parameter. Contact the merchant for details.
* Code: E.1058
  * Message: Invalid transaction parameters. accept_header is required. Check the transaction parameters or contact the payment service provider for details.
  * Friendly message: Invalid transaction parameters. accept_header is required. Contact the merchant for details.
* Code: E.1059
  * Message: Invalid transaction parameters. Unsupported format of the accept_header parameter. Check the transaction parameters or contact the payment service provider for details.
  * Friendly message: Invalid transaction parameters. Unsupported format of the accept_header parameter. Contact the merchant for details.
* Code: E.1060
  * Message: Invalid transaction parameters. user_agent is required. Check the transaction parameters or contact the payment service provider for details.
  * Friendly message: Invalid transaction parameters. user_agent is required. Contact the merchant for details.
* Code: E.1061
  * Message: Invalid transaction parameters. Unsupported format of the user_agent parameter. Check the transaction parameters or contact the payment service provider for details.
  * Friendly message: Invalid transaction parameters. Unsupported format of the user_agent parameter. Contact the merchant for details.
* Code: E.1062
  * Message: Invalid transaction parameters. ip_address is required. Check the transaction parameters or contact the payment service provider for details.
  * Friendly message: Invalid transaction parameters. ip_address is required. Contact the merchant for details.
* Code: E.1063
  * Message: Invalid transaction parameters. Unsupported format of the ip_address parameter. Check the transaction parameters or contact the payment service provider for details.
  * Friendly message: Invalid transaction parameters. Unsupported format of the ip_address parameter. Contact the merchant for details.
* Code: E.1064
  * Message: Encrypted data decryption error. Contact the payment service provider for details.
  * Friendly message: Encrypted data decryption error. Contact the merchant for details.
* Code: E.1065
  * Message: This type of integration is not allowed for your account. If you are sure that the integration was done correctly, please contact the payment service provider for assistance.
  * Friendly message: This type of integration is not allowed for your account.


Error codes for alternative payment method transactions: bePaid validation errors
---------------------------------------------------------------------------------

**0600—0999**



* Code: E.0600
  * Message: Unknown error: Contact the payment service provider for details.
  * Friendly message: We are sorry, but something went wrong.
* Code: E.0601
  * Message: Invalid request URL: Contact the payment service provider for details.
  * Friendly message: Invalid request URL: Contact the merchant for details.
* Code: E.0602
  * Message: Request URL not found: Contact the payment service provider for details.
  * Friendly message: Request URL not found: Contact the merchant for details.
* Code: E.0603
  * Message: gateway_id not found: Send the correct gateway_id or contact the payment service provider for details.
  * Friendly message: Payment method provider not found: Contact the merchant for details.
* Code: E.0604
  * Message: Shop not found: Contact the payment service provider for details.
  * Friendly message: Shop not found: Contact the merchant for details.
* Code: E.0605
  * Message: Invalid parameters: Contact the payment service provider for details.
  * Friendly message: Invalid parameters: Contact the merchant for details.
* Code: E.0606
  * Message: Unsupported gateway type: Contact the payment service provider for details.
  * Friendly message: Unsupported gateway type: Contact the merchant for details.
* Code: E.0607
  * Message: Unsupported currency: Contact the payment service provider for details.
  * Friendly message: Unsupported currency: Contact the merchant for details.
* Code: E.0608
  * Message: Invalid provider response: Contact the payment service provider for details.
  * Friendly message: Invalid provider response: Contact the merchant for details.
* Code: E.0609
  * Message: Not allowed: Contact the payment service provider for details.
  * Friendly message: Not allowed: Failed to process the request. Contact the merchant for details.
* Code: E.0612
  * Message: Invalid test value: Check test values for the selected payment method.
  * Friendly message: Invalid test value: Contact the merchant for details.
* Code: E.0613
  * Message: Empty test set: Indicate the test set in the shop settings.
  * Friendly message: Empty test set: Contact the merchant for details.
* Code: E.0614
  * Message: Wrong test set: A wrong test set is used. Use the test set indicated for the shop.
  * Friendly message: Wrong test set: Contact the merchant for details.
* Code: E.0615
  * Message: Live data not supported: Use test values only for test requests
  * Friendly message: Live data not supported in test mode: Contact the merchant for details.
* Code: E.0616
  * Message: Transaction type not supported: Use a different transaction type or contact the payment service provider for details.
  * Friendly message: Transaction type not supported: Contact the merchant for details.
* Code: E.0617
  * Message: Request section missing: Check request parameters.
  * Friendly message: Request section missing: Contact the merchant for details.
* Code: E.0618
  * Message: Duplicate transaction or order: Failed to complete the transaction. Check the status of the original transaction.
  * Friendly message: Duplicate transaction or order: Failed to complete the transaction. Check the status of the original transaction or contact the merchant for details.
* Code: P.0619
  * Message: Transaction in progress
  * Friendly message: Transaction is being processed. Please wait.
* Code: P.0620
  * Message: Welcome!
  * Friendly message: Welcome!
* Code: E.0621
  * Message: Authorization error: Check the authorization request parameters or contact the payment method provider for details.
  * Friendly message: Authorization error: Contact the merchant for details.
* Code: E.0622
  * Message: Access denied: Contact the payment service provider for details.
  * Friendly message: Access denied: Contact the merchant for details.
* Code: F.0623
  * Message: Bad request: Check the request parameters.
  * Friendly message: Bad request: Contact the merchant for details.
* Code: E.0624
  * Message: MIME type not supported: Set 'Content-type' header to 'application/ json'.
  * Friendly message: MIME type not supported: Contact the merchant for details.
* Code: E.0625
  * Message: Invalid request parameters: Check the transaction parameters or contact the payment service provider for details.
  * Friendly message: Invalid request parameters: Contact the merchant for details.
* Code: E.0626
  * Message: Invalid JSON: Check the request parameters.
  * Friendly message: Invalid JSON: Contact the merchant for details.
* Code: E.0627
  * Message: Parent transaction required: Customer should make a payment before a credit transaction.
  * Friendly message: Parent transaction required: Contact the merchant for details.
* Code: E.0628
  * Message: No available gateways: Allowed gateways are missing. Contact the payment service provider for details.
  * Friendly message: No available gateways: Failed to complete the transaction. Contact the merchant for details.
* Code: E.0629
  * Message: No available gateways: Allowed gateways are missing. Contact the payment service provider for details.
  * Friendly message: No available gateways: Failed to complete the transaction. Contact the payment service provider for details.
* Code: E.0630
  * Message: Invalid payment token: Failed to get payment details by the submitted token. Check the payment token or contact the payment service provider for details.
  * Friendly message: Invalid payment token: Failed to complete the transaction. Contact the merchant for details.
* Code: E.0633
  * Message: Currency not found: Contact the payment service provider for details.
  * Friendly message: Currency not found: Failed to complete the transaction. Contact the merchant for details.
* Code: E.0634
  * Message: Gateway not defined: Send the gateway_id parameter.
  * Friendly message: Payment method provider not defined: Contact the merchant for details.
* Code: E.0635
  * Message: Provider response error: Contact the payment service provider for details.
  * Friendly message: Provider response error:Contact the merchant for details.
* Code: E.0636
  * Message: Request expired: Send your request again.
  * Friendly message: Request expired: Try again or contact the merchant to check the request status.
* Code: E.0638
  * Message: Transaction not found.
  * Friendly message: Existing transaction not found: Contact the payment service provider for details.


Error codes of the Smart Routing service
----------------------------------------

**2000—3999**



* Code: F.2001
  * Message: SmartRouting - Connection error.
  * Friendly message: The transaction was declined due to security rules.
* Code: F.2002
  * Message: SmartRouting - Validation error.
  * Friendly message: The transaction was declined due to security rules.
* Code: F.2003
  * Message: SmartRouting - invalid response.
  * Friendly message: The transaction was declined due to security rules.
* Code: F.2004
  * Message: SmartRouting - resource not found.
  * Friendly message: The transaction was declined due to security rules.
* Code: F.2005
  * Message: SmartRouting - Exception in gateway action.
  * Friendly message: The transaction was declined due to security rules.
* Code: F.2006
  * Message: The transaction was declined due to security rules.
  * Friendly message: The transaction was declined due to security rules.
* Code: F.2007
  * Message: Transaction didn't pass risk management system.
  * Friendly message: Transaction didn't pass risk management system
* Code: F.2008
  * Message: Transaction didn't pass risk management system.
  * Friendly message: Transaction didn't pass risk management system
* Code: F.2009
  * Message: The transaction was declined due to security rules.
  * Friendly message: The transaction was declined due to security rules.
* Code: F.2010
  * Message: The transaction was declined due to inactive gateway.
  * Friendly message: The transaction was declined due to security rules.
* Code: F.2011
  * Message: The transaction was declined due to full gateways.
  * Friendly message: The transaction was declined due to security rules.
* Code: F.2012
  * Message: The transaction was declined due to security rules.
  * Friendly message: The transaction was declined due to security rules.
* Code: F.2401
  * Message: User ID not authorized. Contact the payment service provider for details.
  * Friendly message: User ID not authorized. Contact the payment service provider for details.
* Code: F.2403
  * Message: Account ID blocked. Contact the payment service provider for details.
  * Friendly message: Account ID blocked. Contact the payment service provider for details.
* Code: F.2404
  * Message: Account ID is not found. Contact the payment service provider for details.
  * Friendly message: Account ID is not found. Contact the merchant for details.


Error codes of the 3-D Secure verification service
--------------------------------------------------

**4000—4999**



* Code: F.4001
  * Message: Card authentication failed, and the transaction cannot be completed.
  * Friendly message: Card authentication failed. Please double check that you have entered your card details correctly.
* Code: F.4002
  * Message: Card is not enrolled
  * Friendly message: Your card is not enrolled for 3-D Secure. Contract your bank to activate it for the card.
* Code: F.4003
  * Message: Verification status is missing. 3-D Secure service is temporarily unavailable.
  * Friendly message: Verification status is missing. 3-D Secure service is temporarily unavailable. Please try later or contact tech support.
* Code: F.4004
  * Message: Verification status value provided is not valid or recognized by the 3-D Secure.
  * Friendly message: Verification could not be completed due to an unexpected issue. Try again later or contact support.
* Code: F.4005
  * Message: Authentication could not be completed due to an unexpected technical issue.
  * Friendly message: Authentication could not be completed due to an unexpected technical issue. Please try later or contact tech support.
* Code: F.4006
  * Message: Transaction failed due to 3-D Secure rules. Check the rules set for the shop or contact the payment service provider for details.
  * Friendly message: Transaction failed due to 3-D Secure rules. Contact the merchant for details.
* Code: F.4007
  * Message: 3-D Secure service is temporarily unavailable. Please try later or contact tech support.
  * Friendly message: 3-D Secure service is temporarily unavailable. Please try later or contact tech support.
* Code: F.4008
  * Message: Payment authentication response value provided is not valid or recognized by the 3-D Secure.
  * Friendly message: Authentication is failed and the transaction cannot be completed successfully. Please contact your card issuer to resolve the issue.
* Code: F.4009
  * Message: An error occurred during the processing of the payment authentication response.
  * Friendly message: Payment authentication error. Check your card details and try again. If the problem persists, contact the bank's technical support.
* Code: F.4010
  * Message: An error occurred during the processing of the payment authentication response.
  * Friendly message: An error occurred during the processing of the payment authentication response. Please try later or contact tech support.
* Code: F.4011
  * Message: Redirect to pass 3-D Secure 1.0 verification.
  * Friendly message: Redirect to pass 3-D Secure verification.
* Code: F.4012
  * Message: Redirect to pass 3-D Secure 2.0 verification.
  * Friendly message: Redirect to pass 3-D Secure verification.
* Code: F.4013
  * Message: Card authentication failed.
  * Friendly message: Card authentication failed. Please double-check that you've entered your card details correctly.
* Code: F.4014
  * Message: Unknown Device
  * Friendly message: Unknown Device. Please try using a different device or contact your card issuer for assistance.
* Code: F.4015
  * Message: Unsupported Device
  * Friendly message: Unsupported Device. Please try using a different device or contact customer support for assistance.
* Code: F.4016
  * Message: Exceeds authentication frequency limit
  * Friendly message: Exceeds authentication frequency limit. Please wait a few minutes and try again or contact your card issuer for assistance.
* Code: F.4017
  * Message: Expired card.
  * Friendly message: Please check the expiry date of your card and try again or contact your card issuer for assistance.
* Code: F.4018
  * Message: Invalid card number.
  * Friendly message: The card number is invalid. Please check and re-enter the details or try a different card.
* Code: F.4019
  * Message: Invalid transaction.
  * Friendly message: The transaction details provided are invalid. Please double-check the details and try again or contact your card issuer for assistance.
* Code: F.4020
  * Message: No Card record.
  * Friendly message: No Card record. Please check that you entered the correct card details or try using a different card.
* Code: F.4021
  * Message: Security failure.
  * Friendly message: Card authentication failed. Please try using a different card.
* Code: F.4022
  * Message: Stolen card.
  * Friendly message: Card authentication failed. Please contact your card issuer for assistance.
* Code: F.4023
  * Message: Suspected fraud.
  * Friendly message: Card authentication failed. Please double-check that your card details are entered correctly or contact your card issuer
* Code: F.4024
  * Message: Transaction not permitted to cardholder.
  * Friendly message: Transaction is not permitted for this card. Please try again with a different card or contact your card issuer for assistance.
* Code: F.4025
  * Message: Cardholder is not enrolled in service.
  * Friendly message: Card is not enrolled in the authentication service. Please contact your card issuer for assistance.
* Code: F.4026
  * Message: Transaction timed out at the ACS.
  * Friendly message: The transaction timed out at the authentication service. Please try again and make sure to complete the authentication process in a timely manner.
* Code: F.4027
  * Message: Low confidence.
  * Friendly message: Card authentication failed. Please contact your card issuer
* Code: F.4028
  * Message: Medium confidence.
  * Friendly message: Card authentication failed. Please contact your card issuer
* Code: F.4029
  * Message: High confidence.
  * Friendly message: Card authentication failed. Please contact your card issuer
* Code: F.4030
  * Message: Very High confidence.
  * Friendly message: Card authentication failed. Please contact your card issuer
* Code: F.4031
  * Message: Exceeds ACS maximum challenges.
  * Friendly message: You've exceeded the maximum number of authentication attempts. Please wait a while and try again later.
* Code: F.4032
  * Message: Non-Payment transaction not supported.
  * Friendly message: This transaction type is not supported by the authentication service. Please contact our support team for assistance.
* Code: F.4033
  * Message: 3RI transaction not supported.
  * Friendly message: The type of 3-D Secure transaction requested is not supported. Please contact our support team for assistance.
* Code: F.4034
  * Message: ACS technical issue.
  * Friendly message: There is a technical issue with the Access Control Server (ACS), and the transaction cannot be completed. Please contact our support team for assistance.
* Code: F.4035
  * Message: Decoupled Authentication required by ACS but not requested by 3DS Requestor.
  * Friendly message: Additional authentication is needed for this transaction, please contact your card issuer for assistance.
* Code: F.4036
  * Message: 3DS Requestor Decoupled Max Expiry Time exceeded.
  * Friendly message: The maximum expiry time for decoupled authentication has been exceeded. Please try again with a different authentication method.
* Code: F.4037
  * Message: Decoupled Authentication was provided insufficient time to authenticate cardholder. ACS will not make attempt.
  * Friendly message: The authentication service was not given enough time to authenticate the cardholder. Please try again and make sure to complete the authentication process in a timely manner.
* Code: F.4038
  * Message: Authentication attempted but not performed by the cardholder.
  * Friendly message: Authentication was attempted but not performed by the cardholder. Please try again and make sure to complete the authentication process yourself.
* Code: F.4039
  * Message: DS dropped reason code received from ACS.
  * Friendly message: There was an error with the authentication service. Please contact our support team for assistance.
* Code: F.4040
  * Message: DS error.
  * Friendly message: Something went wrong. Please contact our support team for assistance.


Other Errors
------------

**1900—1999 — Error codes of the beQueue service**



* Code: F.1900
  * Message: Unknown error: Contact the payment service provider for details.
  * Friendly message: We are sorry, but something went wrong.
* Code: F.1901
  * Message: Invalid request URL: Contact the payment service provider for details.
  * Friendly message: Invalid request URL: Contact the merchant for details.


**5100—5199 — Error codes of the External Tokenization service**



* Code: E.5100
  * Message: Error to use the saved card. Try to re-link the card or add another card. Contact the merchant for details.
  * Friendly message: Error to use the saved card. Try to re-link the card or add another card. Contact the merchant for details.
* Code: E.5101
  * Message: Error to use the saved card. Try to re-link the card or add another card. Contact the merchant for details.
  * Friendly message: Error to use the saved card. Try to re-link the card or add another card. Contact the merchant for details.


**6000—6999 — Error codes of the AVS/ CVC verification check**


|Code  |Message                  |Friendly message         |
|------|-------------------------|-------------------------|
|F.6001|Transaction was declined.|Transaction was declined.|


**7000—7999 — Error codes of the Verify service**


|Code  |Message|Friendly message|
|------|-------|----------------|
|F.7001|       |                |


**8001 — Error code of the P2P verification service**


|Code  |Message|Friendly message|
|------|-------|----------------|
|F.8001|       |                |


**8010 — Error code of the payment gateway service for requests in asynchronous mode**


|Code|Message                       |Friendly message              |
|----|------------------------------|------------------------------|
|8010|Async transaction was created.|Async transaction was created.|
