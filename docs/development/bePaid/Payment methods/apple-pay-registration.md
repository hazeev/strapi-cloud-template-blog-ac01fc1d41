# Set up - bePaid API Documentation
Sign up with Apple Pay
----------------------

According to [Apple Pay Acceptable Use Guidelines](https://developer.apple.com/apple-pay/acceptable-use-guidelines-for-websites/), to offer Apple Pay as a payment option, a merchant should have Apple Pay Merchant ID and certificates to validate the resource and to decrypt the payment data received from Apple.

While partnering with bePaid, you can:

*   accept payments under bePaid Processor ID and certificates and enjoy [a low-effort setup](#low_effort_setup);
*   [sign up directly with Apple](#direct_setup) and work under your own Apple Merchant ID.

* * *

Low-effort setup
----------------

bePaid will register you as a merchant in Apple, and payments will be validated with bePaid certificates.

To proceed, sign in your [bePaid back office](https://merchant.bepaid.by/) and follow the steps below:

1.  Go to the **Apple Pay** tab and click **Edit**.
    
2.  Agree to the Terms and Conditions.
    
3.  Download the verification file and locate it as described in the back office.
    
4.  Choose the shops that Apple Pay should be activated for.
    
5.  Click **Register** to submit the registration request.
    

* * *

Direct sign-up with Apple
-------------------------

Sign in your [Apple Developer Account](https://developer.apple.com/) and follow the steps below:

1.  Create your Merchant ID
    
    In your Apple Developer Account go to **Certificates, IDs & Profiles**, then to **Merchant IDs** and add a new Merchant ID there:
    
    *   provide brief information on your resource in the **Description** field;
    *   indicate the URL of your website in the **Identifier** field as a reverse-domain name style string with the `merchant` prefix. For example, for `shop.domain.com` the **Identifier** field should indicate `merchant.com.domain.shop`.
2.  Create the certificates
    
    In your [bePaid back office](https://merchant.bepaid.by/), go to the **Apple Pay** tab and click **Edit**.
    
    Go to the **Enable Apple Pay under your own merchant certificates** section. Indicate your Merchant ID and download the files to request the certificates.
    
    In the Apple Developer Account create two certificates:
    
    *   Payment Processing Certificate to decrypt payment data;
    *   Merchant Identity Certificate to validate payments on the web.
    
    Go back to the bePaid back office and upload the certificates, so bePaid can decrypt the payment data received from Apple. Select **Apply**.
    
    Info
    
    Skip the steps in bePaid back office, if you are PCI DSS-certified and decrypt the Apple Pay payment token on your side.
    
3.  Validate your domains
    
    In the Apple Developer Account, add your domains for each shop where you're going to offer Apple Pay as a payment option.
    
    Validate your domains by uploading the verification file from Apple to the `<yourshopURL>/.well-known` folder of your website. The uploaded file should be available on `https://<yourshopurl>/.well-known/apple-developer-merchantid-domain-association`
    
    Info
    
    Your domain should support TLS version 1.2 encryption.
    

Once the setup is finished, choose a suitable option to [integrate Apple Pay](https://docs.bepaid.by/en/payment_methods/apple_pay/integration/index.html).