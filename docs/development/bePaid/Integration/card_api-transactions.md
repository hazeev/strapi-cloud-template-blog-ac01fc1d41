# Transaction types - bePaid API Documentation
#### [Payment](https://docs.bepaid.by/en/integration/card_api/transactions/payment/)

Payment transaction is a combination of authorization and capture processed at a time. This transaction type is generally used when the goods or services can be immediately provided to the customer.

The request used to verify cardholder's funds. It is typically employed when merchants do not fulfill orders immediately.

#### [Capture](https://docs.bepaid.by/en/integration/card_api/transactions/capture/)

After an order is shipped, a previous authorized amount can be settled (captured). The card issuing bank credits the funds to the merchant's bank account and updates the cardholder's statement. Card regulations require a merchant to ship goods before settling the funds for an order.

#### [Void](https://docs.bepaid.by/en/integration/card_api/transactions/void/)

The request allows you to void a transaction that has been previously authorized and is still pending settlement. Voiding a transaction cancels the authorization process and prevents the transaction from being submitted to the processor for settlement.

#### [Refund](https://docs.bepaid.by/en/integration/card_api/transactions/refund/)

The refund allows you to credit the customer, for example in case of returned goods or cancellation. To post a refund request, a valid transaction UID from a former Capture or Payment transaction is required. It is only possible to credit an amount less than or equal to the initial transaction using the same currency as with the original transaction. This feature also allows you to issue multiple partial refunds against an original transaction.

#### [Chargeback](https://docs.bepaid.by/en/integration/card_api/transactions/chargeback/)

A chargeback is a transaction disputed by the cardholder or issuer. There are many reasons for chargebacks, but the most common are returned goods, terminated services, disputes, errors or fraud. Chargebacks are a costly part of accepting credit cards. However, merchants can minimize the risk of chargebacks at the time of sale by working to achieve maximum customer satisfaction and transaction accuracy.

#### [Payout](https://docs.bepaid.by/en/integration/card_api/transactions/payout/)

The request sends (pushes) funds to a recipient's card account. It doesn't require that the card had to be used before in a payment transaction. The transaction is not supported by all acquiring banks and the transaction is not available to all merchants.

#### [Account Funding Transfer (AFT)](https://docs.bepaid.by/en/integration/card_api/transactions/aft/)

Account Funding Transaction (AFT) is mainly used to pull funds from the sender to reimburse credits or to initiate P2P (person-to-person) fund transfers.

#### [Original Credit Transfer (OCT)](https://docs.bepaid.by/en/integration/card_api/transactions/oct/)

Original Credit Transaction (OCT) is often used to push funds to the receiver to finalize P2P (person-to-person) fund transfers.

#### [Tokenization](https://docs.bepaid.by/en/integration/card_api/transactions/tokenization/)

The request is used to get a bank card token along with 3-D Secure verification details and then to use the token to submit either payment or authorization transaction.

#### [Recipient's card tokenization](https://docs.bepaid.by/en/integration/card_api/transactions/recipient_tokenization/)

The request is used to get a token for the recipient's bank card. Then you can use this token to submit payout transactions.

#### [Status query](https://docs.bepaid.by/en/integration/card_api/transactions/status_query/)

Quickly look up API transaction results.

#### [Balance query](https://docs.bepaid.by/en/integration/card_api/transactions/balance_query/)

The request allows getting information about the balance of the merchant account available for payouts.

#### [Checkup](https://docs.bepaid.by/en/integration/card_api/transactions/checkup/)

The request does a risk check of transaction details against configured risk management rules: white and black lists, amount limits, velocity limits and processing restrictions (for example to block certain card BINs).