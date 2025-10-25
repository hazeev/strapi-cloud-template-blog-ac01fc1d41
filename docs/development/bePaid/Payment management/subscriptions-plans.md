# Plans - bePaid API Documentation
Subscription plans
------------------

A subscription plan instructs bePaid how often and how much to charge a customer. Merchants are free to create an unlimited number of subscription plans for their shops.

Each plan has a unique ID which should be submitted in requests.

* * *

Create a plan
-------------

##### Request

To create a subscription plan, send a `POST` request to `https://api.bepaid.by/plans` with the following parameters:



* Parameter: test
  * Type: boolean
  * Description: true or false. The plan will be a test one if it is true.
* Parameter: title * required
  * Type: string
  * Description: Subscription title.
* Parameter: currency * required
  * Type: string
  * Description: Currency in ISO-4217 format, for example USD
* Parameter: plan
  * Type: object
  * Description: A section of plan parameters.
* Parameter: amount * required
  * Type: integer
  * Description: Amount of plan in minimal units.
* Parameter: interval * required
  * Type: integer
  * Description: Interval of plan.
* Parameter: interval_unit * required
  * Type: string
  * Description: Interval unit of plan (hour, day or month)
* Parameter: trial
  * Type: object
  * Description: 
* Parameter: amount
  * Type: integer
  * Description: Trial period amount in minimal units. Works only together with trial.interval
* Parameter: interval
  * Type: integer
  * Description: Interval of trial period (integer). Works only together with trial.amount
* Parameter: interval_unit
  * Type: string
  * Description: Interval unit of trial period (hour, day or month). Works only with trial.interval_unit
* Parameter: as_first_payment
  * Type: boolean
  * Description: true or false. If true, the system considers the payment for the trial period as the first payment, which allows using all the rules for debiting funds, including recovery after payment errors after the trial period. This increases the risk of using stolen and single-use cards to pay for the trial period. If false, then in case of an error in the payment made after the end of the trial period, new attempts to debit funds will not be provided. Default: false
* Parameter: language
  * Type: string
  * Description: The payment page language, when paying for the plan. English (en) is set by default. Possible values of language parameter.
* Parameter: infinite
  * Type: boolean
  * Description: true or false. Set to true if billing cycles are infinite. Default: true
* Parameter: billing_cycles
  * Type: integer
  * Description: Billing cycles number. It is ignored if the infinite parameter is set to true.
* Parameter: number_payment_attempts
  * Type: integer
  * Description: Number of failed payment attempts before cancelling a subscription. Default: 3.If the charge attempt fails, but there were previously successful charges within this subscription, the system will keep making payment attempts the following day:  - at 3 AM if "prevent_payments_at_night":false, - at 8 AM if "prevent_payments_at_night":true The attempts will be made until the payment is succesful or until the specified number of attempts runs out. If the charge results in an error, but there were previously successful charges from this card within this plan, the next attempt will be made at the beginning of each following hour (with the exception of 8:00 PM —8:00 AM period if "prevent_payments_at_night": true) until the specified number of attempts runs out.
* Parameter: prevent_payments_at_night
  * Type: boolean
  * Description: true or false. If true, subscription payments are processed only during the period from 8:00 AM to 8:00 PM in the time zone set for the system. false is set by default.


Example of the requests for creating a plan with infinite billing cycles

```
curl https://api.bepaid.by/plans \
  -X POST -u shop_id:secret_key \
  -H "Content-Type: application/json" \
  -d \
'
{
  "test": true,
  "title": "Basic plan",
  "currency": "USD",
  "plan": {
    "amount": 20,
    "interval": 20,
    "interval_unit": "day"
  },
  "trial": {
    "amount": 10,
    "interval": 10,
    "interval_unit": "hour"
  },
  "language": "en",
  "infinite": true,
  "billing_cycles": null,
  "number_payment_attempts": 3,
}
'

```


Example of the requests for creating a plan with finite billing cycles

```
  {
    "test": true,
    "title": "Basic plan",
    "currency": "USD",
    "plan": {
      "amount": 20,
      "interval": 20,
      "interval_unit": "day"
    },
    "trial": {
      "amount": 10,
      "interval": 10,
      "interval_unit": "hour"
    },
    "language": "en",
    "infinite": false,
    "billing_cycles": 12,
    "number_payment_attempts": 3
  }

```


##### Response

If credentials and parameters are valid, bePaid will return `201` HTTP status code and a new plan object with all the relevant details. Otherwise, bePaid will return `422` HTTP status code and an error message.

Response example

```
{
    "id": "pln_a134847c902551de",
    "title": "Basic plan",
    "currency": "USD",
    "language": "en",
    "plan": {
        "amount": 20,
        "interval": 20,
        "interval_unit": "day"
    },
    "trial": {
        "amount": 10,
        "interval": 10,
        "interval_unit": "hour"
    },
    "number_payment_attempts": 3,
    "test": true
}

```


Example of the response to the request when a parameter is invalid or not included

```
{
    "errors": {
        "title": [
            "can't be blank"
        ]
    },
    "message": "Title can't be blank"
}

```


* * *

Get a payment link for a plan
-----------------------------

To get a payment for a plan, route the customer's browser via a `GET` or `POST` request to `https://api.bepaid.by/plans/{plan_id}/pay`, where `{plan_id}` stands for the identifier of the plan.

* * *

Get subscription plan details
-----------------------------

To get details of a subscription plan, send a `GET` request to `https://api.bepaid.by/plans/{plan_id}`, where `{plan_id}` stands for the identifier of the plan.

If the plan ID exists, bePaid will return `200` HTTP status code and the plan details.

Example of the request to get details of the plan with the ID `pln_a134847c902551de`

```
curl -u shop_id:secret \
  https://api.bepaid.by/plans/pln_a134847c902551de

```


Response example

```
{
    "id": "pln_a134847c902551de",
    "title": "Basic plan",
    "currency": "USD",
    "language": "en",
    "plan": {
        "amount": 20,
        "interval": 20,
        "interval_unit": "day"
    },
    "trial": {
        "amount": 10,
        "interval": 10,
        "interval_unit": "hour"
    },
    "number_payment_attempts": 3,
    "test": true
}

```


* * *

Get a list of plans
-------------------

To get a list of all plans, send a `GET` request to `https://api.bepaid.by/plans`.

If there are plans, bePaid will return `200` HTTP status code and an array of plans.

Example of the request with a list of plans

```
curl -u shop_id:secret \
  https://api.bepaid.by/plans

```


Response example

```
[
    {
        "id": "pln_2b0c211f50deb72c",
        "title": "Basic plan",
        "currency": "USD",
        "language": "en",
        "plan": {
            "amount": 20,
            "interval": 7,
            "interval_unit": "day"
        },
        "trial": {
            "amount": 10,
            "interval": 40,
            "interval_unit": "hour"
        },
        "number_payment_attempts": 3,
        "test": true
    },
    {
        "id": "pln_75eca73bfdcf143a",
        "title": "Pro plan",
        "currency": "USD",
        "language": "fr",
        "plan": {
            "amount": 30,
            "interval": 7,
            "interval_unit": "day"
        },
        "trial": {
            "amount": 10,
            "interval": 40,
            "interval_unit": "hour"
        },
        "number_payment_attempts": 5,
        "test": true
    }
]

```
