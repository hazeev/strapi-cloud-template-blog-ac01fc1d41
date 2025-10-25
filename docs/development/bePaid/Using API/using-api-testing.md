# Test mode - bePaid API Documentation
Test integration
----------------

After your integration is completed, bePaid strongly recommends testing your setup before going live. It helps you get a feel of your customers' payment experience and detect any problems at an early stage.

No need to create another shop or account for tests. Check the integration anytime - even if your shop is already working in live mode - by switching on the test mode for a transaction.

In the test mode the bePaid system processes requests, but doesn't send them on to the processing network for financial settlements.

* * *

Enable test mode
----------------

Depending on the integration option you prefer, follow a suitable way to enable the test mode for your setup with the bePaid system.

*   **Pay-by-link testing**: Create a test [product](https://docs.bepaid.by/en/integration/pay_by_link/index.html) and get a payment link for it. Follow the link to make a test payment.
    
*   **Payment widget testing**: Create a [payment token](https://docs.bepaid.by/en/integration/widget/payment_token/) or initiate a payment widget with the `test` parameter set to `true`.
    
*   **API testing**: Set the `test` parameter to `true` in your [payment](https://docs.bepaid.by/en/integration/card_api/transactions/payment/) or [authorization](https://docs.bepaid.by/en/integration/card_api/transactions/authorization/) requests.
    

If bePaid gets `"test": true` in a transaction request, the operation is considered to be a test one.

* * *

Use test data sets
------------------

Once the test mode is enabled, use the [test card numbers](https://docs.bepaid.by/en/integration/card_api/testing/) for card payments, [Apple Pay test details](https://docs.bepaid.by/en/payment_methods/apple_pay/testing/) or test data provided for a required [alternative payment method](https://docs.bepaid.by/en/payment_methods/apms/index.html).

* * *

Get and view test results
-------------------------

After you make a test payment, bePaid sends you a response and a [webhook notification](https://docs.bepaid.by/en/using_api/webhooks/), if set, with the result respective to the submitted test details. Besides, you can review test transactions and their details in your [bePaid back office](https://merchant.bepaid.by/).

Error response with the `Duplicate transaction` message

While testing the integration, you may get error responses with the `Duplicate transaction` message.

Change a transaction amount for a test to bypass the bePaid filter which protects you against duplicate transactions made by customers. Alternatively, send the `duplicate_check` parameter set to `false` in your requests.

Processing test transactions

While going live, pay attention to the `test` parameter value in responses and notifications not to provide your services or products for test payments.

If you are not sure about the status of the transaction (i.e whether it is live or test), send a [status request](https://docs.bepaid.by/en/integration/widget/query/) to bePaid.