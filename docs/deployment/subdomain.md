# Subdomain Setup Guide

This guide will help you set up subdomains for your Carvetka application.

## Domain Structure

- `carvetka.com` - Marketing pages (homepage, pricing, features, etc.)
- `auth.carvetka.com` - Authentication pages (login, register, password reset)
- `app.carvetka.com` - Main application (dashboard, vehicle management)

## Step 1: DNS Configuration

Add these DNS records to your domain provider (e.g., Cloudflare, Namecheap, GoDaddy):

```
Type    Name                    Value
A       carvetka.com           → Your Vercel deployment IP
CNAME   auth.carvetka.com      → cname.vercel-dns.com
CNAME   app.carvetka.com       → cname.vercel-dns.com
```

## Step 2: Vercel Configuration

1. **Add Custom Domains in Vercel Dashboard:**
   - Go to your project settings
   - Add `carvetka.com` as the primary domain
   - Add `auth.carvetka.com` as a custom domain
   - Add `app.carvetka.com` as a custom domain

2. **Environment Variables:**
   Add these to your Vercel environment variables:
   ```
   NEXT_PUBLIC_MAIN_DOMAIN=carvetka.com
   NEXT_PUBLIC_AUTH_DOMAIN=auth.carvetka.com
   NEXT_PUBLIC_APP_DOMAIN=app.carvetka.com
   ```

## Step 3: Supabase Configuration

1. **Update Auth Settings:**
   - Go to Authentication > URL Configuration
   - Set **Site URL** to: `https://app.carvetka.com`
   - Add **Redirect URLs**:
     - `https://auth.carvetka.com/auth/callback`
     - `https://app.carvetka.com/auth/callback`
     - `http://localhost:3000/auth/callback` (for development)

2. **Update Email Templates:**
   - Update all email templates to use the correct domain URLs
   - Ensure OAuth redirects point to the correct subdomains

## Step 4: Testing

1. **Local Development:**
   ```bash
   # Add to your /etc/hosts file (macOS/Linux)
   127.0.0.1 carvetka.local
   127.0.0.1 auth.carvetka.local
   127.0.0.1 app.carvetka.local
   ```

2. **Test URLs:**
   - `https://carvetka.com` - Should show marketing pages
   - `https://auth.carvetka.com/login` - Should show login page
   - `https://app.carvetka.com` - Should redirect to dashboard (if logged in)

## Step 5: SSL Certificates

Vercel automatically handles SSL certificates for all subdomains. No additional configuration needed.

## Troubleshooting

### Common Issues:

1. **DNS Propagation:**
   - DNS changes can take up to 48 hours to propagate
   - Use `dig` or `nslookup` to check DNS resolution

2. **CORS Issues:**
   - Ensure Supabase is configured with the correct domains
   - Check that all redirect URLs are properly set

3. **Redirect Loops:**
   - Verify middleware logic is correct
   - Check that Next.js redirects are properly configured

### Testing Commands:

```bash
# Check DNS resolution
dig carvetka.com
dig auth.carvetka.com
dig app.carvetka.com

# Test HTTPS
curl -I https://carvetka.com
curl -I https://auth.carvetka.com
curl -I https://app.carvetka.com
```

## Benefits of This Setup

1. **Better SEO:** Marketing pages are separate from app pages
2. **Improved Security:** Auth pages are isolated
3. **Better Performance:** Each subdomain can be optimized independently
4. **Cleaner URLs:** Users know exactly where they are
5. **Easier Maintenance:** Clear separation of concerns

## Next Steps

1. Deploy to Vercel
2. Configure DNS records
3. Update Supabase settings
4. Test all functionality
5. Monitor for any issues

## Support

If you encounter any issues, check:
1. DNS propagation status
2. Vercel deployment logs
3. Supabase auth logs
4. Browser console for errors
