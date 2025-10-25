# Get a transaction status by the payment token - bePaid API Documentation
```
{
  "checkout": {
    "token": "cb967032c168e0b6b930906974594600d96e4df489df8f5e15673df533ca7df5",
    "shop_id": 1673,
    "transaction_type": "payment",
    "gateway_response": {
      "payment": {
        "uid": "f356bd32-22b0-4a21-8725-490e45b67a11",
        "type": "payment",
        "updated_at": "2025-01-15T14:28:27.901Z",
        "gateway": {
          "iframe": true
        },
        "avs_cvc_verification": {
          "avs_verification": {
            "result_code": "1"
          },
          "cvc_verification": {
            "result_code": "1"
          }
        },
        "auth_code": "654321",
        "bank_code": "05",
        "rrn": "999",
        "ref_id": "777888",
        "message": "Payment was approved",
        "amount": 500,
        "currency": "EUR",
        "billing_descriptor": "TEST GATEWAY BILLING DESCRIPTOR",
        "gateway_id": 3549,
        "status": "successful",
        "redirect_url": "https://gateway.bepaid.by/process/f356bd32-22b0-4a21-8725-490e45b67a11",
        "receipt_url": "https://merchant.bepaid.by/customer/transactions/f356bd32-22b0-4a21-8725-490e45b67a11/f10043446829352affbf0fc3ae014036c89354b469282cacbf5357f6c407e3a2?language=en",
        "method": {
          "brand": "master"
        }
      }
    },
    "order": {
      "currency": "EUR",
      "amount": 500,
      "description": "Test transaction",
      "tracking_id": null,
      "additional_data": {
        "request_id": "5125f48d8e14265ad9d485a4df76dd9c",
        "browser": {
          "screen_width": 1536,
          "screen_height": 864,
          "screen_color_depth": 24,
          "language": "en",
          "java_enabled": false,
          "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0",
          "time_zone": -180,
          "time_zone_name": "Europe/Istanbul",
          "window_height": 926,
          "window_width": 1513,
          "challenge_window_size": 5,
          "accept_header": "application/json, text/plain, */*"
        },
        "vendor": {
          "name": "CTP",
          "token": "cb967032c168e0b6b930906974594600d96e4df489df8f5e15673df533ca7df5"
        }
      },
      "expired_at": null
    },
    "settings": {
      "success_url": null,
      "fail_url": null,
      "decline_url": null,
      "notification_url": "https://notificationUrl",
      "verification_url": null,
      "cancel_url": null,
      "return_url": "https://returnUrl",
      "language": "en",
      "customer_fields": {},
      "credit_card_fields": {},
      "auto_return": null,          
      "button_next_text": null,
      "save_card_toggle": {
        "display": true,
        "customer_contract": false
      },
      "another_card_toggle": {
        "display": true
      },
      "auto_pay": false,
      "style": {
        "footer": {
          "secureInfo": {
            "text": "Secure payment is provided by PSP"
          }
        },
        "widget": {
          "buttonsColor": "#ff8e09",
          "backgroundType": 8
        }
      },
      "widget_version": 2
    },
    "customer": {
      "first_name": null,
      "last_name": null,
      "address": null,
      "city": null,
      "country": null,
      "state": null,
      "phone": null,
      "zip": null,
      "email": null,
      "birth_date": null,
      "device_id": "25b98e6c5e40982e13a483fe48a62dea",
      "taxpayer_id": null,
      "external_id": "test"
    },
    "finished": true,
    "expired": false,
    "shop": {
      "id": "1673",
      "name": "Good Point 2",
      "country": "",
      "url": "https://example.com",
      "contact_email": "example@example.com",
      "contact_phone": "+1234567890",
      "brands": [
        "visa",
        "master",
        "bank_transfer"
      ]
    },
    "merchant": {
      "id": "1253",
      "country": "LT"
    },
    "test": true,
    "status": "successful",
    "message": "Transaction is successful.",
    "version": null,
    "card_info": {},
    "job_id": "22def0a8-6dc0-40d6-8798-625ca9c9e52e",
    "payment_method": {
      "types": [
        "credit_card",
        "bank_transfer"
      ],
      "excluded_types": [],
      "excluded_brands": [],
      "data": {},
      "created_at": "2025-01-15T14:27:55Z",
      "updated_at": "2025-01-15T14:27:55Z",
      "id": 80212,
      "checkout_data_id": 85976
    }
  }
}

```
