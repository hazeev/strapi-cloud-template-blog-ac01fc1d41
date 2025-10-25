# Subscriptions - bePaid API Documentation
Subscriptions link your customers to your plans, and they are responsible for billing and charging on your recurring intervals.

Once a subscription has been created, it will begin to auto-renew on the period specified by the plan to which it is related. You may track your subscription in the bePaid back office or be subscribed in a shop notification settings on e-mails about processed transactions. Additionally, bePaid will post [webhook notification](https://docs.bepaid.by/en/using_api/webhooks/) to `notification_url` given in a subscription creation request.

* * *

Subscription statuses
---------------------



* pending
  * An initial status. All newly created subscriptions are set to this internal status before the processing is started.
* tokenizing
  * The token is being created for the payment on the widget.
* redirecting
  * The customer is being redirected to the payment widget.
* trial_get_status -> getting_status
  * The states for subsequent status queries for the payments if the previous status query resulted in a timeout.
* trial
  * The subscription is active or canceled and is in a trial period.
* trial_processing
  * The subscription is processing the payment for a trial period.
* processing
  * The subscription is processing a payment.
* notified
  * The state is assigned the moment the notification is received between the components of bePaid system.
* active
  * A normal, active subscription. It is not in a trial, and is up to date with payments. This way, the subscription is moving between active and processing statuses after the trial is over.
* failed_attempt
  * The payment returned failed status, but previously there were successful payments within this subscription. The system will make subsequent attempts to make the payment until the number specified in the parameter number_failed_payment_attempts is reached.
* failed
  * A failed subscription. bePaid was unable to collect the subscription overdue balance. Final status of the subscription.
* error
  * An error occurred when bePaid tried to collect the subscription overdue balance.
* rescuing
  * The payment resulted in an error, but previously there were successful payments within this subscription. The system will make subsequent attempts to make the payment until the number specified in the parameter number_failed_payment_attempts is reached.
* expired
  * The state is assigned when the token was created for the subscription payment, but the token expired before any transaction was initialized with it.
* canceled
  * A subscription is canceled and will not renew anymore. A subscription was canceled with API, or the number of billing cycles reached the number specified in the billing_cycles parameter of the subscription plan. 


* * *

Create a subscription
---------------------

#### Request

To create a subscription, send a `POST` request to `https://api.bepaid.by/subscriptions` with the following parameters:



* Parameter: customer
  * Type: object
  * Description: A customer resource. It includes either a customer ID or full customer details.
* Parameter: plan * required
  * Type: object
  * Description: A plan resource. It includes either a plan ID or full plan details.
* Parameter: dynamic_billing_descriptor
  * Type: string
  * Description: A dynamic billing descriptor.
* Parameter: tracking_id
  * Type: string(255)
  * Description: A ID of your transaction or order. Please, use unique values in order to get transaction information by query request. Otherwise, you will get an array of up to 10 recent transactions with the matching tracking_id.
* Parameter: device_id
  * Type: string
  * Description: A device ID of customer subscribing on your service.
* Parameter: return_url
  * Type: string
  * Description: A URL where to return the customer back to the merchant's shop after payment completion. If the parameter is not defined, the customer will be redirected to a shop URL registered with bePaid. A subscription ID will be added in the id parameter of the request query string, for example http://example.com/return?id=sbs_f4117438947a554e.
* Parameter: notification_url
  * Type: string
  * Description: A URL where to post a webhook notification about newly created, renewed or canceled subscriptions.
* Parameter: additional_data
  * Type: object
  * Description: A section contains additional information to store with a subscription. Feel free to add your own data here.
* Parameter: receipt_text
  * Type: array
  * Description: Text that will be added to the customer mail and will be shown on the success result page. Submit it as an array of strings, for example ["First line", "Second line"].
* Parameter: avs_cvc_verification
  * Type: object
  * Description: AVS/CVC verification.
* Parameter: settings
  * Type: object
  * Description: Hosted payment page customization settings.
* Parameter: language
  * Type: string
  * Description: A payment widget language. English (en) is set by default. Possible values of language parameter.


#### Response

If credentials and parameters are valid, bePaid will return `201` HTTP status code and a new subscription object with all the relevant details. Then the customer must be redirected to `redirect_url` to enter his or her card details and to complete a payment to create the subscription.

Otherwise, bePaid will return `422` HTTP status code and an error message.

Example of the request to create a subscription

```
curl https://api.bepaid.by/subscriptions \
  -X POST -u shop_id:secret_key \
  -H "Content-Type: application/json" \
  -d \
'
{
    "notification_url": "http://merchant.com/subscription_notification",
    "plan": {
        "currency": "USD",
        "plan": {
            "amount": 20,
            "interval": 20,
            "interval_unit": "day"
        },
        "shop_id": 10,
        "title": "Basic plan",
        "trial": {
            "amount": 10,
            "interval": 10,
            "interval_unit": "hour"
        }
    },
    "settings": {
        "language": "it"
    }
}
'

```


Example of the response to the request to create a subscription

```
{
    "card": {},
    "created_at": "2015-05-11T12:48:14.067Z",
    "customer": {},
    "device_id": null,
    "id": "sbs_cdf887166553b5ae",
    "last_transaction": null,
    "plan": {
        "currency": "USD",
        "id": "pln_8f9c9dd63c9a5787",
        "plan": {
            "amount": 20,
            "interval": 20,
            "interval_unit": "day"
        },
        "title": "Title",
        "trial": {
            "amount": 10,
            "interval": 10,
            "interval_unit": "hour"
        }
    },
    "redirect_url": "https://checkout.bepaid.by/v2/checkout?token=3241e439f8c87d941d92321a4bdc030d4c9a69c67f3b0cfe12de4a13cc34aa51",
    "renew_at": null,
    "active_to": null,
    "state": "redirecting",
    "token": "3241e439f8c87d941d92621a4bdc030d4c9a69c67f3b0cfe12de4a13cc34aa51",
    "tracking_id": null
}

```


Example of the request when a parameter is invalid or missing

```
curl https://api.bepaid.by/subscriptions \
  -X POST -u shop_id:secret_key \
  -H "Content-Type: application/json" \
  -d \
'
{
    "notification_url": "http://merchant.com/subscription_notification",
    "plan": {
        "currency": "LVL",
        "plan": {
            "amount": 20,
            "interval": 20,
            "interval_unit": "day"
        },
        "shop_id": 10,
        "title": "Basic plan",
        "trial": {
            "amount": 10,
            "interval": 10,
            "interval_unit": "hour"
        }
    },
    "settings": {
        "language": "it"
    }
}
'

```


Example of the response to the request when a parameter is invalid or missing

```
{
    "errors": {
        "base": [
            "Currency is invalid"
        ]
    },
    "message": "Currency is invalid"
}

```


* * *

Create a subscription with credit card data
-------------------------------------------

### Request

To create a subscription with credit card data, send a `POST` request to `https://api.bepaid.by/subscriptions` with the following parameters:



* Parameter: customer * required
  * Type: object
  * Description: A customer resource. It includes either a customer ID or full customer details.
* Parameter: plan * required
  * Type: object
  * Description: A plan resource. It includes either a plan ID or full plan details.
* Parameter: tracking_id
  * Type: string(255)
  * Description: A ID of your transaction or order. Please, use unique values in order to get transaction information by query request. Otherwise, you will get an array of up to 10 recent transactions with the matching tracking_id.
* Parameter: device_id
  * Type: string
  * Description: A device ID of customer subscribing on your service.
* Parameter: return_url
  * Type: string
  * Description: A URL where to return the customer back to the merchant's shop if a transaction card was authenticated with 3-D Secure. If the parameter is not defined, the customer will be redirected to a shop URL registered with bePaid. A subscription ID will be added in the id parameter of the request query string, for example http://example.com/return?id=sbs_f4117438947a554e
* Parameter: notification_url
  * Type: string
  * Description: A URL where to post a webhook notification to.
* Parameter: card
  * Type: object
  * Description: A section of card details.
* Parameter: number * required
  * Type: string
  * Description: A card number. The length is from 12 to 19 digits.
* Parameter: verification_value * required
  * Type: string
  * Description: 3- or 4-digit security code (called CVC2, CVV2 or CID depending on the credit card brand). It can be sent along with token parameter, and in this case, bePaid will submit to acquiring bank card details with the given CVC2/CVV2/CID.
* Parameter: holder * required
  * Type: string(32)
  * Description: A cardholder name as it appears on the card.
* Parameter: exp_month * required
  * Type: integer
  * Description: A card expiration month is expressed with two digits (for example, 01).
* Parameter: exp_year * required
  * Type: integer
  * Description: A card expiration year is expressed with four digits (for example, 2027).
* Parameter: token * conditionally required
  * Type: string
  * Description: Instead of the above 5 parameters, you can send a card token you've stored previously either with a card tokenization request or from a successful response of payment, authorization or subscription creation requests.


#### Response

If credentials and parameters are valid, bePaid will return `201` HTTP status code and a new subscription object with all the relevant details, including `redirect_url` where you need to send the customer to, if 3-D Secure check is enabled.

Otherwise, bePaid will return `422` HTTP status code and an error message.

Example of the request to create a subscription

```
{
  "card": {
    "exp_month": "01",
    "exp_year": "2027",
    "holder": "John Doe",
    "number": "5204240000015003",
    "verification_value": "123"
  },
  "customer": {
    "id": "cst_ec240ca02bac424b"
  },
  "plan": {
    "id": "pln_f5ee5ebd04e39daa"
  },
  "tracking_id": "my_tracking_id"
}

```


Example of the response to the request to create a subscription

```
{
  "id": "sbs_cce60e7f2d661bc0",
  "state": "active",
  "tracking_id": "my_tracking_id",
  "device_id": null,
  "created_at": "2025-03-10T12:29:31Z",
  "renew_at": "2025-03-10T13:29:37Z",
  "active_to": "2025-03-10T13:29:37Z",
  "card": {
    "holder": "John Doe",
    "stamp": "1e2470e4c658e9cc143af8c1dc7a41d382fe53e30c62768a3dbebdc392146c64",
    "brand": "master",
    "last_4": "5003",
    "first_1": "5",
    "bin": "520424",
    "issuer_country": null,
    "issuer_name": null,
    "product": null,
    "token": "111b73a8-4d0c-4d06-a6b4-bccfc006f27b",
    "token_provider": null,
    "exp_month": 1,
    "exp_year": 2027,
    "sub_brand": null
  },
  "customer": {
    "id": "cst_ec240ca02bac424b"
  },
  "paid_billing_cycles": 1,
  "number_failed_payment_attempts": 0,
  "additional_data": {},
  "plan": {
    "id": "pln_f5ee5ebd04e39daa",
    "title": "Basic plan",
    "name": "Basic plan",
    "description": "Subscription. Main period: €1.00 each 1 hour.",
    "amount": 100,
    "currency": "EUR",
    "language": "en",
    "infinite": true,
    "billing_cycles": null,
    "created_at": "2025-03-10T11:45:56Z",
    "updated_at": "2025-03-10T11:45:56Z",
    "trial": {
      "amount": null,
      "interval": null,
      "interval_unit": "hour"
    },
    "plan": {
      "amount": 100,
      "interval": 1,
      "interval_unit": "hour",
      "visible_fields": []
    },
    "number_payment_attempts": 3,
    "prevent_payments_at_night": false,
    "test": true,
    "pay_url": "https://api.bepaid.by/plans/pln_f5ee5ebd04e39daa/pay",
    "payment_url": "https://api.bepaid.by/plans/pln_f5ee5ebd04e39daa/pay",
    "confirm_url": "https://checkout.bepaid.by/v2/confirm_order/pln_f5ee5ebd04e39daa/1673"
  },
  "last_transaction": {
    "uid": "f0eee433-703a-48d6-b91e-6f3a5696b68d",
    "status": "successful",
    "message": "Successfully processed",
    "created_at": "2025-03-10T12:29:33Z"
  }
}

```


Example of the response to the request with the 3-D Secure enrolled card

```
{
  "id": "sbs_3e558f16e7e05f96",
  "state": "redirecting",
  "tracking_id": "my_tracking_id",
  "device_id": null,
  "created_at": "2025-03-10T13:12:38Z",
  "renew_at": null,
  "active_to": null,
  "card": {
    "holder": "John Doe",
    "stamp": "ee02c1496a29180236cde09f44f4823efe793a7b68151dd43cad8577fb7ebc25",
    "brand": "visa",
    "last_4": "1097",
    "first_1": "4",
    "bin": "401200",
    "issuer_country": null,
    "issuer_name": null,
    "product": null,
    "token": "e97830d7-560a-4ae9-8e74-5a8353637545",
    "token_provider": null,
    "exp_month": 1,
    "exp_year": 2027,
    "sub_brand": null
  },
  "customer": {
    "id": "cst_ec240ca02bac424b"
  },
  "paid_billing_cycles": 0,
  "number_failed_payment_attempts": 0,
  "additional_data": {},
  "plan": {
    "id": "pln_f5ee5ebd04e39daa",
    "title": "Basic plan",
    "name": "Basic plan ",
    "description": "Subscription. Main period: €1.00 each 1 hour.",
    "amount": 100,
    "currency": "EUR",
    "language": "en",
    "infinite": true,
    "billing_cycles": null,
    "created_at": "2025-03-10T11:45:56Z",
    "updated_at": "2025-03-10T11:45:56Z",
    "trial": {
      "amount": null,
      "interval": null,
      "interval_unit": "hour"
    },
    "plan": {
      "amount": 100,
      "interval": 1,
      "interval_unit": "hour",
      "visible_fields": []
    },
    "number_payment_attempts": 3,
    "prevent_payments_at_night": false,
    "test": true,
    "pay_url": "https://api.bepaid.by/plans/pln_f5ee5ebd04e39daa/pay",
    "payment_url": "https://api.bepaid.by/plans/pln_f5ee5ebd04e39daa/pay",
    "confirm_url": "https://checkout.bepaid.by/v2/confirm_order/pln_f5ee5ebd04e39daa/1673"
  },
  "last_transaction": {
    "uid": "f3c46af4-fdb3-4e0c-98db-01306780c7a8",
    "status": "incomplete",
    "message": null,
    "created_at": "2025-03-10T13:12:39Z",
    "redirect_url": "https://gateway.bepaid.by/process/f3c46af4-fdb3-4e0c-98db-01306780c7a8"
  }
}

```


Example of the request to create a subscription when a plan, a customer and a card were previously created

```
{
  "card": {
    "token": "7982c829f83060eba2b27b0a7140c751ad02f28702a6475e901767614fe4c0e7"
    },
  "customer": {
    "id": "cst_c8dcec3e5ce21500"
  },
  "plan": {
    "id": "pln_cc22f0cda95f210f"
  },
  "tracking_id": "my_tracking_id"
}

```


Example of the request when a parameter is invalid or missing

```
{
  "card": {
    "token": "7982c829f83060eba2b27b0a7140c751ad02f28702a6475e9"
      },
  "plan": {
    "id": "1"
  }
}

```


Example of the response to the request when a parameter is invalid or missing

```
{
    "errors": {
        "plan": {
            "base": [
                "plan with this ID doesn't exist for this account"
            ]
        }
    },
    "message": "plan with this ID doesn't exist for this account"
}

```


* * *

Get subscription details
------------------------

#### Request

To get the details of a subscription, send a `GET` request to `https://api.bepaid.by/subscriptions/{subscription_id}`, where `{subscription_id}` stands for the identifier of the subscription.

#### Response

If the subscription ID exists, bePaid will return `200` HTTP status code and the subscription details.

Example of the request to get details of the subscription with the ID `sbs_430955c932808d0f`

```
curl -u shop_id:secret \
  https://api.bepaid.by/subscriptions/sbs_430955c932808d0f

```


Example of the response to the request to get details of the subscription

```
{
    "id": "sbs_430955c932808d0f",
    "state": "active",
    "tracking_id": null,
    "device_id": null,
    "created_at": "2025-03-10T11:46:13Z",
    "renew_at": "2025-03-10T12:46:42Z",
    "active_to": "2025-03-10T12:46:42Z",
    "card": {
        "holder": "KEVIN JACKSON",
        "stamp": null,
        "brand": "master",
        "last_4": "5003",
        "first_1": "5",
        "bin": null,
        "issuer_country": null,
        "issuer_name": null,
        "product": null,
        "token": "f6e16646-22f2-4645-854d-893ac6e10da7",
        "token_provider": null,
        "exp_month": 9,
        "exp_year": 2028,
        "sub_brand": null
    },
    "customer": {
        "id": "cst_1901069ea84fa2a7"
    },
    "paid_billing_cycles": 1,
    "number_failed_payment_attempts": 0,
    "additional_data": {},
    "plan": {
        "id": "pln_f5ee5ebd04e39daa",
        "title": "Basic plan",
        "name": "Basic plan",
        "description": "Subscription. Main period: €1.00 each 1 hour.",
        "amount": 100,
        "currency": "EUR",
        "language": "en",
        "infinite": true,
        "billing_cycles": null,
        "created_at": "2025-03-10T11:45:56Z",
        "updated_at": "2025-03-10T11:45:56Z",
        "trial": {
            "amount": null,
            "interval": null,
            "interval_unit": "hour"
        },
        "plan": {
            "amount": 100,
            "interval": 1,
            "interval_unit": "hour",
            "visible_fields": []
        },
        "number_payment_attempts": 3,
        "prevent_payments_at_night": false,
        "test": true,
        "pay_url": "https://api.bepaid.by/plans/pln_f5ee5ebd04e39daa/pay",
        "payment_url": "https://api.bepaid.by/plans/pln_f5ee5ebd04e39daa/pay",
        "confirm_url": "https://checkout.bepaid.by/v2/confirm_order/pln_f5ee5ebd04e39daa/1673"
    },
    "last_transaction": {
        "uid": "b7d8478d-fd2f-4a31-bdd5-65f503438e00",
        "status": "successful",
        "message": "Successfully processed",
        "created_at": "2025-03-10T11:46:32Z"
    }
}

```


* * *

Cancel a subscription
---------------------

#### Request

To cancel a subscription and to stop all further customer charges, send a `POST` request to `https://api.bepaid.by/subscriptions/{subscription_id}/cancel`, where `{subscription_id}` stands for the identifier of the subscription. The request should specify:



* Parameter: cancel_reason * required
  * Type: string
  * Description: A reason why the subscription has been canceled, for example Customer's request.


#### Response

If the request is processed well, bePaid will return `200` HTTP status code and a renewed array of customers.

Example of the request to cancel the subscription with the ID `sbs_b1b7139d9b664293`

```
curl https://api.bepaid.by/subscriptions/sbs_b1b7139d9b664293/cancel \
  -u shop_id:secret \
  -X POST secret_key \
  -H "Content-Type: application/json" \
  -d \
'
{
    "cancel_reason": "Customer's request"
}
'

```


Example of the response to the request to cancel the subscription

```
{
  "card": {
    "token": "064a120788b5847f866ff3def0c97ae12a6ff069407317fef172dcbafa3187e6",
    "holder": "John Doe",
    "stamp": "qr34ba40e89168d60cd9f9d1390aee3fe67dd4d5c41adbf3998043eaef8",
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
  "created_at": "2015-01-27T15:59:55.609Z",
  "customer": {
    "id": "cst_e64cc8479090991e"
  },
  "id": "sbs_b1b7139d9b664293",
  "plan": {
    "currency": "USD",
    "id": "pln_068ed4bb9ce03298",
    "plan": {
      "amount": 20,
      "interval": 7,
      "interval_unit": "day"
    },
    "title": "Basic plan",
    "trial": {
      "amount": 10,
      "interval": 40,
      "interval_unit": "hour"
    }
  },
  "cancel_reason": "Customer's request",
  "cancelled_at": "2015-02-28T14:19:55.009Z",
  "renew_at": null,
  "active_to": "2015-03-28T01:54:32.684Z",
  "state": "canceled",
  "tracking_id": "my_tracking_id",
  "transaction": null
}

```


Automatic cancellation of subscription
--------------------------------------

In certain cases, the subscription will be automatically canceled with a `failed` or an `error` status:

1.  If the first ever charge returns a `failed` status, the subscription also gets a `failed` status.
2.  If a subsequent charge (meaning there were previously successful charges within this subscription) returns a `failed` status, the system will make new charge attempts until the number of attempts specified under `number_payment_attempts` runs out. If these attempts also fail, the subscription gets a `failed` status.
3.  If the first ever charge results in an error (for example, invalid card number or the currency is not supported), the subscription gets a `failed` status.
4.  If a subsequent charge (meaning there were previously successful charges within this subscription) results in an error, the system will make new charge attempts until the number of attempts specified under `number_payment_attempts` runs out. If these attempts also result in an error, the subscription gets an `error` status.