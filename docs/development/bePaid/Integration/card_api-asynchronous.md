# Asynchronous mode - bePaid API Documentation
Asynchronous transaction processing
-----------------------------------

Asynchronous transaction processing allows you to save your resources because you do not need to keep the connection with bePaid, and you can make a status request at the appropriate time.

Also, asynchronous operation mode allows you to avoid timeout errors if the payment method provider or bank processes a request for a long time.

The flow of asynchronous transaction processing
-----------------------------------------------

1.  [Send request](#2) for asynchronous transaction processing URL
2.  [Get response](#3) with the status of an asynchronous task and `status_url`, `response_url`
3.  [Check the status](#4) and/or [request the result](#5) of an asynchronous task
4.  [Process webhook](https://docs.bepaid.by/en/using_api/webhooks/) or [request a transaction status](https://docs.bepaid.by/en/integration/card_api/transactions/status_query/) by `tracking_id`.

Request parameters
------------------

Request parameters in asynchronous transaction processing have the same parameters as in synchronous (standard) mode:

*   [Payment](https://docs.bepaid.by/en/integration/card_api/transactions/payment/)
*   [Authorization](https://docs.bepaid.by/en/integration/card_api/transactions/authorization/)  
    
*   [Tokenization](https://docs.bepaid.by/en/integration/card_api/transactions/tokenization/)  
    
*   [Capture](https://docs.bepaid.by/en/integration/card_api/transactions/capture/)  
    
*   [Void](https://docs.bepaid.by/en/integration/card_api/transactions/void/)  
    
*   [Refund](https://docs.bepaid.by/en/integration/card_api/transactions/refund/)  
    
*   [Payout](https://docs.bepaid.by/en/integration/card_api/transactions/payout/)  
    
*   [Checkup](https://docs.bepaid.by/en/integration/card_api/transactions/checkup/)  
    
*   [Chargeback](https://docs.bepaid.by/en/integration/card_api/transactions/chargeback/)  
    
*   [Status query](https://docs.bepaid.by/en/integration/card_api/transactions/status_query/)  
    
*   [Balance query](https://docs.bepaid.by/en/integration/card_api/transactions/balance_query/)

The only difference is that the URL for the request has an additional section `async`. For example:

**URL for processing authorization requests in synchronous mode:**

```
https://gateway.bepaid.by/transactions/authorizations

```


**URL for processing authorization requests in asynchronous mode:**

```
https://gateway.bepaid.by/async/transactions/authorizations

```


Response parameters
-------------------



* Parameter: status
  * Type: string
  * Description: Asynchronous task processing status (avoid confusion with transaction processing status)
* Parameter: request_id
  * Type: string
  * Description: ID that used to search request.
* Parameter: status_url
  * Type: string
  * Description: URL to get request processing status.
* Parameter: response_url
  * Type: string
  * Description: URL to get request processing result.


Example of the response

```
{
  "status": "processing",
  "request_id": "a2ac9f8e-1b22-486b-be46-528e48be6c76",
  "status_url": "https://gateway.bepaid.by/async/status/a2ac9f8e-1b22-486b-be46-528e48be6c76",
  "response_url": "https://gateway.bepaid.by/async/result/a2ac9f8e-1b22-486b-be46-528e48be6c76"
}

```


Check the status of an asynchronous task
----------------------------------------

To get a request status, send a `GET` request to the `status_url`, that was received in response to the asynchronous request.

Info

Depending on your integration implementation, you can skip this step and immediately request the result of the asynchronous task via a request to `response_url`.

Example of the response for an asynchronous task, that is still in the process

```
{
  "status": "processing",
  "request_id": "a2ac9f8e-1b22-486b-be46-528e48be6c76"
}

```


Example of the response for an asynchronous task that is completed

```
{
  "status": "completed",
  "request_id": "a2ac9f8e-1b22-486b-be46-528e48be6c76",
  "response_url": "https://gateway.bepaid.by/async/result/a2ac9f8e-1b22-486b-be46-528e48be6c76"
}

```


Example of the response if the provided `request_id` is not found in the system

```
{
  "status": "unknown",
  "request_id": "a2ac9f8e-1b22-486b-be46-528e48be6c76"
}

```


Example of the response if an error occurred an asynchronous task processing

```
{
  "message": "We're sorry, but something went wrong"
}

```


Get the result of an asynchronous task
--------------------------------------

To get a result of processing of an asynchronous task, send a `GET` request to the `response_url` received in the response to the asynchronous request.

#### Successful processing of an asynchronous task

An asynchronous task is successfully completed, if the standard response to a request to `response_url` is returned.

If the transaction status is `incomplete`, send [a status query request](https://docs.bepaid.by/en/integration/card_api/transactions/status_query/) with the `tracking_id` value. Alternatively, set up [webhooks](https://docs.bepaid.by/en/using_api/webhooks/) to check the transaction status and result.

Example of the response if the provided `request_id` is not found in the system

```
{
  "status": "unknown",
  "request_id": "a2ac9f8e-1b22-486b-be46-528e48be6c76"
}

```


Example of the response for an asynchronous task, that is still in the process

```
{
  "status": "processing",
  "request_id": "a2ac9f8e-1b22-486b-be46-528e48be6c76"
}

```


Availability of the result of an asynchronous task
--------------------------------------------------

If the result of an asynchronous task, requested from `status_url` or `response_url`, has a 200 status code, then it will be stored in the system within 24 hours since the creation of the asynchronous task. After 24 hours, the result of the asynchronous task will become unavailable. Further, for repeated requests, a response with a 404 code will be returned:

```
{​​​​​​​​
"status":"unknown",
"request_id":"10203"
}​​​​​​​​

```


If the response of an asynchronous task has a status code other than 200, then a response with an error description will be returned **once**. Further, for repeated requests, a response with a 404 code will be returned:

```
{​​​​​​​​
"status":"unknown",
"request_id":"52168"
}​​​​​​​​

```
