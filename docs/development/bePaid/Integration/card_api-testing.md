# Test card data - bePaid API Documentation
To check the integration of your resource with the bePaid system, enable the [test mode](https://docs.bepaid.by/en/using_api/testing/) and use the following data sets to test card payments and get the respective status.

* * *

Non-3-D Secure test card numbers
--------------------------------

The card numbers indicated below are not enrolled at 3-D Secure program and can be used to test [payment](https://docs.bepaid.by/en/integration/card_api/transactions/payment/) and [authorization](https://docs.bepaid.by/en/integration/card_api/transactions/authorization/) transactions as well as test [products](https://docs.bepaid.by/en/integration/pay_by_link/index.html) and test [plans](about:/en/payment_management/subscriptions/plans/#create_plan).


|Number          |Transaction status|
|----------------|------------------|
|4200000000000000|successful        |
|4005550000000019|failed            |


* * *

3-D Secure test card numbers
----------------------------

These card numbers can be used to test both frictionless and challenge flows with different 3-D Secure payment authentication and transaction statuses.

The 3-D Secure payment authentication status indicates if a cardholder is authenticated to pay with the card. The transaction status refers to a transaction processing result.

Info

```
Before you start testing 3-D Secure anti-fraud check service, ask your account manager to enable 3-D Secure in the test mode.

```



|Number          |Payment authentication status|Transaction status            |
|----------------|-----------------------------|------------------------------|
|4012000000001006|Y                            |successful (Frictionless flow)|
|4012000000001055|A                            |successful (Frictionless flow)|
|4012000000001097|Y                            |successful (Challenge flow)   |
|4012000000001022|U                            |failed                        |
|4012000000001030|R                            |failed                        |
|4012000000001014|N                            |failed                        |
|5204240000015003|Y                            |successful (Frictionless flow)|
|5204240000015011|A                            |successful (Frictionless flow)|
|5204240000015029|Y                            |successful (Challenge flow)   |
|5204240000015045|U                            |failed                        |
|5204240000015052|R                            |failed                        |
|5204240000015060|N                            |failed                        |
|______________  |                             |                              |


AVS/CVC test data
-----------------

You can test the AVS verification settings by getting different AVS/CVC response codes with the following test sets.

**AVS verification**

To emulate different AVS codes, send a digit from the table below at any position in the `billing_address.address` and `billing_address.zip` parameters.


|Address digit  |Zip digit      |AVS response code|
|---------------|---------------|-----------------|
|1              |1              |M                |
|2              |2              |N                |
|1              |2              |B                |
|2              |1              |P                |
|3              |3              |U                |
|4              |4              |E                |
|5              |5              |0                |
|Any other digit|Any other digit|1                |


**CVC verification**

Submit the CVC codes from the table to emulate CVC verification codes.


|CVC            |CVC response code|
|---------------|-----------------|
|111            |M                |
|222            |N                |
|333            |U                |
|444            |E                |
|555            |0                |
|Any other digit|Any other digit  |


* * *

Test card numbers for P2P transfers
-----------------------------------

These card numbers can be used for P2P transfer testing. Depending on the combination of cards, the request for P2P transfer can require the cardholder's name of the sender or the recipient. Submit any name in the `holder` parameter in the request.



* Sender's Card: 4012000000003010
  * Reciepient's Card: 4012000000003101
  * Sender's Name: Optional
  * Recipient's Name: Optional
  * Transaction status: successful
* Sender's Card: 4005550000000019
  * Reciepient's Card: 4012000000003101
  * Sender's Name: Optional
  * Recipient's Name: Optional
  * Transaction status: failed  "message": "Forbidden by bank"
* Sender's Card: 4012000000001006
  * Reciepient's Card: 4012001037484447
  * Sender's Name: Optional
  * Recipient's Name: Mandatory
  * Transaction status: If recicipient's holder is not submittedfailed"message": "Missed recipient card fields: holder."
