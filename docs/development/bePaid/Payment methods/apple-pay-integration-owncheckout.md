# Apple Pay on your own checkout - bePaid API Documentation
This chapter describes the Apple Pay integration for those who want to add the Apple Pay button to the website checkout page.

Apple Pay processing flow
-------------------------

1.  Device compatibility check. Opening the payment session. Displaying the Apple Pay button, if supported on the device.
2.  Merchant and domain validation by Apple Pay.
3.  Collecting the billing data. Payment authorization by a customer using Face ID, Touch IDs or double-click in Apple Watch.
4.  Getting `PaymentToken` from Apple Pay.
5.  Processing payment and authorization requests with the decrypted `paymentData`.
6.  Displaying the payment status to the customer. Sending the payment result to Apple.

Integration options
-------------------

You can incorporate Apple Pay on own checkout by using one of the following options:

*   Apple Pay JS by bePaid (for websites only);
*   Self-developed JS.

Info

Before you start, make sure that you finished [the registration](https://docs.bepaid.by/en/payment_methods/apple_pay/registration/) with Apple. Both setup options available for the websites.

### Apple Pay JS by bePaid

bePaid developed its own library similar to the library of [the payment widget](https://docs.bepaid.by/en/integration/widget/setup/). It simplifies the integration since payment and authorization requests are sent automatically.

To check if Apple Pay payments can be initiated and processed, follow the steps below:

**1.** Install the library on your website:

```
<script type="text/javascript" src="https://js.bepaid.by/widget/apple_pay.js"></script>

```


**2.** Locate the block which stands for the Apple Pay button:

```
<div id="apple-pay-button"></div>

```


For Apply Pay button customization, insert the code below in the `<head>` section and make the adjustments using the browser developer tools.

Code example for Pay button customization

```
<style>
@supports (-webkit-appearance: -apple-pay-button) {
  .apple-pay-button-with-text {
    display: inline-block;
    cursor: pointer;
    max-width: 420px;
    width: 100%;
    height: 40px;
    -webkit-appearance: -apple-pay-button;
  }
  .apple-pay-button-with-text > * {
    display: none;
  }
  @media screen and (max-width: 480px){
    .apple-pay-button-white-with-text {
      width: 285px;
    }
  }
  .apple-pay-button-black-with-text {
    -apple-pay-button-style: black;
  }
  .apple-pay-button-white-with-text {
    -apple-pay-button-style: white;
  }
  .apple-pay-button-white-with-line-with-text {
    -apple-pay-button-style: white-outline;
  }
}

@supports not (-webkit-appearance: -apple-pay-button) {
  .apple-pay-button-with-text {
    --apple-pay-scale: 1; /* (height / 32) */
    display: inline-flex;
    justify-content: center;
    font-size: 12px;
    border-radius: 5px;
    padding: 0px;
    box-sizing: border-box;
    min-width: 200px;
    min-height: 32px;
    max-height: 64px;
  }
  .apple-pay-button-black-with-text {
    background-color: black;
    color: white;
  }
  @media screen and (max-width: 480px){
    .apple-pay-button-white-with-text {
      width: 285px
    }
  }
  .apple-pay-button-white-with-text {
    background-color: white;
    color: black;
  }
  .apple-pay-button-white-with-line-with-text {
    background-color: white;
    color: black;
    border: .5px solid black;
  }
  .apple-pay-button-with-text.apple-pay-button-black-with-text > .logo {
    background-image: -webkit-named-image(apple-pay-logo-white);
    background-color: black;
  }
  .apple-pay-button-with-text.apple-pay-button-white-with-text > .logo {
    background-image: -webkit-named-image(apple-pay-logo-black);
    background-color: white;
  }
  .apple-pay-button-with-text.apple-pay-button-white-with-line-with-text > .logo {
    background-image: -webkit-named-image(apple-pay-logo-black);
    background-color: white;
  }
  .apple-pay-button-with-text > .text {
    font-family: -apple-system;
    font-size: calc(1em * var(--apple-pay-scale));
    font-weight: 300;
    align-self: center;
    margin-right: calc(2px * var(--apple-pay-scale));
  }
  .apple-pay-button-with-text > .logo {
    width: calc(35px * var(--scale));
    height: 100%;
    background-size: 100% 60%;
    background-repeat: no-repeat;
    background-position: 0 50%;
    margin-left: calc(2px * var(--apple-pay-scale));
    border: none;
  }
}
</style>

```


**3.** Add the JavaScript code according to the example to initiate a payment.

Code example with the token

```
<script defer>
      const params = {
        checkout_url: "https://checkout.bepaid.by",
        containerId: "apple-pay-button",
        token: "{PAYMENT TOKEN}",
        onSuccess: (response) => {},              
        onInitalError: (error) => {},
      };
      new ApplePay(params);
</script>

```


Code example with the public key

```
<script defer>
      const params = {
        checkout_url: "https://checkout.bepaid.by",
        containerId: "apple-pay-button",
        public_key: "{SHOP PUBLIC KEY}",
        checkout: {
          transaction_type: "payment",
          order: {
            currency: "USD",
            amount: 100,
            description: "Test description",
          },
          test: true,
        },
        onSuccess: (response) => {},              
        onInitalError: (error) => {},
      };
      new ApplePay(params);
</script>  

```




* Parameter: checkout_url * required
  * Type: string
  * Description: https://checkout.bepaid.by
* Parameter: token
  * Type: string
  * Description: A payment token. To get the token, make a request described on the Payment token page.
* Parameter: public_key * conditionally required
  * Type: string
  * Description: The shop public key. Required if the token parameter is not sent.
* Parameter: onSuccess
  * Type: callback function
  * Description: Parameter for processing webhook notifications about the transaction results.
* Parameter: onInitalError
  * Type: callback function
  * Description: Parameter for processing webhook notifications about payment initialization errors.


The response to the payment request with Apple Pay token will be returned with [the processing status](https://docs.bepaid.by/en/integration/card_api/statuses/) and fully conforms to [the payment](https://docs.bepaid.by/en/integration/card_api/transactions/payment/) or [authorization](https://docs.bepaid.by/en/integration/card_api/transactions/authorization/) transaction response.

### Self-developed JS

For this integration option you are supposed to use the front-end on the customer's device and the back-end to call the bePaid API. To initiate a payment, add the JavaScript code that conforms to [Apple Pay JS](https://developer.apple.com/documentation/apple_pay_on_the_web/apple_pay_js_api), but also send the validation and payment requests to the bePaid system.

Example of JavaScript-code to initiate Apple Pay payment

```
if (window.ApplePaySession) { 
    //Device check
    var merchantIdentifier = '{YOUR APPLE MERCHANT ID}';
    var promise = ApplePaySession.canMakePaymentsWithActiveCard(merchantIdentifier);
    promise.then(function (canMakePayments) {
        if (canMakePayments) { 
            //Apple Pay button display
            $('#apple-pay').show();
        }
    });
}
$('#apple-pay').click(function () { 
    //Button click handling
    var request = {
        //requiredShippingContactFields: ['postalAddress', 'name', 'phone', 'email'], //Add if shipping details are required
        //requiredBillingContactFields: ['postalAddress'], //Add if billing contact details are required
        countryCode: 'US',
        currencyCode: 'USD',
        supportedNetworks: ['visa', 'masterCard'],
        merchantCapabilities: ['supports3DS'],
        total: { 
            //Order and amount description. Use the Latin letters only!
            label: 'Test',
            amount: '1.00'
        },
    }
    var session = new ApplePaySession(3, request);

    //Payment session event handler
    session.onvalidatemerchant = function (event) {
        var data = {
            url: event.validationURL
        };
        //Domain validation
        //To initiate a payment session, send the request to your server, then send the validation request to the bePaid API as described below.
        $.post("https://checkout.bepaid.by/ctp/api/apple_pay/validate", data).then(function (result) {
            session.completeMerchantValidation(result.Model);
        });
    };

    //payment authorization event handler
    session.onpaymentauthorized = function (event) {

        //var email = event.payment.shippingContact.emailAddress; //Add if email is required
        //var phone = event.payment.shippingContact.phoneNumber; //Add if phone is required
        //all available variables are described on https://developer.apple.com/reference/applepayjs/paymentcontact

        var data = {
            request: event.payment.token
        };
        //Payment request
        //Convert the JSON response received after the payment authorization to the Base64-strict format.
        //Send the received token to bePaid API.
        //Alternatively, you can send the received token to your server (for example https://example.com/apple), and then therefrom send the payment, authorization or charge request with the encrypted Apple Pay token in the required format.
        $.post("https://checkout.bepaid.by/apple_pay/payment", data).then(function (result) {
            var status;
            if (result.Success) {
                status = ApplePaySession.STATUS_SUCCESS;
            } else {
                status = ApplePaySession.STATUS_FAILURE;
                }

            session.completePayment(status);
        });
    };

    //payment session with bePaid API
    session.begin();
});

```


Info

```
The sample JS uses the jQuery library. Nothing else is required, Safari provides all objects for Apple Pay.

```


#### Validation

To get `PaymentToken` from Apple, open a payment session and send the request to get your Apple Merchant ID and your domain validated.

##### Request

Send a `POST` request to `https://checkout.bepaid.by/ctp/api/apple_pay/validate` with the `X-API-Version: 2` header and the following parameters in the request body:



* Parameter: url * required
  * Type: string
  * Description: The value of event.verificationURL set during the Apple Pay payment session and transmitted to your server.
* Parameter: token * required
  * Type: string
  * Description: Token used to authorize a payment in the bePaid system instead of the Shop Secret or Public Keys.
* Parameter: context * required
  * Type: string
  * Description: Set to merchant.


Example of the validation request

```
{
    "url":"{event.validationURL}", // for example, https://apple-pay.apple.com
    "token":"{payment token}", // not required if you send the authorization headers (shop_id + secret_key or public_key)!
    "context":"merchant"
}

```


##### Response

The response contains the JSON-serialized object of Apple Pay payment session (expires in 5 minutes), which you should return as a response to the request from the customer's device to get the `PaymentToken`.

* * *

#### Payment with encrypted paymentData

##### Request

To get the payment with encrypted `paymentData` processed by bePaid, send [the payment](https://docs.bepaid.by/en/integration/card_api/transactions/payment/), [authorization](https://docs.bepaid.by/en/integration/card_api/transactions/authorization/) or [charge](https://docs.bepaid.by/en/payment_management/saved_cards/charges/) request, where you should submit the encrypted Apple Pay token as the value of `request.credit_card.token` in the format described below.

**The required format of the encrypted Apple Pay token sent as a card token**

Submit the encrypted Apple Pay token in requests as the card token in the `$begateway_apple_pay_1_0_0$<base64-encoded_paymentData_here>` format, where:

*   `$begateway_apple_pay_1_0_0$` is the required prefix for the encrypted Apple Pay token;
*   `<base64-encoded_paymentData_here>` is the encrypted `paymentData` property of the `PaymentToken` serialized into JSON and then converted to the Base64-strict format.

For recurring payments and payments with the saved card data, get the bePaid payment token by sending the `request.additional_data.contract` parameter in [the payment](https://docs.bepaid.by/en/integration/card_api/transactions/payment/) or [authorization](https://docs.bepaid.by/en/integration/card_api/transactions/authorization/) requests.

The required format of the JSON-serialized encrypted paymentData property

```
{
"paymentData": {
    "version": "EC_v1",
    "header": {
    "publicKeyHash": "sMqKpcUQU8763PUTXhPSo98wlJsqdqxc4rBdqNEnb0U=",
    "ephemeralPublicKey": "MFkwEwYHKoZIzj0QAdYIKoZIzj0DAQcDQgAEcjh7gGVcf1z87WBF2CfNfD6LIzjxvb8fflmeVsN3U5ixHLuCrCp2gXipnVdpb0NVy1Jf6TvLlbPpUdD6LcyNg==",
    "transactionId": "8b1b1dade0bfbc8f1f6677889bd36191a235ca1f26736e3b96970459545ad56e"
    },
    "data": "eHaJz9z1jQL3K6h9aCxMK8rtrAJ33e3RS48uVSQtDOXKZkjQAdCG4zG3zoi04JFTcdxeD2D3Tswbe0gzRyZTjrLjqJWvTa1Zkk2tA8B3aOxi6vkv8DQtLWaEGdySwXLMwBVbXjKEWy3ZnXEQCn2nnUcycxUt4b4NV0IWXUNnlqQstwjI5l5inDIZk11LnRehCp6+wOcMeEFd2vH6eTv7poWwt4zL+WHqsJMQajk8UOFvccNXmu80IqCdPeKLHA0w4ciHToQmw4iRhg7dkMFa3FzAsAqBvgoX1c2NVf6o9yBFwnBsVnH5s9IrpZszIJ0ZIVduAEii2wXZG4TF8w2TnIacoL5yKB7LdY4Xzbw7MSyerIzz0cyxSTaxxJsF8oYtyuJwRMUtJdCWs6gvaLM5zjZZpoF2got",
    "signature": "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"
}
}

```


Example of the payment request with the encrypted Apple Pay token

```
{
"request": {
    "amount": 100,
    "currency": "USD",
    "description": "Apple Pay test transaction",
    "tracking_id": "your_uniq_number",
    "credit_card": {
    "token": "$begateway_apple_pay_1_0_0$eyJwYXltZW50RGF0YSI6eyJ2ZXJzaW9uIjoiRUNfdjEiLCJkYXRhIjoiK09kVHg0M3dvZ0MyKzMxaDFSaTVjTEJLQXk0VFZNWVhjOEd1Z0ZJK3hyZFZsczNpSjd4ZWpaakE5R0tORVJSL21lS1RxcnFuZEwwQ2hVNXE4eTFWQld4RTBDUGlEVVBuUm04NE5MRUxZWjhBZE5xcTl2WnZyQWl2dU85eFhnWGw1bUluY2hmaUo3eG1aYVpQY0RSUS9aT1ZQd21Bd05hRFVUeEMvblN0ZDdyV25kVVk4L3NTSmh3MElKNk00OXpZandueTU0eGlUVE5rOXJobnZrc1Rta1pwV0dKc0tjdGJVN3diNWY0QlVnQTRZMlFPTy9WbWJmRWttNXdESzNRb2RDbHRibXRFNHc4RHRFeW1FdER1VDdtM1ptbmpZYlBjRGlDdXQ4dFBzNXY0RXBtR0VCQ1VRZzg5S3I1QnJzMms0THZjbTZjbXdkSzdqWXFiZlN3KythTjN4cVJSZkJ5bTVjMnNCbno5YWRHbzhZSzJudzdhZndVRWhZWUdSSmkvd0RReWxQZHB3UElYREVuTSIsInNpZ25hdHVyZSI6Ik1JQUdDU3FHU0liM0RRRUhBcUNBTUlBQ0FRRXhEekFOQmdsZ2hrZ0JaUU1FQWdFRkFEQ0FCZ2txaGtpRzl3MEJCd0VBQUtDQU1JSUQ0ekNDQTRpZ0F3SUJBZ0lJVERCQlNWR2RWRFl3Q2dZSUtvWkl6ajBFQXdJd2VqRXVNQ3dHQTFVRUF3d2xRWEJ3YkdVZ1FYQndiR2xqWVhScGIyNGdTVzUwWldkeVlYUnBiMjRnUTBFZ0xTQkhNekVtTUNRR0ExVUVDd3dkUVhCd2JHVWdRMlZ5ZEdsbWFXTmhkR2x2YmlCQmRYUm9iM0pwZEhreEV6QVJCZ05WQkFvTUNrRndjR3hsSUVsdVl5NHhDekFKQmdOVkJBWVRBbFZUTUI0WERURTVNRFV4T0RBeE16STFOMW9YRFRJME1EVXhOakF4TXpJMU4xb3dYekVsTUNNR0ExVUVBd3djWldOakxYTnRjQzFpY205clpYSXRjMmxuYmw5VlF6UXRVRkpQUkRFVU1CSUdBMVVFQ3d3TGFVOVRJRk41YzNSbGJYTXhFekFSQmdOVkJBb01Da0Z3Y0d4bElFbHVZeTR4Q3pBSkJnTlZCQVlUQWxWVE1Ga3dFd1lIS29aSXpqMENBUVlJS29aSXpqMERBUWNEUWdBRXdoVjM3ZXZXeDdJaGoyamRjSkNoSVkzSHNMMXZMQ2c5aEdDVjJVcjBwVUViZzBJTzJCSHpRSDZETXg4Y1ZNUDM2eklnMXJyVjFPLzBrb21KUG53UEU2T0NBaEV3Z2dJTk1Bd0dBMVVkRXdFQi93UUNNQUF3SHdZRFZSMGpCQmd3Rm9BVUkvSkp4RStUNU84bjVzVDJLR3cvb3J2OUxrc3dSUVlJS3dZQkJRVUhBUUVFT1RBM01EVUdDQ3NHQVFVRkJ6QUJoaWxvZEhSd09pOHZiMk56Y0M1aGNIQnNaUzVqYjIwdmIyTnpjREEwTFdGd2NHeGxZV2xqWVRNd01qQ0NBUjBHQTFVZElBU0NBUlF3Z2dFUU1JSUJEQVlKS29aSWh2ZGpaQVVCTUlIK01JSERCZ2dyQmdFRkJRY0NBakNCdGd5QnMxSmxiR2xoYm1ObElHOXVJSFJvYVhNZ1kyVnlkR2xtYVdOaGRHVWdZbmtnWVc1NUlIQmhjblI1SUdGemMzVnRaWE1nWVdOalpYQjBZVzVqWlNCdlppQjBhR1VnZEdobGJpQmhjSEJzYVdOaFlteGxJSE4wWVc1a1lYSmtJSFJsY20xeklHRnVaQ0JqYjI1a2FYUnBiMjV6SUc5bUlIVnpaU3dnWTJWeWRHbG1hV05oZEdVZ2NHOXNhV041SUdGdVpDQmpaWEowYVdacFkyRjBhVzl1SUhCeVlXTjBhV05sSUhOMFlYUmxiV1Z1ZEhNdU1EWUdDQ3NHQVFVRkJ3SUJGaXBvZEhSd09pOHZkM2QzTG1Gd2NHeGxMbU52YlM5alpYSjBhV1pwWTJGMFpXRjFkR2h2Y21sMGVTOHdOQVlEVlIwZkJDMHdLekFwb0NlZ0pZWWphSFIwY0RvdkwyTnliQzVoY0hCc1pTNWpiMjB2WVhCd2JHVmhhV05oTXk1amNtd3dIUVlEVlIwT0JCWUVGSlJYMjIvVmRJR0dpWWwyTDM1WGhRZm5tMWdrTUE0R0ExVWREd0VCL3dRRUF3SUhnREFQQmdrcWhraUc5Mk5rQmgwRUFnVUFNQW9HQ0NxR1NNNDlCQU1DQTBrQU1FWUNJUUMrQ1ZjZjV4NGVjMXRWNWErc3RNY3Y2MFJmTUJoU0lzY2xFQUsySHIxdlZRSWhBTkdMTlFwZDF0MXVzWFJnTmJFZXNzNkh6NlBtcjJ5OWc0Q0pEY2dzM2Fwak1JSUM3akNDQW5XZ0F3SUJBZ0lJU1cwdnZ6cVkycGN3Q2dZSUtvWkl6ajBFQXdJd1p6RWJNQmtHQTFVRUF3d1NRWEJ3YkdVZ1VtOXZkQ0JEUVNBdElFY3pNU1l3SkFZRFZRUUxEQjFCY0hCc1pTQkRaWEowYVdacFkyRjBhVzl1SUVGMWRHaHZjbWwwZVRFVE1CRUdBMVVFQ2d3S1FYQndiR1VnU1c1akxqRUxNQWtHQTFVRUJoTUNWVk13SGhjTk1UUXdOVEEyTWpNME5qTXdXaGNOTWprd05UQTJNak0wTmpNd1dqQjZNUzR3TEFZRFZRUUREQ1ZCY0hCc1pTQkJjSEJzYVdOaGRHbHZiaUJKYm5SbFozSmhkR2x2YmlCRFFTQXRJRWN6TVNZd0pBWURWUVFMREIxQmNIQnNaU0JEWlhKMGFXWnBZMkYwYVc5dUlFRjFkR2h2Y21sMGVURVRNQkVHQTFVRUNnd0tRWEJ3YkdVZ1NXNWpMakVMTUFrR0ExVUVCaE1DVlZNd1dUQVRCZ2NxaGtqT1BRSUJCZ2dxaGtqT1BRTUJCd05DQUFUd0Z4R0VHZGRraGRVYVhpV0JCM2JvZ0tMdjNudXVUZUNOL0V1VDRUTlcxV1piTmE0aTBKZDJEU0pPZTdvSS9YWVh6b2pMZHJ0bWNMN0k2Q21FLzFSRm80SDNNSUgwTUVZR0NDc0dBUVVGQndFQkJEb3dPREEyQmdnckJnRUZCUWN3QVlZcWFIUjBjRG92TDI5amMzQXVZWEJ3YkdVdVkyOXRMMjlqYzNBd05DMWhjSEJzWlhKdmIzUmpZV2N6TUIwR0ExVWREZ1FXQkJRajhrbkVUNVBrN3lmbXhQWW9iRCtpdS8wdVN6QVBCZ05WSFJNQkFmOEVCVEFEQVFIL01COEdBMVVkSXdRWU1CYUFGTHV3M3FGWU00aWFwSXFaM3I2OTY2L2F5eVNyTURjR0ExVWRId1F3TUM0d0xLQXFvQ2lHSm1oMGRIQTZMeTlqY213dVlYQndiR1V1WTI5dEwyRndjR3hsY205dmRHTmhaek11WTNKc01BNEdBMVVkRHdFQi93UUVBd0lCQmpBUUJnb3Foa2lHOTJOa0JnSU9CQUlGQURBS0JnZ3Foa2pPUFFRREFnTm5BREJrQWpBNnozS0RVUmFac1liN05jTld5bUsvOUJmdDJROTFUYUtPdnZHY2dWNUN0NG40bVBlYldaK1kxVUVOajUzcHd2NENNREl0MVVRaHNLTUZkMnhkOHpnN2tHZjlGM3dzSVcyV1Q4WnlhWUlTYjFUNGVuMGJtY3ViQ1lraFlRYVpEd21TSFFBQU1ZSUJqVENDQVlrQ0FRRXdnWVl3ZWpFdU1Dd0dBMVVFQXd3bFFYQndiR1VnUVhCd2JHbGpZWFJwYjI0Z1NXNTBaV2R5WVhScGIyNGdRMEVnTFNCSE16RW1NQ1FHQTFVRUN3d2RRWEJ3YkdVZ1EyVnlkR2xtYVdOaGRHbHZiaUJCZFhSb2IzSnBkSGt4RXpBUkJnTlZCQW9NQ2tGd2NHeGxJRWx1WXk0eEN6QUpCZ05WQkFZVEFsVlRBZ2hNTUVGSlVaMVVOakFOQmdsZ2hrZ0JaUU1FQWdFRkFLQ0JsVEFZQmdrcWhraUc5dzBCQ1FNeEN3WUpLb1pJaHZjTkFRY0JNQndHQ1NxR1NJYjNEUUVKQlRFUEZ3MHlNREF5TVRrd09ESTJNelphTUNvR0NTcUdTSWIzRFFFSk5ERWRNQnN3RFFZSllJWklBV1VEQkFJQkJRQ2hDZ1lJS29aSXpqMEVBd0l3THdZSktvWklodmNOQVFrRU1TSUVJTlBvOWgxRUE2dzZ5cjRyeERRNm5pdG5MT2lrRVYwUTVLZ2ZjcldlZXE3S01Bb0dDQ3FHU000OUJBTUNCRWd3UmdJaEFKY20yMjl4NXhFSXBJdjh2NkFWTjIvajRUazZ3ajFBL1ZNazhoNXZHcjcrQWlFQTk2RERqNFV3Z2lSNDhTL3JIbWtHbDJwakJsVWhXVnBtSFZBcnhrSUNRTFlBQUFBQUFBQT0iLCJoZWFkZXIiOnsiZXBoZW1lcmFsUHVibGljS2V5IjoiTUZrd0V3WUhLb1pJemowQ0FRWUlLb1pJemowREFRY0RRZ0FFeXJSaEwrZE1JYjhuOXNGK2hiTG16UGdERVlYdDVkbmVlK3VpdHB2dUFpa2lueFJuUTBGQ1BDWGlhYldSYjBZRE9YMVA5UXJHeHQvTW9WRXlxdmJQUEE9PSIsInB1YmxpY0tleUhhc2giOiJHY2ZhbmFvZWlWaHFrZ0ZoWXkyR29KQjRGNXBIWkROTERTcG90NmRtejk4PSIsInRyYW5zYWN0aW9uSWQiOiIxNDg4N2MyOTc4OTQ1MGZjZjg5OTMwMmFmZTVmNzMyMzVmNTEwNTA3MjliZGY3MGI4ZDZhZDk3NWQzYzEwNGJiIn19LCJwYXltZW50TWV0aG9kIjp7ImRpc3BsYXlOYW1lIjoiTWFzdGVyQ2FyZCA0MzE4IiwibmV0d29yayI6Ik1hc3RlckNhcmQiLCJ0eXBlIjoiY3JlZGl0In0sInRyYW5zYWN0aW9uSWRlbnRpZmllciI6IjE0ODg3QzI5Nzg5NDUwRkNGODk5MzAyQUZFNUY3MzIzNUY1MTA1MDcyOUJERjcwQjhENkFEOTc1RDNDMTA0QkIifQ=="
    }
}
}

```


##### Response

The response to the payment request with Apple Pay token will be returned with [the processing status](https://docs.bepaid.by/en/integration/card_api/statuses/) and fully conforms to [the payment](https://docs.bepaid.by/en/integration/card_api/transactions/payment/) or [authorization](https://docs.bepaid.by/en/integration/card_api/transactions/authorization/) transaction response.