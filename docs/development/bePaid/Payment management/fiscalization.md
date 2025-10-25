# Fiscalization service - bePaid API Documentation
Successful response example. Financial transaction successfully processed. Fiscalization information received.

```
{
    "transaction": {
        "uid": "4107-310а0da80b",
        "status": "successful",
        "message": "Successfully processed",
        "amount": 100,
        "currency": "USD",
        "description": "Test order",
        "type": "payment",
        "tracking_id": "your_uniq_number",
        "language": "en",
        "payment_method_type": "credit_card",
        "customer": {
            "ip": "127.0.0.1",
            "email": "john@example.com"
        },
        "billing_address": {
            "first_name": "John",
            "last_name": "Doe",
            "address": "1st Street",
            "country": "US",
            "city": "Denver",
            "zip": "96002",
            "state": "CO",
            "phone": null
        },
        "fiscalization": {
            "id":"string 36",
            "external_id": "string 255",
            "status": "success", 
            "message": "successfully",
            "friendly_message": "successfully",                     
            "receipts": [
                {
                    "id": "01gsstxpygv99zemh9t38cv8da",
                    "serial_id": "9",
                    "receipt_num": "1234567867233",
                    "created_at": "2023-02-21T11:14:44Z",
                    "ofd_id": "70600654",
                    "ofd_link": "link.com/receipt",
                    "ofd_qr_code": "link.com/receipt",
                    "total_amount": "18700",
                    "receipt_info": {
                        "kkm_id": 49,
                        "id": "01gsstxpygv99zemh9t38cv8da",
                        "shift_id": 2,
                        "serial_id": "9",
                        "serial_shift_id": "4",
                        "issue_time": "2023-02-21T11:14:44Z",
                        "operation_type": "OPERATION_TYPE_SALE",
                        "payment_type": "PAYMENT_TYPE_CARD",
                        "currency_code": "USD",
                        "subtotal_amount": "10000",
                        "total_amount": "10000",
                        "cashier_code": 6207,
                        "cashier_name": "Robot",
                        "receipt_num": "1234567890233",
                        "ofd_receipt_id": "706806547",
                        "ofd_qr_code": "link.com/receipt"
                    }
                },
                {
                    "id": "2222stxpygv99zemh9t38cv8da",
                    "serial_id": "9",
                    "receipt_num": "1234567867233",
                    "created_at": "2023-02-21T11:14:44Z",
                    "ofd_id": "706006547",
                    "ofd_link": "link.com/receipt",
                    "total_amount": "1400.0000",
                    "receipt_info": {
                        "kkm_id": 49,
                        "id": "01gsstxpygv99zemh9t38cv8da",
                        "shift_id": 2,
                        "serial_id": "9",
                        "serial_shift_id": "4",
                        "issue_time": "2023-02-21T11:14:44Z",
                        "operation_type": "OPERATION_TYPE_SALE",
                        "payment_type": "PAYMENT_TYPE_CARD",
                        "currency_code": "USD",
                        "subtotal_amount": "1400.0000",
                        "total_amount": "1400.0000",
                        "cashier_code": 6207,
                        "cashier_name": "Robot",
                        "receipt_num": "1234567867233",
                        "ofd_receipt_id": "706006547",
                        "ofd_qr_code": "link.com/receipt"
                    }
                }
            ]
        },
        "credit_card": {
            "holder": "John Doe",
            "stamp": "3709786942408b7701",
            "token": "40bd001563085fc35165329ea1f",
            "brand": "visa",
            "product": "Gold",
            "last_4": "0000",
            "first_1": "4",
            "exp_month": 05,
            "exp_year": 2027,
            "token_provider": "apple_pay" 
        },
        "receipt_url": "link.com",
        "additional_data": {
            "receipt_text": [
                "First line",
                "Second line"
            ]
        },
        "payment": {
            "auth_code": "654321",
            "bank_code": "00",
            "rrn": "999",
            "ref_id": "777888",
            "message": "The operation was successfully processed.",
            "gateway_id": 317,
            "billing_descriptor": "TEST GATEWAY BILLING DESCRIPTOR",
            "status": "successful"
        }
    }
}

```


Unsuccessful response example. Financial transaction successful. Fiscalization service transaction error.

```
{
    "transaction": {
        "uid": "4107-311b0da70b",
        "status": "successful",
        "message": "Successfully processed",
        "amount": 100,
        "currency": "USD",
        "description": "Test order",
        "type": "payment",
        "tracking_id": "your_uniq_number",
        "language": "en",
        "payment_method_type": "credit_card",
        "customer": {
            "ip": "127.0.0.1",
            "email": "john@example.com"
    },
    "billing_address": {
        "first_name": "John",
        "last_name": "Doe",
        "address": "1st Street",
        "country": "US",
        "city": "Denver",
        "zip": "96002",
        "state": "CO",
        "phone": null
    },
    "fiscalization": {
        "id": "string 36",
        "external_id": "string 255",
        "status": "failed",
        "code": "S.8025",
        "message": "Total amount of items in the receipts not equal to the amount of the transaction. Failed to complete the transaction. Check the request parameters.",
        "friendly_message": "Total amount of items in the receipts not equal to the amount of the transaction. Failed to complete the transaction. Contact the merchant for details.",                
        "receipts": []
    },
    "credit_card": {
        "holder": "John Doe",
        "stamp": "3709786942408b7701",
        "token": "40bd001563085fc35165329e",
        "brand": "visa",
        "product": "Gold",
        "last_4": "0000",
        "first_1": "4",
        "exp_month": 5,
        "exp_year": 2027,
        "token_provider": "apple_pay"
    },
    "receipt_url": "link.com",
    "additional_data": {
        "receipt_text": [
            "First line",
            "Second line"
        ]
    },
        "payment": {
            "auth_code": "654321",
            "bank_code": "00",
            "rrn": "999",
            "ref_id": "777888",
            "message": "The operation was successfully processed.",
            "gateway_id": 317,
            "billing_descriptor": "TEST GATEWAY BILLING DESCRIPTOR",
            "status": "successful"
        }
    }
}   

```


Unsuccessful response example. Financial transaction failed, fiscalization information not sent.

```
{
    "transaction": {
        "uid": "4107-210b0a80b",
        "status": "failed",
        "message": "failed processed",
        "amount": 100,
        "currency": "USD",
        "description": "Test order",
        "type": "payment",
        "tracking_id": "your_uniq_number",
        "language": "en",
        "payment_method_type": "credit_card",
        "customer": {
            "ip": "127.0.0.1",
            "email": "john@example.com"
        },
        "billing_address": {
            "first_name": "John",
            "last_name": "Doe",
            "address": "1st Street",
            "country": "US",
            "city": "Denver",
            "zip": "96002",
            "state": "CO",
            "phone": null
        },
        "credit_card": {
            "holder": "John Doe",
            "stamp": "3709786942408b",
            "token": "40bd00156308",
            "brand": "visa",
            "product": "Gold",
            "last_4": "0000",
            "first_1": "4",
            "exp_month": 5,
            "exp_year": 2027,
            "token_provider": "apple_pay" 
        },
        "receipt_url": "link.com",
        "additional_data": {
            "receipt_text": [
                "First line",
                "Second line"
            ]
        },
        "payment": {
            "auth_code": "654321",
            "bank_code": "00",
            "rrn": "999",
            "ref_id": "777888",
            "message": "Payment was declined",
            "gateway_id": 317,
            "billing_descriptor": "TEST GATEWAY BILLING DESCRIPTOR",
            "status": "failed"
        }
    }
}    

```


Successful response example. Financial transaction successfully processed. Fiscalization information received.

```
{
    "status": "success",
    "code": "S.0000", 
    "message": "successfully", 
    "friendly_message": "successfully",
    "type": "payment", 
    "amount": 100000000, 
    "id": "string 255", 
    "fiscalization": {
        "id":"string 36",
        "external_id": "string 255",
        "status": "success", 
        "code": "S.0000", 
        "message": "successfully", 
        "friendly_message": "successfully",                 
        "receipts": [
            {
                "id": "01gsstxpygv99tymh9t38cv8da",
                "serial_id": "9",
                "receipt_num": "1234567890233",
                "created_at": "2024-02-21T11:14:44Z",
                "ofd_id": "706806547",
                "ofd_link": "link.com/receipt",
                "ofd_qr_code": "link.com/receipt",
                "total_amount": "18700",
                "receipt_info": {
                    "kkm_id": 49,
                    "id": "01gsstxpygv99zemh9t38cv8da",
                    "shift_id": 2,
                    "serial_id": "9",
                    "serial_shift_id": "4",
                    "issue_time": "2023-02-21T11:14:44Z",
                    "operation_type": "OPERATION_TYPE_SALE",
                    "payment_type": "PAYMENT_TYPE_CARD",
                    "currency_code": "USD",
                    "subtotal_amount": "10000",
                    "total_amount": "10000",
                    "cashier_code": 6207,
                    "cashier_name": "Robot",
                    "receipt_num": "1234567890233",
                    "ofd_receipt_id": "706806547",
                    "ofd_qr_code": "link.com/receipt"
                }
            },
            {
                "id": "2222stxpygv99zemh9t38cv8da",
                "serial_id": "9",
                "receipt_num": "1234567890233",
                "created_at": "2023-02-21T11:14:44Z",
                "ofd_id": "706806547",
                "ofd_link": "link.com/receipt",
                "total_amount": "1400.0000",
                "receipt_info": {
                    "kkm_id": 49,
                    "id": "01gsstxpygv99zemh9t38cv8da",
                    "shift_id": 2,
                    "serial_id": "9",
                    "serial_shift_id": "4",
                    "issue_time": "2023-02-21T11:14:44Z",
                    "operation_type": "OPERATION_TYPE_SALE",
                    "payment_type": "PAYMENT_TYPE_CARD",
                    "currency_code": "USD",
                    "subtotal_amount": "1400.0000",
                    "total_amount": "1400.0000",
                    "cashier_code": 6207,
                    "cashier_name": "Robot",
                    "receipt_num": "1234567890233",
                    "ofd_receipt_id": "706806547",
                    "ofd_qr_code": "link.com/receipt"
                }
            }
        ]
    }
}

```


Unsuccessful response example. Financial transaction successful. Fiscalization service transaction error.

```
{
    "status": "success",
    "code": "S.0000",
    "message": "successfully",
    "friendly_message": "successfully",
    "type": "payment",
    "amount": 10000,
    "id": "string 255",
    "fiscalization": {
        "id": "string 36",
        "external_id": "string 255",
        "status": "failed",
        "code": "S.8025",
        "message": "Total amount of items in the receipts not equal to the amount of the transaction. Failed to complete the transaction. Check the request parameters.",
        "friendly_message": "Total amount of items in the receiptis not equal to the amount of the transaction. Failed to complete the transaction. Contact the merchant for details.",                
        "receipts": [
        {
            "id": "01gsstxpygv88zemh9t98cv8da",
            "serial_id": "9",
            "receipt_num": "1234567890233",
            "created_at": "2024-02-21T11:14:44Z",
            "ofd_id": "706806547",
            "ofd_link": "link.com/receipt",
            "ofd_qr_code": "link.com/receipt",
            "total_amount": "18700",
            "receipt_info": {
                "kkm_id": 49,
                "id": "01gsstxpygv99zem9t98cv8da",
                "shift_id": 2,
                "serial_id": "9",
                "serial_shift_id": "4",
                "issue_time": "2024-02-21T11:14:44Z",
                "operation_type": "OPERATION_TYPE_SALE",
                "payment_type": "PAYMENT_TYPE_CARD",
                "currency_code": "USD",
                "subtotal_amount": "10000",
                "total_amount": "10000",
                "cashier_code": 6207,
                "cashier_name": "Robot",
                "receipt_num": "1234567890233",
                "ofd_receipt_id": "706806547",
                "ofd_qr_code": "link.com/receipt"
                }
            },
            {
                "id": "2222stxpygv99zem9t38cv8da",
                "serial_id": "9",
                "receipt_num": "1234567890233",
                "created_at": "2023-02-21T11:14:44Z",
                "ofd_id": "706806547",
                "ofd_link": "link.com/receipt",
                "total_amount": "1400.0000",
                "receipt_info": {
                "kkm_id": 49,
                "id": "01gsstxpygv99zemh9t38cv8da",
                "shift_id": 2,
                "serial_id": "9",
                "serial_shift_id": "4",
                "issue_time": "2023-02-21T11:14:44Z",
                "operation_type": "OPERATION_TYPE_SALE",
                "payment_type": "PAYMENT_TYPE_CARD",
                "currency_code": "USD",
                "subtotal_amount": "1400.0000",
                "total_amount": "1400.0000",
                "cashier_code": 6207,
                "cashier_name": "Robot",
                "receipt_num": "1234567890233",
                "ofd_receipt_id": "706806547",
                "ofd_qr_code": "link.com/receipt"
                }
            }
        ]
    }
}   

```


Unsuccessful response example. Financial transaction failed, fiscalization information not sent.

```
{
    "status": "success", 
    "code": "F.0003", 
    "message": "Card expired: Ask the customer to use a valid card.", 
    "friendly_message": "Card expired: Failed to complete the transaction. Use a valid card.", 
    "type": "payment", 
    "amount": 10000, 
    "id": "string 255",      
}

```
