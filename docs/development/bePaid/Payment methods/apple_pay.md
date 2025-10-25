# Apple Pay - bePaid API Documentation
Apple Pay is an easy and secure way for users to make payments in iPhone and watchOS apps and on the websites in Safari. The service works on iPhone, iPad, Apple Watch devices and on the latest MacBook models.

Once a card is added to Apple Wallet, the customer can just use Face ID, Touch ID, or double-click Apple Watch to authorize a payment.

![Apple Pay on the Web](https://docs.bepaid.by/en/assets/images/ap2.jpg "Apple Pay on the Web")

Despite the easy way to pay, it's quite safe to use Apple Pay. No real bank card data are transmitted for making payments. Instead, Apple replaces the number of a card added to Apple Wallet with a token. It is stored on the user's device and passed to processors to finalize a payment together with a unique cryptogram.

* * *

Acceptable Use Guidelines
-------------------------

You can offer Apple Pay on the websites and in the apps provided that your resource complies with [Apple Pay Acceptable Use Guidelines](https://developer.apple.com/apple-pay/acceptable-use-guidelines-for-websites/):

*   Apple Pay may not be incorporated into a resource that violates any law, promotes hate, violence, intolerance, engages in fraud or infringes the intellectual property rights.
    
*   Apple Pay may not apply to transactions involving tobacco, drugs, firearms, replica, pornography products, the purchase or transfer of currencies (unless approved by Apple), funding the staged digital wallets.
    
*   If used for fundraising or collection of nonprofit donations, the registration on [Benevity portal](https://causes.benevity.org/apple-pay/apple-pay-landing) is required.
    
*   You may not replace In-App Purchases with Apple Pay in the mobile app.
    
*   You must offer Apple Pay as a payment option at least on parity with other payment methods which might be incorporated into your website.
    
*   Your use and integration of Apple Pay on the website and in the mobile app must adhere to the [Apple Pay Marketing Guidelines](https://developer.apple.com/apple-pay/marketing/).
    

Additionally, for the purposes of payment processing each merchant and a resource must be identified and registered in Apple. Learn more on the registration options [here](https://docs.bepaid.by/en/payment_methods/apple_pay/registration/).

* * *

Apple Pay payment processing flow
---------------------------------

1.  Device compatibility check. Opening the payment session. Displaying the Apple Pay button, if supported on the device.
    
2.  Merchant and domain validation by Apple Pay.
    
3.  Collecting the billing data. Payment authorization by a customer using Face ID, Touch IDs or double-click in Apple Watch.
    
4.  Getting `PaymentToken` from Apple Pay. Token decryption with Apple Pay certificates.
    
5.  Processing payment and authorization requests with `paymentData`.
    
6.  Displaying the payment status to the customer. Sending the payment result to Apple.
    

Client interface during the Apple Pay payment:

![Apple Pay Web Flow](https://docs.bepaid.by/en/assets/images/ap-flow.png "Apple Pay Web Flow")