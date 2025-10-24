# Strapi Cloud Setup Guide

## Environment Variables Required

You need to set the following environment variables in your Strapi Cloud dashboard:

### Required Variables:
- `APP_KEYS`: Array of keys for your Strapi app (generate random strings)
- `ADMIN_JWT_SECRET`: Secret for admin authentication (generate random string)
- `ENCRYPTION_KEY`: Encryption key for Strapi (generate random string)

### How to Generate Keys:
1. **APP_KEYS**: Generate 4 random strings (e.g., using `openssl rand -base64 32`)
2. **ADMIN_JWT_SECRET**: Generate one random string (e.g., using `openssl rand -base64 32`)
3. **ENCRYPTION_KEY**: Generate one random string (e.g., using `openssl rand -base64 32`)

### Example:
```
APP_KEYS=key1,key2,key3,key4
ADMIN_JWT_SECRET=your-secret-here
ENCRYPTION_KEY=your-encryption-key-here
```

## Configuration Changes Made

1. **Fixed plugins.js**: Removed incorrect upload provider configuration (Strapi Cloud handles uploads automatically)
2. **Fixed server.js**: Added encryption key configuration to resolve the warning

## Next Steps

1. Set the environment variables in your Strapi Cloud dashboard
2. Redeploy your application
3. The upload provider error should be resolved as Strapi Cloud handles uploads natively
