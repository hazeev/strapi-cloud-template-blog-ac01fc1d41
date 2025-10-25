# Payment widget - bePaid API Documentation
**Payment widget** is a module which is displayed on a web-page or in a mobile application and lets customers make payments in an easy and secure way. Payment widget is developed to reduce time required for its integration into the merchant's system.

There are 2 ways to open the payment widget:

*   In an **iframe** on the merchant's domain. To see how this looks for the customer, click the **Pay** button at the bottom of the [Payment demo page](https://docs.bepaid.by/en/integration/widget/demo/). In this case the link to the payment page will be sent in a response to [the payment token request](https://docs.bepaid.by/en/integration/widget/setup_with_token/). More details [here](https://docs.bepaid.by/en/integration/widget/payment_page/).

![Payment page on bePaid domain](https://docs.bepaid.by/en/assets/images/widget/payment_page_en.png "Платежная страница на домене bePaid")

*   In the **payment page** on the bePaid domain. To see how the payment page looks, click **Pay by payment link** on the [Payment demo page](https://docs.bepaid.by/en/integration/widget/demo/).

![Widget in an iframe on the merchant's website](https://docs.bepaid.by/en/assets/images/widget/widget_en.png "Widget in an iframe on the merchant's website")

There are 2 ways to integrate the widget in an **iframe**:

[1\. Payment with the payment widget using payment token](https://docs.bepaid.by/en/integration/widget/setup_with_token).

The JavaScript-code of the payment widget is built into the payment page on the merchant's page. The payment token is received in the response to [the payment token request](https://docs.bepaid.by/en/integration/widget/payment_token/) when the payment is initialized.

[2\. Payment with the payment widget using public key](https://docs.bepaid.by/en/integration/widget/setup/)

Used when the merchant doesn't have an opportunity to use backend development. The JavaScript-code of the payment widget is built into the payment page on the merchant's website. Instead of the payment token, the shop's public key is used. In this scenario, the payment token is generated on the fly on payment initialization.

Warning

The least secure integration option

Info

Pay attention that the public key can potentially be obtained by the customer (for example, using the browser developer tools). To prevent fraud transactions, it is necessary to check all parameters in the webhook notification before assigning the received status to the transaction. The parameters that require special attention:

*   `amount`,
*   `currency`,
*   `test`,
*   `tracking_id`.