# Introduction - bePaid API Documentation
bePaid has a REST-ful API. To accept payments you need to send requests of a format specified for each transaction type and endpoint. However, regardless the type, each request to bePaid API must meet the following requirements:

*   Use [HTTP Basic authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#Basic_authentication_scheme) with [Shop ID and Secret Key](https://docs.bepaid.by/en/using_api/id_key/) as a username and a password respectively;
*   Add the `Content-Type: application/json` and `Accept: application/json` headers;
*   Make a JSON-serialized body;
*   Use the UTF-8 encoding.

Mandatory request parameters are labeled as \* required. Non-labeled parameters are considered optional.

Info

If the response with 429 HTTP code is received (Too Many Requests), it is recommended to continue sending requests, increasing the interval between each attempt, until you receive a response with an HTTP code 200.

Info

As of September 15, 2022, the API v.3 is already configured for all `https://gateway.bepaid.by/` - endpoints. To submit requests to this API version, just add the `X-API-Version: 3` header to the request. For response parameters and their description, please use [the API version 3 guide](https://docs.bepaid.by/en/using_api/api_v3/).

Info

Pay attention that in bePaid system, the permission for host-to-host transaction requests containing the credit card number (`credit_card.number`) is activated on a shop level. If the permission is not activated, the requests of the following types: [payment](https://docs.bepaid.by/en/integration/card_api/transactions/payment/), [authorization](https://docs.bepaid.by/en/integration/card_api/transactions/authorization/), [payout](https://docs.bepaid.by/en/integration/card_api/transactions/payout/), [P2P-transfer](https://docs.bepaid.by/en/integration/card_api/transactions/p2p/), [check-up](https://docs.bepaid.by/en/integration/card_api/transactions/checkup/) containing the card number will return an error ([the error code](https://docs.bepaid.by/en/using_api/processing_codes) for API v.3 requests is E.1065).

This permission is not required for sending the requests with `credit_card.token` and for specifying the credit card number in the `recipient_credit_card.number` parameter for the P2P transfer.