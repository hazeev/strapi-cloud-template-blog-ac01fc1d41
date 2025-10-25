# Payment widget integration with public key - bePaid API Documentation


* checkout_urlrequired
  * string  https://checkout.bepaid.by
* fromWebview
  * boolean  Set this parameter to true if you want the payment widget to open on payment initialization in a WebView (for example, within a web application). If this parameter is not provided, or it is set to false, initializing the payment will open the payment page instead.
  * object
* transaction_typerequired
  * string  Type of transaction or request that will be sent to gateway. Applicable values are authorization, payment, tokenization, and charge (for the charge request).
* public_keyconditionally required
  * string
* attempts
  * integer Number of payment attempts. The default is 1.
* dynamic_billing_descriptor
  * string  Dynamic billing descriptor.
* test
  * boolean  Set to true for a test transaction. Otherwise, false (default).
* iframe
  * boolean  When the value is true, if possible, open transitions to external services inside the widget. By default, set as false.
* required
  * object
* amountrequired
  * integer  Payment amount in minimal currency units, for example, $32.45 must be sent as 3245.
* currencyrequired
  * string  Transaction currency in the ISO-4217 alpha-3 code format or a cryptocurrency code. For example, USD.
* descriptionrequired
  * string  Order description.
* tracking_id
  * string  ID of your transaction or order. Please, use unique values for each transaction.
* expired_at
  * string  Date and time till a payment can be done. By default, a payment must be done within 24 hours upon a payment token creation. Format (ISO 8601): YYYY-MM-DDThh:mm:ssTZD, where YYYY – year (for example, 2019), MM – month (for example, 02), DD – day (for example, 09), hh – hours (for example, 18), mm – minutes (for example, 20), ss – seconds (for example, 45), TZD – time zone (+hh:mm или –hh:mm).
  * object  Section of additional information about the payment.
* expected_bank_code
  * string  If this field contains a processing error, it will be sent as the value of the code parameter in the response. The parameters message and friendly_message will have the values corresponding to the specified error code. This logic applies only to test transactions.
* receipt_text
  * array Text that will be added to the customer's mail and will be showed on success result page. Submit it as an array of strings, for example, ["First line", "Second line"].
* contract
  * array  Array that consists of elements:recurring - bePaid returns a card token to use it for subsequent payments when the customer has no need to enter card data again. As for the initial payment, the customer should provide full card data including a CVC/CVV code, pass the 3-D Secure verification, and give consent to be charged regularly. oneclick - bePaid returns a card token to use it in the one-click payment scheme. bePaid opens a payment page with pre-filled card data to the customer. To complete a payment, the customer has to enter a CVC/CVV code and to pass the 3-D Secure verification; credit - bePaid returns a card token to use it for a payout transaction; card_on_file - bePaid returns a card token to save it to a customer profile and to use the token in time-to-time charges initiated by the customer or by your application. See card_on_file section below to understand what cases the contract type covers;  save_card - returns an information, that the customer has turned save card toggle to the active state. Used in addition to recurring, oneclick and credit parameters. Conditions of usage:  1. Parameter save_card_toggle.customer_contract is true  2. Customer has turned save card toggle to the active state.
* avs_cvc_verification
  * object  AVS/CVC verification.
  * object  Section with information on the items added to cart by the customer and to be paid for using the current request.
* conditionally required
  * array  Array of objects where each object corresponds to an item to be paid for using the current request. Required if the cart parameter is sent. Each object includes the following parameters:
* nameconditionally required
  * string  The name of the item. Required if the positions parameter is sent.
* type
  * string  Type of the item.
* amountconditionally required
  * integer  The price of the item in minimal currency units. The sum of the amount values for all items must equal the transaction amount. Required if the positions parameter is sent.
* quantityconditionally required
  * integer  The number of  the identical items. Required if the positions parameter is sent.
* descriptionconditionally required
  * string  Description of the item. Required if the positions parameter is sent.
* nomenclature_codeconditionally required
  * string  Nomenclature code of the item. Required if the positions parameter is sent.


object  
It sets flags submitted to a payment network why and what you charged a previously saved card for. If no submitted default values of `initiator` and `type` are in use.



* initiator: type
  * string  merchant - (default) merchant initiated a card charge (for instance, for a car ride service).customer - customer initiated a card charge (for instance, customer confirmed and order and wanted to pay by a saved card).: string  Used only in case additional_data.card_on_file.initiator is merchant.  delayed_charge - (default) delayed charge posted to a cardincrement - merchant wants to charge additional amount above initially paid order (for instance, in case of upsale)resubmission - merchant wants to resubmit a transaction due to fail with a previous charge (for instance, no money on a card)reauthorization - merchant wants to refresh previously authorized amount (for instance, to continue to hold a money reserve on a card for future charges)no_show - merchant wants to charge a card when customer didn't come (for instance, no visit to a hotel)


object



* auto_pay: style
  * boolean  By default false. If true and the request contains payment_method.credit_card.token, the response will contain a link to the checkout page. Opening the link will automatically trigger the transaction that will run using the provided token. As a result, the customer will be redirected to suсcess_url, decline_url, fail_url or return_url depending on the transaction result and the URLs provided in the request. The webhook notification with the transaction status will be posted to the notification_url.: object  Section for customizing the design of the payment widget.
* auto_pay: 
  * boolean  By default false. If true and the request contains payment_method.credit_card.token, the response will contain a link to the checkout page. Opening the link will automatically trigger the transaction that will run using the provided token. As a result, the customer will be redirected to suсcess_url, decline_url, fail_url or return_url depending on the transaction result and the URLs provided in the request. The webhook notification with the transaction status will be posted to the notification_url.: object  Section for configuring the toggle shown on the payment widget. The toggle enables the option to save card data for future payments.
* auto_pay: display
  * boolean  By default false. If true and the request contains payment_method.credit_card.token, the response will contain a link to the checkout page. Opening the link will automatically trigger the transaction that will run using the provided token. As a result, the customer will be redirected to suсcess_url, decline_url, fail_url or return_url depending on the transaction result and the URLs provided in the request. The webhook notification with the transaction status will be posted to the notification_url.: boolean  If the parameter is true, the save card toggle should be displayed. This parameter has greater priority, than Display save card toggle on payment page parameter in shop settings in the Merchant back office. By default, set to true.
* auto_pay: customer_contract
  * boolean  By default false. If true and the request contains payment_method.credit_card.token, the response will contain a link to the checkout page. Opening the link will automatically trigger the transaction that will run using the provided token. As a result, the customer will be redirected to suсcess_url, decline_url, fail_url or return_url depending on the transaction result and the URLs provided in the request. The webhook notification with the transaction status will be posted to the notification_url.: boolean  true - the toggle stands for the customer's consent to provide the merchant with the customer's card data for subsequent payments. When the toggle is on, the system creates the card token and sends it out to the merchant. Otherwise, the card token is not provided. false - the toggle stands for the customer's consent to get the card data saved on the payment page. When the toggle is on, the system will autocomplete the card data for subsequent payments in the merchant's shop. Otherwise, the card data are not saved. By default, false.
* auto_pay: text
  * boolean  By default false. If true and the request contains payment_method.credit_card.token, the response will contain a link to the checkout page. Opening the link will automatically trigger the transaction that will run using the provided token. As a result, the customer will be redirected to suсcess_url, decline_url, fail_url or return_url depending on the transaction result and the URLs provided in the request. The webhook notification with the transaction status will be posted to the notification_url.: string  The parameter replaces the standard toggle name Save card to any Merchant text.
* auto_pay: hint
  * boolean  By default false. If true and the request contains payment_method.credit_card.token, the response will contain a link to the checkout page. Opening the link will automatically trigger the transaction that will run using the provided token. As a result, the customer will be redirected to suсcess_url, decline_url, fail_url or return_url depending on the transaction result and the URLs provided in the request. The webhook notification with the transaction status will be posted to the notification_url.: string  Hint text, described why the save card option is needed.


object  
Section for configuring the another card toggle.



return\_url

string  
URL to return the customer after transaction was complete. If set, then both `success_url` and `decline_url` are ignored.

success\_url

string  
URL to return the customer to if a transaction was successful.

decline\_url

string  
URL to return the customer to if a transaction was declined by bank.

fail\_url

string  
URL to return the customer to if a transaction failed (due to an error, exception, etc.). You can [query](https://docs.bepaid.by/en/integration/widget/query/) its status using the payment token and review response `status` and `message` parameters to evaluate why the transaction failed.

cancel\_url

string  
URL to return the customer to if the customer cancels a transaction.

notification\_url

string  
URL where [notification](https://docs.bepaid.by/en/using_api/webhooks/) about a transaction will be posted to. A notification request format is similar to a transaction response format.

verification\_url

string

auto\_return

string  
After a transaction completes, bePaid shows a transaction result page for specified number of seconds and then automatically returns the customer to one of your return URLs. If the parameter value is `0`, then the customer will be automatically redirected without showing bePaid transaction result page.

button\_next\_text

string  
Customize the payment result page button text.

card\_notification\_url

string  
URL for receiving card notifications containing the file with card art. [More details](https://docs.bepaid.by/en/dev_tools/tokenization/card_art/).

language

string  
Checkout page locale. English (`en`) is set by default. [Possible values of `language` parameter](https://docs.bepaid.by/en/reference/notification_languages/). object  
It controls the input fields for the customer details shown at the payment widget.

**Note:**

**For card transactions,** by default, the customer parameters submitted by the merchant in this request are **not displayed** on the widget. To display the submitted fields on the widget, include them either in the `read_only` array (non-editable) or in the `visible` array (editable).

**For alternative payment methods,** by default, the customer parameters submitted by the merchant in this request are **displayed** on the widget. To hide the submitted fields on the widget, include them in the `read_only` array.



* read_only: visible
  * array  Array which may consist of the values email, first_name, last_name, address, city, state, zip, phone, country, birth_date, taxpayer_id.  Fields for the customer's data indicated in the array will be disabled at the payment widget.  If email exists in the array then it must present in the customer section below, and it can't be empty.: array  Array which may consist of the values email, first_name, last_name, address, city, state, zip, phone, country and birth_date, taxpayer_id.  Fields for the customer's data indicated in the array will be displayed at the payment widget.


object  
It controls the automatic filling of the cardholder name on the payment widget.



* holder: read_only
  * string  Cardholder name for automatic filling on the payment widget.: array  Array which may consist only holder value. Blocks editing of the selected field.


conditionally required

object  
Section of the customer information.  
Contact the Tech Support Team to inquire what section parameters are required.



* email: first_name
  * string  The customer's email.: string  The customer's first name.
* email: last_name
  * string  The customer's email.: string  The customer's last name.
* email: address
  * string  The customer's email.: string  The customer's billing address.
* email: city
  * string  The customer's email.: string  The customer's billing city.
* email: state
  * string  The customer's email.: string  The customer's two-letter billing state only if the billing address country is IN, US or CA.
* email: zip
  * string  The customer's email.: string  The customer's billing ZIP or postal code.
* email: country
  * string  The customer's email.: string  The customer's billing country in ISO 3166-1 alpha-2 format.
* email: phone
  * string  The customer's email.: string  The customer's phone number. The parameter is required for MTS Money payment method if the merchant is trusted, meaning the customer makes a payment without SMS confirmation. Whether or not the merchant is trusted is negotiated with MTS.
* email: birth_date
  * string  The customer's email.: string  The customer's date of birth in the ISO 8601 YYYY-MM-DD format.
* email: taxpayer_id
  * string  The customer's email.: string  The customer's taxpayer ID. 


object  
Section to set payment methods available to the customer and their parameters. By default, all enabled payment methods are available.



* types: excluded_types
  * array  Array of the available and enabled payment methods displayed to the customer on the payment page. Possible values:credit_card - a bank card paymenterip - a payment via ERIPhalva - installment card "Halva" paymentFor other possible array values, see the value of the type parameter in the section of alternative payment methods.If the listed payment method requires additional parameter settings, then create an object with the key name set as the type of the payment method and internal parameters set as described in the alternative payment methods section.For example, for a payment method with the apm type and the channel parameter, add the following object: "apm": { "channel": "ONLINE" }`. Note! Apple Pay, Google Pay and Samsung Pay are displayed on the widget depending on the customer's device and browser types. See more here.: array  Array of the payment types that will be excluded from the available payment methods on the payment page. If both payment_method.types and payment_method.excluded_types are sent in the request, the information from payment_method.types will be applied and payment_method.excluded_types will be ignored.
* types: excluded_brands
  * array  Array of the available and enabled payment methods displayed to the customer on the payment page. Possible values:credit_card - a bank card paymenterip - a payment via ERIPhalva - installment card "Halva" paymentFor other possible array values, see the value of the type parameter in the section of alternative payment methods.If the listed payment method requires additional parameter settings, then create an object with the key name set as the type of the payment method and internal parameters set as described in the alternative payment methods section.For example, for a payment method with the apm type and the channel parameter, add the following object: "apm": { "channel": "ONLINE" }`. Note! Apple Pay, Google Pay and Samsung Pay are displayed on the widget depending on the customer's device and browser types. See more here.: array  Array of card brands and digital wallets (apple_pay, google_pay, samsung_pay) that will not be displayed on the widget and will not be available to use for the transaction, even if they are available on the gateway.
* types: 
  * array  Array of the available and enabled payment methods displayed to the customer on the payment page. Possible values:credit_card - a bank card paymenterip - a payment via ERIPhalva - installment card "Halva" paymentFor other possible array values, see the value of the type parameter in the section of alternative payment methods.If the listed payment method requires additional parameter settings, then create an object with the key name set as the type of the payment method and internal parameters set as described in the alternative payment methods section.For example, for a payment method with the apm type and the channel parameter, add the following object: "apm": { "channel": "ONLINE" }`. Note! Apple Pay, Google Pay and Samsung Pay are displayed on the widget depending on the customer's device and browser types. See more here.: object  Parameters to set up ERIP payment. Description of every parameter can be found here.
* types: order_id
  * array  Array of the available and enabled payment methods displayed to the customer on the payment page. Possible values:credit_card - a bank card paymenterip - a payment via ERIPhalva - installment card "Halva" paymentFor other possible array values, see the value of the type parameter in the section of alternative payment methods.If the listed payment method requires additional parameter settings, then create an object with the key name set as the type of the payment method and internal parameters set as described in the alternative payment methods section.For example, for a payment method with the apm type and the channel parameter, add the following object: "apm": { "channel": "ONLINE" }`. Note! Apple Pay, Google Pay and Samsung Pay are displayed on the widget depending on the customer's device and browser types. See more here.: integer  12-digit order number in your system.
* types: account_number
  * array  Array of the available and enabled payment methods displayed to the customer on the payment page. Possible values:credit_card - a bank card paymenterip - a payment via ERIPhalva - installment card "Halva" paymentFor other possible array values, see the value of the type parameter in the section of alternative payment methods.If the listed payment method requires additional parameter settings, then create an object with the key name set as the type of the payment method and internal parameters set as described in the alternative payment methods section.For example, for a payment method with the apm type and the channel parameter, add the following object: "apm": { "channel": "ONLINE" }`. Note! Apple Pay, Google Pay and Samsung Pay are displayed on the widget depending on the customer's device and browser types. See more here.: string  Order number/ service/ agreement to get a payment via ERIP.
* types: service_no
  * array  Array of the available and enabled payment methods displayed to the customer on the payment page. Possible values:credit_card - a bank card paymenterip - a payment via ERIPhalva - installment card "Halva" paymentFor other possible array values, see the value of the type parameter in the section of alternative payment methods.If the listed payment method requires additional parameter settings, then create an object with the key name set as the type of the payment method and internal parameters set as described in the alternative payment methods section.For example, for a payment method with the apm type and the channel parameter, add the following object: "apm": { "channel": "ONLINE" }`. Note! Apple Pay, Google Pay and Samsung Pay are displayed on the widget depending on the customer's device and browser types. See more here.: string  ERIP service number.
* types: service_info
  * array  Array of the available and enabled payment methods displayed to the customer on the payment page. Possible values:credit_card - a bank card paymenterip - a payment via ERIPhalva - installment card "Halva" paymentFor other possible array values, see the value of the type parameter in the section of alternative payment methods.If the listed payment method requires additional parameter settings, then create an object with the key name set as the type of the payment method and internal parameters set as described in the alternative payment methods section.For example, for a payment method with the apm type and the channel parameter, add the following object: "apm": { "channel": "ONLINE" }`. Note! Apple Pay, Google Pay and Samsung Pay are displayed on the widget depending on the customer's device and browser types. See more here.: array  Array of strings to build a payment hint with the payment purpose description. 


object



travel

object  
An optional [section with travel related data](https://docs.bepaid.by/en/reference/travel_parameters/).