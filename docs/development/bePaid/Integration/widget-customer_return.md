# Accept your customer back - bePaid API Documentation
After the payment is finished, the customer can click the **Return to shop** button, and bePaid will redirect the customer back to the `success_url`, `decline_url` or `fail_url` with the following parameters in the request query string:

*   `token` - the payment token that the merchant created to run the payment process. Use the token to make [a status query request](https://docs.bepaid.by/en/integration/widget/query/);
*   `uid` - the UID of the processed transaction. Use the UID to get a status of [a card payment](https://docs.bepaid.by/en/integration/card_api/transactions/status_query/) or of [a payment made with an alternative payment method](https://docs.bepaid.by/en/integration/apm_api/transactions/status_query/);
*   `status` - the status of [a card payment](https://docs.bepaid.by/en/integration/card_api/statuses/) or of [a payment made with an alternative payment method](https://docs.bepaid.by/en/integration/apm_api/statuses/).

Info

If there are parameters in return links that the merchant specified, bePaid does not change them, but simply adds own parameters.

For example, if `success_url` is `http://www.example.com/payment/success?mytracking_id=1234`, then the return link to the successful URL will be `http://www.example.com/payment/success?mytracking_id=1234&token=ed873d8f3765d0a7a0c610de7fae31c07da0b3c5977d30a1c94df619aa5c6378&status=successful&uid=2343-5fcb2bda3b`.

Example of the `successful_url` where the system redirects the customer

```
http://www.example.com/payment/success?token=ed873d8f3765d0a7a0c610de7fae31c07da0b3c5977d30a1c94df619aa5c6378&status=successful&uid=2343-5fcb2bda3b

```
