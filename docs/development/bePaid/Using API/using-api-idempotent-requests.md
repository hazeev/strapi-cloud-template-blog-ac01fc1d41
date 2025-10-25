Idempotent requests
To prevent certain operations to accidentally be performed twice, bePaid API supports idempotent requests. If you attempt an operation twice or more, only the first attempt will be processed.
To perform an idempotent request, send the request with HTTP header RequestID. All requests with the same RequestID will be considered attempts for the same request. It is therefore important that you use unique keys for RequestID, for example UUIDs. These keys are stored for a period of 24 hours.
If a second attempt is sent with the same RequestID and the first request has finished, the same response is sent. However, some information in this response may be updated. For example, the current status of a payment.

Info
This logic applies only to host-to-host requests, which are direct requests for card and alternative payment method transactions.