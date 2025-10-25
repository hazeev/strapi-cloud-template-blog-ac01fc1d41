# Payment widget integration with token - bePaid API Documentation
To make the bePaid payment widget appear to your customers on your website, follow the steps below:

1.  Install the widget script.
    
    To make the widget send requests, run the following script on your website:
    
    ```
<script type="text/javascript" src="https://js.bepaid.by/widget/be_gateway.js"></script>

```

    
2.  Create the payment widget.
    
    Register a function to generate the necessary parameters for the `BeGateway` constructor object, and to call out the `createWidget` method. The payment is considered as successfully completed only after you receive the [automatic payment notification](https://docs.bepaid.by/en/using_api/webhooks/).
    
    ```
<script type="text/javascript">
    this.payment = function() {
        var params ={
            checkout_url: "https://checkout.bepaid.by",
            fromWebview: true,
            checkout: {
                iframe: true,
                test: true,
                transaction_type: "payment"                                  
            },
            token: "8765a020e1bfe88780943461769f09e0f6ed576431a14a7165ccf6827adf9377", 
            closeWidget: function(status) {
              // possible values of status variable
              // successful - transaction is successful
              // failed - transaction is declined
              // pending - awaiting transaction confirmation
              // redirected - customer is redirected to external the payment method system
              // error - error in input paras/network error/etc
              // null - payment widget is closed
              console.debug('close widget callback')
            }
        };

        new BeGateway(params).createWidget();
    };
</script>

```

    
3.  Call the created function.
    
    Register the call of the above created function to some event, for example, to the “Pay” link click.
    
    ```
<a onclick="payment()" href="#">Pay</a>

```

    

### Widget parameters



* checkout_urlrequired
  * string  https://checkout.bepaid.by
* tokenconditionally required
  * string  Payment token received in request for a payment token. In this integration option, the customer can not make changes to the payment parameters.
* fromWebview
  * boolean  Set this parameter to true if you want the payment widget to open on payment initialization in a WebView (for example, within a web application). If this parameter is not provided, or it is set to false, initializing the payment will open the payment page instead. 
