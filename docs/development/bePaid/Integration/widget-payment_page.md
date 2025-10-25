# Hosted payment page - bePaid API Documentation
The hosted payment page solution allows merchants to accept online payments with no need to embed the provider's payment widget to their websites or mobile applications.

It is just enough for the merchant to create a payment token and to redirect the customer to the bePaid secure payment page, where s/he can complete a payment.

Payment processing flow on the hosted payment page consists of the following stages:

1.  The customer initiates a payment for the order on the merchant's website.
2.  The merchant creates [a payment token](https://docs.bepaid.by/en/integration/widget/payment_token/).
3.  The merchant redirects the customer to the `redirect_url` received in the response.
4.  bePaid displays the hosted payment page with the order information and all payment methods available to the customer.
5.  The customer chooses a suitable payment method and enters the required billing details to complete the payment.
6.  bePaid processes the transaction.
7.  bePaid redirects the customer to the `return_url`, `success_url`, `decline_url`, `fail_url` or `cancel_url`, if they were submitted in the request to create a payment token. See more information on how to accept the customer back to the merchant's website [here](https://docs.bepaid.by/en/integration/widget/customer_return/).
8.  bePaid sends [a notification](https://docs.bepaid.by/en/using_api/webhooks/) to the `notification_url`, as indicated in the request to create a payment token.

Additionally, to get a payment status, the merchant can send [a transaction status query request](https://docs.bepaid.by/en/integration/widget/query/) with the payment token received in the response at Stage 1.