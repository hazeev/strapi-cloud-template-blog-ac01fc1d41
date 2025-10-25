# Customers - bePaid API Documentation
[Subscriptions](https://docs.bepaid.by/en/payment_management/subscriptions/subscriptions/) are associated with the customer resource. Customers can be created either along with a subscription via the subscription [API](https://docs.bepaid.by/en/payment_management/subscriptions/subscriptions/) or via the API as follows.

* * *

Create a customer
-----------------

To create a customer, send a `POST` request to `https://api.bepaid.by/customers` with the following parameters:



* Parameter: first_name
  * Type: string
  * Description: First name of the customer.
* Parameter: last_name
  * Type: string
  * Description: Last name of the customer
* Parameter: address
  * Type: string
  * Description: Address of the customer.
* Parameter: city
  * Type: string
  * Description: City of the customer.
* Parameter: country
  * Type: string
  * Description: Country of the customer. It is in ISO 3166-1 Alpha-2 format.
* Parameter: zip
  * Type: string
  * Description: Billing ZIP or postal code of the customer.  If country=US, zip format must be NNNNN or NNNNN-NNNN
* Parameter: state
  * Type: string
  * Description: The two-letter state of the customer. It is required to send only if the customer country is US or CA
* Parameter: phone
  * Type: string
  * Description: Phone number of the customer.
* Parameter: email * required
  * Type: string
  * Description: E-mail address of the customer.
* Parameter: ip * required
  * Type: string
  * Description: IP address of the customer device.
* Parameter: external_id
  * Type: string (255)
  * Description: The customer's identifier in the merchant's system.


If the request credentials and parameters are valid, bePaid will return `201` HTTP status code and a new customer object with all the relevant details. Otherwise, bePaid will return `422` HTTP status code and an error message.

Example of the request for creating a customer

```
curl https://api.bepaid.by/customers \
  -X POST -u shop_id:secret_key \
  -H "Content-Type: application/json" \
  -d \
'{
  "first_name":"John",
  "last_name":"Doe",
  "address":"1st Street",
  "country":"US",
  "city":"Denver",
  "zip":"92006",
  "state":"CO",
  "phone":"+1-555-555-5555",
  "email":"customer@example.com",
  "ip":"127.0.0.1"
}'

```


Example of the response to the request for creating a customer

```
{
  "id":"cst_7aee5afb954c7ef7",
  "first_name":"John",
  "last_name":"Doe",
  "address":"1st Street",
  "country":"US",
  "city":"Denver",
  "zip":"92006",
  "state":"CO",
  "phone":"+1-555-555-5555",
  "email":"customer@example.com",
  "ip":"127.0.0.1"
}

```


Example of the request for creating a customer with invalid parameters

```
curl https://api.bepaid.by/customers \
  -X POST -u shop_id:secret_key \
  -H "Content-Type: application/json" \
  -d \
'{
  "city":"Denver",
  "zip":"92006",
  "state":"CO",
  "phone":"+1-555-555-5555",
  "email":"customer@example.com"
}'

```


Example of the response to the request for creating a customer with invalid parameters

```
{
  "message": "Ip address is invalid. Ip can't be blank",
  "errors": {
    "ip": [
      "address is invalid",
      "can't be blank"
    ]
  }
}

```


* * *

Get customer details
--------------------

To get customer details, send a `GET` request to `https://api.bepaid.by/customers/:customer_id`, where `:customer_id` stands for the identifier of the required customer.

If the customer ID exists, bePaid will return `200` HTTP status code and the customer details.

Example of the request to get details of the customer with the ID `cst_7aee5afb954c7ef7`

```
curl -u shop_id:secret \
  https://api.bepaid.by/customers/cst_7aee5afb954c7ef7

```


Response example

```
{
  "id":"cst_7aee5afb954c7ef7",
  "first_name":"John",
  "last_name":"Doe",
  "address":"1st Street",
  "country":"US",
  "city":"Denver",
  "zip":"92006",
  "state":"CO",
  "phone":"+1-555-555-5555",
  "email":"customer@example.com",
  "ip":"127.0.0.1"
}

```


* * *

Get a list of customers
-----------------------

To get a list of all customers, send a `GET` request to `https://api.bepaid.by/customers`.

If there are customers, bePaid will return `200` HTTP status code and an array of customer details.

Example of the request for a list of all customers

```
curl -u shop_id:secret \
  https://api.bepaid.by/customers

```


Response example

```
[
  {"id":"cst_5ca4fab9dfc7fcbf","first_name":"John","last_name":"Doe","address":"1st Street","country":"US","city":"Denver","zip":"92006","state":"CO","phone":"+1-555-555-5555","email":"customer@example.com","ip":"127.0.0.1"},
  {"id":"cst_9f65045c1f4c3676","first_name":"Mark","last_name":"Dow","address":"2nd Street","country":"US","city":"Denver","zip":"90006","state":"CO","phone":"+1-551-548-5547","email":"customer.mark@example.com","ip":"10.10.0.4"}
]

```
