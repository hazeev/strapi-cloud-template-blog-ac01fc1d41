# Transaction statuses - bePaid API Documentation
Processing statuses
-------------------

To inform merchants of the status of transaction, bePaid provides a transaction status description that is updated as the transaction is processed.

Transaction processing status
-----------------------------

Here is the description of a processing status that can be assigned to a transaction.


|Status    |Description                                                                |
|----------|---------------------------------------------------------------------------|
|successful|Transaction was successfully processed.                                    |
|failed    |Transaction was processed, but it was declined by the gateway.             |
|incomplete|Transaction is not completed, and additional merchant actions are required.|


Info

If transaction can't be processed due to invalid data or other technical reasons you will receive [error response](https://docs.bepaid.by/en/integration/card_api/error_response/).

Asynchronous task processing statuses
-------------------------------------

Here is the description of a processing status for asynchronous tasks. For more details see chapter [Asynchronous transaction processing](https://docs.bepaid.by/en/integration/card_api/asynchronous/).


|Status    |Description                                      |
|----------|-------------------------------------------------|
|processing|Asynchronous task processing is in still process.|
|unknown   |Request ID of asynchronous task is not found.    |
|completed |Asynchronous task processing is completed.       |
