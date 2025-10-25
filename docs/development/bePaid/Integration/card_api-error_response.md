# Error response - bePaid API Documentation
In case of an error occurred while a request is processed, bePaid system can return a response with the information on the detected error.

Information on errors due to wrong or missing request parameters is contained in the `message` parameter.

Example of the error response for a payment request without any parameters

```
{
  "message":"First name can't be blank. Last name can't be blank. Address can't be blank. City can't be blank. Zip can't be blank. Country is invalid. Ip can't be blank. Email can't be blank. Verification value is not a number. Holder can't be blank. Date can't be blank. Number is invalid. Currency can't be blank. Description can't be blank. Amount must be greater than 0.",
  "errors":{
    "billing_address":{
      "first_name":["can't be blank"],
      "last_name":["can't be blank"],
      "address":["can't be blank"],
      "city":["can't be blank"],
      "zip":["can't be blank"],
      "country":["is invalid"]
    },
    "customer":{
      "ip":["can't be blank"],
      "email":["can't be blank"]
    },
    "credit_card":{
      "verification_value":["is not a number"],
      "holder":["can't be blank"],
      "date":["can't be blank"],
      "number":["is invalid"]
    },
    "currency":["can't be blank"],
    "description":["can't be blank"],
    "amount":["must be greater than 0"]
  }
}

```


It's also possible to get errors that are not connected to either a parameter format or a value. Such kind of errors will be described in `base` parameter.

Example of the response to a refund request when a transaction can not be refunded

```
{
  "message" : "transaction can't be refunded",
  "errors":{
    "base":[ "transaction can't be refunded" ]
  }
}

```
