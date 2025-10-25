# Transaction verification - bePaid API Documentation
Transaction verification is a way to call a script on one of your own web servers whenever a transaction is being processing. Verification is used in order to accept or decline a transaction.

* * *

Set up the verification
-----------------------

To receive a verification request from the bePaid system, pass `verification_url` in transaction request parameters.

```
{
    ....

    "verification_url":"https://your-domain.com/verification",

    ....
}

```


A verification request is similar to [webhook request](https://docs.bepaid.by/en/using_api/webhooks/) and use [HTTP Basic authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#Basic_authentication_scheme) with [Shop ID and Secret Key](https://docs.bepaid.by/en/using_api/id_key/).

Accept or decline a transaction
-------------------------------

Your web server should return the `200` HTTP status code and POST parameters in order to accept or decline a transaction.



* Parameter: code * required
  * Type: integer
  * Description: Set to 0 to accept the transaction. Set to any other code to decline the transaction.
* Parameter: uid * required
  * Type: string
  * Description: Submit the UID copied from the request.
* Parameter: amount * required
  * Type: integer
  * Description: Submit the amount copied from the request.
* Parameter: message
  * Type: string
  * Description: A message why the transaction is declined, if the value of code is other than 0.
* Parameter: friendly_message
  * Type: string
  * Description: A message to the customer to explain a reason for decline.
* Parameter: created_at
  * Type: string
  * Description: A response time in the ISO-8601 format.


Example of the response to accept a transaction

```
{
  "code":0,
  "uid": "35153123-9367e7e770",
  "amount": 100,
  "created_at": "2020-08-04T06:16:17.052Z"
}

```


Example of the response to decline a transaction

```
{
  "code":1,
  "uid": "36279632-7127y612a6",
  "amount": 100,
  "message":"IP validation failed",
  "friendly_message": "Your transaction is declined. For details please contact our customer service",
  "created_at": "2020-08-04T06:16:22.141Z"
}

```
