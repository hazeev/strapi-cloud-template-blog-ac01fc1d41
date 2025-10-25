# Webhook notifications - bePaid API Documentation
A webhook notification is a way to call a script on one of your own web servers whenever a transaction or a subscription is processed.

* * *

Set up webhook requests
-----------------------

To receive a webhook request from the bePaid system, pass `notification_url` in transaction request parameters.

```
{
    ....

    "notification_url":"https://your-domain.com/notification",

    ....
}

```


Webhook request use [HTTP Basic authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#Basic_authentication_scheme) with [Shop ID and Secret Key](https://docs.bepaid.by/en/using_api/id_key/).

* * *

Verify webhook requests
-----------------------

A webhook request contains the same parameters as a transaction or a subscription response.

The `Content-Signature` header contains the RSA digital signature of the request, that is generated with the shop RSA private key known only to the bePaid.

If you need to verify the notifications, check the digital signature of the request on your side with your RSA public key and compare it with the one received in the request. If the signatures coincide, it confirms the authenticity and integrity of the notification.

Info

When verifying the signature, make sure that:

*   The hash is calculated by the SHA256 function;
*   A public key is a key obtained in your bePaid back office;
*   The calculated value is transmitted in Base64 encoding.

Warning

When verifying the signature, it is necessary to use the raw body of the received webhook notification without its serialization/deserialization into/from JSON.

Example of the PHP code to verify the digital signature

```
# shop_public_key - shop public key
# signature - Content-Signature header value
# rawBody - request body

$rawBody = file_get_contents('php://input');

$public_key = str_replace(array("\r\n", "\n"), '', $shop_public_key);
$public_key = chunk_split($public_key, 64);
$public_key = "-----BEGIN PUBLIC KEY-----\n$public_key-----END PUBLIC KEY-----";

$signature = base64_decode($signature);

$key = openssl_pkey_get_public($public_key);

$a = openssl_verify($rawBody, $signature, $key, OPENSSL_ALGO_SHA256);

var_dump($a);

```


Example of the Ruby code to verify the digital signature

```
require 'openssl'
require 'base64'

shop_public_key = "" # Shop public key
signature = "" # Content-Signature header value
request_raw_body = request.body.bytes.to_a.pack('c*') # # Request body in byte format

public_key = OpenSSL::PKey::RSA.new(Base64.decode64(shop_public_key))

public_key.verify(OpenSSL::Digest::SHA256.new, Base64.decode64(signature), request_raw_body)    

```


Processing webhook notifications
--------------------------------

Your web server should return `200` HTTP status code if a webhook notification is processed successfully. Otherwise, bePaid will re-post webhook data later.

### Retry webhook notification schedule

The delay between retry attempts increases exponentially, and each interval includes a randomized component.

As a result, the actual delay before each retry falls within a defined range, which depends on the retry number. Approximate interval ranges are provided in the table below.

Retries



* Service name: Checkout
  * Number of retries: 2
  * Formula for interval calculation- count – the number of the retry;- rand(30) – random number from 0 to 29;- .to_i – conversion to an integer.: count⁴ + 15 + (rand(30) * (count + 1))
  * Intervals between retries: 1st retry attempt: 15 seconds,2nd retry attempt: 0.5–2 minutes.
  * Absolute intervals: 1st retry attempt: 15 seconds,2nd retry attempt: 46 seconds – 2.5 minutes.
* Service name: Service for processing  card transactions
  * Number of retries: 15
  * Formula for interval calculation- count – the number of the retry;- rand(30) – random number from 0 to 29;- .to_i – conversion to an integer.: ((2.12 * count).to_i)³ + (rand(30) * (count +1))
  * Intervals between retries:               1st retry attempt: 8–66 seconds;        2: 1–3 minutes;        3: 3–6 minutes;        4: 8–11 minutes;        5: 16–20 minutes;        6: 28–33 minutes;        7: 45–50 minutes;        8: 68–73 minutes;        9: 114–120 minutes;        10: ≈ 2.5 hours;        11: ≈ 3.5 hours;        12: ≈ 4.5 hours;        13: ≈ 5.5 hours;        14: ≈ 7 hours;        15: ≈ 8.5 hours.      
  * Absolute intervals:               1st retry attempt: 8–66 seconds;        2: 1–4 minutes;        3: 4–10 minutes;        4: 13–21 minutes;        5: 30–40 minutes;        6: 58–72 minutes;        7: 1–2 hours;        8: 2–3.5 hours;        9: 4–5.5 hours;        10: ≈ 7 hours;        11: ≈ 10–11.5 hours;        12: ≈ 15–16 hours;        13: ≈ 20–21.5 hours;        14: ≈ 27–28.5 hours;        15: ≈ 35.5–37 hours.      
* Service name: Service for processing   transactions with alternative payment methods
  * Number of retries: 15
  * Formula for interval calculation- count – the number of the retry;- rand(30) – random number from 0 to 29;- .to_i – conversion to an integer.: 
  * Intervals between retries: 
  * Absolute intervals: 
* Service name: Subscriptions
  * Number of retries: 25
  * Formula for interval calculation- count – the number of the retry;- rand(30) – random number from 0 to 29;- .to_i – conversion to an integer.: сount⁴ + 15 + (rand(30) * (count + 1))
  * Intervals between retries:         1st retry attempt: 15 seconds;        2: 0.5–2 minutes;        3: 1–4 minutes;        4: 4–7 minutes;        5: 10–14 minutes;        6: 21–26 minutes;        7: 40–45 minutes;        8: 68–73 minutes;        9: 109–115 minutes;        10: ≈ 3 hours;        11: ≈ 4 hours;        12: ≈ 6 hours;        13: ≈ 8 hours;        14: ≈ 11 hours;        15: ≈ 14 hours;        16: ≈ 18 hours;        17: ≈ 24 hours;        18–25: 36–109 hours.      
  * Absolute intervals:         1st retry attempt: 15 seconds;        2: 0.5–2 minutes;        3: 2–6 minutes;        4: 6–13 minutes;        5: 17–27 minutes;        6: 39–52 minutes;        7: 1–2 hours;        8: 2–3 hours;        9: 4–5 hours;        10: 7–8 hours;        11: 11–12 hours;        12: 16–18 hours;        13: 24–26 hours;        14: 35–37 hours;        15: 49–51 hours;        16: 67–69 hours;        17: 91–93 hours;        18–25: 5–25 days.      


Example of the webhook request for a payment transaction

```
{
  "transaction": {
    "uid": "dd6ee60c-d30a-4348-b84c-86a4ef1a137d",
    "status": "successful",
    "amount": 100,
    "currency": "EUR",
    "description": "Test transaction ütf",
    "type": "payment",
    "payment_method_type": "credit_card",
    "tracking_id": "tracking_id_000",
    "message": "Successfully processed",
    "test": true,
    "created_at": "2023-04-14T13:07:01.836Z",
    "updated_at": "2023-04-14T13:07:05.530Z",
    "paid_at": "2023-04-14T13:07:05.495Z",
    "expired_at": null,
    "recurring_type": null,
    "closed_at": null,
    "settled_at": null,
    "manually_corrected_at": null,
    "language": "en",
    "credit_card": {
      "holder": "John Doe",
      "stamp": "d9a78f040a8427c65da2c5569e6411c3641a5537fcfd2d2bf9f866abf3611c7d",
      "brand": "visa",
      "last_4": "1006",
      "first_1": "4",
      "bin": "401200",
      "issuer_country": null,
      "issuer_name": null,
      "product": null,
      "exp_month": 10,
      "exp_year": 2027,
      "token_provider": null,
      "token": null
    },
    "receipt_url": "https://merchant.bepaid.by/customer/transactions/dd6ee60c-d30a-4348-b84c-86a4ef1a137d/42fe9b2e3ed56e98b426e946882cd10d71cd8ee0593373b00196413e28338dd7?language=en",
    "status_code": null,
    "gateway": {
      "iframe": true
    },
    "id": "dd6ee60c-d30a-4348-b84c-86a4ef1a137d",
    "additional_data": {
      "browser": {
        "screen_width": 1920,
        "screen_height": 1080,
        "screen_color_depth": 24,
        "language": "en",
        "java_enabled": false,
        "user_agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
        "time_zone": -180,
        "time_zone_name": "Europe",
        "accept_header": "json",
        "window_height": 667,
        "window_width": 600
      }
    },
    "redirect_url": "https://gateway.bepaid.by/process/dd6ee60c-d30a-4348-b84c-86a4ef1a137d",
    "payment": {
      "auth_code": "654321",
      "bank_code": "05",
      "rrn": "999",
      "ref_id": "777888",
      "message": "Payment was approved",
      "amount": 100,
      "currency": "EUR",
      "billing_descriptor": "test descriptor",
      "gateway_id": 645,
      "status": "successful"
    },
    "customer": {
      "ip": "127.0.0.1",
      "email": "john@example.com",
      "device_id": "12312312321fff67",
      "birth_date": "1980-01-31"
    },
    "billing_address": {
      "first_name": "John 1",
      "last_name": "Doe",
      "address": "1st Street",
      "country": "US",
      "city": "Denver",
      "zip": "96002",
      "state": "CO",
      "phone": "4567898765467"
    }
  }
}

```


Example of the webhook request body for a trial subscription

```
{
  "id": "sbs_962f994ca74420d3",
  "state": "trial",
  "tracking_id": null,
  "device_id": null,
  "created_at": "2023-04-13T06:39:36.593Z",
  "renew_at": "2023-05-13T06:41:26.581Z",
  "active_to": "2023-05-13T06:41:26.581Z",
  "card": {
    "holder": "JOHN DOE",
    "stamp": null,
    "brand": "visa",
    "last_4": "1006",
    "first_1": "4",
    "bin": null,
    "issuer_country": null,
    "issuer_name": null,
    "product": null,
    "token": "606760b7-74da-44fb-a730-13a9ee28d620",
    "token_provider": null,
    "exp_month": 12,
    "exp_year": 2027,
    "sub_brand": null
  },
  "customer": {
    "id": "cst_4a708bf13a483278"
  },
  "paid_billing_cycles": 1,
  "number_failed_payment_attempts": 0,
  "additional_data": {},
  "plan": {
    "id": "pln_7f2e3edfbca72afc",
    "title": "Test plan",
    "name": "Test plan",
    "description": "Subscription. Main period: €9.99 each 1 month. Trial: €4.99 each 1 month.",
    "amount": 499,
    "currency": "EUR",
    "language": "en",
    "infinite": true,
    "billing_cycles": null,
    "created_at": "2023-04-13T06:38:58.604Z",
    "updated_at": "2023-04-13T06:38:58.604Z",
    "trial": {
      "amount": 499,
      "interval": 1,
      "interval_unit": "month"
    },
    "plan": {
      "amount": 999,
      "interval": 1,
      "interval_unit": "month",
      "visible_fields": [
        "last_name",
        "first_name",
        "email"
      ]
    },
    "number_payment_attempts": 3,
    "prevent_payments_at_night": true,
    "test": true,
    "pay_url": "https://api.bepaid.by/plans/pln_7f2e3edfbca72afc/pay",
    "payment_url": "https://api.bepaid.by/plans/pln_7f2e3edfbca72afc/pay",
    "confirm_url": "https://checkout.bepaid.by/v2/confirm_order/pln_7f2e3edfbca72afc/160"
  },
  "last_transaction": {
    "uid": "971c8eb0-f4db-4a04-ba64-840e3427656e",
    "status": "successful",
    "message": "Successfully processed",
    "created_at": "2023-04-13T06:41:22.913Z"
  },
  "event": "created.subscription"
}

```


Example of the webhook request for an active or renewed subscription

```
{
  "card": {
    "token": "2ed0b389f63c9198160bd7b8e98f6b42eb4c56e3b659a8070248b28cd3376d9d",
    "holder": "John Doe",
    "stamp": "b3839d334ba40e89168d60cd9f9d1390aee3fe67dd4d5c41adbf3998043eaef8",
    "brand": "visa",
    "last_4": "0000",
    "first_1": "4",
    "bin": "420000",
    "issuer_country": null,
    "issuer_name": null,
    "product": null,
    "token_provider": null,
    "exp_month": 1,
    "exp_year": 2027
  },
  "created_at": "2015-06-18T12:02:42.521Z",
  "customer": {
    "id": "cst_ae00d2582d001228"
  },
  "device_id": "any device_id",
  "id": "sbs_f140af88af4aaf88",
  "last_transaction": {
    "created_at": "2015-01-12T09:04:59.000Z",
    "message": "Successfully processed",
    "status": "successful",
    "uid": "4107-310b0da80b"
  },
  "plan": {
    "currency": "USD",
    "id": "pln_05e0756ed24eec5c",
    "plan": {
      "amount": 20,
      "interval": 7,
      "interval_unit": "day"
    },
    "title": "Title 1",
    "trial": {
      "amount": 10,
      "interval": 40,
      "interval_unit": "hour"
    }
  },
  "renew_at": "2015-06-24T12:02:42.499Z",
  "state": "active",
  "tracking_id": "any tracking_id"
}

```


Example of the webhook request for a canceled subscription

```
{
  "card": {
    "token": "9990edb8e6f2af5d93a6259b690c50a7410bf9f97235f2e051345e01b580f699",
    "holder": "John Doe",
    "stamp": "b3839d334ba40e89168d60cd9f9d1390aee3fe67dd4d5c41adbf3998043eaef8",
    "brand": "visa",
    "last_4": "0000",
    "first_1": "4",
    "bin": "420000",
    "issuer_country": null,
    "issuer_name": null,
    "product": null,
    "token_provider": null,
    "exp_month": 1,
    "exp_year": 2027
  },
  "created_at": "2015-06-18T12:02:42.731Z",
  "customer": {
    "id": "cst_2a46e8b7ff87df2d"
  },
  "device_id": "any device_id",
  "id": "sbs_1cc338f74bc9bfb7",
  "last_transaction": null,
  "plan": {
    "currency": "USD",
    "id": "pln_0b4ba2f1ab0c1988",
    "plan": {
      "amount": 20,
      "interval": 7,
      "interval_unit": "day"
    },
    "title": "Title 1",
    "trial": {
      "amount": 10,
      "interval": 40,
      "interval_unit": "hour"
    }
  },
  "renew_at": null,
  "state": "canceled",
  "tracking_id": "any tracking_id"
}

```


Example of the webhook request for an expired payment token

If a payment token wasn't paid in time, the notification is sent at `expired_at` date or in 24 hours after the token was created, if the `expired_at` date wasn't defined.

```
{
  "token":"311300d08dc7f22ae37272fac6513921d4c99ca24dcaccf4392a2606fe8f1877",
  "shop_id":1,
  "transaction_type":"payment",
  "gateway_response":null,
  "order":{
    "currency":"USD",
    "amount":4299,
    "description":"Order description",
    "tracking_id":null,
    "additional_data":{

    },
    "expired_at":"2017-06-01T13:01:06.123Z"
  },
  "settings":{
    "success_url":"http://127.0.0.1:4567/success",
    "fail_url":"http://127.0.0.1:4567/fail",
    "decline_url":"http://127.0.0.1:4567/decline",
    "notification_url":"http://your_shop.com/notification",
    "cancel_url":"http://127.0.0.1:4567/cancel",
    "language":"en",
    "customer_fields":{
      "hidden":[
        "phone",
        "address"
      ],
      "read_only":[
        "email"
      ]
    }
  },
  "customer":{
    "first_name":null,
    "last_name":null,
    "address":null,
    "city":null,
    "country":null,
    "state":null,
    "phone":null,
    "zip":null,
    "email":"jake@example.com"
  },
  "finished":false,
  "expired":true,
  "shop":{
    "name":"Shop",
    "url":"http://127.0.0.1:3009",
    "contact_email":"qwfpg@gmail.com",
    "contact_phone":"123456789",
    "brands":[
      "visa",
      "master",
      "maestro",
      "erip"          
    ]
  },
  "test":false,
  "status":"error",
  "message":"Token is expired.",
  "payment_method":{
    "id":9,
    "checkout_data_id":9,
    "types":[
      "erip"
    ],
    "data":{ 
      "erip":{
        "order_id":"order_id",
        "account_number":"123",
        "service_no":"99999999"
      }
    },
    "created_at":"2017-06-01T13:00:14.506Z",
    "updated_at":"2017-06-01T13:00:14.506Z"
  }
}

```
