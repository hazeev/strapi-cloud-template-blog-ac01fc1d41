# Resend Email Integration Setup

This guide will help you set up Resend.com to send welcome emails to users who join your waitlist.

## 1. Get Your Resend API Key

1. Go to [Resend.com](https://resend.com) and create an account
2. Navigate to the API Keys section in your dashboard
3. Create a new API key
4. Copy the API key (it starts with `re_`)

## 2. Configure Environment Variables

Create a `.env.local` file in your project root and add:

```bash
# Resend API Key for email functionality
RESEND_API_KEY=re_your_api_key_here

# Optional: Customize the from email address
# Make sure this domain is verified in your Resend dashboard
RESEND_FROM_EMAIL=noreply@carvetka.com

# Optional: Audience ID for contact management
# Create an audience in your Resend dashboard and add the ID here
RESEND_AUDIENCE_ID=your_audience_id_here
```

## 3. Create an Audience (Recommended)

To manage your waitlist contacts:

1. Go to your Resend dashboard
2. Navigate to Audiences
3. Create a new audience (e.g., "Waitlist")
4. Copy the audience ID and add it to your `.env.local` file as `RESEND_AUDIENCE_ID`

## 4. Verify Your Domain (Optional but Recommended)

For production use, you should verify your domain in Resend:

1. Go to your Resend dashboard
2. Navigate to Domains
3. Add and verify your domain (e.g., `carvetka.com`)
4. Update the `RESEND_FROM_EMAIL` to use your verified domain

## 4. Test the Integration

1. Start your development server: `npm run dev`
2. Go to your landing page
3. Fill out the waitlist form
4. Check your email for the welcome message

## 5. Customize the Email Template

The email template is located in `src/app/api/waitlist/route.ts`. You can customize:

- Email subject line
- HTML content and styling
- Call-to-action buttons
- Footer information

## 6. Production Deployment

When deploying to production:

1. Add the environment variables to your hosting platform (Vercel, etc.)
2. Verify your domain in Resend
3. Test the email functionality in production

## Troubleshooting

- **Emails not sending**: Check your API key and domain verification
- **Emails going to spam**: Verify your domain and set up proper DNS records
- **API errors**: Check the browser console and server logs for detailed error messages

## Next Steps

Consider adding these features:

1. **Database storage**: Save waitlist emails to your database
2. **Email preferences**: Allow users to manage their email preferences
3. **Analytics**: Track email open rates and click-through rates
4. **A/B testing**: Test different email templates
5. **Automated follow-ups**: Send reminder emails after a certain period 